/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-03 11:13:56
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-03 11:41:52
 */
import 'bootstrap';
import 'bootstrap-table';

export const refreshNodeTable = (graph) => {
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
}