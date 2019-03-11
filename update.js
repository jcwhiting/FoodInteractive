Promise.all([
        d3.json("counties.json"),
        d3.json("milkCows.json")
        // d3.json("beef.json"),
        // d3.json("pigs.json"),
        // d3.json("sheep.json")
      ])
      .then(data => {
        console.log('loaded!');
        myVis(data);
      });


function myVis(data) {
      var w = 1500;
      var h = 850;

      var [geoData, milkCows] = data; //, beef, pigs, sheep

      var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

      var projection = d3.geoAlbersUsa();

      var geoGenerator = d3.geoPath(projection);

      
    
        svg.selectAll("path")
           .data(geoData.features)
           .enter()
           .append("path")
           .attr("d", d => geoGenerator(d));

      // var selectedData = milkCows


      
  function updatefunction(selectedData){
    const join = svg.selectAll("circle")
        .data(selectedData.filter(function (d) {
          return d.number > 0;
        }));

        join.enter()
        .append("circle")
        .attr("class", "milkCows")
        .merge(join)
        .attr("cx", function(d) {
          console.log(d, projection([d.INTPTLON, d.INTPTLAT]))
          return projection([d.INTPTLON, d.INTPTLAT])[0];
        })
        .attr("cy", function(d) {
          return projection([d.INTPTLON, d.INTPTLAT])[1];
        })
        .attr("r", function(d){
          return Math.sqrt(parseInt(d.number)*0.0008)
        })
        .append("title")
        .text(function(d){
          return "This County has " + d.number + " milk cows.";
        });
  };
     
updatefunction(milkCows);


      }
