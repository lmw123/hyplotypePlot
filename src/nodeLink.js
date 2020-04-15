/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-02 14:46:45
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-15 11:10:15
 */

import * as d3 from 'd3';
import { nodeRange, linkRange } from './plotConfig'
import { nodeHighlight, linkHighlight } from './partsHighlight'
// import { updateNodeTable } from './nodeTable';

export const setScale = (type, extent, range) => {
    let nodeScale;

    if (type === "sqrt") {
        nodeScale = d3.scaleSqrt()
            .domain(extent)
            .range(range);
    } else {
        nodeScale = d3.scaleLinear()
            .domain(extent)
            .range(range);
    }
    return nodeScale;
}

export const nodeLinkScale = (graph) => {

    let lineScale = d3.scalePow()
        .exponent(0.5)
        .domain(d3.extent(graph.links.map(a => a.distance)))
        .range(linkRange);

    let nodeScale = d3.scaleSqrt()
        .domain(d3.extent(graph.nodes.map(a => a.radius)))
        .range(nodeRange);

    return { lineScale, nodeScale }
}


export const nodeLink = (graph, plotCanvas) => {

    let link = plotCanvas
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", 0.8)
        .attr("stroke", "#999")

    let node = plotCanvas
        .attr("class", "nodes")
        .selectAll("g")
        .data(graph.nodes)
        .enter()
        .append("g")
        .attr("radius", d => d.radius)

    link.on("click", d => { 
        linkHighlight(node, link, d, 0.2) 
    })
    
    return { node, link }
}
