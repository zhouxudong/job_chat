function login() {

    var loginForm = {};
    var MOBILE = "username";
    var PASSWORD = "password";

    $("#login-form").serializeArray().forEach(function (item) {
        loginForm[item.name] = item.value;
    });
    //检测手机账号
    if(!util.checkMobile(loginForm[MOBILE])){
        $("input[name="+ MOBILE +"]").parent().addClass("error");
        return false;
    }
    //检测密码
    if(!util.checkPassword(loginForm[PASSWORD])){
        $("input[name="+ PASSWORD +"]").parent().addClass("error");
        return false;
    }


    return false;
}
$(".input-const").on("click focus", function (e) {
    $(this).parent().removeClass("error");
})