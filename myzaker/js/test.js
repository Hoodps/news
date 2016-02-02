var $body = $('body'),
    $blackcover = $('.blackcover'),
    $content_wrapper = $('#content_wrapper'),
    $window = $(window),
    $user_account_info = $('.user-account-info'),
    $manage_list = $('.manage-list'),
    $wrapper = $('#wrapper'),
    $weibo_login_button = $('#weibo_login'),
    tag2 = $body.find('.tag-container .tag2'),
    triangle = $body.find('.tag-container .triangle-down'),
    $count_like_area = $('.count-like-area'),
    $nav_iphone = $('#nav_iphone'),
    $nav_android = $('#nav_android'),
    $nav_ipad = $('#nav_ipad'),
    $footer = $('footer'),
    tag_area = $('.tag-area'),
    $back_to_top = $('.back-to-top'),
    $hot_list = $('.hot'),
    $activity_flag = $('.activity-flag'),
    $app_ad = $('.app-ad'),
    $first_platform_selection = $('#first_platform_selection'),
    $second_platform_selection = $('#second_platform_selection'),
    $third_platform_selection = $('#third_platform_selection'),
    $unregistered = $('.unregistered'),
    current_url = document.URL,
    structured_url_host = location.protocol + '//' + location.host,
    structured_url_path = location.protocol + '//' + location.host + location.pathname,
    source = "direct",
    url_search_value = window.location.search,
    clientWidth = document.documentElement.clientWidth || document.body.clientWidth,
    device,
    platform,
    store,
    event_info,
    article_title,
    page;
var weekInMs = 1000 * 60 * 60 * 24 * 7;
var expireDate = new Date(new Date().getTime() + weekInMs);
var regex_360 = /mso_app/i,
    regex_smartisan = /utm_source=smartisan&utm_medium=browser&utm_campaign=referral/i;
var stored_search_value = sessionStorage.search_value;
var ua = navigator.userAgent.toLowerCase();
var os = function() {
  var is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua),
      is_ios = /iPod|iPhone|iPad/i.test(ua),
      is_android = /Android/i.test(ua),
      is_chrome = /Chrome/i.test(ua),
      is_safari = /Safari/i.test(ua),
      is_firefox = /Firefox/i.test(ua),
      is_ipad = /iPad/i.test(ua),
      is_tablet = /iPad/i.test(ua) || (is_firefox && /Tablet/i.test(ua)),
      is_iphone = /iPhone/i.test(ua) && !is_tablet,
      is_opera = /Opera Mini/i.test(ua),
      is_vivo = /vivo/i.test(ua),
      is_uc = /UCWEB|UCBrowser/i.test(ua),
      is_weixin = /MicroMessenger/i.test(ua);
      return {
        is_mobile: is_mobile,
        is_ios: is_ios,
        is_android: is_android,
        is_chrome: is_chrome,
        is_safari: is_safari,
        is_firefox: is_firefox,
        is_ipad: is_ipad,
        is_tablet: is_tablet,
        is_iphone: is_iphone,
        is_opera: is_opera,
        is_uc: is_uc,
        is_vivo: is_vivo,
        is_weixin: is_weixin
      };
}();

if (url_search_value.length > 0) {
    source = url_search_value;
}

if (stored_search_value != undefined) {
    $('.default-search').val(stored_search_value);
}


// Web 版搜索保留搜索结果
$body.on('submit', '#web_search', function(argument) {
    sessionStorage.search_value = $('.default-search').val();
});


// [Global] 在这里定义jiathis_config;
var uid = 2047531,
    google_analytics_link = encodeURIComponent("&utm_campaign=referral&utm_medium=share_tool"),
    jiathis_link_head = "http://www.jiathis.com/send/";

// 判断 chrome 浏览器
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;


// 判断微信浏览器

function is_weixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

// 判断是否是微信的粉丝
var regx_weixin = /utm_source=weixin.*&utm_medium=weixin/i;

