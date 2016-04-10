/*!dep/js-md5/src/md5.js*/
define("common/components/checkbox/jquery.checkbox", ["require", "exports", "module"], function() {
    +
        function(c) {
            "use strict";

            function a() {
                c(k).parent().addClass("box_checkbox"), c(k).before("<span></span>");
                c(k).parent().find("span").addClass("checkbox_icon");
                c(k).parent().each(function() {
                    var a = c(this).children(":checkbox").attr("data-text");
                    c(this).children(":checkbox").after(a),
                        c(this).children().hasClass("screenbox") ? c(this).parent().find("span").css({
                        "background-position": "-27px 0",
                        width: "15px"
                    }) : (c(this).parent().find("span").css("background-position", "-13px 3px"), c(this).parent().find("input").attr("checked", "checked"))
                })
            }
            function h(a) {
                return this.each(function() {
                    var h = c(this),
                        k = h.data("lg.checkbox");
                    k || h.data("lg.checkbox", k = new b(this)), "string" == typeof a && k[a].call(h)
                })
            }
            var k = ".checkbox",
                b = function(c) {
                    c.on("click.lg.checkbox", this.checkbox)
                };
            b.prototype.checkbox = function() {
                var a = c(this);
                a.is(":checked") ? a.hasClass("screenbox") ? a.parent().find("span").css({
                    "background-position": "-42px 0",
                    width: "18px"
                }) : a.parent().find("span").css("background-position", "-13px 3px") : a.hasClass("screenbox") ? a.parent().find("span").css({
                    "background-position": "-27px 0",
                    width: "15px"
                }) : a.parent().find("span").css("background-position", "0 3px")
            };
            var g = c.fn.checkbox;
            c.fn.checkbox = h, c.fn.checkbox.Constructor = b, c.fn.checkbox.noConflict = function() {
                return c.fn.checkbox = g, this
            }, a(), c(document).on("click.lg.click", k, b.prototype.checkbox)
        }(jQuery)
}); /*!dep/jquery-placeholder/jquery.placeholder.js*/
;
!
    function(a) {
        "function" == typeof define && define.amd ? define("dep/jquery-placeholder/jquery.placeholder", ["jquery"], a) : a("object" == typeof module && module.exports ? require("jquery") : jQuery)
    }(function(a) {
        function c(c) {
            var h = {},
                v = /^jQuery\d+$/;
            return a.each(c.attributes, function(i, a) {
                a.specified && !v.test(a.name) && (h[a.name] = a.value)
            }), h
        }
        function h(c, h) {
            var v = this,
                b = a(this);
            if (v.value === b.attr(w ? "placeholder-x" : "placeholder") && b.hasClass(H.customClass)) if (v.value = "", b.removeClass(H.customClass), b.data("placeholder-password")) {
                if (b = b.hide().nextAll('input[type="password"]:first').show().attr("id", b.removeAttr("id").data("placeholder-id")), c === !0) return b[0].value = h, h;
                b.focus()
            } else v == y() && v.select()
        }
        function v(v) {
            var y, b = this,
                C = a(this),
                j = b.id;
            if (!v || "blur" !== v.type || !C.hasClass(H.customClass)) if ("" === b.value) {
                if ("password" === b.type) {
                    if (!C.data("placeholder-textinput")) {
                        try {
                            y = C.clone().prop({
                                type: "text"
                            })
                        } catch (e) {
                            y = a("<input>").attr(a.extend(c(this), {
                                type: "text"
                            }))
                        }
                        y.removeAttr("name").data({
                            "placeholder-enabled": !0,
                            "placeholder-password": C,
                            "placeholder-id": j
                        }).bind("focus.placeholder", h), C.data({
                            "placeholder-textinput": y,
                            "placeholder-id": j
                        }).before(y)
                    }
                    b.value = "", C = C.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id", C.data("placeholder-id")).show()
                } else {
                    var A = C.data("placeholder-password");
                    A && (A[0].value = "", C.attr("id", C.data("placeholder-id")).show().nextAll('input[type="password"]:last').hide().removeAttr("id"))
                }
                C.addClass(H.customClass), C[0].value = C.attr(w ? "placeholder-x" : "placeholder")
            } else C.removeClass(H.customClass)
        }
        function y() {
            try {
                return document.activeElement
            } catch (a) {}
        }
        var b, C, w = !1,
            j = "[object OperaMini]" === Object.prototype.toString.call(window.operamini),
            A = "placeholder" in document.createElement("input") && !j && !w,
            g = "placeholder" in document.createElement("textarea") && !j && !w,
            E = a.valHooks,
            k = a.propHooks,
            H = {};
        A && g ? (C = a.fn.placeholder = function() {
            return this
        }, C.input = !0, C.textarea = !0) : (C = a.fn.placeholder = function(c) {
            var y = {
                customClass: "placeholder"
            };
            return H = a.extend({}, y, c), this.filter((A ? "textarea" : ":input") + "[" + (w ? "placeholder-x" : "placeholder") + "]").not("." + H.customClass).not(":radio, :checkbox, [type=hidden]").bind({
                "focus.placeholder": h,
                "blur.placeholder": v
            }).data("placeholder-enabled", !0).trigger("blur.placeholder")
        }, C.input = A, C.textarea = g, b = {
            get: function(c) {
                var h = a(c),
                    v = h.data("placeholder-password");
                return v ? v[0].value : h.data("placeholder-enabled") && h.hasClass(H.customClass) ? "" : c.value
            },
            set: function(c, b) {
                var C, w, j = a(c);
                return "" !== b && (C = j.data("placeholder-textinput"), w = j.data("placeholder-password"), C ? (h.call(C[0], !0, b) || (c.value = b), C[0].value = b) : w && (h.call(c, !0, b) || (w[0].value = b), c.value = b)), j.data("placeholder-enabled") ? ("" === b ? (c.value = b, c != y() && v.call(c)) : (j.hasClass(H.customClass) && h.call(c), c.value = b), j) : (c.value = b, j)
            }
        }, A || (E.input = b, k.value = b), g || (E.textarea = b, k.value = b), a(function() {
            a(document).delegate("form", "submit.placeholder", function() {
                var c = a("." + H.customClass, this).each(function() {
                    h.call(this, !0, "")
                });
                setTimeout(function() {
                    c.each(v)
                }, 10)
            })
        }), a(window).bind("beforeunload.placeholder", function() {
            var c = !0;
            try {
                "javascript:void(0)" === document.activeElement.toString() && (c = !1)
            } catch (h) {}
            c && a("." + H.customClass).each(function() {
                this.value = ""
            })
        }))
    }); /*!pc/modules/common/js/config.js*/
