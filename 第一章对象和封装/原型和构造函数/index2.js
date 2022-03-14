const Animal = function(name){
    console.log(this);
    this.name = name
}

let a = new Animal('test');

//这个就是Object.create函数
const object_create = function(Func){
    let F = function(){};
    F.prototype = Func;
    return new F();
}

const Task= {
    setID:(ID)=>{this.ID=ID},
    outputID:function(){console.log(this.ID)}
}

const XYZ = object_create(Task);
XYZ.prepareTask = function(ID,Label){
    this.setID(ID)
    this.Label = Label
}
XYZ.output = function(){
    console.log(this.ID)
}
console.log('#XYZ',XYZ);
XYZ.prepareTask(1,'test')
console.log('#XYZ1',XYZ);
console.log(Task);
Task.outputID();
console.log(this);
