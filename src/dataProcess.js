/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-02 13:52:46
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-04 18:15:40
 */
export const getUniqueCountry = (data) => {

    let country = data.nodes.map(a => a.pieChart.map(a => a.color))
    let uniqueCountry = []
    country.forEach(c => uniqueCountry = uniqueCountry.concat(c))
    uniqueCountry = Array.from(new Set(uniqueCountry))
    let countCount = uniqueCountry.map(a => 0)

    //safari sort 兼容性有问题
    data.nodes.forEach(a => a.pieChart.forEach(b => countCount[uniqueCountry.indexOf(b.color)] += a.radius * b.percent))
    uniqueCountry.forEach((a, i) => uniqueCountry[i] = {"name": a, "count": Math.round(countCount[i]/100)})
    uniqueCountry.sort((a, b) => {
        return (b.count > a.count) ? 1 : (b.count < a.count) ? -1 : 0;
    })

    return uniqueCountry;
}

export const getUniqueDate = (data) => {
    
    let date = data.nodes.map(a => a.Virus.map(a => a.date))
    let dataAll = []
    date.forEach(c => dataAll = dataAll.concat(c))
    // uniqueDate = Array.from(new Set(uniqueDate))
    let dateCount = dataAll.reduce(function (allNames, name) { if (name in allNames) { allNames[name]++; } else { allNames[name] = 1; } return allNames; }, {});

    let res = [];
    Object.keys(dateCount).forEach(e => {
        if(e.length === 10) {
            res.push({
                "name": e,
                "count": dateCount[e]
            })
        }
    })

    res.sort((a, b) => {
        return (b.name < a.name) ? 1 : (b.name > a.name) ? -1 : 0;
    })
    
    return res;
}

