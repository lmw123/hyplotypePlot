/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-05 12:15:28
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-05 21:54:04
 */


import { globalSearch } from './search';
import { nodeHighlight } from './partsHighlight';

export const playStart = (bu, uniqueDate, graph, node, link, chart) => {
    bu.hide()
    $(".fa-pause-circle").show()
    $(".fa-redo").show()

    let i = parseInt($("#playIndex").val())
    let a = $("#playContent").val().split(",")

    if(i == 0) {
        chart.dispatchAction({
            type: 'restore'
        })
    }
    
    let player = setInterval(() => {

        a = a.concat(globalSearch(uniqueDate[i].name + "|date", graph))
        a = Array.from(new Set(a))
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
            restore(chart,node, link)
        }
    }, 500)

    $(".fa-pause-circle").on("click", () => {
        clearInterval(player);
        $(".fa-pause-circle").hide()
        bu.show()
    })

    $(".fa-redo").on("click", () => {
        clearInterval(player);
        restore(chart, node, link)
    })
}


const restore = (chart, node, link) => {
    $("#playIndex").val(0)
    $("#playContent").val("")
    $(".fa-pause-circle").hide()
    $(".fa-play-circle").show()
    // $(".fa-redo").hide()
    chart.dispatchAction({
        type: 'restore'
    })
    node.style('opacity', 1);
    link.style('opacity', 1);
}