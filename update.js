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
        d3.json("fruits.json"),
        d3.json("rice.json"),
        d3.json("sugar.json"),
        d3.json("eggchickens.json"),
        d3.json("meatchickens.json"),
        d3.json("tobacco.json"),
        d3.json("peanuts.json"),
        d3.json("sugarbeets.json"),
        d3.json("oats.json"),
        d3.json("barley.json"),
        d3.json("sorghum.json"),
        d3.json("cotton.json"),
        d3.json("hay.json"),
        d3.json("drybeans.json"),
        d3.json("sunflower.json"),
        d3.json("cornSilage.json"),
        d3.json("sorghumSilage.json")
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
      "Corn Grain", "Soy Beans", "Vegetables", "Fruits", "Rice", "Sugar", "Layer Chickens",
      "Meat Chickens", "Tobacco", "Peanuts", "Sugar Beets", "Oats", "Barley",
      "Sorghum", "Cotton", "Hay", "Dry Beans", "Sunflowers", "Corn Silage", "Sorghum Silage"];

    var agMenu = d3.select("#dropdown");
                    

        agMenu.append("select")
               .selectAll("option")
               .data(dataArray)
               .enter()
               .append("option")
                .attr("value", (d) => {return d;})
                .text((d) => {return d;});

function myVis(data) {
        var [geoData, milkCows, BeefCows, sheep, Pigs, Wheat, CornGrain, SoyBeans, Vegetables, Fruits, Rice, Sugar, LayerChickens,
        MeatChickens, Tobacco, Peanuts, SugarBeets, Oats, Barley, Sorghum, Cotton,
        Hay, DryBeans, Sunflowers, CornSilage, SorghumSilage] = data;

        var projection = d3.geoAlbersUsa()
                           .translate([w/2, h/2.5]);

      var geoGenerator = d3.geoPath().projection(projection);

        
        svg.selectAll("path")
           .data(geoData.features)
           .enter()
           .append("path")
           .attr("d", d => geoGenerator(d));
   
    var t = d3.transition()
      .duration(900);
  
  var fillMap = {BeefCows:"#2E8B57", MilkCows:"#FF8C00", Sheep:"rebeccapurple",
                  Pigs:"pink",
                  Wheat:"Wheat", CornGrain:"yellow", SoyBeans:"blue", Vegetables: "red",
                  Fruits:"turquoise", Rice:"teal", Sugar:"PapayaWhip", LayerChickens:"Tomato",
                  MeatChickens:"Fuchsia", Tobacco:"Sienna", Peanuts:"SlateBlue", SugarBeets:"DarkMagenta",
                  Oats:"LightGreen", Barley:"DarkGoldenrod", Sorghum: "DodgerBlue",
                  Cotton:"MistyRose", Hay:"Firebrick", DryBeans:"Indigo", Sunflowers:"Gold",
                  CornSilage:"Aquamarine", SorghumSilage:"PaleVioletRed"}

  var textBox = svg.append("text")
                    .attr("x", 1080)
                    .attr("y", 300)
                    .attr("class", "textBox");
                    // .call(wrap, 10);

                  // svg.append("foreignObject")
                  //   .attr("width", 500)
                  //   .attr("height", 300)
                  //   .append("html:body")

                  
                    

  // var wrap; 
  // console.log("wtf x2")
  // wrap = d3.textwrap()
  //           .bounds({height: 150, width:150});
  //           console.log("wtf")


  var textDict = {"Milk Cows" : "There are 8,807,159 dairy cows in America.",
                  "Beef Cows" : "There are 22,674,623 cows raised for beef in America.",
                  "Sheep" : "There are 5,184,934 sheep in America.",
                  "Pigs": "There are 58,015,489 pigs in America. People love bacon.",
                  "Wheat" : "There are 48,943,339 acres devoted to growing wheat.",
                  "Corn Grain":"There are 1,507,910,868 acres of land used to grow corn.",
                  "Soy Beans": "Just over 70% of the 76,004,568 acres of soybeans feed animals.",
                  "Vegetables":"Only 4,291,118 acres are used to grow vegetables.",
                  "Fruits":"Only 5,125,896 acres are used to grow fruit.",
                  "Rice" : "Rice is grown on 2,662,868 acres of land in the US.",
                  "Sugar" : "843,317 acres of land are used to grow sugar cane.",
                  "Layer Chickens" : "172,960,147 chickens are raised for eggs.",
                  "Meat Chickens" : "8,247,257,373 chickens are raised for meat.",
                  "Tobacco" : "333,637 acres of land are used to grow tobacco.",
                  "Peanuts" : "Peanuts are grown on 1,577,084 of land.",
                  "Sugar Beets": "Sugar beets are grown on 1,204,706 acres of land.",
                  "Oats" : "1,032,819 acres of land are used to grow oats.",
                  "Barley" : "Barley is grown on 3,227,071 acres of land.",
                  "Sorghum" : "The US is the biggest producer of sorghum globally. It is grown on 5,072,380 acres of land.",
                  "Cotton" : "9,305,612 acres are used to grow cotton.",
                  "Hay" : "55,737,285 acres are used to grow hay, which is for more than just horses.",
                  "Dry Beans": "These are beans that you dry and then eat. They are grown on 1,590,470 acres.",
                  "Sunflowers" : "This turns into cooking oil, as well as snacks. 1,822,733 acres grow sunflowers.",
                  "Corn Silage" : "This is corn grown explicitly for animal feed. It is grown on 495,954,120 acres.",
                  "Sorghum Silage":"This is sorghum grown to feed animals. It is grown on 391,285 acres."
                  };

  var textHole = svg.append("text")
                    .attr("x", 0)
                    .attr("y", 300)
                    .attr("class", "textHole")
  var textHole2 = svg.append("text")
                    .attr("x", 0)
                    .attr("y", 320)
                    .attr("class", "textHole")

  var sourceHole = svg.append("text")
                      .attr("x", 5)
                      .attr("y", 800)
                      .attr("font-size", "10px")
                      .attr("class", "textHole");

  sourceHole.text("Source: 2012 Agricultural Census, https://www.nass.usda.gov/Publications/AgCensus/2012/");
                      console.log("my source")

  function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}

  function circlefunction(selectedData, datasetName){
    console.log('my data is ', datasetName)
    var joinAg = svg.selectAll("circle")
                    .data(selectedData, d => {
                      return d.place;
                    })
    // create a scale for radii based on Chris Given's gapminder code
    var bubbleScale = 
            d3.scaleSqrt()
               .domain([d3.min(selectedData, d => {return d.number;}), d3.max(selectedData, d => {return d.number;})])
               .range([2,25])

    joinAg.enter()
          .append("circle")
          .merge(joinAg)
          .on('mouseover', d => {
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
            return bubbleScale(d.number);
            })
          // .attr("class", d => datasetName.split(' ').join(''))
          .attr('fill', d => fillMap[datasetName.split(' ').join('')])
          .attr("opacity", .75)
          .attr("stroke", "white");   
      
        joinAg.exit().attr('opacity', d => 0).remove();

        textHole.text("State/County");
        textHole2.text("Number of Animals or Acres")

        
        selectedData.sort(function(x, y){
          return d3.ascending(x.number, y.number);
        })

        var quantScale1 = d3.quantile(selectedData, .25, d => {return d.number;});

        // var quantScale4 = d3.quantile(selectedData, .85, d=> {return d.number;});
        var quantScale5 = d3.quantile(selectedData, .95, d=> {return d.number;});
        var quantScale6 = d3.quantile(selectedData, 1, d=> {return d.number;})

        var legScale = [quantScale1,  quantScale5, quantScale6]

        var legY = 70
        var legX = 750
        var xLab = 800
        
    
       legend =  svg.selectAll("legend")
            .data(legScale)
            .enter()
            .append("circle")
            .attr("class", "legend")
            .attr("cx", function(d){return legX})
            .attr("cy", function(d){return legY - bubbleScale(d)})
            .attr("r", function(d){return bubbleScale(d)})
            .style("fill", "none")
            .attr("stroke", "black")
            

            // svg.selectAll("legend")
            //     .data(legScale)
            //     .enter()
            //     .append("line")
            //     .attr("x1", function(d){ return legX + bubblescale(d)})
            //     .attr("x2", xLab)
            //     .attr("y1", function(d){ return legY -1.5*bubbleScale(d)})
            //     .attr("y2", function(d){ return legY - 1.5*bubbleScale(d)})
            //     .attr("stroke", "black");


          legText =  svg.selectAll("legendtext")
                        .data(legScale, function (d,i){
                          console.log(legScale[i])
                          return legScale[i];
                        })

            legText.enter()
                  .merge(legText)
                  .append("text")
                  .transition(t)
                  .attr("x", xLab)
                  .attr("y", function(d){return legY - 1.5*bubbleScale(d);})
                  .text(function(d){return d})
                  .attr("class", "legend")
                  .text(d3.format(".1f"))
                  .attr("font-size", "10px");
                  

        legText.exit().remove();
        // d3.selectAll("legendtext").exit().remove()
        // console.log("bye bye")

        // var histogramLeg = d3.histogram()
        //                      .value(function(d){return d.number;})
        //                      .domain(bubbleScale.domain());

        // var bins = histogramLeg(selectedData);

        // svg.selectAll("rect")
        //     .data(bins)
        //     .enter().append("rect")
        //     .attr("fill", "none")
        //     .attr("stroke", "black")
            
                          

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
                    "Beef Cows" : BeefCows,
                    "Sheep" : sheep,
                    "Pigs":Pigs,
                    "Wheat" : Wheat,
                    "Corn Grain": CornGrain,
                    "Soy Beans" : SoyBeans,
                    "Vegetables" : Vegetables,
                    "Fruits" : Fruits,
                    "Rice" : Rice,
                    "Sugar" : Sugar,
                    "Layer Chickens" : LayerChickens,
                    "Meat Chickens" : MeatChickens,
                    "Tobacco" : Tobacco,
                    "Peanuts" : Peanuts,
                    "Sugar Beets" : SugarBeets,
                    "Oats" : Oats,
                    "Barley" : Barley,
                    "Sorghum" : Sorghum,
                    "Cotton" : Cotton,
                    "Hay" : Hay,
                    "Dry Beans" : DryBeans,
                    "Sunflowers" : Sunflowers,
                    "Corn Silage" : CornSilage,
                    "Sorghum Silage" : SorghumSilage
                  };

    function circleUpdate(chosenData) {
      
      circleData = dataDict[chosenData];
      circlefunction(circleData, chosenData);
      // textBox.html("<p>" +textDict[chosenData] + "</p>")
      textBox.text(textDict[chosenData])
      // .call(wrap, 1080)
      // text = d3.selectAll("text");
      // text.call(wrap);

    };

      
      };


