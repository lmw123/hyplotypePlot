/*
 * @Descripttion: 
 * @version: 
 * @Author: Anke Wang
 * @Date: 2020-04-03 15:08:55
 * @LastEditors: Anke Wang
 * @LastEditTime: 2020-04-04 14:13:21
 */

/**
 * @name: nodeHighlight
 * @description: 点击node或者搜索节点之后的高亮行为，需要考虑多节点选择问题
 * @param1: {
 *      node:"节点的id或者其他属性",
 * 
 *      }
 * @return: null
 * @detail: 
 */

import * as d3 from 'd3';

export const fadeReset = (allNodes, allLinks) => {

    allNodes.style('stroke-opacity', 1);
    allLinks.style('stroke-opacity', 1);
}

export const nodeHighlight = (allNodes, allLinks, nodesID, opacity) => {

    fadeReset(allNodes, allLinks);
    
    allNodes.each(function(d) {

        let element;
        element = d3.select(this);
        element.style("opacity", opacity);

        if (Array.isArray(nodesID) === false) 
        {   
            if(d.id === nodesID)
            {
                element.style("opacity", "1");
                allLinks.style('stroke-opacity', o => (o.source.id === nodesID || o.target.id === nodesID ? 1 : opacity));
            }
        }
        else
        {
            if (nodesID.includes(d.id))
            {
                element.style("opacity", "1");
            }
        }
    });

}


/**
 * @name: linkHighlight
 * @description: 点击link之后的高亮行为
 * @param1: {
 *      link:"选择的link",
 *      }
 * @return: null
 * @detail: 
 */

export const linkHighlight = (allNodes, allLinks,  link, opacity) => {

    fadeReset(allNodes, allLinks);
    allLinks.each(function(d) {

        var element;
        element = d3.select(this);
        element.style("opacity", opacity);

        if(d.source === link.source && d.target === link.target)
		{
            element.style("opacity", "1");
            console.log("kkkkkkkk");
		}

    });

    nodeHighlight(allNodes, allLinks, [link.source.id,link.target.id], opacity);

}