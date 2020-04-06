/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-04 11:20:38
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-06 16:07:01
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
            type: 'log',
            logBase: 2
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
        a.push({
            name: e.name, 
            value: [e.name,e.count],
        })
    })

    let option = {
        grid:{
            height: $("datePlot").height(),
            x:40,
            x2:20,
            y:10,
            y2:40
        },
        tooltip: {
            formatter: function (params, ticket, callback) {
                return "<strong>"+params.value[0]+"</strong><br>Isolates: " + params.value[1]
                console.log(params)
            }
        },
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
            label: {
                show: true,
                formatter: function(params) {
                    return params.value[0].split('-')[1]+"-"+params.value[0].split('-')[2]
                },
                color: "#6c757d"
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    color: '#fd7e14'
                }
            }
        }
    };

    let chart = echarts.init(document.getElementById("datePlot"))
    chart.setOption(option);

    return chart;
}


