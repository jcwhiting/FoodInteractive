Promise.all([
        d3.json("counties.json"),
        d3.json("milkCows.json")
      ])
      .then(data => {
        console.log('loaded!', data);
        myVis(data);
      });
function myVis([geoData, agData]) {
      var w = 1500;
      var h = 850;

      

      var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

      var projection = d3.geoAlbersUsa()
                        .translate([w/2, h/3]);

      var geoGenerator = d3.geoPath(projection);

      
    
        svg.selectAll("path")
           .data(geoData.features)
           .enter()
           .append("path")
           .attr("d", d => geoGenerator(d));


      svg.selectAll("circle")
        .data(agData.filter(function (d) {
          return d.milkCows > 0;
        }))
        .enter()
        .append("circle")
        .attr("class", "milkCows")
        .attr("cx", function(d) {
          console.log(d, projection([d.INTPTLONG, d.INTPTLAT]))
          return projection([d.INTPTLONG, d.INTPTLAT])[0];
        })
        .attr("cy", function(d) {
          return projection([d.INTPTLONG, d.INTPTLAT])[1];
        })
        .attr("r", function(d){
          return Math.sqrt(parseInt(d.milkCows)*0.0008)
        })
        .append("title")
        .text(function(d){
          return "This County has " + d.milkCows + " milk cows.";
        });
     


      }
