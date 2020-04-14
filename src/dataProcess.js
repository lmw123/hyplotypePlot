/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-02 13:52:46
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-14 11:01:34
 */

import * as d3 from 'd3';
import { defaultColor } from './plotConfig';

export const getUniqueCountry = (data) => {

    let country = data.nodes.map(a => a.pieChart.map(a => a.color))
    let uniqueCountry = []
    country.forEach(c => uniqueCountry = uniqueCountry.concat(c))
    uniqueCountry = Array.from(new Set(uniqueCountry))
    let countCount = uniqueCountry.map(a => 0)

    //safari sort 兼容性有问题
    data.nodes.forEach(a => a.pieChart.forEach(b => countCount[uniqueCountry.indexOf(b.color)] += a.radius * b.percent))
    uniqueCountry.forEach((a, i) => uniqueCountry[i] = {
        "name": a, 
        "count": Math.round(countCount[i]/100),
        "color": defaultColor[i]
    })
    
    uniqueCountry.sort((a, b) => {
        return (b.count > a.count) ? 1 : (b.count < a.count) ? -1 : 0;
    })

    return uniqueCountry;
}

export const getUniqueDate = (data) => {
    
    let date = data.nodes.map(a => a.Virus.map(a => a.date))
    let dataAll = []
    date.forEach(c => dataAll = dataAll.concat(c))
    let dateCount = dataAll.reduce(function (allNames, name) { if (name in allNames) { allNames[name]++; } else if(name.length === 10){ allNames[name] = 1; } return allNames; }, {});

    let dateSort = Object.keys(dateCount).sort();
    
    let timeRange = d3.timeDay.range(new Date(dateSort[0]), new Date(dateSort[dateSort.length - 1]))
    let formatTime = d3.timeFormat("%Y-%m-%d")
    let res = [];

    timeRange.forEach((e,i) => {
        let count = 0;
        if(dateCount[formatTime(e)]){
            count = dateCount[formatTime(e)]
        }
        res.push({
            name: formatTime(e),
            count: count,
        })
    })
    return res;
}

export const getUniqueVirus = (graph) => {
    let virus = []
    graph.nodes.forEach(node => {
        virus = virus.concat(node.Virus)
    })
    return virus;
}