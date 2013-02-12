var loadArticle = function(b,c){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&&xhr.status==200){
            var response = JSON.parse(xhr.responseText);
            showContent(response.content);
        }
    }
    xhr.open("POST","http://v.book.ifeng.com/book/remc.htm",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("b="+b+"&c="+c);
}
var clickHandler = function(e){
    var c = e.target.href;
    c = c.substring(c.indexOf(b)+b.length+1,c.indexOf(".htm"));
    loadArticle(b,c);
    e.preventDefault();
}
l = location.href;//为了简化后续字符操作而做的变量名称简化
var b = l.substring(l.indexOf(l.match(/\d*.htm/)[0]),l.indexOf(".htm"));
var elems_a = document.querySelectorAll(".book_neirong_left1 li a");//name of ifeng in chaos,fuck!
var elem_length = elems_a.length;
var temp_elem;
var articleList = [];
var item = {};
for(var i=0;i<elem_length;i++){
    temp_elem = elems_a[i];
    temp_elem.addEventListener("click",clickHandler,false);
    var c = temp_elem.href;
    c = c.substring(c.indexOf(b)+b.length+1,c.indexOf(".htm"));
    item = {"title":temp_elem.innerText,"c":c};
    articleList.push(item);
}
item = null;
console.log(articleList);

function showContent(content){
    // TODO 将这里内容以弹出层展示
    console.log(content);
}
