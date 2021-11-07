//委托模式：多个对象接收并处理同一请求，他们将请求委托给另一个对象统一处理
//比如我们要渲染一个列表，然后每一行有一个按钮，如果每一个按钮都加载一个onclick事件的话，浪费内存。我们可以把onclick事件放在ul上，通过冒泡来调用ul上的onclick事件的回调函数。这样就达到了委托的目的。好处是节约了内存
//委托模式还可以解决内存外泄的问题

//此外还可以在后端封装一个委托者,一次请求 全部解决

let Deal = {
    banner:function(){},
    aside:function(){},
}

$.get('/deal',function(res){
    for(let method in Deal){
        Deal[method]&&Deal[method](res)
    }
})