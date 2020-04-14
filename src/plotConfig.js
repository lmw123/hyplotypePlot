/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-03 10:21:12
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-14 10:51:28
 */

import { drawBarPlot, drawHeatmapDate } from "./datePlot";
import { formatSelectData } from './search';

import "bootstrap-slider";

export const defaultColor = ["#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3", "#2f7ed8", "#0d233a", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a", "#4572A7", "#AA4643", "#89A54E", "#80699B", "#3D96AE", "#DB843D", "#92A8CD", "#A47D7C", "#B5CA92", "#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1", "#007bff", "#6610f2", "#6f42c1", "#e83e8c", "#dc3545", "#fd7e14", "#ffc107", "#28a745", "#20c997", "#17a2b8", "#868e96", "#343a40", "#007bff", "#d8b365", "#5ab4ac", "#a1d76a", "#e9a3c9"]

export const nodeRange = [1, 15]
export const linkRange = [5, 200]
export const chargeRange = -2

export const defaultBehaviors = (uniqueCountry, uniqueDate, graph) => {
    
    $(".dropdown-menu").on("click", "*", e => {
        e.stopPropagation()
    })

    $(function () {
        $("[data-toggle='popover']").popover()
    })

    let a = $("#linkSize").slider({
        min: 1,
        max: 500,
        value: linkRange
    });

    let b = $("#nodeSize").slider({
        min: 1,
        max: 50,
        value: nodeRange,
    });
    
    let c = $("#chargeSize").slider({
        min: -100,
        max: 0,
        value: chargeRange,
    });

    $("#searchBar").select2({
        minimumInputLength: 1,
        data: formatSelectData(graph),
        templateResult: formatState,
        language: {
            inputTooShort: function () {
                return "Highlight nodes with Country，Acc. No.  or  Collection Date";
            }
        }
    });

    function formatState(state) {
        if (state.text != "Searching…") {
            var $state = $("<span>" + state.id.split("|")[0] + "</span><span style='float: right'><kbd>" + state.id.split("|")[1] + "</kbd></span>");
            return $state;
        }
    };
}

