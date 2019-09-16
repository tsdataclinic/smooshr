FROM python:3.6

WORKDIR /app
ADD requirements.txt /app

RUN pip install Flask Flask-RESTful gensim
RUN pip install scikit-learn --upgrade
RUN pip install scipy --upgrade
Run pip install sklearn --upgrade
RUN pip install redis

RUN pip install flask-restful
RUN pip install flask-cors

RUN pip install celery
RUN pip install psycopg2 
RUn pip install flask_sqlalchemy
COPY . /app

ENTRYPOINT ["python"]

CMD ["server.py"]

