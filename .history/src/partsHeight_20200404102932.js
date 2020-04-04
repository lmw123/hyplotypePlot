/*
 * @Descripttion: 
 * @version: 
 * @Author: Anke Wang
 * @Date: 2020-04-03 15:08:55
 * @LastEditors: Anke Wang
 * @LastEditTime: 2020-04-04 10:29:32
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
function nodeHighlight(node, opacity)
{
    
}

circle.on("click", function(d) {

    
    var thisNode = d.id
    var connected = data.links.filter(function(e) {
        return e.source === thisNode || e.target === thisNode
    });
    circle.attr("opacity", function(d) {
        return (connected.map(d => d.source).indexOf(d.id) > -1 || connected.map(d => d.target).indexOf(d.id) > -1) ? 1 : 0.1
    });

    path.attr("opacity", function(d) {
        return (d.source.id == thisNode || d.target.id == thisNode) ? 1 : 0.1
    });

function fade(opacity) {
    return d => {
      node.style('stroke-opacity', function (o) {
        const thisOpacity = isConnected(d, o) ? 1 : opacity;
        this.setAttribute('fill-opacity', thisOpacity);
        return thisOpacity;
      });

      link.style('stroke-opacity', o => (o.source === d || o.target === d ? 1 : opacity));
    };
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
function linkHighlight(ilink)