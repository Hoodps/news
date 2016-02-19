var areaConfig = {
    //http://iplocation.geo.qiyi.com/cityjson
    areaId: -1,
    areaJson: [
        { name: '北京', id: '1' },
        { name: '天津', id: '3' },
        { name: '上海', id: '2' },
        { name: '河北', id: '4' },
        { name: '湖南', id: '731' },
        { name: '甘肃', id: '93' },
        { name: '江苏', id: '7' },
        { name: '浙江', id: '8' },
        { name: '山东', id: '9' },
        { name: '江西', id: '10' },
        { name: '安徽', id: '11' },
        { name: '广西', id: '12' },
        { name: '海南', id: '13' },
        { name: '辽宁', id: '14' },
        { name: '吉林', id: '15' },
        { name: '黑龙江', id: '16' },
        { name: '山西', id: '17' },
        { name: '福建', id: '18' },
        { name: '河南', id: '19' },
        { name: '广东', id: '20' },
        { name: '湖北', id: '21' },
        { name: '四川', id: '22' },
        { name: '重庆', id: '23' },
        { name: '云南', id: '24' },
        { name: '贵州', id: '25' },
        { name: '新疆', id: '26' },
        { name: '陕西', id: '27' },
        { name: '青海', id: '28' },
        { name: '宁夏', id: '29' },
        { name: '西藏', id: '30' },
        { name: '内蒙古', id: '31' },
        { name: '全国', id: '32' },
        { name: '香港', id: '33' },
        { name: '澳门', id: '34' },
        { name: '台湾', id: '35' }
    ]
}

$(function () {
    var arr, reg = new RegExp("(^| )areaId=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        areaConfig.areaId = unescape(arr[2]);
    else
        areaConfig.areaId = -1;
    //alert(areaConfig.areaId);
    if (areaConfig.areaId == -1) {//未选择地区
        $.ajax({
            type: "get",
            url: "http://iplocation.geo.qiyi.com/cityjson",
            dataType: "jsonp",
            success: function (data) {

                $.each(areaConfig.areaJson, function (i, item) {
                    if (item.name.indexOf(data.data.province) > -1) {
                        areaConfig.areaId = item.id;

                        var exp = new Date();
                        exp.setTime(exp.getTime() + 365 * 24 * 60 * 60 * 1000);
                        document.cookie = "areaId=" + escape(areaConfig.areaId) + ";expires=" + exp.toGMTString();
                        if ($(".diqu")) {
                            $(".diqu").html("<i></i>" + data.data.province);//显示省份名称
                        }
                        return;
                    }
                });


            },
            error: function () {

            }
        });
    }
});
