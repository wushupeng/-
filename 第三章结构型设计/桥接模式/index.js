let spans = document.getElementsByTagName('span');

spans[0].onMouseover = function(){
    this.style.color='red';
    this.style.background = '#ddd';
}

spans[0].onMouseout = function(){
    this.style.color='#333';
    this.style.background = '#f5f5f5';
}

spans[1].onMouseover = function(){
    this.getElementsByTagName('strong')[0].style.color='red';
    this.getElementsByTagName('strong')[0].style.background = '#ddd';
}
spans[1].onMouseout = function(){
    this.getElementsByTagName('strong')[0].style.color='#333';
    this.getElementsByTagName('strong')[0].style.background = '#f5f5f5';
}

// 这里有些代码是重复的；都是给某个对象绑定事件；但是每个事件里的业务逻辑又有一些不同；所以先把业务逻辑抽象出来
let ChangeColor=function(dom,color,background){
    dom.style.color = color;
    dom.style.background = background;
}

let spans = document.getElementsByTagName('span');

spans[0].onMouseover = function(){
    ChangeColor(this,'red','#ddd');
    // this.style.color='red';
    // this.style.background = '#ddd';
}

spans[0].onMouseout = function(){
    ChangeColor(this,'#333','#f5f5f5');
    // this.style.color='#333';
    // this.style.background = '#f5f5f5';
}

spans[1].onMouseover = function(){
    ChangeColor(this.getElementsByTagName('strong')[0],'red','#ddd');
    // this.getElementsByTagName('strong')[0].style.color='red';
    // this.getElementsByTagName('strong')[0].style.background = '#ddd';
}
spans[1].onMouseout = function(){
    ChangeColor(this.getElementsByTagName('strong')[0],'#333','#f5f5f5');
    // this.getElementsByTagName('strong')[0].style.color='#333';
    // this.getElementsByTagName('strong')[0].style.background = '#f5f5f5';
}


//再来看另一种应用场景

function Speed(x,y){
    this.x = x;
    this.y = y;
}

Speed.prototype.run=function(){
    console.log('运动起来');
}

function Color(cl){
    this.color = cl;
}

Color.prototype.draw = function(){
    console.log('绘制色彩');
}

function Shape(sp) {
    this.shape = sp;
}

Shape.prototype.change = function(){
    console.log('改变形状');
}

function Speek(wd) {
    this.word = wd;
}

Speek.prototype.say = function(){
    console.log('说点什么')
}
//创建球类，球有速度，也有颜色
function Ball(x,y,c) {
    this.speed = new Speed(x,y);
    this.color = new Color(c);
}

Ball.prototype.init = function(){
    this.speed.run();
    this.color.draw();
}
//创建人类，人也有速度 此外还有演讲的能力
function People(x,y,f) {
    this.speed = new Speed(x,y);
    this.font = new Speek(f);
}

People.prototype.init = function(){
    this.speed.run();
    this.font.say();
}
//精灵 可以运动可以改变颜色和形状
function Spirite(x,y,c,s) {
    this.speed = new Speed(x,y);
    this.color = new Color(c);
    this.shape = new Shape(s);
}

Spirite.prototype.init = function() {
    this.speed.run();
    this.color.draw();
    this.shape.change();
}

//交接模式主要就是细粒化，可以作为某对象的一部门，或者逻辑的一部分 复用