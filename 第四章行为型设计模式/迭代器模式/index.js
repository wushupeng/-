let Iterator = function(items,container) {
    let container = container&&document.getElementById(container)||document;
    let items = comtainer.getElementsByTagName(items);
    let length = items.length;
    let index = 0;
    let splice = [].splice;
    return {
        //获取第一个元素
        first:function(){
            index= 0;
            return items[index]
        },
        //获取最后一个元素
        second:function(){
            index = length-1;
            return items[index];
        },
        //获取前一个元素
        pre:function(){
            if(--index>0){
                return items[index];
            }else{
                index=0;
                return items[index];
            }
        },
        //获取后一个元素
        next:function(){
            if(++index<length){
                return items[index];
            }else{
                index=0;
                return null;
            }
        },
        //获取某一个元素
        get:function(num){ 
            //num>0正向获取，否则逆向获取
            index = num>=0?num%length:num%length+length;
            return items[index];
        },
        //对每一个元素之行某一个方法
        dealEach:function(fn){
            let args = splice.call(arguments,1);
            for(let i =0;i<length;i++){
                fn.apply(items[i],args)
            }
        },
        //对某一个元素执行某一个方法
        dealItem:function(num,fn){
            fn.apply(this.get(num),splice.call(arguments,2));
        },
        //排他方式处理某一个元素
        exclusive:function(num,allFn,numFn){
            this.dealEach(allFn);
            if(Object.prototype.toString.call(num)==='[object Array]'){
                for(let i =0,len = num.length;i<len;i++){
                    this.dealItem(num[i],numFn);
                }
            }else{
                this.dealItem(num,numFn)
            }
        },
    }
}



//使用
// let demo = new Iterator('li','container');

// console.log(demo.first());
// console.log(demo.pre());
// console.log(demo.next());
// console.log(demo.get(2000));
// demo.dealEach((text,color)=>{
//     this.innerHTML = text;
//     this.style.backfround = color;
// },'test','pink')
// demo.exclusive([2,3],function(){
//     this.innerHTML = '被排除的';
//     this.style.background = 'green';
// },function(){
//     this.innerHTML = '选中的';
//     this.style.background = 'red';
// })


//数组迭代器

let eachArray = function(arr,fn) {
    let i=0,len=arr.length;
    for(;i<len;i++){
        if(fn.call(arr[i],i,arr[i])===false){
            break;
        }
    }
}

//对象迭代器
let eachObject = function(obj,fn) {
    for(let key in obj) {
        if(fn.call(obj[key],key,obj[key])===false){
            break;
        }
    }
}

//let result = res.data.data.count;这句话一旦哪个属性是undefined，那么我们的程序就会报错
//如果使用了同步变量迭代取值器，就可避免这种报错
let A = {
    conmon:{},
    client:{
    user:{
        username:'wushupeng',
        uid:1,
    }
}}
let AGetter = function(key) {
    if(!A){
        return undefined;
    }
    let result = A;
    key = key.split('.');
    for(let i of key){
        if(result[key[i]]!==undefined){
            result = result[key[i]];
        }else{
            return undefined;
        }
    }
}


console.log(AGetter('client.user.username'))