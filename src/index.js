/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-02 10:03:38
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-04 22:21:26
 */
import './css/index.css'
import * as d3 from 'd3';
import { getUniqueCountry, getUniqueDate } from './dataProcess';
import { buildNode } from './buildNode';
import { nodeLink, nodeLinkScale } from './nodeLink';
import { defaultColor, bootstrapBehaviors, linkSizeRange } from './plotConfig';
import { refreshNodeTable } from './nodeTable';
import { refreshLinkTable } from './linkTable';
import { formatSelectData, globalSearch } from './search';
import { drawCountryPie } from './countryPie';
import { nodeHighlight, linkHighlight } from './partsHighlight';
import 'bootstrap';
import 'bootstrap-table';
import 'select2';
import { drawBarPlot,drawHeatmapDate } from './datePlot';

d3.json("https://bigd.big.ac.cn/ncov/rest/variation/haplotype/json?date=2020-03-26&area=world").then(graph => {

    let colorCustom = defaultColor;
    let { lineScale, nodeScale, lineScale2 } = nodeLinkScale(graph);
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

    plotCanvas.transition().call(zoom.scaleBy, 2)

    d3.select("#zoomReset")
        .on("click", () => plotCanvas.transition().call(zoom.scaleTo, 2))
        
    d3.select("#zoomIn")
        .on("click", () => plotCanvas.transition().call(zoom.scaleBy, 1.2))

    d3.select("#zoomOut")
        .on("click", () => plotCanvas.transition().call(zoom.scaleBy, 0.8))

    let simulation = d3.forceSimulation()
        .force("link", d3.forceLink()
            .id(d => d.id)
            .distance(d => lineScale(d.distance) + nodeScale(d.source.radius) / 2 + (d.target.radius) / 2).strength(1))
        .force("charge", d3.forceManyBody().distanceMax(linkSizeRange[1]).distanceMin(linkSizeRange[0]).strength(-1))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force('x', d3.forceX().strength(0.01))
        .force('y', d3.forceY().strength(0.01 * height / width))

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

    // refreshNodeTable(graph)
    refreshLinkTable(graph)
    drawCountryPie(uniqueCountry)


    $('#searchBar').select2({
        minimumInputLength: 1,
        data: formatSelectData(graph),
        templateResult: formatState
    });

    function formatState(state) {
        if (state.text != "Searching…") {
            var $state = $("<span>" + state.id.split("|")[0] + "</span><span style='float: right'><kbd>" + state.id.split("|")[1] + "</kbd></span>");
            return $state;
        }
    };

    let uniqueDate = getUniqueDate(graph)
    bootstrapBehaviors(uniqueCountry, uniqueDate)
    // drawDateplot(uniqueCountry)
    
    // nodeHighlight(node,link,globalSearch("2020-03-10|date", graph),0.2)

    $('#searchBar').on('select2:select', function (e) {

        nodeHighlight(node,link,globalSearch($('#searchBar').val(), graph),0.2)
    });

    let chart = drawHeatmapDate(uniqueDate)
    $(".fa-globe-americas").on("click", () => drawBarPlot(uniqueCountry))
    $(".fa-calendar-alt").on("click", () => drawHeatmapDate(uniqueDate))

    $(".fa-play-circle").on("click", e => {

        let a = []
        getUniqueDate(graph).forEach( (e,i) => {
            setTimeout(() => {
                a = a.concat(globalSearch(e.name + "|date", graph))
                a = Array.from(new Set(a))
                nodeHighlight(node, link, a,0.2);
                // chart.dispatchAction({
                //     type: 'downplay',
                //     seriesIndex: 0,
                //     dataIndex: i-1
                // })
                chart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: i
                })
            }, 500*i)
        })
    })
})

