Smoosher
-------

This is an experimental tools that aims to help clean up datasets that have many 
categorical varables that are drawn from a smaller subset and might change from dataset 
to dataset. Some examples of this might be 

1. Poorly entered categories by hand 
2. Categories with way to many subcategories 
3. Data that has categories that changes from year to year.
4. Data that has ranges that need to be made equivalent. 


Install deps
------------

To install the dependencies for the application run 

```bash
yarn
```

This will install all of the javascript packages requried to run the application 

Setup
-----

To load the embeding data in to the database run 

```bash
docker-compose run api load_data_into_postgres.py
```

Running
-------

To run the application, simply run 

```bash
yarn start
```
This should start a server on http://localhost:3000

To run the embeddings / proxy server, you need to also run 

``` 
docker-compose up
```

from the server directory.

You can also run the storybook server to inspect individual components using 

```bash
yarn storybook
```

This should start a server on http://localhost:9009

Data Model
---------

- Project - Describes one project that people will work on
- Datasets - Represents a dataset, basically a single file that belongs to a project
- Column - Represents one column from a dataset 
- MetaColumn - A grouping of columns from mulitple files or in the future, potentially the concatination of some columns in the same dataset. 
- Entry - A unique entry in a column 
- Mapping - A mapping that converts a number of entries in a 1 or a  number of columns in one or a number of datasets to a new category.

