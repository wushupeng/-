
function Parent(){
    this.name='parent'
}
Parent.prototype={
    getName:()=>this.name
}
console.log('1.',Parent.prototype,Parent,Parent.prototype.constructor===Parent)


let p = new Parent();


let test = function(){
    let o = new Object();
    o.__proto__=Parent.prototype;
    Parent.call(o);
    return o
}

let res = test()

console.log(res)