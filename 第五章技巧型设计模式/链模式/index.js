let A = function(selector){
    return new A.fn.init(selector);
}

A.fn = A.prototype = {
    constructor:A,
    init:function(selector,context){
        this.length=0;
        context = context||document;
        //如果是id选择符，按位非会将-1转为0，就是false
        if(~selector.indexOf('#')){
            this[0]  = document.getElementById(selector.slice(1));
            this.length = 1;
        }else{
            let doms = context.getElementsByTagName(selector);
            for(let i=0;i<doms.length;i++){
                this[i] = doms[i];
            }
            this.length = doms.length;
        }
        this.context = context;
        this.selector = selector;
        return this;
        // return document.getElementById(selector);
    },
    length:2,
    size:function(){
        return this.length;
    },
    push:[].push,
    shift:[].shift,
    sort:[].sort,
    splice:[].splice,
}
A.fn.init.prototype = A.fn;

/**
 * extend 有两个任务：
 *  1. 对外部对象扩展
 *  2. 对内部对象扩展
 */
A.extend = A.fn.extend = function(){
    //扩展对象从第二个参数开始算,那么第一个参数就是被扩展对象，所以i=1，target=arguments[0]
    let i=1,
    len=arguments.length,
    target = arguments[0],
    j;
    if(i==len){
        target = this;
        i--;
    }
    for(;i<len;i++){
        for(j in arguments[i]){
            target[j] = arguments[i][j]
        }
    }
    return target;
}

let demo = A('#demo');
let test = A('div');
console.log(demo)
console.log(test)

//测试用例
let Obj = A.extend({first:1},{second:2},{third:3})
console.log(Obj);//这个是扩展外部对象
A.extend(A.fn,{Version:'1.0'});
console.log(A('#demo').Version);
A.fn.extend({getVersion:function(){return this.Version}})
console.log(A('#demo').getVersion());

//有了extend 就可以扩展链式调用的方法了
A.fn.extend({
    on:(function(){
        if(document.addEventListener){
            return function(type,fn){
                let i = this.length-1;
                for(;i>=0;i--){
                    this[i].addEventListener(type,fn,false)
                }
                return this;
            }
        }else if(document.attachEvent){//IE DOM2级事件
            return function(type,fn) {
                let i = this.length-1;
                for(;i>=0;i--){
                    this[i].addEvent('on'+type,fn)
                }
                return this;
            }
        }else{
            return function(type,fn){ //不支持DOM2级事件浏览器添加事件
                let i = this.length-1;
                for(;i>=0;i--){
                    this[i]['on'+type] = fn;
                }
                return this;
            }
        }
    })()
})

A.fn.extend({
    //border-color -> borderColor
    camelCase:function(str){
        return str.replace(/\-(\w)/g,function(all,letter){
            return letter.toUpperCase();
        })
    }
})
A.fn.extend({
    css:function(){
        let arg = arguments,
        len = arg.length;
        if(this.length<1) {
            return this;
        }

        if(len===1) {
            if(typeof arg[0] ==='string') {
                if(this[0].currentStyle) {
                    return this[0].currentStyle[name];
                }else {
                    return getComputedStyle(this[0],false)[name];
                }
            }else if(typeof arg[0]=== 'object') {
                for(let i in arg[0]) {
                    for(let j = this.length-1;j>-0;j--){
                        this[j].style[A.fn.camelCase(i)] = arg[0][i];
                    }
                }
            }
        }else if(len === 2){
            for(let j= this.length-1;j>=0;j--){
                this[j].style[A.fn.camelCase(arg[0])] = arg[1];
            }
        }
        return this;
    }
})

A.fn.extend({
    attr:function(){
        let arg = arguments,
        len = arg.length;
        if(this.length<1){
            return this;
        }
        if(len===1) {
            //为字符串则获取第一个元素属性
            if(typeof arg[0] ==='string'){
                return this[0].getAttribute(arg[0]);
            }else if(typeof arg[0]==='object') {
                for(let i in arg[0]){
                    for(let j = this.length-1;j>=0;j--){
                        this[j].setAttribute(i,arg[0][i])
                    }
                }
            }
        }else if(len ===2){
            for(let j=this.length-1;j>=0;j--){
                this[j].setAttribute(arg[0],arg[1])
            }
        }
        return this;
    }
})

A.fn.extend({
    html:function(){
        let arg = arguments,
        len = arg.length;
        if(len ===0){
            return this[0]&& this[0].innerHTML;
        }else{
            for(let i = this.length-1;i>=0;i--){
                this[i].innerHTML = arg[0]
            }
        }
        return this;
    }
})

//测试用例
A('div')
.css({
    height:'30px',
    border:'1px solic #000',
    'background-color':'red'
})
.attr('class','demo')
.html('add demo text')
.on('click',function(){
    console.log('clicked')
})


//总结一下：
console.log(`
    链式调用主要是某一个类的每一个方法中都返回this。通过方法中返回实例，从而达到链式调用的使用方式，在写代码的时候带来简单的风格
    这里的关键代码是：A.fn.init.prototype = A.fn; 通过改变prototype，来控制this所处的作用域
    `)