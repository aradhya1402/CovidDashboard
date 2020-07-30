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
        "value": "600",

      },
      {
        "name": "Respiratory",
        "value": "620",

      },
      {
        "name": "Musculoskeletal, Pain",
        "value": "450",

      },
      {
        "name": "Behavioural Health",
        "value": "500",

      },
      {
        "name": "Other/ At Risk+ Chronic",
        "value": "307",

      },
      {
        "name": "Cancer",
        "value": "210",

      },
      {
        "name": "Cardiovascular",
        "value": "200",

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
      .attr("width", 605)
      .attr("height", 307)

  }, []);

  useEffect(() => {
    draw();
  });

  var draw = () => {

    var svg = d3.select(ref.current);

    // Give the data to this cluster layout:
    var root = d3.hierarchy(dataset).sum(function (d) { return d.value });

    // initialize treemap
    d3.treemap()
      .size([610, 307])
      // .paddingTop(10)
      // .paddingRight(7)
      .paddingInner(1)
      (root);



    const color = d3.scaleLinear()
      .domain([0, 9])
      .range(["#003B6D", "#6EB8F7"]);




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
      .style("fill", function (d, i) { return color(i) })


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

      .attr("x", function (d) { return d.x0 + 5 })    // +10 to adjust position (more right)
      .attr("y", function (d) { return d.y0 + 5 })    // +20 to adjust position (lower)
      .text(function (d) { return d.data.name })
      .call(wrap, 20)


    // .attr("class","foreignObject")

    function wrap(text, width) {
      text.each(function () {
        var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          x = text.attr("x"),
          y = text.attr("y"),
          dy = 0, //parseFloat(text.attr("dy")),
          tspan = text.text(null)
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", dy + "em");
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan")
              .attr("x", x)
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + dy + "em")
              .text(word);
          }
        }
      });
    }


    // select node titles
    var nodeVals = svg
      .selectAll("vals")
      .data(root.leaves())
      .enter()
      .append("text")


      .attr("x", function (d) { return d.x0 + 5 })    // +10 to adjust position (more right)
      .attr("y", function (d) { return d.y0 + 80 })    // +20 to adjust position (lower)
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