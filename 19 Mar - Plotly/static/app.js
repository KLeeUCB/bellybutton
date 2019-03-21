function buildMetadata(sample) {

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url).then(function(data) {
    console.log(data);
  });

    // Use d3 to select the panel with id of `#sample-metadata`
    var selector = d3.select("#sample-metadata");

    selector.html("");

    // Use `.html("") to clear any existing metadata
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    
    Object.entries(ufo).forEach(function([key, value]){

      selector.append("h6").text(`${key}:${value}`);

    });
};

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(url).then(function(data) {
    console.log(data);

    // @TODO: Build a Bubble Chart using the sample data
    trace0 = {
      x: data.otu_ids,
      y: data.sample_values,
      type: "scatter",
      mode: "markers",
      marker = dict(
        color = data.otu_ids,
        size = data.sample_values,
        text = data.otu_labels 
      )};
  });
  chart_data = [trace0]

  var chart_layout = {};

  Plotly.newPlot("plot", chart_data, chart_layout);

    // @TODO: Build a Pie Chart
    trace1 = {
      x: otu_ids.slice(0, 10);,
      y: sample_values.slice(0, 10);,
      type: "pie",
      mode: "markers"
    }

  data = [trace1]

  var layout = {};

  Plotly.newPlot("plot", data, layout);

//     // HINT: You will need to use slice() to grab the top 10 sample_values,
//     // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
