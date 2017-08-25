$(function(){
    var str=location.search.substr(1);
    var goodsId = str.split("=");
    console.log(goodsId[1]);


    $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_goods.php",
        "type":"GET",
        "data":{
            "goods_id":goodsId[1]

        },


        "dataType":"json",
        "success":function(response){
            var obj=response;
            console.log(obj);
            $("#box").html('<li><img src="' +obj.data[0].goods_thumb+ '" /><p>' +obj.data[0].goods_name+ '</p><p>' +obj.data[0].goods_desc+ '</p><p class="price">' +obj.data[0].price+ '</p></li>')
        }


    })

    $("#btn").click(function(){
        var strNew=$("#str").val();
        console.log(strNew);

        $.ajax({
            "url":"http://h6.duchengjiu.top/shop/api_goods.php",
            "type":"GET",
            "data":{
                "search_text":strNew
            },
            "dataType":"json",
            "success":function(response){
                var obj=response;
                console.log(obj);
                $("#box").html('<li><img src="' +obj.data[0].goods_thumb+ '" /><p>' +obj.data[0].goods_name+ '</p><p>' +obj.data[0].goods_desc+ '</p><p class="price">' +obj.data[0].price+ '</p></li>')
            }
        })

    })

    $("#cart").click(function(){
         if(!localStorage.getItem("token")){
             alert("请登录后使用购物车!");
             location.href="login.html";
             return;
         }
         console.log(goodsId[1]);

         var goods_number=localStorage.getItem("cart"+goodsId[1]);

         goods_number=goods_number?parseInt(goods_number)+1:1;

        $.ajax({
            "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+ localStorage.token,
            "type":"POST",
            "data":{
                "goods_id":goodsId[1],
                "number":goods_number
            },
            "dataType":"json",
            "success":function (response) {
                console.log(response);

                localStorage.setItem("cart"+goodsId[1],goods_number);
                location.href="cart.html";
            }
        })
    })


})