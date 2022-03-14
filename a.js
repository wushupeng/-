let date = new Date().getTime();

console.log(date.toString(),typeof date);

console.log(1<<0)

let p = new Promise((resolve,reject)=>{
    console.log('我之行啦');
    return 1;
})

console.log(p);
p.then(res=>{
    console.log('then=',res)
})