function is_weixin_follower() {
    if (regx_weixin.test(url_search_value)) {
        return true;
    } else {
        return false;
    }
}

// 判断是否是知乎日报的粉丝
var regx_zhihu = /utm_source=zhihu.*&utm_medium=dailydown/i;

function is_zhihu_follower() {
    if (regx_zhihu.test(url_search_value)) {
        return true;
    } else {
        return false;
    }
}

// 检测设备系统

function detect_mobile_platform() {

    if (navigator.userAgent.match(/iPhone/i)) {
        return 'iPhone';
    } else if (navigator.userAgent.match(/iPod/i)) {
        return 'iPod';
    } else if (navigator.userAgent.match(/iPad/i)) {
        return 'iPad';
    } else if (navigator.userAgent.match(/Android/i)) {
        return 'Android';
    } else if (navigator.userAgent.match(/webOS/i)) {
        return 'webOS';
    } else if (navigator.userAgent.match(/Windows Phone/i)) {
        return 'WindowsPhone';
    } else {
        return 'Others'
    }

}
platform = detect_mobile_platform();


// 检测设备是否支持 touch

function is_touch_device() {
    return 'ontouchstart' in window // works on most browsers
        || 'onmsgesturechange' in window; // works on ie10
};

// 判断是否是手机

function mobilecheck() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    }
}


// 事件统计的一些变量整合

if (mobilecheck()) {
    device = "Mobile"
} else {
    device = "Web"
}



