let Waiter = function(){
    let dfd = [],//注册等待对象容器
    doneArr = [],//成功回调方法容器
    failArr=[],//失败回调方法容器
    slice=Array.prototype.slice,
    //保存当前等待者对象
    that = this;
    let Primise = function(){
        this.resolved = false;
        this.rejected = false;
    }
    Primise.prototype = {
        resolve:function(){
            this.resolved = true;
            if(!dfd.length){
                return;
            }
            for(let i =dfd.length-1;i>=0;i--){
                if(dfd[i]&& !dfd[i].resolved ||dfd[i].rejected){
                    return
                }
                //清除监控对象
                dfd.splice(i,1);
            }
            _exec(doneArr)
        },
        reject:function(){
            this.rejected = true;
            if(!dfd.length){
                return;
            }
            dfd.splice(0);
            _exec(failArr)
        },
    }
    //创建监控对象
    that.Deferred = function(){
        return new Primise();
    }

    //回调执行方法
    function _exec(arr){
        for(let i=0;i<arr.length;i++){
            try {
                arr[i]&&arr[i]();
            } catch (error) {
                console.log(error);
            }
        }
    }

    that.when = function(){
        dfd = slice.call(arguments);
        let i = dfd.length;
        for(--i;i>0;i--){
            if(!dfd[i]||dfd[i].resolved||dfd[i].rejected||!dfd[i] instanceof Primise){
                dfd.splice(i,1)
            }
        }
        return that;
    }

    that.done = function(){
        doneArr = doneArr.concat(slice.call(arguments));
        return that;
    }

    that.fail = function(){
        failArr = failArr.concat(slice.call(arguments));
        return that;
    }

}


let waiter = new Waiter();
let first = (function(){
    let dtd = waiter.Deferred();
    setTimeout(function(){
        console.log('first finish');
        dtd.resolve();
    },5000);
    return dtd;
})();
let second =(function(){
    let dtd = waiter.Deferred();
    setTimeout(function(){
        console.log('second finish');
        dtd.resolve();
    },10000);
    return dtd;
})()

waiter.when(first,second)
.done(()=>console.log('success'),()=>console.log('success again'))
.fail(()=>console.log('fail'))
