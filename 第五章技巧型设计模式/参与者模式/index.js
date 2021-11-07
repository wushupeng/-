// 参与者：在特定的作用域中执行给定的函数，并将参数原封不动的传递。
// A.event.on = function(dom,type,fn,data){
//     if(dom.addEventListener){
//         dom.addEventListener(type,function(e){
//             fn.call(dom,e,data);
//         });
//     }else if(dom.attachEvent){
//         dom.attachEvent('on'+type,fn)
//     }else{
//         dom['on'+type] = fn;
//     }
// }

//自己实现一个函数绑定
function bind(fn,context){
    return function(){
        return fn.apply(context,arguments)
    }
}
//测试bind方法
// let demoObj = {
//     title:'abc'
// }

// function demoFn(){
//     console.log(this.title)
// }

// let bindFn = bind(demoFn,demoObj);
// demoFn();
// bindFn();

//测试bind结束

let btn = document.getElementsByTagName('button')[0];
let p = document.getElementsByTagName('p')[0];
function demoFn(){
    console.log(arguments,this);
}

let bindFn = bind(demoFn)
bindFn = bind(demoFn,btn);
bindFn = bind(demoFn,p);
btn.addEventListener('click',bindFn);
btn.removeEventListener('click',bindFn);

let fn = function(){
    console.log('+++',arguments,this);
}
btn.addEventListener('click',fn);
btn.removeEventListener('click',fn);


//函数柯里化:根据传递参数的不同，让一个函数存在多种形态
function curry(fn){
    let Slice = [].slice;
    let args = Slice.call(arguments,1);
    return function(){
        let addArgs = Slice.call(arguments);
        let allArgs = args.concat(addArgs);
        return fn.apply(null,allArgs)
    }
}

//测试curry函数
function add(num1,num2){
    return num1+num2;
}

function add5(num){
    return add(5,num)
}

console.log(add(1,2))
console.log(add5(6))
add5 = curry(add,1);
console.log(add5(7))

let add7add8 = curry(add,7,8);
console.log(add7add8());
