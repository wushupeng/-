/**
 * 安全工厂，这个工厂模式和之前的简单工厂类似 ，也是为了创建多类实例。
 * @param {*} type 
 * @param {*} context 
 * @returns 
 */
let Factory = function(type,context){
    if(this instanceof Factory){
        return new this[type](context)
    }else {
        return new Factory(type,context)
    }
}

Factory.prototype={
    Java:function(context){
        this.context=context;
        (function(context){
            // let div = document.createElement('div');
            // div.innerHTML=context;
            // div.style.border ='1px solid red';
            // document.getElementById('container').appendChild(div)
            console.log(context)
        })(context)
    }
}


Factory('Java','Java 是世界上最好的语言')