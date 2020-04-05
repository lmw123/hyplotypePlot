/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-03 11:13:56
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-05 21:57:32
 */
import 'bootstrap';
import 'bootstrap-table';

export const refreshNodeTable = (nodes) => {
    let nodeInfo = []
    nodes.forEach(c => nodeInfo = nodeInfo.concat(c.Virus))
    $("#linkInfo").text("Virus (" + nodeInfo.length + ")")
    $("#linkTable")
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
}


export const updateNodeTable = (nodes) => {
    // $("#linkTable").bootstrapTable('destroy')
    let nodeInfo = []
    nodes.forEach(c => nodeInfo = nodeInfo.concat(c.Virus))
    $("#linkInfo").text("Virus (" + nodeInfo.length + ")")
    $("#linkTable")
        .bootstrapTable("refreshOptions", {data: nodeInfo})
}

export const updateNodeTableByVirus = (virus) => {
    $("#linkInfo").text("Virus (" + virus.length + ")")
    $("#linkTable")
        .bootstrapTable("refreshOptions", {data: virus})
}
