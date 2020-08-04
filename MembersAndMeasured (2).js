import * as d3 from 'd3';
import React, { useRef, useEffect, useState } from 'react';
import './MembersAndMeasured.css';

var dataset = {
  "name": "diseases",
  "children":
    [
      {
        "name": "General Health + Prevention",
        "value": "1250",

      },
      {
        "name": "Diabetes",
        "value": "625",

      },
      {
        "name": "Respiratory",
        "value": "620",

      },
      {
        "name": "Musculoskeletal, Pain",
        "value": "416",

      },
      {
        "name": "Behavioural Health",
        "value": "400",

      },
      {
        "name": "Other/At Risk+Chronic",
        "value": "397",

      },
      {
        "name": "Cancer",
        "value": "208",

      },
      {
        "name": "Cardiovascular",
        "value": "203",

      }
    ]
};

function Treemap() {

  var [toggleState, setToggleState] = useState("off");

  var toggle = () => {
    setToggleState(toggleState === "off" ? "on" : "off");
  }

  var ref = useRef();
  useEffect(() => {
    var svg = d3.select(ref.current)
      .attr("width", 600)
      .attr("height", 307)

  }, []);

  useEffect(() => {
    draw();
  });

  var draw = () => {

    var svg = d3.select(ref.current);
    d3.select('svg').attr('width', 600);

    // Give the data to this cluster layout:
    var root = d3.hierarchy(dataset).sum(function (d) { return d.value });

    // initialize treemap
    d3.treemap()
    .tile(d3.treemapResquarify)
      .size([600, 307])
      .paddingInner(1)
      
      (root);


      

    



    const color = d3.scaleOrdinal()
      // .domain([1, 9])
      .range(["#003B6D"]);

    const opacity=d3.scaleLinear()
    .domain([20,2000])
    .range([.4,2])



    // Select the nodes
    var nodes = svg
      .selectAll("rect")
      .attr("class", "foreignObject")
      .data(root.leaves())

    // draw rectangles
    nodes.enter()
      .append("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
    
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .attr("class", "nodeRectangles")
      
      .style("fill", function (d, i) { return color(d.data.name) })
      .style("opacity",function(d){return opacity(d.data.value)})
      .on("mousemove", function (d) {
        tool.style("left", d3.event.pageX + 10 + "px")
        tool.style("top", d3.event.pageY - 20 + "px")
        tool.style("position", "absolute")
        tool.style("background" ,"none repeat scroll 0 0 white")
        tool.style("border" , "0 none")
        // tool.style("margin-top","20px")
        // tool.style("height","40px")
        tool.style("text-align","center")
        tool.style("display", "inline-block");
        tool.html(d.children ? null : d.data.name );
    }).on("mouseout", function (d) {
        tool.style("display", "none");
    });


    // select node titles
    var nodeText = svg
      .selectAll("text")
      .data(root.leaves())
      .enter()

    nodeText
      .append("text") 
      .attr("font-size", "13px",)
      .attr("fill", "white")
      .attr("font-weight", "bold")
      .attr("overflow","hidden")

      .attr("x", function (d) { return d.x0 + 2 })    // +10 to adjust position (more right)
      .attr("y", function (d) { return d.y0 + 15 })    // +20 to adjust position (lower)
      .text(function (d) { 
        return d.data.name
        
         }).each(wrap,10)

      // var nodeTooltip = svg
      var tool = d3.select("body").append("div").attr("class", "toolTip")
      .attr("position", "absolute")
      .attr("display","none")
      .attr("width","auto")
      .attr("height", "auto")
      .attr("background" ,"none repeat scroll 0 0 white")
      .attr("border" , "0 none")
      .attr("border-radius", "8px 8px 8px 8px")
      .attr("box-shadow"," -3px 3px 15px #888888")
     

      function wrap() {
        var element = d3.selectAll('.nodeRectangle').each(function(d){ return (d.x1-d.x0)})
        console.log("hello" + JSON.stringify(element))
        var self = d3.select(this),
        
            textLength = self.node().getComputedTextLength();
           
            var text = self.text();
            console.log("Aaaa" + text.length)
            let slicedLength=4-text.length
            // console.log("helloo " + self.node().x.baseVal.getItem(0).value)
            // console.log("Aradhya " + (self.node().getBoundingClientRect().width))
        if (textLength > 30 && text.length > 0) {
            text = text.slice(0, slicedLength);
            self.text(text + '...');
            textLength = self.node().getComputedTextLength();
        }
    } 

    // select node titles
    var nodeVals = svg
      .selectAll("vals")
      .data(root.leaves())
      .enter()
      .append("text")


      .attr("x", function (d) { return d.x0 + 5 })    // +10 to adjust position (more right)
      .attr("y", function (d) { return d.y0 + 30 })    // +20 to adjust position (lower)
      .text(function (d) { return d.data.value })
      .attr("font-size", "11px")
      .attr("fill", "white")
      .attr("font-weight", "bold")
      .attr("text-anchor", "bottom")
  }
  return (

    <div className="members-component">
      <div className="member-headers">
        <div className="member-heading">Members and Measured Care Gaps</div>

        <div className="members-measured-toggle">
          <div className="members-toggle">Members</div>
          <div className={`switch ${toggleState}`} onClick={toggle}> </div>
          <div className="measured-toggle">Measured Care Gaps</div>
        </div>
      </div>
      <div className="low-high-gradient">
        <div className="low-gradient">Low</div>
        <div className="gradient"></div>
        <div className="high-gradient">High</div>
      </div>
      <div className="treemap">
        <svg ref={ref}>
        </svg>
      </div>
    </div>
  );
}
export default Treemap;