let deviceState = function(){
    //存储状态用的
    let _currentState = {};
    let _chanState = [];
    let _device = {};
    let state = {
        WaitDevJoin:function(msg){
            console.log('等待设备入网的信息');
        },
        DevJoin:function(msg){
            console.log('收到了设备join的信息');
            //遍历_chanState找到当前DevAddr的信道信息
            console.log('遍历_chanState找到当前DevAddr的信道信息')
            //由于DevJoin可能是在ChanState信息之后发送过来的，所以我们要存储之前发送过来的ChanState信息。然后在这一刻，将ChanState[]清空。
            _chanState=[];
            _device['DevAddr'] = '';
            _device['channel'] = {};
            for(let chan of _chanState) {
                _device['channel'][chan.num] = chan.status;
            }
        },
        ChanState:function(msg){
            let obj = JSON.parse(msg);
            console.log('收到了设备的信道状态信息');
            if(_device['channel']&&_device['DevAddr']===obj.DevAddr){
                _device['channel'][obj.DevChan] = obj.State;
            }
        },
        Ready:function(msg){
            console.log('设备已经准备就绪，完成加入设备');
        }
    };

    let Action = {
        changeState:function(){
            _currentState = {};//重置状态
            let arg = arguments;
            if(arg.length){
                for(let i = 0;i<arg.length;i++) {
                    _currentState[arg[i]] = true;
                }
            }
            return this;
        },
        handle:function(msg){
            for(let i in _currentState){
                state[i]&&state[i](msg);
            }
            return this;
        }
    }

    return {
        changeState:Action.changeState,
        handle:Action.handle,
    }
}

