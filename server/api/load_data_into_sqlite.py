from gensim.models.keyedvectors import KeyedVectors 
import sqlite3

import bz2
import numpy as np
import io

def adapt_numpy_ndarray(numpy_ndarray):
    """
    Transform NumPy Array to bjson
    """
    return Json(numpy_ndarray.tolist())

def connect_db():
    conn = sqlite3.connect('embeddings.sqlite', detect_types=sqlite3.PARSE_DECLTYPES)

    return conn, conn.cursor()

def create_embed_table(conn,cursor):

    try: 
        cursor.execute('DROP TABLE embeddings')
        print('dropping table')
    except:
        print('no table to drop')

    try:
        cursor.execute('CREATE TABLE  embeddings (key varchar, embedding array)')
        conn.commit()
    except:
        print("DB already created")

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

if __name__==("__main__"):

    sqlite3.register_adapter(np.ndarray, adapt_array)
    sqlite3.register_converter("array", convert_array)
    
    conn,cursor = connect_db()
    create_embed_table(conn,cursor)

    print("loading embeding")
    model_path ='/data/GoogleNews-vectors-negative300.bin'
    model = KeyedVectors.load_word2vec_format(model_path,binary=True)
    print("embedding loaded")

    done = 0
    vocab = list(set(model.index2word))
    embeds  = [model[key] for key in vocab ]
    data = list(zip(vocab,embeds))
    print('running inserts')
    insert_query = "INSERT INTO embeddings (key,embedding) VALUES (?, ?)"
    conn.executemany(insert_query, data)

    print('generating index')
    cursor.execute("CREATE INDEX key_index on embeddings(key)")

    print('running commit')
    conn.commit()
    conn.close()
