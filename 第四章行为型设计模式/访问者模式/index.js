//访问着模式的思想就是在不改变操作对象的同时，为它添加新的方法

/**
 * 
 * @param {*} dom 
 * @param {*} type 
 * @param {*} fn 
 * @param {*} data 这个data是为了想事件回调函数传递自定义数据
 */
function bindIEEvent(dom,type,fn,data ) {
    let data = data || {};
    dom.attachEvent('on'+type,function(e){
        fn.call(dom,e,data);//通过call或者apply来改变函数调用时的作用域是访问者模式的精髓
    })
}

function $(id) {
    return document.getElementById(id);
}

bindIEEvent($('btn'),'click',(e,d)=>{$('test').innerHTML = e.type+d.text+this.tagName;},{text:'test demo'})


//上面是一个小的例子
//Visitor 为某个对象提供了数组的功能
let Visitor = (function(){
    return {
        splice:function(){
            let args = Array.prototype.splice.call(arguments,1);
            return Array.prototype.splice.apply(arguments[0],args);
        },
        push:function(){
            let len = arguments[0].length || 0;
            let args = this.splice(arguments,1);
            arguments[0].length = len +arguments.length-1;
            return Array.prototype.push.apply(arguments[0],args);
        },
        pop:function(){
            return Array.prototype.pop.apply(arguments[0])
        }
    }
})()

let a = new Object();
console.log(a.length);
Visitor.push(a,1,2,3,4);
console.log(a.length);
Visitor.push(a,4,5,6);
console.log(a)
console.log(a.length);
Visitor.pop(a);
console.log(a);
Visitor.splice(a,2);
console.log(a)