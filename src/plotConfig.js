/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-03 10:21:12
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-07 16:59:45
 */

import { drawBarPlot, drawHeatmapDate } from './datePlot';
import 'bootstrap-slider';
// export const defaultColor = ["#d62728", "#9467bd", "#8c564b", "#e377c2", "#1c7f7c", "#7f7f7f", "#bcbd22", "#17becf", "#1f77b4", "#ff7f0e", "#2ca02c", "#d48265", "#2f4554", "#61a0a8", "#91c7ae", "#749f83", "#ca8622", "#bd4829", "#546570", "#606dff", "#1d83f4", "#2f67b9", "#4548f4", "#123754", "#7f7f7f", "#f468c2", "#ffeb3b", "#346270", "#ff2f23", "#cf9e19", "#2507f4", "#f427ab", "#D84E0C", "#9c0df4", "#2b1a7f", "#ffeb3b", "#699f2c", "#ff19ec", "#75fff3", "#ca84ff", "#ff0c1b", "#1bff2c", "#b695f4", "#197f59", "#4548f4", "#419f42", "#2325f4", "rgba(62,21,60,0.91)"]

export const defaultColor = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
    '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE',
    '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92', "#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1", '#007bff', '#6610f2', '#6f42c1', '#e83e8c', '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8', '#868e96', '#343a40', '#007bff', '#d8b365', '#5ab4ac', '#a1d76a', '#e9a3c9']

export const bootstrapBehaviors = (uniqueCountry, uniqueDate) => {
    $(".dropdown-menu").on("click", "*", e => {
        e.stopPropagation()
    })

    $(function () {
        $("[data-toggle='popover']").popover()
    })

    $("#branchSize").slider({
        min: 0,
        max: 10,
        value: [3, 6],
    });

    $("#nodeSize").slider({
        min: 0,
        max: 10,
        value: [3, 6],
    });
}

export const nodeSizeRange = [1, 15]
export const linkSizeRange = [5, 300]