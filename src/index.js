/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-02 10:03:38
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-03 11:49:44
 */

import * as d3 from 'd3';
import { getUniqueCountry } from './dataProcess';
import { buildNode } from './buildNode';
import { nodeLink, nodeLinkScale } from './nodeLink';
import { defaultColor, bootstrapBehaviors } from './plotConfig';
import { refreshNodeTable } from './nodeTable';
import { refreshLinkTable } from './linkTable';
import 'bootstrap';
import 'bootstrap-table';

d3.json("https://bigd.big.ac.cn/ncov/rest/variation/haplotype/json?date=2020-03-26&area=world").then(graph => {

    let colorCustom = defaultColor;
    let { lineScale, nodeScale } = nodeLinkScale(graph);
    let uniqueCountry = getUniqueCountry(graph);

    let width = $('.network-panel').width();
    let height = $('.network-panel').height();

    let svg = d3.select("#plot").append("svg")
        .attr("width", width)
        .attr("height", height);

    function zoomed() {
        plotCanvas.attr("transform", d3.event.transform);
    }

    const zoom = d3.zoom()
        .scaleExtent([0.1, 40])
        .on("zoom", zoomed);

    let plotCanvas = svg.append('g')
        .call(zoom)
        .on("wheel.zoom", null)
        .on("dblclick.zoom", null);

    d3.select("#zoomIn")
        .on("click", () => plotCanvas.transition().call(zoom.scaleBy, 1.2))

    d3.select("#zoomOut")
        .on("click", () => plotCanvas.transition().call(zoom.scaleBy, 0.8))

    let simulation = d3.forceSimulation()
        .force("link", d3.forceLink()
            .id(d => d.id)
            .distance(d => lineScale(d.distance) + nodeScale(d.source.radius) / 2 + (d.target.radius) / 2).strength(1))
        .force("charge", d3.forceManyBody().distanceMax(500).distanceMin(30))
        .force("center", d3.forceCenter(width / 2, height / 2));


    let { node, link } = nodeLink(graph, plotCanvas)

    node
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.each(function (d) {
        buildNode(d3.select(this), nodeScale(d.radius), d.pieChart, uniqueCountry, colorCustom, d.id)
    });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        d3.selectAll("path")
            .attr("transform", d => "translate(" + d.x + "," + d.y + ")")

        d3.selectAll("circle").attr("cx", d => d.x)
            .attr("cy", d => d.y);

        d3.selectAll("text.t1")
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    }

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active)
            simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    refreshNodeTable(graph)
    refreshLinkTable(graph)

    bootstrapBehaviors()
    
})

