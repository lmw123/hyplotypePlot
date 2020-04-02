import * as d3 from 'd3';

export const nodeLink = (graph, plotCanvas) => {
    let link = plotCanvas
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", function (d) {
            return Math.log(d.distance) + 1;
        })
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
        .on("click", d => {
            d3.selectAll("circle")
                .attr("stroke-width", 0)
            d3.select("#" + d.id)
                .attr("stroke-width", 15)
                .attr("stroke", "#ffc107")
                .attr("stroke-opacity", 0.9)
        })

    return { node, link }
}