$(document).ready(function() {

    if (clientWidth > 800) {
        // 为 Web 版的导航条做判断
        if (url_search_value.indexOf('platform=1') > 0 || url_search_value.indexOf('platform') < 0) {
            $first_platform_selection.addClass('active');
        } else if (url_search_value.indexOf('platform=2') > 0) {
            $second_platform_selection.addClass('active');
        } else if (url_search_value.indexOf('platform=3') > 0) {
            $third_platform_selection.addClass('active');
        }
        // 如果是个人信息页面，平台信息则不标亮
        if (current_url.indexOf('personal_info') > 0) {
            $first_platform_selection.removeClass('active');
        }
        // 如果是社区，则先不显示 ipad 平台
        if (current_url.indexOf('community/app') > 0) {
            $third_platform_selection.hide();
        }
    } else {
        // 手机端标量「每日最美」和「发现应用」
        if (current_url.indexOf('community/app') > 0) {
            $('.discovery-title').addClass('active');
        } else {
            $('.daily-title').addClass('active');
        }

        // 手机端标量下拉列表
        if (url_search_value.indexOf('platform=1') > 0 || url_search_value.indexOf('platform') < 0) {
            $('.mobile-nav-list-item.active').parent().find('.iphone').addClass('active');
        } else if (url_search_value.indexOf('platform=2') > 0) {
            $('.mobile-nav-list-item.active').parent().find('.android').addClass('active');
        } else if (url_search_value.indexOf('platform=3') > 0) {
            $('.mobile-nav-list-item.active').parent().find('.ipad').addClass('active');
        }
    }


    if (clientWidth > 800) {
        // 如果是社区，则先不显示 ipad 平台
        if (current_url.indexOf('community/app') > 0) {
            $third_platform_selection.hide();
        }
        // 统计用户点击网站右上角个人信息相关的 action
        $('#user_center').on('click', function() {
            event_tracker('UserManageUsercenter', source, article_title);
        });
        $('#user_edit').on('click', function() {
            event_tracker('UserManageEdit', source, article_title);
        });
        $('#logout').on('click', function() {
            event_tracker('UserManageLogout', source, article_title);
        });
    }


    // For Android App
    if (window.Android && Android.loadNativeJs) {
        // Android.loadNativeJs();
        loadNativeJs();
    }


    // [Web] 当滚动的时候固定 Tag 区域, 显示和隐藏「回到顶部」按钮
    if (clientWidth > 800 && $('.tag-area').length > 0) {
        // var tag_area = $('.tag-area');
        // var tagTop = tag_area.offset().top;
        window.onscroll = function() {
            var bodyTop = document.body.scrollTop || document.documentElement.scrollTop; //document.documentElement.scrollTop是因为 IE,Firefox 下 bodyTop 一直为0

            // if (tag_area) {
            //   var tag_height = tag_area.height();
            //   tag2.hide('fast');
            //   triangle.removeClass('triangle-position');
            //   if (bodyTop > tagTop) {
            //     tag_area.addClass('fixed header-shadow');
            //     $content_wrapper.css('top', tag_height);
            //     $activity_flag.addClass('fixed-flag');
            //   } else {
            //     tag_area.removeClass('fixed header-shadow');
            //     $content_wrapper.css('top', '0px');
            //     $activity_flag.removeClass('fixed-flag');
            //   }
            // }


            // 当页面滚到 1500px 以下的时候，回到顶部的按钮出现
            if (bodyTop > 1500) {
                $back_to_top.fadeIn();
            } else {
                $back_to_top.fadeOut();
            }
        };

        // [Web][分享工具栏]点微信分享，显示提示动画
        $follow_zuimei_weixin_img.attr('src', 'http://static.zuimeia.com/product/img/zuimei_qr_poster.jpg');
        $('.add-zuimei-card').addClass('active-web-zuimei-qr');
        // [分享工具栏]点微信分享，显示提示动画[出现]
        $('.share_button_weixin,.share_button_pengyouquan,.share_button_guanzhu').on('click', function() {
            $follow_zuimei_weixin.removeClass('fadein fadeout').addClass('fadein');
            $('.add-zuimei-card').removeClass('slideDownAds slideUpAds').addClass('slideDownAds');
            $body.addClass('_view_for_web');
        });
        // [分享工具栏]点微信分享，显示提示动画[消失]
        $follow_zuimei_weixin.on('click', function() {
            $follow_zuimei_weixin.removeClass('fadein fadeout').addClass('fadeout');
            $('.add-zuimei-card').removeClass('slideDownAds slideUpAds').addClass('slideUpAds');
            $body.removeClass('_view_for_web');
        });
    } // End of window.width>800



    // [Web] 右上角用户信息区域的下拉菜单
    if ($('.login-user-name').length > 0) {
        $user_account_info.addClass('active');
    }

    if ($user_account_info.hasClass('active')) {
        $user_account_info.not($manage_list).on('click', function(e) {
            if ($manage_list.hasClass('active-manage-list')) {
                $manage_list.removeClass('active-manage-list').slideUp();
            } else {
                $manage_list.addClass('active-manage-list').slideDown();
            }
            return false;
        });

        $body.not($manage_list).on('click', function() {
            if ($manage_list.hasClass('active-manage-list')) {
                $manage_list.removeClass('active-manage-list').slideUp();
            }
        });
    }


    // [Mobile] 当小于800px 设备滚屏的时候显示阴影
    // if (clientWidth < 800) {
    //   var $header = $('#site_header');
    //   $window.scroll(function() {
    //     var bodyTop = document.documentElement.scrollTop || document.body.scrollTop;
    //     if (bodyTop > 0) {
    //       $header.css('box-shadow', 'rgba(0, 0, 0, 0.1) 0px 2px 4px 0px');
    //     } else {
    //       $header.css('box-shadow', 'none')
    //     }
    //   });
    // }

}); //End of document ready


// [Mobile] 如果是手机端则在同一个浏览器标签下打开
if (clientWidth < 800) {
    $body.find('a[target="_blank"]').attr('target', '_self');
}


// [Global] 匿名评论后的提示

