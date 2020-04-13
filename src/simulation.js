/*
 * @Descripttion: 
 * @version: 
 * @Author: Mengwei Li
 * @Date: 2020-04-07 18:08:20
 * @LastEditors: Mengwei Li
 * @LastEditTime: 2020-04-10 22:05:11
 */

import { forceSimulation, forceLink, forceManyBody, forceCenter, forceX, forceY } from "d3";

export const setSimulation = (lineScale, nodeScale, charge, width, height) => {
    let simulation = forceSimulation()
        .force("link", forceLink()
            .id(d => d.id)
            .distance(d => lineScale(d.distance) + nodeScale(d.source.radius) / 2 + (d.target.radius) / 2).strength(1))
        .force("charge", forceManyBody()
            .distanceMin(lineScale.range()[0])
            .distanceMax(lineScale.range()[1])
            .strength(charge))
        .force("center", forceCenter(width / 2, height / 2))
        .force('x', forceX().strength(0.01))
        .force('y', forceY().strength(0.01 * height / width))
        .velocityDecay(0.2)
    
    return simulation;
}
