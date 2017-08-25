if( localStorage.getItem("token")){
    $(".login").html("用户名是： "+localStorage.getItem("username"));
}

$(function(){

$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(data){
   var obj=data;

   for(var i=0;i<obj.data.length;i++){

       $("#nav").append('<li><a href="list.html?cat_id=' +obj.data[i].cat_id+ '">' + obj.data[i].cat_name +  '</a></li>');
   }
})

$.get("http://h6.duchengjiu.top/shop/api_goods.php",function(data){

    var obj=data;

    for(var i=0;i<obj.data.length;i++){

        $("#goodsUl").append('<li><img src="' +obj.data[i].goods_thumb+ '" /><p><a href=detail.html?goods_id='+obj.data[i].goods_id+'>' +obj.data[i].goods_name+ '</a></p><p>' +obj.data[i].goods_desc+ '</p><p class="price">' +obj.data[i].price+ '</p></li>');
    }
})

$("#btn1").click(function(){
    var search=$("#search").val();

    console.log(search);

    window.location.href = "detail.html?goods_id=" + search;

})

})


var $carousel=$(".carousel");
var $m_unit=$(".m_unit");
var $imageLis=$(".m_unit li");
var $cilclesLis=$(".circles ol li");

$(".m_unit ul").append($imageLis.eq(0).clone());

var idx=0;

var timer=setInterval(rightBtnHandler,2000);

$carousel.mouseenter(function(){
    clearInterval(timer);
});
$carousel.mouseleave(function(){
    timer=setInterval(rightBtnHandler,2000);
});

$(".rightBtn").click(rightBtnHandler);

function rightBtnHandler(){
    if($m_unit.is(":animated")) return;

    idx++;
    $m_unit.animate({"left":-1000*idx},300,function () {
        if(idx>7){
            idx=0;
            $m_unit.css("left",0);
        }
    });
    changeCircle();
}

$(".leftBtn").click(function(){
    if($m_unit.is(":animated")) return;

    idx--;
    if(idx<0){
        idx=7;
        $m_unit.css("left",-8*1000);
    }
    $m_unit.animate({"left":-1000*idx},300);
    changeCircle();
})

$cilclesLis.click(function(){
    idx=$(this).index();
    $m_unit.animate({"left":-1000*idx},300);
    changeCircle();
});

function changeCircle(){
    var n=idx<=7?idx:0;
    $cilclesLis.eq(n).addClass("cur").siblings().removeClass("cur");
}

$(function(){
    $("#self").click(function() {
        $("html,body").animate({scrollTop:0}, 500);
    });
})