function overlay(result) {
    if (result == "success") {
        $wrapper.append('<div class="overlay"><button class="overlay-close" data-action="overlay-close">x</button><div class="animation scale-fade overlay-dialog overlay-dialog-alert"><h3 class="overlay-title">Nice!</h3><div class="overlay-content">您的评论已经成功发送给小美!</div><div class="overlay-actions"><button class="button-overlay" data-action="overlay-close">确定</button></div></div></div>');
    } else if (result == "fail") {
        $wrapper.append('<div class="overlay"><button class="overlay-close" data-action="overlay-close">x</button><div class="animation scale-fade overlay-dialog overlay-dialog-alert"><h3 class="overlay-title">Sorry！</h3><div class="overlay-content">小美累了，脑袋转不动了……</div><div class="overlay-actions"><button class="button-overlay" data-action="overlay-close"><a class="overlay-button-link" href="http://zuimeia.com/survey/web_feedback.html">去帮帮她吧！</a></button></div></div></div>');
    }
    $body.addClass('block-view');
    $("[data-action|='overlay-close']").click(function() {
        $('.overlay').remove();
        $body.removeClass('block-view');
    });
}

// [Global] 限制数字数量

function count_words(which_input, num_start, num_end, which_tip_area) {
    which_input.keyup(function() {
        var num = which_input.val().length;
        if (num > num_start && num < num_end) {
            which_tip_area.html("已输入" + num + "个字");
            which_tip_area.css('color', '#c7c7c7');
        } else if (num > num_end - 1) {
            which_tip_area.css('color', '#FF634A');
            which_tip_area.html("超出规定字数");
        } else {
            which_tip_area.html("");
        }
    });
}



// [Global] Jiathis Building

function list_build_jiathis_url(web_id_name, utm_source_name, at_official_name, pre_title, pre_summary, period) {

    var jiathis_share_title = "好用、好玩、好看应用的根据地",
        jiathis_share_abstract = "由设计师和发烧友共同参与，每天推荐高品质 %23安卓%23 %23iOS%23 应用。当然还有每天的优质的限免应用，大家快来下载「最美应用」推出的官方客户端吧！",
        jiathis_share_image = "http://static.zuimeia.com/product/img/zuimei_qr_poster.jpg",
        jiathis_webid = "?webid=" + web_id_name,
        google_analytics_info = "?utm_source=" + utm_source_name + google_analytics_link,
        jiathis_title = "&title=" + pre_title + jiathis_share_title + period,
        jiathis_summary = "&summary=" + pre_summary + jiathis_share_abstract + at_official_name,
        jiathi_pic = "&pic=" + jiathis_share_image,
        jiathis_url_building = jiathis_link_head + jiathis_webid + "&url=" + structured_url_path + google_analytics_info + jiathis_title + jiathis_summary + jiathi_pic + "&uid=" + uid;
    // 为了推 App 而做的修改
    // jiathis_url_building = jiathis_link_head + jiathis_webid + "&url=http://zuimeia.com/apps.html" + google_analytics_info + jiathis_title + jiathis_summary + jiathi_pic + "&uid=" + uid;
    return jiathis_url_building;
}

var jiathis_share_title = $('#web-article-header').find('h1').text(),
    jiathis_share_abstract = $('#web-article-header').find('.short-des').text().replace(/(Google\sPlay.*)$/, ""),
    jiathis_share_image = $('.hidden-cover').attr('src');

