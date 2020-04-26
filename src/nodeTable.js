/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-03 11:13:56
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-17 16:37:23
 */
import 'bootstrap';
import 'bootstrap-table';

export const refreshNodeTable = (nodes) => {
    let nodeInfo = []
    nodes.forEach(c => nodeInfo = nodeInfo.concat(c.Virus))
    $("#detail")
        .bootstrapTable({
            columns: [{
                field: 'acc',
                title: 'Acc',
                sortable: true,
                formatter: (value) => "<a target='__blank' href='https://bigd.big.ac.cn/ncov/genome/accession?q=" + value + "'>" + value + "</a>",
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
    // $("#linkInfo").text("Virus (" + nodeInfo.length + ")")
    $("#detail")
        .bootstrapTable("refreshOptions", {data: nodeInfo})
}

export const updateNodeTableByVirus = (virus) => {
    // $("#linkInfo").text("Virus (" + virus.length + ")")
    $("#detail")
        .bootstrapTable("refreshOptions", {data: virus})
}
