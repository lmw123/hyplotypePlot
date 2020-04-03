/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-03 22:24:28
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-03 22:47:23
 */


 export const formatSelectData = (graph) => {
    let result = []

    let acc = []
    graph.nodes.forEach(n => {
        n.Virus.forEach(v => acc.push(v.acc))
    })
    acc = Array.from(new Set(acc))

    acc.forEach(e => {
        result.push({
            "id": e + "|acc",
            "text": e
        })
    });
    
    let date = []
    graph.nodes.forEach(n => {
        n.Virus.forEach(v => date.push(v.date))
    })
    date = Array.from(new Set(date))
    
    date.forEach(e => {
        result.push({
            "id": e + "|date",
            "text": e
        })
    });

    let country = []
    graph.nodes.forEach(n => {
        n.pieChart.forEach(v => country.push(v.color))
    })
    country = Array.from(new Set(country))
    
    country.forEach(e => {
        result.push({
            "id": e + "|country",
            "text": e
        })
    });
    
    return result;
 }