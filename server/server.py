from flask import Flask, request,jsonify,Response,g
from flask_cors import CORS
import requests
import sqlite3 
import numpy as np
import io

app = Flask(__name__)
CORS(app)

def adapt_array(arr):
    """
    http://stackoverflow.com/a/31312102/190597 (SoulNibbler)
    """
    out = io.BytesIO()
    np.save(out, arr)
    out.seek(0)
    return sqlite3.Binary(out.read())

def convert_array(text):
    out = io.BytesIO(text)
    out.seek(0)
    return np.load(out)

sqlite3.register_adapter(np.ndarray, adapt_array)
sqlite3.register_converter("array", convert_array)

def connect_db():
    conn = sqlite3.connect('embeddings.sqlite', detect_types=sqlite3.PARSE_DECLTYPES)
    return conn

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        conn  = connect_db()
        db = g._database = conn 
    return db 

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

CHUNK_SIZE = 1024

@app.route('/')
def hello():
    return "Use me to get embedings!!!!!!"

@app.route('/embedding/')
def empty_embed():
    return jsonify([])

@app.route('/proxy')
def proxy():
    url = request.args.get('url')
    r = requests.get(url, stream=True, params = request.args )
    def generate():
      for chunk in r.iter_content(CHUNK_SIZE):
        yield chunk
    res = Response(generate())
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res 

@app.route('/embedding/<words>')
def embeding(words):
    conn  = get_db() 
    try:
        words = words.split(',')
        sql = "select * from embeddings where key in ({seq})".format( seq=','.join(['?']*len(words))) 
        result = conn.execute(sql, words)
        result = [ [r[0], r[1].tolist()] for r in result ]
        result = [ {"key": key, "embedding": embed} for key,embed in dict(result).items() ]
        return jsonify(result)
    except:
        return jsonify([])
if __name__=='__main__':
    print('starting up server')
    app.run(host='0.0.0.0', port=5000, debug=True)
