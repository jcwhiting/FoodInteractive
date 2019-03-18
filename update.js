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

                          
      

     //use textHole strategy to make a div with a p that changes based on 
     //selection from dropdown menu!! you can do this! 
   
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
                    .attr("class", "textBox")
  var textDict = {"Milk Cows" : "milk text",
                  "Beef Cows" : "beef text, your hamburger iskilling the environment",
                  "Sheep" : "sheep text",
                  "Pigs": "oink oink brah",
                  "Wheat" : "amber waves of grain",
                  "Corn Grain":"this is for animals not people",
                  "Soy Beans": "these beans are food additives",
                  "Vegetables":"why aren't there more of these????",
                  "Fruits":"How many of me have you had today?",
                  "Rice" : "I like water",
                  "Sugar" : "Most sweeteners in the US are made from corn",
                  "Layer Chickens" : "These are chickens that lay eggs, not ones you eat",
                  "Meat Chickens" : "We eat these",
                  "Tobacco" : "This used to be a much bigger deal",
                  "Peanuts" : "Jimmy Carter is the man",
                  "Sugar Beets": "My great-grandpa was a sugarbeet farmer in Wyoming",
                  "Oats" : "These go into more than just oatmeal",
                  "Barley" : "Little Sir John with his nut brown bowl proved the strongest man at last",
                  "Sorghum" : "The US is the biggest producer of sorghum globally",
                  "Cotton" : "This has caused a lot of problems",
                  "Hay" : "This is for horses",
                  "Dry Beans": "These are beans that you dry and then eat",
                  "Sunflowers" : "This turns into cooking oil, as well as snacks",
                  "Corn Silage" : "This is corn grown explicitly for animal feed",
                  "Sorghum Silage":"This is sorghum grown to feed animals"
                  };

  var textHole = svg.append("text")
                    .attr("x", 0)
                    .attr("y", 300)
                    .attr("class", "textHole")
  var textHole2 = svg.append("text")
                    .attr("x", 0)
                    .attr("y", 320)
                    .attr("class", "textHole")

  

  function circlefunction(selectedData, datasetName){
    console.log('my data is ', datasetName)
    var joinAg = svg.selectAll("circle")
                    .data(selectedData, d => {
                      return d.place;
                    })
    // create a scale for radii based on Chris Given's gapminder code
    var bubbleScale = 
            d3.scaleLinear()
               .domain([0, d3.max(selectedData, d => {return d.number;})])
               .range([2,80])

    

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
            // return Math.sqrt(Number(d.number)*0.0008)
            return bubbleScale(d.number);
            })
          // .attr("class", d => datasetName.split(' ').join(''))
          .attr('fill', d => fillMap[datasetName.split(' ').join('')])
          .attr("opacity", .75)
          .attr("stroke", "white");   
      
        joinAg.exit().attr('opacity', d => 0).remove();

        textHole.text("State/County");
        textHole2.text("Number of Animals or Acres")
        
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
      textBox.text(textDict[chosenData])

    };

      
      };