;
define("pc/modules/common/js/config", ["require", "exports", "module"], function(require, exports, module) {
    module.exports = {
        url: {
            toPhoneReset: GLOBAL_DOMAIN.pctx + "/accountPwd/toPhoneReset.html",
            sendRestpasswordVerifyCode: GLOBAL_DOMAIN.pctx + "/accountPwd/sendRestpasswordVerifyCode.json",
            resetPhone: GLOBAL_DOMAIN.pctx + "/accountPwd/resetPhone.json",
            toVerifyResetPhone: GLOBAL_DOMAIN.pctx + "/accountPwd/toVerifyResetPhone.html",
            resetPhonePassword: GLOBAL_DOMAIN.pctx + "/accountPwd/resetPhonePassword.json",
            verfiyBindEmail: GLOBAL_DOMAIN.pctx + "/account/verfiyBindEmail.html",
            register: GLOBAL_DOMAIN.pctx + "/register/register.json",
            verifyemail: GLOBAL_DOMAIN.pctx + "/register/verifyemail.json",
            getPhoneVerificationCode: GLOBAL_DOMAIN.pctx + "/register/getPhoneVerificationCode.json",
            resetPhone: GLOBAL_DOMAIN.pctx + "/vcode/create",
            resetPhone: GLOBAL_DOMAIN.pctx + "/accountPwd/resetPhone.json",
            resetPhone: GLOBAL_DOMAIN.pctx + "/accountPwd/resetPhone.json",
            resetPhone: GLOBAL_DOMAIN.pctx + "/accountPwd/resetPhone.json",
            resetPhone: GLOBAL_DOMAIN.pctx + "/accountPwd/resetPhone.json"
        }
    }
}); /*!pc/page/register/main.js*/
;
define("pc/page/register/main", ["require", "exports", "module", "common/components/checkbox/jquery.checkbox", "dep/jquery-placeholder/jquery.placeholder", "pc/modules/common/js/config"], function(require) {
    function a(e) {
        var a = e,
            F = a.parent.CollectData(),
            c = "veenike";
        F.isValidate && (F.password = md5(F.password), F.password = md5(c + F.password + c), $.ajax({
            url: a.control._option.url,
            data: F,
            type: "post",
            dataType: "json",
            cache: !1
        }).done(function(F) {
            var c = {
                1: {
                    message: "成功",
                    linkFor: "phoneVerificationCode",
                    level: "info"
                },
                220: {
                    message: "请输入有效的邮箱地址",
                    linkFor: "email",
                    level: "error"
                },
                211: {
                    message: "请输入6-16位密码，字母区分大小写",
                    linkFor: "password",
                    level: "error"
                },
                222: {
                    message: "请输入11位大陆地区手机号码",
                    linkFor: "phoneVerificationCode",
                    level: "error"
                },
                240: {
                    message: "请输入常用邮箱地址或者手机号码",
                    linkFor: "phoneVerificationCode",
                    level: "error"
                },
                241: {
                    message: "请输入密码",
                    linkFor: "password",
                    level: "error"
                },
                243: {
                    message: "请选择使用拉勾的目的",
                    linkFor: "type",
                    level: "error"
                },
                244: {
                    message: "请输入6位数字验证码",
                    linkFor: "phoneVerificationCode",
                    level: "error"
                },
                245: {
                    message: "请输入6位数字验证码",
                    linkFor: "phoneVerificationCode",
                    level: "error"
                },
                299: {
                    message: "你的操作太过频繁，请稍后再试",
                    linkFor: "phoneVerificationCode",
                    level: "error"
                },
                400: {
                    message: "该邮箱已被注册，请重新输入或直接登录",
                    linkFor: "email",
                    level: "error"
                },
                401: {
                    message: "验证码不正确",
                    linkFor: "phoneVerificationCode",
                    level: "error"
                },
                402: {
                    message: "验证码不正确",
                    linkFor: "phoneVerificationCode",
                    level: "error"
                },
                403: {
                    message: "系统错误",
                    linkFor: "phoneVerificationCode",
                    level: "error"
                },
                405: {
                    message: "该手机已被注册，请重新输入或直接登录",
                    linkFor: "phone",
                    level: "error"
                },
                498: {
                    message: "系统错误",
                    linkFor: "protocol",
                    level: "error"
                },
                499: {
                    message: "系统错误",
                    linkFor: "protocol",
                    level: "error"
                },
                501: {
                    message: "系统错误",
                    linkFor: "phoneVerificationCode",
                    level: "error"
                },
                502: {
                    message: "系统错误",
                    linkFor: "protocol",
                    level: "error"
                },
                10010: {
                    message: "验证码不正确",
                    linkFor: "request_form_verifyCode",
                    level: "error"
                },
                10011: {
                    message: "系统错误",
                    linkFor: "protocol",
                    level: "error"
                },
                10012: {
                    message: "系统错误",
                    linkFor: "protocol",
                    level: "error"
                }
            };
            if (c[F.state] && 1 != F.state && a.parent.field[c[F.state].linkFor].showMessage({
                    message: c[F.state].message
                }), 10010 != F.state || a.parent.field.request_form_verifyCode.getIsVisible() || (a.parent.field.request_form_verifyCode.getVerifyCode(), a.parent.field.request_form_verifyCode.setVisible(!0)), 1 == F.state) {
                var g = "/grantServiceTicket/grant.html";
                window.location.href = g
            } else a.parent.field.request_form_verifyCode.getIsVisible() && a.parent.field.request_form_verifyCode.getVerifyCode()
        }))
    }
    require("common/components/checkbox/jquery.checkbox"), require("dep/jquery-placeholder/jquery.placeholder");
    require("pc/modules/common/js/config");
    $("input").placeholder();
    var F = $(".form_head > li"),
        c = $(".form_body");
    F.parent().append('<span class="tab_active"></span>'), F.each(function(i) {
        $(this).click(function() {
            $(this).not(":visible") ? ($(this).addClass("active").siblings().removeClass("active"), $(this).siblings(".tab_active").stop().animate({
                left: $(this).offsetParent().context.offsetLeft
            }, 400), c.eq(i).show().siblings(".form_body").hide(), g.setClear(), v.setClear()) : ($(this).addClass("active").siblings().removeClass("active"), c.eq(i).show().siblings(".form_body").hide())
        })
    }), $(".input_item > .btn_outline").each(function() {
        $(this).click(function() {
            $(this).addClass("btn_active").siblings().removeClass("btn_active")
        })
    });


});