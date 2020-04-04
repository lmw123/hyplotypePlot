/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-04 11:20:38
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-04 16:09:56
 */

import * as echarts from 'echarts';
export const drawCountryPie = (uniqueCountry) => {
    let data = []
    uniqueCountry.forEach(e => {
        data.push({
            "name": e.name,
            "value": e.count
        })
    });

    let option = {
        title: {
            text: 'Country',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: data,
        },
        series: [
            {
                name: 'Country',
                type: 'pie',
                radius: '55%',
                center: ['40%', '50%'],
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    echarts.init(document.getElementById("nodeInfo")).setOption(option);
}