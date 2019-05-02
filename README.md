# Lesson: Interactive Mapping With Mapbox GL JS

![](https://paper-attachments.dropbox.com/s_23962B8C37497393D9B6FF3F8168412ECF2402DD7564ED836A55E1EC6E22EE20_1551852373613_Screen+Shot+2019-02-28+at+8.32.31+AM.png)

***Note: More instructions are available in the code***

⚙️ **Resources for this lesson:**

🔗 The code, the data, the lesson -  https://github.com/lobenichou/cuny-mbx-2019

🔗 Mapbox sign-up - [bit.ly/mapbox-signup](http://bit.ly/mapbox-signup)

🔗 [Scrollama](https://github.com/russellgoldenberg/scrollama) library

🔗 [NY Census Tract Demographic Data](https://www.kaggle.com/muonneutrino/new-york-city-census-data/version/2#nyc_census_tracts.csv)

🔗 [NY Census Tract Demographic Data](https://www.kaggle.com/muonneutrino/new-york-city-census-data/version/2#nyc_census_tracts.csv)

🔗 [NY Subway Lines](https://data.cityofnewyork.us/Transportation/Subway-Lines/3qz8-muuu)

🔗 [NY Subway Stations](https://data.cityofnewyork.us/Transportation/Subway-Stations/arq3-7z49)


***Note: The data was prepared for you to use. This lesson doesn’t go into data clean-up and geo-processing. DO NOT USE THIS DATA FOR PUBLISHING. It needs to be fact-checked and some of it may be missing or invalid. This data solely is used to demonstrate data-driven styling.***

⚙️ **Resources to further your knowledge:**

🔗 [Our awesome glossary](https://docs.mapbox.com/help/glossary/) from our Doc Queens 👑

🔗 [Our Election Guide](https://blog.mapbox.com/visualizing-election-data-a-guide-to-mapbox-gl-expressions-92cc469b8dfd) covers a bunch of our core elements, like expressions and feature-state

🔗 [The Guide To Map Design](https://www.mapbox.com/map-design/) by [Amy Lee Walton](https://twitter.com/amyleew)

🔗 Convert GeoJSON to MBTiles using [tippecanoe](https://github.com/mapbox/tippecanoe)


# 1 - Introduction to geo data
## Tileset:

A [**tileset**](https://www.mapbox.com/help/define-tileset) is a collection of raster or vector data broken up into a uniform grid of square tiles at up to 22 preset zoom levels. Tilesets are used in Mapbox libraries and SDKs as a core piece of making maps visible on mobile or in the browser; they are also the main mechanism we use for determining [map views](https://www.mapbox.com/help/define-map-view/).

Tilesets are made up of vector tiles and are developed for caching, scaling and serving map imagery rapidly.

Mapbox web and mobile-ready vector tiles are 75% smaller than a raster tilesets. This results in fast, smooth zooming from the worldview of a map down to street-level detail.
Tilesets are highly cacheable and load quickly. Vector tiles are developed for caching, scaling and serving map imagery rapidly – to vector data.

As the name suggests, vector tiles contain vector data instead of the rendered image. They contain geometries and metadata – like road names, place names, house numbers – in a compact, structured format. Vector tiles are rendered only when requested by a client, like a web browser or a mobile app. Rendering happens either in the client.


## Mapbox File types:

**CSV**


![](https://paper-attachments.dropbox.com/s_50EEDCA7947791B75F33CD388F18E96B2D817BF4D6A654F9CA53F7D29F431CBD_1552101439099_Cdb2Yk26asXjvd1a5qozUyhXW78FyAqh7LgwASVZljjIBhk-V9XgsFE2O1PXoQWVYMRXlq6ZT28IEjpk_nps97VUbcoUE8jOI9zJcwHQ_1WFgwVPWh7ZZyArl4yQbKSPoNZuCJ21MUw.png)


The **CSV** (comma-separated values) format is common for table data, like the kind you may use in Excel or other spreadsheets. CSV files aren’t necessarily mappable unless they contain geographic information (like latitude and longitude).

When uploading CSV files, keep the following in mind:


- Check out the [Mapbox Uploads API documentation](https://docs.mapbox.com/api/) for the current size limit for CSV files.
- CSV files must be in UTF-8 encoding.
- CSV files must contain coordinates (latitude and longitude) when uploading in Mapbox Studio or Mapbox Studio Classic.
- CSV files are for point data only.

**GeoJSON**


![](https://paper-attachments.dropbox.com/s_50EEDCA7947791B75F33CD388F18E96B2D817BF4D6A654F9CA53F7D29F431CBD_1552101520402_0SVEgCPUYw-Iq-mhsUDcvmStyYOz4kTFVUYgAVMQ7T16k7IALQlrxYSBHsdSeJRVWsQEFTxxQusW5RGZGUvuVVdTgQcO6Go-2AAzWi94cE5b-aoCAXXjSQd9qggbjrsJgIIBg2QV_N4.gif)


[**GeoJSON**](http://geojson.org/) is a file format for map data served by Mapbox [web services and APIs.](https://docs.mapbox.com/api/) As a subset of the [JSON](https://www.json.org/) format, it can be parsed in modern software and native to the JavaScript language.
There are several open source tools for converting other geospatial data formats to GeoJSON. A few faves:


- [togeojson](https://www.npmjs.org/package/togeojson), a node package for converting KML and GPX (XML formats).
- [ogr2ogr](http://www.gdal.org/ogr2ogr.html), the ultimate 40-in-1 vector data conversion tool.
- [geojson.io](http://geojson.io) for creating, converting, and editing GeoJSON.

**MBTiles**

![](https://paper-attachments.dropbox.com/s_50EEDCA7947791B75F33CD388F18E96B2D817BF4D6A654F9CA53F7D29F431CBD_1552101614814_uKV9VZgC77uTUC697Aek2rOP_BkWUxB9hDFQbS-jizVvqxX0GFpUsUH_5Es0J2eOf-PpgZ9xTccEctDOFw1PWmB-7tKsRBlRvSwa_6r6Idd_YQRn172uxRP2_FedOHFPReyAOXBuhqM.png)


**MBTiles** is a file format for storing [tilesets](https://www.mapbox.com/help/define-tileset). It’s designed so that you can package the potentially thousands of files that make up a tileset and move them around, eventually uploading to Mapbox or using in a web or mobile application. [MBTiles is an open specification](https://github.com/mapbox/mbtiles-spec) and is based on the [SQLite](https://sqlite.org/) database. MBTiles can contain raster or vector tilesets.

**KML**

![](https://paper-attachments.dropbox.com/s_50EEDCA7947791B75F33CD388F18E96B2D817BF4D6A654F9CA53F7D29F431CBD_1552101717660_JHkQUFnA_E4SoLBPpRmx6EXrdnvoGxi9cL4ggnV60HT38fvqTZ6MaCrz6XREULxPv5H6X_au2uGUjnCnR8iz38olTJmKjBmDQ5RQgSGisZm0lG5xjfzZfVau4wxsr42kLVRkxepf37o.png)


[**KML**](https://developers.google.com/kml/documentation/kmlreference) is a file format that is like [GeoJSON](https://www.mapbox.com/help/define-geojson/), but used more commonly in Google products. Like GeoJSON, it can store points, lines, polygons, and other vector data. Unlike GeoJSON, it’s based on [XML](https://en.wikipedia.org/wiki/XML), rather than [JSON](http://www.json.org/). When uploading KML, please note that Mapbox does not support any KML extensions.

**GPX**


![](https://paper-attachments.dropbox.com/s_50EEDCA7947791B75F33CD388F18E96B2D817BF4D6A654F9CA53F7D29F431CBD_1552101729059_sYeff4-sRnxPY6oiQu5RWpKqOktIVkab-gZlqcdtQQr1p1jIfA8o0nt3syQtU4blRZwM3Q1X8tbBfd90-XLfGwsNlvjXwEgKQ_MkT9tpKUzwz0XoaiKNhbWd5INmcqelMh0ODO4_h6E.png)


[**GPX**](http://en.wikipedia.org/wiki/GPS_eXchange_Format), or GPS eXchange format, is a data format commonly created from GPS receivers.
You can upload GPX files to your Mapbox account to use in a custom map style. Please note that Mapbox does not support values along lines (for example, elevation and time at various points along a jogging route). A GPX file with values along a line can be uploaded, but Mapbox will ignore any data along the line.

**Shapefile**


![](https://paper-attachments.dropbox.com/s_50EEDCA7947791B75F33CD388F18E96B2D817BF4D6A654F9CA53F7D29F431CBD_1552101803249_Screen+Shot+2019-03-08+at+7.23.13+PM.png)


A **shapefile**, also known as an [ESRI shapefile](https://en.wikipedia.org/wiki/Shapefile), is a file format for storing geographic vector data.
When uploading shapefiles, keep the following in mind:


- Check out the Mapbox Uploads API documentation for the current size limit for shapefiles. Note that this limit applies to the shapefile’s uncompressed size, not the size of the compressed zip.
- Shapefiles are composed of several individual files, which should be combined into a single zip file before uploading. Of these files, Mapbox can read shp, shx, dbf, prj, and index files. Any other files you upload with your zip file will be ignored.

**TIFF**

![](https://paper-attachments.dropbox.com/s_50EEDCA7947791B75F33CD388F18E96B2D817BF4D6A654F9CA53F7D29F431CBD_1552101864821_download.png)


A **TIFF**, or sometimes TIF, is a file format for saving raster images. With Mapbox, a TIFF is often a GeoTIFF, meaning the file is embedded with georeferencing information.

You can upload TIFF files as [tilesets](https://www.mapbox.com/help/define-tileset) in Mapbox Studio and use them in the Mapbox Studio style editor. When uploading a TIFF file, keep in mind the [current size limit for TIFF files](https://www.mapbox.com/help/upload-troubleshooting).


## 🔺 Geometry types
- Points
- Line strings
- Polygons/multi-polygons
- Multi-part collections


# 2 - The Mapbox Ecosystem

**Dataset**: Edit your data 📝

**Tileset**: Bake your data into Vector tiles or upload rasters 🗾

**Styles**: Customize your style in the Studio interface — You can also style your data here 🎨

**Libraries**: Add your style to applications using one of our Mapbox libraries — You can also style your data here *👩‍💻*  (GL JS, IOS SDK…)


# 3 - The Process

**Example 1:**

- Upload you data to Studio to style it
- Add interaction using Mapbox GL JS

**Example 2:**

- Use a core style (dark, light, streets)
- Add you data on the frontend using Mapbox GL JS
- Style the data using [expressions](https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions) in Mapbox GL JS

**Example 3:**

- Upload the data in dataset editor
- Edit your data
- Style it in Studio
- Export a high-res PNG and do the rest in Photoshop or use as is


# 4 - Studio


## ⬜ Tilesets


- Lightweight collections of vector data
- Optimized for rendering
- **Not editable** but can be styled in the Mapbox Studio style editor.


## 📂 Files and Uploads

🔗  [Mapbox upload limits](https://docs.mapbox.com/help/troubleshooting/uploads/#accepted-file-types-and-transfer-limits)


![](https://paper-attachments.dropbox.com/s_23962B8C37497393D9B6FF3F8168412ECF2402DD7564ED836A55E1EC6E22EE20_1552098288629_Screen+Shot+2019-03-08+at+6.24.38+PM.png)



## ⬜  Mapbox-Provided Tilesets

🔗 [Mapbox tilesets](https://studio.mapbox.com/tilesets/)


![](https://paper-attachments.dropbox.com/s_037EB778570F3866DBD21007C6214691D1A59F35A945B397BA25D3B8FB58768E_1556645153724_Screen+Shot+2019-04-30+at+1.25.43+PM.png)



## 🖼️ Core styles

🔗 [Mapbox Studio](https://studio.mapbox.com/)


![](https://paper-attachments.dropbox.com/s_23962B8C37497393D9B6FF3F8168412ECF2402DD7564ED836A55E1EC6E22EE20_1552100889034_Screen+Shot+2019-03-08+at+7.05.58+PM.png)

![](https://paper-attachments.dropbox.com/s_23962B8C37497393D9B6FF3F8168412ECF2402DD7564ED836A55E1EC6E22EE20_1552100918312_Screen+Shot+2019-03-08+at+7.06.08+PM.png)


## 🖥️  Studio Dashboard

🔗 [Mapbox Studio](https://studio.mapbox.com/)


![](https://lh6.googleusercontent.com/z9OQ_4i4H9FHxMXbfcmIZC057Y3tA5oAQQvvQCoDjTfzcwjv_lF0H91mRQKLuYKW91pUI2CeJVYHnAmU8_IDaUcTzp9SEqVxN1H0Lr9-FLrqydnYyRIcb0JaxZiJkBhyGh1JdLawHRk)



## 🔢 Data Type Supported by Studio

🔗 [Layers](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers)

  - Fill
  - Fill-extrusion
  - Line
  - Circle
  - Symbol
  - Heatmap
  - Hillshade
  - Raster


##  👐 Hands-on: let’s do some styling

🔗 [Studio docs](https://docs.mapbox.com/studio-manual/overview/)


  - Upload the data into Mapbox
  - Add it to a style
  - Do some data-driven styling


# 5 - Mapbox GL JS

🔗 [Mapbox GL JS Repo](http://- https://github.com/mapbox/mapbox-gl-js)

[](http://- https://github.com/mapbox/mapbox-gl-js)A lot of what we just did in Studio can be done in Mapbox GL JS as well


## 📑 General Concepts


  - GL JS uses WebGL which allow the browser to access your computers GPUs (Makes it faster)
  - It uses an HTML element called Canvas
  - You can style data, add data, add interactivity and more
  - Maps are just shapes and therefore, any shapes can be uploaded to Mapbox and interacted with (cartogram, rasters)
      - [Cartogram](https://www.washingtonpost.com/election-results/house/?utm_term=.dc4cbe6f27e1)
      - [Panorama](https://www.washingtonpost.com/graphics/2019/national/bears-ears/)


## 👐 Hands-on: let’s build a “scrolly-telly” map

🔗 [The code](https://github.com/lobenichou/cuny-mbx-2019)


  - [Set up a map](https://docs.mapbox.com/mapbox-gl-js/example/simple-map/)
  - [Add a custom style](https://docs.mapbox.com/mapbox-gl-js/example/custom-style-id/)
  - [Interact with the map](https://docs.mapbox.com/mapbox-gl-js/examples/#user-interaction)


![](https://paper-attachments.dropbox.com/s_037EB778570F3866DBD21007C6214691D1A59F35A945B397BA25D3B8FB58768E_1556645177731_Screen+Shot+2019-04-30+at+12.10.06+PM.png)

![](https://paper-attachments.dropbox.com/s_037EB778570F3866DBD21007C6214691D1A59F35A945B397BA25D3B8FB58768E_1556645233078_Screen+Shot+2019-04-30+at+12.12.40+PM.png)

![](https://paper-attachments.dropbox.com/s_037EB778570F3866DBD21007C6214691D1A59F35A945B397BA25D3B8FB58768E_1556645240244_Screen+Shot+2019-04-30+at+12.11.00+PM.png)

![](https://paper-attachments.dropbox.com/s_037EB778570F3866DBD21007C6214691D1A59F35A945B397BA25D3B8FB58768E_1556645306755_Screen+Shot+2019-04-30+at+1.28.16+PM.png)



## ➕ Extras:
  - [Adding layers and sources](https://docs.mapbox.com/mapbox-gl-js/examples/#layers)
  - Styling layers (optional based on timing since it can be done in studio)
  - [Expressions (optional bc it’s a bit more advanced)](https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions)
  - [Filters](https://docs.mapbox.com/mapbox-gl-js/api/#map#setfilter)
