let decorator = function(id,fn){
    let dom = document.getElementById(id);
    if(typeof dom.onclick === 'function'){
        let oldFn = dom.onclick;
        dom.onclick = function(){
            oldFn();
            fn();
        }
    }else{
        dom.onclick = fn
    }
}

//装饰模式 可以不改变对象的前提下，给对象添加额外的方法。