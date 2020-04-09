/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-09 12:26:16
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-09 17:43:53
 */

import * as d3 from 'd3';


export const drawGeneStructure = (colorCustom, type) => {
    d3.select(".node-table").select("svg").remove()
    Promise
        .all([
            d3.tsv("https://bigd.big.ac.cn/ewas/haplotypetest/gene_structure.tsv"),
            d3.tsv('https://bigd.big.ac.cn/ewas/haplotypetest/nsp.tsv'),
            d3.tsv(type)
            // d3.tsv('https://bigd.big.ac.cn/ewas/haplotypetest/2019-nCoV_3437_altCoverage.tsv'),
            // d3.tsv('https://bigd.big.ac.cn/ewas/haplotypetest/2019-nCoV_3437_amioCoverage.tsv')
        ]).then(([geneData, nspData, altData]) => {

            geneData.forEach((e, i) => {
                e.color = colorCustom[i];
                e.start = parseInt(e.start)
                e.end = parseInt(e.end)
            })
            let geneWidth = $(".node-table").width();
            let geneHeight = Math.max($(".node-table").height(), 300);
            let xGeneScale = d3.scaleLinear()
                .domain(d3.extent([0, 29903]))
                .range([0, geneWidth - 40])
            // .nice();

            let xAxis = d3.axisBottom(xGeneScale)
                .tickSize(10)
                .tickPadding(3);

            let svg = d3.select(".node-table").append("svg")
                .attr("width", geneWidth)
                .attr("height", geneHeight)

            let geneCanvas = svg.append('g')
                .attr('transform', `translate(20, 10)`)

            drawDotPlot(geneCanvas, geneWidth, altData, [0, 29903])

            const xAxisCanvas = geneCanvas.append('g')
                .attr('transform', `translate(0, 265)`);

            let xAxisG = xAxisCanvas.append('g')
                .call(xAxis)

            let geneStruCanvas = geneCanvas.append('g')
                .attr('transform', `translate(0, 235)`);

            geneStruCanvas.selectAll('rect').data(geneData)
                .enter().append('rect')
                .attr('x', (d) => xGeneScale(d.start))
                .attr('width', d => xGeneScale(d.end - d.start + 1))
                .attr('height', 20)
                .attr('fill', (d, i) => d.color);

            let nspCanvas = geneCanvas.append('g')
                .attr('transform', `translate(0, 170)`);

            nspCanvas.selectAll('rect').data(nspData)
                .enter().append('rect')
                .attr('x', (d) => xGeneScale(d.start))
                .attr('width', d => xGeneScale(d.end - d.start + 1))
                .attr('height', 20)
                .attr("y", (d, i) => i % 2 == 0 ? 20 : 0)
                .attr('fill', "gray");

            nspCanvas.selectAll('text').data(nspData)
                .enter().append('text')
                .attr('x', (d) => xGeneScale(d.start) + xGeneScale(d.end - d.start + 1) / 2)
                .attr("y", (d, i) => i % 2 == 1 ? 15 : 35)
                .text((d, i) => i + 1)
                .attr("font-size", "10px")
                .attr('text-anchor', 'middle')

            nspCanvas.append("line")
                .attr('x1', 0)
                .attr('x2', xGeneScale(21552))
                .attr('y1', 45)
                .attr('y2', 45)
                .attr("stroke-width", 1)
                .attr("stroke", "gray")

            nspCanvas.append("text")
                .text("nsp")
                .attr("font-size", "15px")
                .attr('text-anchor', 'middle')
                .attr('x', xGeneScale(21552 / 2))
                .attr("y", 60)

            nspCanvas.append("rect")
                .attr('x', xGeneScale(22550))
                .attr('width', xGeneScale(23311 - 22550 + 1))
                .attr('height', 20)
                .attr('y', 10)
                .attr('fill', "red");

            nspCanvas.append("text")
                .text("RBD")
                .attr("font-size", "15px")
                .attr('fill', 'red')
                .attr('x', xGeneScale(23311))
                .attr("y", 25)

            const brush = d3.brushX()
                .extent([[0, -15], [geneWidth - 40, 120]])
                .on("end", brushed);

            let largeCanvas = geneCanvas.append('g')
                .attr('transform', `translate(0, 140)`);

            geneCanvas.append("g")
                .attr('transform', `translate(0, 180)`)
                .call(brush)
                .call(brush.move, [1, 29903].map(xGeneScale));

            function brushed() {

                const selection = d3.event.selection;
                let sx;
                if (selection === null) {
                    sx = [1, 1];
                } else {
                    sx = selection.map(xGeneScale.invert);

                }

                let a = geneData.filter(e => e.end > sx[0])
                    .filter(e => e.start < sx[1])

                let largeScale = d3.scaleLinear()
                    .domain(d3.extent([0, sx[1] - sx[0] + 1]))
                    .range([0, geneWidth - 40])

                let rectL = []
                let rectS = []
                largeCanvas.selectAll('text').remove()
                largeCanvas.selectAll('rect').remove()
                largeCanvas.selectAll('rect').data(a)
                    .enter().append('rect')
                    .attr('x', (d) => d.start <= sx[0] ? 0 : largeScale(d.start - sx[0]))
                    .attr('width', (d, i) => {
                        let b = d.start <= sx[0] ? 0 : largeScale(d.start - sx[0]);
                        if (d.start <= sx[0] && d.end <= sx[1]) {
                            rectL[i] = largeScale(d.end - sx[0] + 1)
                            rectS[i] = b + rectL[i] / 2
                            return largeScale(d.end - sx[0] + 1)
                        } else if (d.start <= sx[0] && d.end >= sx[1]) {
                            rectL[i] = largeScale(sx[1] - sx[0] + 1)
                            rectS[i] = b + rectL[i] / 2
                            return largeScale(sx[1] - sx[0] + 1)
                        } else if (d.start >= sx[0] && d.end <= sx[1]) {
                            rectL[i] = largeScale(d.end - d.start + 1)
                            rectS[i] = b + rectL[i] / 2
                            return largeScale(d.end - d.start + 1)
                        } else {
                            rectL[i] = largeScale(sx[1] - d.start + 1)
                            rectS[i] = b + rectL[i] / 2
                            return largeScale(sx[1] - d.start + 1)
                        }
                    })
                    .attr('height', 20)
                    .attr('fill', (d, i) => d.color);


                largeCanvas.selectAll('text').data(a)
                    .enter().append('text')
                    .text(((d, i) => {
                        if (rectL[i] > 20) {
                            return d.name
                        }
                    }))
                    .attr('fill', "white")
                    .attr('x', (d, i) => rectS[i])
                    .attr("y", 13)
                    .attr('text-anchor', 'middle')
                    .attr("font-size", "10px")

                drawDotPlot(geneCanvas, geneWidth, altData, sx)

            }





        });

}

