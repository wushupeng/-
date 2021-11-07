
/**
 * fn就是我们要执行的回调函数，但是回调函数在执行时，作用域会发生变化，为了解决这个问题，发明了柯里化函数
 * 通过闭包来达到持有外界传入参数的目的。然后通过fn.apply(context,allArgs) 来改变作用域，同时传入外界传进来的参数
 * 是一种巧妙的技巧
 * @param {*} fn 
 * @param {*} context 
 * @returns 
 */
function bind(fn,context) {
    let Slice = Array.prototype.slice;
    let args = Slice.call(arguments,2);//去掉前两个参数,前两个参数分别是fn和context
    return function(){
        let addArgs = Slice.call(arguments);
        let allArgs = addArgs.concat(args)
        return fn.apply(context,allArgs)
    }
}
function demoFn(){
    //我们的目的是在demoFn这个回调函数中，接收传参
    console.log(arguments,this);
}

let demoData1 = {
    text:'data1'
}
let demoData2 = {
    text:'data2'
}
let demoData3 = {
    text:'data3'
}
let btn = document.getElementsByTagName('button')[0];
let p = document.getElementsByTagName('p')[0];
let bindFn = bind(demoFn,btn,demoData1,demoData2,demoData3);//通过bind方法，传入demoData1,demoData2，demoData3
btn.addEventListener('click',bindFn);