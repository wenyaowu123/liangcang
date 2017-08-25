$(function(){
    var address_id=0;
    addressAjax();
    function addressAjax(){
        $.ajax({
            "url": "http://h6.duchengjiu.top/shop/api_useraddress.php?token=" + localStorage.token,
            "type":"GET",
            "dataType":"json",
            "success":function(response){
                console.log(response);

            var htmlData="";
            for(var i=0;i<response.data.length;i++){
                var obj=response.data[i];
                htmlData+='<li class="address-item" data-id="' +obj.address_id+ '">收货人：'
                    +obj.address_name
                    +'  省份：'+obj.province
                    +'  市：'+obj.city
                    +'  地区：'+obj.district
                    +'  街道：'+obj.address
                    +'  手机号：'+obj.mobile
                    +'<span class="remove">删除地址</span></li>';

            }
            $(".addess-ul").html(htmlData);

                $(".address-item").click(function(event){
                    $(this).addClass("active").siblings().removeClass("active");

                    if(event.target){
                        address_id=event.target.getAttribute('data-id');
                    }
                })

                $(".remove").click(function(){
                    var removeLi=this.parentNode;

                    removeLi.parentNode.removeChild(removeLi);
                    removeAjax(removeLi);

                })

            }
        })
    }

    var str=location.search.substr(1);
    var sum=str.split("=");

    $("#sum").html("<span>当前订单的总金额是￥"+sum[1]+"</span>")

    $(".newAddress").click(function(){
        $("#add").show();
    })
    $(".close").click(function(){
        $("#add").hide();
    })

    $("#btn1").click(function(){
        var data=$("form").serialize();
        console.log(data);

        $.ajax({
            "url":"http://h6.duchengjiu.top/shop/api_useraddress.php?token=" + localStorage.token + "&status=add",
            "type":"POST",
            "dataType":"json",
            "data":data,
            "success":function(response){
                if(response.code === 0){
                    console.log(response);
                    $("#add").hide();
                    addressAjax();
                }
            }
        });
    })

    $("#order").click(function(){
        if(address_id ===0){
            alert("请选择收货地址后下单!");
            return;
        }

      $.ajax({
          "url":"http://h6.duchengjiu.top/shop/api_order.php?token="+localStorage.token+"&status=add",
          "type":"POST",
          "dataType":"json",
          "data":{
              "address_id":address_id,
              "total_prices":sum[1]
          },
          "success":function(response){
              console.log(response);
              if(response.code === 0){
                  alert("提交订单成功");
                  location.href="order.html";
              }

            }
        })
    })

    function removeAjax(obj){
        var address_id=$(obj).attr("data-id");

        $.ajax({
            "url":"http://h6.duchengjiu.top/shop/api_useraddress.php?token=" + localStorage.token + "&status=delete&address_id="+address_id,
            "type":"GET",
            "dataType":"json",
            "success":function(response){
                console.log(response);
            }
        })

    }


})