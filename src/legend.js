/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-02 15:46:52
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-06 15:58:51
 */
import * as d3 from 'd3';
import { globalSearch } from './search';
import { nodeHighlight } from './partsHighlight';
import { updateNodeTable, updateNodeTableByVirus } from './nodeTable';

export const legendDataCountry = (graph, country, colorCustom, search, nodeHighlight, node, link, chart, uniqueVirus) => {
    
    let uniqueCountry = JSON.parse(JSON.stringify(country))
    uniqueCountry.sort((a, b) => {
        return (b.name < a.name) ? 1 : (b.name > a.name) ? -1 : 0;
    })

    let width = $('#legendPanel').width();
    let ncol = parseInt(width/140);
    let height = Math.ceil(uniqueCountry.length/ncol)*20 + 30;
    
    let svg = d3.select("#legendPanel").append("svg")
        .attr("width", width)
        .attr("height", height)
        
    const groups = svg.append("g")
        .attr('transform', `translate(10, 20)`)
        .selectAll('.tick')
        .data(uniqueCountry);
        
    const groupsEnter = groups
        .enter().append('g')
        .attr('class', 'tick')

    groupsEnter
        .merge(groups)
        .attr('transform', (d, i) =>
            `translate(${i%ncol/ncol * width}, ${parseInt(i/ncol) * 20})`
        )
        .on("mouseover", (d) => {
            let res = globalSearch(d.name+"|country", graph)
            nodeHighlight(node, link, res, 0.2)
            let filterNodes = graph.nodes.filter(e => res.indexOf(e.id) >= 0)
            let a = uniqueVirus.filter(e => e.loci.split("-")[0] === d.name)
            updateNodeTableByVirus(a)
            
            chart.dispatchAction({
                type: 'restore'
            })
           
            chart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                name: a.map(e => e.date)
            })
        })
    
        
    groups.exit().remove();

    groupsEnter.append('circle')
        .merge(groups.select('circle'))
        .attr("r", 5)
        .attr("fill", (d, i) => colorCustom[i]);

    groupsEnter.append('text')
        .merge(groups.select('text'))
        .text(d => d.name + " (" + d.count + ")")
        .attr("fill", "#555")
        .attr('x', 15)
        .attr('dy', 5)
        .attr("font-size", 12);
}