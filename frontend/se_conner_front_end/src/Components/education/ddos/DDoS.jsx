import React, {useEffect, useRef} from "react";
import * as d3 from "d3";
import useDDos from "../../../hooks/useDDoS";


function DDoS({}) {
    const { ddosLine, hackerLine } = useDDos();
    const ref = useRef();
    // SVG container width and height

    useEffect(() => {
        // Select the SVG with D3
        const svg = d3.select(ref.current);
        // Clear SVG in case of re-render
        svg.selectAll("*").remove();
        ddosLine(svg);
        hackerLine(svg)

    }, []);


    return (
        <svg ref={ref}></svg>
    );
}

export default DDoS;