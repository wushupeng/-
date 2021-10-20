//中介者模式可以降低对象之间的耦合

let Mediator = function() {
    let _msg = {};
    return {
        register:function(type,action) {
            if(_msg[type]){
                _msg[type].push(action)
            }else{
                _msg[type] = [];
                _msg[type].push(action)
            }
        },
        send:function(type) {
            if(_msg[type]){
                for(let action of _msg[type]){
                    action&&action();
                }
            }
        }
    }
}

Mediator.register('demo',()=>{console.log('first')});
Mediator.register('demo',()=>{console.log('second')});
Mediator.send('demo')
