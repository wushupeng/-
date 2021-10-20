export interface Event {
    type: string;
    message: any;
  }
  const Observer = (function () {
    let _message: Map<any, any> = new Map(); //消息对象
    return {
      regist: function (type: string, fn: Function) {
        if (!_message.has(type)) {
          _message.set(type, [fn]);
        } else {
          _message.get(type).push(fn);
        }
      }, //注册订阅
      remove: function (type: string, fn: Function) {
        if (_message.get(type) instanceof Array) {
          let callBackArr = _message.get(type);
          for (let i = callBackArr.length - 1; i > 0; i--) {
            callBackArr[i] === fn && callBackArr.splice(i, 1);
          }
        }
      }, //移除订阅
      exec: function (type: string, message: any) {
        const event: Event = {
          type,
          message,
        };
        _message.get(type)?.forEach((fn: Function) => {
          console.log('调用订阅');
          fn.call(this, event);
        });
      }, //调用订阅
    };
  })();
  
  export default Observer;
  