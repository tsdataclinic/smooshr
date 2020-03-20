## Smoosher

Introducing smooshr, a quick and friendly way to clean messy datasets.

Datasets can be messy and as data scientists, data journalists, civic technologists or just the curious people, we spend a lot of our time trying to clean it up. That's why we built smooshr, a browser based tool that aids you in producing code that can quickly clean up unruly datasets.

Our first release focuses on entity consolidation tasks but we have plans to extend this to other forms of data cleaning in the near future.

## Offline first

One of the design decisions we made with smooshr was to focus on offline first functionality. When you load a dataset in to smooshr, it never leaves your computer. All the processing is done locally within the browser and the only calls to a server we make are to get the individual word embeddings that are used to provide suggestions for categories. The server that provides these suggestions has no logging of any kind.

This is important as we want people to feel comfortable using the tool even with sensitive datasets. Ensuring everything is processed and stored locally means you can feel assured your data is secure.

## What can it do?

The first data cleaning task we have built in to smooshr is that of creating a common taxonomy or entries within and between datasets. By this we mean that smooshr will let you quickly regroup categorical variables that may have been entered by hand or with way too much specicivity into a smaller number of categories suitable for analysis.

1. Categories that are entered through a free text entry that have minor variations. For example "
2. Categories with way too many subcategories. For example if you want to easily combine "Automobile - car" "Automobile - van", "Automobile - truck" etc in to "Automobile"
3. Data that has categories that changes from year to year. For example if a dataset for 2018 refers to a category about housing as "homes" and the release of the 2019 dataset refers to them as 'houses', smooshr can help standardize these across the files.

## Export your workflow as code

Smooshr is designed to be useful and then to get out of your way. Once you have generated the mappings for your new taxonomy, you can export a package of python code that can be run to apply the transforms for your script. This easily allows you to incorporate this step into a larger ETL pipeline or to teak the cleaning script as you see fit. Dont want to use our python code, no problem, simply export the results as a json file that can be easily loaded in to your own scripts to transform your data.

## Future development

We are looking to extend smooshr's abilities in the near future to also include the following tasks

1. Creation of new columns by extracting parts of strings through regex.
2. Joining of string columns together through a format string pattern. For example if you had a file with the following columns : City, Street, Zip, Country you could easily combine them in to a single column called address.
3. Date and time format standardisation. Quickly identify and tweak date time formats in columns
4. Standardisation of geospatial units and coordinates.

If you would like to suggest other ways smooshr could help, please feel free to add an issue on the repo.

## What is the Data Clinic?

As the data and tech philanthropic arm of the investment manager Two Sigma, Data Clinic provides pro bono data science and engineering support to nonprofits and engages in open source tooling and research that contribute to the Data for Good movement.

We leverage Two Sigma’s people, data science skills, and technological know-how to support communities, mission driven organizations, and the broader public in their effort to use data more effectively.

To learn more visit [dataclinic.twosigma.com](dataclinic.twosigma.com) and connect with us via [mailto:dataclinic@twosigma.com](dataclinic@twosigma.com).

# Running smooshr locally

If you want to run smooshr locally, to either help with development or just to have your local copy, follow these instructions

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

and place the resulting file in to the server folder.

The easiest way to run the server is using docker-compose. To do so install [docker]() and [docker-compose]() then simply run

```bash
docker-compose up
```

With the embedding server running you can star the frontend by navigating to the root of the directory nad simply running:

```bash
yarn start

```

This should start a server on http://localhost:3000

```

```

If you have any issues with the setup, please open an issue on this repo.

f
