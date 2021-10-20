let News = function(){
    //自组件容器
    this.children = [];

    //当前组件元素
    this.element = null;
}

News.prototype = {
    init:()=>{
        throw new Error('请重写你的方法');
    },
    add:()=>{
        throw new Error('请重写你的方法');
    },
    getElement:()=>{
        throw new Error('请重写你的方法');
    },
}

//寄生组合式继承
function inheritObject(o){
    function F(){};
    F.prototype = o;
    return new F();
}
function inheritPrototype(subClass,superClass){
    var p = inheritObject(superClass.prototype);
    // console.log(p['__proto__'].getName)
    p.contructor = subClass;
    subClass.prototype =p
}
//组合模式需要有容器类
let Container = function(id,parent){
    News.call(this);
    this.id = id;
    this.parent = parent;
    this.init();
}
inheritPrototype(Container,News);
Container.prototype.init = function(){
    this.element = document.createElement('ul');
    this.element.id = this.id;
    this.element.className = 'new-container';
};

Container.prototype.add = function(child){
    this.children.push(child);
    this.element.appendChild(child.getElement());
    return this; //这样可以链式调用
}

Container.prototype.getElement = function(){
    return this.element;
}

Container.prototype.show = function(){
    this.parent.appendChild(this.element);
}

let Item = function(classname){
    News.call(this);
    this.classname = classname||'';
    this.init();
}
inheritPrototype(Item,News);
Item.prototype.init = function(){
    this.element = document.createElement('li');
    this.element.className = this.classname;
}

Item.prototype.add = function(child){
    this.children.push(child);
    this.element.appendChild(child.getElement());
    return this;
}

Item.prototype.getElement = function(){
    return this.element;
}

let NewsGroup = function(classname){
    News.call(this);
    this.classname = classname||'';
    this.init();
}
inheritPrototype(NewsGroup,News);
NewsGroup.prototype.init = function(){
    this.element = document.createElement('div');
    this.element.className = this.classname;
}

NewsGroup.prototype.add = function(child){
    this.children.push(child);
    this.element.appendChild(child.getElement());
    return this;
}

NewsGroup.prototype.getElement = function(){
    return this.element;
}

//组合模式需要有子成员类
let ImageNews = function(url,href,classname){
    News.call(this);
    this.url = url||'';
    this.href = href||'#';
    this.classname= classname;
}

inheritPrototype(ImageNews,News);
ImageNews.prototype.init = function(){
    this.element = document.createElement('a');
    let img = new Image();
    img.src = this.url;
    this.element.appendChild(img);
    this.element.className = 'image-news' + this.classname;
    this.element.href = this.href;
}

ImageNews.prototype.add = function(){
}

ImageNews.prototype.getElement = function(){
    return this.element;
}

let IconNews = function(text,href,type){
    News.call(this);
    this.text = text||'';
    this.href = href||'#';
    this.type = type||'video';
    this.init();
}

inheritPrototype(IconNews,News);

IconNews.prototype.init = function(){
    this.element = document.createElement('a');
    this.element.innerHTML = this.text;
    this.element.href = this.href;
    this.element.className = 'icon'+this.type;
}
IconNews.prototype.add = function(){
}

IconNews.prototype.getElement = function(){
    return this.element;
}


//现在我们来创建新闻了

let news1 = new Container('news',document.body);
news1.add(
    new Item('normal').add(
        new IconNews('这是个新闻标题','#','video')
    )
).add(
    new Item('normal').add(
        new ImageNews('http://www.baidu.com','#','imagenews')
    )
)