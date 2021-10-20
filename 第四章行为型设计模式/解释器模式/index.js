//XPath解释器
let Interpreter = (function () {
  //同级兄弟便利
  function getSublingName(node) {
    //如果存在兄弟元素
    if (node.previousSibling) {
      let name = "",
        count = 1,
        nodeName = node.nodeName,
        sibling = node.previousSibling;
      //如果存在前一个兄弟
      while (sibling) {
        //如果节点为元素 并且节点类型与前一个兄弟元素类型相同，并且前一个兄弟元素名称存在
        if (
          sibling.nodeType == 1 &&
          sibling.nodeType === node.nodeType &&
          sibling.nodeName
        ) {
          //如果节点名称和前一个兄弟元素名称相同
          if (nodeName == sibling.nodeName) {
            //节点名称后面添加计数
            name += ++count;
          } else {
            //重置相同紧邻节点名称节点个数
            count = 1;
            name += "|" + sibling.nodeName.toUpperCase();
          }
        }
        //向前获取前一个兄弟元素
        sibling = sibling.previousSibling;
      }
      return name;
    } else {
      return "";
    }
  }
  /**
   * node:目标节点
   * wrap:容器节点
   */
  return function (node, wrap) {
    let path = []; //路径数组
    let wrap = wrap || document;
    //如果当前（目标）节点等于容器节点
    if (node === wrap) {
      //容器节点为元素
      if (wrap.nodeType === 1) {
        //路径数组中输入容器节点名称
        path.push(wrap.nodeName.toUpperCase());
      }
      //返回最终路径数组结果
      return path;
    }
    //如果当前节点的父节点不等于容器节点
    if (node.parentNode !== wrap) {
      //对当前节点的父节点执行遍历操作
      path = arguments.callee(node.parentNode, wrap);
    } else {
      //如果当前节点的父元素节点与容器节点相等
      //容器节点为元素
      if (wrap.nodeType == 1) {
        path.push(wrap.nodeName.toUpperCase());
      }
    }
    //获取元素的兄弟元素名称统计
    let sublingsNames = getSublingName(node);
    if(node.nodeType ==1 ){
        path.push(node.nodeName.toUpperCase()+sublingsNames);
    }
    return path
  };
})();

//使用
let path = Interpreter(document.getElementById('span7'));