var loadArticle = function(b,c,title){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&&xhr.status==200){
            var response = JSON.parse(xhr.responseText);
            showContent(title,response.content);
        }
    };
    xhr.open("POST","http://v.book.ifeng.com/book/remc.htm",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("b="+b+"&c="+c);
}
var clickHandler = function(e){
    e.preventDefault();
    var c = e.target.href;
    c = c.substring(c.indexOf(b)+b.length+1,c.indexOf(".htm"));
    if(canBeRead()){
        loadArticle(b,c,e.target.innerText);
        e.target.parentNode.setAttribute("class","redtitle");
    }else{
        alert("Need to be vip!");
    }
    function canBeRead(){
        var can = true;
        if(e.target.nextSibling && e.target.nextSibling.nextSibling
            &&e.target.nextSibling.nextSibling.innerText=="VIP"){//need auth
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                var magicWord = "qpContentText";// if contain this word, means user have rights to read.
                if(xhr.readyState==4){
                    window.m = xhr.responseText.match(magicWord);
                    can = false;
                }
            };
            xhr.open("GET",e.target.href,false);
            xhr.send();
        }
        return can;
    }
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

function showContent(title,content){
    var currentScrollLocation = window.scrollY;
    var elem_box = document.querySelector("#box-ifplugin");
    if(!elem_box){// Are there dom box-ifplugin exists in the page?
        // if not exists then create it!
        createDomElement(title,content);
        elem_box = document.querySelector("#box-ifplugin");
    }else{
        updateDomElement(title,content);
    }
    var keydownHandler = function(e){
        if(e.keyCode == 27){//ESC pressed
            close();
        }
    }
    window.addEventListener("keydown",keydownHandler,false);
    var prev = function(){};
    var next = function(){};
    function createDomElement(title,content){
        var elem_box_ifplugin = document.createElement("div");
        elem_box_ifplugin.setAttribute("id","box-ifplugin");
        var elem_read_popup = document.createElement("div");
        elem_read_popup.setAttribute("class","read-popup");
        var elem_title = document.createElement("div");
        elem_title.setAttribute("class","title");
        var elem_h2 = document.createElement("h2");
        elem_h2.innerHTML = title;
        elem_title.appendChild(elem_h2);
        var elem_content = document.createElement("div");
        elem_content.setAttribute("class","content");
        elem_content.innerHTML = content;
        elem_read_popup.appendChild(elem_title);
        elem_read_popup.appendChild(elem_content);
        elem_box_ifplugin.appendChild(elem_read_popup);
        document.body.appendChild(elem_box_ifplugin);
    }
    function updateDomElement(title,content){
        var elem_content = document.querySelector("#box-ifplugin .content");
        elem_content.innerHTML = content;
    };
    setTimeout(function(){
        document.querySelector("#box-ifplugin .read-popup").style.left="0";
        elem_box.style.opacity=1;
        window.scrollTo(0,0);
    },1);
    function hidePageContent(){
        var neirong = document.querySelector(".book_neirong");
        if(neirong){
            neirong.style.display="none";
        }
    }
    function showPageContent(){
        var neirong = document.querySelector(".book_neirong");
        if(neirong){
            neirong.style.display="block";
        }
    }
    hidePageContent();
    function close(){
        elem_box.style.display="none";
        document.body.style.height = "auto";
        showPageContent();
        // TODO temprary mesure, this line is to be removed
        elem_box.remove();
        window.scrollTo(0,currentScrollLocation);
    }
}
