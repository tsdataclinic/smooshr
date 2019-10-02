from flask import Flask, request,jsonify,Response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres@postgres/postgres'
db = SQLAlchemy(app)
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
    try:
        fmt_words = ','.join(["'{}'".format(word) for word in words.split(',')])
        result = db.engine.execute("select * from embeddings where key in ({}) ".format(fmt_words))
        return jsonify([dict(row) for row in result]) 
    except:
        return jsonify([])
if __name__=='__main__':
    print('starting up server')
    app.run(host='0.0.0.0', port=5000, debug=True)
