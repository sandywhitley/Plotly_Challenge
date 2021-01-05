function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  var selector1 = d3.select("#dropOptions");
  
  // Use the list of sample names to populate the select options
  d3.json("static/js/samples.json").then((data) => {
    var sampleNames = data.names;

    // former forEach that appeneded selector tag for first dropDown
    // sampleNames.forEach((sample) => {
      // selector
        // .append("option")
        // .text(sample)
        // .property("value", sample);
        //  });

      sampleNames.forEach((sample) => {
      // jquery selector append tag + data value = sample id & divider line
        $('.dropdown-menu').append(`<a data-value="${sample}" class="dropdown-item">${sample}</a> <div class="dropdown-divider"></div>`)
    
        });

        $.ajax({
          crossOrigin: true,
          url: url,
          success: function(data) {
          console.log(data);
          }
        });

        // jquery selector func: on click of a number in dropdown bar, run optionChanged func with selected valued
        $('.dropdown-menu a').click(function(){
        let sampleValue = $(this).attr('data-value')
        $("#navbarDropdown").text("Text Subject ID No. " + $(this).attr('data-value'));
        optionChanged(sampleValue)
        });
      
        // in search form, clear page = to the input and call option changed function
        $(`#searchForm`).submit(function(e){
          e.preventDefault();
          let searchValue = $(`#searchInput`).val()
          optionChanged(searchValue)
          console.log(searchValue)
        })

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    $("#navbarDropdown").text("Subject Number: " + firstSample);
  });
}
// Initialize the dashboard
init();


// Hidden Chart Buttons
$("#option1").click(function(){
  let barChart = $("#bar")
  toggleStyle(barChart)
  // $("#bar").toggle();
});
$("#option2").click(function(){
  let gaugeChart = $("#gauge")
  toggleStyle(gaugeChart)
  // $("#gauge").toggle();
});
$("#option3").click(function(){
  let bubbleChart = $("#bubble")
  toggleStyle(bubbleChart)
  // $("#bubble").toggle();
});
function removeStyle(chart){
  chart.removeAttr("style")
};

function toggleStyle(chart) {
  if (chart.css("visibility") === "hidden") {
    chart.css("visibility","visible");
  } else {
    chart.css("visibility","hidden");
  }
}



function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample); 
}

// Demographics Panel 
function buildMetadata(sample) {
  const newLocal = "static/js/samples.json";
  d3.json(newLocal).then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      // PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      PANEL.append("li.list-group-item").text('${key.toUpperCase()}: ${value}');
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("static/js/samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    var metaData = data.metadata;
    
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var metaDataArray = metaData.filter(sampleObj => sampleObj.id == sample);
    
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    // console.log(result);
    var metaDataSample = metadataArray[0];
    // console.log(metaDataSample)

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    let wfreq = metaDataSample.wfreq;
    let ids = result.otu_ids;
    let labels = result.otu_labels;
    let values = result.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = ids.map(samdpleObj => "OTU " + sampleObj).slice(0,10).reverse()

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: values.slice(0,10).reverse(),
      y: yticks,
      text: labels.slice(0,10).reverse(),
      type:"bar",
      orientation: "h"
    }];
      
    // 9. Create the layout for the bar chart. 
    var barLayout = {
    title: {
      text: "Top 10 Bacterial Cultures Found",
      font: {
      color: "white"
      },
    plot_bgcolor: "333333",
    paper_bgcolor: "333333",
    font:{
      color: "white"
      }
    },
    
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout)


    // 11a. Create the trace for the bubble chart. 
    var bubbleData = [{
      x: ids,
      y: values,
      text: labels,
      mode: "markers",
      marker: {
        color: ids,
        size: values,
        colorscale: "Greens"},
      }],
  
    // 11b. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: {
      text: "Bacteria Cultures per Sample",
      },
      plot_bgcolor: "333333",
      paper_bgcolor: "333333",
      yaxis: {
        tickcolor: "grey",
        tickwidth: 1,
        gridcolor: "grey",
        gridwidth: .25,
        zerolinecolor: "grey",
        zerolinewidth: 1,
      },
      xaxis: {
        tickcolor: "grey",
        tickwidth: .25,
        title: "OTU ID",
        gridcolor: "grey",
        gridwidth: 1,      
        },
      font: {
        color: "white"
        }
      },
  
      // 11c. Use Plotly to plot the data with the layout. 
      Plotly.newPlot("bubble", bubbleData, bubbleLayout)
    
  
    // 12a. Create the trace for the gauge chart.
    var gaugeData = [{
        title: {text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
        },
        value: wfreq,
        type: "indicator",
        mode: "gauge+number",
        gauge: {axis: {range: [null, 10], tickmode: "auto", nticks: 6}, 
                bar: {color: "white"},
                steps: [
                  {range: [0,2], color: "red"},
                  {range: [2,4], color: "orange"},
                  {range: [4,6], color: "yellow"},
                  {range: [6,8], color: "green"},
                  {range: [8,10], color: "blue"}
                ]},
      }],
      
      // 12b. Create the layout for the gauge chart.
      var gaugeLayout = { 
        plot_bgcolor: "333333",
        paper_bgcolor: "333333",
        font: {
          color: "white"
        }
      },
  
      // 12c. Use Plotly to plot the gauge data and layout.
      Plotly.newPlot("gauge", gaugeData, gaugeLayout)
  },
})}
