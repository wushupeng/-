var viewCommand = (function(){
    var tpl = {
        //展示图片结构模板
        product:[
            '<div>',
                '<img src="{#src#}"/>',
                '<p>{#text#}</p>',
            '</div>',
        ].join(''),
        //展示标题结构模板
        title:[
            '<div class="title>',
                '<div class="main">',
                    '<h2>{#title#}</h2>',
                    '<p>{#tips#}</p>',
                '</div>',
            '</div>'
        ].join(''),
    }
    //格式化字符串缓存字符串
    let html = ''; //这里通过闭包 使得这个html得以一直在作用域中
    //格式化字符串
    function formatString(str,obj) {
        return str.replace(/\{#(\w+)#\}/g,function(match,key){
            return obj[key];
        })
    }
    //方法集合
    let Action = {
        create:function(data,view){
            if(data.length){
                for(let i =0,len = data.length;i<len;i++){
                    html+=formatString(tpl[view],data[i]);
                }
            }
        },
        display:function(container,data,view){
            if(data){
                this.create(data,view);
            }
            //展示模块
            document.getElementById(container).innerHtml = html;
            html='';
        },
    };
    return function excute(msg){
        msg.param = Object.prototype.toString.call(msg.param)==='[object Array]'?msg.param:[msg.param];
        Action[msg.command].apply(Action,msg.param);
    }
})()

var productData = [
    {src:'command/02.jpg',text:'绽放的桃花'},
    {src:'command/03.jpg',text:'阳光下的温馨'},
    {src:'command/04.jpg',text:'镜头前的绿色'},
]

var titleData = {
    title:'夏日里的一片温馨',
    tips:'暖管的温情带给人们假的感受'
}
viewCommand({
    command:'display',
    param:['title',titleData,'title'] //第一个参数是container,第二个参数是data,第三个参数是模板
})

//创建一个图片
viewCommand({
    command:'create',
    param:[{
        src:'command/01.jpg',
        text:'迎着朝阳的野菊花',
    },'product']
})

viewCommand({
    command:'display',
    param:['product',productData,'product']
})

//命令对象：{command:'',param:[]}
//发送者 就是excute方法。
//接收者：就是Action里的方法，
//发送者和接收者进行解耦