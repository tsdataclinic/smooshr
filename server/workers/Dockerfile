FROM python:3.6

ENV CELERY_BROKER_URL redis://redis:6379/0
ENV CELERY_RESULT_BACKEND redis://redis:6379/0
ENV C_FORCE_ROOT true

RUN apt-get update
RUN apt-get install -y  ncbi-blast+ build-essential 

COPY . /queue
WORKDIR /queue

RUN pip install -r requirements.txt
RUN pip install umap cmake MulticoreTSNE  celery

RUN pip install Flask Flask-RESTful gensim
RUN pip install scikit-learn --upgrade

ENTRYPOINT celery -A tasks worker --loglevel=info
