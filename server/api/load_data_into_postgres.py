from gensim.models.keyedvectors import KeyedVectors 
import psycopg2
from psycopg2.extensions import register_adapter 
from psycopg2.extras import Json
import bz2
import numpy as np

def adapt_numpy_ndarray(numpy_ndarray):
    """
    Transform NumPy Array to bjson
    """
    return Json(numpy_ndarray.tolist())

def connect_db():
    connection = psycopg2.connect("host=postgres user=postgres password=postgres port=5432")
    register_adapter(np.ndarray, adapt_numpy_ndarray)
    cursor = connection.cursor()
    return connection, cursor

def create_embed_table(conn,cursor):

    try: 
        cursor.execute('DROP TABLE embeddings')
        print('dropping table')
    except:
        print('no table to drop')

    try:
        cursor.execute('CREATE TABLE  embeddings (key varchar, embedding jsonb)')
        conn.commit()
    except:
        print("DB already created")


if __name__==("__main__"):
    print("loading embeding")

    conn,cursor = connect_db()
    create_embed_table(conn,cursor)

    model_path ='/data/GoogleNews-vectors-negative300.bin'
    model = KeyedVectors.load_word2vec_format(model_path,binary=True)

    done = 0
    vocab = set(model.index2word)
    for key in vocab:
        cursor.execute("INSERT INTO EMBEDDINGS (key,embedding) VALUES (%s,%s)",[key,model[key]])
        conn.commit()
        if(done%10000==0):
            print('done ', done, ' of  ',len(vocab) )

        done = done +1

