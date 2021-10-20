//指责链模式就是就是将一个功能分为不同职责的模块，比如有的模块只负责网络请求，有的模块只负责渲染，有的模块只负责处理数据

/**
 * 异步请求模块
 * @param {请求数据} data 
 * @param {响应数据处理对象} dealType 
 * @param {事件源} dom 
 */
let sendData = function(data,dealType,dom) {
    let xhr = new XMLHttpRequest(),
    url='getData.php?mod=userInfo';
    xhr.onload = function(event) {
        if((xhr.status>=200 && xhr.status<300)||xhr.status==304) {
            dealData(xhr.responseText,dealType,dom);
        }else{
            console.log('请求失败');
        }
    }

    for(let i in data) {
        url +=`&${i}=${data[i]}`;
    }

    xhr.open('get',url,true);
    xhr.send(null)
}

/**
 * 适配数据模块
 * @param {*} data 
 * @param {*} dealType 
 * @param {*} dom 
 * @returns 
 */
let dealData = function(data,dealType,dom) {
    let dataType = Object.prototype.toString.call(data);
    switch(dealType) {
        case 'sug' :
            if(dataType ==='[object,Array') {
                return createSug(data,dom);
            }
            if(dataType ==='[object Object') {
                let newData = [];
                for(let i in data) {
                    newData.push(data[i]);
                }
                return createSug(newData,dom);
            }
            break;
        case 'validata':
            return createValidataResult(data,dom);
            break;
    }
}
//创建组件模块

/**
 * 创建提示框组件
 * @param {*} data 
 * @param {*} dom 
 */
let createSug = function(data,dom) {
    let html='';
    for(let i=0;i<data.length;i++){
        html += '<li>' +data[i] + '</li>';
    }
    dom.parentNode.getElementsByTagName('ul')[0].innerHTML = html;
}
/**
 * 创建校验组件
 * @param {*} data 
 * @param {*} dmo 
 */
let createValidataResult = function(data,dmo) {
    dom.parentNode.getElementsByTagName('span')[0].innerHTML = data;
}