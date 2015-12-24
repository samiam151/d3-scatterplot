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
      [ 220, 88 ]
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
   width: 600,
   height: 200,
   padding: 30
};

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
circles.attr('cx', function(d){return d[0] + scatterPlot.padding;})
   .attr('cy', function(d){return d[1] + scatterPlot.padding;})
   .attr('r', function(d){
      var max = dataset.max_Y();
      return  (max / d[1]) * 3;
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
      .attr('x', function(d){return d[0] + scatterPlot.padding;})
      .attr('y', function(d){return d[1] + scatterPlot.padding;})
      .attr('font-family', 'sans-serif')
      .attr('fill', 'white')
      .attr('font-size', '11px')
      ;
