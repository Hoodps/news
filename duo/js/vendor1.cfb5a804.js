!
function(a, b) {
	"function" == typeof define && (define.amd || define.cmd) ? define(function() {
		return b(a)
	}) : b(a, !0)
}(this, function(a, b) {
	function c(b, c, d) {
		a.WeixinJSBridge ? WeixinJSBridge.invoke(b, e(c), function(a) {
			g(b, a, d)
		}) : j(b, d)
	}
	function d(b, c, d) {
		a.WeixinJSBridge ? WeixinJSBridge.on(b, function(a) {
			d && d.trigger && d.trigger(a), g(b, a, c)
		}) : d ? j(b, d) : j(b, c)
	}
	function e(a) {
		return a = a || {}, a.appId = z.appId, a.verifyAppId = z.appId, a.verifySignType = "sha1", a.verifyTimestamp = z.timestamp + "", a.verifyNonceStr = z.nonceStr, a.verifySignature = z.signature, a
	}
	function f(a) {
		return {
			timeStamp: a.timestamp + "",
			nonceStr: a.nonceStr,
			"package": a["package"],
			paySign: a.paySign,
			signType: a.signType || "SHA1"
		}
	}
	function g(a, b, c) {
		var d, e, f;
		switch (delete b.err_code, delete b.err_desc, delete b.err_detail, d = b.errMsg, d || (d = b.err_msg, delete b.err_msg, d = h(a, d, c), b.errMsg = d), c = c || {}, c._complete && (c._complete(b), delete c._complete), d = b.errMsg || "", z.debug && !c.isInnerInvoke && alert(JSON.stringify(b)), e = d.indexOf(":"), f = d.substring(e + 1)) {
		case "ok":
			c.success && c.success(b);
			break;
		case "cancel":
			c.cancel && c.cancel(b);
			break;
		default:
			c.fail && c.fail(b)
		}
		c.complete && c.complete(b)
	}
	function h(a, b) {
		var c, d, e, f;
		if (b) {
			switch (c = b.indexOf(":"), a) {
			case o.config:
				d = "config";
				break;
			case o.openProductSpecificView:
				d = "openProductSpecificView";
				break;
			default:
				d = b.substring(0, c), d = d.replace(/_/g, " "), d = d.replace(/\b\w+\b/g, function(a) {
					return a.substring(0, 1).toUpperCase() + a.substring(1)
				}), d = d.substring(0, 1).toLowerCase() + d.substring(1), d = d.replace(/ /g, ""), -1 != d.indexOf("Wcpay") && (d = d.replace("Wcpay", "WCPay")), e = p[d], e && (d = e)
			}
			f = b.substring(c + 1), "confirm" == f && (f = "ok"), "failed" == f && (f = "fail"), -1 != f.indexOf("failed_") && (f = f.substring(7)), -1 != f.indexOf("fail_") && (f = f.substring(5)), f = f.replace(/_/g, " "), f = f.toLowerCase(), ("access denied" == f || "no permission to execute" == f) && (f = "permission denied"), "config" == d && "function not exist" == f && (f = "ok"), b = d + ":" + f
		}
		return b
	}
	function i(a) {
		var b, c, d, e;
		if (a) {
			for (b = 0, c = a.length; c > b; ++b) d = a[b], e = o[d], e && (a[b] = e);
			return a
		}
	}
	function j(a, b) {
		if (!(!z.debug || b && b.isInnerInvoke)) {
			var c = p[a];
			c && (a = c), b && b._complete && delete b._complete, console.log('"' + a + '",', b || "")
		}
	}
	function k() {
		if (!("6.0.2" > w || y.systemType < 0)) {
			var a = new Image;
			y.appId = z.appId, y.initTime = x.initEndTime - x.initStartTime, y.preVerifyTime = x.preVerifyEndTime - x.preVerifyStartTime, C.getNetworkType({
				isInnerInvoke: !0,
				success: function(b) {
					y.networkType = b.networkType;
					var c = "https://open.weixin.qq.com/sdk/report?v=" + y.version + "&o=" + y.isPreVerifyOk + "&s=" + y.systemType + "&c=" + y.clientVersion + "&a=" + y.appId + "&n=" + y.networkType + "&i=" + y.initTime + "&p=" + y.preVerifyTime + "&u=" + y.url;
					a.src = c
				}
			})
		}
	}
	function l() {
		return (new Date).getTime()
	}
	function m(b) {
		t && (a.WeixinJSBridge ? b() : q.addEventListener && q.addEventListener("WeixinJSBridgeReady", b, !1))
	}
	function n() {
		C.invoke || (C.invoke = function(b, c, d) {
			a.WeixinJSBridge && WeixinJSBridge.invoke(b, e(c), d)
		}, C.on = function(b, c) {
			a.WeixinJSBridge && WeixinJSBridge.on(b, c)
		})
	}
	var o, p, q, r, s, t, u, v, w, x, y, z, A, B, C;
	return a.jWeixin ? void 0 : (o = {
		config: "preVerifyJSAPI",
		onMenuShareTimeline: "menu:share:timeline",
		onMenuShareAppMessage: "menu:share:appmessage",
		onMenuShareQQ: "menu:share:qq",
		onMenuShareWeibo: "menu:share:weiboApp",
		onMenuShareQZone: "menu:share:QZone",
		previewImage: "imagePreview",
		getLocation: "geoLocation",
		openProductSpecificView: "openProductViewWithPid",
		addCard: "batchAddCard",
		openCard: "batchViewCard",
		chooseWXPay: "getBrandWCPayRequest"
	}, p = function() {
		var a, b = {};
		for (a in o) b[o[a]] = a;
		return b
	}(), q = a.document, r = q.title, s = navigator.userAgent.toLowerCase(), t = -1 != s.indexOf("micromessenger"), u = -1 != s.indexOf("android"), v = -1 != s.indexOf("iphone") || -1 != s.indexOf("ipad"), w = function() {
		var a = s.match(/micromessenger\/(\d+\.\d+\.\d+)/) || s.match(/micromessenger\/(\d+\.\d+)/);
		return a ? a[1] : ""
	}(), x = {
		initStartTime: l(),
		initEndTime: 0,
		preVerifyStartTime: 0,
		preVerifyEndTime: 0
	}, y = {
		version: 1,
		appId: "",
		initTime: 0,
		preVerifyTime: 0,
		networkType: "",
		isPreVerifyOk: 1,
		systemType: v ? 1 : u ? 2 : -1,
		clientVersion: w,
		url: encodeURIComponent(location.href)
	}, z = {}, A = {
		_completes: []
	}, B = {
		state: 0,
		res: {}
	}, m(function() {
		x.initEndTime = l()
	}), C = {
		config: function(a) {
			z = a, j("config", a);
			var b = z.check === !1 ? !1 : !0;
			m(function() {
				var a, d, e;
				if (b) c(o.config, {
					verifyJsApiList: i(z.jsApiList)
				}, function() {
					A._complete = function(a) {
						x.preVerifyEndTime = l(), B.state = 1, B.res = a
					}, A.success = function() {
						y.isPreVerifyOk = 0
					}, A.fail = function(a) {
						A._fail ? A._fail(a) : B.state = -1
					};
					var a = A._completes;
					return a.push(function() {
						z.debug || k()
					}), A.complete = function() {
						for (var b = 0, c = a.length; c > b; ++b) a[b]();
						A._completes = []
					}, A
				}()), x.preVerifyStartTime = l();
				else {
					for (B.state = 1, a = A._completes, d = 0, e = a.length; e > d; ++d) a[d]();
					A._completes = []
				}
			}), z.beta && n()
		},
		ready: function(a) {
			0 != B.state ? a() : (A._completes.push(a), !t && z.debug && a())
		},
		error: function(a) {
			"6.0.2" > w || (-1 == B.state ? a(B.res) : A._fail = a)
		},
		checkJsApi: function(a) {
			var b = function(a) {
					var b, c, d = a.checkResult;
					for (b in d) c = p[b], c && (d[c] = d[b], delete d[b]);
					return a
				};
			c("checkJsApi", {
				jsApiList: i(a.jsApiList)
			}, function() {
				return a._complete = function(a) {
					if (u) {
						var c = a.checkResult;
						c && (a.checkResult = JSON.parse(c))
					}
					a = b(a)
				}, a
			}())
		},
		onMenuShareTimeline: function(a) {
			d(o.onMenuShareTimeline, {
				complete: function() {
					c("shareTimeline", {
						title: a.title || r,
						desc: a.title || r,
						img_url: a.imgUrl || "",
						link: a.link || location.href
					}, a)
				}
			}, a)
		},
		onMenuShareAppMessage: function(a) {
			d(o.onMenuShareAppMessage, {
				complete: function() {
					c("sendAppMessage", {
						title: a.title || r,
						desc: a.desc || "",
						link: a.link || location.href,
						img_url: a.imgUrl || "",
						type: a.type || "link",
						data_url: a.dataUrl || ""
					}, a)
				}
			}, a)
		},
		onMenuShareQQ: function(a) {
			d(o.onMenuShareQQ, {
				complete: function() {
					c("shareQQ", {
						title: a.title || r,
						desc: a.desc || "",
						img_url: a.imgUrl || "",
						link: a.link || location.href
					}, a)
				}
			}, a)
		},
		onMenuShareWeibo: function(a) {
			d(o.onMenuShareWeibo, {
				complete: function() {
					c("shareWeiboApp", {
						title: a.title || r,
						desc: a.desc || "",
						img_url: a.imgUrl || "",
						link: a.link || location.href
					}, a)
				}
			}, a)
		},
		onMenuShareQZone: function(a) {
			d(o.onMenuShareQZone, {
				complete: function() {
					c("shareQZone", {
						title: a.title || r,
						desc: a.desc || "",
						img_url: a.imgUrl || "",
						link: a.link || location.href
					}, a)
				}
			}, a)
		},
		startRecord: function(a) {
			c("startRecord", {}, a)
		},
		stopRecord: function(a) {
			c("stopRecord", {}, a)
		},
		onVoiceRecordEnd: function(a) {
			d("onVoiceRecordEnd", a)
		},
		playVoice: function(a) {
			c("playVoice", {
				localId: a.localId
			}, a)
		},
		pauseVoice: function(a) {
			c("pauseVoice", {
				localId: a.localId
			}, a)
		},
		stopVoice: function(a) {
			c("stopVoice", {
				localId: a.localId
			}, a)
		},
		onVoicePlayEnd: function(a) {
			d("onVoicePlayEnd", a)
		},
		uploadVoice: function(a) {
			c("uploadVoice", {
				localId: a.localId,
				isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
			}, a)
		},
		downloadVoice: function(a) {
			c("downloadVoice", {
				serverId: a.serverId,
				isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
			}, a)
		},
		translateVoice: function(a) {
			c("translateVoice", {
				localId: a.localId,
				isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
			}, a)
		},
		chooseImage: function(a) {
			c("chooseImage", {
				scene: "1|2",
				count: a.count || 9,
				sizeType: a.sizeType || ["original", "compressed"],
				sourceType: a.sourceType || ["album", "camera"]
			}, function() {
				return a._complete = function(a) {
					if (u) {
						var b = a.localIds;
						b && (a.localIds = JSON.parse(b))
					}
				}, a
			}())
		},
		previewImage: function(a) {
			c(o.previewImage, {
				current: a.current,
				urls: a.urls
			}, a)
		},
		uploadImage: function(a) {
			c("uploadImage", {
				localId: a.localId,
				isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
			}, a)
		},
		downloadImage: function(a) {
			c("downloadImage", {
				serverId: a.serverId,
				isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
			}, a)
		},
		getNetworkType: function(a) {
			var b = function(a) {
					var b, c, d, e = a.errMsg;
					if (a.errMsg = "getNetworkType:ok", b = a.subtype, delete a.subtype, b) a.networkType = b;
					else switch (c = e.indexOf(":"), d = e.substring(c + 1)) {
					case "wifi":
					case "edge":
					case "wwan":
						a.networkType = d;
						break;
					default:
						a.errMsg = "getNetworkType:fail"
					}
					return a
				};
			c("getNetworkType", {}, function() {
				return a._complete = function(a) {
					a = b(a)
				}, a
			}())
		},
		openLocation: function(a) {
			c("openLocation", {
				latitude: a.latitude,
				longitude: a.longitude,
				name: a.name || "",
				address: a.address || "",
				scale: a.scale || 28,
				infoUrl: a.infoUrl || ""
			}, a)
		},
		getLocation: function(a) {
			a = a || {}, c(o.getLocation, {
				type: a.type || "wgs84"
			}, function() {
				return a._complete = function(a) {
					delete a.type
				}, a
			}())
		},
		hideOptionMenu: function(a) {
			c("hideOptionMenu", {}, a)
		},
		showOptionMenu: function(a) {
			c("showOptionMenu", {}, a)
		},
		closeWindow: function(a) {
			a = a || {}, c("closeWindow", {
				immediate_close: a.immediateClose || 0
			}, a)
		},
		hideMenuItems: function(a) {
			c("hideMenuItems", {
				menuList: a.menuList
			}, a)
		},
		showMenuItems: function(a) {
			c("showMenuItems", {
				menuList: a.menuList
			}, a)
		},
		hideAllNonBaseMenuItem: function(a) {
			c("hideAllNonBaseMenuItem", {}, a)
		},
		showAllNonBaseMenuItem: function(a) {
			c("showAllNonBaseMenuItem", {}, a)
		},
		scanQRCode: function(a) {
			a = a || {}, c("scanQRCode", {
				needResult: a.needResult || 0,
				scanType: a.scanType || ["qrCode", "barCode"]
			}, function() {
				return a._complete = function(a) {
					var b, c;
					v && (b = a.resultStr, b && (c = JSON.parse(b), a.resultStr = c && c.scan_code && c.scan_code.scan_result))
				}, a
			}())
		},
		openProductSpecificView: function(a) {
			c(o.openProductSpecificView, {
				pid: a.productId,
				view_type: a.viewType || 0
			}, a)
		},
		addCard: function(a) {
			var b, d, e, f, g = a.cardList,
				h = [];
			for (b = 0, d = g.length; d > b; ++b) e = g[b], f = {
				card_id: e.cardId,
				card_ext: e.cardExt
			}, h.push(f);
			c(o.addCard, {
				card_list: h
			}, function() {
				return a._complete = function(a) {
					var b, c, d, e = a.card_list;
					if (e) {
						for (e = JSON.parse(e), b = 0, c = e.length; c > b; ++b) d = e[b], d.cardId = d.card_id, d.cardExt = d.card_ext, d.isSuccess = d.is_succ ? !0 : !1, delete d.card_id, delete d.card_ext, delete d.is_succ;
						a.cardList = e, delete a.card_list
					}
				}, a
			}())
		},
		chooseCard: function(a) {
			c("chooseCard", {
				app_id: z.appId,
				location_id: a.shopId || "",
				sign_type: a.signType || "SHA1",
				card_id: a.cardId || "",
				card_type: a.cardType || "",
				card_sign: a.cardSign,
				time_stamp: a.timestamp + "",
				nonce_str: a.nonceStr
			}, function() {
				return a._complete = function(a) {
					a.cardList = a.choose_card_info, delete a.choose_card_info
				}, a
			}())
		},
		openCard: function(a) {
			var b, d, e, f, g = a.cardList,
				h = [];
			for (b = 0, d = g.length; d > b; ++b) e = g[b], f = {
				card_id: e.cardId,
				code: e.code
			}, h.push(f);
			c(o.openCard, {
				card_list: h
			}, a)
		},
		chooseWXPay: function(a) {
			c(o.chooseWXPay, f(a), a)
		}
	}, b && (a.wx = a.jWeixin = C), C)
}), function() {
	"use strict";
	var a = angular.module("angularModalService", []);
	a.factory("ModalService", ["$document", "$compile", "$controller", "$http", "$rootScope", "$q", "$templateCache", "$state", "$location", "$window", function(a, b, c, d, e, f, g, h, i, j) {
		function k() {
			var a = this,
				h = function(a, b) {
					var c = f.defer();
					if (a) c.resolve(a);
					else if (b) {
						var e = g.get(b);
						void 0 !== e ? c.resolve(e) : d({
							method: "GET",
							url: b,
							cache: !0
						}).then(function(a) {
							g.put(b, a.data), c.resolve(a.data)
						}, function(a) {
							c.reject(a)
						})
					} else c.reject("No template or templateUrl has been specified.");
					return c.promise
				};
			a.showModal = function(a) {
				var d = f.defer(),
					g = a.controller;
				return g ? (a.controllerAs && (g = g + " as " + a.controllerAs), h(a.template, a.templateUrl).then(function(h) {
					var i = e.$new(),
						k = f.defer(),
						m = {
							$scope: i,
							close: function(b, c) {
								(void 0 === c || null === c) && (c = 0), window.setTimeout(function() {
									var c = "dialog_" + i.$id;
									k.resolve(b), i.$destroy(), q.remove(), m.close = null, d = null, k = null, s = null, m = null, q = null, i = null, j.history.state && j.history.state.page === c && a.backButton && j.history.back()
								}, c)
							}
						};
					if (a.inputs) for (var n in a.inputs) m[n] = a.inputs[n];
					var o = angular.element(h),
						p = b(o),
						q = p(i);
					m.$element = q;
					var r = c(g, m);
					a.appendElement ? a.appendElement.append(q) : l.append(q), a.backButton && (j.history.pushState({
						page: "dialog_" + i.$id
					}, "_dialog", ""), j.dialogArr = j.dialogArr || [], j.dialogArr.push(m), j.onpopstate = function(a) {
						var b = j.dialogArr.pop();
						b && "function" == typeof b.close ? b.close(null, 200) : console.log("already")
					});
					var s = {
						controller: r,
						scope: i,
						element: q,
						close: k.promise
					};
					d.resolve(s)
				}).then(null, function(a) {
					d.reject(a)
				}), d.promise) : (d.reject("No controller has been specified."), d.promise)
			}
		}
		var l = a.find("body");
		return new k
	}])
}(), function(a, b, c) {
	function d(a) {
		var c = {
			wrapper: "#index-wrapper",
			headerMaxOpacity: .95,
			scrollEndCallback: null
		};
		this.options = b.extend({}, c, a), this._init()
	}
	d.prototype._init = function() {
		var a = this,
			c = a.options;
		a.$wrapper = b(c.wrapper), a.$index = a.$wrapper.find(".pg-index"), a.$overviewBox = a.$wrapper.find(".overview-box"), a.$tabWrap = a.$wrapper.find(".tab-wrap"), a.$header = a.$wrapper.find(".header"), a._bind()
	}, d.prototype._bind = function() {
		var a, c, d = this,
			e = d.options;
		d.$index.on("scroll", function() {
			var a = Math.abs(b(this).scrollTop()),
				c = a / 50 * e.headerMaxOpacity;
			0 > c ? c = 0 : c > e.headerMaxOpacity && (c = e.headerMaxOpacity), d.$header.css("background", "rgba(255, 255, 255, " + c + ")"), a == d.getMaxScrollTop() && d.handleScrollEnd()
		}), d.$index.on("touchstart", function(b) {
			a = b.touches[0].clientY
		}).on("touchmove", function(e) {
			var f, g = Math.abs(b(this).scrollTop());
			c = e.touches[0].clientY, f = c > a ? "down" : a > c ? "up" : "", "up" == f && g == d.getMaxScrollTop() && d.handleScrollEnd()
		})
	}, d.prototype.getMaxScrollTop = function() {
		var a = this,
			b = (a.options, a.$overviewBox.height() + a.$tabWrap.height() - a.$index.height());
		return 0 > b && (b = 0), b
	}, d.prototype.handleScrollEnd = function() {
		var a = this.options;
		b.isFunction(a.scrollEndCallback) && a.scrollEndCallback()
	}, a.IndexScroll = d
}(window, $), function(a, b, c) {
	var d = c(a, b);
	a.util = a.util || {}, a.util.toucher = a.util.toucher || d, a.define && define(function(a, b, c) {
		return d
	})
}(this, document, function(a, b) {
	function c(a, b) {
		return a.className.match(new RegExp("(\\s|^)" + b + "(\\s|$)"))
	}
	function d(a, b) {
		if (this._events = this._events || {}, this._events[a]) for (var d = this._events[a], f = b.target;;) {
			if (0 == d.length) return;
			if (f == this.dom || !f) {
				for (var g = 0, h = d.length; h > g; g++) {
					var i = d[g].className,
						j = d[g].fn;
					null == i && e(a, j, f, b)
				}
				return
			}
			var k = d;
			d = [];
			for (var g = 0, h = k.length; h > g; g++) {
				var i = k[g].className,
					j = k[g].fn;
				if (c(f, i)) {
					if (0 == e(a, j, f, b)) return
				} else d.push(k[g])
			}
			f = f.parentNode
		}
	}
	function e(a, b, c, d) {
		var e = d.plugTouches || d.touches,
			f = e.length ? e[0] : {},
			g = {
				type: a,
				target: d.target,
				pageX: f.pageX,
				pageY: f.pageY,
				clientX: f.clientX || 0,
				clientY: f.clientY || 0
			};
		a.match(/^swipe/) && d.plugStartPosition && (g.startX = d.plugStartPosition.pageX, g.startY = d.plugStartPosition.pageY, g.moveX = g.pageX - g.startX, g.moveY = g.pageY - g.startY);
		var h = b.call(c, g);
		return 0 == h && (d.preventDefault(), d.stopPropagation()), h
	}
	function f(a, b, c, d) {
		return Math.abs(a - b) >= Math.abs(c - d) ? a - b > 0 ? "Left" : "Right" : c - d > 0 ? "Up" : "Down"
	}
	function g(a) {
		function b(a) {
			r = !1, clearTimeout(n), clearTimeout(m)
		}
		function c() {
			b(), d.call(o, "singleTap", s)
		}
		function e(a) {
			s = a, i = a.touches[0].pageX, j = a.touches[0].pageY, k = 0, l = 0, r = !0, p = new Date, d.call(o, "swipeStart", a), clearTimeout(n), n = setTimeout(function() {
				b(a), d.call(o, "longTap", a)
			}, 500)
		}
		function g(a) {
			if (a.plugStartPosition = s.plugStartPosition, a.plugTouches = s.touches, d.call(o, "swipeEnd", a), r) {
				var e = new Date;
				o._events.doubleTap && 0 != o._events.doubleTap.length ? e - q > 200 ? m = setTimeout(c, 190) : (clearTimeout(m), b(a), d.call(o, "doubleTap", s)) : c(), q = e
			}
		}
		function h(a) {
			if (s = a, a.plugStartPosition = {
				pageX: i,
				pageY: j
			}, d.call(o, "swipe", a), r) {
				if (k = a.touches[0].pageX, l = a.touches[0].pageY, Math.abs(i - k) > 2 || Math.abs(j - l) > 2) {
					var e = f(i, k, j, l);
					d.call(o, "swipe" + e, a)
				} else c();
				b(a)
			}
		}
		var i, j, k, l, m, n, o = this,
			p = 0,
			q = 0,
			r = !1,
			s = null;
		a.addEventListener("touchstart", e), a.addEventListener("MSPointerDown", e), a.addEventListener("pointerdown", e), a.addEventListener("touchend", g), a.addEventListener("MSPointerUp", g), a.addEventListener("pointerup", g), a.addEventListener("touchmove", h), a.addEventListener("MSPointerMove", h), a.addEventListener("pointermove", h), a.addEventListener("touchcancel", b), a.addEventListener("MSPointerCancel", b), a.addEventListener("pointercancel", b)
	}
	function h(a, b) {
		this.dom = a, this._events = {}, g.call(this, this.dom)
	}
	return h.prototype.on = function(a, b, c) {
		var d, e;
		if ("string" == typeof b ? (d = b.replace(/^\./, ""), e = c) : (d = null, e = b), "function" == typeof e && a && a.length) for (var f = a.split(/\s+/), g = 0, h = f.length; h > g; g++) {
			var i = f[g];
			this._events[i] || (this._events[i] = []), this._events[i].push({
				className: d,
				fn: e
			})
		}
		return this
	}, function(a) {
		return new h(a)
	}
}), function(a) {
	"use strict";
	"function" == typeof define && define.amd ? define(a) : "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = a() : "undefined" != typeof Package ? Sortable = a() : window.Sortable = a()
}(function() {
	"use strict";

	function a(a, b) {
		if (!a || !a.nodeType || 1 !== a.nodeType) throw "Sortable: `el` must be HTMLElement, and not " + {}.toString.call(a);
		this.el = a, this.options = b = r({}, b), a[L] = this;
		var c = {
			group: Math.random(),
			sort: !0,
			disabled: !1,
			store: null,
			handle: null,
			scroll: !0,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			draggable: /[uo]l/i.test(a.nodeName) ? "li" : ">*",
			ghostClass: "sortable-ghost",
			chosenClass: "sortable-chosen",
			ignore: "a, img",
			filter: null,
			animation: 0,
			setData: function(a, b) {
				a.setData("Text", b.textContent)
			},
			dropBubble: !1,
			dragoverBubble: !1,
			dataIdAttr: "data-id",
			delay: 0,
			forceFallback: !1,
			fallbackClass: "sortable-fallback",
			fallbackOnBody: !1
		};
		for (var d in c)!(d in b) && (b[d] = c[d]);
		V(b);
		for (var f in this)"_" === f.charAt(0) && (this[f] = this[f].bind(this));
		this.nativeDraggable = b.forceFallback ? !1 : P, e(a, "mousedown", this._onTapStart), e(a, "touchstart", this._onTapStart), this.nativeDraggable && (e(a, "dragover", this), e(a, "dragenter", this)), T.push(this._onDragOver), b.store && this.sort(b.store.get(this))
	}
	function b(a) {
		v && v.state !== a && (h(v, "display", a ? "none" : ""), !a && v.state && w.insertBefore(v, s), v.state = a)
	}
	function c(a, b, c) {
		if (a) {
			c = c || N, b = b.split(".");
			var d = b.shift().toUpperCase(),
				e = new RegExp("\\s(" + b.join("|") + ")(?=\\s)", "g");
			do
			if (">*" === d && a.parentNode === c || ("" === d || a.nodeName.toUpperCase() == d) && (!b.length || ((" " + a.className + " ").match(e) || []).length == b.length)) return a;
			while (a !== c && (a = a.parentNode))
		}
		return null
	}
	function d(a) {
		a.dataTransfer && (a.dataTransfer.dropEffect = "move"), a.preventDefault()
	}
	function e(a, b, c) {
		a.addEventListener(b, c, !1)
	}
	function f(a, b, c) {
		a.removeEventListener(b, c, !1)
	}
	function g(a, b, c) {
		if (a) if (a.classList) a.classList[c ? "add" : "remove"](b);
		else {
			var d = (" " + a.className + " ").replace(K, " ").replace(" " + b + " ", " ");
			a.className = (d + (c ? " " + b : "")).replace(K, " ")
		}
	}
	function h(a, b, c) {
		var d = a && a.style;
		if (d) {
			if (void 0 === c) return N.defaultView && N.defaultView.getComputedStyle ? c = N.defaultView.getComputedStyle(a, "") : a.currentStyle && (c = a.currentStyle), void 0 === b ? c : c[b];
			b in d || (b = "-webkit-" + b), d[b] = c + ("string" == typeof c ? "" : "px")
		}
	}
	function i(a, b, c) {
		if (a) {
			var d = a.getElementsByTagName(b),
				e = 0,
				f = d.length;
			if (c) for (; f > e; e++) c(d[e], e);
			return d
		}
		return []
	}
	function j(a, b, c, d, e, f, g) {
		var h = N.createEvent("Event"),
			i = (a || b[L]).options,
			j = "on" + c.charAt(0).toUpperCase() + c.substr(1);
		h.initEvent(c, !0, !0), h.to = b, h.from = e || b, h.item = d || b, h.clone = v, h.oldIndex = f, h.newIndex = g, b.dispatchEvent(h), i[j] && i[j].call(a, h)
	}
	function k(a, b, c, d, e, f) {
		var g, h, i = a[L],
			j = i.options.onMove;
		return g = N.createEvent("Event"), g.initEvent("move", !0, !0), g.to = b, g.from = a, g.dragged = c, g.draggedRect = d, g.related = e || b, g.relatedRect = f || b.getBoundingClientRect(), a.dispatchEvent(g), j && (h = j.call(i, g)), h
	}
	function l(a) {
		a.draggable = !1
	}
	function m() {
		R = !1
	}
	function n(a, b) {
		var c = a.lastElementChild,
			d = c.getBoundingClientRect();
		return (b.clientY - (d.top + d.height) > 5 || b.clientX - (d.right + d.width) > 5) && c
	}
	function o(a) {
		for (var b = a.tagName + a.className + a.src + a.href + a.textContent, c = b.length, d = 0; c--;) d += b.charCodeAt(c);
		return d.toString(36)
	}
	function p(a) {
		var b = 0;
		if (!a || !a.parentNode) return -1;
		for (; a && (a = a.previousElementSibling);)"TEMPLATE" !== a.nodeName.toUpperCase() && b++;
		return b
	}
	function q(a, b) {
		var c, d;
		return function() {
			void 0 === c && (c = arguments, d = this, setTimeout(function() {
				1 === c.length ? a.call(d, c[0]) : a.apply(d, c), c = void 0
			}, b))
		}
	}
	function r(a, b) {
		if (a && b) for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
		return a
	}
	var s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J = {},
		K = /\s+/g,
		L = "Sortable" + (new Date).getTime(),
		M = window,
		N = M.document,
		O = M.parseInt,
		P = !! ("draggable" in N.createElement("div")),
		Q = function(a) {
			return a = N.createElement("x"), a.style.cssText = "pointer-events:auto", "auto" === a.style.pointerEvents
		}(),
		R = !1,
		S = Math.abs,
		T = ([].slice, []),
		U = q(function(a, b, c) {
			if (c && b.scroll) {
				var d, e, f, g, h = b.scrollSensitivity,
					i = b.scrollSpeed,
					j = a.clientX,
					k = a.clientY,
					l = window.innerWidth,
					m = window.innerHeight;
				if (z !== c && (y = b.scroll, z = c, y === !0)) {
					y = c;
					do
					if (y.offsetWidth < y.scrollWidth || y.offsetHeight < y.scrollHeight) break;
					while (y = y.parentNode)
				}
				y && (d = y, e = y.getBoundingClientRect(), f = (S(e.right - j) <= h) - (S(e.left - j) <= h), g = (S(e.bottom - k) <= h) - (S(e.top - k) <= h)), f || g || (f = (h >= l - j) - (h >= j), g = (h >= m - k) - (h >= k), (f || g) && (d = M)), (J.vx !== f || J.vy !== g || J.el !== d) && (J.el = d, J.vx = f, J.vy = g, clearInterval(J.pid), d && (J.pid = setInterval(function() {
					d === M ? M.scrollTo(M.pageXOffset + f * i, M.pageYOffset + g * i) : (g && (d.scrollTop += g * i), f && (d.scrollLeft += f * i))
				}, 24)))
			}
		}, 30),
		V = function(a) {
			var b = a.group;
			b && "object" == typeof b || (b = a.group = {
				name: b
			}), ["pull", "put"].forEach(function(a) {
				a in b || (b[a] = !0)
			}), a.groups = " " + b.name + (b.put.join ? " " + b.put.join(" ") : "") + " "
		};
	return a.prototype = {
		constructor: a,
		_onTapStart: function(a) {
			var b = this,
				d = this.el,
				e = this.options,
				f = a.type,
				g = a.touches && a.touches[0],
				h = (g || a).target,
				i = h,
				k = e.filter;
			if (!("mousedown" === f && 0 !== a.button || e.disabled) && (h = c(h, e.draggable, d))) {
				if (D = p(h), "function" == typeof k) {
					if (k.call(this, a, h, this)) return j(b, i, "filter", h, d, D), void a.preventDefault()
				} else if (k && (k = k.split(",").some(function(a) {
					return a = c(i, a.trim(), d), a ? (j(b, a, "filter", h, d, D), !0) : void 0
				}))) return void a.preventDefault();
				(!e.handle || c(i, e.handle, d)) && this._prepareDragStart(a, g, h)
			}
		},
		_prepareDragStart: function(a, b, c) {
			var d, f = this,
				h = f.el,
				j = f.options,
				k = h.ownerDocument;
			c && !s && c.parentNode === h && (G = a, w = h, s = c, t = s.parentNode, x = s.nextSibling, F = j.group, d = function() {
				f._disableDelayedDrag(), s.draggable = !0, g(s, f.options.chosenClass, !0), f._triggerDragStart(b)
			}, j.ignore.split(",").forEach(function(a) {
				i(s, a.trim(), l)
			}), e(k, "mouseup", f._onDrop), e(k, "touchend", f._onDrop), e(k, "touchcancel", f._onDrop), j.delay ? (e(k, "mouseup", f._disableDelayedDrag), e(k, "touchend", f._disableDelayedDrag), e(k, "touchcancel", f._disableDelayedDrag), e(k, "mousemove", f._disableDelayedDrag), e(k, "touchmove", f._disableDelayedDrag), f._dragStartTimer = setTimeout(d, j.delay)) : d())
		},
		_disableDelayedDrag: function() {
			var a = this.el.ownerDocument;
			clearTimeout(this._dragStartTimer), f(a, "mouseup", this._disableDelayedDrag), f(a, "touchend", this._disableDelayedDrag), f(a, "touchcancel", this._disableDelayedDrag), f(a, "mousemove", this._disableDelayedDrag), f(a, "touchmove", this._disableDelayedDrag)
		},
		_triggerDragStart: function(a) {
			a ? (G = {
				target: s,
				clientX: a.clientX,
				clientY: a.clientY
			}, this._onDragStart(G, "touch")) : this.nativeDraggable ? (e(s, "dragend", this), e(w, "dragstart", this._onDragStart)) : this._onDragStart(G, !0);
			try {
				N.selection ? N.selection.empty() : window.getSelection().removeAllRanges()
			} catch (b) {}
		},
		_dragStarted: function() {
			w && s && (g(s, this.options.ghostClass, !0), a.active = this, j(this, w, "start", s, w, D))
		},
		_emulateDragOver: function() {
			if (H) {
				if (this._lastX === H.clientX && this._lastY === H.clientY) return;
				this._lastX = H.clientX, this._lastY = H.clientY, Q || h(u, "display", "none");
				var a = N.elementFromPoint(H.clientX, H.clientY),
					b = a,
					c = " " + this.options.group.name,
					d = T.length;
				if (b) do {
					if (b[L] && b[L].options.groups.indexOf(c) > -1) {
						for (; d--;) T[d]({
							clientX: H.clientX,
							clientY: H.clientY,
							target: a,
							rootEl: b
						});
						break
					}
					a = b
				} while (b = b.parentNode);
				Q || h(u, "display", "")
			}
		},
		_onTouchMove: function(b) {
			if (G) {
				a.active || this._dragStarted(), this._appendGhost();
				var c = b.touches ? b.touches[0] : b,
					d = c.clientX - G.clientX,
					e = c.clientY - G.clientY,
					f = b.touches ? "translate3d(" + d + "px," + e + "px,0)" : "translate(" + d + "px," + e + "px)";
				I = !0, H = c, h(u, "webkitTransform", f), h(u, "mozTransform", f), h(u, "msTransform", f), h(u, "transform", f), b.preventDefault()
			}
		},
		_appendGhost: function() {
			if (!u) {
				var a, b = s.getBoundingClientRect(),
					c = h(s),
					d = this.options;
				u = s.cloneNode(!0), g(u, d.ghostClass, !1), g(u, d.fallbackClass, !0), h(u, "top", b.top - O(c.marginTop, 10)), h(u, "left", b.left - O(c.marginLeft, 10)), h(u, "width", b.width), h(u, "height", b.height), h(u, "opacity", "0.8"), h(u, "position", "fixed"), h(u, "zIndex", "100000"), h(u, "pointerEvents", "none"), d.fallbackOnBody && N.body.appendChild(u) || w.appendChild(u), a = u.getBoundingClientRect(), h(u, "width", 2 * b.width - a.width), h(u, "height", 2 * b.height - a.height)
			}
		},
		_onDragStart: function(a, b) {
			var c = a.dataTransfer,
				d = this.options;
			this._offUpEvents(), "clone" == F.pull && (v = s.cloneNode(!0), h(v, "display", "none"), w.insertBefore(v, s)), b ? ("touch" === b ? (e(N, "touchmove", this._onTouchMove), e(N, "touchend", this._onDrop), e(N, "touchcancel", this._onDrop)) : (e(N, "mousemove", this._onTouchMove), e(N, "mouseup", this._onDrop)), this._loopId = setInterval(this._emulateDragOver, 50)) : (c && (c.effectAllowed = "move", d.setData && d.setData.call(this, c, s)), e(N, "drop", this), setTimeout(this._dragStarted, 0))
		},
		_onDragOver: function(a) {
			var d, e, f, g = this.el,
				i = this.options,
				j = i.group,
				l = j.put,
				o = F === j,
				p = i.sort;
			if (void 0 !== a.preventDefault && (a.preventDefault(), !i.dragoverBubble && a.stopPropagation()), I = !0, F && !i.disabled && (o ? p || (f = !w.contains(s)) : F.pull && l && (F.name === j.name || l.indexOf && ~l.indexOf(F.name))) && (void 0 === a.rootEl || a.rootEl === this.el)) {
				if (U(a, i, this.el), R) return;
				if (d = c(a.target, i.draggable, g), e = s.getBoundingClientRect(), f) return b(!0), void(v || x ? w.insertBefore(s, v || x) : p || w.appendChild(s));
				if (0 === g.children.length || g.children[0] === u || g === a.target && (d = n(g, a))) {
					if (d) {
						if (d.animated) return;
						r = d.getBoundingClientRect()
					}
					b(o), k(w, g, s, e, d, r) !== !1 && (s.contains(g) || (g.appendChild(s), t = g), this._animate(e, s), d && this._animate(r, d))
				} else if (d && !d.animated && d !== s && void 0 !== d.parentNode[L]) {
					A !== d && (A = d, B = h(d), C = h(d.parentNode));
					var q, r = d.getBoundingClientRect(),
						y = r.right - r.left,
						z = r.bottom - r.top,
						D = /left|right|inline/.test(B.cssFloat + B.display) || "flex" == C.display && 0 === C["flex-direction"].indexOf("row"),
						E = d.offsetWidth > s.offsetWidth,
						G = d.offsetHeight > s.offsetHeight,
						H = (D ? (a.clientX - r.left) / y : (a.clientY - r.top) / z) > .5,
						J = d.nextElementSibling,
						K = k(w, g, s, e, d, r);
					if (K !== !1) {
						if (R = !0, setTimeout(m, 30), b(o), 1 === K || -1 === K) q = 1 === K;
						else if (D) {
							var M = s.offsetTop,
								N = d.offsetTop;
							q = M === N ? d.previousElementSibling === s && !E || H && E : N > M
						} else q = J !== s && !G || H && G;
						s.contains(g) || (q && !J ? g.appendChild(s) : d.parentNode.insertBefore(s, q ? J : d)), t = s.parentNode, this._animate(e, s), this._animate(r, d)
					}
				}
			}
		},
		_animate: function(a, b) {
			var c = this.options.animation;
			if (c) {
				var d = b.getBoundingClientRect();
				h(b, "transition", "none"), h(b, "transform", "translate3d(" + (a.left - d.left) + "px," + (a.top - d.top) + "px,0)"), b.offsetWidth, h(b, "transition", "all " + c + "ms"), h(b, "transform", "translate3d(0,0,0)"), clearTimeout(b.animated), b.animated = setTimeout(function() {
					h(b, "transition", ""), h(b, "transform", ""), b.animated = !1
				}, c)
			}
		},
		_offUpEvents: function() {
			var a = this.el.ownerDocument;
			f(N, "touchmove", this._onTouchMove), f(a, "mouseup", this._onDrop), f(a, "touchend", this._onDrop), f(a, "touchcancel", this._onDrop)
		},
		_onDrop: function(b) {
			var c = this.el,
				d = this.options;
			clearInterval(this._loopId), clearInterval(J.pid), clearTimeout(this._dragStartTimer), f(N, "mousemove", this._onTouchMove), this.nativeDraggable && (f(N, "drop", this), f(c, "dragstart", this._onDragStart)), this._offUpEvents(), b && (I && (b.preventDefault(), !d.dropBubble && b.stopPropagation()), u && u.parentNode.removeChild(u), s && (this.nativeDraggable && f(s, "dragend", this), l(s), g(s, this.options.ghostClass, !1), g(s, this.options.chosenClass, !1), w !== t ? (E = p(s), E >= 0 && (j(null, t, "sort", s, w, D, E), j(this, w, "sort", s, w, D, E), j(null, t, "add", s, w, D, E), j(this, w, "remove", s, w, D, E))) : (v && v.parentNode.removeChild(v), s.nextSibling !== x && (E = p(s), E >= 0 && (j(this, w, "update", s, w, D, E), j(this, w, "sort", s, w, D, E)))), a.active && ((null === E || -1 === E) && (E = D), j(this, w, "end", s, w, D, E), this.save())), w = s = t = u = x = v = y = z = G = H = I = E = A = B = F = a.active = null)
		},
		handleEvent: function(a) {
			var b = a.type;
			"dragover" === b || "dragenter" === b ? s && (this._onDragOver(a), d(a)) : ("drop" === b || "dragend" === b) && this._onDrop(a)
		},
		toArray: function() {
			for (var a, b = [], d = this.el.children, e = 0, f = d.length, g = this.options; f > e; e++) a = d[e], c(a, g.draggable, this.el) && b.push(a.getAttribute(g.dataIdAttr) || o(a));
			return b
		},
		sort: function(a) {
			var b = {},
				d = this.el;
			this.toArray().forEach(function(a, e) {
				var f = d.children[e];
				c(f, this.options.draggable, d) && (b[a] = f)
			}, this), a.forEach(function(a) {
				b[a] && (d.removeChild(b[a]), d.appendChild(b[a]))
			})
		},
		save: function() {
			var a = this.options.store;
			a && a.set(this)
		},
		closest: function(a, b) {
			return c(a, b || this.options.draggable, this.el)
		},
		option: function(a, b) {
			var c = this.options;
			return void 0 === b ? c[a] : (c[a] = b, void("group" === a && V(c)))
		},
		destroy: function() {
			var a = this.el;
			a[L] = null, f(a, "mousedown", this._onTapStart), f(a, "touchstart", this._onTapStart), this.nativeDraggable && (f(a, "dragover", this), f(a, "dragenter", this)), Array.prototype.forEach.call(a.querySelectorAll("[draggable]"), function(a) {
				a.removeAttribute("draggable")
			}), T.splice(T.indexOf(this._onDragOver), 1), this._onDrop(), this.el = a = null
		}
	}, a.utils = {
		on: e,
		off: f,
		css: h,
		find: i,
		is: function(a, b) {
			return !!c(a, b, a)
		},
		extend: r,
		throttle: q,
		closest: c,
		toggleClass: g,
		index: p
	}, a.create = function(b, c) {
		return new a(b, c)
	}, a.version = "1.4.1", a
}), function(a) {
	"use strict";
	"function" == typeof define && define.amd ? define(["angular", "./Sortable"], a) : "function" == typeof require && "object" == typeof exports && "object" == typeof module ? (require("angular"), a(angular, require("./Sortable")), module.exports = "ng-sortable") : window.angular && window.Sortable && a(angular, Sortable)
}(function(a, b) {
	"use strict";
	var c = "Sortable:ng-sortable";
	a.module("ng-sortable", []).constant("ngSortableVersion", "0.4.0").constant("ngSortableConfig", {}).directive("ngSortable", ["$parse", "ngSortableConfig", function(d, e) {
		var f, g, h = function(a, b) {
				var c = [].filter.call(a.childNodes, function(a) {
					return 8 === a.nodeType && -1 !== a.nodeValue.indexOf("ngRepeat:")
				})[0];
				if (!c) return function() {
					return null
				};
				c = c.nodeValue.match(/ngRepeat:\s*(?:\(.*?,\s*)?([^\s)]+)[\s)]+in\s+([^\s|]+)/);
				var e = d(c[2]);
				return function() {
					return e(b.$parent) || []
				}
			};
		return {
			restrict: "AC",
			scope: {
				ngSortable: "=?"
			},
			link: function(d, i) {
				function j(a, b) {
					var c = "on" + a.type.charAt(0).toUpperCase() + a.type.substr(1),
						d = p();
					n[c] && n[c]({
						model: b || d[a.newIndex],
						models: d,
						oldIndex: a.oldIndex,
						newIndex: a.newIndex
					})
				}
				function k(e) {
					var h = p();
					if (h) {
						var i = e.oldIndex,
							j = e.newIndex;
						if (m !== e.from) {
							var k = e.from[c]();
							f = k[i], e.clone ? (f = a.copy(f), k.splice(b.utils.index(e.clone), 0, k.splice(i, 1)[0]), e.from.removeChild(e.clone)) : k.splice(i, 1), h.splice(j, 0, f), e.from.insertBefore(e.item, g)
						} else h.splice(j, 0, h.splice(i, 1)[0]);
						d.$apply()
					}
				}
				var l, m = i[0],
					n = a.extend(d.ngSortable || {}, e),
					o = [],
					p = h(m, d);
				m[c] = p, l = b.create(m, Object.keys(n).reduce(function(a, b) {
					return a[b] = a[b] || n[b], a
				}, {
					onStart: function(a) {
						g = a.item.nextSibling, j(a), d.$apply()
					},
					onEnd: function(a) {
						j(a, f), d.$apply()
					},
					onAdd: function(a) {
						k(a), j(a, f), d.$apply()
					},
					onUpdate: function(a) {
						k(a), j(a)
					},
					onRemove: function(a) {
						j(a, f)
					},
					onSort: function(a) {
						j(a)
					}
				})), i.on("$destroy", function() {
					a.forEach(o, function(a) {
						a()
					}), l.destroy(), m[c] = null, m = null, o = null, l = null, g = null
				}), a.forEach(["sort", "disabled", "delay", "draggable", "handle", "animation", "group", "ghostClass", "chosenClass", "fallbackClass", "filter", "onStart", "onEnd", "onAdd", "onUpdate", "onRemove", "onSort"], function(a) {
					o.push(d.$watch("ngSortable." + a, function(b) {
						void 0 !== b && (n[a] = b, /^on[A-Z]/.test(a) || l.option(a, b))
					}))
				})
			}
		}
	}])
}), function(a, b) {
	function c(a) {
		return a.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
	}
	function d(a) {
		return e ? e + a : a.toLowerCase()
	}
	var e, f, g, h, i, j, k, l, m, n, o = "",
		p = {
			Webkit: "webkit",
			Moz: "",
			O: "o"
		},
		q = document.createElement("div"),
		r = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
		s = {};
	a.each(p, function(a, c) {
		return q.style[a + "TransitionProperty"] !== b ? (o = "-" + a.toLowerCase() + "-", e = c, !1) : void 0
	}), f = o + "transform", s[g = o + "transition-property"] = s[h = o + "transition-duration"] = s[j = o + "transition-delay"] = s[i = o + "transition-timing-function"] = s[k = o + "animation-name"] = s[l = o + "animation-duration"] = s[n = o + "animation-delay"] = s[m = o + "animation-timing-function"] = "", a.fx = {
		off: e === b && q.style.transitionProperty === b,
		speeds: {
			_default: 400,
			fast: 200,
			slow: 600
		},
		cssPrefix: o,
		transitionEnd: d("TransitionEnd"),
		animationEnd: d("AnimationEnd")
	}, a.fn.animate = function(c, d, e, f, g) {
		return a.isFunction(d) && (f = d, e = b, d = b), a.isFunction(e) && (f = e, e = b), a.isPlainObject(d) && (e = d.easing, f = d.complete, g = d.delay, d = d.duration), d && (d = ("number" == typeof d ? d : a.fx.speeds[d] || a.fx.speeds._default) / 1e3), g && (g = parseFloat(g) / 1e3), this.anim(c, d, e, f, g)
	}, a.fn.anim = function(d, e, o, p, q) {
		var t, u, v, w = {},
			x = "",
			y = this,
			z = a.fx.transitionEnd,
			A = !1;
		if (e === b && (e = a.fx.speeds._default / 1e3), q === b && (q = 0), a.fx.off && (e = 0), "string" == typeof d) w[k] = d, w[l] = e + "s", w[n] = q + "s", w[m] = o || "linear", z = a.fx.animationEnd;
		else {
			u = [];
			for (t in d) r.test(t) ? x += t + "(" + d[t] + ") " : (w[t] = d[t], u.push(c(t)));
			x && (w[f] = x, u.push(f)), e > 0 && "object" == typeof d && (w[g] = u.join(", "), w[h] = e + "s", w[j] = q + "s", w[i] = o || "linear")
		}
		return v = function(b) {
			if ("undefined" != typeof b) {
				if (b.target !== b.currentTarget) return;
				a(b.target).unbind(z, v)
			} else a(this).unbind(z, v);
			A = !0, a(this).css(s), p && p.call(this)
		}, e > 0 && (this.bind(z, v), setTimeout(function() {
			A || v.call(y)
		}, 1e3 * (e + q) + 25)), this.size() && this.get(0).clientLeft, this.css(w), 0 >= e && setTimeout(function() {
			y.each(function() {
				v.call(this)
			})
		}, 0), this
	}, q = null
}(Zepto);
var ANI = {
	aniTime: 250,
	animate: function(a, b, c, d) {
		d = d || ANI.aniTime, $(b).css({
			"animation-duration": d + "ms",
			"-webkit-animation-duration": d + "ms"
		}).addClass("animated " + a), setTimeout(function() {
			$(b).css({
				"animation-duration": "",
				"-webkit-animation-duration": ""
			}).removeClass("animated " + a), c && "function" == typeof c && c()
		}, d)
	},
	slideInRight: function(a, b) {
		$(a).css("-webkit-transform", "translate3d(100%,0,0)").animate({
			translate3d: "0,0,0"
		}, ANI.aniTime, function() {
			$(a).css({
				"-webkit-transform": ""
			}), b && "function" == typeof b && b()
		})
	},
	slideInLeft: function(a, b) {
		$(a).css("-webkit-transform", "translate3d(-100%,0,0)").animate({
			translate3d: "0,0,0"
		}, ANI.aniTime, function() {
			$(a).css({
				"-webkit-transform": ""
			}), b && "function" == typeof b && b()
		})
	},
	slideInTop: function(a, b) {
		$(a).css("-webkit-transform", "translate3d(0,-100%,0)").animate({
			translate3d: "0,0,0"
		}, ANI.aniTime, function() {
			$(a).css({
				"-webkit-transform": ""
			}), b && "function" == typeof b && b()
		})
	},
	slideInBottom: function(a, b) {
		$(a).css("-webkit-transform", "translate3d(0,100%,0)").animate({
			translate3d: "0,0,0"
		}, ANI.aniTime, function() {
			$(a).css({
				"-webkit-transform": ""
			}), b && "function" == typeof b && b()
		})
	},
	slideOutLeft: function(a, b) {
		$(a).animate({
			translate3d: "-100%,0,0"
		}, ANI.aniTime, function() {
			$(a).css("-webkit-transform", ""), b && "function" == typeof b && b()
		})
	},
	slideOutRight: function(a, b) {
		$(a).animate({
			translate3d: "100%,0,0"
		}, ANI.aniTime, function() {
			$(a).css("-webkit-transform", ""), b && "function" == typeof b && b()
		})
	},
	slideOutTop: function(a, b) {
		$(a).animate({
			translate3d: "0,-100%,0"
		}, ANI.aniTime, function() {
			$(a).css("-webkit-transform", ""), b && "function" == typeof b && b()
		})
	},
	slideOutBottom: function(a, b) {
		$(a).animate({
			translate3d: "0,100%,0"
		}, ANI.aniTime, function() {
			$(a).css("-webkit-transform", ""), b && "function" == typeof b && b()
		})
	},
	bounceTop: function(a, b, c) {
		ANI.animate("bounceTop", a, b, c)
	},
	bounceBottom: function(a, b, c) {
		ANI.animate("bounceBottom", a, b, c)
	}
};
!
function(a) {
	a.atomuDatePicker = function(a) {
		this.globalSetting = {
			isSingleDay: !0
		}, this._defaults = {
			mod: "default",
			containerId: "",
			defaultDate: "",
			isSingleDay: !0,
			stopToday: !0,
			disableCss: "disabled",
			singleSelectedCss: "single-selected",
			firstCss: "first",
			lastCss: "last",
			selectCss: "selected",
			autoSubmit: !0,
			clickSubmit: !1,
			triggerId: "atomuDatePicker_popup_btn",
			callback: function(a) {
				return !0
			}
		}, this.opts = $.extend(this._defaults, a), this.globalSetting.isSingleDay = $.extend(this.globalSetting.isSingleDay, this.opts.isSingleDay);
		var b = "" === this.opts.defaultDate ? new Date : new Date(this.opts.defaultDate);
		this.year = b.getFullYear(), this.month = b.getMonth() + 1, this.date = b.getDate();
		var c = new Date((new Date).getTime() - 5184e5);
		this.startDate = this.formatDate([c.getFullYear(), c.getMonth() + 1, c.getDate()].join("-")), this.cursorMonth = this.month - 1, this.cursorYear = this.year, this.maskTmpl = '<div class="atomu-mask"></div>';
		var d = {
			"default": ['<div id="atomuDatePicker_popup_wrap" class="gui-calendar-wrap">', '<div id="atomuDatePicker_popup_btn" class="gui-calendar">', '<span id="atomuDatePicker_current_date"></span>', '<i class="gui-i calendar"></i>', "</div>", '<div class="gri-calendar-wrap" id="atomuDatePicker_popup_ctn" style="display:none;">', '<div class="gri-calendar">', '<div class="hd">', '<a id="atomuDatePicker_prev" href="javascript:;" class="trigger prev"></a>', '<h3 id="atomuDatePicker_current_month"></h3>', '<a id="atomuDatePicker_next" href="javascript:;" class="trigger next"></a>', "</div>", "<table>", "<thead>", "<tr>", "<th>SUN</th>", "<th>MON</th>", "<th>TUE</th>", "<th>WED</th>", "<th>THU</th>", "<th>FRI</th>", "<th>SAT</th>", "</tr>", "</thead>", '<tbody id="atomuDatePicker_panel">', "</tbody>", "</table>", '<div class="ft">', '<a id="atomuDatePicker_cancel" href="javascript:;">取消</a>', '<a id="atomuDatePicker_submit" class="sure" href="javascript:;">确定</a>', "</div>", "</div>", "</div>", "</div>"].join(""),
			fastclick: ['<div id="atomuDatePicker_popup_wrap" class="atomu-datepicker-wrap">', '<div class="atomu-datepicker" id="atomuDatePicker_popup_ctn" style="display:none;">', '<div class="hd">', '<a id="atomuDatePicker_prev" href="javascript:;" class="trigger prev"></a>', '<h3 id="atomuDatePicker_current_month"></h3>', '<a id="atomuDatePicker_next" href="javascript:;" class="trigger next"></a>', "</div>", "<table>", "<thead>", "<tr>", "<th>SUN</th>", "<th>MON</th>", "<th>TUE</th>", "<th>WED</th>", "<th>THU</th>", "<th>FRI</th>", "<th>SAT</th>", "</tr>", "</thead>", '<tbody id="atomuDatePicker_panel">', "</tbody>", "</table>", "</div>", "</div>"].join("")
		};
		$("#" + this.opts.containerId).length > 0 && 0 == $("#atomuDatePicker_popup_wrap").length && $("#" + this.opts.containerId).append(d[this.opts.mod]), this.fillDate(this.year, this.month - 1), $("#atomuDatePicker_current_date").length > 0 && $("#atomuDatePicker_current_date").html(this.getCurrentDate(!0)), $("#atomuDatePicker_current_month").html(this.formatDate([this.year, this.month].join("-"), !0)), this.init(), this.opts.autoSubmit && this.submit()
	}, a.atomuDatePicker.prototype.reload = function() {
		this.init(), $("#atomuDatePicker_current_date").length > 0 && $("#atomuDatePicker_current_date").html(this.getCurrentDate(!0))
	}, a.atomuDatePicker.prototype.init = function() {
		var a = this,
			b = $(".atomu-datepicker"),
			c = $(".atomu-mask"),
			d = {
				popup: function(e, f, g, h) {
					function i() {
						b.addClass("slideup"), c.remove(), setTimeout(function() {
							b.removeClass("slideup"), $("#" + g).removeClass(h), $("#" + f).hide()
						}, 350)
					}
					function j() {
						$("#" + g).addClass(h), $("#" + f).show(), b.addClass("slidedown"), $("body").append($(a.maskTmpl)), $(".atomu-mask").unbind("click").click(function() {
							d.hidePanel()
						}), setTimeout(function() {
							b.removeClass("slidedown")
						}, 350)
					}
					function k() {
						return $("#" + g).hasClass(h)
					}
					h = h || "open";
					$("#" + e).unbind("click").click(function() {
						k() ? i() : j()
					})
				},
				hidePanel: function() {
					b.addClass("slideup"), $(".atomu-mask").remove(), setTimeout(function() {
						b.removeClass("slideup"), $("#atomuDatePicker_popup_wrap").removeClass("open"), $("#atomuDatePicker_popup_ctn").hide()
					}, 350)
				}
			};
		d.popup(a.opts.triggerId, "atomuDatePicker_popup_ctn", "atomuDatePicker_popup_wrap"), $("#atomuDatePicker_prev").unbind("click").bind("click", function() {
			a.cursorMonth <= 0 ? (a.cursorYear--, a.cursorMonth = 11) : a.cursorMonth--;
			var b = new Date(new Date(a.cursorYear, a.cursorMonth, a.date).setMonth(a.cursorMonth));
			a.fillDate(b.getFullYear(), b.getMonth()), $("#atomuDatePicker_current_month").html(a.formatDate([b.getFullYear(), b.getMonth() + 1].join("-"), !0)), a.init()
		}), $("#atomuDatePicker_next").unbind("click").bind("click", function() {
			a.cursorMonth >= 11 ? (a.cursorYear++, a.cursorMonth = 0) : a.cursorMonth++;
			var b = new Date(new Date(a.cursorYear, a.cursorMonth, a.date).setMonth(a.cursorMonth));
			a.fillDate(b.getFullYear(), b.getMonth()), $("#atomuDatePicker_current_month").html(a.formatDate([b.getFullYear(), b.getMonth() + 1].join("-"), !0)), a.init()
		}), $("#atomuDatePicker_cancel").unbind("click").bind("click", function() {
			d.hidePanel()
		}), $("#atomuDatePicker_submit").unbind("click").bind("click", function() {
			d.hidePanel(), a.submit()
		}), this.initCss()
	}, a.atomuDatePicker.prototype.submit = function() {
		$("#atomuDatePicker_current_date").length > 0 && $("#atomuDatePicker_current_date").html(this.getCurrentDate(!0)), this.opts.callback(this.getCurrentDate())
	}, a.atomuDatePicker.prototype.fillDate = function(a, b, c) {
		$("#atomuDatePicker_panel").empty();
		var d = this,
			e = new Date(a, b, 1),
			f = new Date(a, b, 1),
			g = f.getDay();
		f.setDate(1 - g);
		var h = new Date(a, b + 1, 0),
			i = new Date(a, b + 1, 0);
		g = i.getDay(), i.setDate(i.getDate() + 6 - g);
		for (var j = document.createElement("tr"), k = f; k.getTime() <= i.getTime(); k.setDate(k.getDate() + 1)) 0 == k.getDay() && (j = document.createElement("tr")), td = document.createElement("td"), ymd = k.getFullYear() + "-" + (k.getMonth() + 1) + "-" + k.getDate(), $(td).attr("id", "atomuDatePicker_" + ymd), k.getTime() < e.getTime() || k.getTime() > h.getTime() ? $(td).attr("class", this.opts.disableCss) : this.opts.stopToday && k.getTime() > (new Date).getTime() ? $(td).attr("class", this.opts.disableCss) : (this.globalSetting.isSingleDay && ("" !== this.opts.defaultDate ? k.getDate() == c && k.getMonth() == b && k.getFullYear() == a && $(td).attr("class", d.opts.singleSelectedCss) : k.getDate() == d.date && k.getMonth() + 1 == d.month && k.getFullYear() == d.year && $(td).attr("class", d.opts.singleSelectedCss)), function(a) {
			$(td).bind("click", function() {
				return d.selectDate(a), !0
			})
		}(ymd)), div = document.createElement("div"), $(div).attr("class", "num").html(k.getDate()), $(td).append(div), $(j).append(td), 6 == k.getDay() && $("#atomuDatePicker_panel").append(j)
	}, a.atomuDatePicker.prototype.initCss = function() {
		var a = this;
		if (this.globalSetting.isSingleDay) $(".atomu-datepicker table tr td").removeClass(this.opts.selectCss).removeClass(this.opts.firstCss).removeClass(this.opts.lastCss), $("#atomuDatePicker_" + [a.year, a.month, a.date].join("-")).addClass(a.opts.singleSelectedCss);
		else {
			$(".atomu-datepicker table tr td").removeClass(a.opts.singleSelectedCss);
			var b = a.startDate.split("-"),
				c = new Date(b[0], 1 * b[1] - 1, b[2]);
			$("#atomuDatePicker_" + [a.year, a.month, a.date].join("-")).addClass(a.opts.lastCss), $("#atomuDatePicker_" + [c.getFullYear(), c.getMonth() + 1, c.getDate()].join("-")).addClass(a.opts.firstCss), i = 5;
			do {
				var d = new Date(new Date(a.year, a.month - 1, a.date).getTime() - 24 * i * 60 * 60 * 1e3);
				$("#atomuDatePicker_" + [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("-")).addClass(a.opts.selectCss), i--
			} while (i > 0)
		}
	}, a.atomuDatePicker.prototype.selectDate = function(a) {
		var b = this,
			c = a.split("-"),
			d = new Date(c[0], c[1] - 1, c[2]);
		this.year = d.getFullYear(), this.month = d.getMonth() + 1, this.date = d.getDate();
		var e = new Date(d.getTime() - 5184e5);
		if (this.startDate = this.formatDate([e.getFullYear(), e.getMonth() + 1, e.getDate()].join("-")), this.globalSetting.isSingleDay) $(".atomu-datepicker table tr td").removeClass(this.opts.singleSelectedCss), $("#atomuDatePicker_" + a).addClass(this.opts.singleSelectedCss);
		else {
			$(".atomu-datepicker table tr td").removeClass(this.opts.selectCss).removeClass(this.opts.firstCss).removeClass(this.opts.lastCss), $("#atomuDatePicker_" + a).addClass(this.opts.lastCss), $("#atomuDatePicker_" + [e.getFullYear(), e.getMonth() + 1, e.getDate()].join("-")).addClass(this.opts.firstCss), i = 5;
			do {
				var f = new Date(d.getTime() - 24 * i * 60 * 60 * 1e3);
				$("#atomuDatePicker_" + [f.getFullYear(), f.getMonth() + 1, f.getDate()].join("-")).addClass(this.opts.selectCss), i--
			} while (i > 0)
		}
		this.opts.clickSubmit && (!
		function() {
			$(".atomu-datepicker").addClass("slideup"), $(".atomu-mask").remove(), setTimeout(function() {
				$(".atomu-datepicker").removeClass("slideup"), $("#atomuDatePicker_popup_wrap").removeClass("open"), $("#atomuDatePicker_popup_ctn").hide()
			}, 350)
		}(), b.submit())
	}, a.atomuDatePicker.prototype.formatDate = function(a, b) {
		return b ? a.replace(/(\d{4})\-(\d{1,2})/g, function(a, b, c) {
			return 10 > c && (c = "0" + c), b + "-" + c
		}) : a.replace(/(\d{4})\-(\d{1,2})\-(\d{1,2})/g, function(a, b, c, d) {
			return 10 > c && (c = "0" + c), 10 > d && (d = "0" + d), b + "-" + c + "-" + d
		})
	}, a.atomuDatePicker.prototype.getCurrentDate = function(a) {
		var b = this,
			c = this.formatDate([this.year, this.month, this.date].join("-"));
		return this.globalSetting.isSingleDay ? c : function() {
			return a ? b.startDate + " 至 " + c : {
				startDate: b.startDate,
				endDate: c
			}
		}()
	}
}(this), function(a) {
	a.atomuMonthPicker = function(a) {
		this._defaults = {
			mod: "default",
			containerId: "",
			min: 1970,
			max: 2050,
			disableCss: "disabled",
			singleSelectedCss: "single-selected",
			firstCss: "first",
			lastCss: "last",
			selectCss: "selected",
			autoSubmit: !1,
			clickSubmit: !1,
			triggerId: "atomuMonthPicker_popup_btn",
			stopToday: !1,
			callback: function(a) {
				return !0
			}
		}, this.opts = $.extend(this._defaults, a), this.ids = {
			wrap: "atomuMonthPicker_popup_wrap",
			content: "atomuMonthPicker_popup_ctn",
			prev: "atomuMonthPicker_prev",
			next: "atomuMonthPicker_next",
			current: "atomuMonthPicker_current_year",
			panel: "atomuMonthPicker_panel",
			prefix: "atomuMonthPicker_"
		}, this.maskTmpl = '<div class="atomu-mask"></div>';
		var b = {
			"default": ['<div id="' + this.ids.wrap + '" class="atomu-datepicker-wrap">', '<div class="atomu-datepicker" id="' + this.ids.content + '" style="display:none;">', '<div class="hd">', '<a id="' + this.ids.prev + '" href="javascript:;" class="trigger prev"></a>', '<h3 id="' + this.ids.current + '"></h3>', '<a id="' + this.ids.next + '" href="javascript:;" class="trigger next"></a>', "</div>", '<table class="month">', '<tbody id="' + this.ids.panel + '">', "</tbody>", "</table>", "</div>", "</div>"].join("")
		};
		this.year = this.cursorYear = (new Date).getFullYear(), this.month = (new Date).getMonth() + 1, $("#" + this.opts.containerId).length > 0 && 0 == $("#" + this.ids.wrap).length && $("#" + this.opts.containerId).append(b[this.opts.mod]), this.fillDate((new Date).getFullYear(), (new Date).getMonth() + 1), $("#" + this.ids.current).length > 0 && $("#" + this.ids.current).html(this.year + "年"), this.init(), this.opts.autoSubmit && this.submit()
	}, a.atomuMonthPicker.prototype.init = function() {
		var a = this,
			b = $(".atomu-datepicker"),
			c = $(".atomu-mask"),
			d = {
				popup: function(e, f, g, h) {
					function i() {
						b.addClass("slideup"), c.remove(), setTimeout(function() {
							b.removeClass("slideup"), $("#" + g).removeClass(h), $("#" + f).hide()
						}, 350)
					}
					function j() {
						$("#" + g).addClass(h), $("#" + f).show(), b.addClass("slidedown"), $("body").append($(a.maskTmpl)), $(".atomu-mask").unbind("click").click(function() {
							d.hidePanel()
						}), setTimeout(function() {
							b.removeClass("slidedown")
						}, 350)
					}
					function k() {
						return $("#" + g).hasClass(h)
					}
					h = h || "open";
					$("#" + e).unbind("click").click(function() {
						k() ? i() : j()
					})
				},
				hidePanel: function() {
					b.addClass("slideup"), $(".atomu-mask").remove(), setTimeout(function() {
						b.removeClass("slideup"), $("#" + a.ids.wrap).removeClass("open"), $("#" + a.ids.content).hide()
					}, 350)
				}
			};
		d.popup(a.opts.triggerId, this.ids.content, this.ids.wrap), $("#" + this.ids.prev).unbind("click").bind("click", function() {
			a.handleSwitch("prev")
		}), $("#" + this.ids.next).unbind("click").bind("click", function() {
			a.handleSwitch("next")
		}), this.initCss()
	}, a.atomuMonthPicker.prototype.handleSwitch = function(a) {
		var b = this;
		switch (a) {
		case "next":
			if (b.cursorYear >= b.opts.max) return;
			b.cursorYear++, $("#" + b.ids.current).html(b.cursorYear + "年"), b.fillDate(b.cursorYear, b.month), b.init();
			break;
		case "prev":
			if (b.cursorYear <= b.opts.min) return;
			b.cursorYear--, $("#" + b.ids.current).html(b.cursorYear + "年"), b.fillDate(b.cursorYear, b.month), b.init()
		}
	}, a.atomuMonthPicker.prototype.initCss = function() {
		var a = this;
		$('.atomu-datepicker table[class="month"] tr td').removeClass(a.opts.singleSelectedCss), $("#" + a.ids.prefix + [a.year, a.month].join("-")).addClass(a.opts.singleSelectedCss), a.cursorYear == (new Date).getFullYear() ? ($("#" + a.ids.next).addClass("disabled"), $("#" + a.ids.next).unbind("click")) : $("#" + a.ids.next).removeClass("disabled").unbind("click").bind("click", function() {
			a.handleSwitch("next")
		})
	}, a.atomuMonthPicker.prototype.fillDate = function(a, b) {
		$("#" + this.ids.panel).empty();
		for (var c = this, d = 1; 12 >= d; d++) {
			if (d % 4 == 1) var e = document.createElement("tr");
			var f = document.createElement("td");
			$(f).attr("id", this.ids.prefix + a + "-" + d), this.opts.stopToday && d > b ? $(f).attr("class", this.opts.disableCss) : !
			function(a) {
				$(f).bind("click", function() {
					return c.selectMonth(a), !0
				})
			}(a + "-" + d), div = document.createElement("div"), $(div).attr("class", "num").html(d + "月"), $(f).append(div), $(e).append(f), d % 4 == 0 && $("#" + c.ids.panel).append(e)
		}
	}, a.atomuMonthPicker.prototype.selectMonth = function(a) {
		var b = this;
		$('.atomu-datepicker table[class="month"] tr td').removeClass(this.opts.singleSelectedCss), $("#" + this.ids.prefix + a).addClass(this.opts.singleSelectedCss);
		var c = a.split("-");
		this.year = c[0], this.month = c[1], this.opts.clickSubmit && (!
		function() {
			$(".atomu-datepicker").addClass("slideup"), $(".atomu-mask").remove(), setTimeout(function() {
				$(".atomu-datepicker").removeClass("slideup"), $("#" + b.ids.wrap).removeClass("open"), $("#" + b.ids.content).hide()
			}, 350)
		}(), b.submit())
	}, a.atomuMonthPicker.prototype.submit = function() {
		this.opts.callback(this.getCurrentMonth())
	}, a.atomuMonthPicker.prototype.getCurrentMonth = function() {
		var a = [this.year, this.month].join("-");
		return a.replace(/(\d{4})\-(\d{1,2})/g, function(a, b, c) {
			return 10 > c && (c = "0" + c), b + "-" + c
		})
	}
}(this), function(a) {
	a.atomuDialog = function(a, b) {
		this._defaults = {
			mod: "default",
			hideTitle: !1,
			title: "温馨提示",
			content: "",
			width: "100%",
			position: 1,
			hideBtn: !1,
			singleBtn: !1,
			buttonText: {
				txt1: "",
				txt2: ""
			},
			buttonHandle: {
				handle1: null,
				handle2: null
			},
			autoMask: !0,
			extra: {}
		}, this._opts = $.extend(this._defaults, a), b && $.isFunction(b) && (this._opts.buttonHandle.handle2 = b);
		var c = (new Date).getTime();
		this.ids = {
			winid: "atomuDialog_window_" + c,
			cancle: "atomuDialog_cancle_btn_" + c,
			submit: "atomuDialog_submit_btn_" + c,
			mask: "atomuDialog_mask_div_" + c
		};
		var d = {
			"default": ['<div class="dialog-center">', this._opts.content, "</div>"],
			warning: ['<div class="gui-validate">', "<p>", '<i class="gui-i"></i>' + this._opts.content, "</p>", "</div>"],
			succ: ['<div class="gui-validate success">', "<p>", '<i class="gui-i"></i>' + this._opts.content, "</p>", "</div>"]
		},
			e = ['<div class="atomu-dialog" id="' + this.ids.winid + '" style="display:none;">', '<h3 class="hd" style="display:' + (this._opts.hideTitle ? "none;" : "block;") + '">', this._opts.title, "</h3>", '<div class="bd">', d[this._opts.mod].join(""), "</div>", '<div class="ft" style="display:' + (this._opts.hideBtn ? "none;" : "block;") + '">', this._opts.singleBtn ? "" : '<button id="' + this.ids.cancle + '" class="btn">' + (this._opts.buttonText.txt2 || "取消") + "</button>", '<button id="' + this.ids.submit + '" class="btn primary">' + (this._opts.buttonText.txt1 || "确定") + "</button>", "</div>", "</div>"],
			f = '<div id="' + this.ids.mask + '" class="atomu-mask"></div>';
		$(e.join("") + (this._opts.autoMask ? f : "")).appendTo("body"), this.init()
	}, a.atomuDialog.prototype.init = function() {
		var a = this;
		$("#" + this.ids.winid).show(), this.adjustPos(), $("#" + this.ids.cancle).length > 0 &&
		function() {
			$("#" + a.ids.cancle).on("click", function() {
				$.isFunction(a._opts.buttonHandle.handle1) && a._opts.buttonHandle.handle1(), a.closeDialog()
			})
		}(), $("#" + this.ids.submit).length > 0 &&
		function() {
			$("#" + a.ids.submit).on("click", function() {
				$.isFunction(a._opts.buttonHandle.handle2) && a._opts.buttonHandle.handle2(), a.closeDialog()
			})
		}(), this._opts.hideBtn && $(".atomu-mask").unbind("click").bind("click", function() {
			a.closeDialog()
		})
	}, a.atomuDialog.prototype.adjustPos = function() {
		$("#" + this.ids.winid).length > 0 && $("#" + this.ids.winid).css({
			width: this._opts.width
		});
		var a = ($(window).width() - $("#" + this.ids.winid).width()) / 2;
		($(window).height() - $("#" + this.ids.winid).height()) / 2;
		atomuDialog.POSITION.mediation == this._opts.position ? $("#" + this.ids.winid).css({
			top: "30%",
			left: a + "px"
		}) : atomuDialog.POSITION.top == this._opts.position && $("#" + this.ids.winid).css({
			top: "44px",
			left: a + "px"
		})
	}, a.atomuDialog.prototype.closeDialog = function() {
		var a = this;
		a._opts.autoMask && $("#" + a.ids.mask).remove(), $("#" + a.ids.winid).remove()
	}, a.atomuDialog.POSITION = {
		mediation: 2,
		top: 1
	}
}(window), function(a, b, c, d) {
	"use strict";

	function e(a, b, c) {
		return setTimeout(k(a, c), b)
	}
	function f(a, b, c) {
		return Array.isArray(a) ? (g(a, c[b], c), !0) : !1
	}
	function g(a, b, c) {
		var e;
		if (a) if (a.forEach) a.forEach(b, c);
		else if (a.length !== d) for (e = 0; e < a.length;) b.call(c, a[e], e, a), e++;
		else for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a)
	}
	function h(a, b, c) {
		for (var e = Object.keys(b), f = 0; f < e.length;)(!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;
		return a
	}
	function i(a, b) {
		return h(a, b, !0)
	}
	function j(a, b, c) {
		var d, e = b.prototype;
		d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && h(d, c)
	}
	function k(a, b) {
		return function() {
			return a.apply(b, arguments)
		}
	}
	function l(a, b) {
		return typeof a == ka ? a.apply(b ? b[0] || d : d, b) : a
	}
	function m(a, b) {
		return a === d ? b : a
	}
	function n(a, b, c) {
		g(r(b), function(b) {
			a.addEventListener(b, c, !1)
		})
	}
	function o(a, b, c) {
		g(r(b), function(b) {
			a.removeEventListener(b, c, !1)
		})
	}
	function p(a, b) {
		for (; a;) {
			if (a == b) return !0;
			a = a.parentNode
		}
		return !1
	}
	function q(a, b) {
		return a.indexOf(b) > -1
	}
	function r(a) {
		return a.trim().split(/\s+/g)
	}
	function s(a, b, c) {
		if (a.indexOf && !c) return a.indexOf(b);
		for (var d = 0; d < a.length;) {
			if (c && a[d][c] == b || !c && a[d] === b) return d;
			d++
		}
		return -1
	}
	function t(a) {
		return Array.prototype.slice.call(a, 0)
	}
	function u(a, b, c) {
		for (var d = [], e = [], f = 0; f < a.length;) {
			var g = b ? a[f][b] : a[f];
			s(e, g) < 0 && d.push(a[f]), e[f] = g, f++
		}
		return c && (d = b ? d.sort(function(a, c) {
			return a[b] > c[b]
		}) : d.sort()), d
	}
	function v(a, b) {
		for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ia.length;) {
			if (c = ia[g], e = c ? c + f : b, e in a) return e;
			g++
		}
		return d
	}
	function w() {
		return oa++
	}
	function x(a) {
		var b = a.ownerDocument;
		return b.defaultView || b.parentWindow
	}
	function y(a, b) {
		var c = this;
		this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function(b) {
			l(a.options.enable, [a]) && c.handler(b)
		}, this.init()
	}
	function z(a) {
		var b, c = a.options.inputClass;
		return new(b = c ? c : ra ? N : sa ? Q : qa ? S : M)(a, A)
	}
	function A(a, b, c) {
		var d = c.pointers.length,
			e = c.changedPointers.length,
			f = b & ya && d - e === 0,
			g = b & (Aa | Ba) && d - e === 0;
		c.isFirst = !! f, c.isFinal = !! g, f && (a.session = {}), c.eventType = b, B(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c
	}
	function B(a, b) {
		var c = a.session,
			d = b.pointers,
			e = d.length;
		c.firstInput || (c.firstInput = E(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = E(b) : 1 === e && (c.firstMultiple = !1);
		var f = c.firstInput,
			g = c.firstMultiple,
			h = g ? g.center : f.center,
			i = b.center = F(d);
		b.timeStamp = na(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = J(h, i), b.distance = I(h, i), C(c, b), b.offsetDirection = H(b.deltaX, b.deltaY), b.scale = g ? L(g.pointers, d) : 1, b.rotation = g ? K(g.pointers, d) : 0, D(c, b);
		var j = a.element;
		p(b.srcEvent.target, j) && (j = b.srcEvent.target), b.target = j
	}
	function C(a, b) {
		var c = b.center,
			d = a.offsetDelta || {},
			e = a.prevDelta || {},
			f = a.prevInput || {};
		(b.eventType === ya || f.eventType === Aa) && (e = a.prevDelta = {
			x: f.deltaX || 0,
			y: f.deltaY || 0
		}, d = a.offsetDelta = {
			x: c.x,
			y: c.y
		}), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y)
	}
	function D(a, b) {
		var c, e, f, g, h = a.lastInterval || b,
			i = b.timeStamp - h.timeStamp;
		if (b.eventType != Ba && (i > xa || h.velocity === d)) {
			var j = h.deltaX - b.deltaX,
				k = h.deltaY - b.deltaY,
				l = G(i, j, k);
			e = l.x, f = l.y, c = ma(l.x) > ma(l.y) ? l.x : l.y, g = H(j, k), a.lastInterval = b
		} else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;
		b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g
	}
	function E(a) {
		for (var b = [], c = 0; c < a.pointers.length;) b[c] = {
			clientX: la(a.pointers[c].clientX),
			clientY: la(a.pointers[c].clientY)
		}, c++;
		return {
			timeStamp: na(),
			pointers: b,
			center: F(b),
			deltaX: a.deltaX,
			deltaY: a.deltaY
		}
	}
	function F(a) {
		var b = a.length;
		if (1 === b) return {
			x: la(a[0].clientX),
			y: la(a[0].clientY)
		};
		for (var c = 0, d = 0, e = 0; b > e;) c += a[e].clientX, d += a[e].clientY, e++;
		return {
			x: la(c / b),
			y: la(d / b)
		}
	}
	function G(a, b, c) {
		return {
			x: b / a || 0,
			y: c / a || 0
		}
	}
	function H(a, b) {
		return a === b ? Ca : ma(a) >= ma(b) ? a > 0 ? Da : Ea : b > 0 ? Fa : Ga
	}
	function I(a, b, c) {
		c || (c = Ka);
		var d = b[c[0]] - a[c[0]],
			e = b[c[1]] - a[c[1]];
		return Math.sqrt(d * d + e * e)
	}
	function J(a, b, c) {
		c || (c = Ka);
		var d = b[c[0]] - a[c[0]],
			e = b[c[1]] - a[c[1]];
		return 180 * Math.atan2(e, d) / Math.PI
	}
	function K(a, b) {
		return J(b[1], b[0], La) - J(a[1], a[0], La)
	}
	function L(a, b) {
		return I(b[0], b[1], La) / I(a[0], a[1], La)
	}
	function M() {
		this.evEl = Na, this.evWin = Oa, this.allow = !0, this.pressed = !1, y.apply(this, arguments)
	}
	function N() {
		this.evEl = Ra, this.evWin = Sa, y.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
	}
	function O() {
		this.evTarget = Ua, this.evWin = Va, this.started = !1, y.apply(this, arguments)
	}
	function P(a, b) {
		var c = t(a.touches),
			d = t(a.changedTouches);
		return b & (Aa | Ba) && (c = u(c.concat(d), "identifier", !0)), [c, d]
	}
	function Q() {
		this.evTarget = Xa, this.targetIds = {}, y.apply(this, arguments)
	}
	function R(a, b) {
		var c = t(a.touches),
			d = this.targetIds;
		if (b & (ya | za) && 1 === c.length) return d[c[0].identifier] = !0, [c, c];
		var e, f, g = t(a.changedTouches),
			h = [],
			i = this.target;
		if (f = c.filter(function(a) {
			return p(a.target, i)
		}), b === ya) for (e = 0; e < f.length;) d[f[e].identifier] = !0, e++;
		for (e = 0; e < g.length;) d[g[e].identifier] && h.push(g[e]), b & (Aa | Ba) && delete d[g[e].identifier], e++;
		return h.length ? [u(f.concat(h), "identifier", !0), h] : void 0
	}
	function S() {
		y.apply(this, arguments);
		var a = k(this.handler, this);
		this.touch = new Q(this.manager, a), this.mouse = new M(this.manager, a)
	}
	function T(a, b) {
		this.manager = a, this.set(b)
	}
	function U(a) {
		if (q(a, bb)) return bb;
		var b = q(a, cb),
			c = q(a, db);
		return b && c ? cb + " " + db : b || c ? b ? cb : db : q(a, ab) ? ab : _a
	}
	function V(a) {
		this.id = w(), this.manager = null, this.options = i(a || {}, this.defaults), this.options.enable = m(this.options.enable, !0), this.state = eb, this.simultaneous = {}, this.requireFail = []
	}
	function W(a) {
		return a & jb ? "cancel" : a & hb ? "end" : a & gb ? "move" : a & fb ? "start" : ""
	}
	function X(a) {
		return a == Ga ? "down" : a == Fa ? "up" : a == Da ? "left" : a == Ea ? "right" : ""
	}
	function Y(a, b) {
		var c = b.manager;
		return c ? c.get(a) : a
	}
	function Z() {
		V.apply(this, arguments)
	}
	function $() {
		Z.apply(this, arguments), this.pX = null, this.pY = null
	}
	function _() {
		Z.apply(this, arguments)
	}
	function aa() {
		V.apply(this, arguments), this._timer = null, this._input = null
	}
	function ba() {
		Z.apply(this, arguments)
	}
	function ca() {
		Z.apply(this, arguments)
	}
	function da() {
		V.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
	}
	function ea(a, b) {
		return b = b || {}, b.recognizers = m(b.recognizers, ea.defaults.preset), new fa(a, b)
	}
	function fa(a, b) {
		b = b || {}, this.options = i(b, ea.defaults), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = a, this.input = z(this), this.touchAction = new T(this, this.options.touchAction), ga(this, !0), g(b.recognizers, function(a) {
			var b = this.add(new a[0](a[1]));
			a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3])
		}, this)
	}
	function ga(a, b) {
		var c = a.element;
		g(a.options.cssProps, function(a, d) {
			c.style[v(c.style, d)] = b ? a : ""
		})
	}
	function ha(a, c) {
		var d = b.createEvent("Event");
		d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d)
	}
	var ia = ["", "webkit", "moz", "MS", "ms", "o"],
		ja = b.createElement("div"),
		ka = "function",
		la = Math.round,
		ma = Math.abs,
		na = Date.now,
		oa = 1,
		pa = /mobile|tablet|ip(ad|hone|od)|android/i,
		qa = "ontouchstart" in a,
		ra = v(a, "PointerEvent") !== d,
		sa = qa && pa.test(navigator.userAgent),
		ta = "touch",
		ua = "pen",
		va = "mouse",
		wa = "kinect",
		xa = 25,
		ya = 1,
		za = 2,
		Aa = 4,
		Ba = 8,
		Ca = 1,
		Da = 2,
		Ea = 4,
		Fa = 8,
		Ga = 16,
		Ha = Da | Ea,
		Ia = Fa | Ga,
		Ja = Ha | Ia,
		Ka = ["x", "y"],
		La = ["clientX", "clientY"];
	y.prototype = {
		handler: function() {},
		init: function() {
			this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(x(this.element), this.evWin, this.domHandler)
		},
		destroy: function() {
			this.evEl && o(this.element, this.evEl, this.domHandler), this.evTarget && o(this.target, this.evTarget, this.domHandler), this.evWin && o(x(this.element), this.evWin, this.domHandler)
		}
	};
	var Ma = {
		mousedown: ya,
		mousemove: za,
		mouseup: Aa
	},
		Na = "mousedown",
		Oa = "mousemove mouseup";
	j(M, y, {
		handler: function(a) {
			var b = Ma[a.type];
			b & ya && 0 === a.button && (this.pressed = !0), b & za && 1 !== a.which && (b = Aa), this.pressed && this.allow && (b & Aa && (this.pressed = !1), this.callback(this.manager, b, {
				pointers: [a],
				changedPointers: [a],
				pointerType: va,
				srcEvent: a
			}))
		}
	});
	var Pa = {
		pointerdown: ya,
		pointermove: za,
		pointerup: Aa,
		pointercancel: Ba,
		pointerout: Ba
	},
		Qa = {
			2: ta,
			3: ua,
			4: va,
			5: wa
		},
		Ra = "pointerdown",
		Sa = "pointermove pointerup pointercancel";
	a.MSPointerEvent && (Ra = "MSPointerDown", Sa = "MSPointerMove MSPointerUp MSPointerCancel"), j(N, y, {
		handler: function(a) {
			var b = this.store,
				c = !1,
				d = a.type.toLowerCase().replace("ms", ""),
				e = Pa[d],
				f = Qa[a.pointerType] || a.pointerType,
				g = f == ta,
				h = s(b, a.pointerId, "pointerId");
			e & ya && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Aa | Ba) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, {
				pointers: b,
				changedPointers: [a],
				pointerType: f,
				srcEvent: a
			}), c && b.splice(h, 1))
		}
	});
	var Ta = {
		touchstart: ya,
		touchmove: za,
		touchend: Aa,
		touchcancel: Ba
	},
		Ua = "touchstart",
		Va = "touchstart touchmove touchend touchcancel";
	j(O, y, {
		handler: function(a) {
			var b = Ta[a.type];
			if (b === ya && (this.started = !0), this.started) {
				var c = P.call(this, a, b);
				b & (Aa | Ba) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, {
					pointers: c[0],
					changedPointers: c[1],
					pointerType: ta,
					srcEvent: a
				})
			}
		}
	});
	var Wa = {
		touchstart: ya,
		touchmove: za,
		touchend: Aa,
		touchcancel: Ba
	},
		Xa = "touchstart touchmove touchend touchcancel";
	j(Q, y, {
		handler: function(a) {
			var b = Wa[a.type],
				c = R.call(this, a, b);
			c && this.callback(this.manager, b, {
				pointers: c[0],
				changedPointers: c[1],
				pointerType: ta,
				srcEvent: a
			})
		}
	}), j(S, y, {
		handler: function(a, b, c) {
			var d = c.pointerType == ta,
				e = c.pointerType == va;
			if (d) this.mouse.allow = !1;
			else if (e && !this.mouse.allow) return;
			b & (Aa | Ba) && (this.mouse.allow = !0), this.callback(a, b, c)
		},
		destroy: function() {
			this.touch.destroy(), this.mouse.destroy()
		}
	});
	var Ya = v(ja.style, "touchAction"),
		Za = Ya !== d,
		$a = "compute",
		_a = "auto",
		ab = "manipulation",
		bb = "none",
		cb = "pan-x",
		db = "pan-y";
	T.prototype = {
		set: function(a) {
			a == $a && (a = this.compute()), Za && (this.manager.element.style[Ya] = a), this.actions = a.toLowerCase().trim()
		},
		update: function() {
			this.set(this.manager.options.touchAction)
		},
		compute: function() {
			var a = [];
			return g(this.manager.recognizers, function(b) {
				l(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()))
			}), U(a.join(" "))
		},
		preventDefaults: function(a) {
			if (!Za) {
				var b = a.srcEvent,
					c = a.offsetDirection;
				if (this.manager.session.prevented) return void b.preventDefault();
				var d = this.actions,
					e = q(d, bb),
					f = q(d, db),
					g = q(d, cb);
				return e || f && c & Ha || g && c & Ia ? this.preventSrc(b) : void 0
			}
		},
		preventSrc: function(a) {
			this.manager.session.prevented = !0, a.preventDefault()
		}
	};
	var eb = 1,
		fb = 2,
		gb = 4,
		hb = 8,
		ib = hb,
		jb = 16,
		kb = 32;
	V.prototype = {
		defaults: {},
		set: function(a) {
			return h(this.options, a), this.manager && this.manager.touchAction.update(), this
		},
		recognizeWith: function(a) {
			if (f(a, "recognizeWith", this)) return this;
			var b = this.simultaneous;
			return a = Y(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this
		},
		dropRecognizeWith: function(a) {
			return f(a, "dropRecognizeWith", this) ? this : (a = Y(a, this), delete this.simultaneous[a.id], this)
		},
		requireFailure: function(a) {
			if (f(a, "requireFailure", this)) return this;
			var b = this.requireFail;
			return a = Y(a, this), -1 === s(b, a) && (b.push(a), a.requireFailure(this)), this
		},
		dropRequireFailure: function(a) {
			if (f(a, "dropRequireFailure", this)) return this;
			a = Y(a, this);
			var b = s(this.requireFail, a);
			return b > -1 && this.requireFail.splice(b, 1), this
		},
		hasRequireFailures: function() {
			return this.requireFail.length > 0
		},
		canRecognizeWith: function(a) {
			return !!this.simultaneous[a.id]
		},
		emit: function(a) {
			function b(b) {
				c.manager.emit(c.options.event + (b ? W(d) : ""), a)
			}
			var c = this,
				d = this.state;
			hb > d && b(!0), b(), d >= hb && b(!0)
		},
		tryEmit: function(a) {
			return this.canEmit() ? this.emit(a) : void(this.state = kb)
		},
		canEmit: function() {
			for (var a = 0; a < this.requireFail.length;) {
				if (!(this.requireFail[a].state & (kb | eb))) return !1;
				a++
			}
			return !0
		},
		recognize: function(a) {
			var b = h({}, a);
			return l(this.options.enable, [this, b]) ? (this.state & (ib | jb | kb) && (this.state = eb), this.state = this.process(b), void(this.state & (fb | gb | hb | jb) && this.tryEmit(b))) : (this.reset(), void(this.state = kb))
		},
		process: function(a) {},
		getTouchAction: function() {},
		reset: function() {}
	}, j(Z, V, {
		defaults: {
			pointers: 1
		},
		attrTest: function(a) {
			var b = this.options.pointers;
			return 0 === b || a.pointers.length === b
		},
		process: function(a) {
			var b = this.state,
				c = a.eventType,
				d = b & (fb | gb),
				e = this.attrTest(a);
			return d && (c & Ba || !e) ? b | jb : d || e ? c & Aa ? b | hb : b & fb ? b | gb : fb : kb
		}
	}), j($, Z, {
		defaults: {
			event: "pan",
			threshold: 10,
			pointers: 1,
			direction: Ja
		},
		getTouchAction: function() {
			var a = this.options.direction,
				b = [];
			return a & Ha && b.push(db), a & Ia && b.push(cb), b
		},
		directionTest: function(a) {
			var b = this.options,
				c = !0,
				d = a.distance,
				e = a.direction,
				f = a.deltaX,
				g = a.deltaY;
			return e & b.direction || (b.direction & Ha ? (e = 0 === f ? Ca : 0 > f ? Da : Ea, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ca : 0 > g ? Fa : Ga, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction
		},
		attrTest: function(a) {
			return Z.prototype.attrTest.call(this, a) && (this.state & fb || !(this.state & fb) && this.directionTest(a))
		},
		emit: function(a) {
			this.pX = a.deltaX, this.pY = a.deltaY;
			var b = X(a.direction);
			b && this.manager.emit(this.options.event + b, a), this._super.emit.call(this, a)
		}
	}), j(_, Z, {
		defaults: {
			event: "pinch",
			threshold: 0,
			pointers: 2
		},
		getTouchAction: function() {
			return [bb]
		},
		attrTest: function(a) {
			return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & fb)
		},
		emit: function(a) {
			if (this._super.emit.call(this, a), 1 !== a.scale) {
				var b = a.scale < 1 ? "in" : "out";
				this.manager.emit(this.options.event + b, a)
			}
		}
	}), j(aa, V, {
		defaults: {
			event: "press",
			pointers: 1,
			time: 200,
			threshold: 5
		},
		getTouchAction: function() {
			return [_a]
		},
		process: function(a) {
			var b = this.options,
				c = a.pointers.length === b.pointers,
				d = a.distance < b.threshold,
				f = a.deltaTime > b.time;
			if (this._input = a, !d || !c || a.eventType & (Aa | Ba) && !f) this.reset();
			else if (a.eventType & ya) this.reset(), this._timer = e(function() {
				this.state = ib, this.tryEmit()
			}, b.time, this);
			else if (a.eventType & Aa) return ib;
			return kb
		},
		reset: function() {
			clearTimeout(this._timer)
		},
		emit: function(a) {
			this.state === ib && (a && a.eventType & Aa ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = na(), this.manager.emit(this.options.event, this._input)))
		}
	}), j(ba, Z, {
		defaults: {
			event: "rotate",
			threshold: 0,
			pointers: 2
		},
		getTouchAction: function() {
			return [bb]
		},
		attrTest: function(a) {
			return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & fb)
		}
	}), j(ca, Z, {
		defaults: {
			event: "swipe",
			threshold: 10,
			velocity: .65,
			direction: Ha | Ia,
			pointers: 1
		},
		getTouchAction: function() {
			return $.prototype.getTouchAction.call(this)
		},
		attrTest: function(a) {
			var b, c = this.options.direction;
			return c & (Ha | Ia) ? b = a.velocity : c & Ha ? b = a.velocityX : c & Ia && (b = a.velocityY), this._super.attrTest.call(this, a) && c & a.direction && a.distance > this.options.threshold && ma(b) > this.options.velocity && a.eventType & Aa
		},
		emit: function(a) {
			var b = X(a.direction);
			b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a)
		}
	}), j(da, V, {
		defaults: {
			event: "tap",
			pointers: 1,
			taps: 1,
			interval: 300,
			time: 250,
			threshold: 2,
			posThreshold: 10
		},
		getTouchAction: function() {
			return [ab]
		},
		process: function(a) {
			var b = this.options,
				c = a.pointers.length === b.pointers,
				d = a.distance < b.threshold,
				f = a.deltaTime < b.time;
			if (this.reset(), a.eventType & ya && 0 === this.count) return this.failTimeout();
			if (d && f && c) {
				if (a.eventType != Aa) return this.failTimeout();
				var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
					h = !this.pCenter || I(this.pCenter, a.center) < b.posThreshold;
				this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a;
				var i = this.count % b.taps;
				if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function() {
					this.state = ib, this.tryEmit()
				}, b.interval, this), fb) : ib
			}
			return kb
		},
		failTimeout: function() {
			return this._timer = e(function() {
				this.state = kb
			}, this.options.interval, this), kb
		},
		reset: function() {
			clearTimeout(this._timer)
		},
		emit: function() {
			this.state == ib && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
		}
	}), ea.VERSION = "2.0.4", ea.defaults = {
		domEvents: !1,
		touchAction: $a,
		enable: !0,
		inputTarget: null,
		inputClass: null,
		preset: [
			[ba,
			{
				enable: !1
			}],
			[_,
			{
				enable: !1
			}, ["rotate"]],
			[ca,
			{
				direction: Ha
			}],
			[$,
			{
				direction: Ha
			}, ["swipe"]],
			[da],
			[da,
			{
				event: "doubletap",
				taps: 2
			}, ["tap"]],
			[aa]
		],
		cssProps: {
			userSelect: "none",
			touchSelect: "none",
			touchCallout: "none",
			contentZooming: "none",
			userDrag: "none",
			tapHighlightColor: "rgba(0,0,0,0)"
		}
	};
	var lb = 1,
		mb = 2;
	fa.prototype = {
		set: function(a) {
			return h(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this
		},
		stop: function(a) {
			this.session.stopped = a ? mb : lb
		},
		recognize: function(a) {
			var b = this.session;
			if (!b.stopped) {
				this.touchAction.preventDefaults(a);
				var c, d = this.recognizers,
					e = b.curRecognizer;
				(!e || e && e.state & ib) && (e = b.curRecognizer = null);
				for (var f = 0; f < d.length;) c = d[f], b.stopped === mb || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (fb | gb | hb) && (e = b.curRecognizer = c), f++
			}
		},
		get: function(a) {
			if (a instanceof V) return a;
			for (var b = this.recognizers, c = 0; c < b.length; c++) if (b[c].options.event == a) return b[c];
			return null
		},
		add: function(a) {
			if (f(a, "add", this)) return this;
			var b = this.get(a.options.event);
			return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a
		},
		remove: function(a) {
			if (f(a, "remove", this)) return this;
			var b = this.recognizers;
			return a = this.get(a), b.splice(s(b, a), 1), this.touchAction.update(), this
		},
		on: function(a, b) {
			var c = this.handlers;
			return g(r(a), function(a) {
				c[a] = c[a] || [], c[a].push(b)
			}), this
		},
		off: function(a, b) {
			var c = this.handlers;
			return g(r(a), function(a) {
				b ? c[a].splice(s(c[a], b), 1) : delete c[a]
			}), this
		},
		emit: function(a, b) {
			this.options.domEvents && ha(a, b);
			var c = this.handlers[a] && this.handlers[a].slice();
			if (c && c.length) {
				b.type = a, b.preventDefault = function() {
					b.srcEvent.preventDefault()
				};
				for (var d = 0; d < c.length;) c[d](b), d++
			}
		},
		destroy: function() {
			this.element && ga(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
		}
	}, h(ea, {
		INPUT_START: ya,
		INPUT_MOVE: za,
		INPUT_END: Aa,
		INPUT_CANCEL: Ba,
		STATE_POSSIBLE: eb,
		STATE_BEGAN: fb,
		STATE_CHANGED: gb,
		STATE_ENDED: hb,
		STATE_RECOGNIZED: ib,
		STATE_CANCELLED: jb,
		STATE_FAILED: kb,
		DIRECTION_NONE: Ca,
		DIRECTION_LEFT: Da,
		DIRECTION_RIGHT: Ea,
		DIRECTION_UP: Fa,
		DIRECTION_DOWN: Ga,
		DIRECTION_HORIZONTAL: Ha,
		DIRECTION_VERTICAL: Ia,
		DIRECTION_ALL: Ja,
		Manager: fa,
		Input: y,
		TouchAction: T,
		TouchInput: Q,
		MouseInput: M,
		PointerEventInput: N,
		TouchMouseInput: S,
		SingleTouchInput: O,
		Recognizer: V,
		AttrRecognizer: Z,
		Tap: da,
		Pan: $,
		Swipe: ca,
		Pinch: _,
		Rotate: ba,
		Press: aa,
		on: n,
		off: o,
		each: g,
		merge: i,
		extend: h,
		inherit: j,
		bindFn: k,
		prefixed: v
	}), typeof define == ka && define.amd ? define(function() {
		return ea
	}) : "undefined" != typeof module && module.exports ? module.exports = ea : a[c] = ea
}(window, document, "Hammer"), angular.module("angular-gestures", []);
var HGESTURES = {
	hmDoubleTap: "doubletap",
	hmDragstart: "panstart",
	hmDrag: "pan",
	hmDragUp: "panup",
	hmDragDown: "pandown",
	hmDragLeft: "panleft",
	hmDragRight: "panright",
	hmDragend: "panend",
	hmPanstart: "panstart",
	hmPan: "pan",
	hmPanUp: "panup",
	hmPanDown: "pandown",
	hmPanLeft: "panleft",
	hmPanRight: "panright",
	hmPanend: "panend",
	hmHold: "press",
	hmPinch: "pinch",
	hmPinchIn: "pinchin",
	hmPinchOut: "pinchout",
	hmPress: "press",
	hmPressUp: "pressup",
	hmRelease: "release",
	hmRotate: "rotate",
	hmSwipe: "swipe",
	hmSwipeUp: "swipeup",
	hmSwipeDown: "swipedown",
	hmSwipeLeft: "swipeleft",
	hmSwipeRight: "swiperight",
	hmTap: "tap",
	hmTouch: "touch",
	hmTransformstart: "transformstart",
	hmTransform: "transform",
	hmTransformend: "transformend"
},
	VERBOSE = !1;
angular.forEach(HGESTURES, function(a, b) {
	angular.module("angular-gestures").directive(b, ["$parse", "$log", "$timeout", "hammerDefaultOpts", "$window", function(c, d, e, f, g) {
		return function(e, h, i) {
			var j;
			i.$observe(b, function(k) {
				var l = c(k),
					m = c(i[b + "Opts"])(g, {}),
					n = angular.copy(f);
				angular.extend(n, m), angular.isUndefined(h.hammertime) && (h.hammer = new Hammer.Manager(h[0], n), e.$on("$destroy", function() {
					h.hammer.off(a), h.hammer.destroy()
				})), j = function(b) {
					VERBOSE && d.debug("angular-gestures: ", a, b);
					var c = function() {
							var a = l(e, {
								$event: b
							});
							"function" == typeof a && a.call(e, b)
						};
					"$apply" === e.$root.$$phase || "$digest" === e.$root.$$phase ? c() : e.$apply(c)
				}, h.hammer.on(a, j)
			})
		}
	}])
}), angular.module("angular-gestures").provider("hammerDefaultOpts", function() {
	var a = {};
	this.set = function(b) {
		a = b
	}, this.$get = function() {
		return a
	}
});
var HighchartsAdapter = function() {
		function a(b, c) {
			var d, e;
			for (e in c) d = c[e], d && "object" == typeof d && d.constructor !== Array && "number" != typeof d.nodeType ? b[e] = a(b[e] || {}, d) : b[e] = c[e];
			return b
		}
		function b() {
			var b, c = arguments,
				d = {};
			for (b = 0; b < c.length; b++) d = a(d, c[b]);
			return d
		}
		function c(a, b) {
			return g.getComputedStyle(a).getPropertyValue(b)
		}
		var d, e, f, g = window,
			h = document,
			i = [],
			j = ["width", "height"];
		return d = Object.keys(j), e = Zepto.extend ||
		function() {
			return Object.append.apply(Object, arguments)
		}, f = {
			bind: function(a, b, c) {
				var d = this._highcharts_callbacks,
					e = d[a] || (d[a] = []);
				return e.push([b, c]), this
			},
			unbind: function(a, b) {
				var c;
				if (a) {
					if (c = this._highcharts_callbacks) if (b) {
						var d = c[a];
						if (!d) return this;
						for (var e = 0, f = d.length; f > e; e++) if (d[e] && b === d[e][0]) {
							d[e] = null;
							break
						}
						d.length || delete c[a]
					} else c[a] = []
				} else this._highcharts_callbacks = {};
				return this
			},
			trigger: function(a) {
				var b, c, d, e, f, g = 2;
				if (!(c = this._highcharts_callbacks)) return this;
				for (; g--;) if (d = g ? a : "all", b = c[d]) for (var h = 0, j = b.length; j > h; h++)(e = b[h]) ? (f = g ? i.slice.call(arguments, 1) : arguments, e[0].apply(e[1] || this, f)) : (b.splice(h, 1), h--, j--);
				return this
			}
		}, g.requestAnimFrame = function() {
			return g.requestAnimationFrame || g.webkitRequestAnimationFrame || g.mozRequestAnimationFrame || g.oRequestAnimationFrame || g.msRequestAnimationFrame ||
			function(a) {
				g.setTimeout(a, 1e3 / 60)
			}
		}(), ["width", "height"].forEach(function(a) {
			j[a] = function(b) {
				return parseInt(c(b, a), 10)
			}
		}), {
			init: function(a) {
				this.pathAnim = a
			},
			getScript: Zepto.getScript,
			inArray: function(a, b) {
				return b.indexOf ? b.indexOf(a) : i.indexOf.call(b, a)
			},
			adapterRun: function(a, b) {
				return ~d.indexOf(b) ? Zepto(a)[b]() : j[b](a)
			},
			grep: function(a, b) {
				return i.filter.call(a, b)
			},
			map: function(a, b) {
				for (var c = [], d = 0, e = a.length; e > d; d++) c[d] = b.call(a[d], a[d], d, a);
				return c
			},
			merge: function() {
				return b.apply(this, arguments)
			},
			offset: function(a) {
				return Zepto(a).offset()
			},
			addEvent: function(a, b, c) {
				a.addEventListener ? a = Zepto(a) : HighchartsAdapter._extend(a), a.bind(b, c)
			},
			removeEvent: function(a, b, c) {
				a.removeEventListener && (a = Zepto(a)), a.unbind && a.unbind(b, c)
			},
			fireEvent: function(a, b, c, d) {
				var f = {
					type: b,
					target: a
				};
				b = new Zepto.Event(b, f), b = e(b, c), b.preventDefault = function() {
					d = null
				}, (!a.trigger && a instanceof HTMLElement || a === h || a === g) && (a = Zepto(a)), a.trigger && a.trigger(b.type, b), d && d(b)
			},
			washMouseEvent: function(a) {
				return a
			},
			animate: function(a, b, c) {
				for (key in b)"d" !== key && a.attr(key, b[key])
			},
			stop: function(a) {},
			each: function(a, b) {
				for (var c = 0, d = a.length; d > c; c++) if (b.call(a[c], a[c], c, a) === !1) return c
			},
			_extend: function(a) {
				return a._highcharts_callbacks || e(a, f, {
					_highcharts_callbacks: {}
				}), a
			}
		}
	}();
!
function() {
	function a() {
		var a, b, c = arguments,
			d = {},
			e = function(a, b) {
				var c, d;
				"object" != typeof a && (a = {});
				for (d in b) b.hasOwnProperty(d) && (c = b[d], a[d] = c && "object" == typeof c && "[object Array]" !== Object.prototype.toString.call(c) && "renderTo" !== d && "number" != typeof c.nodeType ? e(a[d] || {}, c) : b[d]);
				return a
			};
		for (c[0] === !0 && (d = c[1], c = Array.prototype.slice.call(c, 2)), b = c.length, a = 0; b > a; a++) d = e(d, c[a]);
		return d
	}
	function b(a, b) {
		return parseInt(a, b || 10)
	}
	function c(a) {
		return "string" == typeof a
	}
	function d(a) {
		return a && "object" == typeof a
	}
	function e(a) {
		return "[object Array]" === Object.prototype.toString.call(a)
	}
	function f(a) {
		return "number" == typeof a
	}
	function g(a) {
		return ha.log(a) / ha.LN10
	}
	function h(a) {
		return ha.pow(10, a)
	}
	function i(a, b) {
		for (var c = a.length; c--;) if (a[c] === b) {
			a.splice(c, 1);
			break
		}
	}
	function j(a) {
		return a !== G && null !== a
	}
	function k(a, b, e) {
		var f, g;
		if (c(b)) j(e) ? a.setAttribute(b, e) : a && a.getAttribute && (g = a.getAttribute(b));
		else if (j(b) && d(b)) for (f in b) a.setAttribute(f, b[f]);
		return g
	}
	function l(a) {
		return e(a) ? a : [a]
	}
	function m(a, b) {
		ua && !Aa && b && b.opacity !== G && (b.filter = "alpha(opacity=" + 100 * b.opacity + ")"), Oa(a.style, b)
	}
	function n(a, b, c, d, e) {
		return a = fa.createElement(a), b && Oa(a, b), e && m(a, {
			padding: 0,
			border: Ja,
			margin: 0
		}), c && m(a, c), d && d.appendChild(a), a
	}
	function o(a, b) {
		var c = function() {
				return G
			};
		return c.prototype = new a, Oa(c.prototype, b), c
	}
	function p(a, b) {
		return Array((b || 2) + 1 - String(a).length).join(0) + a
	}
	function q(a) {
		return 6e4 * (S && S(a) || R || 0)
	}
	function r(a, b) {
		for (var c, d, e, f, g, h = "{", i = !1, j = []; - 1 !== (h = a.indexOf(h));) {
			if (c = a.slice(0, h), i) {
				for (d = c.split(":"), e = d.shift().split("."), g = e.length, c = b, f = 0; g > f; f++) c = c[e[f]];
				d.length && (d = d.join(":"), e = /\.([0-9])/, f = K.lang, g = void 0, /f$/.test(d) ? (g = (g = d.match(e)) ? g[1] : -1, null !== c && (c = ea.numberFormat(c, g, f.decimalPoint, d.indexOf(",") > -1 ? f.thousandsSep : ""))) : c = L(d, c))
			}
			j.push(c), a = a.slice(h + 1), h = (i = !i) ? "}" : "{"
		}
		return j.push(a), j.join("")
	}
	function s(a) {
		return ha.pow(10, ja(ha.log(a) / ha.LN10))
	}
	function t(a, b, c, d, e) {
		var f, g = a,
			c = Pa(c, 1);
		for (f = a / c, b || (b = [1, 2, 2.5, 5, 10], d === !1 && (1 === c ? b = [1, 2, 5, 10] : .1 >= c && (b = [1 / c]))), d = 0; d < b.length && (g = b[d], !(e && g * c >= a || !e && f <= (b[d] + (b[d + 1] || b[d])) / 2)); d++);
		return g *= c
	}
	function u(a, b) {
		var c, d, e = a.length;
		for (d = 0; e > d; d++) a[d].ss_i = d;
		for (a.sort(function(a, d) {
			return c = b(a, d), 0 === c ? a.ss_i - d.ss_i : c
		}), d = 0; e > d; d++) delete a[d].ss_i
	}
	function v(a) {
		for (var b = a.length, c = a[0]; b--;) a[b] < c && (c = a[b]);
		return c
	}
	function w(a) {
		for (var b = a.length, c = a[0]; b--;) a[b] > c && (c = a[b]);
		return c
	}
	function x(a, b) {
		for (var c in a) a[c] && a[c] !== b && a[c].destroy && a[c].destroy(), delete a[c]
	}
	function y(a) {
		J || (J = n(Ia)), a && J.appendChild(a), J.innerHTML = ""
	}
	function z(a, b) {
		var c = "Highcharts error #" + a + ": www.highcharts.com/errors/" + a;
		if (b) throw c;
		ga.console && console.log(c)
	}
	function A(a) {
		return parseFloat(a.toPrecision(14))
	}
	function B(a, b) {
		M = Pa(a, b.animation)
	}
	function C() {
		var a = K.global,
			b = a.useUTC,
			c = b ? "getUTC" : "get",
			d = b ? "setUTC" : "set";
		P = a.Date || window.Date, R = b && a.timezoneOffset, S = b && a.getTimezoneOffset, Q = function(a, c, d, e, f, g) {
			var h;
			return b ? (h = P.UTC.apply(0, arguments), h += q(h)) : h = new P(a, c, Pa(d, 1), Pa(e, 0), Pa(f, 0), Pa(g, 0)).getTime(), h
		}, T = c + "Minutes", U = c + "Hours", V = c + "Day", W = c + "Date", X = c + "Month", Y = c + "FullYear", Z = d + "Milliseconds", $ = d + "Seconds", _ = d + "Minutes", aa = d + "Hours", ba = d + "Date", ca = d + "Month", da = d + "FullYear"
	}
	function D() {}
	function E(a, b, c, d) {
		this.axis = a, this.pos = b, this.type = c || "", this.isNew = !0, !c && !d && this.addLabel()
	}
	function F(a, b, c, d, e) {
		var f = a.chart.inverted;
		this.axis = a, this.isNegative = c, this.options = b, this.x = d, this.total = null, this.points = {}, this.stack = e, this.alignOptions = {
			align: b.align || (f ? c ? "left" : "right" : "center"),
			verticalAlign: b.verticalAlign || (f ? "middle" : c ? "bottom" : "top"),
			y: Pa(b.y, f ? 4 : c ? 14 : -6),
			x: Pa(b.x, f ? c ? -6 : 6 : 0)
		}, this.textAlign = b.textAlign || (f ? c ? "right" : "left" : "center")
	}
	var G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, aa, ba, ca, da, ea, fa = document,
		ga = window,
		ha = Math,
		ia = ha.round,
		ja = ha.floor,
		ka = ha.ceil,
		la = ha.max,
		ma = ha.min,
		na = ha.abs,
		oa = ha.cos,
		pa = ha.sin,
		qa = ha.PI,
		ra = 2 * qa / 360,
		sa = navigator.userAgent,
		ta = ga.opera,
		ua = /(msie|trident)/i.test(sa) && !ta,
		va = 8 === fa.documentMode,
		wa = /AppleWebKit/.test(sa),
		xa = /Firefox/.test(sa),
		ya = /(Mobile|Android|Windows Phone)/.test(sa),
		za = "http://www.w3.org/2000/svg",
		Aa = !! fa.createElementNS && !! fa.createElementNS(za, "svg").createSVGRect,
		Ba = xa && parseInt(sa.split("Firefox/")[1], 10) < 4,
		Ca = !Aa && !ua && !! fa.createElement("canvas").getContext,
		Da = {},
		Ea = 0,
		Fa = function() {
			return G
		},
		Ga = [],
		Ha = 0,
		Ia = "div",
		Ja = "none",
		Ka = /^[0-9]+$/,
		La = ["plotTop", "marginRight", "marginBottom", "plotLeft"],
		Ma = "stroke-width",
		Na = {};
	ea = ga.Highcharts = ga.Highcharts ? z(16, !0) : {}, ea.seriesTypes = Na;
	var Oa = ea.extend = function(a, b) {
			var c;
			a || (a = {});
			for (c in b) a[c] = b[c];
			return a
		},
		Pa = ea.pick = function() {
			var a, b, c = arguments,
				d = c.length;
			for (a = 0; d > a; a++) if (b = c[a], b !== G && null !== b) return b
		},
		Qa = ea.wrap = function(a, b, c) {
			var d = a[b];
			a[b] = function() {
				var a = Array.prototype.slice.call(arguments);
				return a.unshift(d), c.apply(this, a)
			}
		};
	L = function(a, b, c) {
		if (!j(b) || isNaN(b)) return "Invalid date";
		var d, a = Pa(a, "%Y-%m-%d %H:%M:%S"),
			e = new P(b - q(b)),
			f = e[U](),
			g = e[V](),
			h = e[W](),
			i = e[X](),
			k = e[Y](),
			l = K.lang,
			m = l.weekdays,
			e = Oa({
				a: m[g].substr(0, 3),
				A: m[g],
				d: p(h),
				e: h,
				w: g,
				b: l.shortMonths[i],
				B: l.months[i],
				m: p(i + 1),
				y: k.toString().substr(2, 2),
				Y: k,
				H: p(f),
				I: p(f % 12 || 12),
				l: f % 12 || 12,
				M: p(e[T]()),
				p: 12 > f ? "AM" : "PM",
				P: 12 > f ? "am" : "pm",
				S: p(e.getSeconds()),
				L: p(ia(b % 1e3), 3)
			}, ea.dateFormats);
		for (d in e) for (; - 1 !== a.indexOf("%" + d);) a = a.replace("%" + d, "function" == typeof e[d] ? e[d](b) : e[d]);
		return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a
	}, O = {
		millisecond: 1,
		second: 1e3,
		minute: 6e4,
		hour: 36e5,
		day: 864e5,
		week: 6048e5,
		month: 24192e5,
		year: 314496e5
	}, ea.numberFormat = function(a, c, d, e) {
		var f = K.lang,
			a = +a || 0,
			g = -1 === c ? ma((a.toString().split(".")[1] || "").length, 20) : isNaN(c = na(c)) ? 2 : c,
			c = void 0 === d ? f.decimalPoint : d,
			e = void 0 === e ? f.thousandsSep : e,
			f = 0 > a ? "-" : "",
			d = String(b(a = na(a).toFixed(g))),
			h = d.length > 3 ? d.length % 3 : 0;
		return f + (h ? d.substr(0, h) + e : "") + d.substr(h).replace(/(\d{3})(?=\d)/g, "$1" + e) + (g ? c + na(a - d).toFixed(g).slice(2) : "")
	}, N = {
		init: function(a, b, c) {
			var d, e, f, b = b || "",
				g = a.shift,
				h = b.indexOf("C") > -1,
				i = h ? 7 : 3,
				b = b.split(" "),
				c = [].concat(c),
				j = function(a) {
					for (d = a.length; d--;)"M" === a[d] && a.splice(d + 1, 0, a[d + 1], a[d + 2], a[d + 1], a[d + 2])
				};
			if (h && (j(b), j(c)), a.isArea && (e = b.splice(b.length - 6, 6), f = c.splice(c.length - 6, 6)), g <= c.length / i && b.length === c.length) for (; g--;) c = [].concat(c).splice(0, i).concat(c);
			if (a.shift = 0, b.length) for (a = c.length; b.length < a;) g = [].concat(b).splice(b.length - i, i), h && (g[i - 6] = g[i - 2], g[i - 5] = g[i - 1]), b = b.concat(g);
			return e && (b = b.concat(e), c = c.concat(f)), [b, c]
		},
		step: function(a, b, c, d) {
			var e = [],
				f = a.length;
			if (1 === c) e = d;
			else if (f === b.length && 1 > c) for (; f--;) d = parseFloat(a[f]), e[f] = isNaN(d) ? a[f] : c * parseFloat(b[f] - d) + d;
			else e = b;
			return e
		}
	}, function(a) {
		ga.HighchartsAdapter = ga.HighchartsAdapter || a && {
			init: function(b) {
				var d = a.fx;
				a.extend(a.easing, {
					easeOutQuad: function(a, b, c, d, e) {
						return -d * (b /= e) * (b - 2) + c
					}
				}), a.each(["cur", "_default", "width", "height", "opacity"], function(b, c) {
					var e, f = d.step;
					"cur" === c ? f = d.prototype : "_default" === c && a.Tween && (f = a.Tween.propHooks[c], c = "set"), (e = f[c]) && (f[c] = function(a) {
						var d, a = b ? a : this;
						return "align" !== a.prop ? (d = a.elem, d.attr ? d.attr(a.prop, "cur" === c ? G : a.now) : e.apply(this, arguments)) : void 0
					})
				}), Qa(a.cssHooks.opacity, "get", function(a, b, c) {
					return b.attr ? b.opacity || 0 : a.call(this, b, c)
				}), this.addAnimSetter("d", function(a) {
					var c, d = a.elem;
					a.started || (c = b.init(d, d.d, d.toD), a.start = c[0], a.end = c[1], a.started = !0), d.attr("d", b.step(a.start, a.end, a.pos, d.toD))
				}), this.each = Array.prototype.forEach ?
				function(a, b) {
					return Array.prototype.forEach.call(a, b)
				} : function(a, b) {
					var c, d = a.length;
					for (c = 0; d > c; c++) if (b.call(a[c], a[c], c, a) === !1) return c
				}, a.fn.highcharts = function() {
					var a, b, d = "Chart",
						e = arguments;
					return this[0] && (c(e[0]) && (d = e[0], e = Array.prototype.slice.call(e, 1)), a = e[0], a !== G && (a.chart = a.chart || {}, a.chart.renderTo = this[0], new ea[d](a, e[1]), b = this), a === G && (b = Ga[k(this[0], "data-highcharts-chart")])), b
				}
			},
			addAnimSetter: function(b, c) {
				a.Tween ? a.Tween.propHooks[b] = {
					set: c
				} : a.fx.step[b] = c
			},
			getScript: a.getScript,
			inArray: a.inArray,
			adapterRun: function(b, c) {
				return a(b)[c]()
			},
			grep: a.grep,
			map: function(a, b) {
				for (var c = [], d = 0, e = a.length; e > d; d++) c[d] = b.call(a[d], a[d], d, a);
				return c
			},
			offset: function(b) {
				return a(b).offset()
			},
			addEvent: function(b, c, d) {
				a(b).bind(c, d)
			},
			removeEvent: function(b, c, d) {
				var e = fa.removeEventListener ? "removeEventListener" : "detachEvent";
				fa[e] && b && !b[e] && (b[e] = function() {}), a(b).unbind(c, d)
			},
			fireEvent: function(b, c, d, e) {
				var f, g = a.Event(c),
					h = "detached" + c;
				!ua && d && (delete d.layerX, delete d.layerY, delete d.returnValue), Oa(g, d), b[c] && (b[h] = b[c], b[c] = null), a.each(["preventDefault", "stopPropagation"], function(a, b) {
					var c = g[b];
					g[b] = function() {
						try {
							c.call(g)
						} catch (a) {
							"preventDefault" === b && (f = !0)
						}
					}
				}), a(b).trigger(g), b[h] && (b[c] = b[h], b[h] = null), e && !g.isDefaultPrevented() && !f && e(g)
			},
			washMouseEvent: function(a) {
				var b = a.originalEvent || a;
				return b.pageX === G && (b.pageX = a.pageX, b.pageY = a.pageY), b
			},
			animate: function(b, c, d) {
				var e = a(b);
				b.style || (b.style = {}), c.d && (b.toD = c.d, c.d = 1), e.stop(), c.opacity !== G && b.attr && (c.opacity += "px"), b.hasAnim = 1, e.animate(c, d)
			},
			stop: function(b) {
				b.hasAnim && a(b).stop()
			}
		}
	}(ga.jQuery);
	var Ra = ga.HighchartsAdapter,
		Sa = Ra || {};
	Ra && Ra.init.call(Ra, N);
	var Ta = Sa.adapterRun,
		Ua = Sa.getScript,
		Va = Sa.inArray,
		Wa = ea.each = Sa.each,
		Xa = Sa.grep,
		Ya = Sa.offset,
		Za = Sa.map,
		$a = Sa.addEvent,
		_a = Sa.removeEvent,
		ab = Sa.fireEvent,
		bb = Sa.washMouseEvent,
		cb = Sa.animate,
		db = Sa.stop;
	K = {
		colors: "#7cb5ec,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#2b908f,#f45b5b,#91e8e1".split(","),
		symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
		lang: {
			loading: "Loading...",
			months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
			shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
			weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
			decimalPoint: ".",
			numericSymbols: "k,M,G,T,P,E".split(","),
			resetZoom: "Reset zoom",
			resetZoomTitle: "Reset zoom level 1:1",
			thousandsSep: " "
		},
		global: {
			useUTC: !0,
			canvasToolsURL: "http://code.highcharts.com/4.1.7/modules/canvas-tools.js",
			VMLRadialGradientURL: "http://code.highcharts.com/4.1.7/gfx/vml-radial-gradient.png"
		},
		chart: {
			borderColor: "#4572A7",
			borderRadius: 0,
			defaultSeriesType: "line",
			ignoreHiddenSeries: !0,
			spacing: [10, 10, 15, 10],
			backgroundColor: "#FFFFFF",
			plotBorderColor: "#C0C0C0",
			resetZoomButton: {
				theme: {
					zIndex: 20
				},
				position: {
					align: "right",
					x: -10,
					y: 10
				}
			}
		},
		title: {
			text: "",
			align: "center",
			margin: 15,
			style: {
				color: "#333333",
				fontSize: "18px"
			}
		},
		subtitle: {
			text: "",
			align: "center",
			style: {
				color: "#555555"
			}
		},
		plotOptions: {
			line: {
				allowPointSelect: !1,
				showCheckbox: !1,
				animation: {
					duration: 1e3
				},
				events: {},
				lineWidth: 2,
				marker: {
					lineWidth: 0,
					radius: 4,
					lineColor: "#FFFFFF",
					states: {
						hover: {
							enabled: !0,
							lineWidthPlus: 1,
							radiusPlus: 2
						},
						select: {
							fillColor: "#FFFFFF",
							lineColor: "#000000",
							lineWidth: 2
						}
					}
				},
				point: {
					events: {}
				},
				dataLabels: {
					align: "center",
					formatter: function() {
						return null === this.y ? "" : ea.numberFormat(this.y, -1)
					},
					style: {
						color: "contrast",
						fontSize: "11px",
						fontWeight: "bold",
						textShadow: "0 0 6px contrast, 0 0 3px contrast"
					},
					verticalAlign: "bottom",
					x: 0,
					y: 0,
					padding: 5
				},
				cropThreshold: 300,
				pointRange: 0,
				states: {
					hover: {
						lineWidthPlus: 1,
						marker: {},
						halo: {
							size: 10,
							opacity: .25
						}
					},
					select: {
						marker: {}
					}
				},
				stickyTracking: !0,
				turboThreshold: 1e3
			}
		},
		labels: {
			style: {
				position: "absolute",
				color: "#3E576F"
			}
		},
		legend: {
			enabled: !0,
			align: "center",
			layout: "horizontal",
			labelFormatter: function() {
				return this.name
			},
			borderColor: "#909090",
			borderRadius: 0,
			navigation: {
				activeColor: "#274b6d",
				inactiveColor: "#CCC"
			},
			shadow: !1,
			itemStyle: {
				color: "#333333",
				fontSize: "12px",
				fontWeight: "bold"
			},
			itemHoverStyle: {
				color: "#000"
			},
			itemHiddenStyle: {
				color: "#CCC"
			},
			itemCheckboxStyle: {
				position: "absolute",
				width: "13px",
				height: "13px"
			},
			symbolPadding: 5,
			verticalAlign: "bottom",
			x: 0,
			y: 0,
			title: {
				style: {
					fontWeight: "bold"
				}
			}
		},
		loading: {
			labelStyle: {
				fontWeight: "bold",
				position: "relative",
				top: "45%"
			},
			style: {
				position: "absolute",
				backgroundColor: "white",
				opacity: .5,
				textAlign: "center"
			}
		},
		tooltip: {
			enabled: !0,
			animation: Aa,
			backgroundColor: "rgba(249, 249, 249, .85)",
			borderWidth: 1,
			borderRadius: 3,
			dateTimeLabelFormats: {
				millisecond: "%A, %b %e, %H:%M:%S.%L",
				second: "%A, %b %e, %H:%M:%S",
				minute: "%A, %b %e, %H:%M",
				hour: "%A, %b %e, %H:%M",
				day: "%A, %b %e, %Y",
				week: "Week from %A, %b %e, %Y",
				month: "%B %Y",
				year: "%Y"
			},
			footerFormat: "",
			headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
			pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>',
			shadow: !0,
			snap: ya ? 25 : 10,
			style: {
				color: "#333333",
				cursor: "default",
				fontSize: "12px",
				padding: "8px",
				whiteSpace: "nowrap"
			}
		},
		credits: {
			enabled: !0,
			text: "Highcharts.com",
			href: "http://www.highcharts.com",
			position: {
				align: "right",
				x: -10,
				verticalAlign: "bottom",
				y: -5
			},
			style: {
				cursor: "pointer",
				color: "#909090",
				fontSize: "9px"
			}
		}
	};
	var eb = K.plotOptions,
		Ra = eb.line;
	C();
	var fb = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
		gb = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
		hb = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
		ib = function(c) {
			var d, e, g = [];
			return function(a) {
				a && a.stops ? e = Za(a.stops, function(a) {
					return ib(a[1])
				}) : (d = fb.exec(a)) ? g = [b(d[1]), b(d[2]), b(d[3]), parseFloat(d[4], 10)] : (d = gb.exec(a)) ? g = [b(d[1], 16), b(d[2], 16), b(d[3], 16), 1] : (d = hb.exec(a)) && (g = [b(d[1]), b(d[2]), b(d[3]), 1])
			}(c), {
				get: function(b) {
					var d;
					return e ? (d = a(c), d.stops = [].concat(d.stops), Wa(e, function(a, c) {
						d.stops[c] = [d.stops[c][0], a.get(b)]
					})) : d = g && !isNaN(g[0]) ? "rgb" === b ? "rgb(" + g[0] + "," + g[1] + "," + g[2] + ")" : "a" === b ? g[3] : "rgba(" + g.join(",") + ")" : c, d
				},
				brighten: function(a) {
					if (e) Wa(e, function(b) {
						b.brighten(a)
					});
					else if (f(a) && 0 !== a) {
						var c;
						for (c = 0; 3 > c; c++) g[c] += b(255 * a), g[c] < 0 && (g[c] = 0), g[c] > 255 && (g[c] = 255)
					}
					return this
				},
				rgba: g,
				setOpacity: function(a) {
					return g[3] = a, this
				},
				raw: c
			}
		};
	D.prototype = {
		opacity: 1,
		textProps: "fontSize,fontWeight,fontFamily,fontStyle,color,lineHeight,width,textDecoration,textShadow".split(","),
		init: function(a, b) {
			this.element = "span" === b ? n(b) : fa.createElementNS(za, b), this.renderer = a
		},
		animate: function(b, c, d) {
			return c = Pa(c, M, !0), db(this), c ? (c = a(c, {}), d && (c.complete = d), cb(this, b, c)) : (this.attr(b), d && d()), this
		},
		colorGradient: function(b, c, d) {
			var f, g, h, i, k, l, m, n, o, p, q = this.renderer,
				r = [];
			if (b.linearGradient ? g = "linearGradient" : b.radialGradient && (g = "radialGradient"), g) {
				h = b[g], i = q.gradients, l = b.stops, o = d.radialReference, e(h) && (b[g] = h = {
					x1: h[0],
					y1: h[1],
					x2: h[2],
					y2: h[3],
					gradientUnits: "userSpaceOnUse"
				}), "radialGradient" === g && o && !j(h.gradientUnits) && (h = a(h, {
					cx: o[0] - o[2] / 2 + h.cx * o[2],
					cy: o[1] - o[2] / 2 + h.cy * o[2],
					r: h.r * o[2],
					gradientUnits: "userSpaceOnUse"
				}));
				for (p in h)"id" !== p && r.push(p, h[p]);
				for (p in l) r.push(l[p]);
				r = r.join(","), i[r] ? b = i[r].attr("id") : (h.id = b = "highcharts-" + Ea++, i[r] = k = q.createElement(g).attr(h).add(q.defs), k.stops = [], Wa(l, function(a) {
					0 === a[1].indexOf("rgba") ? (f = ib(a[1]), m = f.get("rgb"), n = f.get("a")) : (m = a[1], n = 1), a = q.createElement("stop").attr({
						offset: a[0],
						"stop-color": m,
						"stop-opacity": n
					}).add(k), k.stops.push(a)
				})), d.setAttribute(c, "url(" + q.url + "#" + b + ")")
			}
		},
		applyTextShadow: function(a) {
			var c, d = this.element,
				e = -1 !== a.indexOf("contrast"),
				f = {},
				g = this.renderer.forExport || d.style.textShadow !== G && !ua;
			e && (f.textShadow = a = a.replace(/contrast/g, this.renderer.getContrast(d.style.fill))), wa && (f.textRendering = "geometricPrecision"), g ? m(d, f) : (this.fakeTS = !0, this.ySetter = this.xSetter, c = [].slice.call(d.getElementsByTagName("tspan")), Wa(a.split(/\s?,\s?/g), function(a) {
				var e, f, g = d.firstChild,
					a = a.split(" ");
				e = a[a.length - 1], (f = a[a.length - 2]) && Wa(c, function(a, c) {
					var h;
					0 === c && (a.setAttribute("x", d.getAttribute("x")), c = d.getAttribute("y"), a.setAttribute("y", c || 0), null === c && d.setAttribute("y", 0)), h = a.cloneNode(1), k(h, {
						"class": "highcharts-text-shadow",
						fill: e,
						stroke: e,
						"stroke-opacity": 1 / la(b(f), 3),
						"stroke-width": f,
						"stroke-linejoin": "round"
					}), d.insertBefore(h, g)
				})
			}))
		},
		attr: function(a, b) {
			var c, d, e, f, g = this.element,
				h = this;
			if ("string" == typeof a && b !== G && (c = a, a = {}, a[c] = b), "string" == typeof a) h = (this[a + "Getter"] || this._defaultGetter).call(this, a, g);
			else {
				for (c in a) d = a[c], f = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c) && (e || (this.symbolAttr(a), e = !0), f = !0), !this.rotation || "x" !== c && "y" !== c || (this.doTransform = !0), f || (this[c + "Setter"] || this._defaultSetter).call(this, d, c, g), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c) && this.updateShadows(c, d);
				this.doTransform && (this.updateTransform(), this.doTransform = !1)
			}
			return h
		},
		updateShadows: function(a, b) {
			for (var c = this.shadows, d = c.length; d--;) c[d].setAttribute(a, "height" === a ? la(b - (c[d].cutHeight || 0), 0) : "d" === a ? this.d : b)
		},
		addClass: function(a) {
			var b = this.element,
				c = k(b, "class") || "";
			return -1 === c.indexOf(a) && k(b, "class", c + " " + a), this
		},
		symbolAttr: function(a) {
			var b = this;
			Wa("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","), function(c) {
				b[c] = Pa(a[c], b[c])
			}), b.attr({
				d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)
			})
		},
		clip: function(a) {
			return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : Ja)
		},
		crisp: function(a) {
			var b, c, d = {},
				e = a.strokeWidth || this.strokeWidth || 0;
			c = ia(e) % 2 / 2, a.x = ja(a.x || this.x || 0) + c, a.y = ja(a.y || this.y || 0) + c, a.width = ja((a.width || this.width || 0) - 2 * c), a.height = ja((a.height || this.height || 0) - 2 * c), a.strokeWidth = e;
			for (b in a) this[b] !== a[b] && (this[b] = d[b] = a[b]);
			return d
		},
		css: function(a) {
			var c, d, e = this.styles,
				f = {},
				g = this.element,
				h = "";
			if (c = !e, a && a.color && (a.fill = a.color), e) for (d in a) a[d] !== e[d] && (f[d] = a[d], c = !0);
			if (c) {
				if (c = this.textWidth = a && a.width && "text" === g.nodeName.toLowerCase() && b(a.width) || this.textWidth, e && (a = Oa(e, f)), this.styles = a, c && (Ca || !Aa && this.renderer.forExport) && delete a.width, ua && !Aa) m(this.element, a);
				else {
					e = function(a, b) {
						return "-" + b.toLowerCase()
					};
					for (d in a) h += d.replace(/([A-Z])/g, e) + ":" + a[d] + ";";
					k(g, "style", h)
				}
				c && this.added && this.renderer.buildText(this)
			}
			return this
		},
		on: function(a, b) {
			var c = this,
				d = c.element;
			return I && "click" === a ? (d.ontouchstart = function(a) {
				c.touchEventFired = P.now(), a.preventDefault(), b.call(d, a)
			}, d.onclick = function(a) {
				(-1 === sa.indexOf("Android") || P.now() - (c.touchEventFired || 0) > 1100) && b.call(d, a)
			}) : d["on" + a] = b, this
		},
		setRadialReference: function(a) {
			return this.element.radialReference = a, this
		},
		translate: function(a, b) {
			return this.attr({
				translateX: a,
				translateY: b
			})
		},
		invert: function() {
			return this.inverted = !0, this.updateTransform(), this
		},
		updateTransform: function() {
			var a = this.translateX || 0,
				b = this.translateY || 0,
				c = this.scaleX,
				d = this.scaleY,
				e = this.inverted,
				f = this.rotation,
				g = this.element;
			e && (a += this.attr("width"), b += this.attr("height")), a = ["translate(" + a + "," + b + ")"], e ? a.push("rotate(90) scale(-1,1)") : f && a.push("rotate(" + f + " " + (g.getAttribute("x") || 0) + " " + (g.getAttribute("y") || 0) + ")"), (j(c) || j(d)) && a.push("scale(" + Pa(c, 1) + " " + Pa(d, 1) + ")"), a.length && g.setAttribute("transform", a.join(" "))
		},
		toFront: function() {
			var a = this.element;
			return a.parentNode.appendChild(a), this
		},
		align: function(a, b, d) {
			var e, f, g, h, j = {};
			return f = this.renderer, g = f.alignedObjects, a ? (this.alignOptions = a, this.alignByTranslate = b, (!d || c(d)) && (this.alignTo = e = d || "renderer", i(g, this), g.push(this), d = null)) : (a = this.alignOptions, b = this.alignByTranslate, e = this.alignTo), d = Pa(d, f[e], f), e = a.align, f = a.verticalAlign, g = (d.x || 0) + (a.x || 0), h = (d.y || 0) + (a.y || 0), ("right" === e || "center" === e) && (g += (d.width - (a.width || 0)) / {
				right: 1,
				center: 2
			}[e]), j[b ? "translateX" : "x"] = ia(g), ("bottom" === f || "middle" === f) && (h += (d.height - (a.height || 0)) / ({
				bottom: 1,
				middle: 2
			}[f] || 1)), j[b ? "translateY" : "y"] = ia(h), this[this.placed ? "animate" : "attr"](j), this.placed = !0, this.alignAttr = j, this
		},
		getBBox: function(a) {
			var b, c, d = this.renderer,
				e = this.rotation,
				f = this.element,
				g = this.styles,
				h = e * ra;
			c = this.textStr;
			var i, j, k, l = f.style;
			if (c !== G && (k = ["", e || 0, g && g.fontSize, f.style.width].join(","), k = "" === c || Ka.test(c) ? "num:" + c.toString().length + k : c + k), k && !a && (b = d.cache[k]), !b) {
				if (f.namespaceURI === za || d.forExport) {
					try {
						j = this.fakeTS &&
						function(a) {
							Wa(f.querySelectorAll(".highcharts-text-shadow"), function(b) {
								b.style.display = a
							})
						}, xa && l.textShadow ? (i = l.textShadow, l.textShadow = "") : j && j(Ja), b = f.getBBox ? Oa({}, f.getBBox()) : {
							width: f.offsetWidth,
							height: f.offsetHeight
						}, i ? l.textShadow = i : j && j("")
					} catch (m) {}(!b || b.width < 0) && (b = {
						width: 0,
						height: 0
					})
				} else b = this.htmlGetBBox();
				d.isSVG && (a = b.width, c = b.height, ua && g && "11px" === g.fontSize && "16.9" === c.toPrecision(3) && (b.height = c = 14), e && (b.width = na(c * pa(h)) + na(a * oa(h)), b.height = na(c * oa(h)) + na(a * pa(h)))), d.cache[k] = b
			}
			return b
		},
		show: function(a) {
			return a && this.element.namespaceURI === za ? this.element.removeAttribute("visibility") : this.attr({
				visibility: a ? "inherit" : "visible"
			}), this
		},
		hide: function() {
			return this.attr({
				visibility: "hidden"
			})
		},
		fadeOut: function(a) {
			var b = this;
			b.animate({
				opacity: 0
			}, {
				duration: a || 150,
				complete: function() {
					b.attr({
						y: -9999
					})
				}
			})
		},
		add: function(a) {
			var b, c = this.renderer,
				d = this.element;
			return a && (this.parentGroup = a), this.parentInverted = a && a.inverted, void 0 !== this.textStr && c.buildText(this), this.added = !0, (!a || a.handleZ || this.zIndex) && (b = this.zIndexSetter()), b || (a ? a.element : c.box).appendChild(d), this.onAdd && this.onAdd(), this
		},
		safeRemoveChild: function(a) {
			var b = a.parentNode;
			b && b.removeChild(a)
		},
		destroy: function() {
			var a, b, c = this,
				d = c.element || {},
				e = c.shadows,
				f = c.renderer.isSVG && "SPAN" === d.nodeName && c.parentGroup;
			if (d.onclick = d.onmouseout = d.onmouseover = d.onmousemove = d.point = null, db(c), c.clipPath && (c.clipPath = c.clipPath.destroy()), c.stops) {
				for (b = 0; b < c.stops.length; b++) c.stops[b] = c.stops[b].destroy();
				c.stops = null
			}
			for (c.safeRemoveChild(d), e && Wa(e, function(a) {
				c.safeRemoveChild(a)
			}); f && f.div && 0 === f.div.childNodes.length;) d = f.parentGroup, c.safeRemoveChild(f.div), delete f.div, f = d;
			c.alignTo && i(c.renderer.alignedObjects, c);
			for (a in c) delete c[a];
			return null
		},
		shadow: function(a, b, c) {
			var d, e, f, g, h, i, j = [],
				l = this.element;
			if (a) {
				for (g = Pa(a.width, 3), h = (a.opacity || .15) / g, i = this.parentInverted ? "(-1,-1)" : "(" + Pa(a.offsetX, 1) + ", " + Pa(a.offsetY, 1) + ")", d = 1; g >= d; d++) e = l.cloneNode(0), f = 2 * g + 1 - 2 * d, k(e, {
					isShadow: "true",
					stroke: a.color || "black",
					"stroke-opacity": h * d,
					"stroke-width": f,
					transform: "translate" + i,
					fill: Ja
				}), c && (k(e, "height", la(k(e, "height") - f, 0)), e.cutHeight = f), b ? b.element.appendChild(e) : l.parentNode.insertBefore(e, l), j.push(e);
				this.shadows = j
			}
			return this
		},
		xGetter: function(a) {
			return "circle" === this.element.nodeName && (a = {
				x: "cx",
				y: "cy"
			}[a] || a), this._defaultGetter(a)
		},
		_defaultGetter: function(a) {
			return a = Pa(this[a], this.element ? this.element.getAttribute(a) : null, 0), /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a)), a
		},
		dSetter: function(a, b, c) {
			a && a.join && (a = a.join(" ")), /(NaN| {2}|^$)/.test(a) && (a = "M 0 0"), c.setAttribute(b, a), this[b] = a
		},
		dashstyleSetter: function(a) {
			var c;
			if (a = a && a.toLowerCase()) {
				for (a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(","), c = a.length; c--;) a[c] = b(a[c]) * this["stroke-width"];
				a = a.join(",").replace("NaN", "none"), this.element.setAttribute("stroke-dasharray", a)
			}
		},
		alignSetter: function(a) {
			this.element.setAttribute("text-anchor", {
				left: "start",
				center: "middle",
				right: "end"
			}[a])
		},
		opacitySetter: function(a, b, c) {
			this[b] = a, c.setAttribute(b, a)
		},
		titleSetter: function(a) {
			var b = this.element.getElementsByTagName("title")[0];
			b || (b = fa.createElementNS(za, "title"), this.element.appendChild(b)), b.appendChild(fa.createTextNode(String(Pa(a), "").replace(/<[^>]*>/g, "")))
		},
		textSetter: function(a) {
			a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
		},
		fillSetter: function(a, b, c) {
			"string" == typeof a ? c.setAttribute(b, a) : a && this.colorGradient(a, b, c)
		},
		zIndexSetter: function(a, c) {
			var d, e, f, g = this.renderer,
				h = this.parentGroup,
				g = (h || g).element || g.box,
				i = this.element;
			d = this.added;
			var l;
			if (j(a) && (i.setAttribute(c, a), a = +a, this[c] === a && (d = !1), this[c] = a), d) {
				for ((a = this.zIndex) && h && (h.handleZ = !0), h = g.childNodes, l = 0; l < h.length && !f; l++) d = h[l], e = k(d, "zIndex"), d !== i && (b(e) > a || !j(a) && j(e)) && (g.insertBefore(i, d), f = !0);
				f || g.appendChild(i)
			}
			return f
		},
		_defaultSetter: function(a, b, c) {
			c.setAttribute(b, a)
		}
	}, D.prototype.yGetter = D.prototype.xGetter, D.prototype.translateXSetter = D.prototype.translateYSetter = D.prototype.rotationSetter = D.prototype.verticalAlignSetter = D.prototype.scaleXSetter = D.prototype.scaleYSetter = function(a, b) {
		this[b] = a, this.doTransform = !0
	}, D.prototype["stroke-widthSetter"] = D.prototype.strokeSetter = function(a, b, c) {
		this[b] = a, this.stroke && this["stroke-width"] ? (this.strokeWidth = this["stroke-width"], D.prototype.fillSetter.call(this, this.stroke, "stroke", c), c.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === b && 0 === a && this.hasStroke && (c.removeAttribute("stroke"), this.hasStroke = !1)
	};
	var jb = function() {
			this.init.apply(this, arguments)
		};
	if (jb.prototype = {
		Element: D,
		init: function(a, b, c, d, e) {
			var f, g = location,
				d = this.createElement("svg").attr({
					version: "1.1"
				}).css(this.getStyle(d));
			f = d.element, a.appendChild(f), -1 === a.innerHTML.indexOf("xmlns") && k(f, "xmlns", za), this.isSVG = !0, this.box = f, this.boxWrapper = d, this.alignedObjects = [], this.url = (xa || wa) && fa.getElementsByTagName("base").length ? g.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "", this.createElement("desc").add().element.appendChild(fa.createTextNode("Created with Highcharts 4.1.7")), this.defs = this.createElement("defs").add(), this.forExport = e, this.gradients = {}, this.cache = {}, this.setSize(b, c, !1);
			var h;
			xa && a.getBoundingClientRect && (this.subPixelFix = b = function() {
				m(a, {
					left: 0,
					top: 0
				}), h = a.getBoundingClientRect(), m(a, {
					left: ka(h.left) - h.left + "px",
					top: ka(h.top) - h.top + "px"
				})
			}, b(), $a(ga, "resize", b))
		},
		getStyle: function(a) {
			return this.style = Oa({
				fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
				fontSize: "12px"
			}, a)
		},
		isHidden: function() {
			return !this.boxWrapper.getBBox().width
		},
		destroy: function() {
			var a = this.defs;
			return this.box = null, this.boxWrapper = this.boxWrapper.destroy(), x(this.gradients || {}), this.gradients = null, a && (this.defs = a.destroy()), this.subPixelFix && _a(ga, "resize", this.subPixelFix), this.alignedObjects = null
		},
		createElement: function(a) {
			var b = new this.Element;
			return b.init(this, a), b
		},
		draw: function() {},
		buildText: function(a) {
			for (var c, d, e = a.element, f = this, g = f.forExport, h = Pa(a.textStr, "").toString(), i = -1 !== h.indexOf("<"), j = e.childNodes, l = k(e, "x"), n = a.styles, o = a.textWidth, p = n && n.lineHeight, q = n && n.textShadow, r = n && "ellipsis" === n.textOverflow, s = j.length, t = o && !a.added && this.box, u = function(a) {
					return p ? b(p) : f.fontMetrics(/(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : n && n.fontSize || f.style.fontSize || 12, a).h
				}, v = function(a) {
					return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
				}; s--;) e.removeChild(j[s]);
			i || q || r || -1 !== h.indexOf(" ") ? (c = /<.*style="([^"]+)".*>/, d = /<.*href="(http[^"]+)".*>/, t && t.appendChild(e), h = i ? h.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [h], "" === h[h.length - 1] && h.pop(), Wa(h, function(b, h) {
				var i, j = 0,
					b = b.replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
				i = b.split("|||"), Wa(i, function(b) {
					if ("" !== b || 1 === i.length) {
						var p, q = {},
							s = fa.createElementNS(za, "tspan");
						if (c.test(b) && (p = b.match(c)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), k(s, "style", p)), d.test(b) && !g && (k(s, "onclick", 'location.href="' + b.match(d)[1] + '"'), m(s, {
							cursor: "pointer"
						})), b = v(b.replace(/<(.|\n)*?>/g, "") || " "), " " !== b) {
							if (s.appendChild(fa.createTextNode(b)), j ? q.dx = 0 : h && null !== l && (q.x = l), k(s, q), e.appendChild(s), !j && h && (!Aa && g && m(s, {
								display: "block"
							}), k(s, "dy", u(s))), o) {
								for (var t, w, x, q = b.replace(/([^\^])-/g, "$1- ").split(" "), y = i.length > 1 || h || q.length > 1 && "nowrap" !== n.whiteSpace, z = [], A = u(s), B = 1, C = a.rotation, D = b, E = D.length;
								(y || r) && (q.length || z.length);) a.rotation = 0, t = a.getBBox(!0), x = t.width, !Aa && f.forExport && (x = f.measureSpanWidth(s.firstChild.data, a.styles)), t = x > o, void 0 === w && (w = t), r && w ? (E /= 2, "" === D || !t && .5 > E ? q = [] : (t && (w = !0), D = b.substring(0, D.length + (t ? -1 : 1) * ka(E)), q = [D + (o > 3 ? "…" : "")], s.removeChild(s.firstChild))) : t && 1 !== q.length ? (s.removeChild(s.firstChild), z.unshift(q.pop())) : (q = z, z = [], q.length && (B++, s = fa.createElementNS(za, "tspan"), k(s, {
									dy: A,
									x: l
								}), p && k(s, "style", p), e.appendChild(s)), x > o && (o = x)), q.length && s.appendChild(fa.createTextNode(q.join(" ").replace(/- /g, "-")));
								w && a.attr("title", a.textStr), a.rotation = C
							}
							j++
						}
					}
				})
			}), t && t.removeChild(e), q && a.applyTextShadow && a.applyTextShadow(q)) : e.appendChild(fa.createTextNode(v(h)))
		},
		getContrast: function(a) {
			return a = ib(a).rgba, a[0] + a[1] + a[2] > 384 ? "#000000" : "#FFFFFF"
		},
		button: function(b, c, d, e, f, g, h, i, j) {
			var k, l, m, n, o, p, q = this.label(b, c, d, j, null, null, null, null, "button"),
				r = 0,
				b = {
					x1: 0,
					y1: 0,
					x2: 0,
					y2: 1
				},
				f = a({
					"stroke-width": 1,
					stroke: "#CCCCCC",
					fill: {
						linearGradient: b,
						stops: [
							[0, "#FEFEFE"],
							[1, "#F6F6F6"]
						]
					},
					r: 2,
					padding: 5,
					style: {
						color: "black"
					}
				}, f);
			return m = f.style, delete f.style, g = a(f, {
				stroke: "#68A",
				fill: {
					linearGradient: b,
					stops: [
						[0, "#FFF"],
						[1, "#ACF"]
					]
				}
			}, g), n = g.style, delete g.style, h = a(f, {
				stroke: "#68A",
				fill: {
					linearGradient: b,
					stops: [
						[0, "#9BD"],
						[1, "#CDF"]
					]
				}
			}, h), o = h.style, delete h.style, i = a(f, {
				style: {
					color: "#CCC"
				}
			}, i), p = i.style, delete i.style, $a(q.element, ua ? "mouseover" : "mouseenter", function() {
				3 !== r && q.attr(g).css(n)
			}), $a(q.element, ua ? "mouseout" : "mouseleave", function() {
				3 !== r && (k = [f, g, h][r], l = [m, n, o][r], q.attr(k).css(l))
			}), q.setState = function(a) {
				(q.state = r = a) ? 2 === a ? q.attr(h).css(o) : 3 === a && q.attr(i).css(p) : q.attr(f).css(m)
			}, q.on("click", function() {
				3 !== r && e.call(q)
			}).attr(f).css(Oa({
				cursor: "default"
			}, m))
		},
		crispLine: function(a, b) {
			return a[1] === a[4] && (a[1] = a[4] = ia(a[1]) - b % 2 / 2), a[2] === a[5] && (a[2] = a[5] = ia(a[2]) + b % 2 / 2), a
		},
		path: function(a) {
			var b = {
				fill: Ja
			};
			return e(a) ? b.d = a : d(a) && Oa(b, a), this.createElement("path").attr(b)
		},
		circle: function(a, b, c) {
			return a = d(a) ? a : {
				x: a,
				y: b,
				r: c
			}, b = this.createElement("circle"), b.xSetter = function(a) {
				this.element.setAttribute("cx", a)
			}, b.ySetter = function(a) {
				this.element.setAttribute("cy", a)
			}, b.attr(a)
		},
		arc: function(a, b, c, e, f, g) {
			return d(a) && (b = a.y, c = a.r, e = a.innerR, f = a.start, g = a.end, a = a.x), a = this.symbol("arc", a || 0, b || 0, c || 0, c || 0, {
				innerR: e || 0,
				start: f || 0,
				end: g || 0
			}), a.r = c, a
		},
		rect: function(a, b, c, e, f, g) {
			var f = d(a) ? a.r : f,
				h = this.createElement("rect"),
				a = d(a) ? a : a === G ? {} : {
					x: a,
					y: b,
					width: la(c, 0),
					height: la(e, 0)
				};
			return g !== G && (a.strokeWidth = g, a = h.crisp(a)), f && (a.r = f), h.rSetter = function(a) {
				k(this.element, {
					rx: a,
					ry: a
				})
			}, h.attr(a)
		},
		setSize: function(a, b, c) {
			var d = this.alignedObjects,
				e = d.length;
			for (this.width = a, this.height = b, this.boxWrapper[Pa(c, !0) ? "animate" : "attr"]({
				width: a,
				height: b
			}); e--;) d[e].align()
		},
		g: function(a) {
			var b = this.createElement("g");
			return j(a) ? b.attr({
				"class": "highcharts-" + a
			}) : b
		},
		image: function(a, b, c, d, e) {
			var f = {
				preserveAspectRatio: Ja
			};
			return arguments.length > 1 && Oa(f, {
				x: b,
				y: c,
				width: d,
				height: e
			}), f = this.createElement("image").attr(f), f.element.setAttributeNS ? f.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : f.element.setAttribute("hc-svg-href", a), f
		},
		symbol: function(a, b, c, d, e, f) {
			var g, h, i, j = this.symbols[a],
				j = j && j(ia(b), ia(c), d, e, f),
				k = /^url\((.*?)\)$/;
			return j ? (g = this.path(j), Oa(g, {
				symbolName: a,
				x: b,
				y: c,
				width: d,
				height: e
			}), f && Oa(g, f)) : k.test(a) && (i = function(a, b) {
				a.element && (a.attr({
					width: b[0],
					height: b[1]
				}), a.alignByTranslate || a.translate(ia((d - b[0]) / 2), ia((e - b[1]) / 2)))
			}, h = a.match(k)[1], a = Da[h] || f && f.width && f.height && [f.width, f.height], g = this.image(h).attr({
				x: b,
				y: c
			}), g.isImg = !0, a ? i(g, a) : (g.attr({
				width: 0,
				height: 0
			}), n("img", {
				onload: function() {
					i(g, Da[h] = [this.width, this.height])
				},
				src: h
			}))), g
		},
		symbols: {
			circle: function(a, b, c, d) {
				var e = .166 * c;
				return ["M", a + c / 2, b, "C", a + c + e, b, a + c + e, b + d, a + c / 2, b + d, "C", a - e, b + d, a - e, b, a + c / 2, b, "Z"]
			},
			square: function(a, b, c, d) {
				return ["M", a, b, "L", a + c, b, a + c, b + d, a, b + d, "Z"]
			},
			triangle: function(a, b, c, d) {
				return ["M", a + c / 2, b, "L", a + c, b + d, a, b + d, "Z"]
			},
			"triangle-down": function(a, b, c, d) {
				return ["M", a, b, "L", a + c, b, a + c / 2, b + d, "Z"]
			},
			diamond: function(a, b, c, d) {
				return ["M", a + c / 2, b, "L", a + c, b + d / 2, a + c / 2, b + d, a, b + d / 2, "Z"]
			},
			arc: function(a, b, c, d, e) {
				var f = e.start,
					c = e.r || c || d,
					g = e.end - .001,
					d = e.innerR,
					h = e.open,
					i = oa(f),
					j = pa(f),
					k = oa(g),
					g = pa(g),
					e = e.end - f < qa ? 0 : 1;
				return ["M", a + c * i, b + c * j, "A", c, c, 0, e, 1, a + c * k, b + c * g, h ? "M" : "L", a + d * k, b + d * g, "A", d, d, 0, e, 0, a + d * i, b + d * j, h ? "" : "Z"]
			},
			callout: function(a, b, c, d, e) {
				var f, g = ma(e && e.r || 0, c, d),
					h = g + 6,
					i = e && e.anchorX,
					e = e && e.anchorY;
				return f = ["M", a + g, b, "L", a + c - g, b, "C", a + c, b, a + c, b, a + c, b + g, "L", a + c, b + d - g, "C", a + c, b + d, a + c, b + d, a + c - g, b + d, "L", a + g, b + d, "C", a, b + d, a, b + d, a, b + d - g, "L", a, b + g, "C", a, b, a, b, a + g, b], i && i > c && e > b + h && b + d - h > e ? f.splice(13, 3, "L", a + c, e - 6, a + c + 6, e, a + c, e + 6, a + c, b + d - g) : i && 0 > i && e > b + h && b + d - h > e ? f.splice(33, 3, "L", a, e + 6, a - 6, e, a, e - 6, a, b + g) : e && e > d && i > a + h && a + c - h > i ? f.splice(23, 3, "L", i + 6, b + d, i, b + d + 6, i - 6, b + d, a + g, b + d) : e && 0 > e && i > a + h && a + c - h > i && f.splice(3, 3, "L", i - 6, b, i, b - 6, i + 6, b, c - g, b), f
			}
		},
		clipRect: function(a, b, c, d) {
			var e = "highcharts-" + Ea++,
				f = this.createElement("clipPath").attr({
					id: e
				}).add(this.defs),
				a = this.rect(a, b, c, d, 0).add(f);
			return a.id = e, a.clipPath = f, a.count = 0, a
		},
		text: function(a, b, c, d) {
			var e = Ca || !Aa && this.forExport,
				f = {};
			return d && !this.forExport ? this.html(a, b, c) : (f.x = Math.round(b || 0), c && (f.y = Math.round(c)), (a || 0 === a) && (f.text = a), a = this.createElement("text").attr(f), e && a.css({
				position: "absolute"
			}), d || (a.xSetter = function(a, b, c) {
				var d, e, f = c.getElementsByTagName("tspan"),
					g = c.getAttribute(b);
				for (e = 0; e < f.length; e++) d = f[e], d.getAttribute(b) === g && d.setAttribute(b, a);
				c.setAttribute(b, a)
			}), a)
		},
		fontMetrics: function(a, c) {
			var d, e, a = a || this.style.fontSize;
			return c && ga.getComputedStyle && (c = c.element || c, a = (d = ga.getComputedStyle(c, "")) && d.fontSize), a = /px/.test(a) ? b(a) : /em/.test(a) ? 12 * parseFloat(a) : 12, d = 24 > a ? a + 3 : ia(1.2 * a), e = ia(.8 * d), {
				h: d,
				b: e,
				f: a
			}
		},
		rotCorr: function(a, b, c) {
			var d = a;
			return b && c && (d = la(d * oa(b * ra), 4)), {
				x: -a / 3 * pa(b * ra),
				y: d
			}
		},
		label: function(b, c, d, e, f, g, h, i, k) {
			function l() {
				var a, b;
				a = y.element.style, p = (void 0 === q || void 0 === r || x.styles.textAlign) && j(y.textStr) && y.getBBox(), x.width = (q || p.width || 0) + 2 * A + B, x.height = (r || p.height || 0) + 2 * A, u = A + w.fontMetrics(a && a.fontSize, y).b, v && (o || (a = ia(-z * A) + C, b = (i ? -u : 0) + C, x.box = o = e ? w.symbol(e, a, b, x.width, x.height, E) : w.rect(a, b, x.width, x.height, 0, E[Ma]), o.attr("fill", Ja).add(x)), o.isImg || o.attr(Oa({
					width: ia(x.width),
					height: ia(x.height)
				}, E)), E = null)
			}
			function m() {
				var a, b = x.styles,
					b = b && b.textAlign,
					c = B + A * (1 - z);
				a = i ? 0 : u, j(q) && p && ("center" === b || "right" === b) && (c += {
					center: .5,
					right: 1
				}[b] * (q - p.width)), (c !== y.x || a !== y.y) && (y.attr("x", c), a !== G && y.attr("y", a)), y.x = c, y.y = a
			}
			function n(a, b) {
				o ? o.attr(a, b) : E[a] = b
			}
			var o, p, q, r, s, t, u, v, w = this,
				x = w.g(k),
				y = w.text("", 0, 0, h).attr({
					zIndex: 1
				}),
				z = 0,
				A = 3,
				B = 0,
				C = 0,
				E = {};
			x.onAdd = function() {
				y.add(x), x.attr({
					text: b || 0 === b ? b : "",
					x: c,
					y: d
				}), o && j(f) && x.attr({
					anchorX: f,
					anchorY: g
				})
			}, x.widthSetter = function(a) {
				q = a
			}, x.heightSetter = function(a) {
				r = a
			}, x.paddingSetter = function(a) {
				j(a) && a !== A && (A = x.padding = a, m())
			}, x.paddingLeftSetter = function(a) {
				j(a) && a !== B && (B = a, m())
			}, x.alignSetter = function(a) {
				z = {
					left: 0,
					center: .5,
					right: 1
				}[a]
			}, x.textSetter = function(a) {
				a !== G && y.textSetter(a), l(), m()
			}, x["stroke-widthSetter"] = function(a, b) {
				a && (v = !0), C = a % 2 / 2, n(b, a)
			}, x.strokeSetter = x.fillSetter = x.rSetter = function(a, b) {
				"fill" === b && a && (v = !0), n(b, a)
			}, x.anchorXSetter = function(a, b) {
				f = a, n(b, ia(a) - C - s)
			}, x.anchorYSetter = function(a, b) {
				g = a, n(b, a - t)
			}, x.xSetter = function(a) {
				x.x = a, z && (a -= z * ((q || p.width) + A)), s = ia(a), x.attr("translateX", s)
			}, x.ySetter = function(a) {
				t = x.y = ia(a), x.attr("translateY", t)
			};
			var F = x.css;
			return Oa(x, {
				css: function(b) {
					if (b) {
						var c = {},
							b = a(b);
						Wa(x.textProps, function(a) {
							b[a] !== G && (c[a] = b[a], delete b[a])
						}), y.css(c)
					}
					return F.call(x, b)
				},
				getBBox: function() {
					return {
						width: p.width + 2 * A,
						height: p.height + 2 * A,
						x: p.x - A,
						y: p.y - A
					}
				},
				shadow: function(a) {
					return o && o.shadow(a), x
				},
				destroy: function() {
					_a(x.element, "mouseenter"), _a(x.element, "mouseleave"), y && (y = y.destroy()), o && (o = o.destroy()), D.prototype.destroy.call(x), x = w = l = m = n = null
				}
			})
		}
	}, H = jb, Oa(D.prototype, {
		htmlCss: function(a) {
			var b = this.element;
			return (b = a && "SPAN" === b.tagName && a.width) && (delete a.width, this.textWidth = b, this.updateTransform()), a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden"), this.styles = Oa(this.styles, a), m(this.element, a), this
		},
		htmlGetBBox: function() {
			var a = this.element;
			return "text" === a.nodeName && (a.style.position = "absolute"), {
				x: a.offsetLeft,
				y: a.offsetTop,
				width: a.offsetWidth,
				height: a.offsetHeight
			}
		},
		htmlUpdateTransform: function() {
			if (this.added) {
				var a = this.renderer,
					c = this.element,
					d = this.translateX || 0,
					e = this.translateY || 0,
					f = this.x || 0,
					g = this.y || 0,
					h = this.textAlign || "left",
					i = {
						left: 0,
						center: .5,
						right: 1
					}[h],
					k = this.shadows,
					l = this.styles;
				if (m(c, {
					marginLeft: d,
					marginTop: e
				}), k && Wa(k, function(a) {
					m(a, {
						marginLeft: d + 1,
						marginTop: e + 1
					})
				}), this.inverted && Wa(c.childNodes, function(b) {
					a.invertChild(b, c)
				}), "SPAN" === c.tagName) {
					var n, o = this.rotation,
						p = b(this.textWidth),
						q = [o, h, c.innerHTML, this.textWidth].join(",");
					q !== this.cTT && (n = a.fontMetrics(c.style.fontSize).b, j(o) && this.setSpanRotation(o, i, n), k = Pa(this.elemWidth, c.offsetWidth), k > p && /[ \-]/.test(c.textContent || c.innerText) && (m(c, {
						width: p + "px",
						display: "block",
						whiteSpace: l && l.whiteSpace || "normal"
					}), k = p), this.getSpanCorrection(k, n, i, o, h)), m(c, {
						left: f + (this.xCorr || 0) + "px",
						top: g + (this.yCorr || 0) + "px"
					}), wa && (n = c.offsetHeight), this.cTT = q
				}
			} else this.alignOnAdd = !0
		},
		setSpanRotation: function(a, b, c) {
			var d = {},
				e = ua ? "-ms-transform" : wa ? "-webkit-transform" : xa ? "MozTransform" : ta ? "-o-transform" : "";
			d[e] = d.transform = "rotate(" + a + "deg)", d[e + (xa ? "Origin" : "-origin")] = d.transformOrigin = 100 * b + "% " + c + "px", m(this.element, d)
		},
		getSpanCorrection: function(a, b, c) {
			this.xCorr = -a * c, this.yCorr = -b
		}
	}), Oa(jb.prototype, {
		html: function(a, b, c) {
			var d = this.createElement("span"),
				e = d.element,
				f = d.renderer;
			return d.textSetter = function(a) {
				a !== e.innerHTML && delete this.bBox, e.innerHTML = this.textStr = a
			}, d.xSetter = d.ySetter = d.alignSetter = d.rotationSetter = function(a, b) {
				"align" === b && (b = "textAlign"), d[b] = a, d.htmlUpdateTransform()
			}, d.attr({
				text: a,
				x: ia(b),
				y: ia(c)
			}).css({
				position: "absolute",
				fontFamily: this.style.fontFamily,
				fontSize: this.style.fontSize
			}), e.style.whiteSpace = "nowrap", d.css = d.htmlCss, f.isSVG && (d.add = function(a) {
				var b, c = f.box.parentNode,
					g = [];
				if (this.parentGroup = a) {
					if (b = a.div, !b) {
						for (; a;) g.push(a), a = a.parentGroup;
						Wa(g.reverse(), function(a) {
							var d, e = k(a.element, "class");
							e && (e = {
								className: e
							}), b = a.div = a.div || n(Ia, e, {
								position: "absolute",
								left: (a.translateX || 0) + "px",
								top: (a.translateY || 0) + "px"
							}, b || c), d = b.style, Oa(a, {
								translateXSetter: function(b, c) {
									d.left = b + "px", a[c] = b, a.doTransform = !0
								},
								translateYSetter: function(b, c) {
									d.top = b + "px", a[c] = b, a.doTransform = !0
								},
								visibilitySetter: function(a, b) {
									d[b] = a
								}
							})
						})
					}
				} else b = c;
				return b.appendChild(e), d.added = !0, d.alignOnAdd && d.htmlUpdateTransform(), d
			}), d
		}
	}), !Aa && !Ca) {
		Sa = {
			init: function(a, b) {
				var c = ["<", b, ' filled="f" stroked="f"'],
					d = ["position: ", "absolute", ";"],
					e = b === Ia;
				("shape" === b || e) && d.push("left:0;top:0;width:1px;height:1px;"), d.push("visibility: ", e ? "hidden" : "visible"), c.push(' style="', d.join(""), '"/>'), b && (c = e || "span" === b || "img" === b ? c.join("") : a.prepVML(c), this.element = n(c)), this.renderer = a
			},
			add: function(a) {
				var b = this.renderer,
					c = this.element,
					d = b.box,
					d = a ? a.element || a : d;
				return a && a.inverted && b.invertChild(c, d), d.appendChild(c), this.added = !0, this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform(), this.onAdd && this.onAdd(), this
			},
			updateTransform: D.prototype.htmlUpdateTransform,
			setSpanRotation: function() {
				var a = this.rotation,
					b = oa(a * ra),
					c = pa(a * ra);
				m(this.element, {
					filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", b, ", M12=", -c, ", M21=", c, ", M22=", b, ", sizingMethod='auto expand')"].join("") : Ja
				})
			},
			getSpanCorrection: function(a, b, c, d, e) {
				var f, g = d ? oa(d * ra) : 1,
					h = d ? pa(d * ra) : 0,
					i = Pa(this.elemHeight, this.element.offsetHeight);
				this.xCorr = 0 > g && -a, this.yCorr = 0 > h && -i, f = 0 > g * h, this.xCorr += h * b * (f ? 1 - c : c), this.yCorr -= g * b * (d ? f ? c : 1 - c : 1), e && "left" !== e && (this.xCorr -= a * c * (0 > g ? -1 : 1), d && (this.yCorr -= i * c * (0 > h ? -1 : 1)), m(this.element, {
					textAlign: e
				}))
			},
			pathToVML: function(a) {
				for (var b = a.length, c = []; b--;) f(a[b]) ? c[b] = ia(10 * a[b]) - 5 : "Z" === a[b] ? c[b] = "x" : (c[b] = a[b], !a.isArc || "wa" !== a[b] && "at" !== a[b] || (c[b + 5] === c[b + 7] && (c[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1), c[b + 6] === c[b + 8] && (c[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1)));
				return c.join(" ") || "x"
			},
			clip: function(a) {
				var b, c = this;
				return a ? (b = a.members, i(b, c), b.push(c), c.destroyClip = function() {
					i(b, c)
				}, a = a.getCSS(c)) : (c.destroyClip && c.destroyClip(), a = {
					clip: va ? "inherit" : "rect(auto)"
				}), c.css(a)
			},
			css: D.prototype.htmlCss,
			safeRemoveChild: function(a) {
				a.parentNode && y(a)
			},
			destroy: function() {
				return this.destroyClip && this.destroyClip(), D.prototype.destroy.apply(this)
			},
			on: function(a, b) {
				return this.element["on" + a] = function() {
					var a = ga.event;
					a.target = a.srcElement, b(a)
				}, this
			},
			cutOffPath: function(a, c) {
				var d, a = a.split(/[ ,]/);
				return d = a.length, (9 === d || 11 === d) && (a[d - 4] = a[d - 2] = b(a[d - 2]) - 10 * c), a.join(" ")
			},
			shadow: function(a, c, d) {
				var e, f, g, h, i, j, k, l = [],
					m = this.element,
					o = this.renderer,
					p = m.style,
					q = m.path;
				if (q && "string" != typeof q.value && (q = "x"), i = q, a) {
					for (j = Pa(a.width, 3), k = (a.opacity || .15) / j, e = 1; 3 >= e; e++) h = 2 * j + 1 - 2 * e, d && (i = this.cutOffPath(q.value, h + .5)), g = ['<shape isShadow="true" strokeweight="', h, '" filled="false" path="', i, '" coordsize="10 10" style="', m.style.cssText, '" />'], f = n(o.prepVML(g), null, {
						left: b(p.left) + Pa(a.offsetX, 1),
						top: b(p.top) + Pa(a.offsetY, 1)
					}), d && (f.cutOff = h + 1), g = ['<stroke color="', a.color || "black", '" opacity="', k * e, '"/>'], n(o.prepVML(g), null, null, f), c ? c.element.appendChild(f) : m.parentNode.insertBefore(f, m), l.push(f);
					this.shadows = l
				}
				return this
			},
			updateShadows: Fa,
			setAttr: function(a, b) {
				va ? this.element[a] = b : this.element.setAttribute(a, b)
			},
			classSetter: function(a) {
				this.element.className = a
			},
			dashstyleSetter: function(a, b, c) {
				(c.getElementsByTagName("stroke")[0] || n(this.renderer.prepVML(["<stroke/>"]), null, null, c))[b] = a || "solid", this[b] = a
			},
			dSetter: function(a, b, c) {
				var d = this.shadows,
					a = a || [];
				if (this.d = a.join && a.join(" "), c.path = a = this.pathToVML(a), d) for (c = d.length; c--;) d[c].path = d[c].cutOff ? this.cutOffPath(a, d[c].cutOff) : a;
				this.setAttr(b, a)
			},
			fillSetter: function(a, b, c) {
				var d = c.nodeName;
				"SPAN" === d ? c.style.color = a : "IMG" !== d && (c.filled = a !== Ja, this.setAttr("fillcolor", this.renderer.color(a, c, b, this)))
			},
			opacitySetter: Fa,
			rotationSetter: function(a, b, c) {
				c = c.style, this[b] = c[b] = a, c.left = -ia(pa(a * ra) + 1) + "px", c.top = ia(oa(a * ra)) + "px"
			},
			strokeSetter: function(a, b, c) {
				this.setAttr("strokecolor", this.renderer.color(a, c, b))
			},
			"stroke-widthSetter": function(a, b, c) {
				c.stroked = !! a, this[b] = a, f(a) && (a += "px"), this.setAttr("strokeweight", a)
			},
			titleSetter: function(a, b) {
				this.setAttr(b, a)
			},
			visibilitySetter: function(a, b, c) {
				"inherit" === a && (a = "visible"), this.shadows && Wa(this.shadows, function(c) {
					c.style[b] = a
				}), "DIV" === c.nodeName && (a = "hidden" === a ? "-999em" : 0, va || (c.style[b] = a ? "visible" : "hidden"), b = "top"), c.style[b] = a
			},
			xSetter: function(a, b, c) {
				this[b] = a, "x" === b ? b = "left" : "y" === b && (b = "top"), this.updateClipping ? (this[b] = a, this.updateClipping()) : c.style[b] = a
			},
			zIndexSetter: function(a, b, c) {
				c.style[b] = a
			}
		}, ea.VMLElement = Sa = o(D, Sa), Sa.prototype.ySetter = Sa.prototype.widthSetter = Sa.prototype.heightSetter = Sa.prototype.xSetter;
		var kb = {
			Element: Sa,
			isIE8: sa.indexOf("MSIE 8.0") > -1,
			init: function(a, b, c, d) {
				var e;
				if (this.alignedObjects = [], d = this.createElement(Ia).css(Oa(this.getStyle(d), {
					position: "relative"
				})), e = d.element, a.appendChild(d.element), this.isVML = !0, this.box = e, this.boxWrapper = d, this.cache = {}, this.setSize(b, c, !1), !fa.namespaces.hcv) {
					fa.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
					try {
						fa.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
					} catch (f) {
						fa.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
					}
				}
			},
			isHidden: function() {
				return !this.box.offsetWidth
			},
			clipRect: function(a, b, c, e) {
				var f = this.createElement(),
					g = d(a);
				return Oa(f, {
					members: [],
					count: 0,
					left: (g ? a.x : a) + 1,
					top: (g ? a.y : b) + 1,
					width: (g ? a.width : c) - 1,
					height: (g ? a.height : e) - 1,
					getCSS: function(a) {
						var b = a.element,
							c = b.nodeName,
							a = a.inverted,
							d = this.top - ("shape" === c ? b.offsetTop : 0),
							e = this.left,
							b = e + this.width,
							f = d + this.height,
							d = {
								clip: "rect(" + ia(a ? e : d) + "px," + ia(a ? f : b) + "px," + ia(a ? b : f) + "px," + ia(a ? d : e) + "px)"
							};
						return !a && va && "DIV" === c && Oa(d, {
							width: b + "px",
							height: f + "px"
						}), d
					},
					updateClipping: function() {
						Wa(f.members, function(a) {
							a.element && a.css(f.getCSS(a))
						})
					}
				})
			},
			color: function(a, b, c, d) {
				var e, f, g, h = this,
					i = /^rgba/,
					j = Ja;
				if (a && a.linearGradient ? g = "gradient" : a && a.radialGradient && (g = "pattern"), g) {
					var k, l, m, o, p, q, r, s, t = a.linearGradient || a.radialGradient,
						u = "",
						a = a.stops,
						v = [],
						w = function() {
							f = ['<fill colors="' + v.join(",") + '" opacity="', p, '" o:opacity2="', o, '" type="', g, '" ', u, 'focus="100%" method="any" />'], n(h.prepVML(f), null, null, b)
						};
					if (m = a[0], s = a[a.length - 1], m[0] > 0 && a.unshift([0, m[1]]), s[0] < 1 && a.push([1, s[1]]), Wa(a, function(a, b) {
						i.test(a[1]) ? (e = ib(a[1]), k = e.get("rgb"), l = e.get("a")) : (k = a[1], l = 1), v.push(100 * a[0] + "% " + k), b ? (p = l, q = k) : (o = l, r = k)
					}), "fill" === c) if ("gradient" === g) c = t.x1 || t[0] || 0, a = t.y1 || t[1] || 0, m = t.x2 || t[2] || 0, t = t.y2 || t[3] || 0, u = 'angle="' + (90 - 180 * ha.atan((t - a) / (m - c)) / qa) + '"', w();
					else {
						var x, j = t.r,
							y = 2 * j,
							z = 2 * j,
							A = t.cx,
							B = t.cy,
							C = b.radialReference,
							j = function() {
								C && (x = d.getBBox(), A += (C[0] - x.x) / x.width - .5, B += (C[1] - x.y) / x.height - .5, y *= C[2] / x.width, z *= C[2] / x.height), u = 'src="' + K.global.VMLRadialGradientURL + '" size="' + y + "," + z + '" origin="0.5,0.5" position="' + A + "," + B + '" color2="' + r + '" ', w()
							};
						d.added ? j() : d.onAdd = j, j = q
					} else j = k
				} else i.test(a) && "IMG" !== b.tagName ? (e = ib(a), f = ["<", c, ' opacity="', e.get("a"), '"/>'], n(this.prepVML(f), null, null, b), j = e.get("rgb")) : (j = b.getElementsByTagName(c), j.length && (j[0].opacity = 1, j[0].type = "solid"), j = a);
				return j
			},
			prepVML: function(a) {
				var b = this.isIE8,
					a = a.join("");
				return b ? (a = a.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), a = -1 === a.indexOf('style="') ? a.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : a.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : a = a.replace("<", "<hcv:"), a
			},
			text: jb.prototype.html,
			path: function(a) {
				var b = {
					coordsize: "10 10"
				};
				return e(a) ? b.d = a : d(a) && Oa(b, a), this.createElement("shape").attr(b)
			},
			circle: function(a, b, c) {
				var e = this.symbol("circle");
				return d(a) && (c = a.r, b = a.y, a = a.x), e.isCircle = !0, e.r = c, e.attr({
					x: a,
					y: b
				})
			},
			g: function(a) {
				var b;
				return a && (b = {
					className: "highcharts-" + a,
					"class": "highcharts-" + a
				}), this.createElement(Ia).attr(b)
			},
			image: function(a, b, c, d, e) {
				var f = this.createElement("img").attr({
					src: a
				});
				return arguments.length > 1 && f.attr({
					x: b,
					y: c,
					width: d,
					height: e
				}), f
			},
			createElement: function(a) {
				return "rect" === a ? this.symbol(a) : jb.prototype.createElement.call(this, a)
			},
			invertChild: function(a, c) {
				var d = this,
					e = c.style,
					f = "IMG" === a.tagName && a.style;
				m(a, {
					flip: "x",
					left: b(e.width) - (f ? b(f.top) : 1),
					top: b(e.height) - (f ? b(f.left) : 1),
					rotation: -90
				}), Wa(a.childNodes, function(b) {
					d.invertChild(b, a)
				})
			},
			symbols: {
				arc: function(a, b, c, d, e) {
					var f = e.start,
						g = e.end,
						h = e.r || c || d,
						c = e.innerR,
						d = oa(f),
						i = pa(f),
						j = oa(g),
						k = pa(g);
					return g - f === 0 ? ["x"] : (f = ["wa", a - h, b - h, a + h, b + h, a + h * d, b + h * i, a + h * j, b + h * k], e.open && !c && f.push("e", "M", a, b), f.push("at", a - c, b - c, a + c, b + c, a + c * j, b + c * k, a + c * d, b + c * i, "x", "e"), f.isArc = !0, f)
				},
				circle: function(a, b, c, d, e) {
					return e && (c = d = 2 * e.r), e && e.isCircle && (a -= c / 2, b -= d / 2), ["wa", a, b, a + c, b + d, a + c, b + d / 2, a + c, b + d / 2, "e"]
				},
				rect: function(a, b, c, d, e) {
					return jb.prototype.symbols[j(e) && e.r ? "callout" : "square"].call(0, a, b, c, d, e)
				}
			}
		};
		ea.VMLRenderer = Sa = function() {
			this.init.apply(this, arguments)
		}, Sa.prototype = a(jb.prototype, kb), H = Sa
	}
	jb.prototype.measureSpanWidth = function(a, b) {
		var c, d = fa.createElement("span");
		return c = fa.createTextNode(a), d.appendChild(c), m(d, b), this.box.appendChild(d), c = d.offsetWidth, y(d), c
	};
	var lb;
	Ca && (ea.CanVGRenderer = Sa = function() {
		za = "http://www.w3.org/1999/xhtml"
	}, Sa.prototype.symbols = {}, lb = function() {
		function a() {
			var a, c = b.length;
			for (a = 0; c > a; a++) b[a]();
			b = []
		}
		var b = [];
		return {
			push: function(c, d) {
				0 === b.length && Ua(d, a), b.push(c)
			}
		}
	}(), H = Sa), E.prototype = {
		addLabel: function() {
			var b, c = this.axis,
				d = c.options,
				e = c.chart,
				f = c.categories,
				g = c.names,
				i = this.pos,
				k = d.labels,
				l = c.tickPositions,
				m = i === l[0],
				n = i === l[l.length - 1],
				g = f ? Pa(f[i], g[i], i) : i,
				f = this.label,
				l = l.info;
			c.isDatetimeAxis && l && (b = d.dateTimeLabelFormats[l.higherRanks[i] || l.unitName]), this.isFirst = m, this.isLast = n, d = c.labelFormatter.call({
				axis: c,
				chart: e,
				isFirst: m,
				isLast: n,
				dateTimeLabelFormat: b,
				value: c.isLog ? A(h(g)) : g
			}), j(f) ? f && f.attr({
				text: d
			}) : (this.labelLength = (this.label = f = j(d) && k.enabled ? e.renderer.text(d, 0, 0, k.useHTML).css(a(k.style)).add(c.labelGroup) : null) && f.getBBox().width, this.rotation = 0)
		},
		getLabelSize: function() {
			return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
		},
		handleOverflow: function(a) {
			var b, c = this.axis,
				d = a.x,
				e = c.chart.chartWidth,
				f = c.chart.spacing,
				g = Pa(c.labelLeft, ma(c.pos, f[3])),
				f = Pa(c.labelRight, la(c.pos + c.len, e - f[1])),
				h = this.label,
				i = this.rotation,
				j = {
					left: 0,
					center: .5,
					right: 1
				}[c.labelAlign],
				k = h.getBBox().width,
				l = c.slotWidth,
				m = 1,
				n = {};
			i ? 0 > i && g > d - j * k ? b = ia(d / oa(i * ra) - g) : i > 0 && d + j * k > f && (b = ia((e - d) / oa(i * ra))) : (e = d + (1 - j) * k, g > d - j * k ? l = a.x + l * (1 - j) - g : e > f && (l = f - a.x + l * j, m = -1), l = ma(c.slotWidth, l), l < c.slotWidth && "center" === c.labelAlign && (a.x += m * (c.slotWidth - l - j * (c.slotWidth - ma(k, l)))), (k > l || c.autoRotation && h.styles.width) && (b = l)), b && (n.width = b, c.options.labels.style.textOverflow || (n.textOverflow = "ellipsis"), h.css(n))
		},
		getPosition: function(a, b, c, d) {
			var e = this.axis,
				f = e.chart,
				g = d && f.oldChartHeight || f.chartHeight;
			return {
				x: a ? e.translate(b + c, null, null, d) + e.transB : e.left + e.offset + (e.opposite ? (d && f.oldChartWidth || f.chartWidth) - e.right - e.left : 0),
				y: a ? g - e.bottom + e.offset - (e.opposite ? e.height : 0) : g - e.translate(b + c, null, null, d) - e.transB
			}
		},
		getLabelPosition: function(a, b, c, d, e, f, g, h) {
			var i = this.axis,
				j = i.transA,
				k = i.reversed,
				l = i.staggerLines,
				m = i.tickRotCorr || {
					x: 0,
					y: 0
				},
				c = Pa(e.y, m.y + (2 === i.side ? 8 : -(c.getBBox().height / 2))),
				a = a + e.x + m.x - (f && d ? f * j * (k ? -1 : 1) : 0),
				b = b + c - (f && !d ? f * j * (k ? 1 : -1) : 0);
			return l && (b += g / (h || 1) % l * (i.labelOffset / l)), {
				x: a,
				y: ia(b)
			}
		},
		getMarkPath: function(a, b, c, d, e, f) {
			return f.crispLine(["M", a, b, "L", a + (e ? 0 : -c), b + (e ? c : 0)], d)
		},
		render: function(a, b, c) {
			var d = this.axis,
				e = d.options,
				f = d.chart.renderer,
				g = d.horiz,
				h = this.type,
				i = this.label,
				j = this.pos,
				k = e.labels,
				l = this.gridLine,
				m = h ? h + "Grid" : "grid",
				n = h ? h + "Tick" : "tick",
				o = e[m + "LineWidth"],
				p = e[m + "LineColor"],
				q = e[m + "LineDashStyle"],
				r = e[n + "Length"],
				m = e[n + "Width"] || 0,
				s = e[n + "Color"],
				t = e[n + "Position"],
				n = this.mark,
				u = k.step,
				v = !0,
				w = d.tickmarkOffset,
				x = this.getPosition(g, j, w, b),
				y = x.x,
				x = x.y,
				z = g && y === d.pos + d.len || !g && x === d.pos ? -1 : 1,
				c = Pa(c, 1);
			this.isActive = !0, o && (j = d.getPlotLinePath(j + w, o * z, b, !0), l === G && (l = {
				stroke: p,
				"stroke-width": o
			}, q && (l.dashstyle = q), h || (l.zIndex = 1), b && (l.opacity = 0), this.gridLine = l = o ? f.path(j).attr(l).add(d.gridGroup) : null), !b && l && j && l[this.isNew ? "attr" : "animate"]({
				d: j,
				opacity: c
			})), m && r && ("inside" === t && (r = -r), d.opposite && (r = -r), h = this.getMarkPath(y, x, r, m * z, g, f), n ? n.animate({
				d: h,
				opacity: c
			}) : this.mark = f.path(h).attr({
				stroke: s,
				"stroke-width": m,
				opacity: c
			}).add(d.axisGroup)), i && !isNaN(y) && (i.xy = x = this.getLabelPosition(y, x, i, g, k, w, a, u), this.isFirst && !this.isLast && !Pa(e.showFirstLabel, 1) || this.isLast && !this.isFirst && !Pa(e.showLastLabel, 1) ? v = !1 : g && !d.isRadial && !k.step && !k.rotation && !b && 0 !== c && this.handleOverflow(x), u && a % u && (v = !1), v && !isNaN(x.y) ? (x.opacity = c, i[this.isNew ? "attr" : "animate"](x), this.isNew = !1) : i.attr("y", -9999))
		},
		destroy: function() {
			x(this, this.axis)
		}
	}, ea.PlotLineOrBand = function(a, b) {
		this.axis = a, b && (this.options = b, this.id = b.id)
	}, ea.PlotLineOrBand.prototype = {
		render: function() {
			var b, c = this,
				d = c.axis,
				e = d.horiz,
				f = c.options,
				h = f.label,
				i = c.label,
				k = f.width,
				l = f.to,
				m = f.from,
				n = j(m) && j(l),
				o = f.value,
				p = f.dashStyle,
				q = c.svgElem,
				r = [],
				s = f.color,
				t = f.zIndex,
				u = f.events,
				x = {},
				y = d.chart.renderer;
			if (d.isLog && (m = g(m), l = g(l), o = g(o)), k) r = d.getPlotLinePath(o, k), x = {
				stroke: s,
				"stroke-width": k
			}, p && (x.dashstyle = p);
			else {
				if (!n) return;
				r = d.getPlotBandPath(m, l, f), s && (x.fill = s), f.borderWidth && (x.stroke = f.borderColor, x["stroke-width"] = f.borderWidth)
			}
			if (j(t) && (x.zIndex = t), q) r ? q.animate({
				d: r
			}, null, q.onGetPath) : (q.hide(), q.onGetPath = function() {
				q.show()
			}, i && (c.label = i = i.destroy()));
			else if (r && r.length && (c.svgElem = q = y.path(r).attr(x).add(), u)) for (b in f = function(a) {
				q.on(a, function(b) {
					u[a].apply(c, [b])
				})
			}, u) f(b);
			return h && j(h.text) && r && r.length && d.width > 0 && d.height > 0 ? (h = a({
				align: e && n && "center",
				x: e ? !n && 4 : 10,
				verticalAlign: !e && n && "middle",
				y: e ? n ? 16 : 10 : n ? 6 : -4,
				rotation: e && !n && 90
			}, h), i || (x = {
				align: h.textAlign || h.align,
				rotation: h.rotation
			}, j(t) && (x.zIndex = t), c.label = i = y.text(h.text, 0, 0, h.useHTML).attr(x).css(h.style).add()), d = [r[1], r[4], n ? r[6] : r[1]], n = [r[2], r[5], n ? r[7] : r[2]], r = v(d), e = v(n), i.align(h, !1, {
				x: r,
				y: e,
				width: w(d) - r,
				height: w(n) - e
			}), i.show()) : i && i.hide(), c
		},
		destroy: function() {
			i(this.axis.plotLinesAndBands, this), delete this.axis, x(this)
		}
	};
	var mb = ea.Axis = function() {
			this.init.apply(this, arguments)
		};
	mb.prototype = {
		defaultOptions: {
			dateTimeLabelFormats: {
				millisecond: "%H:%M:%S.%L",
				second: "%H:%M:%S",
				minute: "%H:%M",
				hour: "%H:%M",
				day: "%e. %b",
				week: "%e. %b",
				month: "%b '%y",
				year: "%Y"
			},
			endOnTick: !1,
			gridLineColor: "#D8D8D8",
			labels: {
				enabled: !0,
				style: {
					color: "#606060",
					cursor: "default",
					fontSize: "11px"
				},
				x: 0,
				y: 15
			},
			lineColor: "#C0D0E0",
			lineWidth: 1,
			minPadding: .01,
			maxPadding: .01,
			minorGridLineColor: "#E0E0E0",
			minorGridLineWidth: 1,
			minorTickColor: "#A0A0A0",
			minorTickLength: 2,
			minorTickPosition: "outside",
			startOfWeek: 1,
			startOnTick: !1,
			tickColor: "#C0D0E0",
			tickLength: 10,
			tickmarkPlacement: "between",
			tickPixelInterval: 100,
			tickPosition: "outside",
			tickWidth: 1,
			title: {
				align: "middle",
				style: {
					color: "#707070"
				}
			},
			type: "linear"
		},
		defaultYAxisOptions: {
			endOnTick: !0,
			gridLineWidth: 1,
			tickPixelInterval: 72,
			showLastLabel: !0,
			labels: {
				x: -8,
				y: 3
			},
			lineWidth: 0,
			maxPadding: .05,
			minPadding: .05,
			startOnTick: !0,
			tickWidth: 0,
			title: {
				rotation: 270,
				text: "Values"
			},
			stackLabels: {
				enabled: !1,
				formatter: function() {
					return ea.numberFormat(this.total, -1)
				},
				style: a(eb.line.dataLabels.style, {
					color: "#000000"
				})
			}
		},
		defaultLeftAxisOptions: {
			labels: {
				x: -15,
				y: null
			},
			title: {
				rotation: 270
			}
		},
		defaultRightAxisOptions: {
			labels: {
				x: 15,
				y: null
			},
			title: {
				rotation: 90
			}
		},
		defaultBottomAxisOptions: {
			labels: {
				autoRotation: [-45],
				x: 0,
				y: null
			},
			title: {
				rotation: 0
			}
		},
		defaultTopAxisOptions: {
			labels: {
				autoRotation: [-45],
				x: 0,
				y: -15
			},
			title: {
				rotation: 0
			}
		},
		init: function(a, b) {
			var c = b.isX;
			this.horiz = a.inverted ? !c : c, this.coll = (this.isXAxis = c) ? "xAxis" : "yAxis", this.opposite = b.opposite, this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3), this.setOptions(b);
			var d = this.options,
				e = d.type;
			this.labelFormatter = d.labels.formatter || this.defaultLabelFormatter, this.userOptions = b, this.minPixelPadding = 0, this.chart = a, this.reversed = d.reversed, this.zoomEnabled = d.zoomEnabled !== !1, this.categories = d.categories || "category" === e, this.names = this.names || [], this.isLog = "logarithmic" === e, this.isDatetimeAxis = "datetime" === e, this.isLinked = j(d.linkedTo), this.ticks = {}, this.labelEdge = [], this.minorTicks = {}, this.plotLinesAndBands = [], this.alternateBands = {}, this.len = 0, this.minRange = this.userMinRange = d.minRange || d.maxZoom, this.range = d.range, this.offset = d.offset || 0, this.stacks = {}, this.oldStacks = {}, this.min = this.max = null, this.crosshair = Pa(d.crosshair, l(a.options.tooltip.crosshairs)[c ? 0 : 1], !1);
			var f, d = this.options.events; - 1 === Va(this, a.axes) && (c && !this.isColorAxis ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this)), this.series = this.series || [], a.inverted && c && this.reversed === G && (this.reversed = !0), this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
			for (f in d) $a(this, f, d[f]);
			this.isLog && (this.val2lin = g, this.lin2val = h)
		},
		setOptions: function(b) {
			this.options = a(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], a(K[this.coll], b))
		},
		defaultLabelFormatter: function() {
			var a, b = this.axis,
				c = this.value,
				d = b.categories,
				e = this.dateTimeLabelFormat,
				f = K.lang.numericSymbols,
				g = f && f.length,
				h = b.options.labels.format,
				b = b.isLog ? c : b.tickInterval;
			if (h) a = r(h, this);
			else if (d) a = c;
			else if (e) a = L(e, c);
			else if (g && b >= 1e3) for (; g-- && a === G;) d = Math.pow(1e3, g + 1), b >= d && 10 * c % d === 0 && null !== f[g] && (a = ea.numberFormat(c / d, -1) + f[g]);
			return a === G && (a = na(c) >= 1e4 ? ea.numberFormat(c, -1) : ea.numberFormat(c, -1, G, "")), a
		},
		getSeriesExtremes: function() {
			var a = this,
				b = a.chart;
			a.hasVisibleSeries = !1, a.dataMin = a.dataMax = a.ignoreMinPadding = a.ignoreMaxPadding = null, a.buildStacks && a.buildStacks(), Wa(a.series, function(c) {
				if (c.visible || !b.options.chart.ignoreHiddenSeries) {
					var d;
					d = c.options.threshold;
					var e;
					a.hasVisibleSeries = !0, a.isLog && 0 >= d && (d = null), a.isXAxis ? (d = c.xData, d.length && (a.dataMin = ma(Pa(a.dataMin, d[0]), v(d)), a.dataMax = la(Pa(a.dataMax, d[0]), w(d)))) : (c.getExtremes(), e = c.dataMax, c = c.dataMin, j(c) && j(e) && (a.dataMin = ma(Pa(a.dataMin, c), c), a.dataMax = la(Pa(a.dataMax, e), e)), j(d) && (a.dataMin >= d ? (a.dataMin = d, a.ignoreMinPadding = !0) : a.dataMax < d && (a.dataMax = d, a.ignoreMaxPadding = !0)))
				}
			})
		},
		translate: function(a, b, c, d, e, g) {
			var h = this.linkedParent || this,
				i = 1,
				j = 0,
				k = d ? h.oldTransA : h.transA,
				d = d ? h.oldMin : h.min,
				l = h.minPixelPadding,
				e = (h.doPostTranslate || h.isLog && e) && h.lin2val;
			return k || (k = h.transA), c && (i *= -1, j = h.len), h.reversed && (i *= -1, j -= i * (h.sector || h.len)), b ? (a = a * i + j, a -= l, a = a / k + d, e && (a = h.lin2val(a))) : (e && (a = h.val2lin(a)), "between" === g && (g = .5), a = i * (a - d) * k + j + i * l + (f(g) ? k * g * h.pointRange : 0)), a
		},
		toPixels: function(a, b) {
			return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
		},
		toValue: function(a, b) {
			return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
		},
		getPlotLinePath: function(a, b, c, d, e) {
			var f, g, h, i = this.chart,
				j = this.left,
				k = this.top,
				l = c && i.oldChartHeight || i.chartHeight,
				m = c && i.oldChartWidth || i.chartWidth;
			f = this.transB;
			var n = function(a, b, c) {
					return (b > a || a > c) && (d ? a = ma(la(b, a), c) : h = !0), a
				},
				e = Pa(e, this.translate(a, null, null, c)),
				a = c = ia(e + f);
			return f = g = ia(l - e - f), isNaN(e) ? h = !0 : this.horiz ? (f = k, g = l - this.bottom, a = c = n(a, j, j + this.width)) : (a = j, c = m - this.right, f = g = n(f, k, k + this.height)), h && !d ? null : i.renderer.crispLine(["M", a, f, "L", c, g], b || 1)
		},
		getLinearTickPositions: function(a, b, c) {
			var d, e = A(ja(b / a) * a),
				g = A(ka(c / a) * a),
				h = [];
			if (b === c && f(b)) return [b];
			for (b = e; g >= b && (h.push(b), b = A(b + a), b !== d);) d = b;
			return h
		},
		getMinorTickPositions: function() {
			var a, b = this.options,
				c = this.tickPositions,
				d = this.minorTickInterval,
				e = [],
				f = this.min;
			a = this.max;
			var g = a - f;
			if (g && g / d < this.len / 3) if (this.isLog) for (b = c.length, a = 1; b > a; a++) e = e.concat(this.getLogTickPositions(d, c[a - 1], c[a], !0));
			else if (this.isDatetimeAxis && "auto" === b.minorTickInterval) e = e.concat(this.getTimeTicks(this.normalizeTimeTickInterval(d), f, a, b.startOfWeek));
			else for (c = f + (c[0] - f) % d; a >= c; c += d) e.push(c);
			return this.trimTicks(e), e
		},
		adjustForMinRange: function() {
			var a, b, c, d, e, f, g = this.options,
				h = this.min,
				i = this.max,
				k = this.dataMax - this.dataMin >= this.minRange;
			if (this.isXAxis && this.minRange === G && !this.isLog && (j(g.min) || j(g.max) ? this.minRange = null : (Wa(this.series, function(a) {
				for (e = a.xData, c = f = a.xIncrement ? 1 : e.length - 1; c > 0; c--) d = e[c] - e[c - 1], (b === G || b > d) && (b = d)
			}), this.minRange = ma(5 * b, this.dataMax - this.dataMin))), i - h < this.minRange) {
				var l = this.minRange;
				a = (l - i + h) / 2, a = [h - a, Pa(g.min, h - a)], k && (a[2] = this.dataMin), h = w(a), i = [h + l, Pa(g.max, h + l)], k && (i[2] = this.dataMax), i = v(i), l > i - h && (a[0] = i - l, a[1] = Pa(g.min, i - l), h = w(a))
			}
			this.min = h, this.max = i
		},
		setAxisTranslation: function(a) {
			var b, d = this,
				e = d.max - d.min,
				f = d.axisPointRange || 0,
				g = 0,
				h = 0,
				i = d.linkedParent,
				k = !! d.categories,
				l = d.transA,
				m = d.isXAxis;
			(m || k || f) && (i ? (g = i.minPointOffset, h = i.pointRangePadding) : Wa(d.series, function(a) {
				var i = k ? 1 : m ? a.pointRange : d.axisPointRange || 0,
					l = a.options.pointPlacement,
					n = a.closestPointRange;
				i > e && (i = 0), f = la(f, i), d.single || (g = la(g, c(l) ? 0 : i / 2), h = la(h, "on" === l ? 0 : i)), !a.noSharedTooltip && j(n) && (b = j(b) ? ma(b, n) : n)
			}), i = d.ordinalSlope && b ? d.ordinalSlope / b : 1, d.minPointOffset = g *= i, d.pointRangePadding = h *= i, d.pointRange = ma(f, e), m && (d.closestPointRange = b)), a && (d.oldTransA = l), d.translationSlope = d.transA = l = d.len / (e + h || 1), d.transB = d.horiz ? d.left : d.bottom, d.minPixelPadding = l * g
		},
		setTickInterval: function(a) {
			var b = this,
				c = b.chart,
				d = b.options,
				e = b.isLog,
				h = b.isDatetimeAxis,
				i = b.isXAxis,
				k = b.isLinked,
				l = d.maxPadding,
				m = d.minPadding,
				n = d.tickInterval,
				o = d.tickPixelInterval,
				p = b.categories;
			!h && !p && !k && this.getTickAmount(), k ? (b.linkedParent = c[b.coll][d.linkedTo], c = b.linkedParent.getExtremes(), b.min = Pa(c.min, c.dataMin), b.max = Pa(c.max, c.dataMax), d.type !== b.linkedParent.options.type && z(11, 1)) : (b.min = Pa(b.userMin, d.min, b.dataMin), b.max = Pa(b.userMax, d.max, b.dataMax)), e && (!a && ma(b.min, Pa(b.dataMin, b.min)) <= 0 && z(10, 1), b.min = A(g(b.min)), b.max = A(g(b.max))), b.range && j(b.max) && (b.userMin = b.min = la(b.min, b.max - b.range), b.userMax = b.max, b.range = null), b.beforePadding && b.beforePadding(), b.adjustForMinRange(), p || b.axisPointRange || b.usePercentage || k || !j(b.min) || !j(b.max) || !(c = b.max - b.min) || (j(d.min) || j(b.userMin) || !m || !(b.dataMin < 0) && b.ignoreMinPadding || (b.min -= c * m), j(d.max) || j(b.userMax) || !l || !(b.dataMax > 0) && b.ignoreMaxPadding || (b.max += c * l)), f(d.floor) && (b.min = la(b.min, d.floor)), f(d.ceiling) && (b.max = ma(b.max, d.ceiling)), b.tickInterval = b.min === b.max || void 0 === b.min || void 0 === b.max ? 1 : k && !n && o === b.linkedParent.options.tickPixelInterval ? n = b.linkedParent.tickInterval : Pa(n, this.tickAmount ? (b.max - b.min) / la(this.tickAmount - 1, 1) : void 0, p ? 1 : (b.max - b.min) * o / la(b.len, o)), i && !a && Wa(b.series, function(a) {
				a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
			}), b.setAxisTranslation(!0), b.beforeSetTickPositions && b.beforeSetTickPositions(), b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval)), b.pointRange && (b.tickInterval = la(b.pointRange, b.tickInterval)), a = Pa(d.minTickInterval, b.isDatetimeAxis && b.closestPointRange), !n && b.tickInterval < a && (b.tickInterval = a), h || e || n || (b.tickInterval = t(b.tickInterval, null, s(b.tickInterval), Pa(d.allowDecimals, !(b.tickInterval > .5 && b.tickInterval < 5 && b.max > 1e3 && b.max < 9999)), !! this.tickAmount)), !this.tickAmount && this.len && (b.tickInterval = b.unsquish()), this.setTickPositions()
		},
		setTickPositions: function() {
			var a, b, c = this.options,
				d = c.tickPositions,
				e = c.tickPositioner,
				f = c.startOnTick,
				g = c.endOnTick;
			this.tickmarkOffset = this.categories && "between" === c.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0, this.minorTickInterval = "auto" === c.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : c.minorTickInterval, this.tickPositions = a = d && d.slice(), !a && (this.tickPositions = a = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, c.units), this.min, this.max, c.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), e && (e = e.apply(this, [this.min, this.max]))) && (this.tickPositions = a = e), this.isLinked || (this.trimTicks(a, f, g), this.min === this.max && j(this.min) && !this.tickAmount && (b = !0, this.min -= .5, this.max += .5), this.single = b, !d && !e && this.adjustTickAmount())
		},
		trimTicks: function(a, b, c) {
			var d = a[0],
				e = a[a.length - 1],
				f = this.minPointOffset || 0;
			b ? this.min = d : this.min - f > d && a.shift(), c ? this.max = e : this.max + f < e && a.pop(), 0 === a.length && j(d) && a.push((e + d) / 2)
		},
		getTickAmount: function() {
			var a, b = {},
				c = this.options,
				d = c.tickAmount,
				e = c.tickPixelInterval;
			!j(c.tickInterval) && this.len < e && !this.isRadial && !this.isLog && c.startOnTick && c.endOnTick && (d = 2), !d && this.chart.options.chart.alignTicks !== !1 && c.alignTicks !== !1 && (Wa(this.chart[this.coll], function(c) {
				var d = c.options,
					e = c.horiz,
					d = [e ? d.left : d.top, e ? d.width : d.height, d.pane].join(",");
				b[d] ? c.series.length && (a = !0) : b[d] = 1
			}), a && (d = ka(this.len / e) + 1)), 4 > d && (this.finalTickAmt = d, d = 5), this.tickAmount = d
		},
		adjustTickAmount: function() {
			var a = this.tickInterval,
				b = this.tickPositions,
				c = this.tickAmount,
				d = this.finalTickAmt,
				e = b && b.length;
			if (c > e) {
				for (; b.length < c;) b.push(A(b[b.length - 1] + a));
				this.transA *= (e - 1) / (c - 1), this.max = b[b.length - 1]
			} else e > c && (this.tickInterval *= 2, this.setTickPositions());
			if (j(d)) {
				for (a = c = b.length; a--;)(3 === d && a % 2 === 1 || 2 >= d && a > 0 && c - 1 > a) && b.splice(a, 1);
				this.finalTickAmt = G
			}
		},
		setScale: function() {
			var a, b, c, d, e = this.stacks;
			if (this.oldMin = this.min, this.oldMax = this.max, this.oldAxisLength = this.len, this.setAxisSize(), d = this.len !== this.oldAxisLength, Wa(this.series, function(a) {
				(a.isDirtyData || a.isDirty || a.xAxis.isDirty) && (c = !0)
			}), d || c || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax) {
				if (!this.isXAxis) for (a in e) for (b in e[a]) e[a][b].total = null, e[a][b].cum = 0;
				this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = d || this.min !== this.oldMin || this.max !== this.oldMax)
			} else if (!this.isXAxis) {
				this.oldStacks && (e = this.stacks = this.oldStacks);
				for (a in e) for (b in e[a]) e[a][b].cum = e[a][b].total
			}
		},
		setExtremes: function(a, b, c, d, e) {
			var f = this,
				g = f.chart,
				c = Pa(c, !0);
			Wa(f.series, function(a) {
				delete a.kdTree
			}), e = Oa(e, {
				min: a,
				max: b
			}), ab(f, "setExtremes", e, function() {
				f.userMin = a, f.userMax = b, f.eventArgs = e, f.isDirtyExtremes = !0, c && g.redraw(d)
			})
		},
		zoom: function(a, b) {
			var c = this.dataMin,
				d = this.dataMax,
				e = this.options;
			return this.allowZoomOutside || (j(c) && a <= ma(c, Pa(e.min, c)) && (a = G), j(d) && b >= la(d, Pa(e.max, d)) && (b = G)), this.displayBtn = a !== G || b !== G, this.setExtremes(a, b, !1, G, {
				trigger: "zoom"
			}), !0
		},
		setAxisSize: function() {
			var a = this.chart,
				b = this.options,
				c = b.offsetLeft || 0,
				d = this.horiz,
				e = Pa(b.width, a.plotWidth - c + (b.offsetRight || 0)),
				f = Pa(b.height, a.plotHeight),
				g = Pa(b.top, a.plotTop),
				b = Pa(b.left, a.plotLeft + c),
				c = /%$/;
			c.test(f) && (f = parseFloat(f) / 100 * a.plotHeight), c.test(g) && (g = parseFloat(g) / 100 * a.plotHeight + a.plotTop), this.left = b, this.top = g, this.width = e, this.height = f, this.bottom = a.chartHeight - f - g, this.right = a.chartWidth - e - b, this.len = la(d ? e : f, 0), this.pos = d ? b : g
		},
		getExtremes: function() {
			var a = this.isLog;
			return {
				min: a ? A(h(this.min)) : this.min,
				max: a ? A(h(this.max)) : this.max,
				dataMin: this.dataMin,
				dataMax: this.dataMax,
				userMin: this.userMin,
				userMax: this.userMax
			}
		},
		getThreshold: function(a) {
			var b = this.isLog,
				c = b ? h(this.min) : this.min,
				b = b ? h(this.max) : this.max;
			return null === a ? a = 0 > b ? b : c : c > a ? a = c : a > b && (a = b), this.translate(a, 0, 1, 0, 1)
		},
		autoLabelAlign: function(a) {
			return a = (Pa(a, 0) - 90 * this.side + 720) % 360, a > 15 && 165 > a ? "right" : a > 195 && 345 > a ? "left" : "center"
		},
		unsquish: function() {
			var a, b, c, d = this.ticks,
				e = this.options.labels,
				f = this.horiz,
				g = this.tickInterval,
				h = g,
				i = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / g),
				k = e.rotation,
				l = this.chart.renderer.fontMetrics(e.style.fontSize, d[0] && d[0].label),
				m = Number.MAX_VALUE,
				n = function(a) {
					return a /= i || 1, a = a > 1 ? ka(a) : 1, a * g
				};
			return f ? (c = j(k) ? [k] : i < Pa(e.autoRotationLimit, 80) && !e.staggerLines && !e.step && e.autoRotation) && Wa(c, function(c) {
				var d;
				(c === k || c && c >= -90 && 90 >= c) && (b = n(na(l.h / pa(ra * c))), d = b + na(c / 360), m > d && (m = d, a = c, h = b))
			}) : h = n(l.h), this.autoRotation = c, this.labelRotation = a, h
		},
		renderUnsquish: function() {
			var b, d = this.chart,
				e = d.renderer,
				f = this.tickPositions,
				g = this.ticks,
				h = this.options.labels,
				i = this.horiz,
				j = d.margin,
				k = this.categories ? f.length : f.length - 1,
				l = this.slotWidth = i && !h.step && !h.rotation && (this.staggerLines || 1) * d.plotWidth / k || !i && (j[3] && j[3] - d.spacing[3] || .33 * d.chartWidth),
				m = la(1, ia(l - 2 * (h.padding || 5))),
				n = {},
				j = e.fontMetrics(h.style.fontSize, g[0] && g[0].label),
				k = h.style.textOverflow,
				o = 0;
			if (c(h.rotation) || (n.rotation = h.rotation), this.autoRotation) Wa(f, function(a) {
				(a = g[a]) && a.labelLength > o && (o = a.labelLength)
			}), o > m && o > j.h ? n.rotation = this.labelRotation : this.labelRotation = 0;
			else if (l && (b = {
				width: m + "px"
			}, !k)) for (b.textOverflow = "clip", l = f.length; !i && l--;) m = f[l], (m = g[m].label) && ("ellipsis" === m.styles.textOverflow && m.css({
				textOverflow: "clip"
			}), m.getBBox().height > this.len / f.length - (j.h - j.f) && (m.specCss = {
				textOverflow: "ellipsis"
			}));
			n.rotation && (b = {
				width: (o > .5 * d.chartHeight ? .33 * d.chartHeight : d.chartHeight) + "px"
			}, !k) && (b.textOverflow = "ellipsis"), this.labelAlign = n.align = h.align || this.autoLabelAlign(this.labelRotation), Wa(f, function(c) {
				var d = (c = g[c]) && c.label;
				d && (b && d.css(a(b, d.specCss)), delete d.specCss, d.attr(n), c.rotation = n.rotation)
			}), this.tickRotCorr = e.rotCorr(j.b, this.labelRotation || 0, 2 === this.side)
		},
		hasData: function() {
			return this.hasVisibleSeries || j(this.min) && j(this.max) && !! this.tickPositions
		},
		getOffset: function() {
			var a, b, c, d, e = this,
				f = e.chart,
				g = f.renderer,
				h = e.options,
				i = e.tickPositions,
				k = e.ticks,
				l = e.horiz,
				m = e.side,
				n = f.inverted ? [1, 0, 3, 2][m] : m,
				o = 0,
				p = 0,
				q = h.title,
				r = h.labels,
				s = 0,
				t = f.axisOffset,
				f = f.clipOffset,
				u = [-1, 1, 1, -1][m];
			if (a = e.hasData(), e.showAxis = b = a || Pa(h.showEmpty, !0), e.staggerLines = e.horiz && r.staggerLines, e.axisGroup || (e.gridGroup = g.g("grid").attr({
				zIndex: h.gridZIndex || 1
			}).add(), e.axisGroup = g.g("axis").attr({
				zIndex: h.zIndex || 2
			}).add(), e.labelGroup = g.g("axis-labels").attr({
				zIndex: r.zIndex || 7
			}).addClass("highcharts-" + e.coll.toLowerCase() + "-labels").add()), a || e.isLinked) Wa(i, function(a) {
				k[a] ? k[a].addLabel() : k[a] = new E(e, a)
			}), e.renderUnsquish(), Wa(i, function(a) {
				(0 === m || 2 === m || {
					1: "left",
					3: "right"
				}[m] === e.labelAlign) && (s = la(k[a].getLabelSize(), s))
			}), e.staggerLines && (s *= e.staggerLines, e.labelOffset = s);
			else for (d in k) k[d].destroy(), delete k[d];
			q && q.text && q.enabled !== !1 && (e.axisTitle || (e.axisTitle = g.text(q.text, 0, 0, q.useHTML).attr({
				zIndex: 7,
				rotation: q.rotation || 0,
				align: q.textAlign || {
					low: "left",
					middle: "center",
					high: "right"
				}[q.align]
			}).addClass("highcharts-" + this.coll.toLowerCase() + "-title").css(q.style).add(e.axisGroup), e.axisTitle.isNew = !0), b && (o = e.axisTitle.getBBox()[l ? "height" : "width"], c = q.offset, p = j(c) ? 0 : Pa(q.margin, l ? 5 : 10)), e.axisTitle[b ? "show" : "hide"]()), e.offset = u * Pa(h.offset, t[m]), e.tickRotCorr = e.tickRotCorr || {
				x: 0,
				y: 0
			}, g = 2 === m ? e.tickRotCorr.y : 0, l = s + p + (s && u * (l ? Pa(r.y, e.tickRotCorr.y + 8) : r.x) - g), e.axisTitleMargin = Pa(c, l), t[m] = la(t[m], e.axisTitleMargin + o + u * e.offset, l), o = 2 * ja(h.lineWidth / 2), h.offset && (o = la(0, o - h.offset)), f[n] = la(f[n], o)
		},
		getLinePath: function(a) {
			var b = this.chart,
				c = this.opposite,
				d = this.offset,
				e = this.horiz,
				f = this.left + (c ? this.width : 0) + d,
				d = b.chartHeight - this.bottom - (c ? this.height : 0) + d;
			return c && (a *= -1), b.renderer.crispLine(["M", e ? this.left : f, e ? d : this.top, "L", e ? b.chartWidth - this.right : f, e ? d : b.chartHeight - this.bottom], a)
		},
		getTitlePosition: function() {
			var a = this.horiz,
				c = this.left,
				d = this.top,
				e = this.len,
				f = this.options.title,
				g = a ? c : d,
				h = this.opposite,
				i = this.offset,
				j = f.x || 0,
				k = f.y || 0,
				l = b(f.style.fontSize || 12),
				e = {
					low: g + (a ? 0 : e),
					middle: g + e / 2,
					high: g + (a ? e : 0)
				}[f.align],
				c = (a ? d + this.height : c) + (a ? 1 : -1) * (h ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? l : 0);
			return {
				x: a ? e + j : c + (h ? this.width : 0) + i + j,
				y: a ? c + k - (h ? this.height : 0) + i : e + k
			}
		},
		render: function() {
			var a, b, c, d = this,
				e = d.chart,
				f = e.renderer,
				g = d.options,
				i = d.isLog,
				k = d.isLinked,
				l = d.tickPositions,
				m = d.axisTitle,
				n = d.ticks,
				o = d.minorTicks,
				p = d.alternateBands,
				q = g.stackLabels,
				r = g.alternateGridColor,
				s = d.tickmarkOffset,
				t = g.lineWidth,
				u = e.hasRendered && j(d.oldMin) && !isNaN(d.oldMin),
				v = d.showAxis;
			d.labelEdge.length = 0, d.overlap = !1, Wa([n, o, p], function(a) {
				for (var b in a) a[b].isActive = !1
			}), (d.hasData() || k) && (d.minorTickInterval && !d.categories && Wa(d.getMinorTickPositions(), function(a) {
				o[a] || (o[a] = new E(d, a, "minor")), u && o[a].isNew && o[a].render(null, !0), o[a].render(null, !1, 1)
			}), l.length && (Wa(l, function(a, b) {
				(!k || a >= d.min && a <= d.max) && (n[a] || (n[a] = new E(d, a)), u && n[a].isNew && n[a].render(b, !0, .1), n[a].render(b))
			}), s && (0 === d.min || d.single)) && (n[-1] || (n[-1] = new E(d, -1, null, !0)), n[-1].render(-1)), r && Wa(l, function(a, e) {
				e % 2 === 0 && a < d.max && (p[a] || (p[a] = new ea.PlotLineOrBand(d)), b = a + s, c = l[e + 1] !== G ? l[e + 1] + s : d.max, p[a].options = {
					from: i ? h(b) : b,
					to: i ? h(c) : c,
					color: r
				}, p[a].render(), p[a].isActive = !0)
			}), d._addedPlotLB || (Wa((g.plotLines || []).concat(g.plotBands || []), function(a) {
				d.addPlotBandOrLine(a)
			}), d._addedPlotLB = !0)), Wa([n, o, p], function(a) {
				var b, c, d = [],
					f = M ? M.duration || 500 : 0,
					g = function() {
						for (c = d.length; c--;) a[d[c]] && !a[d[c]].isActive && (a[d[c]].destroy(), delete a[d[c]])
					};
				for (b in a) a[b].isActive || (a[b].render(b, !1, 0), a[b].isActive = !1, d.push(b));
				a !== p && e.hasRendered && f ? f && setTimeout(g, f) : g()
			}), t && (a = d.getLinePath(t), d.axisLine ? d.axisLine.animate({
				d: a
			}) : d.axisLine = f.path(a).attr({
				stroke: g.lineColor,
				"stroke-width": t,
				zIndex: 7
			}).add(d.axisGroup), d.axisLine[v ? "show" : "hide"]()), m && v && (m[m.isNew ? "attr" : "animate"](d.getTitlePosition()), m.isNew = !1), q && q.enabled && d.renderStackTotals(), d.isDirty = !1
		},
		redraw: function() {
			this.render(), Wa(this.plotLinesAndBands, function(a) {
				a.render()
			}), Wa(this.series, function(a) {
				a.isDirty = !0
			})
		},
		destroy: function(a) {
			var b, c = this,
				d = c.stacks,
				e = c.plotLinesAndBands;
			a || _a(c);
			for (b in d) x(d[b]), d[b] = null;
			for (Wa([c.ticks, c.minorTicks, c.alternateBands], function(a) {
				x(a)
			}), a = e.length; a--;) e[a].destroy();
			Wa("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","), function(a) {
				c[a] && (c[a] = c[a].destroy())
			}), this.cross && this.cross.destroy()
		},
		drawCrosshair: function(a, b) {
			var c, d = this.crosshair,
				e = d.animation;
			!this.crosshair || (j(b) || !Pa(this.crosshair.snap, !0)) === !1 || b && b.series && b.series[this.coll] !== this ? this.hideCrosshair() : (Pa(d.snap, !0) ? j(b) && (c = this.isXAxis ? b.plotX : this.len - b.plotY) : c = this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos, c = this.isRadial ? this.getPlotLinePath(this.isXAxis ? b.x : Pa(b.stackY, b.y)) || null : this.getPlotLinePath(null, null, null, null, c) || null, null === c ? this.hideCrosshair() : this.cross ? this.cross.attr({
				visibility: "visible"
			})[e ? "animate" : "attr"]({
				d: c
			}, e) : (e = this.categories && !this.isRadial, e = {
				"stroke-width": d.width || (e ? this.transA : 1),
				stroke: d.color || (e ? "rgba(155,200,255,0.2)" : "#C0C0C0"),
				zIndex: d.zIndex || 2
			}, d.dashStyle && (e.dashstyle = d.dashStyle), this.cross = this.chart.renderer.path(c).attr(e).add()))
		},
		hideCrosshair: function() {
			this.cross && this.cross.hide()
		}
	}, Oa(mb.prototype, {
		getPlotBandPath: function(a, b) {
			var c = this.getPlotLinePath(b, null, null, !0),
				d = this.getPlotLinePath(a, null, null, !0);
			return d && c && d.toString() !== c.toString() ? d.push(c[4], c[5], c[1], c[2]) : d = null, d
		},
		addPlotBand: function(a) {
			return this.addPlotBandOrLine(a, "plotBands")
		},
		addPlotLine: function(a) {
			return this.addPlotBandOrLine(a, "plotLines")
		},
		addPlotBandOrLine: function(a, b) {
			var c = new ea.PlotLineOrBand(this, a).render(),
				d = this.userOptions;
			return c && (b && (d[b] = d[b] || [], d[b].push(a)), this.plotLinesAndBands.push(c)), c
		},
		removePlotBandOrLine: function(a) {
			for (var b = this.plotLinesAndBands, c = this.options, d = this.userOptions, e = b.length; e--;) b[e].id === a && b[e].destroy();
			Wa([c.plotLines || [], d.plotLines || [], c.plotBands || [], d.plotBands || []], function(b) {
				for (e = b.length; e--;) b[e].id === a && i(b, b[e])
			})
		}
	}), mb.prototype.getTimeTicks = function(a, b, c, d) {
		var e, f = [],
			g = {},
			h = K.global.useUTC,
			i = new P(b - q(b)),
			k = a.unitRange,
			l = a.count;
		if (j(b)) {
			i[Z](k >= O.second ? 0 : l * ja(i.getMilliseconds() / l)), k >= O.second && i[$](k >= O.minute ? 0 : l * ja(i.getSeconds() / l)), k >= O.minute && i[_](k >= O.hour ? 0 : l * ja(i[T]() / l)), k >= O.hour && i[aa](k >= O.day ? 0 : l * ja(i[U]() / l)), k >= O.day && i[ba](k >= O.month ? 1 : l * ja(i[W]() / l)), k >= O.month && (i[ca](k >= O.year ? 0 : l * ja(i[X]() / l)), e = i[Y]()), k >= O.year && (e -= e % l, i[da](e)), k === O.week && i[ba](i[W]() - i[V]() + Pa(d, 1)), b = 1, (R || S) && (i = i.getTime(), i = new P(i + q(i))), e = i[Y]();
			for (var d = i.getTime(), m = i[X](), n = i[W](), o = (O.day + (h ? q(i) : 6e4 * i.getTimezoneOffset())) % O.day; c > d;) f.push(d), k === O.year ? d = Q(e + b * l, 0) : k === O.month ? d = Q(e, m + b * l) : h || k !== O.day && k !== O.week ? d += k * l : d = Q(e, m, n + b * l * (k === O.day ? 1 : 7)), b++;
			f.push(d), Wa(Xa(f, function(a) {
				return k <= O.hour && a % O.day === o
			}), function(a) {
				g[a] = "day"
			})
		}
		return f.info = Oa(a, {
			higherRanks: g,
			totalRange: k * l
		}), f
	}, mb.prototype.normalizeTimeTickInterval = function(a, b) {
		var c, d = b || [
			["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
			["second", [1, 2, 5, 10, 15, 30]],
			["minute", [1, 2, 5, 10, 15, 30]],
			["hour", [1, 2, 3, 4, 6, 8, 12]],
			["day", [1, 2]],
			["week", [1, 2]],
			["month", [1, 2, 3, 4, 6]],
			["year", null]
		],
			e = d[d.length - 1],
			f = O[e[0]],
			g = e[1];
		for (c = 0; c < d.length && (e = d[c], f = O[e[0]], g = e[1], !(d[c + 1] && a <= (f * g[g.length - 1] + O[d[c + 1][0]]) / 2)); c++);
		return f === O.year && 5 * f > a && (g = [1, 2, 5]), d = t(a / f, g, "year" === e[0] ? la(s(a / f), 1) : 1), {
			unitRange: f,
			count: d,
			unitName: e[0]
		}
	}, mb.prototype.getLogTickPositions = function(a, b, c, d) {
		var e = this.options,
			f = this.len,
			i = [];
		if (d || (this._minorAutoInterval = null), a >= .5) a = ia(a), i = this.getLinearTickPositions(a, b, c);
		else if (a >= .08) for (var j, k, l, m, n, f = ja(b), e = a > .3 ? [1, 2, 4] : a > .15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; c + 1 > f && !n; f++) for (k = e.length, j = 0; k > j && !n; j++) l = g(h(f) * e[j]), l > b && (!d || c >= m) && m !== G && i.push(m), m > c && (n = !0), m = l;
		else b = h(b), c = h(c), a = e[d ? "minorTickInterval" : "tickInterval"], a = Pa("auto" === a ? null : a, this._minorAutoInterval, (c - b) * (e.tickPixelInterval / (d ? 5 : 1)) / ((d ? f / this.tickPositions.length : f) || 1)), a = t(a, null, s(a)), i = Za(this.getLinearTickPositions(a, b, c), g), d || (this._minorAutoInterval = a / 5);
		return d || (this.tickInterval = a), i
	};
	var nb = ea.Tooltip = function() {
			this.init.apply(this, arguments)
		};
	nb.prototype = {
		init: function(a, c) {
			var d = c.borderWidth,
				e = c.style,
				f = b(e.padding);
			this.chart = a, this.options = c, this.crosshairs = [], this.now = {
				x: 0,
				y: 0
			}, this.isHidden = !0, this.label = a.renderer.label("", 0, 0, c.shape || "callout", null, null, c.useHTML, null, "tooltip").attr({
				padding: f,
				fill: c.backgroundColor,
				"stroke-width": d,
				r: c.borderRadius,
				zIndex: 8
			}).css(e).css({
				padding: 0
			}).add().attr({
				y: -9999
			}), Ca || this.label.shadow(c.shadow), this.shared = c.shared
		},
		destroy: function() {
			this.label && (this.label = this.label.destroy()), clearTimeout(this.hideTimer), clearTimeout(this.tooltipTimeout)
		},
		move: function(a, b, c, d) {
			var e = this,
				f = e.now,
				g = e.options.animation !== !1 && !e.isHidden && (na(a - f.x) > 1 || na(b - f.y) > 1),
				h = e.followPointer || e.len > 1;
			Oa(f, {
				x: g ? (2 * f.x + a) / 3 : a,
				y: g ? (f.y + b) / 2 : b,
				anchorX: h ? G : g ? (2 * f.anchorX + c) / 3 : c,
				anchorY: h ? G : g ? (f.anchorY + d) / 2 : d
			}), e.label.attr(f), g && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
				e && e.move(a, b, c, d)
			}, 32))
		},
		hide: function(a) {
			var b = this;
			clearTimeout(this.hideTimer), this.isHidden || (this.hideTimer = setTimeout(function() {
				b.label.fadeOut(), b.isHidden = !0
			}, Pa(a, this.options.hideDelay, 500)))
		},
		getAnchor: function(a, b) {
			var c, d, e, f = this.chart,
				g = f.inverted,
				h = f.plotTop,
				i = f.plotLeft,
				j = 0,
				k = 0,
				a = l(a);
			return c = a[0].tooltipPos, this.followPointer && b && (b.chartX === G && (b = f.pointer.normalize(b)), c = [b.chartX - f.plotLeft, b.chartY - h]), c || (Wa(a, function(a) {
				d = a.series.yAxis, e = a.series.xAxis, j += a.plotX + (!g && e ? e.left - i : 0), k += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!g && d ? d.top - h : 0)
			}), j /= a.length, k /= a.length, c = [g ? f.plotWidth - k : j, this.shared && !g && a.length > 1 && b ? b.chartY - h : g ? f.plotHeight - j : k]), Za(c, ia)
		},
		getPosition: function(a, b, c) {
			var d, e = this.chart,
				f = this.distance,
				g = {},
				h = c.h || 0,
				i = ["y", e.chartHeight, b, c.plotY + e.plotTop],
				j = ["x", e.chartWidth, a, c.plotX + e.plotLeft],
				k = Pa(c.ttBelow, e.inverted && !c.negative || !e.inverted && c.negative),
				l = function(a, b, c, d) {
					var e = d - f > c,
						i = b > d + f + c,
						j = d - f - c;
					if (d += f, k && i) g[a] = d;
					else if (!k && e) g[a] = j;
					else if (e) g[a] = 0 > j - h ? j : j - h;
					else {
						if (!i) return !1;
						g[a] = d + h + c > b ? d : d + h
					}
				},
				m = function(a, b, c, d) {
					return f > d || d > b - f ? !1 : void(g[a] = c / 2 > d ? 1 : d > b - c / 2 ? b - c - 2 : d - c / 2)
				},
				n = function(a) {
					var b = i;
					i = j, j = b, d = a
				},
				o = function() {
					l.apply(0, i) !== !1 ? m.apply(0, j) === !1 && !d && (n(!0), o()) : d ? g.x = g.y = 0 : (n(!0), o())
				};
			return (e.inverted || this.len > 1) && n(), o(), g
		},
		defaultFormatter: function(a) {
			var b, c = this.points || l(this);
			return b = [a.tooltipFooterHeaderFormatter(c[0])], b = b.concat(a.bodyFormatter(c)), b.push(a.tooltipFooterHeaderFormatter(c[0], !0)), b.join("")
		},
		refresh: function(a, b) {
			var c, d, e, f, g = this.chart,
				h = this.label,
				i = this.options,
				j = {},
				k = [];
			f = i.formatter || this.defaultFormatter;
			var m, j = g.hoverPoints,
				n = this.shared;
			clearTimeout(this.hideTimer), this.followPointer = l(a)[0].series.tooltipOptions.followPointer, e = this.getAnchor(a, b), c = e[0], d = e[1], !n || a.series && a.series.noSharedTooltip ? j = a.getLabelConfig() : (g.hoverPoints = a, j && Wa(j, function(a) {
				a.setState()
			}), Wa(a, function(a) {
				a.setState("hover"), k.push(a.getLabelConfig())
			}), j = {
				x: a[0].category,
				y: a[0].y
			}, j.points = k, this.len = k.length, a = a[0]), f = f.call(j, this), j = a.series, this.distance = Pa(j.tooltipOptions.distance, 16), f === !1 ? this.hide() : (this.isHidden && (db(h), h.attr("opacity", 1).show()), h.attr({
				text: f
			}), m = i.borderColor || a.color || j.color || "#606060", h.attr({
				stroke: m
			}), this.updatePosition({
				plotX: c,
				plotY: d,
				negative: a.negative,
				ttBelow: a.ttBelow,
				h: e[2] || 0
			}), this.isHidden = !1), ab(g, "tooltipRefresh", {
				text: f,
				x: c + g.plotLeft,
				y: d + g.plotTop,
				borderColor: m
			})
		},
		updatePosition: function(a) {
			var b = this.chart,
				c = this.label,
				c = (this.options.positioner || this.getPosition).call(this, c.width, c.height, a);
			this.move(ia(c.x), ia(c.y || 0), a.plotX + b.plotLeft, a.plotY + b.plotTop)
		},
		getXDateFormat: function(a, b, c) {
			var d, e, f, b = b.dateTimeLabelFormats,
				g = c && c.closestPointRange,
				h = {
					millisecond: 15,
					second: 12,
					minute: 9,
					hour: 6,
					day: 3
				},
				i = "millisecond";
			if (g) {
				f = L("%m-%d %H:%M:%S.%L", a.x);
				for (e in O) {
					if (g === O.week && +L("%w", a.x) === c.options.startOfWeek && "00:00:00.000" === f.substr(6)) {
						e = "week";
						break
					}
					if (O[e] > g) {
						e = i;
						break
					}
					if (h[e] && f.substr(h[e]) !== "01-01 00:00:00.000".substr(h[e])) break;
					"week" !== e && (i = e)
				}
				e && (d = b[e])
			} else d = b.day;
			return d || b.year
		},
		tooltipFooterHeaderFormatter: function(a, b) {
			var c = b ? "footer" : "header",
				d = a.series,
				e = d.tooltipOptions,
				g = e.xDateFormat,
				h = d.xAxis,
				i = h && "datetime" === h.options.type && f(a.key),
				c = e[c + "Format"];
			return i && !g && (g = this.getXDateFormat(a, e, h)), i && g && (c = c.replace("{point.key}", "{point.key:" + g + "}")), r(c, {
				point: a,
				series: d
			})
		},
		bodyFormatter: function(a) {
			return Za(a, function(a) {
				var b = a.series.tooltipOptions;
				return (b.pointFormatter || a.point.tooltipFormatter).call(a.point, b.pointFormat)
			})
		}
	};
	var ob;
	I = fa.documentElement.ontouchstart !== G;
	var pb = ea.Pointer = function(a, b) {
			this.init(a, b)
		};
	if (pb.prototype = {
		init: function(a, b) {
			var c, d = b.chart,
				e = d.events,
				f = Ca ? "" : d.zoomType,
				d = a.inverted;
			this.options = b, this.chart = a, this.zoomX = c = /x/.test(f), this.zoomY = f = /y/.test(f), this.zoomHor = c && !d || f && d, this.zoomVert = f && !d || c && d, this.hasZoom = c || f, this.runChartClick = e && !! e.click, this.pinchDown = [], this.lastValidTouch = {}, ea.Tooltip && b.tooltip.enabled && (a.tooltip = new nb(a, b.tooltip), this.followTouchMove = Pa(b.tooltip.followTouchMove, !0)), this.setDOMEvents()
		},
		normalize: function(a, b) {
			var c, d, a = a || window.event,
				a = bb(a);
			return a.target || (a.target = a.srcElement), d = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a, b || (this.chartPosition = b = Ya(this.chart.container)), d.pageX === G ? (c = la(a.x, a.clientX - b.left), d = a.y) : (c = d.pageX - b.left, d = d.pageY - b.top), Oa(a, {
				chartX: ia(c),
				chartY: ia(d)
			})
		},
		getCoordinates: function(a) {
			var b = {
				xAxis: [],
				yAxis: []
			};
			return Wa(this.chart.axes, function(c) {
				b[c.isXAxis ? "xAxis" : "yAxis"].push({
					axis: c,
					value: c.toValue(a[c.horiz ? "chartX" : "chartY"])
				})
			}), b
		},
		runPointActions: function(a) {
			var b, c, d, e, f, g = this.chart,
				h = g.series,
				i = g.tooltip,
				j = i ? i.shared : !1,
				k = g.hoverPoint,
				l = g.hoverSeries,
				m = g.chartWidth,
				n = [];
			if (!j && !l) for (b = 0; b < h.length; b++)(h[b].directTouch || !h[b].options.stickyTracking) && (h = []);
			if (!j && l && l.directTouch && k ? e = k : (Wa(h, function(b) {
				c = b.noSharedTooltip && j, d = !j && b.directTouch, b.visible && !c && !d && Pa(b.options.enableMouseTracking, !0) && (f = b.searchPoint(a, !c && 1 === b.kdDimensions)) && n.push(f)
			}), Wa(n, function(a) {
				a && "number" == typeof a.dist && a.dist < m && (m = a.dist, e = a)
			})), e && (e !== this.prevKDPoint || i && i.isHidden)) {
				if (j && !e.series.noSharedTooltip) {
					for (b = n.length; b--;)(n[b].clientX !== e.clientX || n[b].series.noSharedTooltip) && n.splice(b, 1);
					n.length && i && i.refresh(n, a), Wa(n, function(b) {
						b !== e && b.onMouseOver(a)
					}), (l && l.directTouch && k || e).onMouseOver(a)
				} else i && i.refresh(e, a), e.onMouseOver(a);
				this.prevKDPoint = e
			} else h = l && l.tooltipOptions.followPointer, i && h && !i.isHidden && (h = i.getAnchor([{}], a), i.updatePosition({
				plotX: h[0],
				plotY: h[1]
			}));
			i && !this._onDocumentMouseMove && (this._onDocumentMouseMove = function(a) {
				Ga[ob] && Ga[ob].pointer.onDocumentMouseMove(a)
			}, $a(fa, "mousemove", this._onDocumentMouseMove)), Wa(g.axes, function(b) {
				b.drawCrosshair(a, Pa(e, k))
			})
		},
		reset: function(a, b) {
			var c = this.chart,
				d = c.hoverSeries,
				e = c.hoverPoint,
				f = c.hoverPoints,
				g = c.tooltip,
				h = g && g.shared ? f : e;
			(a = a && g && h) && l(h)[0].plotX === G && (a = !1), a ? (g.refresh(h), e && (e.setState(e.state, !0), Wa(c.axes, function(a) {
				Pa(a.options.crosshair && a.options.crosshair.snap, !0) ? a.drawCrosshair(null, e) : a.hideCrosshair()
			}))) : (e && e.onMouseOut(), f && Wa(f, function(a) {
				a.setState()
			}), d && d.onMouseOut(), g && g.hide(b), this._onDocumentMouseMove && (_a(fa, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove = null), Wa(c.axes, function(a) {
				a.hideCrosshair()
			}), this.hoverX = c.hoverPoints = c.hoverPoint = null)
		},
		scaleGroups: function(a, b) {
			var c, d = this.chart;
			Wa(d.series, function(e) {
				c = a || e.getPlotBox(), e.xAxis && e.xAxis.zoomEnabled && (e.group.attr(c), e.markerGroup && (e.markerGroup.attr(c), e.markerGroup.clip(b ? d.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(c))
			}), d.clipRect.attr(b || d.clipBox)
		},
		dragStart: function(a) {
			var b = this.chart;
			b.mouseIsDown = a.type, b.cancelClick = !1, b.mouseDownX = this.mouseDownX = a.chartX, b.mouseDownY = this.mouseDownY = a.chartY
		},
		drag: function(a) {
			var b, c = this.chart,
				d = c.options.chart,
				e = a.chartX,
				f = a.chartY,
				g = this.zoomHor,
				h = this.zoomVert,
				i = c.plotLeft,
				j = c.plotTop,
				k = c.plotWidth,
				l = c.plotHeight,
				m = this.mouseDownX,
				n = this.mouseDownY,
				o = d.panKey && a[d.panKey + "Key"];
			i > e ? e = i : e > i + k && (e = i + k), j > f ? f = j : f > j + l && (f = j + l), this.hasDragged = Math.sqrt(Math.pow(m - e, 2) + Math.pow(n - f, 2)), this.hasDragged > 10 && (b = c.isInsidePlot(m - i, n - j), c.hasCartesianSeries && (this.zoomX || this.zoomY) && b && !o && !this.selectionMarker && (this.selectionMarker = c.renderer.rect(i, j, g ? 1 : k, h ? 1 : l, 0).attr({
				fill: d.selectionMarkerFill || "rgba(69,114,167,0.25)",
				zIndex: 7
			}).add()), this.selectionMarker && g && (e -= m, this.selectionMarker.attr({
				width: na(e),
				x: (e > 0 ? 0 : e) + m
			})), this.selectionMarker && h && (e = f - n, this.selectionMarker.attr({
				height: na(e),
				y: (e > 0 ? 0 : e) + n
			})), b && !this.selectionMarker && d.panning && c.pan(a, d.panning))
		},
		drop: function(a) {
			var b = this,
				c = this.chart,
				d = this.hasPinched;
			if (this.selectionMarker) {
				var e, f = {
					xAxis: [],
					yAxis: [],
					originalEvent: a.originalEvent || a
				},
					g = this.selectionMarker,
					h = g.attr ? g.attr("x") : g.x,
					i = g.attr ? g.attr("y") : g.y,
					k = g.attr ? g.attr("width") : g.width,
					l = g.attr ? g.attr("height") : g.height;
				(this.hasDragged || d) && (Wa(c.axes, function(c) {
					if (c.zoomEnabled && j(c.min) && (d || b[{
						xAxis: "zoomX",
						yAxis: "zoomY"
					}[c.coll]])) {
						var g = c.horiz,
							m = "touchend" === a.type ? c.minPixelPadding : 0,
							n = c.toValue((g ? h : i) + m),
							g = c.toValue((g ? h + k : i + l) - m);
						f[c.coll].push({
							axis: c,
							min: ma(n, g),
							max: la(n, g)
						}), e = !0
					}
				}), e && ab(c, "selection", f, function(a) {
					c.zoom(Oa(a, d ? {
						animation: !1
					} : null))
				})), this.selectionMarker = this.selectionMarker.destroy(), d && this.scaleGroups()
			}
			c && (m(c.container, {
				cursor: c._cursor
			}), c.cancelClick = this.hasDragged > 10, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
		},
		onContainerMouseDown: function(a) {
			a = this.normalize(a), a.preventDefault && a.preventDefault(), this.dragStart(a)
		},
		onDocumentMouseUp: function(a) {
			Ga[ob] && Ga[ob].pointer.drop(a)
		},
		onDocumentMouseMove: function(a) {
			var b = this.chart,
				c = this.chartPosition,
				a = this.normalize(a, c);
			c && !this.inClass(a.target, "highcharts-tracker") && !b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && this.reset()
		},
		onContainerMouseLeave: function() {
			var a = Ga[ob];
			a && (a.pointer.reset(), a.pointer.chartPosition = null)
		},
		onContainerMouseMove: function(a) {
			var b = this.chart;
			ob = b.index, a = this.normalize(a), a.returnValue = !1, "mousedown" === b.mouseIsDown && this.drag(a), (this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop)) && !b.openMenu && this.runPointActions(a)
		},
		inClass: function(a, b) {
			for (var c; a;) {
				if (c = k(a, "class")) {
					if (-1 !== c.indexOf(b)) return !0;
					if (-1 !== c.indexOf("highcharts-container")) return !1
				}
				a = a.parentNode
			}
		},
		onTrackerMouseOut: function(a) {
			var b = this.chart.hoverSeries,
				c = (a = a.relatedTarget || a.toElement) && a.point && a.point.series;
			!b || b.options.stickyTracking || this.inClass(a, "highcharts-tooltip") || c === b || b.onMouseOut()
		},
		onContainerClick: function(a) {
			var b = this.chart,
				c = b.hoverPoint,
				d = b.plotLeft,
				e = b.plotTop,
				a = this.normalize(a);
			a.originalEvent = a, b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (ab(c.series, "click", Oa(a, {
				point: c
			})), b.hoverPoint && c.firePointEvent("click", a)) : (Oa(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - e) && ab(b, "click", a)))
		},
		setDOMEvents: function() {
			var a = this,
				b = a.chart.container;
			b.onmousedown = function(b) {
				a.onContainerMouseDown(b)
			}, b.onmousemove = function(b) {
				a.onContainerMouseMove(b)
			}, b.onclick = function(b) {
				a.onContainerClick(b)
			}, $a(b, "mouseleave", a.onContainerMouseLeave), 1 === Ha && $a(fa, "mouseup", a.onDocumentMouseUp), I && (b.ontouchstart = function(b) {
				a.onContainerTouchStart(b)
			}, b.ontouchmove = function(b) {
				a.onContainerTouchMove(b)
			}, 1 === Ha && $a(fa, "touchend", a.onDocumentTouchEnd))
		},
		destroy: function() {
			var a;
			_a(this.chart.container, "mouseleave", this.onContainerMouseLeave), Ha || (_a(fa, "mouseup", this.onDocumentMouseUp), _a(fa, "touchend", this.onDocumentTouchEnd)), clearInterval(this.tooltipTimeout);
			for (a in this) this[a] = null
		}
	}, Oa(ea.Pointer.prototype, {
		pinchTranslate: function(a, b, c, d, e, f) {
			(this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, a, b, c, d, e, f), (this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, a, b, c, d, e, f)
		},
		pinchTranslateDirection: function(a, b, c, d, e, f, g, h) {
			var i, j, k, l = this.chart,
				m = a ? "x" : "y",
				n = a ? "X" : "Y",
				o = "chart" + n,
				p = a ? "width" : "height",
				q = l["plot" + (a ? "Left" : "Top")],
				r = h || 1,
				s = l.inverted,
				t = l.bounds[a ? "h" : "v"],
				u = 1 === b.length,
				v = b[0][o],
				w = c[0][o],
				x = !u && b[1][o],
				y = !u && c[1][o],
				c = function() {
					!u && na(v - x) > 20 && (r = h || na(w - y) / na(v - x)), j = (q - w) / r + v, i = l["plot" + (a ? "Width" : "Height")] / r
				};
			c(), b = j, b < t.min ? (b = t.min, k = !0) : b + i > t.max && (b = t.max - i, k = !0), k ? (w -= .8 * (w - g[m][0]), u || (y -= .8 * (y - g[m][1])), c()) : g[m] = [w, y], s || (f[m] = j - q, f[p] = i), f = s ? 1 / r : r, e[p] = i, e[m] = b, d[s ? a ? "scaleY" : "scaleX" : "scale" + n] = r, d["translate" + n] = f * q + (w - f * v);
		},
		pinch: function(a) {
			var b = this,
				c = b.chart,
				d = b.pinchDown,
				e = a.touches,
				f = e.length,
				g = b.lastValidTouch,
				h = b.hasZoom,
				i = b.selectionMarker,
				j = {},
				k = 1 === f && (b.inClass(a.target, "highcharts-tracker") && c.runTrackerClick || b.runChartClick),
				l = {};
			f > 1 && (b.initiated = !0), h && b.initiated && !k && a.preventDefault(), Za(e, function(a) {
				return b.normalize(a)
			}), "touchstart" === a.type ? (Wa(e, function(a, b) {
				d[b] = {
					chartX: a.chartX,
					chartY: a.chartY
				}
			}), g.x = [d[0].chartX, d[1] && d[1].chartX], g.y = [d[0].chartY, d[1] && d[1].chartY], Wa(c.axes, function(a) {
				if (a.zoomEnabled) {
					var b = c.bounds[a.horiz ? "h" : "v"],
						d = a.minPixelPadding,
						e = a.toPixels(Pa(a.options.min, a.dataMin)),
						f = a.toPixels(Pa(a.options.max, a.dataMax)),
						g = ma(e, f),
						e = la(e, f);
					b.min = ma(a.pos, g - d), b.max = la(a.pos + a.len, e + d)
				}
			}), b.res = !0) : d.length && (i || (b.selectionMarker = i = Oa({
				destroy: Fa
			}, c.plotBox)), b.pinchTranslate(d, e, j, i, l, g), b.hasPinched = h, b.scaleGroups(j, l), !h && b.followTouchMove && 1 === f ? this.runPointActions(b.normalize(a)) : b.res && (b.res = !1, this.reset(!1, 0)))
		},
		touch: function(a, b) {
			var c = this.chart;
			ob = c.index, 1 === a.touches.length ? (a = this.normalize(a), c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop) && !c.openMenu ? (b && this.runPointActions(a), this.pinch(a)) : b && this.reset()) : 2 === a.touches.length && this.pinch(a)
		},
		onContainerTouchStart: function(a) {
			this.touch(a, !0)
		},
		onContainerTouchMove: function(a) {
			this.touch(a)
		},
		onDocumentTouchEnd: function(a) {
			Ga[ob] && Ga[ob].pointer.drop(a)
		}
	}), ga.PointerEvent || ga.MSPointerEvent) {
		var qb = {},
			rb = !! ga.PointerEvent,
			sb = function() {
				var a, b = [];
				b.item = function(a) {
					return this[a]
				};
				for (a in qb) qb.hasOwnProperty(a) && b.push({
					pageX: qb[a].pageX,
					pageY: qb[a].pageY,
					target: qb[a].target
				});
				return b
			},
			tb = function(a, b, c, d) {
				a = a.originalEvent || a, "touch" !== a.pointerType && a.pointerType !== a.MSPOINTER_TYPE_TOUCH || !Ga[ob] || (d(a), d = Ga[ob].pointer, d[b]({
					type: c,
					target: a.currentTarget,
					preventDefault: Fa,
					touches: sb()
				}))
			};
		Oa(pb.prototype, {
			onContainerPointerDown: function(a) {
				tb(a, "onContainerTouchStart", "touchstart", function(a) {
					qb[a.pointerId] = {
						pageX: a.pageX,
						pageY: a.pageY,
						target: a.currentTarget
					}
				})
			},
			onContainerPointerMove: function(a) {
				tb(a, "onContainerTouchMove", "touchmove", function(a) {
					qb[a.pointerId] = {
						pageX: a.pageX,
						pageY: a.pageY
					}, qb[a.pointerId].target || (qb[a.pointerId].target = a.currentTarget)
				})
			},
			onDocumentPointerUp: function(a) {
				tb(a, "onDocumentTouchEnd", "touchend", function(a) {
					delete qb[a.pointerId]
				})
			},
			batchMSEvents: function(a) {
				a(this.chart.container, rb ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown), a(this.chart.container, rb ? "pointermove" : "MSPointerMove", this.onContainerPointerMove), a(fa, rb ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
			}
		}), Qa(pb.prototype, "init", function(a, b, c) {
			a.call(this, b, c), this.hasZoom && m(b.container, {
				"-ms-touch-action": Ja,
				"touch-action": Ja
			})
		}), Qa(pb.prototype, "setDOMEvents", function(a) {
			a.apply(this), (this.hasZoom || this.followTouchMove) && this.batchMSEvents($a)
		}), Qa(pb.prototype, "destroy", function(a) {
			this.batchMSEvents(_a), a.call(this)
		})
	}
	var ub = ea.Legend = function(a, b) {
			this.init(a, b)
		};
	ub.prototype = {
		init: function(b, c) {
			var d = this,
				e = c.itemStyle,
				f = c.itemMarginTop || 0;
			this.options = c, c.enabled && (d.itemStyle = e, d.itemHiddenStyle = a(e, c.itemHiddenStyle), d.itemMarginTop = f, d.padding = e = Pa(c.padding, 8), d.initialItemX = e, d.initialItemY = e - 5, d.maxItemWidth = 0, d.chart = b, d.itemHeight = 0, d.symbolWidth = Pa(c.symbolWidth, 16), d.pages = [], d.render(), $a(d.chart, "endResize", function() {
				d.positionCheckboxes()
			}))
		},
		colorizeItem: function(a, b) {
			var c, d = this.options,
				e = a.legendItem,
				f = a.legendLine,
				g = a.legendSymbol,
				h = this.itemHiddenStyle.color,
				d = b ? d.itemStyle.color : h,
				i = b ? a.legendColor || a.color || "#CCC" : h,
				h = a.options && a.options.marker,
				j = {
					fill: i
				};
			if (e && e.css({
				fill: d,
				color: d
			}), f && f.attr({
				stroke: i
			}), g) {
				if (h && g.isMarker) for (c in j.stroke = i, h = a.convertAttribs(h)) e = h[c], e !== G && (j[c] = e);
				g.attr(j)
			}
		},
		positionItem: function(a) {
			var b = this.options,
				c = b.symbolPadding,
				b = !b.rtl,
				d = a._legendItemPos,
				e = d[0],
				d = d[1],
				f = a.checkbox;
			(a = a.legendGroup) && a.element && a.translate(b ? e : this.legendWidth - e - 2 * c - 4, d), f && (f.x = e, f.y = d)
		},
		destroyItem: function(a) {
			var b = a.checkbox;
			Wa(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(b) {
				a[b] && (a[b] = a[b].destroy())
			}), b && y(a.checkbox)
		},
		destroy: function() {
			var a = this.group,
				b = this.box;
			b && (this.box = b.destroy()), a && (this.group = a.destroy())
		},
		positionCheckboxes: function(a) {
			var b, c = this.group.alignAttr,
				d = this.clipHeight || this.legendHeight;
			c && (b = c.translateY, Wa(this.allItems, function(e) {
				var f, g = e.checkbox;
				g && (f = b + g.y + (a || 0) + 3, m(g, {
					left: c.translateX + e.checkboxOffset + g.x - 20 + "px",
					top: f + "px",
					display: f > b - 6 && b + d - 6 > f ? "" : Ja
				}))
			}))
		},
		renderTitle: function() {
			var a = this.padding,
				b = this.options.title,
				c = 0;
			b.text && (this.title || (this.title = this.chart.renderer.label(b.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({
				zIndex: 1
			}).css(b.style).add(this.group)), a = this.title.getBBox(), c = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
				translateY: c
			})), this.titleHeight = c
		},
		setText: function(a) {
			var b = this.options;
			a.legendItem.attr({
				text: b.labelFormat ? r(b.labelFormat, a) : b.labelFormatter.call(a)
			})
		},
		renderItem: function(b) {
			var c = this.chart,
				d = c.renderer,
				e = this.options,
				f = "horizontal" === e.layout,
				g = this.symbolWidth,
				h = e.symbolPadding,
				i = this.itemStyle,
				j = this.itemHiddenStyle,
				k = this.padding,
				l = f ? Pa(e.itemDistance, 20) : 0,
				m = !e.rtl,
				n = e.width,
				o = e.itemMarginBottom || 0,
				p = this.itemMarginTop,
				q = this.initialItemX,
				r = b.legendItem,
				s = b.series && b.series.drawLegendSymbol ? b.series : b,
				t = s.options,
				t = this.createCheckboxForItem && t && t.showCheckbox,
				u = e.useHTML;
			r || (b.legendGroup = d.g("legend-item").attr({
				zIndex: 1
			}).add(this.scrollGroup), b.legendItem = r = d.text("", m ? g + h : -h, this.baseline || 0, u).css(a(b.visible ? i : j)).attr({
				align: m ? "left" : "right",
				zIndex: 2
			}).add(b.legendGroup), this.baseline || (this.fontMetrics = d.fontMetrics(i.fontSize, r), this.baseline = this.fontMetrics.f + 3 + p, r.attr("y", this.baseline)), s.drawLegendSymbol(this, b), this.setItemEvents && this.setItemEvents(b, r, u, i, j), this.colorizeItem(b, b.visible), t && this.createCheckboxForItem(b)), this.setText(b), d = r.getBBox(), g = b.checkboxOffset = e.itemWidth || b.legendItemWidth || g + h + d.width + l + (t ? 20 : 0), this.itemHeight = h = ia(b.legendItemHeight || d.height), f && this.itemX - q + g > (n || c.chartWidth - 2 * k - q - e.x) && (this.itemX = q, this.itemY += p + this.lastLineHeight + o, this.lastLineHeight = 0), this.maxItemWidth = la(this.maxItemWidth, g), this.lastItemY = p + this.itemY + o, this.lastLineHeight = la(h, this.lastLineHeight), b._legendItemPos = [this.itemX, this.itemY], f ? this.itemX += g : (this.itemY += p + h + o, this.lastLineHeight = h), this.offsetWidth = n || la((f ? this.itemX - q - l : g) + k, this.offsetWidth)
		},
		getAllItems: function() {
			var a = [];
			return Wa(this.chart.series, function(b) {
				var c = b.options;
				Pa(c.showInLegend, j(c.linkedTo) ? !1 : G, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b)))
			}), a
		},
		adjustMargins: function(a, b) {
			var c = this.chart,
				d = this.options,
				e = d.align[0] + d.verticalAlign[0] + d.layout[0];
			this.display && !d.floating && Wa([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function(f, g) {
				f.test(e) && !j(a[g]) && (c[La[g]] = la(c[La[g]], c.legend[(g + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][g] * d[g % 2 ? "x" : "y"] + Pa(d.margin, 12) + b[g]))
			})
		},
		render: function() {
			var a, b, c, d, e = this,
				f = e.chart,
				g = f.renderer,
				h = e.group,
				i = e.box,
				j = e.options,
				k = e.padding,
				l = j.borderWidth,
				m = j.backgroundColor;
			e.itemX = e.initialItemX, e.itemY = e.initialItemY, e.offsetWidth = 0, e.lastItemY = 0, h || (e.group = h = g.g("legend").attr({
				zIndex: 7
			}).add(), e.contentGroup = g.g().attr({
				zIndex: 1
			}).add(h), e.scrollGroup = g.g().add(e.contentGroup)), e.renderTitle(), a = e.getAllItems(), u(a, function(a, b) {
				return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
			}), j.reversed && a.reverse(), e.allItems = a, e.display = b = !! a.length, e.lastLineHeight = 0, Wa(a, function(a) {
				e.renderItem(a)
			}), c = (j.width || e.offsetWidth) + k, d = e.lastItemY + e.lastLineHeight + e.titleHeight, d = e.handleOverflow(d), d += k, (l || m) && (i ? c > 0 && d > 0 && (i[i.isNew ? "attr" : "animate"](i.crisp({
				width: c,
				height: d
			})), i.isNew = !1) : (e.box = i = g.rect(0, 0, c, d, j.borderRadius, l || 0).attr({
				stroke: j.borderColor,
				"stroke-width": l || 0,
				fill: m || Ja
			}).add(h).shadow(j.shadow), i.isNew = !0), i[b ? "show" : "hide"]()), e.legendWidth = c, e.legendHeight = d, Wa(a, function(a) {
				e.positionItem(a)
			}), b && h.align(Oa({
				width: c,
				height: d
			}, j), !0, "spacingBox"), f.isResizing || this.positionCheckboxes()
		},
		handleOverflow: function(a) {
			var b, c, d = this,
				e = this.chart,
				f = e.renderer,
				g = this.options,
				h = g.y,
				h = e.spacingBox.height + ("top" === g.verticalAlign ? -h : h) - this.padding,
				i = g.maxHeight,
				j = this.clipRect,
				k = g.navigation,
				l = Pa(k.animation, !0),
				m = k.arrowSize || 12,
				n = this.nav,
				o = this.pages,
				p = this.padding,
				q = this.allItems,
				r = function(a) {
					j.attr({
						height: a
					}), d.contentGroup.div && (d.contentGroup.div.style.clip = "rect(" + p + "px,9999px," + (p + a) + "px,0)")
				};
			return "horizontal" === g.layout && (h /= 2), i && (h = ma(h, i)), o.length = 0, a > h ? (this.clipHeight = b = la(h - 20 - this.titleHeight - p, 0), this.currentPage = Pa(this.currentPage, 1), this.fullHeight = a, Wa(q, function(a, d) {
				var e = a._legendItemPos[1],
					f = ia(a.legendItem.getBBox().height),
					g = o.length;
				(!g || e - o[g - 1] > b && (c || e) !== o[g - 1]) && (o.push(c || e), g++), d === q.length - 1 && e + f - o[g - 1] > b && o.push(e), e !== c && (c = e)
			}), j || (j = d.clipRect = f.clipRect(0, p, 9999, 0), d.contentGroup.clip(j)), r(b), n || (this.nav = n = f.g().attr({
				zIndex: 1
			}).add(this.group), this.up = f.symbol("triangle", 0, 0, m, m).on("click", function() {
				d.scroll(-1, l)
			}).add(n), this.pager = f.text("", 15, 10).css(k.style).add(n), this.down = f.symbol("triangle-down", 0, 0, m, m).on("click", function() {
				d.scroll(1, l)
			}).add(n)), d.scroll(0), a = h) : n && (r(e.chartHeight), n.hide(), this.scrollGroup.attr({
				translateY: 1
			}), this.clipHeight = 0), a
		},
		scroll: function(a, b) {
			var c = this.pages,
				d = c.length,
				e = this.currentPage + a,
				f = this.clipHeight,
				g = this.options.navigation,
				h = g.activeColor,
				g = g.inactiveColor,
				i = this.pager,
				j = this.padding;
			e > d && (e = d), e > 0 && (b !== G && B(b, this.chart), this.nav.attr({
				translateX: j,
				translateY: f + this.padding + 7 + this.titleHeight,
				visibility: "visible"
			}), this.up.attr({
				fill: 1 === e ? g : h
			}).css({
				cursor: 1 === e ? "default" : "pointer"
			}), i.attr({
				text: e + "/" + d
			}), this.down.attr({
				x: 18 + this.pager.getBBox().width,
				fill: e === d ? g : h
			}).css({
				cursor: e === d ? "default" : "pointer"
			}), c = -c[e - 1] + this.initialItemY, this.scrollGroup.animate({
				translateY: c
			}), this.currentPage = e, this.positionCheckboxes(c))
		}
	}, kb = ea.LegendSymbolMixin = {
		drawRectangle: function(a, b) {
			var c = a.options.symbolHeight || a.fontMetrics.f;
			b.legendSymbol = this.chart.renderer.rect(0, a.baseline - c + 1, a.symbolWidth, c, a.options.symbolRadius || 0).attr({
				zIndex: 3
			}).add(b.legendGroup)
		},
		drawLineMarker: function(a) {
			var b, c = this.options,
				d = c.marker;
			b = a.symbolWidth;
			var e, f = this.chart.renderer,
				g = this.legendGroup,
				a = a.baseline - ia(.3 * a.fontMetrics.b);
			c.lineWidth && (e = {
				"stroke-width": c.lineWidth
			}, c.dashStyle && (e.dashstyle = c.dashStyle), this.legendLine = f.path(["M", 0, a, "L", b, a]).attr(e).add(g)), d && d.enabled !== !1 && (c = d.radius, this.legendSymbol = b = f.symbol(this.symbol, b / 2 - c, a - c, 2 * c, 2 * c).add(g), b.isMarker = !0)
		}
	}, (/Trident\/7\.0/.test(sa) || xa) && Qa(ub.prototype, "positionItem", function(a, b) {
		var c = this,
			d = function() {
				b._legendItemPos && a.call(c, b)
			};
		d(), setTimeout(d)
	}), Sa = ea.Chart = function() {
		this.init.apply(this, arguments)
	}, Sa.prototype = {
		callbacks: [],
		init: function(b, c) {
			var d, e = b.series;
			b.series = null, d = a(K, b), d.series = b.series = e, this.userOptions = b, e = d.chart, this.margin = this.splashArray("margin", e), this.spacing = this.splashArray("spacing", e);
			var f = e.events;
			this.bounds = {
				h: {},
				v: {}
			}, this.callback = c, this.isResizing = 0, this.options = d, this.axes = [], this.series = [], this.hasCartesianSeries = e.showAxes;
			var g, h = this;
			if (h.index = Ga.length, Ga.push(h), Ha++, e.reflow !== !1 && $a(h, "load", function() {
				h.initReflow()
			}), f) for (g in f) $a(h, g, f[g]);
			h.xAxis = [], h.yAxis = [], h.animation = Ca ? !1 : Pa(e.animation, !0), h.pointCount = h.colorCounter = h.symbolCounter = 0, h.firstRender()
		},
		initSeries: function(a) {
			var b = this.options.chart;
			return (b = Na[a.type || b.type || b.defaultSeriesType]) || z(17, !0), b = new b, b.init(this, a), b
		},
		isInsidePlot: function(a, b, c) {
			var d = c ? b : a,
				a = c ? a : b;
			return d >= 0 && d <= this.plotWidth && a >= 0 && a <= this.plotHeight
		},
		redraw: function(a) {
			var b, c, d = this.axes,
				e = this.series,
				f = this.pointer,
				g = this.legend,
				h = this.isDirtyLegend,
				i = this.hasCartesianSeries,
				j = this.isDirtyBox,
				k = e.length,
				l = k,
				m = this.renderer,
				n = m.isHidden(),
				o = [];
			for (B(a, this), n && this.cloneRenderTo(), this.layOutTitles(); l--;) if (a = e[l], a.options.stacking && (b = !0, a.isDirty)) {
				c = !0;
				break
			}
			if (c) for (l = k; l--;) a = e[l], a.options.stacking && (a.isDirty = !0);
			Wa(e, function(a) {
				a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), h = !0)
			}), h && g.options.enabled && (g.render(), this.isDirtyLegend = !1), b && this.getStacks(), i && !this.isResizing && (this.maxTicks = null, Wa(d, function(a) {
				a.setScale()
			})), this.getMargins(), i && (Wa(d, function(a) {
				a.isDirty && (j = !0)
			}), Wa(d, function(a) {
				a.isDirtyExtremes && (a.isDirtyExtremes = !1, o.push(function() {
					ab(a, "afterSetExtremes", Oa(a.eventArgs, a.getExtremes())), delete a.eventArgs
				})), (j || b) && a.redraw()
			})), j && this.drawChartBox(), Wa(e, function(a) {
				a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw()
			}), f && f.reset(!0), m.draw(), ab(this, "redraw"), n && this.cloneRenderTo(!0), Wa(o, function(a) {
				a.call()
			})
		},
		get: function(a) {
			var b, c, d = this.axes,
				e = this.series;
			for (b = 0; b < d.length; b++) if (d[b].options.id === a) return d[b];
			for (b = 0; b < e.length; b++) if (e[b].options.id === a) return e[b];
			for (b = 0; b < e.length; b++) for (c = e[b].points || [], d = 0; d < c.length; d++) if (c[d].id === a) return c[d];
			return null
		},
		getAxes: function() {
			var a = this,
				b = this.options,
				c = b.xAxis = l(b.xAxis || {}),
				b = b.yAxis = l(b.yAxis || {});
			Wa(c, function(a, b) {
				a.index = b, a.isX = !0
			}), Wa(b, function(a, b) {
				a.index = b
			}), c = c.concat(b), Wa(c, function(b) {
				new mb(a, b)
			})
		},
		getSelectedPoints: function() {
			var a = [];
			return Wa(this.series, function(b) {
				a = a.concat(Xa(b.points || [], function(a) {
					return a.selected
				}))
			}), a
		},
		getSelectedSeries: function() {
			return Xa(this.series, function(a) {
				return a.selected
			})
		},
		getStacks: function() {
			var a = this;
			Wa(a.yAxis, function(a) {
				a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
			}), Wa(a.series, function(b) {
				!b.options.stacking || b.visible !== !0 && a.options.chart.ignoreHiddenSeries !== !1 || (b.stackKey = b.type + Pa(b.options.stack, ""))
			})
		},
		setTitle: function(b, c, d) {
			var e, f, g = this,
				h = g.options;
			f = h.title = a(h.title, b), e = h.subtitle = a(h.subtitle, c), h = e, Wa([
				["title", b, f],
				["subtitle", c, h]
			], function(a) {
				var b = a[0],
					c = g[b],
					d = a[1],
					a = a[2];
				c && d && (g[b] = c = c.destroy()), a && a.text && !c && (g[b] = g.renderer.text(a.text, 0, 0, a.useHTML).attr({
					align: a.align,
					"class": "highcharts-" + b,
					zIndex: a.zIndex || 4
				}).css(a.style).add())
			}), g.layOutTitles(d)
		},
		layOutTitles: function(a) {
			var b = 0,
				c = this.title,
				d = this.subtitle,
				e = this.options,
				f = e.title,
				e = e.subtitle,
				g = this.renderer,
				h = this.spacingBox.width - 44;
			!c || (c.css({
				width: (f.width || h) + "px"
			}).align(Oa({
				y: g.fontMetrics(f.style.fontSize, c).b - 3
			}, f), !1, "spacingBox"), f.floating || f.verticalAlign) || (b = c.getBBox().height), d && (d.css({
				width: (e.width || h) + "px"
			}).align(Oa({
				y: b + (f.margin - 13) + g.fontMetrics(f.style.fontSize, d).b
			}, e), !1, "spacingBox"), !e.floating && !e.verticalAlign && (b = ka(b + d.getBBox().height))), c = this.titleOffset !== b, this.titleOffset = b, !this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered && Pa(a, !0) && this.isDirtyBox && this.redraw())
		},
		getChartSize: function() {
			var a = this.options.chart,
				b = a.width,
				a = a.height,
				c = this.renderToClone || this.renderTo;
			j(b) || (this.containerWidth = Ta(c, "width")), j(a) || (this.containerHeight = Ta(c, "height")), this.chartWidth = la(0, b || this.containerWidth || 600), this.chartHeight = la(0, Pa(a, this.containerHeight > 19 ? this.containerHeight : 400))
		},
		cloneRenderTo: function(a) {
			var b = this.renderToClone,
				c = this.container;
			a ? b && (this.renderTo.appendChild(c), y(b), delete this.renderToClone) : (c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), m(b, {
				position: "absolute",
				top: "-9999px",
				display: "block"
			}), b.style.setProperty && b.style.setProperty("display", "block", "important"), fa.body.appendChild(b), c && b.appendChild(c))
		},
		getContainer: function() {
			var a, d, e, f, g = this.options.chart;
			this.renderTo = a = g.renderTo, f = "highcharts-" + Ea++, c(a) && (this.renderTo = a = fa.getElementById(a)), a || z(13, !0), d = b(k(a, "data-highcharts-chart")), !isNaN(d) && Ga[d] && Ga[d].hasRendered && Ga[d].destroy(), k(a, "data-highcharts-chart", this.index), a.innerHTML = "", !g.skipClone && !a.offsetWidth && this.cloneRenderTo(), this.getChartSize(), d = this.chartWidth, e = this.chartHeight, this.container = a = n(Ia, {
				className: "highcharts-container" + (g.className ? " " + g.className : ""),
				id: f
			}, Oa({
				position: "relative",
				overflow: "hidden",
				width: d + "px",
				height: e + "px",
				textAlign: "left",
				lineHeight: "normal",
				zIndex: 0,
				"-webkit-tap-highlight-color": "rgba(0,0,0,0)"
			}, g.style), this.renderToClone || a), this._cursor = a.style.cursor, this.renderer = g.forExport ? new jb(a, d, e, g.style, !0) : new H(a, d, e, g.style), Ca && this.renderer.create(this, a, d, e), this.renderer.chartIndex = this.index
		},
		getMargins: function(a) {
			var b = this.spacing,
				c = this.margin,
				d = this.titleOffset;
			this.resetMargins(), d && !j(c[0]) && (this.plotTop = la(this.plotTop, d + this.options.title.margin + b[0])), this.legend.adjustMargins(c, b), this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin), this.extraTopMargin && (this.plotTop += this.extraTopMargin), a || this.getAxisMargins()
		},
		getAxisMargins: function() {
			var a = this,
				b = a.axisOffset = [0, 0, 0, 0],
				c = a.margin;
			a.hasCartesianSeries && Wa(a.axes, function(a) {
				a.getOffset()
			}), Wa(La, function(d, e) {
				j(c[e]) || (a[d] += b[e])
			}), a.setChartSize()
		},
		reflow: function(a) {
			var b = this,
				c = b.options.chart,
				d = b.renderTo,
				e = c.width || Ta(d, "width"),
				f = c.height || Ta(d, "height"),
				c = a ? a.target : ga,
				d = function() {
					b.container && (b.setSize(e, f, !1), b.hasUserSize = null)
				};
			b.hasUserSize || b.isPrinting || !e || !f || c !== ga && c !== fa || ((e !== b.containerWidth || f !== b.containerHeight) && (clearTimeout(b.reflowTimeout), a ? b.reflowTimeout = setTimeout(d, 100) : d()), b.containerWidth = e, b.containerHeight = f)
		},
		initReflow: function() {
			var a = this,
				b = function(b) {
					a.reflow(b)
				};
			$a(ga, "resize", b), $a(a, "destroy", function() {
				_a(ga, "resize", b)
			})
		},
		setSize: function(a, b, c) {
			var d, e, f, g = this;
			g.isResizing += 1, f = function() {
				g && ab(g, "endResize", null, function() {
					g.isResizing -= 1
				})
			}, B(c, g), g.oldChartHeight = g.chartHeight, g.oldChartWidth = g.chartWidth, j(a) && (g.chartWidth = d = la(0, ia(a)), g.hasUserSize = !! d), j(b) && (g.chartHeight = e = la(0, ia(b))), (M ? cb : m)(g.container, {
				width: d + "px",
				height: e + "px"
			}, M), g.setChartSize(!0), g.renderer.setSize(d, e, c), g.maxTicks = null, Wa(g.axes, function(a) {
				a.isDirty = !0, a.setScale()
			}), Wa(g.series, function(a) {
				a.isDirty = !0
			}), g.isDirtyLegend = !0, g.isDirtyBox = !0, g.layOutTitles(), g.getMargins(), g.redraw(c), g.oldChartHeight = null, ab(g, "resize"), M === !1 ? f() : setTimeout(f, M && M.duration || 500)
		},
		setChartSize: function(a) {
			var b, c, d, e, f = this.inverted,
				g = this.renderer,
				h = this.chartWidth,
				i = this.chartHeight,
				j = this.options.chart,
				k = this.spacing,
				l = this.clipOffset;
			this.plotLeft = b = ia(this.plotLeft), this.plotTop = c = ia(this.plotTop), this.plotWidth = d = la(0, ia(h - b - this.marginRight)), this.plotHeight = e = la(0, ia(i - c - this.marginBottom)), this.plotSizeX = f ? e : d, this.plotSizeY = f ? d : e, this.plotBorderWidth = j.plotBorderWidth || 0, this.spacingBox = g.spacingBox = {
				x: k[3],
				y: k[0],
				width: h - k[3] - k[1],
				height: i - k[0] - k[2]
			}, this.plotBox = g.plotBox = {
				x: b,
				y: c,
				width: d,
				height: e
			}, h = 2 * ja(this.plotBorderWidth / 2), f = ka(la(h, l[3]) / 2), g = ka(la(h, l[0]) / 2), this.clipBox = {
				x: f,
				y: g,
				width: ja(this.plotSizeX - la(h, l[1]) / 2 - f),
				height: la(0, ja(this.plotSizeY - la(h, l[2]) / 2 - g))
			}, a || Wa(this.axes, function(a) {
				a.setAxisSize(), a.setAxisTranslation()
			})
		},
		resetMargins: function() {
			var a = this;
			Wa(La, function(b, c) {
				a[b] = Pa(a.margin[c], a.spacing[c])
			}), a.axisOffset = [0, 0, 0, 0], a.clipOffset = [0, 0, 0, 0]
		},
		drawChartBox: function() {
			var a, b = this.options.chart,
				c = this.renderer,
				d = this.chartWidth,
				e = this.chartHeight,
				f = this.chartBackground,
				g = this.plotBackground,
				h = this.plotBorder,
				i = this.plotBGImage,
				j = b.borderWidth || 0,
				k = b.backgroundColor,
				l = b.plotBackgroundColor,
				m = b.plotBackgroundImage,
				n = b.plotBorderWidth || 0,
				o = this.plotLeft,
				p = this.plotTop,
				q = this.plotWidth,
				r = this.plotHeight,
				s = this.plotBox,
				t = this.clipRect,
				u = this.clipBox;
			a = j + (b.shadow ? 8 : 0), (j || k) && (f ? f.animate(f.crisp({
				width: d - a,
				height: e - a
			})) : (f = {
				fill: k || Ja
			}, j && (f.stroke = b.borderColor, f["stroke-width"] = j), this.chartBackground = c.rect(a / 2, a / 2, d - a, e - a, b.borderRadius, j).attr(f).addClass("highcharts-background").add().shadow(b.shadow))), l && (g ? g.animate(s) : this.plotBackground = c.rect(o, p, q, r, 0).attr({
				fill: l
			}).add().shadow(b.plotShadow)), m && (i ? i.animate(s) : this.plotBGImage = c.image(m, o, p, q, r).add()), t ? t.animate({
				width: u.width,
				height: u.height
			}) : this.clipRect = c.clipRect(u), n && (h ? h.animate(h.crisp({
				x: o,
				y: p,
				width: q,
				height: r,
				strokeWidth: -n
			})) : this.plotBorder = c.rect(o, p, q, r, 0, -n).attr({
				stroke: b.plotBorderColor,
				"stroke-width": n,
				fill: Ja,
				zIndex: 1
			}).add()), this.isDirtyBox = !1
		},
		propFromSeries: function() {
			var a, b, c, d = this,
				e = d.options.chart,
				f = d.options.series;
			Wa(["inverted", "angular", "polar"], function(g) {
				for (a = Na[e.type || e.defaultSeriesType], c = d[g] || e[g] || a && a.prototype[g], b = f && f.length; !c && b--;)(a = Na[f[b].type]) && a.prototype[g] && (c = !0);
				d[g] = c
			})
		},
		linkSeries: function() {
			var a = this,
				b = a.series;
			Wa(b, function(a) {
				a.linkedSeries.length = 0
			}), Wa(b, function(b) {
				var d = b.options.linkedTo;
				c(d) && (d = ":previous" === d ? a.series[b.index - 1] : a.get(d)) && (d.linkedSeries.push(b), b.linkedParent = d)
			})
		},
		renderSeries: function() {
			Wa(this.series, function(a) {
				a.translate(), a.render()
			})
		},
		renderLabels: function() {
			var a = this,
				c = a.options.labels;
			c.items && Wa(c.items, function(d) {
				var e = Oa(c.style, d.style),
					f = b(e.left) + a.plotLeft,
					g = b(e.top) + a.plotTop + 12;
				delete e.left, delete e.top, a.renderer.text(d.html, f, g).attr({
					zIndex: 2
				}).css(e).add()
			})
		},
		render: function() {
			var a, b, c, d, e = this.axes,
				f = this.renderer,
				g = this.options;
			this.setTitle(), this.legend = new ub(this, g.legend), this.getStacks(), this.getMargins(!0), this.setChartSize(), a = this.plotWidth, b = this.plotHeight -= 13, Wa(e, function(a) {
				a.setScale()
			}), this.getAxisMargins(), c = a / this.plotWidth > 1.1, d = b / this.plotHeight > 1.1, (c || d) && (this.maxTicks = null, Wa(e, function(a) {
				(a.horiz && c || !a.horiz && d) && a.setTickInterval(!0)
			}), this.getMargins()), this.drawChartBox(), this.hasCartesianSeries && Wa(e, function(a) {
				a.render()
			}), this.seriesGroup || (this.seriesGroup = f.g("series-group").attr({
				zIndex: 3
			}).add()), this.renderSeries(), this.renderLabels(), this.showCredits(g.credits), this.hasRendered = !0
		},
		showCredits: function(a) {
			a.enabled && !this.credits && (this.credits = this.renderer.text(a.text, 0, 0).on("click", function() {
				a.href && (location.href = a.href)
			}).attr({
				align: a.position.align,
				zIndex: 8
			}).css(a.style).add().align(a.position))
		},
		destroy: function() {
			var a, b = this,
				c = b.axes,
				d = b.series,
				e = b.container,
				f = e && e.parentNode;
			for (ab(b, "destroy"), Ga[b.index] = G, Ha--, b.renderTo.removeAttribute("data-highcharts-chart"), _a(b), a = c.length; a--;) c[a] = c[a].destroy();
			for (a = d.length; a--;) d[a] = d[a].destroy();
			Wa("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","), function(a) {
				var c = b[a];
				c && c.destroy && (b[a] = c.destroy())
			}), e && (e.innerHTML = "", _a(e), f && y(e));
			for (a in b) delete b[a]
		},
		isReadyToRender: function() {
			var a = this;
			return !Aa && ga == ga.top && "complete" !== fa.readyState || Ca && !ga.canvg ? (Ca ? lb.push(function() {
				a.firstRender()
			}, a.options.global.canvasToolsURL) : fa.attachEvent("onreadystatechange", function() {
				fa.detachEvent("onreadystatechange", a.firstRender), "complete" === fa.readyState && a.firstRender()
			}), !1) : !0
		},
		firstRender: function() {
			var a = this,
				b = a.options,
				c = a.callback;
			a.isReadyToRender() && (a.getContainer(), ab(a, "init"), a.resetMargins(), a.setChartSize(), a.propFromSeries(), a.getAxes(), Wa(b.series || [], function(b) {
				a.initSeries(b)
			}), a.linkSeries(), ab(a, "beforeRender"), ea.Pointer && (a.pointer = new pb(a, b)), a.render(), a.renderer.draw(), c && c.apply(a, [a]), Wa(a.callbacks, function(b) {
				a.index !== G && b.apply(a, [a])
			}), ab(a, "load"), a.cloneRenderTo(!0))
		},
		splashArray: function(a, b) {
			var c = b[a],
				c = d(c) ? c : [c, c, c, c];
			return [Pa(b[a + "Top"], c[0]), Pa(b[a + "Right"], c[1]), Pa(b[a + "Bottom"], c[2]), Pa(b[a + "Left"], c[3])]
		}
	};
	var vb = ea.CenteredSeriesMixin = {
		getCenter: function() {
			var a, b, c = this.options,
				d = this.chart,
				e = 2 * (c.slicedOffset || 0),
				f = d.plotWidth - 2 * e,
				d = d.plotHeight - 2 * e,
				g = c.center,
				g = [Pa(g[0], "50%"), Pa(g[1], "50%"), c.size || "100%", c.innerSize || 0],
				h = ma(f, d);
			for (a = 0; 4 > a; ++a) b = g[a], c = 2 > a || 2 === a && /%$/.test(b), g[a] = (/%$/.test(b) ? [f, d, h, g[2]][a] * parseFloat(b) / 100 : parseFloat(b)) + (c ? e : 0);
			return g
		}
	},
		wb = function() {};
	wb.prototype = {
		init: function(a, b, c) {
			return this.series = a, this.color = a.color, this.applyOptions(b, c), this.pointAttr = {}, a.options.colorByPoint && (b = a.options.colors || a.chart.options.colors, this.color = this.color || b[a.colorCounter++], a.colorCounter === b.length) && (a.colorCounter = 0), a.chart.pointCount++, this
		},
		applyOptions: function(a, b) {
			var c = this.series,
				d = c.options.pointValKey || c.pointValKey,
				a = wb.prototype.optionsToObject.call(this, a);
			return Oa(this, a), this.options = this.options ? Oa(this.options, a) : a, d && (this.y = this[d]), this.x === G && c && (this.x = b === G ? c.autoIncrement() : b), this
		},
		optionsToObject: function(a) {
			var b = {},
				c = this.series,
				d = c.options.keys,
				f = d || c.pointArrayMap || ["y"],
				g = f.length,
				h = 0,
				i = 0;
			if ("number" == typeof a || null === a) b[f[0]] = a;
			else if (e(a)) for (!d && a.length > g && (c = typeof a[0], "string" === c ? b.name = a[0] : "number" === c && (b.x = a[0]), h++); g > i;) b[f[i++]] = a[h++];
			else "object" == typeof a && (b = a, a.dataLabels && (c._hasPointLabels = !0), a.marker && (c._hasPointMarkers = !0));
			return b
		},
		destroy: function() {
			var a, b = this.series.chart,
				c = b.hoverPoints;
			b.pointCount--, c && (this.setState(), i(c, this), !c.length) && (b.hoverPoints = null), this === b.hoverPoint && this.onMouseOut(), (this.graphic || this.dataLabel) && (_a(this), this.destroyElements()), this.legendItem && b.legend.destroyItem(this);
			for (a in this) this[a] = null
		},
		destroyElements: function() {
			for (var a, b = "graphic,dataLabel,dataLabelUpper,group,connector,shadowGroup".split(","), c = 6; c--;) a = b[c], this[a] && (this[a] = this[a].destroy())
		},
		getLabelConfig: function() {
			return {
				x: this.category,
				y: this.y,
				key: this.name || this.category,
				series: this.series,
				point: this,
				percentage: this.percentage,
				total: this.total || this.stackTotal
			}
		},
		tooltipFormatter: function(a) {
			var b = this.series,
				c = b.tooltipOptions,
				d = Pa(c.valueDecimals, ""),
				e = c.valuePrefix || "",
				f = c.valueSuffix || "";
			return Wa(b.pointArrayMap || ["y"], function(b) {
				b = "{point." + b, (e || f) && (a = a.replace(b + "}", e + b + "}" + f)), a = a.replace(b + "}", b + ":,." + d + "f}")
			}), r(a, {
				point: this,
				series: this.series
			})
		},
		firePointEvent: function(a, b, c) {
			var d = this,
				e = this.series.options;
			(e.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents(), "click" === a && e.allowPointSelect && (c = function(a) {
				d.select && d.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
			}), ab(this, a, b, c)
		}
	};
	var xb = ea.Series = function() {};
	xb.prototype = {
		isCartesian: !0,
		type: "line",
		pointClass: wb,
		sorted: !0,
		requireSorting: !0,
		pointAttrToOptions: {
			stroke: "lineColor",
			"stroke-width": "lineWidth",
			fill: "fillColor",
			r: "radius"
		},
		axisTypes: ["xAxis", "yAxis"],
		colorCounter: 0,
		parallelArrays: ["x", "y"],
		init: function(a, b) {
			var c, d, e = this,
				f = a.series,
				g = function(a, b) {
					return Pa(a.options.index, a._i) - Pa(b.options.index, b._i)
				};
			e.chart = a, e.options = b = e.setOptions(b), e.linkedSeries = [], e.bindAxes(), Oa(e, {
				name: b.name,
				state: "",
				pointAttr: {},
				visible: b.visible !== !1,
				selected: b.selected === !0
			}), Ca && (b.animation = !1), d = b.events;
			for (c in d) $a(e, c, d[c]);
			(d && d.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) && (a.runTrackerClick = !0), e.getColor(), e.getSymbol(), Wa(e.parallelArrays, function(a) {
				e[a + "Data"] = []
			}), e.setData(b.data, !1), e.isCartesian && (a.hasCartesianSeries = !0), f.push(e), e._i = f.length - 1, u(f, g), this.yAxis && u(this.yAxis.series, g), Wa(f, function(a, b) {
				a.index = b, a.name = a.name || "Series " + (b + 1)
			})
		},
		bindAxes: function() {
			var a, b = this,
				c = b.options,
				d = b.chart;
			Wa(b.axisTypes || [], function(e) {
				Wa(d[e], function(d) {
					a = d.options, (c[e] === a.index || c[e] !== G && c[e] === a.id || c[e] === G && 0 === a.index) && (d.series.push(b), b[e] = d, d.isDirty = !0)
				}), !b[e] && b.optionalAxis !== e && z(18, !0)
			})
		},
		updateParallelArrays: function(a, b) {
			var c = a.series,
				d = arguments;
			Wa(c.parallelArrays, "number" == typeof b ?
			function(d) {
				var e = "y" === d && c.toYData ? c.toYData(a) : a[d];
				c[d + "Data"][b] = e
			} : function(a) {
				Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2))
			})
		},
		autoIncrement: function() {
			var a, b = this.options,
				c = this.xIncrement,
				d = b.pointIntervalUnit,
				c = Pa(c, b.pointStart, 0);
			return this.pointInterval = a = Pa(this.pointInterval, b.pointInterval, 1), ("month" === d || "year" === d) && (b = new P(c), b = "month" === d ? +b[ca](b[X]() + a) : +b[da](b[Y]() + a), a = b - c), this.xIncrement = c + a, c
		},
		getSegments: function() {
			var a, b = -1,
				c = [],
				d = this.points,
				e = d.length;
			if (e) if (this.options.connectNulls) {
				for (a = e; a--;) null === d[a].y && d.splice(a, 1);
				d.length && (c = [d])
			} else Wa(d, function(a, f) {
				null === a.y ? (f > b + 1 && c.push(d.slice(b + 1, f)), b = f) : f === e - 1 && c.push(d.slice(b + 1, f + 1))
			});
			this.segments = c
		},
		setOptions: function(b) {
			var c = this.chart,
				d = c.options.plotOptions,
				c = c.userOptions || {},
				e = c.plotOptions || {},
				f = d[this.type];
			return this.userOptions = b, d = a(f, d.series, b), this.tooltipOptions = a(K.tooltip, K.plotOptions[this.type].tooltip, c.tooltip, e.series && e.series.tooltip, e[this.type] && e[this.type].tooltip, b.tooltip), null === f.marker && delete d.marker, this.zoneAxis = d.zoneAxis, b = this.zones = (d.zones || []).slice(), !d.negativeColor && !d.negativeFillColor || d.zones || b.push({
				value: d[this.zoneAxis + "Threshold"] || d.threshold || 0,
				color: d.negativeColor,
				fillColor: d.negativeFillColor
			}), b.length && j(b[b.length - 1].value) && b.push({
				color: this.color,
				fillColor: this.fillColor
			}), d
		},
		getCyclic: function(a, b, c) {
			var d = this.userOptions,
				e = "_" + a + "Index",
				f = a + "Counter";
			b || (j(d[e]) ? b = d[e] : (d[e] = b = this.chart[f] % c.length, this.chart[f] += 1), b = c[b]), this[a] = b
		},
		getColor: function() {
			this.options.colorByPoint || this.getCyclic("color", this.options.color || eb[this.type].color, this.chart.options.colors)
		},
		getSymbol: function() {
			var a = this.options.marker;
			this.getCyclic("symbol", a.symbol, this.chart.options.symbols), /^url/.test(this.symbol) && (a.radius = 0)
		},
		drawLegendSymbol: kb.drawLineMarker,
		setData: function(a, b, d, g) {
			var h, i = this,
				j = i.points,
				k = j && j.length || 0,
				l = i.options,
				m = i.chart,
				n = null,
				o = i.xAxis,
				p = o && !! o.categories,
				q = l.turboThreshold,
				r = this.xData,
				s = this.yData,
				t = (h = i.pointArrayMap) && h.length,
				a = a || [];
			if (h = a.length, b = Pa(b, !0), g !== !1 && h && k === h && !i.cropped && !i.hasGroupedData && i.visible) Wa(a, function(a, b) {
				j[b].update && j[b].update(a, !1, null, !1)
			});
			else {
				if (i.xIncrement = null, i.pointRange = p ? 1 : l.pointRange, i.colorCounter = 0, Wa(this.parallelArrays, function(a) {
					i[a + "Data"].length = 0
				}), q && h > q) {
					for (d = 0; null === n && h > d;) n = a[d], d++;
					if (f(n)) {
						for (p = Pa(l.pointStart, 0), l = Pa(l.pointInterval, 1), d = 0; h > d; d++) r[d] = p, s[d] = a[d], p += l;
						i.xIncrement = p
					} else if (e(n)) if (t) for (d = 0; h > d; d++) l = a[d], r[d] = l[0], s[d] = l.slice(1, t + 1);
					else for (d = 0; h > d; d++) l = a[d], r[d] = l[0], s[d] = l[1];
					else z(12)
				} else for (d = 0; h > d; d++) a[d] !== G && (l = {
					series: i
				}, i.pointClass.prototype.applyOptions.apply(l, [a[d]]), i.updateParallelArrays(l, d), p && l.name) && (o.names[l.x] = l.name);
				for (c(s[0]) && z(14, !0), i.data = [], i.options.data = a, d = k; d--;) j[d] && j[d].destroy && j[d].destroy();
				o && (o.minRange = o.userMinRange), i.isDirty = i.isDirtyData = m.isDirtyBox = !0, d = !1
			}
			b && m.redraw(d)
		},
		processData: function(a) {
			var b, c = this.xData,
				d = this.yData,
				e = c.length;
			b = 0;
			var f, g, h, i = this.xAxis,
				j = this.options;
			h = j.cropThreshold;
			var k, l, m = this.isCartesian;
			if (m && !this.isDirty && !i.isDirty && !this.yAxis.isDirty && !a) return !1;
			for (i && (a = i.getExtremes(), k = a.min, l = a.max), m && this.sorted && (!h || e > h || this.forceCrop) && (c[e - 1] < k || c[0] > l ? (c = [], d = []) : (c[0] < k || c[e - 1] > l) && (b = this.cropData(this.xData, this.yData, k, l), c = b.xData, d = b.yData, b = b.start, f = !0)), h = c.length - 1; h >= 0; h--) e = c[h] - c[h - 1], e > 0 && (g === G || g > e) ? g = e : 0 > e && this.requireSorting && z(15);
			this.cropped = f, this.cropStart = b, this.processedXData = c, this.processedYData = d, null === j.pointRange && (this.pointRange = g || 1), this.closestPointRange = g
		},
		cropData: function(a, b, c, d) {
			var e, f = a.length,
				g = 0,
				h = f,
				i = Pa(this.cropShoulder, 1);
			for (e = 0; f > e; e++) if (a[e] >= c) {
				g = la(0, e - i);
				break
			}
			for (; f > e; e++) if (a[e] > d) {
				h = e + i;
				break
			}
			return {
				xData: a.slice(g, h),
				yData: b.slice(g, h),
				start: g,
				end: h
			}
		},
		generatePoints: function() {
			var a, b, c, d, e = this.options.data,
				f = this.data,
				g = this.processedXData,
				h = this.processedYData,
				i = this.pointClass,
				j = g.length,
				k = this.cropStart || 0,
				m = this.hasGroupedData,
				n = [];
			for (f || m || (f = [], f.length = e.length, f = this.data = f), d = 0; j > d; d++) b = k + d, m ? n[d] = (new i).init(this, [g[d]].concat(l(h[d]))) : (f[b] ? c = f[b] : e[b] !== G && (f[b] = c = (new i).init(this, e[b], g[d])), n[d] = c), n[d].index = b;
			if (f && (j !== (a = f.length) || m)) for (d = 0; a > d; d++) d === k && !m && (d += j), f[d] && (f[d].destroyElements(), f[d].plotX = G);
			this.data = f, this.points = n
		},
		getExtremes: function(a) {
			var b, c = this.yAxis,
				d = this.processedXData,
				e = [],
				f = 0;
			b = this.xAxis.getExtremes();
			var g, h, i, j, k = b.min,
				l = b.max,
				a = a || this.stackedYData || this.processedYData;
			for (b = a.length, j = 0; b > j; j++) if (h = d[j], i = a[j], g = null !== i && i !== G && (!c.isLog || i.length || i > 0), h = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (d[j + 1] || h) >= k && (d[j - 1] || h) <= l, g && h) if (g = i.length) for (; g--;) null !== i[g] && (e[f++] = i[g]);
			else e[f++] = i;
			this.dataMin = v(e), this.dataMax = w(e)
		},
		translate: function() {
			this.processedXData || this.processData(), this.generatePoints();
			for (var a, b, c, d = this.options, e = d.stacking, g = this.xAxis, h = g.categories, i = this.yAxis, k = this.points, l = k.length, m = !! this.modifyValue, n = d.pointPlacement, o = "between" === n || f(n), p = d.threshold, q = d.startFromThreshold ? p : 0, r = Number.MAX_VALUE, d = 0; l > d; d++) {
				var s = k[d],
					t = s.x,
					u = s.y;
				b = s.low;
				var v = e && i.stacks[(this.negStacks && (q ? 0 : p) > u ? "-" : "") + this.stackKey];
				i.isLog && null !== u && 0 >= u && (s.y = u = null, z(10)), s.plotX = a = ma(la(-1e5, g.translate(t, 0, 0, 0, 1, n, "flags" === this.type)), 1e5), e && this.visible && v && v[t] && (v = v[t], u = v.points[this.index + "," + d], b = u[0], u = u[1], b === q && (b = Pa(p, i.min)), i.isLog && 0 >= b && (b = null), s.total = s.stackTotal = v.total, s.percentage = v.total && s.y / v.total * 100, s.stackY = u, v.setOffset(this.pointXOffset || 0, this.barW || 0)), s.yBottom = j(b) ? i.translate(b, 0, 1, 0, 1) : null, m && (u = this.modifyValue(u, s)), s.plotY = b = "number" == typeof u && u !== 1 / 0 ? ma(la(-1e5, i.translate(u, 0, 1, 0, 1)), 1e5) : G, s.isInside = b !== G && b >= 0 && b <= i.len && a >= 0 && a <= g.len, s.clientX = o ? g.translate(t, 0, 0, 0, 1) : a, s.negative = s.y < (p || 0), s.category = h && h[s.x] !== G ? h[s.x] : s.x, d && (r = ma(r, na(a - c))), c = a
			}
			this.closestPointRangePx = r, this.getSegments()
		},
		setClip: function(a) {
			var b = this.chart,
				c = b.renderer,
				d = b.inverted,
				e = this.clipBox,
				f = e || b.clipBox,
				g = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, f.height].join(","),
				h = b[g],
				i = b[g + "m"];
			h || (a && (f.width = 0, b[g + "m"] = i = c.clipRect(-99, d ? -b.plotLeft : -b.plotTop, 99, d ? b.chartWidth : b.chartHeight)), b[g] = h = c.clipRect(f)), a && (h.count += 1), this.options.clip !== !1 && (this.group.clip(a || e ? h : b.clipRect), this.markerGroup.clip(i), this.sharedClipKey = g), a || (h.count -= 1, h.count <= 0 && g && b[g] && (e || (b[g] = b[g].destroy()), b[g + "m"] && (b[g + "m"] = b[g + "m"].destroy())))
		},
		animate: function(a) {
			var b, c = this.chart,
				e = this.options.animation;
			e && !d(e) && (e = eb[this.type].animation), a ? this.setClip(e) : (b = this.sharedClipKey, (a = c[b]) && a.animate({
				width: c.plotSizeX
			}, e), c[b + "m"] && c[b + "m"].animate({
				width: c.plotSizeX + 99
			}, e), this.animate = null)
		},
		afterAnimate: function() {
			this.setClip(), ab(this, "afterAnimate")
		},
		drawPoints: function() {
			var a, b, c, d, e, f, g, h, i, j, k, l, m = this.points,
				n = this.chart,
				o = this.options.marker,
				p = this.pointAttr[""],
				q = this.markerGroup,
				r = Pa(o.enabled, this.xAxis.isRadial, this.closestPointRangePx > 2 * o.radius);
			if (o.enabled !== !1 || this._hasPointMarkers) for (d = m.length; d--;) e = m[d], b = ja(e.plotX), c = e.plotY, i = e.graphic, j = e.marker || {}, k = !! e.marker, a = r && j.enabled === G || j.enabled, l = e.isInside, a && c !== G && !isNaN(c) && null !== e.y ? (a = e.pointAttr[e.selected ? "select" : ""] || p, f = a.r, g = Pa(j.symbol, this.symbol), h = 0 === g.indexOf("url"), i ? i[l ? "show" : "hide"](!0).animate(Oa({
				x: b - f,
				y: c - f
			}, i.symbolName ? {
				width: 2 * f,
				height: 2 * f
			} : {})) : l && (f > 0 || h) && (e.graphic = n.renderer.symbol(g, b - f, c - f, 2 * f, 2 * f, k ? j : o).attr(a).add(q))) : i && (e.graphic = i.destroy())
		},
		convertAttribs: function(a, b, c, d) {
			var e, f, g = this.pointAttrToOptions,
				h = {},
				a = a || {},
				b = b || {},
				c = c || {},
				d = d || {};
			for (e in g) f = g[e], h[e] = Pa(a[f], b[e], c[e], d[e]);
			return h
		},
		getAttribs: function() {
			var a, b = this,
				c = b.options,
				d = eb[b.type].marker ? c.marker : c,
				e = d.states,
				f = e.hover,
				g = b.color,
				h = b.options.negativeColor;
			a = {
				stroke: g,
				fill: g
			};
			var i, k, l = b.points || [],
				m = [],
				n = b.pointAttrToOptions;
			k = b.hasPointSpecificOptions;
			var o = d.lineColor,
				p = d.fillColor;
			i = c.turboThreshold;
			var q, r = b.zones,
				s = b.zoneAxis || "y";
			if (c.marker ? (f.radius = f.radius || d.radius + f.radiusPlus, f.lineWidth = f.lineWidth || d.lineWidth + f.lineWidthPlus) : (f.color = f.color || ib(f.color || g).brighten(f.brightness).get(), f.negativeColor = f.negativeColor || ib(f.negativeColor || h).brighten(f.brightness).get()), m[""] = b.convertAttribs(d, a), Wa(["hover", "select"], function(a) {
				m[a] = b.convertAttribs(e[a], m[""])
			}), b.pointAttr = m, g = l.length, !i || i > g || k) for (; g--;) {
				if (i = l[g], (d = i.options && i.options.marker || i.options) && d.enabled === !1 && (d.radius = 0), r.length) {
					for (k = 0, a = r[k]; i[s] >= a.value;) a = r[++k];
					i.color = i.fillColor = a.color
				}
				if (k = c.colorByPoint || i.color, i.options) for (q in n) j(d[n[q]]) && (k = !0);
				k ? (d = d || {}, k = [], e = d.states || {}, a = e.hover = e.hover || {}, c.marker || (a.color = a.color || !i.options.color && f[i.negative && h ? "negativeColor" : "color"] || ib(i.color).brighten(a.brightness || f.brightness).get()), a = {
					color: i.color
				}, p || (a.fillColor = i.color), o || (a.lineColor = i.color), d.hasOwnProperty("color") && !d.color && delete d.color, k[""] = b.convertAttribs(Oa(a, d), m[""]), k.hover = b.convertAttribs(e.hover, m.hover, k[""]), k.select = b.convertAttribs(e.select, m.select, k[""])) : k = m, i.pointAttr = k
			}
		},
		destroy: function() {
			var a, b, c, d, e = this,
				f = e.chart,
				g = /AppleWebKit\/533/.test(sa),
				h = e.data || [];
			for (ab(e, "destroy"), _a(e), Wa(e.axisTypes || [], function(a) {
				(d = e[a]) && (i(d.series, e), d.isDirty = d.forceRedraw = !0)
			}), e.legendItem && e.chart.legend.destroyItem(e), a = h.length; a--;)(b = h[a]) && b.destroy && b.destroy();
			e.points = null, clearTimeout(e.animationTimeout);
			for (c in e) e[c] instanceof D && !e[c].survive && (a = g && "group" === c ? "hide" : "destroy", e[c][a]());
			f.hoverSeries === e && (f.hoverSeries = null), i(f.series, e);
			for (c in e) delete e[c]
		},
		getSegmentPath: function(a) {
			var b = this,
				c = [],
				d = b.options.step;
			return Wa(a, function(e, f) {
				var g, h = e.plotX,
					i = e.plotY;
				b.getPointSpline ? c.push.apply(c, b.getPointSpline(a, e, f)) : (c.push(f ? "L" : "M"), d && f && (g = a[f - 1], "right" === d ? c.push(g.plotX, i) : "center" === d ? c.push((g.plotX + h) / 2, g.plotY, (g.plotX + h) / 2, i) : c.push(h, g.plotY)), c.push(e.plotX, e.plotY))
			}), c
		},
		getGraphPath: function() {
			var a, b = this,
				c = [],
				d = [];
			return Wa(b.segments, function(e) {
				a = b.getSegmentPath(e), e.length > 1 ? c = c.concat(a) : d.push(e[0])
			}), b.singlePoints = d, b.graphPath = c
		},
		drawGraph: function() {
			var a = this,
				b = this.options,
				c = [
					["graph", b.lineColor || this.color, b.dashStyle]
				],
				d = b.lineWidth,
				e = "square" !== b.linecap,
				f = this.getGraphPath(),
				g = this.fillGraph && this.color || Ja;
			Wa(this.zones, function(d, e) {
				c.push(["zoneGraph" + e, d.color || a.color, d.dashStyle || b.dashStyle])
			}), Wa(c, function(c, h) {
				var i = c[0],
					j = a[i];
				j ? (db(j), j.animate({
					d: f
				})) : (d || g) && f.length && (j = {
					stroke: c[1],
					"stroke-width": d,
					fill: g,
					zIndex: 1
				}, c[2] ? j.dashstyle = c[2] : e && (j["stroke-linecap"] = j["stroke-linejoin"] = "round"), a[i] = a.chart.renderer.path(f).attr(j).add(a.group).shadow(2 > h && b.shadow))
			})
		},
		applyZones: function() {
			var a, b, c, d, e, f, g, h = this,
				i = this.chart,
				j = i.renderer,
				k = this.zones,
				l = this.clips || [],
				m = this.graph,
				n = this.area,
				o = la(i.chartWidth, i.chartHeight),
				p = this[(this.zoneAxis || "y") + "Axis"],
				q = p.reversed,
				r = i.inverted,
				s = p.horiz,
				t = !1;
			k.length && (m || n) && (m && m.hide(), n && n.hide(), d = p.getExtremes(), Wa(k, function(k, u) {
				a = q ? s ? i.plotWidth : 0 : s ? 0 : p.toPixels(d.min), a = ma(la(Pa(b, a), 0), o), b = ma(la(ia(p.toPixels(Pa(k.value, d.max), !0)), 0), o), t && (a = b = p.toPixels(d.max)), e = Math.abs(a - b), f = ma(a, b), g = la(a, b), p.isXAxis ? (c = {
					x: r ? g : f,
					y: 0,
					width: e,
					height: o
				}, s || (c.x = i.plotHeight - c.x)) : (c = {
					x: 0,
					y: r ? g : f,
					width: o,
					height: e
				}, s && (c.y = i.plotWidth - c.y)), i.inverted && j.isVML && (c = p.isXAxis ? {
					x: 0,
					y: q ? f : g,
					height: c.width,
					width: i.chartWidth
				} : {
					x: c.y - i.plotLeft - i.spacingBox.x,
					y: 0,
					width: c.height,
					height: i.chartHeight
				}), l[u] ? l[u].animate(c) : (l[u] = j.clipRect(c), m && h["zoneGraph" + u].clip(l[u]), n && h["zoneArea" + u].clip(l[u])), t = k.value > d.max
			}), this.clips = l)
		},
		invertGroups: function() {
			function a() {
				var a = {
					width: b.yAxis.len,
					height: b.xAxis.len
				};
				Wa(["group", "markerGroup"], function(c) {
					b[c] && b[c].attr(a).invert()
				})
			}
			var b = this,
				c = b.chart;
			b.xAxis && ($a(c, "resize", a), $a(b, "destroy", function() {
				_a(c, "resize", a)
			}), a(), b.invertGroups = a)
		},
		plotGroup: function(a, b, c, d, e) {
			var f = this[a],
				g = !f;
			return g && (this[a] = f = this.chart.renderer.g(b).attr({
				visibility: c,
				zIndex: d || .1
			}).add(e)), f[g ? "attr" : "animate"](this.getPlotBox()), f
		},
		getPlotBox: function() {
			var a = this.chart,
				b = this.xAxis,
				c = this.yAxis;
			return a.inverted && (b = c, c = this.xAxis), {
				translateX: b ? b.left : a.plotLeft,
				translateY: c ? c.top : a.plotTop,
				scaleX: 1,
				scaleY: 1
			}
		},
		render: function() {
			var a, b = this,
				c = b.chart,
				d = b.options,
				e = (a = d.animation) && !! b.animate && c.renderer.isSVG && Pa(a.duration, 500) || 0,
				f = b.visible ? "visible" : "hidden",
				g = d.zIndex,
				h = b.hasRendered,
				i = c.seriesGroup;
			a = b.plotGroup("group", "series", f, g, i), b.markerGroup = b.plotGroup("markerGroup", "markers", f, g, i), e && b.animate(!0), b.getAttribs(), a.inverted = b.isCartesian ? c.inverted : !1, b.drawGraph && (b.drawGraph(), b.applyZones()), Wa(b.points, function(a) {
				a.redraw && a.redraw()
			}), b.drawDataLabels && b.drawDataLabels(), b.visible && b.drawPoints(), b.drawTracker && b.options.enableMouseTracking !== !1 && b.drawTracker(), c.inverted && b.invertGroups(), d.clip !== !1 && !b.sharedClipKey && !h && a.clip(c.clipRect), e && b.animate(), h || (e ? b.animationTimeout = setTimeout(function() {
				b.afterAnimate()
			}, e) : b.afterAnimate()), b.isDirty = b.isDirtyData = !1, b.hasRendered = !0
		},
		redraw: function() {
			var a = this.chart,
				b = this.isDirtyData,
				c = this.isDirty,
				d = this.group,
				e = this.xAxis,
				f = this.yAxis;
			d && (a.inverted && d.attr({
				width: a.plotWidth,
				height: a.plotHeight
			}), d.animate({
				translateX: Pa(e && e.left, a.plotLeft),
				translateY: Pa(f && f.top, a.plotTop)
			})), this.translate(), this.render(), b && ab(this, "updatedData"), (c || b) && delete this.kdTree
		},
		kdDimensions: 1,
		kdAxisArray: ["clientX", "plotY"],
		searchPoint: function(a, b) {
			var c = this.xAxis,
				d = this.yAxis,
				e = this.chart.inverted;
			return this.searchKDTree({
				clientX: e ? c.len - a.chartY + c.pos : a.chartX - c.pos,
				plotY: e ? d.len - a.chartX + d.pos : a.chartY - d.pos
			}, b)
		},
		buildKDTree: function() {
			function a(b, d, e) {
				var f, g;
				return (g = b && b.length) ? (f = c.kdAxisArray[d % e], b.sort(function(a, b) {
					return a[f] - b[f]
				}), g = Math.floor(g / 2), {
					point: b[g],
					left: a(b.slice(0, g), d + 1, e),
					right: a(b.slice(g + 1), d + 1, e)
				}) : void 0
			}
			function b() {
				var b = Xa(c.points, function(a) {
					return null !== a.y
				});
				c.kdTree = a(b, d, d)
			}
			var c = this,
				d = c.kdDimensions;
			delete c.kdTree, c.options.kdSync ? b() : setTimeout(b)
		},
		searchKDTree: function(a, b) {
			function c(a, b, h, i) {
				var k, l, m = b.point,
					n = d.kdAxisArray[h % i],
					o = m;
				return l = j(a[e]) && j(m[e]) ? Math.pow(a[e] - m[e], 2) : null, k = j(a[f]) && j(m[f]) ? Math.pow(a[f] - m[f], 2) : null, k = (l || 0) + (k || 0), m.dist = j(k) ? Math.sqrt(k) : Number.MAX_VALUE, m.distX = j(l) ? Math.sqrt(l) : Number.MAX_VALUE, n = a[n] - m[n], k = 0 > n ? "left" : "right", l = 0 > n ? "right" : "left", b[k] && (k = c(a, b[k], h + 1, i), o = k[g] < o[g] ? k : m), b[l] && Math.sqrt(n * n) < o[g] && (a = c(a, b[l], h + 1, i), o = a[g] < o[g] ? a : o), o
			}
			var d = this,
				e = this.kdAxisArray[0],
				f = this.kdAxisArray[1],
				g = b ? "distX" : "dist";
			return this.kdTree || this.buildKDTree(), this.kdTree ? c(a, this.kdTree, this.kdDimensions, this.kdDimensions) : void 0
		}
	}, F.prototype = {
		destroy: function() {
			x(this, this.axis)
		},
		render: function(a) {
			var b = this.options,
				c = b.format,
				c = c ? r(c, this) : b.formatter.call(this);
			this.label ? this.label.attr({
				text: c,
				visibility: "hidden"
			}) : this.label = this.axis.chart.renderer.text(c, null, null, b.useHTML).css(b.style).attr({
				align: this.textAlign,
				rotation: b.rotation,
				visibility: "hidden"
			}).add(a)
		},
		setOffset: function(a, b) {
			var c = this.axis,
				d = c.chart,
				e = d.inverted,
				f = c.reversed,
				f = this.isNegative && !f || !this.isNegative && f,
				g = c.translate(c.usePercentage ? 100 : this.total, 0, 0, 0, 1),
				c = c.translate(0),
				c = na(g - c),
				h = d.xAxis[0].translate(this.x) + a,
				i = d.plotHeight,
				f = {
					x: e ? f ? g : g - c : h,
					y: e ? i - h - b : f ? i - g - c : i - g,
					width: e ? c : b,
					height: e ? b : c
				};
			(e = this.label) && (e.align(this.alignOptions, null, f), f = e.alignAttr, e[this.options.crop === !1 || d.isInsidePlot(f.x, f.y) ? "show" : "hide"](!0))
		}
	}, mb.prototype.buildStacks = function() {
		var a = this.series,
			b = Pa(this.options.reversedStacks, !0),
			c = a.length;
		if (!this.isXAxis) {
			for (this.usePercentage = !1; c--;) a[b ? c : a.length - c - 1].setStackedPoints();
			if (this.usePercentage) for (c = 0; c < a.length; c++) a[c].setPercentStacks()
		}
	}, mb.prototype.renderStackTotals = function() {
		var a, b, c = this.chart,
			d = c.renderer,
			e = this.stacks,
			f = this.stackTotalGroup;
		f || (this.stackTotalGroup = f = d.g("stack-labels").attr({
			visibility: "visible",
			zIndex: 6
		}).add()), f.translate(c.plotLeft, c.plotTop);
		for (a in e) for (b in c = e[a]) c[b].render(f)
	}, xb.prototype.setStackedPoints = function() {
		if (this.options.stacking && (this.visible === !0 || this.chart.options.chart.ignoreHiddenSeries === !1)) {
			var a, b, c, d, e, f, g = this.processedXData,
				h = this.processedYData,
				i = [],
				j = h.length,
				k = this.options,
				l = k.threshold,
				m = k.startFromThreshold ? l : 0,
				n = k.stack,
				k = k.stacking,
				o = this.stackKey,
				p = "-" + o,
				q = this.negStacks,
				r = this.yAxis,
				s = r.stacks,
				t = r.oldStacks;
			for (d = 0; j > d; d++) e = g[d], f = h[d], c = this.index + "," + d, b = (a = q && (m ? 0 : l) > f) ? p : o, s[b] || (s[b] = {}), s[b][e] || (t[b] && t[b][e] ? (s[b][e] = t[b][e], s[b][e].total = null) : s[b][e] = new F(r, r.options.stackLabels, a, e, n)), b = s[b][e], b.points[c] = [Pa(b.cum, m)], "percent" === k ? (a = a ? o : p, q && s[a] && s[a][e] ? (a = s[a][e], b.total = a.total = la(a.total, b.total) + na(f) || 0) : b.total = A(b.total + (na(f) || 0))) : b.total = A(b.total + (f || 0)), b.cum = Pa(b.cum, m) + (f || 0), b.points[c].push(b.cum), i[d] = b.cum;
			"percent" === k && (r.usePercentage = !0), this.stackedYData = i, r.oldStacks = {}
		}
	}, xb.prototype.setPercentStacks = function() {
		var a = this,
			b = a.stackKey,
			c = a.yAxis.stacks,
			d = a.processedXData;
		Wa([b, "-" + b], function(b) {
			for (var e, f, g, h = d.length; h--;) f = d[h], e = (g = c[b] && c[b][f]) && g.points[a.index + "," + h], (f = e) && (g = g.total ? 100 / g.total : 0, f[0] = A(f[0] * g), f[1] = A(f[1] * g), a.stackedYData[h] = f[1])
		})
	}, Oa(Sa.prototype, {
		addSeries: function(a, b, c) {
			var d, e = this;
			return a && (b = Pa(b, !0), ab(e, "addSeries", {
				options: a
			}, function() {
				d = e.initSeries(a), e.isDirtyLegend = !0, e.linkSeries(), b && e.redraw(c)
			})), d
		},
		addAxis: function(b, c, d, e) {
			var f = c ? "xAxis" : "yAxis",
				g = this.options;
			new mb(this, a(b, {
				index: this[f].length,
				isX: c
			})), g[f] = l(g[f] || {}), g[f].push(b), Pa(d, !0) && this.redraw(e)
		},
		showLoading: function(a) {
			var b = this,
				c = b.options,
				d = b.loadingDiv,
				e = c.loading,
				f = function() {
					d && m(d, {
						left: b.plotLeft + "px",
						top: b.plotTop + "px",
						width: b.plotWidth + "px",
						height: b.plotHeight + "px"
					})
				};
			d || (b.loadingDiv = d = n(Ia, {
				className: "highcharts-loading"
			}, Oa(e.style, {
				zIndex: 10,
				display: Ja
			}), b.container), b.loadingSpan = n("span", null, e.labelStyle, d), $a(b, "redraw", f)), b.loadingSpan.innerHTML = a || c.lang.loading, b.loadingShown || (m(d, {
				opacity: 0,
				display: ""
			}), cb(d, {
				opacity: e.style.opacity
			}, {
				duration: e.showDuration || 0
			}), b.loadingShown = !0), f()
		},
		hideLoading: function() {
			var a = this.options,
				b = this.loadingDiv;
			b && cb(b, {
				opacity: 0
			}, {
				duration: a.loading.hideDuration || 100,
				complete: function() {
					m(b, {
						display: Ja
					})
				}
			}), this.loadingShown = !1
		}
	}), Oa(wb.prototype, {
		update: function(a, b, c, f) {
			function g() {
				i.applyOptions(a), null === i.y && k && (i.graphic = k.destroy()), d(a) && !e(a) && (i.redraw = function() {
					k && (a && a.marker && a.marker.symbol ? i.graphic = k.destroy() : k.attr(i.pointAttr[i.state || ""])[i.visible === !1 ? "hide" : "show"]()), a && a.dataLabels && i.dataLabel && (i.dataLabel = i.dataLabel.destroy()), i.redraw = null
				}), h = i.index, j.updateParallelArrays(i, h), n && i.name && (n[i.x] = i.name), m.data[h] = i.options, j.isDirty = j.isDirtyData = !0, !j.fixedBox && j.hasCartesianSeries && (l.isDirtyBox = !0), "point" === m.legendType && (l.isDirtyLegend = !0), b && l.redraw(c)
			}
			var h, i = this,
				j = i.series,
				k = i.graphic,
				l = j.chart,
				m = j.options,
				n = j.xAxis && j.xAxis.names,
				b = Pa(b, !0);
			f === !1 ? g() : i.firePointEvent("update", {
				options: a
			}, g)
		},
		remove: function(a, b) {
			this.series.removePoint(Va(this, this.series.data), a, b)
		}
	}), Oa(xb.prototype, {
		addPoint: function(a, b, c, d) {
			var e, f = this,
				g = f.options,
				h = f.data,
				i = f.graph,
				j = f.area,
				k = f.chart,
				l = f.xAxis && f.xAxis.names,
				m = i && i.shift || 0,
				n = ["graph", "area"],
				i = g.data,
				o = f.xData;
			if (B(d, k), c) {
				for (d = f.zones.length; d--;) n.push("zoneGraph" + d, "zoneArea" + d);
				Wa(n, function(a) {
					f[a] && (f[a].shift = m + 1)
				})
			}
			if (j && (j.isArea = !0), b = Pa(b, !0), j = {
				series: f
			}, f.pointClass.prototype.applyOptions.apply(j, [a]), n = j.x, d = o.length, f.requireSorting && n < o[d - 1]) for (e = !0; d && o[d - 1] > n;) d--;
			f.updateParallelArrays(j, "splice", d, 0, 0), f.updateParallelArrays(j, d), l && j.name && (l[n] = j.name), i.splice(d, 0, a), e && (f.data.splice(d, 0, null), f.processData()), "point" === g.legendType && f.generatePoints(), c && (h[0] && h[0].remove ? h[0].remove(!1) : (h.shift(), f.updateParallelArrays(j, "shift"), i.shift())), f.isDirty = !0, f.isDirtyData = !0, b && (f.getAttribs(), k.redraw())
		},
		removePoint: function(a, b, c) {
			var d = this,
				e = d.data,
				f = e[a],
				g = d.points,
				h = d.chart,
				i = function() {
					e.length === g.length && g.splice(a, 1), e.splice(a, 1), d.options.data.splice(a, 1), d.updateParallelArrays(f || {
						series: d
					}, "splice", a, 1), f && f.destroy(), d.isDirty = !0, d.isDirtyData = !0, b && h.redraw()
				};
			B(c, h), b = Pa(b, !0), f ? f.firePointEvent("remove", null, i) : i()
		},
		remove: function(a, b) {
			var c = this,
				d = c.chart,
				a = Pa(a, !0);
			c.isRemoving || (c.isRemoving = !0, ab(c, "remove", null, function() {
				c.destroy(), d.isDirtyLegend = d.isDirtyBox = !0, d.linkSeries(), a && d.redraw(b)
			})), c.isRemoving = !1
		},
		update: function(b, c) {
			var d, e = this,
				f = this.chart,
				g = this.userOptions,
				h = this.type,
				i = Na[h].prototype,
				j = ["group", "markerGroup", "dataLabelsGroup"];
			(b.type && b.type !== h || void 0 !== b.zIndex) && (j.length = 0), Wa(j, function(a) {
				j[a] = e[a], delete e[a]
			}), b = a(g, {
				animation: !1,
				index: this.index,
				pointStart: this.xData[0]
			}, {
				data: this.options.data
			}, b), this.remove(!1);
			for (d in i) this[d] = G;
			Oa(this, Na[b.type || h].prototype), Wa(j, function(a) {
				e[a] = j[a]
			}), this.init(f, b), f.linkSeries(), Pa(c, !0) && f.redraw(!1)
		}
	}), Oa(mb.prototype, {
		update: function(b, c) {
			var d = this.chart,
				b = d.options[this.coll][this.options.index] = a(this.userOptions, b);
			this.destroy(!0), this._addedPlotLB = this.chart._labelPanes = G, this.init(d, Oa(b, {
				events: G
			})), d.isDirtyBox = !0, Pa(c, !0) && d.redraw()
		},
		remove: function(a) {
			for (var b = this.chart, c = this.coll, d = this.series, e = d.length; e--;) d[e] && d[e].remove(!1);
			i(b.axes, this), i(b[c], this), b.options[c].splice(this.options.index, 1), Wa(b[c], function(a, b) {
				a.options.index = b
			}), this.destroy(), b.isDirtyBox = !0, Pa(a, !0) && b.redraw()
		},
		setTitle: function(a, b) {
			this.update({
				title: a
			}, b)
		},
		setCategories: function(a, b) {
			this.update({
				categories: a
			}, b)
		}
	});
	var yb = o(xb);
	Na.line = yb, eb.area = a(Ra, {
		threshold: 0
	});
	var zb = o(xb, {
		type: "area",
		getSegments: function() {
			var a, b, c, d, e = this,
				f = [],
				g = [],
				h = [],
				i = this.xAxis,
				j = this.yAxis,
				k = j.stacks[this.stackKey],
				l = {},
				m = this.points,
				n = this.options.connectNulls;
			if (this.options.stacking && !this.cropped) {
				for (c = 0; c < m.length; c++) l[m[c].x] = m[c];
				for (d in k) null !== k[d].total && h.push(+d);
				h.sort(function(a, b) {
					return a - b
				}), Wa(h, function(d) {
					var f, h = 0;
					if (!n || l[d] && null !== l[d].y) if (l[d]) g.push(l[d]);
					else {
						for (c = e.index; c <= j.series.length; c++) if (f = k[d].points[c + "," + d]) {
							h = f[1];
							break
						}
						a = i.translate(d), b = j.toPixels(h, !0), g.push({
							y: null,
							plotX: a,
							clientX: a,
							plotY: b,
							yBottom: b,
							onMouseOver: Fa
						})
					}
				}), g.length && f.push(g)
			} else xb.prototype.getSegments.call(this), f = this.segments;
			this.segments = f
		},
		getSegmentPath: function(a) {
			var b, c = xb.prototype.getSegmentPath.call(this, a),
				d = [].concat(c),
				e = this.options;
			b = c.length;
			var f, g = this.yAxis.getThreshold(e.threshold);
			if (3 === b && d.push("L", c[1], c[2]), e.stacking && !this.closedStacks) for (b = a.length - 1; b >= 0; b--) f = Pa(a[b].yBottom, g), b < a.length - 1 && e.step && d.push(a[b + 1].plotX, f), d.push(a[b].plotX, f);
			else this.closeSegment(d, a, g);
			return this.areaPath = this.areaPath.concat(d), c
		},
		closeSegment: function(a, b, c) {
			a.push("L", b[b.length - 1].plotX, c, "L", b[0].plotX, c)
		},
		drawGraph: function() {
			this.areaPath = [], xb.prototype.drawGraph.apply(this);
			var a = this,
				b = this.areaPath,
				c = this.options,
				d = [
					["area", this.color, c.fillColor]
				];
			Wa(this.zones, function(b, e) {
				d.push(["zoneArea" + e, b.color || a.color, b.fillColor || c.fillColor])
			}), Wa(d, function(d) {
				var e = d[0],
					f = a[e];
				f ? f.animate({
					d: b
				}) : a[e] = a.chart.renderer.path(b).attr({
					fill: Pa(d[2], ib(d[1]).setOpacity(Pa(c.fillOpacity, .75)).get()),
					zIndex: 0
				}).add(a.group)
			})
		},
		drawLegendSymbol: kb.drawRectangle
	});
	Na.area = zb, eb.spline = a(Ra), yb = o(xb, {
		type: "spline",
		getPointSpline: function(a, b, c) {
			var d, e, f, g, h = b.plotX,
				i = b.plotY,
				j = a[c - 1],
				k = a[c + 1];
			if (j && k) {
				a = j.plotY, f = k.plotX;
				var l, k = k.plotY;
				d = (1.5 * h + j.plotX) / 2.5, e = (1.5 * i + a) / 2.5, f = (1.5 * h + f) / 2.5, g = (1.5 * i + k) / 2.5, l = (g - e) * (f - h) / (f - d) + i - g, e += l, g += l, e > a && e > i ? (e = la(a, i), g = 2 * i - e) : a > e && i > e && (e = ma(a, i), g = 2 * i - e), g > k && g > i ? (g = la(k, i), e = 2 * i - g) : k > g && i > g && (g = ma(k, i), e = 2 * i - g), b.rightContX = f, b.rightContY = g
			}
			return c ? (b = ["C", j.rightContX || j.plotX, j.rightContY || j.plotY, d || h, e || i, h, i], j.rightContX = j.rightContY = null) : b = ["M", h, i], b
		}
	}), Na.spline = yb, eb.areaspline = a(eb.area), zb = zb.prototype, yb = o(yb, {
		type: "areaspline",
		closedStacks: !0,
		getSegmentPath: zb.getSegmentPath,
		closeSegment: zb.closeSegment,
		drawGraph: zb.drawGraph,
		drawLegendSymbol: kb.drawRectangle
	}), Na.areaspline = yb, eb.column = a(Ra, {
		borderColor: "#FFFFFF",
		borderRadius: 0,
		groupPadding: .2,
		marker: null,
		pointPadding: .1,
		minPointLength: 0,
		cropThreshold: 50,
		pointRange: null,
		states: {
			hover: {
				brightness: .1,
				shadow: !1,
				halo: !1
			},
			select: {
				color: "#C0C0C0",
				borderColor: "#000000",
				shadow: !1
			}
		},
		dataLabels: {
			align: null,
			verticalAlign: null,
			y: null
		},
		startFromThreshold: !0,
		stickyTracking: !1,
		tooltip: {
			distance: 6
		},
		threshold: 0
	}), yb = o(xb, {
		type: "column",
		pointAttrToOptions: {
			stroke: "borderColor",
			fill: "color",
			r: "borderRadius"
		},
		cropShoulder: 0,
		directTouch: !0,
		trackerGroups: ["group", "dataLabelsGroup"],
		negStacks: !0,
		init: function() {
			xb.prototype.init.apply(this, arguments);
			var a = this,
				b = a.chart;
			b.hasRendered && Wa(b.series, function(b) {
				b.type === a.type && (b.isDirty = !0)
			})
		},
		getColumnMetrics: function() {
			var a, b, c = this,
				d = c.options,
				e = c.xAxis,
				f = c.yAxis,
				g = e.reversed,
				h = {},
				i = 0;
			d.grouping === !1 ? i = 1 : Wa(c.chart.series, function(d) {
				var e = d.options,
					g = d.yAxis;
				d.type === c.type && d.visible && f.len === g.len && f.pos === g.pos && (e.stacking ? (a = d.stackKey, h[a] === G && (h[a] = i++), b = h[a]) : e.grouping !== !1 && (b = i++), d.columnIndex = b)
			});
			var e = ma(na(e.transA) * (e.ordinalSlope || d.pointRange || e.closestPointRange || e.tickInterval || 1), e.len),
				k = e * d.groupPadding,
				l = (e - 2 * k) / i,
				m = d.pointWidth,
				d = j(m) ? (l - m) / 2 : l * d.pointPadding,
				m = Pa(m, l - 2 * d);
			return c.columnMetrics = {
				width: m,
				offset: d + (k + ((g ? i - (c.columnIndex || 0) : c.columnIndex) || 0) * l - e / 2) * (g ? -1 : 1)
			}
		},
		translate: function() {
			var a = this,
				b = a.chart,
				c = a.options,
				d = a.borderWidth = Pa(c.borderWidth, a.closestPointRange * a.xAxis.transA < 2 ? 0 : 1),
				e = a.yAxis,
				f = a.translatedThreshold = e.getThreshold(c.threshold),
				g = Pa(c.minPointLength, 5),
				h = a.getColumnMetrics(),
				i = h.width,
				j = a.barW = la(i, 1 + 2 * d),
				k = a.pointXOffset = h.offset,
				l = -(d % 2 ? .5 : 0),
				m = d % 2 ? .5 : 1;
			b.inverted && (f -= .5, b.renderer.isVML && (m += 1)), c.pointPadding && (j = ka(j)), xb.prototype.translate.apply(a), Wa(a.points, function(c) {
				var d, h, n = Pa(c.yBottom, f),
					o = 999 + na(n),
					o = ma(la(-o, c.plotY), e.len + o),
					p = c.plotX + k,
					q = j,
					r = ma(o, n);
				d = la(o, n) - r, na(d) < g && g && (d = g, h = !e.reversed && !c.negative || e.reversed && c.negative, r = ia(na(r - f) > g ? n - g : f - (h ? g : 0))), c.barX = p, c.pointWidth = i, q = ia(p + q) + l, p = ia(p) + l, q -= p, n = na(r) < .5, d = ma(ia(r + d) + m, 9e4), r = ia(r) + m, d -= r, n && (r -= 1, d += 1), c.tooltipPos = b.inverted ? [e.len + e.pos - b.plotLeft - o, a.xAxis.len - p - q / 2, d] : [p + q / 2, o + e.pos - b.plotTop, d], c.shapeType = "rect", c.shapeArgs = {
					x: p,
					y: r,
					width: q,
					height: d
				}
			})
		},
		getSymbol: Fa,
		drawLegendSymbol: kb.drawRectangle,
		drawGraph: Fa,
		drawPoints: function() {
			var b, c, d = this,
				e = this.chart,
				f = d.options,
				g = e.renderer,
				h = f.animationLimit || 250;
			Wa(d.points, function(i) {
				var k = i.plotY,
					l = i.graphic;
				k === G || isNaN(k) || null === i.y ? l && (i.graphic = l.destroy()) : (b = i.shapeArgs, k = j(d.borderWidth) ? {
					"stroke-width": d.borderWidth
				} : {}, c = i.pointAttr[i.selected ? "select" : ""] || d.pointAttr[""], l ? (db(l), l.attr(k)[e.pointCount < h ? "animate" : "attr"](a(b))) : i.graphic = g[i.shapeType](b).attr(k).attr(c).add(d.group).shadow(f.shadow, null, f.stacking && !f.borderRadius))
			})
		},
		animate: function(a) {
			var b = this.yAxis,
				c = this.options,
				d = this.chart.inverted,
				e = {};
			Aa && (a ? (e.scaleY = .001, a = ma(b.pos + b.len, la(b.pos, b.toPixels(c.threshold))), d ? e.translateX = a - b.len : e.translateY = a, this.group.attr(e)) : (e.scaleY = 1, e[d ? "translateX" : "translateY"] = b.pos, this.group.animate(e, this.options.animation), this.animate = null))
		},
		remove: function() {
			var a = this,
				b = a.chart;
			b.hasRendered && Wa(b.series, function(b) {
				b.type === a.type && (b.isDirty = !0)
			}), xb.prototype.remove.apply(a, arguments)
		}
	}), Na.column = yb, eb.bar = a(eb.column), zb = o(yb, {
		type: "bar",
		inverted: !0
	}), Na.bar = zb, eb.scatter = a(Ra, {
		lineWidth: 0,
		marker: {
			enabled: !0
		},
		tooltip: {
			headerFormat: '<span style="color:{series.color}">●</span> <span style="font-size: 10px;"> {series.name}</span><br/>',
			pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
		}
	}), zb = o(xb, {
		type: "scatter",
		sorted: !1,
		requireSorting: !1,
		noSharedTooltip: !0,
		trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
		takeOrdinalPosition: !1,
		kdDimensions: 2,
		drawGraph: function() {
			this.options.lineWidth && xb.prototype.drawGraph.call(this)
		}
	}), Na.scatter = zb, eb.pie = a(Ra, {
		borderColor: "#FFFFFF",
		borderWidth: 1,
		center: [null, null],
		clip: !1,
		colorByPoint: !0,
		dataLabels: {
			distance: 30,
			enabled: !0,
			formatter: function() {
				return this.point.name
			},
			x: 0
		},
		ignoreHiddenPoint: !0,
		legendType: "point",
		marker: null,
		size: null,
		showInLegend: !1,
		slicedOffset: 10,
		states: {
			hover: {
				brightness: .1,
				shadow: !1
			}
		},
		stickyTracking: !1,
		tooltip: {
			followPointer: !0
		}
	}), Ra = {
		type: "pie",
		isCartesian: !1,
		pointClass: o(wb, {
			init: function() {
				wb.prototype.init.apply(this, arguments);
				var a, b = this;
				return Oa(b, {
					visible: b.visible !== !1,
					name: Pa(b.name, "Slice")
				}), a = function(a) {
					b.slice("select" === a.type)
				}, $a(b, "select", a), $a(b, "unselect", a), b
			},
			setVisible: function(a, b) {
				var c = this,
					d = c.series,
					e = d.chart,
					f = d.options.ignoreHiddenPoint,
					b = Pa(b, f);
				a !== c.visible && (c.visible = c.options.visible = a = a === G ? !c.visible : a, d.options.data[Va(c, d.data)] = c.options, Wa(["graphic", "dataLabel", "connector", "shadowGroup"], function(b) {
					c[b] && c[b][a ? "show" : "hide"](!0)
				}), c.legendItem && e.legend.colorizeItem(c, a), !a && "hover" === c.state && c.setState(""), f && (d.isDirty = !0), b && e.redraw())
			},
			slice: function(a, b, c) {
				var d = this.series;
				B(c, d.chart), Pa(b, !0), this.sliced = this.options.sliced = a = j(a) ? a : !this.sliced, d.options.data[Va(this, d.data)] = this.options, a = a ? this.slicedTranslation : {
					translateX: 0,
					translateY: 0
				}, this.graphic.animate(a), this.shadowGroup && this.shadowGroup.animate(a)
			},
			haloPath: function(a) {
				var b = this.shapeArgs,
					c = this.series.chart;
				return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.plotLeft + b.x, c.plotTop + b.y, b.r + a, b.r + a, {
					innerR: this.shapeArgs.r,
					start: b.start,
					end: b.end
				})
			}
		}),
		requireSorting: !1,
		directTouch: !0,
		noSharedTooltip: !0,
		trackerGroups: ["group", "dataLabelsGroup"],
		axisTypes: [],
		pointAttrToOptions: {
			stroke: "borderColor",
			"stroke-width": "borderWidth",
			fill: "color"
		},
		getColor: Fa,
		animate: function(a) {
			var b = this,
				c = b.points,
				d = b.startAngleRad;
			a || (Wa(c, function(a) {
				var c = a.graphic,
					e = a.shapeArgs;
				c && (c.attr({
					r: a.startR || b.center[3] / 2,
					start: d,
					end: d
				}), c.animate({
					r: e.r,
					start: e.start,
					end: e.end
				}, b.options.animation))
			}), b.animate = null)
		},
		setData: function(a, b, c, d) {
			xb.prototype.setData.call(this, a, !1, c, d), this.processData(), this.generatePoints(), Pa(b, !0) && this.chart.redraw(c)
		},
		updateTotals: function() {
			var a, b, c = 0,
				d = this.points,
				e = d.length,
				f = this.options.ignoreHiddenPoint;
			for (a = 0; e > a; a++) b = d[a], c += f && !b.visible ? 0 : b.y;
			for (this.total = c, a = 0; e > a; a++) b = d[a], b.percentage = c > 0 && (b.visible || !f) ? b.y / c * 100 : 0, b.total = c
		},
		generatePoints: function() {
			xb.prototype.generatePoints.call(this), this.updateTotals()
		},
		translate: function(a) {
			this.generatePoints();
			var b, c, d, e, f, g = 0,
				h = this.options,
				i = h.slicedOffset,
				j = i + h.borderWidth,
				k = h.startAngle || 0,
				l = this.startAngleRad = qa / 180 * (k - 90),
				k = (this.endAngleRad = qa / 180 * (Pa(h.endAngle, k + 360) - 90)) - l,
				m = this.points,
				n = h.dataLabels.distance,
				h = h.ignoreHiddenPoint,
				o = m.length;
			for (a || (this.center = a = this.getCenter()), this.getX = function(b, c) {
				return d = ha.asin(ma((b - a[1]) / (a[2] / 2 + n), 1)), a[0] + (c ? -1 : 1) * oa(d) * (a[2] / 2 + n)
			}, e = 0; o > e; e++) f = m[e], b = l + g * k, (!h || f.visible) && (g += f.percentage / 100), c = l + g * k, f.shapeType = "arc", f.shapeArgs = {
				x: a[0],
				y: a[1],
				r: a[2] / 2,
				innerR: a[3] / 2,
				start: ia(1e3 * b) / 1e3,
				end: ia(1e3 * c) / 1e3
			}, d = (c + b) / 2, d > 1.5 * qa ? d -= 2 * qa : -qa / 2 > d && (d += 2 * qa), f.slicedTranslation = {
				translateX: ia(oa(d) * i),
				translateY: ia(pa(d) * i)
			}, b = oa(d) * a[2] / 2, c = pa(d) * a[2] / 2, f.tooltipPos = [a[0] + .7 * b, a[1] + .7 * c], f.half = -qa / 2 > d || d > qa / 2 ? 1 : 0, f.angle = d, j = ma(j, n / 2), f.labelPos = [a[0] + b + oa(d) * n, a[1] + c + pa(d) * n, a[0] + b + oa(d) * j, a[1] + c + pa(d) * j, a[0] + b, a[1] + c, 0 > n ? "center" : f.half ? "right" : "left", d]
		},
		drawGraph: null,
		drawPoints: function() {
			var a, b, c, d, e, f = this,
				g = f.chart.renderer,
				h = f.options.shadow;
			h && !f.shadowGroup && (f.shadowGroup = g.g("shadow").add(f.group)), Wa(f.points, function(i) {
				b = i.graphic, d = i.shapeArgs, c = i.shadowGroup, h && !c && (c = i.shadowGroup = g.g("shadow").add(f.shadowGroup)), a = i.sliced ? i.slicedTranslation : {
					translateX: 0,
					translateY: 0
				}, c && c.attr(a), b ? b.animate(Oa(d, a)) : (e = {
					"stroke-linejoin": "round"
				}, i.visible || (e.visibility = "hidden"), i.graphic = b = g[i.shapeType](d).setRadialReference(f.center).attr(i.pointAttr[i.selected ? "select" : ""]).attr(e).attr(a).add(f.group).shadow(h, c))
			})
		},
		searchPoint: Fa,
		sortByAngle: function(a, b) {
			a.sort(function(a, c) {
				return void 0 !== a.angle && (c.angle - a.angle) * b
			})
		},
		drawLegendSymbol: kb.drawRectangle,
		getCenter: vb.getCenter,
		getSymbol: Fa
	}, Ra = o(xb, Ra), Na.pie = Ra, xb.prototype.drawDataLabels = function() {
		var b, c, d, e, f = this,
			g = f.options,
			h = g.cursor,
			i = g.dataLabels,
			k = f.points,
			l = f.hasRendered || 0,
			m = f.chart.renderer;
		(i.enabled || f._hasPointLabels) && (f.dlProcessOptions && f.dlProcessOptions(i), e = f.plotGroup("dataLabelsGroup", "data-labels", i.defer ? "hidden" : "visible", i.zIndex || 6), Pa(i.defer, !0) && (e.attr({
			opacity: +l
		}), l || $a(f, "afterAnimate", function() {
			f.visible && e.show(), e[g.animation ? "animate" : "attr"]({
				opacity: 1
			}, {
				duration: 200
			})
		})), c = i, Wa(k, function(k) {
			var l, n, o, p, q = k.dataLabel,
				s = k.connector,
				t = !0,
				u = {};
			if (b = k.dlOptions || k.options && k.options.dataLabels, l = Pa(b && b.enabled, c.enabled), q && !l) k.dataLabel = q.destroy();
			else if (l) {
				if (i = a(c, b), p = i.style, l = i.rotation, n = k.getLabelConfig(), d = i.format ? r(i.format, n) : i.formatter.call(n, i), p.color = Pa(i.color, p.color, f.color, "black"), q) j(d) ? (q.attr({
					text: d
				}), t = !1) : (k.dataLabel = q = q.destroy(), s && (k.connector = s.destroy()));
				else if (j(d)) {
					q = {
						fill: i.backgroundColor,
						stroke: i.borderColor,
						"stroke-width": i.borderWidth,
						r: i.borderRadius || 0,
						rotation: l,
						padding: i.padding,
						zIndex: 1
					}, "contrast" === p.color && (u.color = i.inside || i.distance < 0 || g.stacking ? m.getContrast(k.color || f.color) : "#000000"), h && (u.cursor = h);
					for (o in q) q[o] === G && delete q[o];
					q = k.dataLabel = m[l ? "text" : "label"](d, 0, -999, i.shape, null, null, i.useHTML).attr(q).css(Oa(p, u)).add(e).shadow(i.shadow)
				}
				q && f.alignDataLabel(k, q, i, null, t)
			}
		}))
	}, xb.prototype.alignDataLabel = function(a, b, c, d, e) {
		var f = this.chart,
			g = f.inverted,
			h = Pa(a.plotX, -999),
			i = Pa(a.plotY, -999),
			j = b.getBBox(),
			k = f.renderer.fontMetrics(c.style.fontSize).b,
			l = this.visible && (a.series.forceDL || f.isInsidePlot(h, ia(i), g) || d && f.isInsidePlot(h, g ? d.x + 1 : d.y + d.height - 1, g));
		l && (d = Oa({
			x: g ? f.plotWidth - i : h,
			y: ia(g ? f.plotHeight - h : i),
			width: 0,
			height: 0
		}, d), Oa(c, {
			width: j.width,
			height: j.height
		}), c.rotation ? (a = f.renderer.rotCorr(k, c.rotation), b[e ? "attr" : "animate"]({
			x: d.x + c.x + d.width / 2 + a.x,
			y: d.y + c.y + d.height / 2
		}).attr({
			align: c.align
		})) : (b.align(c, null, d), g = b.alignAttr, "justify" === Pa(c.overflow, "justify") ? this.justifyDataLabel(b, c, g, j, d, e) : Pa(c.crop, !0) && (l = f.isInsidePlot(g.x, g.y) && f.isInsidePlot(g.x + j.width, g.y + j.height)), c.shape && b.attr({
			anchorX: a.plotX,
			anchorY: a.plotY
		}))), l || (b.attr({
			y: -999
		}), b.placed = !1)
	}, xb.prototype.justifyDataLabel = function(a, b, c, d, e, f) {
		var g, h, i = this.chart,
			j = b.align,
			k = b.verticalAlign,
			l = a.box ? 0 : a.padding || 0;
		g = c.x + l, 0 > g && ("right" === j ? b.align = "left" : b.x = -g, h = !0), g = c.x + d.width - l, g > i.plotWidth && ("left" === j ? b.align = "right" : b.x = i.plotWidth - g, h = !0), g = c.y + l, 0 > g && ("bottom" === k ? b.verticalAlign = "top" : b.y = -g, h = !0), g = c.y + d.height - l, g > i.plotHeight && ("top" === k ? b.verticalAlign = "bottom" : b.y = i.plotHeight - g, h = !0), h && (a.placed = !f, a.align(b, null, e))
	}, Na.pie && (Na.pie.prototype.drawDataLabels = function() {
		var a, b, c, d, e, f, g, h, i, j, k, l = this,
			m = l.data,
			n = l.chart,
			o = l.options.dataLabels,
			p = Pa(o.connectorPadding, 10),
			q = Pa(o.connectorWidth, 1),
			r = n.plotWidth,
			s = n.plotHeight,
			t = Pa(o.softConnector, !0),
			u = o.distance,
			v = l.center,
			x = v[2] / 2,
			y = v[1],
			z = u > 0,
			A = [
				[],
				[]
			],
			B = [0, 0, 0, 0],
			C = function(a, b) {
				return b.y - a.y
			};
		if (l.visible && (o.enabled || l._hasPointLabels)) {
			for (xb.prototype.drawDataLabels.apply(l), Wa(m, function(a) {
				a.dataLabel && a.visible && A[a.half].push(a)
			}), j = 2; j--;) {
				var D, E = [],
					F = [],
					G = A[j],
					H = G.length;
				if (H) {
					for (l.sortByAngle(G, j - .5), k = m = 0; !m && G[k];) m = G[k] && G[k].dataLabel && (G[k].dataLabel.getBBox().height || 21), k++;
					if (u > 0) {
						for (e = ma(y + x + u, n.plotHeight), k = la(0, y - x - u); e >= k; k += m) E.push(k);
						if (e = E.length, H > e) {
							for (a = [].concat(G), a.sort(C), k = H; k--;) a[k].rank = k;
							for (k = H; k--;) G[k].rank >= e && G.splice(k, 1);
							H = G.length
						}
						for (k = 0; H > k; k++) {
							a = G[k], f = a.labelPos, a = 9999;
							var I, J;
							for (J = 0; e > J; J++) I = na(E[J] - f[1]), a > I && (a = I, D = J);
							if (k > D && null !== E[k]) D = k;
							else for (H - k + D > e && null !== E[k] && (D = e - H + k); null === E[D];) D++;
							F.push({
								i: D,
								y: E[D]
							}), E[D] = null
						}
						F.sort(C)
					}
					for (k = 0; H > k; k++) a = G[k], f = a.labelPos, d = a.dataLabel, i = a.visible === !1 ? "hidden" : "inherit", a = f[1], u > 0 ? (e = F.pop(), D = e.i, h = e.y, (a > h && null !== E[D + 1] || h > a && null !== E[D - 1]) && (h = ma(la(0, a), n.plotHeight))) : h = a, g = o.justify ? v[0] + (j ? -1 : 1) * (x + u) : l.getX(h === y - x - u || h === y + x + u ? a : h, j), d._attr = {
						visibility: i,
						align: f[6]
					}, d._pos = {
						x: g + o.x + ({
							left: p,
							right: -p
						}[f[6]] || 0),
						y: h + o.y - 10
					}, d.connX = g, d.connY = h, null === this.options.size && (e = d.width, p > g - e ? B[3] = la(ia(e - g + p), B[3]) : g + e > r - p && (B[1] = la(ia(g + e - r + p), B[1])), 0 > h - m / 2 ? B[0] = la(ia(-h + m / 2), B[0]) : h + m / 2 > s && (B[2] = la(ia(h + m / 2 - s), B[2])))
				}
			}(0 === w(B) || this.verifyDataLabelOverflow(B)) && (this.placeDataLabels(), z && q && Wa(this.points, function(a) {
				b = a.connector, f = a.labelPos, (d = a.dataLabel) && d._pos && a.visible ? (i = d._attr.visibility, g = d.connX, h = d.connY, c = t ? ["M", g + ("left" === f[6] ? 5 : -5), h, "C", g, h, 2 * f[2] - f[4], 2 * f[3] - f[5], f[2], f[3], "L", f[4], f[5]] : ["M", g + ("left" === f[6] ? 5 : -5), h, "L", f[2], f[3], "L", f[4], f[5]], b ? (b.animate({
					d: c
				}), b.attr("visibility", i)) : a.connector = b = l.chart.renderer.path(c).attr({
					"stroke-width": q,
					stroke: o.connectorColor || a.color || "#606060",
					visibility: i
				}).add(l.dataLabelsGroup)) : b && (a.connector = b.destroy())
			}))
		}
	}, Na.pie.prototype.placeDataLabels = function() {
		Wa(this.points, function(a) {
			var b = a.dataLabel;
			b && a.visible && ((a = b._pos) ? (b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({
				y: -999
			}))
		})
	}, Na.pie.prototype.alignDataLabel = Fa, Na.pie.prototype.verifyDataLabelOverflow = function(a) {
		var b, c = this.center,
			d = this.options,
			e = d.center,
			f = d.minSize || 80,
			g = f;
		return null !== e[0] ? g = la(c[2] - la(a[1], a[3]), f) : (g = la(c[2] - a[1] - a[3], f), c[0] += (a[3] - a[1]) / 2), null !== e[1] ? g = la(ma(g, c[2] - la(a[0], a[2])), f) : (g = la(ma(g, c[2] - a[0] - a[2]), f), c[1] += (a[0] - a[2]) / 2), g < c[2] ? (c[2] = g, c[3] = /%$/.test(d.innerSize || 0) ? g * parseFloat(d.innerSize || 0) / 100 : parseFloat(d.innerSize || 0), this.translate(c), Wa(this.points, function(a) {
			a.dataLabel && (a.dataLabel._pos = null)
		}), this.drawDataLabels && this.drawDataLabels()) : b = !0, b
	}), Na.column && (Na.column.prototype.alignDataLabel = function(b, c, d, e, f) {
		var g = this.chart.inverted,
			h = b.series,
			i = b.dlBox || b.shapeArgs,
			j = Pa(b.below, b.plotY > Pa(this.translatedThreshold, h.yAxis.len)),
			k = Pa(d.inside, !! this.options.stacking);
		i && (e = a(i), g && (e = {
			x: h.yAxis.len - e.y - e.height,
			y: h.xAxis.len - e.x - e.width,
			width: e.height,
			height: e.width
		}), !k) && (g ? (e.x += j ? 0 : e.width, e.width = 0) : (e.y += j ? e.height : 0, e.height = 0)), d.align = Pa(d.align, !g || k ? "center" : j ? "right" : "left"), d.verticalAlign = Pa(d.verticalAlign, g || k ? "middle" : j ? "top" : "bottom"), xb.prototype.alignDataLabel.call(this, b, c, d, e, f)
	}), function(a) {
		var b = a.Chart,
			c = a.each,
			d = a.pick,
			e = HighchartsAdapter.addEvent;
		b.prototype.callbacks.push(function(a) {
			function b() {
				var b = [];
				c(a.series, function(a) {
					var e = a.options.dataLabels;
					(e.enabled || a._hasPointLabels) && !e.allowOverlap && a.visible && c(a.points, function(a) {
						a.dataLabel && (a.dataLabel.labelrank = d(a.labelrank, a.shapeArgs && a.shapeArgs.height), b.push(a.dataLabel))
					})
				}), a.hideOverlappingLabels(b)
			}
			b(), e(a, "redraw", b)
		}), b.prototype.hideOverlappingLabels = function(a) {
			var b, c, d, e, f = a.length;
			for (c = 0; f > c; c++)(b = a[c]) && (b.oldOpacity = b.opacity, b.newOpacity = 1);
			for (a.sort(function(a, b) {
				return b.labelrank - a.labelrank
			}), c = 0; f > c; c++) for (d = a[c], b = c + 1; f > b; ++b) e = a[b], d && e && d.placed && e.placed && 0 !== d.newOpacity && 0 !== e.newOpacity && !(e.alignAttr.x > d.alignAttr.x + d.width || e.alignAttr.x + e.width < d.alignAttr.x || e.alignAttr.y > d.alignAttr.y + d.height || e.alignAttr.y + e.height < d.alignAttr.y) && ((d.labelrank < e.labelrank ? d : e).newOpacity = 0);
			for (c = 0; f > c; c++)(b = a[c]) && (b.oldOpacity !== b.newOpacity && b.placed && (b.alignAttr.opacity = b.newOpacity, b[b.isOld && b.newOpacity ? "animate" : "attr"](b.alignAttr)), b.isOld = !0)
		}
	}(ea), Ra = ea.TrackerMixin = {
		drawTrackerPoint: function() {
			var a = this,
				b = a.chart,
				c = b.pointer,
				d = a.options.cursor,
				e = d && {
					cursor: d
				},
				f = function(a) {
					for (var c, d = a.target; d && !c;) c = d.point, d = d.parentNode;
					c !== G && c !== b.hoverPoint && c.onMouseOver(a)
				};
			Wa(a.points, function(a) {
				a.graphic && (a.graphic.element.point = a), a.dataLabel && (a.dataLabel.element.point = a)
			}), a._hasTracking || (Wa(a.trackerGroups, function(b) {
				a[b] && (a[b].addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function(a) {
					c.onTrackerMouseOut(a)
				}).css(e), I) && a[b].on("touchstart", f)
			}), a._hasTracking = !0)
		},
		drawTrackerGraph: function() {
			var a, b = this,
				c = b.options,
				d = c.trackByArea,
				e = [].concat(d ? b.areaPath : b.graphPath),
				f = e.length,
				g = b.chart,
				h = g.pointer,
				i = g.renderer,
				j = g.options.tooltip.snap,
				k = b.tracker,
				l = c.cursor,
				m = l && {
					cursor: l
				},
				l = b.singlePoints,
				n = function() {
					g.hoverSeries !== b && b.onMouseOver()
				},
				o = "rgba(192,192,192," + (Aa ? 1e-4 : .002) + ")";
			if (f && !d) for (a = f + 1; a--;)"M" === e[a] && e.splice(a + 1, 0, e[a + 1] - j, e[a + 2], "L"), (a && "M" === e[a] || a === f) && e.splice(a, 0, "L", e[a - 2] + j, e[a - 1]);
			for (a = 0; a < l.length; a++) f = l[a], e.push("M", f.plotX - j, f.plotY, "L", f.plotX + j, f.plotY);
			k ? k.attr({
				d: e
			}) : (b.tracker = i.path(e).attr({
				"stroke-linejoin": "round",
				visibility: b.visible ? "visible" : "hidden",
				stroke: o,
				fill: d ? o : Ja,
				"stroke-width": c.lineWidth + (d ? 0 : 2 * j),
				zIndex: 2
			}).add(b.group), Wa([b.tracker, b.markerGroup], function(a) {
				a.addClass("highcharts-tracker").on("mouseover", n).on("mouseout", function(a) {
					h.onTrackerMouseOut(a)
				}).css(m), I && a.on("touchstart", n)
			}))
		}
	}, Na.column && (yb.prototype.drawTracker = Ra.drawTrackerPoint), Na.pie && (Na.pie.prototype.drawTracker = Ra.drawTrackerPoint), Na.scatter && (zb.prototype.drawTracker = Ra.drawTrackerPoint), Oa(ub.prototype, {
		setItemEvents: function(a, b, c, d, e) {
			var f = this;
			(c ? b : a.legendGroup).on("mouseover", function() {
				a.setState("hover"), b.css(f.options.itemHoverStyle)
			}).on("mouseout", function() {
				b.css(a.visible ? d : e), a.setState()
			}).on("click", function(b) {
				var c = function() {
						a.setVisible()
					},
					b = {
						browserEvent: b
					};
				a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : ab(a, "legendItemClick", b, c)
			})
		},
		createCheckboxForItem: function(a) {
			a.checkbox = n("input", {
				type: "checkbox",
				checked: a.selected,
				defaultChecked: a.selected
			}, this.options.itemCheckboxStyle, this.chart.container), $a(a.checkbox, "click", function(b) {
				ab(a.series || a, "checkboxClick", {
					checked: b.target.checked,
					item: a
				}, function() {
					a.select()
				})
			})
		}
	}), K.legend.itemStyle.cursor = "pointer", Oa(Sa.prototype, {
		showResetZoom: function() {
			var a = this,
				b = K.lang,
				c = a.options.chart.resetZoomButton,
				d = c.theme,
				e = d.states,
				f = "chart" === c.relativeTo ? null : "plotBox";
			this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function() {
				a.zoomOut()
			}, d, e && e.hover).attr({
				align: c.position.align,
				title: b.resetZoomTitle
			}).add().align(c.position, !1, f)
		},
		zoomOut: function() {
			var a = this;
			ab(a, "selection", {
				resetSelection: !0
			}, function() {
				a.zoom()
			})
		},
		zoom: function(a) {
			var b, c, e = this.pointer,
				f = !1;
			!a || a.resetSelection ? Wa(this.axes, function(a) {
				b = a.zoom()
			}) : Wa(a.xAxis.concat(a.yAxis), function(a) {
				var c = a.axis,
					d = c.isXAxis;
				(e[d ? "zoomX" : "zoomY"] || e[d ? "pinchX" : "pinchY"]) && (b = c.zoom(a.min, a.max), c.displayBtn && (f = !0))
			}), c = this.resetZoomButton, f && !c ? this.showResetZoom() : !f && d(c) && (this.resetZoomButton = c.destroy()), b && this.redraw(Pa(this.options.chart.animation, a && a.animation, this.pointCount < 100))
		},
		pan: function(a, b) {
			var c, d = this,
				e = d.hoverPoints;
			e && Wa(e, function(a) {
				a.setState()
			}), Wa("xy" === b ? [1, 0] : [1], function(b) {
				var e = a[b ? "chartX" : "chartY"],
					f = d[b ? "xAxis" : "yAxis"][0],
					g = d[b ? "mouseDownX" : "mouseDownY"],
					h = (f.pointRange || 0) / 2,
					i = f.getExtremes(),
					j = f.toValue(g - e, !0) + h,
					h = f.toValue(g + d[b ? "plotWidth" : "plotHeight"] - e, !0) - h,
					g = g > e;
				f.series.length && (g || j > ma(i.dataMin, i.min)) && (!g || h < la(i.dataMax, i.max)) && (f.setExtremes(j, h, !1, !1, {
					trigger: "pan"
				}), c = !0), d[b ? "mouseDownX" : "mouseDownY"] = e
			}), c && d.redraw(!1), m(d.container, {
				cursor: "move"
			})
		}
	}), Oa(wb.prototype, {
		select: function(a, b) {
			var c = this,
				d = c.series,
				e = d.chart,
				a = Pa(a, !c.selected);
			c.firePointEvent(a ? "select" : "unselect", {
				accumulate: b
			}, function() {
				c.selected = c.options.selected = a, d.options.data[Va(c, d.data)] = c.options, c.setState(a && "select"), b || Wa(e.getSelectedPoints(), function(a) {
					a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[Va(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
				})
			})
		},
		onMouseOver: function(a) {
			var b = this.series,
				c = b.chart,
				d = c.tooltip,
				e = c.hoverPoint;
			c.hoverSeries !== b && b.onMouseOver(), e && e !== this && e.onMouseOut(), this.series && (this.firePointEvent("mouseOver"), d && (!d.shared || b.noSharedTooltip) && d.refresh(this, a), this.setState("hover"), c.hoverPoint = this)
		},
		onMouseOut: function() {
			var a = this.series.chart,
				b = a.hoverPoints;
			this.firePointEvent("mouseOut"), b && -1 !== Va(this, b) || (this.setState(), a.hoverPoint = null)
		},
		importEvents: function() {
			if (!this.hasImportedEvents) {
				var b, c = a(this.series.options.point, this.options).events;
				this.events = c;
				for (b in c) $a(this, b, c[b]);
				this.hasImportedEvents = !0
			}
		},
		setState: function(b, c) {
			var d, e = this.plotX,
				f = this.plotY,
				g = this.series,
				h = g.options.states,
				i = eb[g.type].marker && g.options.marker,
				j = i && !i.enabled,
				k = i && i.states[b],
				l = k && k.enabled === !1,
				m = g.stateMarkerGraphic,
				n = this.marker || {},
				o = g.chart,
				p = g.halo,
				b = b || "";
			d = this.pointAttr[b] || g.pointAttr[b], b === this.state && !c || this.selected && "select" !== b || h[b] && h[b].enabled === !1 || b && (l || j && k.enabled === !1) || b && n.states && n.states[b] && n.states[b].enabled === !1 || (this.graphic ? (i = i && this.graphic.symbolName && d.r, this.graphic.attr(a(d, i ? {
				x: e - i,
				y: f - i,
				width: 2 * i,
				height: 2 * i
			} : {})), m && m.hide()) : (b && k && (i = k.radius, n = n.symbol || g.symbol, m && m.currentSymbol !== n && (m = m.destroy()), m ? m[c ? "animate" : "attr"]({
				x: e - i,
				y: f - i
			}) : n && (g.stateMarkerGraphic = m = o.renderer.symbol(n, e - i, f - i, 2 * i, 2 * i).attr(d).add(g.markerGroup), m.currentSymbol = n)), m && (m[b && o.isInsidePlot(e, f, o.inverted) ? "show" : "hide"](), m.element.point = this)), (e = h[b] && h[b].halo) && e.size ? (p || (g.halo = p = o.renderer.path().add(o.seriesGroup)), p.attr(Oa({
				fill: ib(this.color || g.color).setOpacity(e.opacity).get()
			}, e.attributes))[c ? "animate" : "attr"]({
				d: this.haloPath(e.size)
			})) : p && p.attr({
				d: []
			}), this.state = b)
		},
		haloPath: function(a) {
			var b = this.series,
				c = b.chart,
				d = b.getPlotBox(),
				e = c.inverted;
			return c.renderer.symbols.circle(d.translateX + (e ? b.yAxis.len - this.plotY : this.plotX) - a, d.translateY + (e ? b.xAxis.len - this.plotX : this.plotY) - a, 2 * a, 2 * a)
		}
	}), Oa(xb.prototype, {
		onMouseOver: function() {
			var a = this.chart,
				b = a.hoverSeries;
			b && b !== this && b.onMouseOut(), this.options.events.mouseOver && ab(this, "mouseOver"), this.setState("hover"), a.hoverSeries = this
		},
		onMouseOut: function() {
			var a = this.options,
				b = this.chart,
				c = b.tooltip,
				d = b.hoverPoint;
			b.hoverSeries = null, d && d.onMouseOut(), this && a.events.mouseOut && ab(this, "mouseOut"), c && !a.stickyTracking && (!c.shared || this.noSharedTooltip) && c.hide(), this.setState()
		},
		setState: function(a) {
			var b = this.options,
				c = this.graph,
				d = b.states,
				e = b.lineWidth,
				b = 0,
				a = a || "";
			if (this.state !== a && (this.state = a, !(d[a] && d[a].enabled === !1) && (a && (e = d[a].lineWidth || e + (d[a].lineWidthPlus || 0)), c && !c.dashstyle))) for (a = {
				"stroke-width": e
			}, c.attr(a); this["zoneGraph" + b];) this["zoneGraph" + b].attr(a), b += 1
		},
		setVisible: function(a, b) {
			var c, d = this,
				e = d.chart,
				f = d.legendItem,
				g = e.options.chart.ignoreHiddenSeries,
				h = d.visible;
			c = (d.visible = a = d.userOptions.visible = a === G ? !h : a) ? "show" : "hide", Wa(["group", "dataLabelsGroup", "markerGroup", "tracker"], function(a) {
				d[a] && d[a][c]()
			}), (e.hoverSeries === d || (e.hoverPoint && e.hoverPoint.series) === d) && d.onMouseOut(), f && e.legend.colorizeItem(d, a), d.isDirty = !0, d.options.stacking && Wa(e.series, function(a) {
				a.options.stacking && a.visible && (a.isDirty = !0)
			}), Wa(d.linkedSeries, function(b) {
				b.setVisible(a, !1)
			}), g && (e.isDirtyBox = !0), b !== !1 && e.redraw(), ab(d, c)
		},
		show: function() {
			this.setVisible(!0)
		},
		hide: function() {
			this.setVisible(!1)
		},
		select: function(a) {
			this.selected = a = a === G ? !this.selected : a, this.checkbox && (this.checkbox.checked = a), ab(this, a ? "select" : "unselect")
		},
		drawTracker: Ra.drawTrackerGraph
	}), Oa(ea, {
		Color: ib,
		Point: wb,
		Tick: E,
		Renderer: H,
		SVGElement: D,
		SVGRenderer: jb,
		arrayMin: v,
		arrayMax: w,
		charts: Ga,
		dateFormat: L,
		error: z,
		format: r,
		pathAnim: N,
		getOptions: function() {
			return K
		},
		hasBidiBug: Ba,
		isTouchDevice: ya,
		setOptions: function(b) {
			return K = a(!0, K, b), C(), K
		},
		addEvent: $a,
		removeEvent: _a,
		createElement: n,
		discardElement: y,
		css: m,
		each: Wa,
		map: Za,
		merge: a,
		splat: l,
		extendClass: o,
		pInt: b,
		svg: Aa,
		canvas: Ca,
		vml: !Aa && !Ca,
		product: "Highcharts",
		version: "4.1.7"
	})
}(), angular.module("highcharts-ng", []).directive("highchart", function() {
	var a = 0,
		b = function(b) {
			b.forEach(function(b) {
				angular.isDefined(b.id) || (b.id = "series-" + a++)
			})
		},
		c = function(a, b, c) {
			var d = {
				chart: {
					renderTo: a[0]
				},
				title: {},
				series: []
			},
				e = {};
			return e = b ? $.extend(!0, {}, d, b) : d, c && (e.series = c), e
		};
	return {
		restrict: "EC",
		replace: !1,
		scope: {
			series: "=",
			options: "=",
			title: "="
		},
		link: function(a, d, e) {
			var f = c(d, a.options, a.series),
				g = new Highcharts.Chart(f);
			a.$watch("series", function(a, c) {
				if (a !== c && a) {
					b(a);
					var d = [];
					a.forEach(function(a) {
						d.push(a.id);
						var b = g.get(a.id);
						b ? b.update(angular.copy(a), !1) : g.addSeries(angular.copy(a), !1)
					}), g.series.forEach(function(a) {
						d.indexOf(a.options.id) < 0 && a.remove(!1)
					}), g.redraw()
				}
			}, !0), a.$watch("title", function(a) {
				g.setTitle(a, !0)
			}, !0), a.$watch("options", function(a, e, f) {
				if (a !== e) {
					g.destroy();
					var h = c(d, a);
					g = new Highcharts.Chart(h), g.setTitle(f.title, !0), b(f.series), f.series.forEach(function(a) {
						g.addSeries(angular.copy(a), !1)
					}), g.redraw()
				}
			}, !0)
		}
	}
});