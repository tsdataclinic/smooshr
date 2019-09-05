from flask import Flask, request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres@postgres/postgres'
db = SQLAlchemy(app)

@app.route('/')
def hello():
    return "Use me to get embedings!!!!!!"

@app.route('/embedding/<words>')
def embeding(words):
    fmt_words = ','.join(["'{}'".format(word) for word in words.split(',')])
    result = db.engine.execute("select * from embeddings where key in ({}) ".format(fmt_words))
    return jsonify([dict(row) for row in result]) 

if __name__=='__main__':
    print('starting up server')
    app.run(host='0.0.0.0', port=5000, debug=True)
