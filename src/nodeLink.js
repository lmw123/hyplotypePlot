/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-02 14:46:45
 * @LastEditors: Anke Wang
 * @LastEditTime: 2020-04-04 14:45:39
 */

import * as d3 from 'd3';
import { nodeSizeRange, linkSizeRange } from './plotConfig'
import { nodeHighlight, linkHighlight } from './partsHighlight'

export const nodeLinkScale = (graph) => {

    
    let lineScale = d3.scalePow()
        .exponent(0.5)
        .domain(d3.extent(graph.links.map(a => a.distance)))
        .range(linkSizeRange);

    let nodeScale = d3.scaleSqrt()
        .domain(d3.extent(graph.nodes.map(a => a.radius)))
        .range(nodeSizeRange);

    return {lineScale, nodeScale}
}

export const nodeLink = (graph, plotCanvas) => {

    let link = plotCanvas
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", 0.5)
        .attr("stroke", "#999")
        .on("mouseover", function (d) {
            d3.select("#info")
                .text("distance: " + d.distance)
        })
    

    let node = plotCanvas
        .attr("class", "nodes")
        .selectAll("g")
        .data(graph.nodes)
        .enter()
        .append("g")
        .attr("radius", function (d) {
            return d.radius;
        })


    link.on("click", d => {linkHighlight(node,link,d,0.2)})
    node.on("click", d => {nodeHighlight(node,link,d.id,0.2)})
    

    return { node, link }
}