function detail_build_jiathis_url(web_id_name, utm_source_name, at_official_name, pre_title, pre_summary, period) {
    var total = jiathis_share_title.length + jiathis_share_abstract.length,
        jiathis_back_url,
        download_tip = "",
        overflow_words = total - 100;
    if (overflow_words > 0) {
        jiathis_share_abstract = jiathis_share_abstract.substring(0, 100) + "...";
    }

    var jiathis_webid = "?webid=" + web_id_name,
        google_analytics_info = "?utm_source=" + utm_source_name + google_analytics_link,
        jiathis_title = "&title=" + pre_title + jiathis_share_title + period,
        jiathi_pic = "&pic=" + jiathis_share_image,
        jiathis_back_url = structured_url_path + google_analytics_info;
    var jiathis_summary = "&summary=" + pre_summary + jiathis_share_abstract + at_official_name;

    // 分享的内容后面加上应用下载地址的时候使用以下代码

    // if (web_id_name == "tsina" || web_id_name == "tqq") {
    //   // 分享的内容后面加上应用下载地址的时候使用以下代码
    //   // jiathis_back_url = "http://zuimeia.com/apps.html" + google_analytics_info,
    //   // download_tip = " |「最美应用」官方客户端下载地址：";
    //   // var jiathis_summary = "&summary=" + pre_summary + jiathis_share_abstract + structured_url_path + google_analytics_info + at_official_name + download_tip;
    // } else if (web_id_name == "douban" || web_id_name == "renren") {
    //   // 分享的内容后面加上应用下载地址的时候使用以下代码
    //   // download_tip = " 「最美应用」官方客户端下载地址：http://zuimeia.com/apps.html";
    //   // var jiathis_summary = "&summary=" + pre_summary + jiathis_share_abstract + at_official_name + download_tip;
    // } else if (web_id_name == "qzone") {
    //   // 分享的内容后面加上应用下载地址的时候使用以下代码
    //   // download_tip = "「最美应用」推出官方客户端了，美友们快来下来吧！";
    //   // var jiathis_summary = "&summary=" + pre_summary + jiathis_share_abstract + at_official_name + download_tip;
    // } else {
    //   // 分享的内容后面加上应用下载地址的时候使用以下代码
    //   // download_tip = "";
    //   // var jiathis_summary = "&summary=" + pre_summary + jiathis_share_abstract + structured_url_path + google_analytics_info + at_official_name + download_tip;
    // }

    jiathis_url_building = jiathis_link_head + jiathis_webid + "&url=" + jiathis_back_url + jiathis_title + jiathis_summary + jiathi_pic + "&uid=" + uid;

    return jiathis_url_building;
}

// 微信的分享提示动画功能
var $share_button_weixin = $('.share_button_weixin'),
    $follow_zuimei_weixin = $('.follow-zuimei-weixin'),
    $follow_zuimei_weixin_img = $('.follow-zuimei-weixin-img');

function show_weixin_ad_animation() {
    $follow_zuimei_weixin.removeClass('fadein fadeout').addClass('fadein');
    $('.add-zuimei-card').removeClass('slideDownAds slideUpAds').addClass('slideDownAds');
    $body.addClass('_view');
}

function hide_weixin_ad_animation() {
    $follow_zuimei_weixin.bind('touchstart', function() {
        $follow_zuimei_weixin.removeClass('fadein fadeout').addClass('fadeout');
        $('.add-zuimei-card').removeClass('slideDownAds slideUpAds').addClass('slideUpAds');
        $body.removeClass('_view');
        return false
    });
}
if (is_weixin()) {
    // 最美微信的分享提示动画[出现]
    $('.share_button_weixin,.share_button_pengyouquan,.share_button_guanzhu').on('click', function() {
        show_weixin_ad_animation;
    });
    // 最美微信的分享提示动画[消失]
    hide_weixin_ad_animation();
}


// [Global] 检测邮箱的正则

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// [Global] 检测表单内容

function check_on_blur(which_input, which_tip_area, tip_words) {
    which_input.on("blur", function() {
        if (which_input.val() == '') {
            which_tip_area.html(tip_words);
        } else {
            which_tip_area.html('');
        }
    });
}



// [Global] 如果搜索表单中的内容为空，则不能够提交

function check_form_value(form) {
    form.on('submit', function(e) {
        if ($(this).find('input[name="keyword"]').val() == '') {
            e.preventDefault();
        }
    });
}

// [GA 事件统计]

function event_tracker(name, source, article_title) {
    event_info = name + '-' + device + '-' + platform;
    ga('send', 'event', event_info, source, article_title);
}

// 针对不同的手机平台，显示不同的广告语
// if (clientWidth < 800) {

