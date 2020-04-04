/*
 * @Descripttion: 
 * @version: 
 * @Author: Anke Wang
 * @Date: 2020-04-03 15:08:55
 * @LastEditors: Anke Wang
 * @LastEditTime: 2020-04-04 14:08:57
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

export const nodeHighlight = (allNodes, allLinks, nodesID, opacity) => {

    console.log(allNodes);
    console.log(nodesID);
    console.log(Array.isArray(nodesID));
    
    allNodes.each(function(d) {

        let element;
        element = d3.select(this);
        element.style("opacity", opacity);

        if (Array.isArray(nodesID) === false) 
        {   
            if(d.id === nodesID)
            {
                element.style("opacity", "1");
                //allLinks.style('stroke-opacity', o => (o.source === nodesID || o.target === nodesID ? 1 : opacity));
                allLinks.each(function(k) {
                    let item;
                    item = d3.select(this);
                    item.style("opacity", opacity);
                   // console.log(nodesID +"  11112" + k.source+" 222223 "+k.target);
                   console.log(k.source);
                    if (nodesID == k.source || nodesID == k.target)
                    {
                        item.style("opacity", "1");
                        console.log("bbbbbbbbb");
                    }
                });
            }
            
        }
        else
        {
            if (nodesID.includes(d.id))
            {
                element.style("opacity", "1");
                console.log("bbbbbbbbb");
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

    nodeHighlight(allNodes, allLinks, [link.source,link.target], opacity);
   // allNodes.style('stroke-opacity', o => (o.id === link.source || o.id === link.target ? 1 : opacity));

}