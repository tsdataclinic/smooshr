FROM python:3.6

WORKDIR /app
ADD requirements.txt /app

RUN pip install Flask Flask-RESTful gensim
RUN pip install scikit-learn --upgrade
RUN pip install scipy --upgrade
Run pip install sklearn --upgrade

RUN pip install flask-restful
RUN pip install flask-cors

RUN pip install celery
COPY . /app

ENTRYPOINT ["python"]

CMD ["word2vec-api.py", "--model", "/data/GoogleNews-vectors-negative300.bin", "--binary", "BINARY",  "--host", "0.0.0.0", "--port", "500"]

