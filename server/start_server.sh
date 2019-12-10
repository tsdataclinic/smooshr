#!/bin/bash

docker run --rm -it -p 5000:500 -v $(pwd):/app word2vec
