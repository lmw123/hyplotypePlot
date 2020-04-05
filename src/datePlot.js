/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-04 11:20:38
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-04 22:02:07
 */

import * as echarts from 'echarts';
import { dateFormat } from 'highcharts';
export const drawBarPlot = (data) => {
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
    echarts.init(document.getElementById("datePlot")).clear()
    echarts.init(document.getElementById("datePlot")).setOption(option);
}

export const drawHeatmapDate = (data) => {

    echarts.init(document.getElementById("datePlot")).clear()
    let a = []

    data.forEach(e => {
        a.push([e.name, e.count])
    })

    let option = {
        grid:{
            x:40,
            x2:20,
            y:10,
            y2:40
        },
        tooltip: {},
        visualMap: {
            textGap: 3,
            type: 'continuous',
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
            dayLabel: {
                margin: 5
            },
            yearLabel: {show: false}
        },
        series: {
            name: "heat",
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: a,
            emphasis: {
                itemStyle: {
                    color: "red"
                }
            }
        }
    };
    
   

    let chart = echarts.init(document.getElementById("datePlot"))
    chart.setOption(option);

    return chart;
}


