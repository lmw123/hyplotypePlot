/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-02 14:18:49
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-15 10:55:46
 */
import * as d3 from 'd3';

const drawParentCircle = (nodeElement, radius, id) => {

    let parentNodeColor = "white";
    nodeElement.insert("circle")
        .attr("id", id)
        .attr("r", radius)
        ;
}

const drawPieChart = (nodeElement, radius, percentages, uniqueCountry) => {

    var halfRadius = radius / 2;
    var halfCircumference = 2 * Math.PI * halfRadius;
    var arc = d3.arc();

    var pie = d3.pie()
        .value(function (d) { return d.percent; })
    var data_ready = pie(d3.entries(percentages))

    var percentToDraw = 0;
    for (var p in percentages) {
        let pieColor = uniqueCountry.filter(e => e.name === percentages[p].color)[0].color
        nodeElement
            .insert('path', '#parent-pie + *')
            .attr('d', arc({
                innerRadius: 0,
                outerRadius: radius,
                startAngle: Math.PI * 2 * percentToDraw / 100,
                endAngle: Math.PI * 2 * (percentToDraw + percentages[p].percent) / 100
            }))
            .attr('fill', pieColor)
            .attr("stroke", pieColor)
            // .attr("class", percentages[p].color)
            .on("mouseleave", d => {
                d3.select("#test").remove()
                d3.selectAll("." + percentages[p].color)
                    .attr("stroke", null)
            }
            );
        percentToDraw += percentages[p].percent;
    }

}

export const buildNode = (nodeElement, radius, percentages, uniqueCountry, id) => {
    drawParentCircle(nodeElement, radius, id);
    drawPieChart(nodeElement, radius, percentages, uniqueCountry);
}