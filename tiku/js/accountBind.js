
var isLogin = false,
    bindEmail = false,
    bindPhone = false;
$(function() {
    var bindKey = "bindTip",
        u = m;

    if (page_Login != "undefined") {
        isLogin = page_Login;
    }

    if (page_bindEmail != "undefined") {
        bindEmail = page_bindEmail;
    }

    if (page_bindPhone != "undefined") {
        bindPhone = page_bindPhone;
    }

    if (isLogin && (!bindPhone || !bindEmail)) {
        var bind = localStorage.getItem(bindKey);
        if (bind == null) {
            dialogBind();
        }
    }

    u.on("click", "#bind-notips", function () {
        localStorage.setItem(bindKey, 0);
        $(".bgblcok").remove();
        $(".popbox").remove();
    })
    .on("click", "#bind-cannel", function () {
        $(".bgblcok").hide();
        $(".popbox").hide();
    });
});

function css() {
    var style = '<style>';
    style += '.bgblcok{ width:100%; height:100%;background:#000; opacity:0.6; position:absolute;left:0; top:0;z-index:9998; }';
    style += '.popbox{ width:280px; margin:0 auto;background:#fff; /*background: rgba(0,0,0,.3);*/border-radius:5px; position:fixed; left:50%;margin-left:-140px; z-index:9999; }';
    style+='.popbox table{ margin:20px 0}';
    style += '.popbox b.r-ico{ display:block;background:url("http://img2.233.com/m/passport/v2/img/log-bg-color.png") no-repeat; background-size:80px auto; height:60px;}';
    style+='.popbox b.r-ico.phone{ background-position:15px -120px; width:74px;}';
    style+='.popbox b.r-ico.emial{ background-position:15px -180px; width:74px;}';
    style+='.popbox a{ display:block; text-align:center; font-size:1.6rem; line-height:44px; }';
    style+='.popbox a.b-b-rline{ margin-top:-20px;border-bottom:1px solid #e3e3e3; }';
    style+='.popbox .bottom-button{ width:100%; height:44px; background:#f4f4f4; border-top:1px solid #e3e3e3;border-radius:0 0 5px 5px;}';
    style+='.popbox .bottom-button a{ width:100%; line-height:44px; text-align:center; font-size:1.6rem; box-sizing:border-box; display:inline-block;color:#999; border-right:1px solid #e3e3e3;}';
    style += '</style>';
    return style;
}

function dialogBind() {
    var html = css();
    html+="<div class=\"bgblcok\"></div>";
    html+="<div class=\"popbox\" style=\"top:30%;\">";
    html+="      <table border=\"0\" cellpadding=\"1\" width=\"100%\">";
    html+="            <tr>";
    html+="                  <td align=\"center\" ><b class=\"r-ico emial\"></b></td>";
    html+="                  <td  align=\"center\"><b class=\"r-ico phone\"></b></td>";
    html+="            </tr>";
    html+="            <tr>";
    html += "                  <td align=\"center\"><font class=\"font14\"><a href='" + page_domain + "/account/setting/bindmobile'>绑定邮箱</a></font><font class=\"font12\"></font></td>";
    html += "                  <td align=\"center\"><font class=\"font14\"><a href='"+ page_domain +"/account/setting/bindemail'>绑定手机</a></font></td>";
    html+="            </tr>";
    html+="            <tr>";
    html+="                  <td colspan=\"2\" align=\"center\" height=\"20\"><font class=\"grey-color\"><br/>";
    html+="                        绑定后可通过手机号码和邮箱账号登陆！</font></td>";
    html+="            </tr>";
    html+="      </table>";
    html+="      <div class=\"bottom-button\"><a href=\"javascript:void(0)\" id=\"bind-notips\">不再提示</a></div>";
    html += "</div>";
    $("body").append(html);
}
