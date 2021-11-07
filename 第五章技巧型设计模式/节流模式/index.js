function extend(){
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
/**
 * 节流器：
 * 1.节流器可以清除要执行的函数
 * 2.节流器可以延迟执行函数
 */
let throttle = function(){
    let isClear = arguments[0],fn;
    if(typeof isClear ==='boolean'){
        fn = arguments[1];
        // isClear是arguments.callee(true,fn) 传入进来的所以是true，这里需要清除要执行的函数
        fn.__throttleID && clearTimeout(fn.__throttleID);
    }else { //如果第一参数不是boolean类型的 那么就是要执行的函数了，所以赋值给fn
        fn = isClear;
        param = arguments[1];
        let p = extend({
            context:null,//函数执行时的作用域
            args:[],//函数执行的参数
            time:300,//函数延迟执行的时间
        },param);
        console.log(p);
        arguments.callee(true,fn);
        //通过setTimeout来使fn延迟执行
        fn.__throttleID = setTimeout(function(){
            fn.apply(p.context,p.args)
        },p.time)
    }
}

//测试用例
throttle(()=>{
    console.log('test')
})