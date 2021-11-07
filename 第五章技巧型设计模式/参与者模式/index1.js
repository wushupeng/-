
//函数柯里化:根据传递参数的不同，让一个函数存在多种形态
function curry(fn){
    let Slice = [].slice;
    console.log(arguments)
    let args = Slice.call(arguments,1);
    console.log(args);
    return function(){
        let addArgs = Slice.call(arguments);
        let allArgs = args.concat(addArgs);
        return fn.apply(null,allArgs)
    }
}

//测试curry函数
function add(num1,num2){
    console.log('这里是add方法',num1,num2)
    return num1+num2;
}

function add5(num){
    return add(5,num)
}

// console.log(add(1,2))
// console.log(add5(6))
add5 = curry(add,1);
console.log(add5(7))

// let add7add8 = curry(add,7,8,9);
// console.log(add7add8());
