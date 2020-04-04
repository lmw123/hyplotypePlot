/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-03 10:21:12
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-04 16:41:33
 */

import { drawBarPlot,drawHeatmapDate } from './datePlot';
 
export const defaultColor = ["#d62728", "#9467bd", "#8c564b", "#e377c2", "#1c7f7c", "#7f7f7f", "#bcbd22", "#17becf", "#1f77b4", "#ff7f0e", "#2ca02c", "#d48265", "#2f4554", "#61a0a8", "#91c7ae", "#749f83", "#ca8622", "#bd4829", "#546570", "#606dff", "#1d83f4", "#2f67b9", "#4548f4", "#123754", "#7f7f7f", "#f468c2", "#ffeb3b", "#346270", "#ff2f23", "#cf9e19", "#2507f4", "#f427ab", "#D84E0C", "#9c0df4", "#2b1a7f", "#ffeb3b", "#699f2c", "#ff19ec", "#75fff3", "#ca84ff", "#ff0c1b", "#1bff2c", "#b695f4", "#197f59", "#4548f4", "#419f42", "#2325f4", "rgba(62,21,60,0.91)"]

export const bootstrapBehaviors = (uniqueCountry, uniqueDate) => {
    $(".dropdown-menu").on("click", "[data-stopPropagation]", e => {
        e.stopPropagation()
    })

    $(function () {
        $("[data-toggle='popover']").popover()
    })
    
    drawHeatmapDate(uniqueDate)
    $(".fa-globe-americas").on("click", () => drawBarPlot(uniqueCountry))
    $(".fa-calendar-alt").on("click", () => drawHeatmapDate(uniqueDate))
}

export const nodeSizeRange = [1, 15]
export const linkSizeRange = [10, 300]