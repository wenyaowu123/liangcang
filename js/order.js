$.ajax({
    "url":"http://h6.duchengjiu.top/shop/api_order.php?token="+localStorage.token,
    "type":"GET",
    "dataType":"json",
    "success":function(response){
        console.log(response);
        if(response.code === 0){
            var htmlData = '';
            for(var i=0;i<response.data.length;i++) {
                var obj = response.data[i];

                htmlData += '<div class="order-item">';
                htmlData += '<div class="order-item-header">订单号：' + obj.order_id + '</div>';


                for (var j = 0; j < obj.goods_list.length; j++) {
                    var goods = obj.goods_list[j];
                    goods.subtotal = goods.goods_price * goods.goods_number;


                    htmlData += '<div data-id='
                        + goods.goods_id
                        + '><img src="'
                        + goods.goods_thumb
                        + '"/>商品名称：'
                        + goods.goods_name
                        + '商品金额：'
                        + goods.subtotal
                        + '</div>';
                }
                htmlData+='</div>';
            }
            $("#order-list").html(htmlData);
        }
    }
})