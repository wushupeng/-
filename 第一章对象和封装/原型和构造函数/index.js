let Book = function(){
    let name = 'think in js'
    this.name = name;
};

Book.prototype.author = "wushupeng"

let b = new Book();

console.log(b.author,b,b.__proto__)
//b是Book类的实例，b有一个__proto__属性 指向Book类的原型
console.log(b.__proto__===Book.prototype)
//Book原型中有constructor属性，指向的是Book类函数
console.log(Book.prototype.constructor === Book)


function _new(fn){
    //step 1: 创建一个对象
    let obj = {};
    //step2:将obj与fn的prototype连接起来
    obj.__proto__ = fn.prototype;
    //fn的原型上定义constructor属性，是不可枚举的
    Object.defineProperties(fn.prototype,"constructor",{
        enumerable:false,
        writable:true,
        configurable:true,
        value:fn
    })
    //step3:绑定this
    let result = fn.call(obj,arguments);
    //step 4 
    return typeof result ==='object'?result:obj;
    
}


function foo(some){
    this.a = some
}


let obj1 = {};

let bar = foo.bind(obj1,2);
console.log(obj1)
console.log(bar,typeof bar);