//   /*  Banner 横幅显示规则：
//     1.zhihu/dailydown;
//       weixin/weixin;
//       weixin_quan/androidapp_share_tool;
//       weixin_quan/iosapp_share_tool;
//       direct/(none);
//     以上情况使用『最靠谱的应用推荐平台最美应用』
//     2.zhihu/daily 使用『最美应用官方客户端上线了！』
//     3.其他来源使用『微信关注“最美应用”<br>获取更多高品质应用』
//   */
//   // if (url_search_value.indexOf('utm_source=zhihu&utm_campaign=referral&utm_medium=dailydown') > 0 ||
//   //   url_search_value.indexOf('utm_source=weixin&utm_campaign=referral&utm_medium=weixin') > 0 ||
//   //   url_search_value.indexOf('utm_source=weixin_quan&utm_campaign=referral&utm_medium=android_app_share_tool') > 0 ||
//   //   url_search_value.indexOf('utm_source=weixin_quan&utm_campaign=referral&utm_medium=iosapp_share_tool') > 0 ||
//   //   url_search_value.indexOf('utm_source') < 0) {
//   //   $content_wrapper.prepend('<div class="mobile-head-ad"><a id="iphone-mobile-ad-banner" class="mobile-ad-banner-wrapper" href="http://zuimeia.com/apps.html"><div class="mobile-ad-banner-icon"></div><div class="mobile-ad-banner-des"><span class="ad-main-word">最靠谱的应用推荐平台最美应用</span><span class="ad-subtitle">点击立刻获取>>></span></div></a></div>');
//   //   // 如果是来知乎日报链接则不做修改，用原来的「下载最美应用」的话
//   // } else if (url_search_value.indexOf('utm_source=zhihu&utm_campaign=referral&utm_medium=daily') > 0) {
//   //   $content_wrapper.prepend('<div class="mobile-head-ad"><a id="iphone-mobile-ad-banner" class="mobile-ad-banner-wrapper" href="http://zuimeia.com/apps.html"><div class="mobile-ad-banner-icon"></div><div class="mobile-ad-banner-des"><span class="ad-main-word">最美应用官方客户端上线了！</span><span class="ad-subtitle">马上去下载>>></span></div></a></div>');
//   // } else {
//   //   // 其他则关注最美应用微信公众账号
//   //   $content_wrapper.prepend('<div class="mobile-head-ad">微信关注 " 最美应用 "<br>获取更多高品质应用</div>');
//   // }


// }


// 没有加载成功的图片进行替换
// $('img').error(function(){
//     $(this).attr('src', 'http://static.zuimeia.com/product/img/defaultpicture.gif');
// });

// 手机端广告条
function mobile_banner_interaction(article_title) {

    if (clientWidth < 800) {
        if (document.cookie.search('close-ad=1') == -1 && !regex_360.test(navigator.userAgent) && !regex_smartisan.test(url_search_value)) {
            // 设置 cookie 为一周
            var weekInMs = 1000 * 60 * 60 * 24 * 7;
            var expireDate = new Date(new Date().getTime() + weekInMs);

            var weixin_prepend_link = 'http://mp.weixin.qq.com/mp/redirect?url=';

            $app_ad.show();
            $footer.css('margin', '10px 0 80px');
            if (current_url.indexOf('utm_source=nicelocker_news') > -1) {
                $('.close-ad').hide();
            }
            $('.close-ad').on('touchend', function() {
                event_tracker('CloseNewTopBanner', source, article_title);
                $footer.css('margin', '10px 0 0 0');
                $app_ad.hide();
                $('#site_header').css('top', '0');
                $('#content_wrapper').css('margin-top', '44px');
                document.cookie = 'close-ad=1; expires=' + expireDate + '; path=/';
                return false;
            });

            // if (platform == 'iPhone' || platform == 'iPod' || platform == 'iPad') {
                $('.app-ad-view,.app-ad-name').on('click', function() {
                    event_tracker('MobileTopBannerZUIApp', source, article_title);
                    document.cookie = 'close-ad=1; expires=' + expireDate + '; path=/';
                });
            // } else {
                // $('.app-ad-view,.app-ad-name').on('click', function() {
                //     event_tracker('MobileTopBannerZUIApp', source, article_title);
                //     document.cookie = 'close-ad=1; expires=' + expireDate + '; path=/';
                // });
            // }
        }

    }

}

