$(function () {
    $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem("token"),
        "type":"get",
        "dataType":"json",
        "success":function(response){
            console.log(response);
            if(response.data.length>0){
                for(var i=0;i<response.data.length;i++){
                    var obj=response.data[i];

                var html=`<div class="goods">
												<div class="goods-box">
													<input type="checkbox" class="chkbox" />
													<input type="hidden" class="goods_id" value=" ${ obj.goods_id } "/>
													<img src=" ${ obj.goods_thumb } " alt="" />
													<p> ${ obj.goods_name } </p>
												</div>
												<div class="goods-one">${ obj.goods_price }</div>
												<div class="goods-lists">
													<span class="left-button">-</span>
													<input type="text" class="center-text" value="${ obj.goods_number }"/>
													<span class="right-button">+</span>
												</div>
												<div class="goods-sum">${ obj.goods_price * obj.goods_number }</div>
												<div class="goods-op">
													<span>删除</span>
												</div>
											</div>`;

                $("#Shop").html($("#Shop").html()+html);
                }

             $(".goods-op").click(function(){
                 var goods=this.parentNode;
                 updataCart(this,0);
                 $(goods).remove();
             })
                $(".left-button").click(function(){
                    updataCart(this,'-1');
                })
                $(".right-button").click(function(){
                    updataCart(this,'+1');
                })
                $(".center-text").blur(function(){
                    setGoods(this);
                })


            }
        }
    });
})

$("#Delete").click(function(){
    var inputs=$(".goods input:checked");

    for(var i=0;i<inputs.length;i++){
        var goods_id=document.getElementsByClassName("goods_id")[0].value;

        var goodsL=inputs[i].parentNode.parentNode;

        goodsL.parentNode.removeChild(goodsL);
    }

})


function showSum(){
    var goods=document.getElementsByClassName("goods");

    var sum=0;
    var num=0;

    for(var i=0;i<goods.length;i++){
        var objGoods=goods[i];

        if($(objGoods).children("div:first").children("input").is(':checked')){
            sum+=parseInt($(objGoods).children("div:eq(3)").text());
            num+=parseInt($(objGoods).children("div:eq(2)").children("input").val());
        }
    }

    $("#Money").text("￥"+sum);
    $("#Amount").text(num);
}

$("#Shop").click(function(event){
    if(event.target.id === "selectAll"){
        var selected=event.target.checked;

        var checkboxs=document.getElementsByClassName("chkbox");
        for(var i=0;i<checkboxs.length;i++){
            checkboxs[i].checked=selected;
        }
       showSum();
        return;
    }

    if(event.target.type === "checkbox"){
        showSum();
    }

})

function stepSetGoods(obj,event){
    var event=event||window.event;
    event.preventDefault();

    if(event.keyCode===40){
        updataCart(obj,"-1");
    }else if(event.keyCode===38){
        updataCart(obj,"+1");
    }

}

function setGoods(obj){
    var num=parseInt($(obj).val());

    if(num<1||isNan(num)){
        $(obj).val(1)
    }
    if(num>10){
        $(obj).val(10)
    }
    updataCart(obj,$(obj).val());

}

function updataCart(obj,num){
    var Shop=obj.parentNode.parentNode;
    var goods_id=Shop.getElementsByClassName("goods_id")[0].value;
    var goods_number=Shop.getElementsByClassName("center-text")[0];
    var goods_number_value=parseInt(goods_number.value);
    var goods_price=Shop.getElementsByClassName("goods-one")[0];
    var goods_price_value=parseInt(goods_price.innerText);
    var goods_subtotal=Shop.getElementsByClassName("goods-sum")[0];

    if(num=="-1"&&goods_number_value<=1){
        return;
    }
    if(num=="+1"&&goods_number_value>=10){
        return;
    }
    if(num=="-1"){
        goods_number_value--;
    }else if(num==="+1"){
        goods_number_value++;
    }else if(num>0){
        goods_number_value=num;
    }else{
        goods_number_value=0;
    }

    goods_number.value=goods_number_value;
    var subtotal=goods_number_value*goods_price_value;
    console.log(subtotal);
    goods_subtotal.innerText=subtotal;

    showSum();

}

function updataCartAjax(obj,num){
    var goods_id=obj.getElementsByClassName("goods_id")[0].value;
    console.log(goods_id);

    $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
        "type":"POST",
        "data":{
            "goods_id":goods_id,
            "number":num
        },
        "dataType":"json",
        "success":function(response){
            console.log(response);
        }
    })

}

$("#checkout").click(function(){
    var sum=$("#Money").text().substr(1);
    location.href="checkout.html?sum="+sum;
})