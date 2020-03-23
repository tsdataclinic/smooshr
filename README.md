## smoosher

Introducing smooshr, a quick and user-friendly way to clean messy datasets.

While some solutions exist for processing numerical data, cleaning text data is a lengthy and painstaking process even for those who live and breathe regular expressions. That's why we built smooshr, a browser-based tool that makes it easy to create and share recipes for cleaning unruly data, with a specific focus on entity consolidation and standardization. Just upload or point to the data you want to clean and start consolidating column entries through a point-and-click interface. No coding necessary—although it does spit out reproducible scripts for your ETL pipeline for those who want it!  

Our first release focuses on entity consolidation tasks (both within and between datasets) but we have plans to extend functionality to other forms of data cleaning in the near future.

## Offline first

One of the design decisions we made with smooshr was to focus on offline first functionality. When you load a dataset into smooshr, it never leaves your computer. All the processing is done locally within the browser and the only calls to a server we make are to get the individual word embeddings that are used to provide suggestions for categories. The server that provides these suggestions has no logging of any kind. We want people to feel comfortable using the tool so ensuring that everything is processed and stored locally means we don't have access to your data. 

## What can it do?

The first data cleaning task we have built in to smooshr is that of creating a common taxonomy between different entities. By this we mean that smooshr will enable you to quickly group and aggregate categorical variables that may have been entered by hand or contain too many values for useful analysis. It will also help to consolidate entities that change over time. For example: 

- Categories that mean the same thing but have minor variations or data entry errors (Street: "ST", "st.", "Street", "Stret")
- Categories with too many subcategories for analysis (Automobile: "Automobile - car", "Automobile - van", "Automobile - truck")
- Categories that are contextually similar (House: "house", "home", "residence")

The best way to get started is to checkout the [tutorial](https://github.com/tsdataclinic/smooshr/blob/master/tutorial.md)

## Export your workflow as code

smooshr is designed to be useful and then to fade into the background. Once you have generated the mappings for your new taxonomy, you can export a package of python code that can then be run independent of the tool. This allows you to incorporate this step into a larger ETL pipeline or to tweak the script as you see fit. Don't want to use our python code? No problem, simply export the results as a json file that can be loaded into your own scripts.

## Future development

We are looking to extend smooshr's functionality in the near future to also include the following tasks:

1. Creation of new columns by extracting parts of strings through regex.
2. Joining of string columns together through a format string pattern (for example, if you had a file with "City", "Street", "Zip", "Country", you could combine them into a single column called "Address").
3. Date and time format standardization.
4. Standardization of geospatial units and coordinate systems.

If you would like to suggest other ways smooshr could help, please feel free to add an issue on the repo.

## What is Data Clinic?

As the data and tech philanthropic arm of the investment manager Two Sigma, Data Clinic provides pro bono data science and engineering support to nonprofits and engages in open source tooling and research that contribute to the Data for Good movement.We leverage Two Sigma’s people, data science skills, and technological know-how to support communities, mission driven organizations, and the broader public in their effort to use data more effectively. To learn more visit [dataclinic.twosigma.com](dataclinic.twosigma.com) and connect with us via [dataclinic@twosigma.com](mailto:dataclinic@twosigma.com).

# Running smooshr locally

If you want to run smooshr locally, to either help with development or just to have your local copy, follow these instructions:

First clone this repo

```bash
git clone https://github.com/tsdataclinic/smooshr.git
cd smooshr
```

Install the dependencies for the application

```bash
yarn
```

That is all the setup you need to do for the front end application. To also run the embeddings server, you will need to download the embeddings database. You can grab that file at [https://allofthedata.s3-us-west-2.amazonaws.com/embeddings.sqlite.tar.gz](https://allofthedata.s3-us-west-2.amazonaws.com/embeddings.sqlite.tar.gz). Once it's downloaded decompress it by running

```
tar xzvf embeddings.sqlite.tar.gz
```

and place the resulting file into the server folder.

The easiest way to run the server is using docker-compose. To do so, install [docker]() and [docker-compose]() then simply run

```bash
docker-compose up
```

With the embedding server running you can start the front end by navigating to the root of the directory and simply running:

```bash
yarn start

```

This should start a server on http://localhost:3000

```

```

If you have any issues with the setup, please open an issue on this repo.
