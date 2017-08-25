var page=1;
function showShop(page){
    $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_goods.php?page="+page+"&pagesize=20",
        "type":"GET",
        "dataType":"json",
        "success":function(response){
            console.log(response);

            for(var j=0;j<response.page.page_count;j++){
                $("#ButtonCenter").append($('<span>'+(j+1)+'</span>'));
            }

            var obj=response;
            for(var i=0;i<obj.data.length;i++){
                $("#shop").append('<li><img src="' +obj.data[i].goods_thumb+ '" /><p><a href="detail.html?goods_id=' + obj.data[i].goods_id + '">' +obj.data[i].goods_name+ '</a></p><p>' +obj.data[i].goods_desc+ '</p><p class="price">' +obj.data[i].price+ '</p></li>');

            }
        }
    })
}
showShop(page);

$("#ButtonPrev").click(function(){
    page--;
    if(page<=1)page=1;
    $("#shop").html('');
    showShop(page);
    ButtonCenter.style.marginLeft=(page-1)*-52+"px";
})

$("#ButtonNext").click(function(){
    page++;
    $("#shop").html('');
    showShop(page);
    ButtonCenter.style.marginLeft=(page-1)*-52+"px";
})

$("ButtonCenter").click(function(event){
    event=event||window.event;
    var target=event.target||event.srcElement;
    if(target.nodeName === "SPAN"){
        page=target.innerText;
        $("#shop").html('');
        ButtonCenter.style.marginLeft=(page-1)*-52+"px";
        showShop(page);
    }
})