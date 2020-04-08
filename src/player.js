/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-05 12:15:28
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-08 17:39:15
 */

import { globalSearch } from './search';
import { nodeHighlight } from './partsHighlight';
import { drawCircle } from './mapPlot';

export const playStart = (bu, uniqueDate, graph, node, link, chart,
    map, getLatlng, uniqueVirus, uniqueCountry) => {
    bu.hide()
    $(".fa-pause-circle").show()
    $(".fa-redo").show()

    let i = parseInt($("#playIndex").val())
    let a = $("#playContent").val().split(",")

    if (i == 0) {
        chart.dispatchAction({
            type: 'restore'
        })
    }

    let player = setInterval(() => {

        a = a.concat(globalSearch(uniqueDate[i].name + "|date", graph))
        a = Array.from(new Set(a))

        let b = uniqueVirus.filter(e => (new Date(e.date)) <= (new Date(uniqueDate[i].name)))
        let lociCount = b.map(e => e.loci.split("-")[0]).reduce(function (allNames, name) { if (name in allNames) { allNames[name]++; } else { allNames[name] = 1; } return allNames; }, {});

        let colorMap = {}
        uniqueCountry.forEach(e => {
            colorMap[e.name] = e.color
        })
        
        drawCircle(map, getLatlng, Object.keys(lociCount), Object.values(lociCount), Object.keys(lociCount).map(e => colorMap[e]), globalSearch, nodeHighlight, node, link, chart, uniqueVirus, graph)
        nodeHighlight(node, link, a, 0.2);

        chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: i
        })
        if (i < uniqueDate.length - 1) {
            i = i + 1;
            $("#playIndex").val(i)
            $("#playContent").val(a.join(","))
        } else {
            clearInterval(player);
            restore(chart, node, link)
        }
    }, parseInt($('#speed').val()))

    $(".fa-pause-circle").on("click", () => {
        clearInterval(player);
        $(".fa-pause-circle").hide()
        bu.show()
    })

    $(".fa-redo").on("click", () => {
        clearInterval(player);
        restore(chart, node, link, map, getLatlng, uniqueCountry, uniqueVirus, graph)
    })
}


const restore = (chart, node, link, map, getLatlng, uniqueCountry, uniqueVirus, graph) => {
    $("#playIndex").val(0)
    $("#playContent").val("")
    $(".fa-pause-circle").hide()
    $(".fa-play-circle").show()
    drawCircle(map, getLatlng, uniqueCountry.map(e => e.name), uniqueCountry.map(e => e.count), uniqueCountry.map(e => e.color), node, link, chart, uniqueVirus, graph)
    chart.dispatchAction({
        type: 'restore'
    })
    node.style('opacity', 1);
    link.style('opacity', 1);
}