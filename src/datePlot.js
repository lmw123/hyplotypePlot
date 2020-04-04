/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-04 11:20:38
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-04 17:20:31
 */

import * as echarts from 'echarts';
import { dateFormat } from 'highcharts';
export const drawBarPlot = (data) => {
    console.log(data)
    let option = {
        grid:{
            x:40,
            x2:20,
            y:10,
            y2:40
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: data.map(e => e.name),
            axisLabel: {
                interval: 0,
                rotate: 30,
                fontSize: 8
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: data.map(e => e.count),
            type: 'bar'
        }]
    };
    
    echarts.init(document.getElementById("datePlot")).setOption(option);
}

export const drawHeatmapDate = (data) => {
    let a = []

    data.forEach(e => {
        a.push([e.name, e.count])
    })
    console.log(data.map(e => e.count))
    let option = {
        grid:{
            x:40,
            x2:20,
            y:10,
            y2:40
        },
        tooltip: {},
        visualMap: {
            // min: 0,
            // max: data.reduce((e1, e2) => {
            //     return e1.count > e2.count ? e1.count : e2.count}
            // ),
            type: 'continuous',
            // orient: 'horizontal',
            right: 20,
            bottom: "center",
            textStyle: {
                color: '#000'
            }
        },
        calendar: {
            top: 20,
            left: 60,
            right: 70,
            bottom:10,
            cellSize: ['auto', 'auto'],
            range: [data[0].name, data[data.length-1].name],
            itemStyle: {
                borderWidth: 0.5
            },
            yearLabel: {show: false}
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: a
        }
    };
    
    echarts.init(document.getElementById("datePlot")).setOption(option);
}


