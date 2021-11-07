//适配器模式：讲一个类（对象）的接口（方法或者属性） 转化成另外一个接口
let A = A||{};

A.g = function(id) {
    return document.getElementById(id)
}

A.on = function(id,type,fn){
    let dom = typeof id==='string'?this.g(id):id;
    if(dom.addEventListener){
        dom.addEventListener(type,fn,false);
    }else if(dom.attachEvent) {
        dom.attachEvent('on'+type,fn);
    }else{
        dom['on'+type] = fn
    }
}

//使用
A.on(window,'load',function(){
    A.on('mybutton','click',function(){})
})


// A就是我们的适配器，如果我现在需要引入jquery框架 就只需要改一下代码，其他业务逻辑代码都不需要修改
A.g = function(id) {
    return $(id).get(0)
}


//参数适配器
function doSomeThing(name,title,age,color,size,price){}

function doSomeThing(obj){
    let _adapter = {
        name:'',
        title:'',
        age:24,
        color:'',
        size:100,
        prize:50,
    }

    for(let i in _adapter){
        _adapter[i] = obj[i||_adapter[i]]
    }

}


//数据适配
let arr = ['javascript','book','前端编程语言']

let obj = {
    name:'',
    type:'',
    title:''
}

function arrToObjAdapter(arr){
    return {
        name:arr[0],
        type:arr[1],
        title:arr[2],
    }
}

//服务器端数据适配
function ajaxAdapter(data) {
    return [data['key1'],data['key2'],data['key3']]
}

$.ajax({
    url:'http://www.baidu.com',
    success:function(data,status) {
        doSomeThing(ajaxAdapter(data))
    }
})