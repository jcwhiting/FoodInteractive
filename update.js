Promise.all([
        d3.json("bookstates.json"),
        d3.json("milkCows.json"),
        d3.json("beef.json"),
        d3.json("sheep.json"),
        d3.json("pigs.json"),
        d3.json("wheat.json"),
        d3.json("cornGrain.json"),
        d3.json("soyBeans.json"),
        d3.json("vegetables.json"),
        d3.json("fruits.json")
        ])
      .then(data => {
        console.log('loaded!');
        myVis(data);
      });
      var w = 1500;
      var h = 850;

      var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

      
      var dataArray = ["Milk Cows", "Beef Cows", "Sheep", "Pigs", "Wheat",
      "Corn Grain", "Soy Beans", "Vegetables", "Fruits"];

    var agMenu = d3.select("#dropdown");
                    

        agMenu.append("select")
               .selectAll("option")
               .data(dataArray)
               .enter()
               .append("option")
                .attr("value", (d) => {return d;})
                .text((d) => {return d;});

function myVis(data) {
        var [geoData, milkCows, beefCows, sheep, Pigs, Wheat, CornGrain, SoyBeans, Vegetables, Fruits] = data;

        var projection = d3.geoAlbersUsa()
                           .translate([w/2, h/2.5]);

      var geoGenerator = d3.geoPath().projection(projection);

        
        svg.selectAll("path")
           .data(geoData.features)
           .enter()
           .append("path")
           .attr("d", d => geoGenerator(d));

                          
      console.log("on to the menu")
      

     //use textHole strategy to make a div with a p that changes based on 
     //selection from dropdown menu!! you can do this! 

  console.log("time to circle up")   
    var t = d3.transition()
      .duration(900);
  
  var fillMap = {BeefCows:"#2E8B57", MilkCows:"#FF8C00", Sheep:"rebeccapurple",
                  Pigs:"pink",
                  Wheat:"green", CornGrain:"yellow", SoyBeans:"blue", Vegetables: "red",
                  Fruits:"turquoise"}

  var textBox = svg.append("text")
                    .attr("x", 1080)
                    .attr("y", 300)
  var textDict = {"Milk Cows" : "milk text",
                  "Beef Cows" : "beef text, your hamburger iskilling the environment",
                  "Sheep" : "sheep text",
                  "Pigs": "oink oink brah",
                  "Wheat" : "amber waves of grain",
                  "Corn Grain":"this is for animals not people",
                  "Soy Beans": "these beans are food additives",
                  "Vegetables":"why aren't there more of these????",
                  "Fruits":"How many of me have you had today?"
                  };

  var textHole = svg.append("text")
                    .attr("x", 0)
                    .attr("y", 300)
  var textHole2 = svg.append("text")
.attr("x", 0)
.attr("y", 320)

  function circlefunction(selectedData, datasetName){
    console.log('my data is ', datasetName)
    var joinAg = svg.selectAll("circle")
                    .data(selectedData, d => {
                      return d.place;
                    })

    joinAg.enter()
          .append("circle")
          .merge(joinAg)
          .on('mouseover', d => {
            // console.log(d)
            textHole.text(`${d.place}`)
            textHole2.text(`${d.number}`)
          })
          .transition(t)
          .attr("cx", function(d) {
            return projection([d.lon, d.lat])[0];
            })
          .attr("cy", function(d) {
            return projection([d.lon, d.lat])[1];
            })
          .attr("r", function(d){
            // console.log("what up")
            return Math.sqrt(Number(d.number)*0.0008)
            })
          // .attr("class", d => datasetName.split(' ').join(''))
          .attr('fill', d => fillMap[datasetName.split(' ').join('')])
          .attr("opacity", .75)
          .attr("stroke", "white")
        //   .append("title")
        // .text(function({number, place, lon, lat}){
        //   console.log(number, place)
        //   return `${number}, ${place} ${lon} ${lat}`;
        //   // return d.number + ", " + d.place  + " " + d.lon + " " + d.lat;
        // })
        joinAg.exit().attr('opacity', d => 0).remove();

        textHole.text("mouseover");
        
    };


    circlefunction(milkCows, 'MilkCows'); 

    agMenu.on("change", function(){
        var menuData = d3.select(this)
                             .select("select")
                             .property("value");
            circleUpdate(menuData);
      })
    //create data dictionary to create connection between menu and circles
    var dataDict = {"Milk Cows" : milkCows, 
                    "Beef Cows" : beefCows,
                    "Sheep" : sheep,
                    "Pigs":Pigs,
                    "Wheat" : Wheat,
                    "Corn Grain": CornGrain,
                    "Soy Beans" : SoyBeans,
                    "Vegetables" : Vegetables,
                    "Fruits" : Fruits
                  };

    function circleUpdate(chosenData) {
      
      // svg.selectAll("circle")
      //     .remove()
      circleData = dataDict[chosenData];
      console.log(circleData);
      circlefunction(circleData, chosenData);
      textBox.text(textDict[chosenData])

    };

      
      };


