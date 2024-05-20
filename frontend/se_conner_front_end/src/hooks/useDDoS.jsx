import * as d3 from "d3";



function useDDos() {

    function ddosLine(svg) {
        // Set dimensions
        const width = 1500;
        const height = 600;

         // Append SVG to the ref in the DOM
        svg.attr("width", width)
            .attr("height", height);

         // Create line data
        const lineData = [
            { x: 400, y: 200 },
            { x: 900, y: 200 }
        ];

        // Create a line generator
        const line = d3.line()
                .x(d => d.x)
                .y(d => d.y);

         // Draw the line
        svg.append("path")
            .attr("d", line(lineData))
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("fill", "none");

            
    }


    function hackerLine(svg) {
        // Create line data
        const lineData = [
            { x: 100, y: 75 },
            { x: 150, y: 75 },
        ];

        const lineData2 = [
            { x: 100, y: 225 },
            { x: 100, y: 150 },
        ];

        const lineData3 = [
            { x: 100, y: 225 },
            { x: 150, y: 225 },
        ];

        const lineData4 = [
            { x: 100, y: 225 },
            { x: 100, y: 300 },
        ];


        const lineData5 = [
            { x: 100, y: 300 },
            { x: 150, y: 300 },
        ];


        const lineData6 = [
            { x: 100, y: 300 },
            { x: 100, y: 375 },
        ];


        const lineData7 = [
            { x: 100, y: 375 },
            { x: 150, y: 375 },
        ];

        // Create a line generator
        const line = d3.line()
                .x(d => d.x)
                .y(d => d.y);

         // Draw the line
        svg.append("path")
            .attr("d", line(lineData))
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("fill", "none");

        svg.append("path")
            .attr("d", line(lineData2))
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("fill", "none");
        
        svg.append("path")
            .attr("d", line(lineData3))
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("fill", "none");
        
        svg.append("path")
            .attr("d", line(lineData4))
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("fill", "none");

        svg.append("path")
            .attr("d", line(lineData5))
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("fill", "none");

        svg.append("path")
            .attr("d", line(lineData6))
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("fill", "none");

        svg.append("path")
            .attr("d", line(lineData7))
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("fill", "none");
    }

    return({
        ddosLine,
        hackerLine
    })
}

export default useDDos;