function login_alert() {
    var weibo_login_link = structured_url_host + "/weibo/login?next_url=" + current_url;
    var qq_login_link = structured_url_host + "/qq/login?next_url=" + current_url;
    // $('.viewblock').prepend('<div class="blackcover animation"></div><div class="center-fixed main-login-alert"><div id="main-login-alert-wrapper"><img src="http://static.zuimeia.com/product/img/login_logo@2x.png" alt="" class="main-login-alert-logo"><div class="main-login-alert-form-wrapper"><form action="/" method="post"><span style="display:none">{% csrf_token %}</span><p><input type="text" class="main-login-alert-default-input main-login-alert-email" name="username" placeholder="邮箱"></p><p><input type="password" class="main-login-alert-default-input main-login-alert-password" name="password" placeholder="密码"><input type="hidden" name="next_url" value="{{ next_url }}"></p><button class="main-login-alert-button-login">登 录</button></form></div><div class="main-login-alert-social-login-area"><p class="main-login-alert-social-tip">使用社交账户登录</p><div class="main-login-alert-social-login-button"><a href="/weibo/login?next_url={{ next_url }}" id="main-login-alert-sina"><img src="http://static.zuimeia.com/product/img/icon_sina_normal@2x.png" alt=""></a><a href="/qq/login?next_url={{ next_url }}" id="main-login-alert-qq"><img src="http://static.zuimeia.com/product/img/icon_qq_normal@2x.png" alt=""></a></div></div></div><div class="main-login-alert-wrapper-tip animation infinite main-login-alert-moves">「最美应用」尚未开放注册，您可以选择微博或者 QQ 进行登录</div></div>');
    $('.viewblock').prepend('<div class="blackcover animation fadein"></div><ul class="center-fixed third-party-login-list"><li class="third-party-login-tip">做好事怎么能不留名呢？快快报上名来！</li><li><a href="' + weibo_login_link + '" class="sina third-party-login-list-item sina-alert-login">新浪微博登录</a></li><li><a href="' + qq_login_link + '" class="qq third-party-login-list-item qq-alert-login">QQ 账号登录</a></li></ul>');
    $body.addClass('_view'); //when menu slidein overflow all the others.
    if (is_touch_device()) {
        eventName = "touchstart";
    } else {
        eventName = "click";
    }
    $('.blackcover').bind(eventName, function() {
        $body.removeClass('_view');
        // $('.main-login-alert,.blackcover').remove();
        $('.third-party-login-list,.blackcover').remove();
        return false;
    });
    $('.qq-alert-login').on('click', function() {
        event_tracker('AlertLoginQQ', source, article_title);
    });
    $('.sina-alert-login').on('click', function() {
        event_tracker('AlertLoginSina', source, article_title);
    });
}

// 点击加入我们
$('#nav_join_us').on('click', function() {
    event_tracker('NavJoinUs', source, article_title);
});

// 点击侧边栏下载

$('#rightside_download_zuimei').on('click', function() {
    event_tracker('RightsideDownloadZuimei', source, article_title);
});

// 侧边栏体验之美
$('#rightside_tiyanzhimei').on('click', function() {
    event_tracker('RightsideTiyanzhimei', source, article_title);
});



if (clientWidth > 800) {
    // 关闭广告
    if ($('.fixed-ad').length > 0) {
        $('.close-fixed-ad').on('click', function() {
            $('.fixed-ad').slideUp();
            event_tracker('Hongma', source, article_title);
        });
    }
}

// Tag  加上 GA
$('.web-tag-list').on('click', function(argument) {
    event_tracker('WebRightsideTag', source, article_title);
});

$body.on('click', '.activity-poster', function(e) {
    var name = $(this).attr('name');
    ga('send', 'event', 'Click-RightSide-Poster', source, name);
});



