/**
 * 简单工厂有两种；
 * 1.根绝类型创建不同类的实例
 * 2.根据参数，创建一个实例返回
 */


function Car() {
    console.log('car constructor');
    this.luntaiNum=4;
    this.engineNum=1
    this.siteNum=5;
    this.weight=0;
    this.color='black'
}
Car.prototype.getInfo=function(){
    return `轮胎：${this.luntaiNum};
    发动机:${this.engineNum};
    座位:${this.siteNum};
    重量:${this.weight};
    颜色:${this.color};
    `
}
Car.prototype.selfIntroduction=function(){
    throw new Error('selfIntroduction is abstract function')
}
let singleFather = (function(){
    let father=null;
    return ()=>{
        if(father){
            return father;
        }else{
            father = new Car();
            return father;
        }
    }
})();
function Benz() {
    this.name='Benz';
}
Benz.prototype=singleFather();
Benz.prototype.selfIntroduction=function(){
    let baseInfo = this.getInfo();
    return `
    品牌:${this.name};
    ${baseInfo}`
}

function Volve(){
    this.name='volve';
}
Volve.prototype = singleFather();
Volve.prototype.selfIntroduction=function(){
    let baseInfo = this.getInfo();
    return `
    品牌:${this.name};
    ${baseInfo}`
}

function BMW(){
    this.name='BMW'
}
BMW.prototype=singleFather();
/**
 * 这个简单工厂，通过band参数就可以确定返回的实例，函数调用者不需要知道具体要依赖哪个类
 * @param {*} band 
 * @returns 
 */
function simpleFacroty(band){
    let result = null;
    switch(band){
        case "Benz":
            result = new Benz();
            break;
        case "Volve":
            result = new Volve();
        case "BMW":
            result = new BMW();
            break;
        default:
            throw new Error('can not find band with '+band);
    }
    return result;
}
// let carInstance = simpleFacroty('Benz');
// console.log(carInstance.selfIntroduction())
let car1 = simpleFacroty('BMW');
console.log(car1.selfIntroduction())

/**
 * 这个简单工厂抽离出三个参数，通过参数创建不同的实例，但是他们却有一些相同的方法。通过简单工厂，我们隐藏了内部的细节。只需要使用者知道三个参数代表什么意思就可以了
 * @param {*} name 
 * @param {*} sex 
 * @param {*} age 
 * @returns 
 */
let simpleFacroty2 = function(name,sex,age){
    let result = new Object();
    result.name=name;
    result.sex=sex;
    result.age=age;
    result.sleep=function(){
        console.log(`${this.name} 正在睡觉`)
    }
    return result;
}

// let persion1 = simpleFacroty2('wushupeng','男',29)
// let persion2 = simpleFacroty2('dingwandi','女',29)
 
// console.log(persion1.sleep(),persion2.sleep())