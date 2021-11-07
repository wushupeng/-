//模版类 基础提示框 data渲染数据

let Alert = function(data) {
    if(!data){
        return ;
    }
    this.content = data.content;
    this.panel = document.createElement('div');
    this.contentNode = document.createElement('p');
    this.confirmBtn = document.createElement('span');
    this.closeBtn = document.createElement('b');
    this.panel.className='alert';
    this.closeBtn.className='a-close';
    this.confirmBtn.className='a-confirm';
    this.confirmBtn.innerHTML = data.confirm||'确认';
    this.contentNode.innerHTML = this.content;
    this.success = data.success||function(){}; //点击确认按钮执行的方法
    this.fail = data.fail||function(){};//点击关闭按钮执行的方法
}

Alert.prototype = {
    init:function(){
        this.panel.appendChild(this.closeBtn)
        this.panel.appendChild(this.confirmBtn)
        this.panel.appendChild(this.contentNode)
        // 向页面插入元素
        document.body.appendChild(this.panel);

        this.bindEvent();

        this.show();
    },
    bindEvent:function(){
        let me = this;
        this.closeBtn.onclick = function(){
            me.fail();
            me.hide();
        }
        this.confirmBtn.onclick = function(){
            me.success();
            me.hide();
        }
    },
    hide:function(){
        this.panel.style.display = 'none';
    },
    show:function(){
        this.panel.style.display='block';
    }
}


//现在根据模版类来创建一个按钮在右侧的提示框
let RightAlert = function(data){
    Alert.call(this,data);

    this.confirmBtn.className = this.confirmBtn.className+'_right';
}

RightAlert.prototype = new Alert();

//现在根据模版类来创建一个带标题的提示框
let TitleAlert = function(data) {
    Alert.call(this,data);

    this.title = data.title;

    this.titleNode = document.createElement('h3');

    this.titleNode.innerHTML = this.title;
}

TitleAlert.prototype = new Alert();
//重写父类的init方法
TitleAlert.prototype.init = function(){
    this.panel.insertBefore(this.titleNode,this.panel.firstChild);
    Alert.prototype.init.call(this);
}



//以TitleAlert为父类，创建一个带有取消按钮的提示框
let CancelAlert = function(data) {
    TitleAlert.call(this,data);
    this.cancel = data.cancel;

    this.cancelBtn = document.createElement('span');

    this.cancelBtn.className ='cancel';

    this.cancelBtn.innerHTML = this.cancel||'取消'
}

CancelAlert.prototype = new Alert();
CancelAlert.prototype.init = function(){
    TitleAlert.prototype.call(this);
    this.panel.appendChild(this.cancelBtn);
}

CancelAlert.prototype.bindEvent = function(){
    let me = this;
    TitleAlert.prototype.bindEvent.call(me);
    this.cancelBtn.onClick = function(){
        me.fail();
        me.hide();
    }
}

//现在让我们来创建一个提示框
new CancelAlert({
    title:'提示标题',
    content:'提示内容',
    success:function(){
        console.log('确认')
    },
    fail:function(){
        console.log('cancel')
    }
}).init();