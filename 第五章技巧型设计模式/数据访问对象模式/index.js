/**
 * 本地存储类
 * @param {*} preId 本地存储数据库前缀
 * @param {*} timeSign 时间戳与存储数据之间的拼接符
 */
let BaseLocalStorage = function(preId,timeSign) {
    this.preId = preId;
    this.timeSign = timeSign || '|-|';
}

BaseLocalStorage.prototype = {
    //操作状态
    status:{
        SUCCESS:0, //成功
        FAILURE:1, //失败
        OVERFLOW:2, //溢出
        TIMEOUT:3, //过期
    },
    //保存本地存储链接
    storage:localStorage||window.localStorage,
    //获取本地存储数据库数据真实字段
    getKey : function(key) {
        return this.preId+key;
    },
    //添加/修改数据
    set:function(key,value,callback,time){
        let status = this.status.SUCCESS;
        let key = this.getKey(key);
        try {
            time = new Date(time).getTime()||time.getTime();
        } catch (error) {
            //为传入事件参数或者事件参数有误获取默认时间
            time = new Date().getTime()+1000*60*60*24*31;
        }
        try {
            this.storage.setItem(key,time+this.timeSign+value);
        } catch (error) {
            status = this.status.OVERFLOW;
        }
        callback&&callback.call(this,status,key,value)
    },
    //获取数据
    get:function(key,callback) {
        let status = this.status.SUCCESS;
        let key = this.getKey(key);
        let value = null;
        let timeSignLen = this.timeSign.length;
        let that = this;
        let index,time,result;
        //从本地数据库中取数据
        try {
            value = that.storage.getItem(key);
        } catch (error) {
            result = {
                status:that.status.FAILURE,
                value:null,
            }
            callback&&callback.call(this,result.status,result.value);
            return result;
        }
        if(value) {
            //获取时间戳与存储数据之间的拼接符起始位置
            index = value.indexOf(that.timeSign);
            time = +value.slice(0,index);
            //判断数据是否过期
            if(new Date(time).getTime()>new Date().getTime()||time==0){
                value = value.slice(index+timeSignLen);
            }else{//数据过期了需要清掉
                value=null,
                status = that.status.TIMEOUT;
                that.remove(key);
            }
        }else{//未获取数据字符串状态为失败状态
            status = that.status.FAILURE;
        }
        // 组装数据结果
        result = {
            value,
            status,
        }

        callback&&callback.call(this,result.status,result.value);
        return result;
    },
    //删除数据
    remove:function(key,callback) {
        let status = this.status.FAILURE,
        key = this.getKey(key),
        value=null;
        try{
            value = this.storage.getItem(key);
        }catch(error) {
            
        }
        if(value) {
            try {
                this.storage.removeItem(key);
                status = this.status.SUCCESS;
            } catch (error) {
                
            }
        }
        callback && callback.call(this,status,status>0?null:value.slice(value.indexOf(this.timeSign)+this.timeSign.length));
    }
}


//测试用例

let LS = new BaseLocalStorage('LS_');

LS.set('a','xiaoming',function(){console.log(arguments)});
LS.get('a',function(){console.log(arguments)});
LS.remove('a',function(){console.log(arguments)});
LS.remove('a',function(){console.log(arguments)});
LS.get('a',function(){console.log(arguments)});