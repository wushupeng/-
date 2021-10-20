/**
 * 抽象工厂是创建类的
 */

let VehicleFactory = function (subClass,parentClass){
    if(typeof VehicleFactory[parentClass] === 'function') {
        let F = function(){};
        F.prototype = new VehicleFactory[parentClass]();
        subClass.constructor = subClass;//修复子类的contructor指向
        subClass.prototype = new F();
    }else{
        throw new Error('无法创建该类')
    }
}

VehicleFactory.Car = function(){
    this.type='Car';
}
VehicleFactory.Car.prototype = {
    getPrice:function(){
        throw new Error('abstract function')
    },
    getSpeed:function(){
        throw new Error('abstract function')
    }
}

let BMW = function(price,speed){
    this.price = price;
    this.speed=speed;
}

VehicleFactory(BMW,'Car');
BMW.prototype.getPrice = function(){
    return this.price;
}
BMW.prototype.getSpeed = function(){
    return this.speed;
}
let Benz = function(price,speed){
    this.price = price;
    this.speed=speed;
}
VehicleFactory(Benz,'Car')
let bmw = new BMW(100,200);
console.log(bmw.getSpeed())
console.log(bmw.getPrice())

let benz = new Benz(100,200);
console.log(benz.getSpeed())
console.log(benz.getPrice())