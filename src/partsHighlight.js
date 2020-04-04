/*
 * @Descripttion: 
 * @version: 
 * @Author: Anke Wang
 * @Date: 2020-04-03 15:08:55
 * @LastEditors: Anke Wang
 * @LastEditTime: 2020-04-05 04:13:17
 */

import * as d3 from 'd3';

/**
 * @name: fadeReset
 * @description: fadeReset
 * @param1: {
 *      node and link in graph
 *      }
 * @return: null
 * @detail: 
 */

export const fadeReset = (allNodes, allLinks) => {
    allNodes.style('opacity', 1);
    allLinks.style('opacity', 1).style('stroke', "#999");
}

/**
 * @name: nodeHighlight
 * @description: 点击node或者搜索节点之后的高亮行为，需要考虑多节点选择问题
 * @param1: {
 *      allNodes -- node
 *      allLinks -- link 
 *      nodesID -- node.id 
 *      opacity -- set opacity
 *      }
 * @return: null
 * @detail: 
 */

export const nodeHighlight = (allNodes, allLinks, nodesID, opacity) => {

    fadeReset(allNodes, allLinks);

    if (Array.isArray(nodesID) === false)
    {
        allNodes.style('opacity', d => (d.id === nodesID? 1 : opacity));
        allLinks.style('opacity', o => (o.source.id === nodesID || o.target.id === nodesID ? 1 : opacity));
        allLinks.style('stroke', o => (o.source.id === nodesID || o.target.id === nodesID ? "#ffc107" : "#999"));
    }
    else
    {
        allNodes.style('opacity', d => (nodesID.includes(d.id)? 1 : opacity));
        allLinks.style('opacity', o => (nodesID.includes(o.source.id) && nodesID.includes(o.target.id) ? 1 : opacity));
    }
}

/**
 * @name: linkHighlight
 * @description: 点击link之后的高亮行为
 * @param1: {
 *      allNodes -- node
 *      allLinks -- link 
 *      link -- selected link 
 *      opacity -- set opacity
 *      }
 * @return: null
 * @detail: 
 */

export const linkHighlight = (allNodes, allLinks, link, opacity) => {

    fadeReset(allNodes, allLinks);

    allLinks.style('opacity', o => (o.source === link.source && o.target === link.target ? 1 : opacity));
    allNodes.style('opacity', d => (link.source.id === d.id || link.target.id === d.id ? 1 : opacity));

}