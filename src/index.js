import * as d3 from 'd3';
import { getUniqueCountry } from './dataProcess';
import { buildNode } from './buildNode';
import { nodeLink } from './nodeLink';
import 'bootstrap';
import 'bootstrap-table'

d3.json("https://bigd.big.ac.cn/ncov/rest/variation/haplotype/json?date=2020-03-26&area=world").then(graph => {

    const colorCustom = ["#d62728", "#9467bd", "#8c564b", "#e377c2", "#1c7f7c",
        "#7f7f7f", "#bcbd22", "#17becf", "#1f77b4",
        "#ff7f0e", "#2ca02c", '#d48265', '#2f4554',
        '#61a0a8', '#91c7ae', '#749f83', '#ca8622',
        '#bd4829', '#546570', "#606dff", "#1d83f4",
        "#2f67b9", "#4548f4", "#123754", "#7f7f7f",
        "#f468c2", "#ffeb3b", "#346270", "#ff2f23",
        "#cf9e19", "#2507f4", "#f427ab", "#D84E0C",
        "#9c0df4", "#2b1a7f", "#ffeb3b", "#699f2c",
        "#ff19ec", "#75fff3", "#ca84ff", "#ff0c1b",
        "#1bff2c", "#b695f4", "#197f59", "#4548f4",
        "#419f42", "#2325f4", "rgba(62,21,60,0.91)"
    ];

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


    var lineScale = d3.scaleLinear()
        .domain(d3.extent(graph.links.map(a => a.distance)))
        .range([30, 180]);

    var nodeScale = d3.scaleSqrt()
        .domain(d3.extent(graph.nodes.map(a => a.radius)))
        .range([3, 50]);

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

    let nodeInfo = []
    graph.nodes.forEach(c => nodeInfo = nodeInfo.concat(c.Virus))
    $("#nodeInfo").text("Virus (" + nodeInfo.length + ")")
    $("#nodeTable")
        .bootstrapTable({
            columns: [{
                field: 'acc',
                title: 'Acc',
                sortable: true,
                formatter: (value) => "<a target='__blank' href='https://bigd.big.ac.cn/ncov/genome/accession?q=" + value + "'>" + value + "</a>"
            }, {
                field: 'date',
                title: 'Date',
                sortable: true
            }, {
                field: 'loci',
                title: 'Loci',
                sortable: true
            }],
            data: nodeInfo
        })

    $("#linkInfo").text("Links (" + graph.links.length + ")")
    $("#linkTable")
        .bootstrapTable({
            columns: [{
                field: 'source',
                title: 'Source',
                sortable: true,
                formatter: value => value.id
            }, {
                field: 'target',
                title: 'Target',
                sortable: true,
                formatter: value => value.id
            }, {
                field: 'distance',
                title: 'Distance',
                sortable: true
            }],
            data: graph.links
        })

    $(function () {
        $('[data-toggle="popover"]').popover()
    })
})

$(".dropdown-menu").on("click", "[data-stopPropagation]", e => {
    e.stopPropagation()
})