function superClass(name){
    this.books = ['1','2','3'];
    this.name=name
}

superClass.prototype.getBooks = function(){
    return this.books;
}

superClass.prototype.getName = function(){
    return this.name;
}
superClass.prototype.ids = [1,2,3,4,5]

function subClass(name,time){
    superClass.call(this,name);
    this.time=time;
}

subClass.prototype = new superClass();
subClass.prototype.getTime = function(){
    return this.time;
}


let s = new subClass('zhagnsan','123')
let s1 = new subClass('zhagnsan1','1231')

s.books.push('test');
console.log(s.getBooks())

console.log(s1.getBooks())

s.ids.push(6);
console.log(s.ids);
console.log(s1.ids);