const drawDotPlot = (canvas, width, data, xrange) => {

    d3.select('.dotPlot').remove()
    let dotCanvas = canvas.append("g")
        .attr('class', 'dotPlot')
        .attr('transform', `translate(0, 10)`);

    let xScale = d3.scaleLinear()
        .domain(xrange)
        .range([0, width - 40])

    let xAxis = d3.axisBottom(xScale)
        .tickSize(10)
        .tickPadding(3);

    let xAxisCanvas = dotCanvas.append('g')
        .attr('transform', `translate(0, 100)`);

    let xAxisG = xAxisCanvas.append('g')
        .call(xAxis)

    let yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([100, 0])
    // .nice();

    let yAxis = d3.axisLeft(yScale)
        .tickSize(-2)
        .tickPadding(1);

    let yAxisCanvas = dotCanvas.append('g')

    let yAxisG = yAxisCanvas.append('g')
        .call(yAxis)

    let a = data.filter(e => (e.pos >= xrange[0] && e.pos <= xrange[1]))

    dotCanvas.selectAll('.l1').data(a)
        .enter().append('line')
        .attr("class", "l1")
        .attr("stroke-width", 2)
        .attr("stroke", "red")
        .attr('x1', (d, i) => {
            console.log(d.pos + ":" + xScale(parseInt(d.pos)))
            return xScale(parseInt(d.pos))
        })
        .attr('x2', (d, i) => xScale(parseInt(d.pos)))
        .attr('y1', yScale(0))
        .attr('y2', (d, i) => yScale(d.freq))
        .attr("cursor", "pointer")
        .on("mouseover", (d) => {
            d3.select(".dotProp").remove()
            let tx = Math.min(xScale(parseInt(d.pos)) + 2, width-100)
            let ty = Math.min(yScale(d.freq)/2, 120)

            let propCanvas = dotCanvas.append('g')
                .attr('class', 'dotProp')
                .attr('transform', `translate(${tx}, ${ty})`)

            propCanvas.append("rect")
                .attr('rx', 8)
                .attr('width', 80)
                .attr('height', 40)
                .attr('fill', 'rgba(0, 0, 0, 0.8)')
                .transition()
                .duration(500);

            propCanvas.append("text")
                .text("Freq:" + d.freq)
                .attr("fill", "white")
                .attr('font-size', 10)
                .attr('transform', `translate(5, 18)`)

            propCanvas.append("text")
                .text("Coverage:" + d.number)
                .attr("fill", "white")
                .attr('font-size', 10)
                .attr('transform', `translate(5, 28)`)
        })

}