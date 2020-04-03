/**
 * @name: Generate Color
 * @description: 根据洲或者其他信息返回颜色
 * @param1: {
 *      name:"desc",
 *      
 *      }
 * @return: {China: "red", USA: "blue" ...}
 * @detail: 
 */
function generateColorBy()

/**
 * @name: nodeHighlight
 * @description: 点击node或者搜索节点之后的高亮行为，需要考虑多节点选择问题
 * @param1: {
 *      node:"节点的id或者其他属性",
 *      }
 * @return: null
 * @detail: 
 */
function nodeHighlight(node)

/**
 * @name: linkHighlight
 * @description: 点击link之后的高亮行为
 * @param1: {
 *      link:"选择的link",
 *      }
 * @return: null
 * @detail: 
 */
function linkHighlight(link)

/**
 * @name: drawLegend
 * @description: 生成legend，要考虑legend画板的长宽，尽量铺满
 * @param1: {
 *      legendCanvas:"画板",
 *      graphData:"原始图像数据",
 *      legendColor:"对应的颜色"
 *      }
 * @return: null
 * @detail: 
 */
function drawLegend(legendCanvas, graphData, legendColor)

/**
 * @name: globalSearch
 * @description: 全局搜索
 * @param1: {
 *      searchTerm:"搜索内容",
 *      }
 * @return: ["Node_1", "Node_2" ...]
 * @detail: 
 */
function globalSearch(searchTerm)

/**
 * @name: 
 * @description: 画一张世界地图，有余力再做
 * @param1: {
 *      mapCanvas:"画板",
 *      graphData:"数据",
 *      legendColor:"颜色",
 *      }
 * @return: null
 * @detail: 
 */
function mapPlot(mapCanvas, graphData, legendColor)