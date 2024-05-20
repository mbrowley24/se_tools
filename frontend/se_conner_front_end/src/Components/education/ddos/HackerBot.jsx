import React, {useEffect, useRef} from "react";
import * as d3 from "d3";


function HackerBot({}) {
    const ref = useRef();
    useEffect(() => {

        const svg = d3.select(ref.current);
        // Clear SVG in case of re-render
        svg.selectAll("*").remove();

        // Set dimensions
        const width = 1500;
        const height = 600;

         // Create a line generator
         const line = d3.line()
         .x(d => d.x)
         .y(d => d.y);

        // Append SVG to the ref in the DOM
        svg.attr("width", width)
            .attr("height", height);

        // Create line data
        const lineData = [
            { x: 400, y: 200 },
            { x: 900, y: 200 }
        ];

        svg.append("path")
        .attr("d", line(lineData))
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "none");
    }, [])

    return(
        <svg ref={ref}></svg>
    )
};
export default HackerBot;