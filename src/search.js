/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-03 22:24:28
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-04 20:32:15
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

export const globalSearch = (term, graph) => {
    let b;
    let type = term.split("|")[1];
    let val = term.split("|")[0];
    if (type === "country") {
        b = graph.nodes.filter(n => {
            if (n.pieChart.filter(p => p.color === val).length > 0) {
                return true
            } else {
                return false
            };
        })
    }else if(type === "date") {
        b = graph.nodes.filter(n => {
            if (n.Virus.filter(p => p.date === val).length > 0) {
                return true
            } else {
                return false
            };
        })
    }else if(type === "acc") {
        b = graph.nodes.filter(n => {
            if (n.Virus.filter(p => p.acc === val).length > 0) {
                return true
            } else {
                return false
            };
        })
    }
    return b.map(e => e.id);
}