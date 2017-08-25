

$("#reg").click(function(){
    var username=$('input[name="username"]').val();
    var password=$('input[name="password"]').val();

    if(password.length<6||password.length>20){
        alert("密码长度为6-20位之间！");
        return;
    }

    $.ajax({
        "type":"POST",
        "url":"http://h6.duchengjiu.top/shop/api_user.php",
        "data":{
            "status":"register",
            "username":username,
            "password":password
        },
        "dataType":"json",
        "success":function(response){
            console.log(response);
            alert(response.message);
            location.href="index.html";
        }
    });
})

$('input[name="username"]').blur(function () {
    var username=$('input[name="username"]').val();
    console.log($(this).val());

    $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_user.php",
        "type":"POST",
        "dataType":"json",
        "data":{
            "status":"check",
            "username":username
        },
        "success":function (response) {
            console.log(response);

            if(response.code ===0){
                $(".success").show();
                $(".error").hide();

            }else if(response.code ===2001){
                $(".error").show();
                $(".success").hide();
            }
        }

    })

})