export const getUniqueCountry = (data) => {

    let country = data.nodes.map(a => a.pieChart.map(a => a.color))
    let uniqueCountry = []
    country.forEach(c => uniqueCountry = uniqueCountry.concat(c))
    uniqueCountry = Array.from(new Set(uniqueCountry))
    let countCount = uniqueCountry.map(a => 0)

    //safari sort 兼容性有问题
    data.nodes.forEach(a => a.pieChart.forEach(b => countCount[uniqueCountry.indexOf(b.color)] += a.radius * b.percent))
    uniqueCountry.forEach((a, i) => uniqueCountry[i] = {"country": a, "count": countCount[i]})
    uniqueCountry.sort((a, b) => {
        return (b.count > a.count) ? 1 : (b.count < a.count) ? -1 : 0;
    })

    return uniqueCountry;
}

