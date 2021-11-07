let A = {};

A.on = function(dom,type,fn){
    if(dom.addEventListener){
        dom.addEventListener(type,fn,false)
    }else if(dom.attachEvent){
        dom.attachEvent('on'+type,fn)
    }else{
        dom['on'+type] = fn;
    }
}

//上面的方法每一次调用的时候 都要进行逻辑分支判断
//懒惰模式 可以解决这种经常需要逻辑判断走哪个分支的情景
 
A.on = function(dom,type,fn){
    if(dom.addEventListener){
        A.on = (dom,type,fn)=>{
            dom.addEventListener(type,fn,false)
        }
    }else if(dom.attachEvent){
        A.on = (dom,type,fn)=>{
            dom.attachEvent('on'+type,fn)
        }
    }else{
        A.on = (dom,type,fn)=>{
            dom['on'+type] = fn;
        }
    }
    A.on(dom,type,fn); //这里调用一下，只有第一次调用的时候需要逻辑判断走哪个分支
}
//下面这种也是懒惰方式，逻辑判断走不同分支，创建不同的on方法
A.on = (function(dom,type,fn){
    if(dom.addEventListener){
        return (dom,type,fn)=>{
            dom.addEventListener(type,fn,false)
        }
    }else if(dom.attachEvent){
        return (dom,type,fn)=>{
            dom.attachEvent('on'+type,fn)
        }
    }else{
        return (dom,type,fn)=>{
            dom['on'+type] = fn;
        }
    }
})()