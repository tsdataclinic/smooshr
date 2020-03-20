# smooshr tutorial

Thanks for agreeing to beta test Data Clinic’s new open source tool: Smooshr. Smooshr is a tool that makes it easy to create and share recipes for cleaning messy datasets with a particular focus on open data.

Over the next year we aim to build out multiple tools within Smooshr that will do things like standardize time formats or geographic coordinates, but for now the tool focuses on producing concise taxonomies.

What do we mean by that? Well, often data from open data portals, or even commercial datasets, will have categorical columns that have been entered either as free text or from a very long list of options. The entries in these columns can often be verbose and over specified for analysis and the categories used can differ from year to year or city to city.

Smooshr provides a workflow to condense these columns into a more manageable taxonomy by merging unique entries to produce a more concise, useful classification. It also allows for combining multiple datasets and standardizing column names, etc.

## New York 311 data

In this document we are going to walk through the process of

-   Loading data into Smooshr
-   Identifying common columns
-   Creating a reduced taxonomy for call types
-   Exporting the results as a cleaning recipe and a python script to perform the cleaning.

To do this, we are going to investigate a notoriously messy dataset from the New York open data portal: 311 complaints. The 311 system is what New Yorkers use to report non-emergency incidents to the city. As we will see, this can be anything from complaints about street light conditions to bees and wasps!

## Our Goal

We are going to attempt to tame the 311 data by merging data from 2009 and 2008. We will use smooshr to consolidate call types into two new categories that capture the complaints about infrastructure and animals.

## Procedure

Feel free to explore Smooshr more generally but we would love it if you could walk through the following steps to get a feel for what the tool does.

