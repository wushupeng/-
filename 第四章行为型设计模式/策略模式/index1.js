//表单验证
let InputStrategy = function() {
    let strategy = {
        notNull:function(value){
            return /\s+/.test(value)?'请输入内容':'';
        },
        number:function(value) {
            return /^[0-9]+(\.[0-9]+)?$/.test(value)?"":'请输入数字';
        },
        phone:function(value) {
            return /^\d{3}\-\d{8}$|^\d{4}\-\d{7}$/.test(value)?"":"请输入正确的电话号码格式，如010-12345678或0418-12345678";
        }
    }
    return {
        check:function(type,value) {
            value = value.replace(/^\s+|\s+$/g,'');
            return strategy[type]?strategy[type](value) :'没有该类型的检测方法';
        },
        addStrategy:function(type,fn) {
            strategy[type] = fn;
        }
    }
}

function $tag(tag,context) {
    context = context||document;
    return context.getElementsByTagName(tag);
}

$tag('input')[1].onclick = function(){
    //获取输入框内容
    let value = $tag('input')[0].value;
    //获取日期格式验证结果
    $tag('span')[0].innerHTML = InputStrategy.check('nickname',value);
}