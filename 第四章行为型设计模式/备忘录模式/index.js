//备忘录模式

//下一页按钮点击事件

$('#next_page').click(function(){
    let $news = $('#news_content');
    let page = $news.dataset('page');
    getPageData(page,function(){
        $news.data('page',page+1)
    })
})

function getPageData(page,fn) {
    $.post('./data/getNewsData.php',{
        page:page
    },function(res){
        if(res.errNo==0){
            showPage(page,res.data);
            fn&&fn();
        }
    })
}

//上面代码有一个问题，就是每次返回上一页的时候会再次请求后台获取数据。

//注意 如果复用率低的数据不值得缓存
//我们可以缓存上一页的数据，这样返回上一页的时候就不会请求后台了。

let Page = function(){
    let cache = {};

    return function(page,fn) {
        if(cache[page]){
            showPage(page,cache[page])
            fn&&fn();
        }else{
            $.post('./data/getNewsData.php',{
                page:page
            },function(res){
                if(res.errNo==0){
                    showPage(page,res.data);
                    cache[page] = res.data; //这里对请求到的数据进行缓存
                    fn&&fn();
                }
            })
        }
    }
}