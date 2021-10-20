let PriceStrategy = function(){
    //这个是策略
    let stragtegy = {
        return30: function(price) {
            return +price+parseInt(price/100)*30;//+price 转化为数字类型
        },
        return50:function(price) {
            return +price+parseInt(price/100)*50; 
        },
        percent90:function(price) {
            return price*100*90/10000;
        },
        percent80:function(price) {
            return price*100*80/10000;
        },
        percent50:function(price) {
            return price*100*50/10000;
        },
    }

    return function(algorithm,price) {
        return stragtegy[algorithm]&&stragtegy[algorithm](price)
    }
}

//使用
let price = PriceStrategy('return30',100);

console.log(price);