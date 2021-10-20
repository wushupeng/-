let MarryState = function(){
    let _currentState = {};//用于保存内部状态的私有变量
    let states = {
        jump:function(){
            console.log('jump');
        },
        move:function(){
            console.log('move');
        },
        shoot:function(){
            console.log('shoot');
        },
        squat:function(){
            console.log('squat');
        }
    };
    //动作控制类
    let Action = {
        changeState:function(){
            let arg = arguments;//这里通过arguments来取参数，就不用从function中声明参数了
            _currentState={};//重置内部状态
            if(arg.length){
                for(let i =0;i<arg.length;i++){
                    _currentState[arg[i]] = true;
                }
            }
            return this;
        },
        //执行动作
        goes:function(){
            console.log('触发一次动作');
            //便利内部状态保存的动作
            for(let i in _currentState) {
                states[i] && states[i]();
            }
            return this;
        }
    }

    return {
        change:Action.changeState,
        goes:Action.goes,
    }
}

MarryState().change('jump','shoot').goes().goes().change('shoot').goes();

let marry = new MarryState();
marry.change('jump','shoot').goes().goes().change('shoot').goes();