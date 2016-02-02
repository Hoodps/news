(function(e) {
	e.MtaH5 = e.MtaH5 || {};
	MtaH5.hack = function() {
		var c = document.getElementsByName("MTAH5"),
			e = {
				conf: {
					senseHash: !0,
					autoReport: !0,
					performanceMonitor: !0
				}
			};
		if (0 < c.length && ("undefined" !== typeof c[0].attributes.sid && (e.conf.sid = c[0].attributes.sid.nodeValue), "undefined" !== typeof c[0].attributes.cid && (e.conf.cid = c[0].attributes.cid.nodeValue), "undefined" !== typeof c[0].attributes.opts)) {
			var c = JSON.parse(c[0].attributes.opts.nodeValue),
				f;
			for (f in c) c.hasOwnProperty(f) && (e.conf[f] = c[f])
		}
		return e
	}
})(this);
(function(e, c) {
	function n(a) {
		var b = "";
		b = window.localStorage ? localStorage.getItem(a) || sessionStorage.getItem(a) : (a = document.cookie.match(new RegExp("(?:^|;\\s)" + a + "=(.*?)(?:;\\s|$)"))) ? a[1] : "";
		return b
	}
	function f(a, b, g) {
		if (window.localStorage) g ? localStorage.setItem(a, b) : sessionStorage.setItem(a, b);
		else {
			var d = window.location.host,
				e = {
					"com.cn": 1,
					"js.cn": 1,
					"net.cn": 1,
					"gov.cn": 1,
					"com.hk": 1,
					"co.nz": 1
				},
				h = d.split(".");
			2 < h.length && (d = (e[h.slice(-2).join(".")] ? h.slice(-3) : h.slice(-2)).join("."));
			document.cookie = a + "=" + b + ";path=/;domain=" + d + (g ? ";expires=" + g : "")
		}
	}
	function m(a) {
		var b, g, d, e = {};
		void 0 === a ? (d = window.location, a = d.host, b = d.pathname, g = d.search.substr(1), d = d.hash) : (d = a.match(/\w+:\/\/((?:[\w-]+\.)+\w+)(?:\:\d+)?(\/[^\?\\\"\'\|\:<>]*)?(?:\?([^\'\"\\<>#]*))?(?:#(\w+))?/i) || [], a = d[1], b = d[2], g = d[3], d = d[4]);
		if (g) for (var h = g.split("&"), l = 0, k = h.length; l < k; l++) if (-1 != h[l].indexOf("=")) {
			var c = h[l].indexOf("="),
				w = h[l].slice(0, c),
				c = h[l].slice(c + 1);
			e[w] = c
		}
		return {
			host: a,
			path: b,
			search: g,
			hash: d,
			param: e
		}
	}
	function p(a) {
		return (a || "") + Math.round(2147483647 * (Math.random() || .5)) * +new Date % 1E10
	}
	function q() {
		var a = m(),
			b = {
				dm: a.host,
				pvi: "",
				si: "",
				url: a.path,
				arg: encodeURIComponent(a.search || ""),
				ty: 1
			};
		b.pvi = function() {
			var a = n("pgv_pvi");
			a || (b.ty = 0, a = p(), f("pgv_pvi", a, "Sun, 18 Jan 2038 00:00:00 GMT;"));
			return a
		}();
		b.si = function() {
			var a = n("pgv_si");
			a || (a = p("s"), f("pgv_si", a));
			return a
		}();
		b.url = function() {
			var b = a.path;
			e.senseHash && (b = a.hash ? b + a.hash.replace(/#/i, "_") : b);
			return b
		}();
		return b
	}
	function r() {
		var a = m(document.referrer),
			b = m();
		return {
			rdm: a.host,
			rurl: a.path,
			rarg: encodeURIComponent(a.search || ""),
			adt: b.param.ADTAG || b.param.adtag || b.param.PTAG || b.param.ptag
		}
	}
	function t() {
		try {
			var a = navigator,
				b = screen || {
					width: "",
					height: "",
					colorDepth: ""
				},
				g = document.body,
				d = b.width + "x" + b.height,
				e = b.colorDepth + "-bit",
				c = (a.language || a.userLanguage).toLowerCase(),
				l = a.javaEnabled() ? 1 : 0,
				k = (new Date).getTimezoneOffset() / 60,
				a = "";
			g && g.addBehavior && (g.addBehavior("#default#clientCaps"), a = g.connectionType);
			g = {
				fl: "",
				scr: d,
				scl: e,
				lg: c,
				jv: l,
				tz: k,
				ct: a
			}
		} catch (f) {
			return {}
		}
		return g
	}

	function u(a) {
		a = a || {};
		for (var b in a) a.hasOwnProperty(b) && (e[b] = a[b]);
		if (e.sid) {
			var g = [];
			a = 0;
			for (var d = [q(), r(),
			{
				r2: e.sid
			},
			t(),
			{
				random: +new Date
			}], c = d.length; a < c; a++) for (b in d[a]) d[a].hasOwnProperty(b) && g.push(b + "=" + (d[a][b] || ""));
			var h = function(a) {
					a = Ta.src = ("https:" == document.location.protocol ? "https://pingtas" : "http://pingtcss") + ".qq.com/pingd?" + a.join("&");
					var b = new Image;
					Ta[e.sid] = b;
					b.onload = b.onerror = b.onabort = function() {
						b = b.onload = b.onerror = b.onabort = null;
						Ta[e.sid] = !0
					};
					b.src = a
				};
			e.performanceMonitor ? (window.onload && h(g), window.onload = function() {
				var a;
				if (window.performance) {
					a = window.performance.timing;
					var b = {
						value: a.domainLookupEnd - a.domainLookupStart
					},
						d = {
							value: a.connectEnd - a.connectStart
						},
						e = {
							value: a.responseStart - (a.requestStart || a.responseStart + 1)
						},
						c = a.responseEnd - a.responseStart;
					a.domContentLoadedEventStart ? 0 > c && (c = 0) : c = -1;
					a = {
						domainLookupTime: b,
						connectTime: d,
						requestTime: e,
						resourcesLoadedTime: {
							value: c
						},
						domParsingTime: {
							value: a.domContentLoadedEventStart ? a.domInteractive - a.domLoading : -1
						},
						domContentLoadedTime: {
							value: a.domContentLoadedEventStart ? a.domContentLoadedEventStart - a.fetchStart : -1
						}
					}
				} else a = "";
				var b = [],
					f;
				for (f in a) a.hasOwnProperty(f) && ("domContentLoadedTime" == f ? g.push("r3=" + a[f].value) : b.push(a[f].value));
				g.push("ext=pfm=" + b.join("_"));
				h(g)
			}) : h(g)
		}
	}
	c.MtaH5 = c.MtaH5 || {};
	c.Ta = c.Ta || {};
	MtaH5.pgv = u;
	Ta.clickStat = MtaH5.clickStat = function(a) {
		var b = MtaH5.hack ? MtaH5.hack() : "",
			c = {};
		b.conf &&
		function() {
			var a = b.conf,
				d;
			for (d in a) a.hasOwnProperty(d) && (c[d] = a[d])
		}();
		if (c.cid) {
			var d = [],
				f = q(),
				h = {
					r2: e.sid
				};
			f.dm = "TACLICK";
			f.url = a;
			h.r2 = c.cid;
			a = 0;
			f = [f, r(), h, t(),
			{
				random: +new Date
			}];
			for (h = f.length; a < h; a++) for (var l in f[a]) f[a].hasOwnProperty(l) && d.push(l + "=" + (f[a][l] || ""));
			var d = MtaH5.src = ("https:" == document.location.protocol ? "https://pingtas" : "http://pingtcss") + ".qq.com/pingd?" + d.join("&"),
				k = new Image;
			MtaH5["click_" + c.sid] = k;
			k.onload = k.onerror = k.onabort = function() {
				k = k.onload = k.onerror = k.onabort = null;
				MtaH5[c.sid] = !0
			};
			k.src = d
		}
	};
	var v = MtaH5.hack ? MtaH5.hack() : {};
	v.conf &&
	function() {
		var a = v.conf,
			b;
		for (b in a) a.hasOwnProperty(b) && (e[b] = a[b])
	}();
	e.autoReport && u()
})({}, this);