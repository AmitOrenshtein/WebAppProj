$(document).ready(function () {

  $(".graphsBtn").on("click", function (e) {
      $(".myGraphs").addClass("hidden");
      $(".graphsBtn").removeAttr("disabled");
      $(this).attr("disabled", "true");
      let graphId = $(this).attr("forGraph");
      $("#"+graphId).removeClass("hidden");
  });

  getDataForDates();
  getDataForCategories();
  getDataForProducts();
});

function getDataForDates() {
  $.ajax({
      type: "GET",
      url:"http://localhost:80/purchasehistory/salesbydate",
      success: function(data){
          let parsedData = [];
          for(let date in data) {
              parsedData.push({
                  'date': date,
                  'purchase': data[date]
              });
          }
          fillGraph("datesGraph", parsedData, 'date', 'purchase');
      },
      error: function (XMLHttpRequest, textStatus, error) {
          console.log(error);
      }
  });
}

function getDataForCategories() {
  $.ajax({
      type: "GET",
      url:"http://localhost:80/purchasehistory/salesbycategory",
      success: function(data){
          let parsedData = [];
          for(let category in data) {
              parsedData.push({
                  'category': category,
                  'purchase': data[category]
              });
          }
          fillGraph("categoryGraph", parsedData, 'category', 'purchase');
      },
      error: function (XMLHttpRequest, textStatus, error) {
          console.log(error);
      }
  });
}

function getDataForProducts() {
  $.ajax({
      type: "GET",
      url:"http://localhost:80/products/groupproductsbycat",
      success: function(data){
          let parsedData = [];
          data.forEach(category => {
              parsedData.push({
                  'category': category["_id"]["category"],
                  'amount': category.count
              });
          });
          fillGraph("productsGraph", parsedData, 'category', 'amount');
      },
      error: function (XMLHttpRequest, textStatus, error) {
          console.log(error);
      }
  });
}

function fillGraph(graphID, data, xField, yField) {
  var margin = {top: 30, right: 30, bottom: 70, left: 60},
      width = 600 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
  var svg = d3.select("#"+graphID)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


// X axis
  var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(data.map(function(d) { return d[xField]; }))
      .padding(0.2);
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

// Add Y axis
  var y = d3.scaleLinear()
      .domain([0, Math.max.apply(Math, data.map(d => d[yField]))])
      .range([height, 0]);
  svg.append("g")
      .call(d3.axisLeft(y));

// Bars
  svg.selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d) { return x(d[xField]); })
      .attr("y", function(d) { return y(d[yField]); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d[yField]); })
      .attr("fill", "#69b3a2")
}