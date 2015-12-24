// ======================================
// This is our data, plus some utility functions regarding that data
// ======================================

var dataset = {
   datum: [
      [ 5, 20 ],
      [ 480, 90 ],
      [ 250, 50 ],
      [ 100, 33 ],
      [ 330, 95 ],
      [ 410, 12 ],
      [ 475, 44 ],
      [ 25, 67 ],
      [ 85, 21 ],
      [ 220, 88 ],
      [1203, 150]
   ],
   max_X: function(){
      var highest = dataset.datum[0][0];
      for(var i = 0; i < dataset.datum.length; i++){
         if(dataset.datum[i][0] > highest){
            highest = dataset.datum[i][0];
         }
      };
      return highest;
   },
   max_Y: function(){
      var highest = dataset.datum[0][1];
      for(var i = 0; i < dataset.datum.length; i++){
         if(dataset.datum[i][1] > highest){
            highest = dataset.datum[i][1];
         }
      };
      return highest;
   }
};

// ======================================
// Svg dimensions and padding info
// ======================================
var scatterPlot = {
   width: 700,
   height: 300,
   padding: 70
};

// ======================================
// Set up the scales
// ======================================
var xMax = d3.max(dataset.datum, function(d){ return d[0]; }),
   xMin = d3.min(dataset.datum, function(d){ return d[0]; }),
   yMax = d3.max(dataset.datum, function(d){ return d[1]; }),
   yMin = d3.min(dataset.datum, function(d){ return d[1]; }),
   dataPadding = 20;
   
var xScale = d3.scale.linear()
      .domain([xMin, xMax])
      .range([0 + scatterPlot.padding, scatterPlot.width - scatterPlot.padding]),
   yScale = d3.scale.linear()
      .domain([yMin, yMax])
      .range([scatterPlot.height - scatterPlot.padding, 0 + scatterPlot.padding])
   ;  

// ======================================
// Set up the SVG palette
// ======================================
var svg = d3.select('.chart')
   .append('svg')
   .attr('width', scatterPlot.width)
   .attr('height', scatterPlot.height)
   ;


// ======================================
// Bind the data to our dots,
// ======================================
var circles = svg.selectAll('circle')
   .data(dataset.datum)
   .enter()
   .append('circle')
   ;

// ======================================
// format the dots,
// ======================================
circles.attr('cx', function(d){ return xScale(d[0]); })
   .attr('cy', function(d){return yScale(d[1]); })
   .attr('r', function(d){
      // var max = dataset.max_Y();
      // return  (max / d[1]) * 3;
      return 5;
   })
   ;

// ======================================
// then add the text.
// ======================================
svg.selectAll('text')
   .data(dataset.datum)
   .enter()
   .append('text')
      .text(function(d){
         return '(' + d[0] + ', ' + d[1] + ')';
      })
      .attr('x', function(d){ return xScale(d[0]); })
      .attr('y', function(d){return yScale(d[1]);})
      .attr('font-family', 'sans-serif')
      .attr('fill', 'white')
      .attr('font-size', '11px')
      ;