As you do so, think about your feedback, which can be entered in this form [http://ts.twosigma.com/smooshr_feedback](http://ts.twosigma.com/smooshr_feedback)

## Downloading the data

First, we want to download the data we will be using from the open data portal. These links are for the 2009 and 2008 311 data:

-   [311 Calls from 2009](https://data.cityofnewyork.us/api/views/uzcy-9puk/rows.csv?accessType=DOWNLOAD)

-   [311 Calls from 2008](https://data.cityofnewyork.us/api/views/3rfa-3xsf/rows.csv?accessType=DOWNLOAD)

## Load up smooshr

Once you have the data, load up Smooshr by going to [https://www.twosigma.com/smooshr](https://www.twosigma.com/smooshr). You should see a screen that looks like this:

![Home Page](https://tsdataclinic.github.io/smooshr/tutorial_screenshots/smooshr_1.png)

## Create a project

Everything in Smooshr is organized around projects. Let’s create a new project for our 311 data. Click the “New Project” button in the upper right-hand side and enter “311 data” for the name and a description of “Cleaning data from the NY open data portal”

![New Proeject](https://tsdataclinic.github.io/smooshr/tutorial_screenshots/smooshr_2.png)

Hit submit and you should have a new project on the dashboard

![New Project Dashboard](https://tsdataclinic.github.io/smooshr/tutorial_screenshots/smooshr_3.png)

You can have multiple projects in Smooshr. They are all stored and processed locally on your machine, so you don't have to worry about sending off sensitive information to third parties. This, however, means that if you move to a different browser or computer, the projects you worked on won’t be available. In the next phase of the project, we will be adding the ability to share projects with others or persist them on a backend, but we want to retain the local processing option.

For now, click on the project to open it up.

## Loading a dataset

![Empty Proeject](https://tsdataclinic.github.io/smooshr/tutorial_screenshots/smooshr_4.png)

Projects consist of datasets and columns. This project is currently empty, so let’s add our first dataset. To do so, click the “Add Dataset” in the top-right corner.

![Load Data](https://tsdataclinic.github.io/smooshr/tutorial_screenshots/smooshr_5.png)

Smooshr can load in data from multiple different sources: locally from files on your machine, from a URL, or from the NYC open data portal directly (we plan to add more cities to the tool as it grows).

We are going to use the file option in this walk through because the URL and open data portal options are a little twitchy while running Smooshr within Two Sigma’s network.

Simply drag the 2009 dataset to the indicated space or click on the “drag ‘n’ drop …” line to open a dialog and select the file. The file might take a minute to load as it’s parsing a lot of data— over 1.7 million rows!

Once it’s done you should see a screen that looks like this:

![Columns](https://tsdataclinic.github.io/smooshr/tutorial_screenshots/smooshr_6.png)

This is a summary of each column in the dataset, the number of unique entries in that column, and a snapshot of a few of those unique entries.

We need to select which columns we want to work on. In our case, we will select Complaint Type and Descriptor, which contain data about the nature of the 311 complaint.

Check the boxes for those columns and hit load. This will add the dataset and the two columns we want to work on to our project.

![Project With Data](https://tsdataclinic.github.io/smooshr/tutorial_screenshots/smooshr_7.png)

Repeat the steps in this section to import the 2008 dataset as well. When you are done, you should have a screen that looks like this:

![Project With Data 2](https://tsdataclinic.github.io/smooshr/tutorial_screenshots/smooshr_8.png)

## Merging columns

In the final dataset we want to combine Complaint Type from 2008 and 2009 into a single column and do the same for Descriptor. In this example, the column names are the same but that won't always be the case.

To do this, we can merge the columns. Select both Complaint Type columns and hit the Merge 2 columns button.

This creates a combined column:

![Project With Data](https://tsdataclinic.github.io/smooshr/tutorial_screenshots/smooshr_9.png)

Do the same for Descriptor so we end up with just two columns:

![Project With Data 2](https://tsdataclinic.github.io/smooshr/tutorial_screenshots/smooshr_10.png)

Finally, let’s rename these columns to something a little friendlier. Click the icon next to the column name and enter a new one. This is what the combined column will be named in the final dataset.

## Creating a taxonomy

Now that we have merged and renamed our columns, it’s time to do the fun part of creating a new taxonomy. Let’s start with the Complaint Type column, simply click the Work on Mappings button to be taken to a screen that looks like this:

![Taxonomy Start](https://tsdataclinic.github.io/smooshr/tutorial_screenshots/smooshr_11.png)

The list of entries in the top half of the page shows the unique complaint types found in the combined 2009 and 2008 datasets. The number in each one indicates the number of times the entry occurred. For example, there are 4038 complaints with the type asbestos.

![Asbestos](https://tsdataclinic.github.io/smooshr/tutorial_screenshots/smooshr_15.png)

Currently the list is ordered alphabetically, but we can change it to be listed from most to least common by selecting order by “occurrences” in the top left corner.

![sort](https://tsdataclinic.github.io/smooshr/tutorial_screenshots/smooshr_16.png)

Doing so, we quickly see that “heating” and “street light conditions” are the biggest concern. We wanted to look at infrastructure and animals, however, so let’s try and find some entries that should be contained in those categories.

Type “animal” into the search bar at the top to quickly filter the entries.

![Search](https://tsdataclinic.github.io/smooshr/tutorial_screenshots/smooshr_11.png)

Great, let’s create a new merged group from this list. Click on each entry to highlight it, then click on “New Mapping 7”. This creates a new group that these entries will be mapped to in the resulting dataset:

![Asbestos](https://tsdataclinic.github.io/smooshr/tutorial_screenshots/smooshr_12.png)

The group takes its name from the first entry we added but we probably want to change that. Click the icon next to “Animals in a park” to change the name of the group. Remember, this is the category name that will be used in the final dataset, so let’s just call it Animals for now.

The left side of the group view shows the entries that are in this group. If any made it in there by accident or you changed your mind about one, you can remove it by clicking on the cross next to that entry.

On the right, we see recommendations for other entries we might want to add to the group. There are two types of suggestions:

1. Text-based: this suggests entries that are similar in their literal text. This can be useful for finding entries that are not spelled correctly or typos. In this case, the suggestions are not great.
2. Meaning-based: these are suggestions based on the meaning of the group calculated from word embeddings. which can be much more useful for finding similar entries that mean the same thing but might have very few words in common.

Select the meaning suggestions by clicking on the meaning tab

![meaning](https://tsdataclinic.github.io/smooshr/tutorial_screenshots/smooshr_13.png)

Much better! We get a few good suggestions in there like “unsanitary pigeon condition” or “unleashed dog” . Add these to the mapping by clicking on the check sign next to them. You will notice that as you add these to the group, Smooshr automatically updates its suggestions.

We also have a few entries like “illegal fireworks” or “maintenance or facility” which have nothing to do with animals. We can reject these by clicking the cross next to them. This removes them from the suggestions and also tells our suggestion algorithm to ignore other entries with similar meanings.

Keep adding entries either through the search interface of the suggestion interface until you think you have them all.

Let’s next look for infrastructure issues. We saw lighting issues before—let’s start with that. Search for “Light” in the search box and create a new category for anything that looks like an infrastructure concern.

This is obviously a little subjective but the list I came up with looks something like this

![infra](https://tsdataclinic.github.io/smooshr/tutorial_screenshots/smooshr_14.png)

Once you are done generating these categories, try and make a few of your own. You can track how many entries are still unmerged and how many occurrences that corresponds to in the progress indicator:

Not every entry needs to be in a category, so don't worry if there are a bunch that don't fit into a specific category.

Once you are all done making your mappings, click the arrow on the bottom left to go back to the project view.

From there you can do something similar for the “Description” column, or you can move on to the next section.

## Exporting the results

Currently Smooshr doesn’t directly apply these mappings to your dataset (though we are working on that), but instead produces a recipe as a json file and a python script to run that recipe.

The reasons for this are the following:

1. We want this to fit into existing processing flows easily. The python script can easily be copied and pasted into a larger ETL pipeline

2. We want people to learn from the code we produce. Currently the code isn’t heavily annotated, but will be in the final release. By doing so, we hope people are able to tell how the code works and be able to tweak the code to customize the process.

3. We want to be able to share these pipelines, especially when they are targeted at open data. The hope is that this reduces the amount of duplicate work, saving time when using open data.

To export the project, go back to the project screen and select “Export Project” or “Export Python Code”. You will be prompted with a few more options to customize how the script runs, then your project description and code will be downloaded in a zip file.
To export the project, go back to the project screen and select “Export Project” or “Export Python Code”. You will be prompted with a few more options to customize how the script runs, then your project description and code will be downloaded in a zip file.
