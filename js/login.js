if(localStorage.getItem("token")){
    $("body").html(localStorage.getItem("username")+"您已经登录成功！请不要重复登录");

    setTimeout(function () {
        location.href="index.html";
    },2000);

}

$(function(){
    $("#login").click(function () {
        var username=$('input[name="username"]').val();
        var password=$('input[name="password"]').val();

        console.log(username,password);

        $.ajax({
            "url":"http://h6.duchengjiu.top/shop/api_user.php",
            "type":"POST",
            "data":{
                "status":"login",
                "username":username,
                "password":password
            },
            "dataType":"json",
            "success":function(response){
                console.log(response);

                if(response.code === 0){
                    var data=response.data;
                    for(prop in data){
                        if(data.hasOwnProperty(prop)){
                            localStorage.setItem(prop,data[prop]);
                        }

                    }
                    alert(response.message);
                    location.href="index.html";
                }
            }

        })

    })

})