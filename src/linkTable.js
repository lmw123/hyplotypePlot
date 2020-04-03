/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-03 11:43:08
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-03 11:45:22
 */

import 'bootstrap';
import 'bootstrap-table';

export const refreshLinkTable = (graph) => {

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
}  