//代理模式主要是用来解决跨域问题的。
//一种是通过Image的src属性来作为代理 解决跨域问题，但这种好像只能用于get请求
let Count = (function(){
    let img = new Image();
    return function(param) {
        let str = 'http://www.***.com/a.gif?';
        for(let i in param) {
            str+=`i=${param[i]}`
        }
        img.src = str;
    }
})()

Count({num:10})

//另一种是通过JSONP的方式作为代理，来进行跨域请求
function jsonpCallBack(res,req) {
    console.log(res,req)
}

<script type='text/JavaScript' src='http://localhost/test/jsonp.php?callback=jsonpCallBack&data=getJsonPData'></script>