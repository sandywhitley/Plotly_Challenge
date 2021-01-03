# Plotly_Challenge - Belly Button Biodiverstity Dashboard
#### VDAB Module 12 Plotly, HTML, CSS, Bootstrap and Javascript
Sandra Whitley | Jan 2021
******************************************************

## Overview
The purpose of the Belly Button Biodiversity Dashboard project was to practice html (Hypertext Markup Language) css (Cascading Style Sheets), Bootstrap, Javascript, and Plotly to develop a dynamic webpage capable of querying a JSON data file. 

In this exercise, the Bellybutton Biodiversity web page was built using html primarily for the web page structure and then css (Cascading Style Sheets) and Bootstrap for styling queues. The charts.js was written to give the webpage table searchabilty while the samples.json file served as the content for the webpage table.

The Test Subject ID No. was built to allow querying on the Test Subject ID. The Demographic Info panel would provide metadata demographic info on the Test Subject Id and the various graphs would provide the data visualizations of the belly button biodiversity.

## Results
Unfortunately I was persistently plagued with a "Uncaught Syntax Error: Unexpeced token ' : ' in the samples.json file line 2 in the Chrome console. The colon referenced was a required component of the json file data structure. Eliminating it did not resolve the error. This error prevented the sample.json file from ever loading.

A great amount of time and multiple resources were explored to resolve the error such as redeploying D3.json, downloading Ajax and calling it in the charts.js, to name a couple. Ultimately I did as much coding as possible without being able to load the samples.json file to properly test the code.

This webpage pic shows the index page with console error.


![snip](/static/images/snip.PNG)
