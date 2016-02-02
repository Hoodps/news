var Zepto = function() {
		function a(a) {
			return null == a ? String(a) : U[V.call(a)] || "object"
		}
		function b(b) {
			return "function" == a(b)
		}
		function c(a) {
			return null != a && a == a.window
		}
		function d(a) {
			return null != a && a.nodeType == a.DOCUMENT_NODE
		}
		function e(b) {
			return "object" == a(b)
		}
		function f(a) {
			return e(a) && !c(a) && Object.getPrototypeOf(a) == Object.prototype
		}
		function g(a) {
			return "number" == typeof a.length
		}
		function h(a) {
			return D.call(a, function(a) {
				return null != a
			})
		}
		function i(a) {
			return a.length > 0 ? x.fn.concat.apply([], a) : a
		}
		function j(a) {
			return a.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
		}
		function k(a) {
			return a in G ? G[a] : G[a] = new RegExp("(^|\\s)" + a + "(\\s|$)")
		}
		function l(a, b) {
			return "number" != typeof b || H[j(a)] ? b : b + "px"
		}
		function m(a) {
			var b, c;
			return F[a] || (b = E.createElement(a), E.body.appendChild(b), c = getComputedStyle(b, "").getPropertyValue("display"), b.parentNode.removeChild(b), "none" == c && (c = "block"), F[a] = c), F[a]
		}
		function n(a) {
			return "children" in a ? C.call(a.children) : x.map(a.childNodes, function(a) {
				return 1 == a.nodeType ? a : void 0
			})
		}
		function o(a, b, c) {
			for (w in b) c && (f(b[w]) || Z(b[w])) ? (f(b[w]) && !f(a[w]) && (a[w] = {}), Z(b[w]) && !Z(a[w]) && (a[w] = []), o(a[w], b[w], c)) : b[w] !== v && (a[w] = b[w])
		}
		function p(a, b) {
			return null == b ? x(a) : x(a).filter(b)
		}
		function q(a, c, d, e) {
			return b(c) ? c.call(a, d, e) : c
		}
		function r(a, b, c) {
			null == c ? a.removeAttribute(b) : a.setAttribute(b, c)
		}
		function s(a, b) {
			var c = a.className,
				d = c && c.baseVal !== v;
			return b === v ? d ? c.baseVal : c : void(d ? c.baseVal = b : a.className = b)
		}
		function t(a) {
			var b;
			try {
				return a ? "true" == a || ("false" == a ? !1 : "null" == a ? null : /^0/.test(a) || isNaN(b = Number(a)) ? /^[\[\{]/.test(a) ? x.parseJSON(a) : a : b) : a
			} catch (c) {
				return a
			}
		}
		function u(a, b) {
			b(a);
			for (var c = 0, d = a.childNodes.length; d > c; c++) u(a.childNodes[c], b)
		}
		var v, w, x, y, z, A, B = [],
			C = B.slice,
			D = B.filter,
			E = window.document,
			F = {},
			G = {},
			H = {
				"column-count": 1,
				columns: 1,
				"font-weight": 1,
				"line-height": 1,
				opacity: 1,
				"z-index": 1,
				zoom: 1
			},
			I = /^\s*<(\w+|!)[^>]*>/,
			J = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
			K = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
			L = /^(?:body|html)$/i,
			M = /([A-Z])/g,
			N = ["val", "css", "html", "text", "data", "width", "height", "offset"],
			O = ["after", "prepend", "before", "append"],
			P = E.createElement("table"),
			Q = E.createElement("tr"),
			R = {
				tr: E.createElement("tbody"),
				tbody: P,
				thead: P,
				tfoot: P,
				td: Q,
				th: Q,
				"*": E.createElement("div")
			},
			S = /complete|loaded|interactive/,
			T = /^[\w-]*$/,
			U = {},
			V = U.toString,
			W = {},
			X = E.createElement("div"),
			Y = {
				tabindex: "tabIndex",
				readonly: "readOnly",
				"for": "htmlFor",
				"class": "className",
				maxlength: "maxLength",
				cellspacing: "cellSpacing",
				cellpadding: "cellPadding",
				rowspan: "rowSpan",
				colspan: "colSpan",
				usemap: "useMap",
				frameborder: "frameBorder",
				contenteditable: "contentEditable"
			},
			Z = Array.isArray ||
		function(a) {
			return a instanceof Array
		};
		return W.matches = function(a, b) {
			if (!b || !a || 1 !== a.nodeType) return !1;
			var c = a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.matchesSelector;
			if (c) return c.call(a, b);
			var d, e = a.parentNode,
				f = !e;
			return f && (e = X).appendChild(a), d = ~W.qsa(e, b).indexOf(a), f && X.removeChild(a), d
		}, z = function(a) {
			return a.replace(/-+(.)?/g, function(a, b) {
				return b ? b.toUpperCase() : ""
			})
		}, A = function(a) {
			return D.call(a, function(b, c) {
				return a.indexOf(b) == c
			})
		}, W.fragment = function(a, b, c) {
			var d, e, g;
			return J.test(a) && (d = x(E.createElement(RegExp.$1))), d || (a.replace && (a = a.replace(K, "<$1></$2>")), b === v && (b = I.test(a) && RegExp.$1), b in R || (b = "*"), g = R[b], g.innerHTML = "" + a, d = x.each(C.call(g.childNodes), function() {
				g.removeChild(this)
			})), f(c) && (e = x(d), x.each(c, function(a, b) {
				N.indexOf(a) > -1 ? e[a](b) : e.attr(a, b)
			})), d
		}, W.Z = function(a, b) {
			return a = a || [], a.__proto__ = x.fn, a.selector = b || "", a
		}, W.isZ = function(a) {
			return a instanceof W.Z
		}, W.init = function(a, c) {
			var d;
			if (!a) return W.Z();
			if ("string" == typeof a) if (a = a.trim(), "<" == a[0] && I.test(a)) d = W.fragment(a, RegExp.$1, c), a = null;
			else {
				if (c !== v) return x(c).find(a);
				d = W.qsa(E, a)
			} else {
				if (b(a)) return x(E).ready(a);
				if (W.isZ(a)) return a;
				if (Z(a)) d = h(a);
				else if (e(a)) d = [a], a = null;
				else if (I.test(a)) d = W.fragment(a.trim(), RegExp.$1, c), a = null;
				else {
					if (c !== v) return x(c).find(a);
					d = W.qsa(E, a)
				}
			}
			return W.Z(d, a)
		}, x = function(a, b) {
			return W.init(a, b)
		}, x.extend = function(a) {
			var b, c = C.call(arguments, 1);
			return "boolean" == typeof a && (b = a, a = c.shift()), c.forEach(function(c) {
				o(a, c, b)
			}), a
		}, W.qsa = function(a, b) {
			var c, e = "#" == b[0],
				f = !e && "." == b[0],
				g = e || f ? b.slice(1) : b,
				h = T.test(g);
			return d(a) && h && e ? (c = a.getElementById(g)) ? [c] : [] : 1 !== a.nodeType && 9 !== a.nodeType ? [] : C.call(h && !e ? f ? a.getElementsByClassName(g) : a.getElementsByTagName(b) : a.querySelectorAll(b))
		}, x.contains = E.documentElement.contains ?
		function(a, b) {
			return a !== b && a.contains(b)
		} : function(a, b) {
			for (; b && (b = b.parentNode);) if (b === a) return !0;
			return !1
		}, x.type = a, x.isFunction = b, x.isWindow = c, x.isArray = Z, x.isPlainObject = f, x.isEmptyObject = function(a) {
			var b;
			for (b in a) return !1;
			return !0
		}, x.inArray = function(a, b, c) {
			return B.indexOf.call(b, a, c)
		}, x.camelCase = z, x.trim = function(a) {
			return null == a ? "" : String.prototype.trim.call(a)
		}, x.uuid = 0, x.support = {}, x.expr = {}, x.map = function(a, b) {
			var c, d, e, f = [];
			if (g(a)) for (d = 0; d < a.length; d++) c = b(a[d], d), null != c && f.push(c);
			else for (e in a) c = b(a[e], e), null != c && f.push(c);
			return i(f)
		}, x.each = function(a, b) {
			var c, d;
			if (g(a)) {
				for (c = 0; c < a.length; c++) if (b.call(a[c], c, a[c]) === !1) return a
			} else for (d in a) if (b.call(a[d], d, a[d]) === !1) return a;
			return a
		}, x.grep = function(a, b) {
			return D.call(a, b)
		}, window.JSON && (x.parseJSON = JSON.parse), x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
			U["[object " + b + "]"] = b.toLowerCase()
		}), x.fn = {
			forEach: B.forEach,
			reduce: B.reduce,
			push: B.push,
			sort: B.sort,
			indexOf: B.indexOf,
			concat: B.concat,
			map: function(a) {
				return x(x.map(this, function(b, c) {
					return a.call(b, c, b)
				}))
			},
			slice: function() {
				return x(C.apply(this, arguments))
			},
			ready: function(a) {
				return S.test(E.readyState) && E.body ? a(x) : E.addEventListener("DOMContentLoaded", function() {
					a(x)
				}, !1), this
			},
			get: function(a) {
				return a === v ? C.call(this) : this[a >= 0 ? a : a + this.length]
			},
			toArray: function() {
				return this.get()
			},
			size: function() {
				return this.length
			},
			remove: function() {
				return this.each(function() {
					null != this.parentNode && this.parentNode.removeChild(this)
				})
			},
			each: function(a) {
				return B.every.call(this, function(b, c) {
					return a.call(b, c, b) !== !1
				}), this
			},
			filter: function(a) {
				return b(a) ? this.not(this.not(a)) : x(D.call(this, function(b) {
					return W.matches(b, a)
				}))
			},
			add: function(a, b) {
				return x(A(this.concat(x(a, b))))
			},
			is: function(a) {
				return this.length > 0 && W.matches(this[0], a)
			},
			not: function(a) {
				var c = [];
				if (b(a) && a.call !== v) this.each(function(b) {
					a.call(this, b) || c.push(this)
				});
				else {
					var d = "string" == typeof a ? this.filter(a) : g(a) && b(a.item) ? C.call(a) : x(a);
					this.forEach(function(a) {
						d.indexOf(a) < 0 && c.push(a)
					})
				}
				return x(c)
			},
			has: function(a) {
				return this.filter(function() {
					return e(a) ? x.contains(this, a) : x(this).find(a).size()
				})
			},
			eq: function(a) {
				return -1 === a ? this.slice(a) : this.slice(a, +a + 1)
			},
			first: function() {
				var a = this[0];
				return a && !e(a) ? a : x(a)
			},
			last: function() {
				var a = this[this.length - 1];
				return a && !e(a) ? a : x(a)
			},
			find: function(a) {
				var b, c = this;
				return b = a ? "object" == typeof a ? x(a).filter(function() {
					var a = this;
					return B.some.call(c, function(b) {
						return x.contains(b, a)
					})
				}) : 1 == this.length ? x(W.qsa(this[0], a)) : this.map(function() {
					return W.qsa(this, a)
				}) : []
			},
			closest: function(a, b) {
				var c = this[0],
					e = !1;
				for ("object" == typeof a && (e = x(a)); c && !(e ? e.indexOf(c) >= 0 : W.matches(c, a));) c = c !== b && !d(c) && c.parentNode;
				return x(c)
			},
			parents: function(a) {
				for (var b = [], c = this; c.length > 0;) c = x.map(c, function(a) {
					return (a = a.parentNode) && !d(a) && b.indexOf(a) < 0 ? (b.push(a), a) : void 0
				});
				return p(b, a)
			},
			parent: function(a) {
				return p(A(this.pluck("parentNode")), a)
			},
			children: function(a) {
				return p(this.map(function() {
					return n(this)
				}), a)
			},
			contents: function() {
				return this.map(function() {
					return C.call(this.childNodes)
				})
			},
			siblings: function(a) {
				return p(this.map(function(a, b) {
					return D.call(n(b.parentNode), function(a) {
						return a !== b
					})
				}), a)
			},
			empty: function() {
				return this.each(function() {
					this.innerHTML = ""
				})
			},
			pluck: function(a) {
				return x.map(this, function(b) {
					return b[a]
				})
			},
			show: function() {
				return this.each(function() {
					"none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = m(this.nodeName))
				})
			},
			replaceWith: function(a) {
				return this.before(a).remove()
			},
			wrap: function(a) {
				var c = b(a);
				if (this[0] && !c) var d = x(a).get(0),
					e = d.parentNode || this.length > 1;
				return this.each(function(b) {
					x(this).wrapAll(c ? a.call(this, b) : e ? d.cloneNode(!0) : d)
				})
			},
			wrapAll: function(a) {
				if (this[0]) {
					x(this[0]).before(a = x(a));
					for (var b;
					(b = a.children()).length;) a = b.first();
					x(a).append(this)
				}
				return this
			},
			wrapInner: function(a) {
				var c = b(a);
				return this.each(function(b) {
					var d = x(this),
						e = d.contents(),
						f = c ? a.call(this, b) : a;
					e.length ? e.wrapAll(f) : d.append(f)
				})
			},
			unwrap: function() {
				return this.parent().each(function() {
					x(this).replaceWith(x(this).children())
				}), this
			},
			clone: function() {
				return this.map(function() {
					return this.cloneNode(!0)
				})
			},
			hide: function() {
				return this.css("display", "none")
			},
			toggle: function(a) {
				return this.each(function() {
					var b = x(this);
					(a === v ? "none" == b.css("display") : a) ? b.show() : b.hide()
				})
			},
			prev: function(a) {
				return x(this.pluck("previousElementSibling")).filter(a || "*")
			},
			next: function(a) {
				return x(this.pluck("nextElementSibling")).filter(a || "*")
			},
			html: function(a) {
				return 0 in arguments ? this.each(function(b) {
					var c = this.innerHTML;
					x(this).empty().append(q(this, a, b, c))
				}) : 0 in this ? this[0].innerHTML : null
			},
			text: function(a) {
				return 0 in arguments ? this.each(function(b) {
					var c = q(this, a, b, this.textContent);
					this.textContent = null == c ? "" : "" + c
				}) : 0 in this ? this[0].textContent : null
			},
			attr: function(a, b) {
				var c;
				return "string" != typeof a || 1 in arguments ? this.each(function(c) {
					if (1 === this.nodeType) if (e(a)) for (w in a) r(this, w, a[w]);
					else r(this, a, q(this, b, c, this.getAttribute(a)))
				}) : this.length && 1 === this[0].nodeType ? !(c = this[0].getAttribute(a)) && a in this[0] ? this[0][a] : c : v
			},
			removeAttr: function(a) {
				return this.each(function() {
					1 === this.nodeType && r(this, a)
				})
			},
			prop: function(a, b) {
				return a = Y[a] || a, 1 in arguments ? this.each(function(c) {
					this[a] = q(this, b, c, this[a])
				}) : this[0] && this[0][a]
			},
			data: function(a, b) {
				var c = "data-" + a.replace(M, "-$1").toLowerCase(),
					d = 1 in arguments ? this.attr(c, b) : this.attr(c);
				return null !== d ? t(d) : v
			},
			val: function(a) {
				return 0 in arguments ? this.each(function(b) {
					this.value = q(this, a, b, this.value)
				}) : this[0] && (this[0].multiple ? x(this[0]).find("option").filter(function() {
					return this.selected
				}).pluck("value") : this[0].value)
			},
			offset: function(a) {
				if (a) return this.each(function(b) {
					var c = x(this),
						d = q(this, a, b, c.offset()),
						e = c.offsetParent().offset(),
						f = {
							top: d.top - e.top,
							left: d.left - e.left
						};
					"static" == c.css("position") && (f.position = "relative"), c.css(f)
				});
				if (!this.length) return null;
				var b = this[0].getBoundingClientRect();
				return {
					left: b.left + window.pageXOffset,
					top: b.top + window.pageYOffset,
					width: Math.round(b.width),
					height: Math.round(b.height)
				}
			},
			css: function(b, c) {
				if (arguments.length < 2) {
					var d = this[0],
						e = getComputedStyle(d, "");
					if (!d) return;
					if ("string" == typeof b) return d.style[z(b)] || e.getPropertyValue(b);
					if (Z(b)) {
						var f = {};
						return x.each(Z(b) ? b : [b], function(a, b) {
							f[b] = d.style[z(b)] || e.getPropertyValue(b)
						}), f
					}
				}
				var g = "";
				if ("string" == a(b)) c || 0 === c ? g = j(b) + ":" + l(b, c) : this.each(function() {
					this.style.removeProperty(j(b))
				});
				else for (w in b) b[w] || 0 === b[w] ? g += j(w) + ":" + l(w, b[w]) + ";" : this.each(function() {
					this.style.removeProperty(j(w))
				});
				return this.each(function() {
					this.style.cssText += ";" + g
				})
			},
			index: function(a) {
				return a ? this.indexOf(x(a)[0]) : this.parent().children().indexOf(this[0])
			},
			hasClass: function(a) {
				return a ? B.some.call(this, function(a) {
					return this.test(s(a))
				}, k(a)) : !1
			},
			addClass: function(a) {
				return a ? this.each(function(b) {
					y = [];
					var c = s(this),
						d = q(this, a, b, c);
					d.split(/\s+/g).forEach(function(a) {
						x(this).hasClass(a) || y.push(a)
					}, this), y.length && s(this, c + (c ? " " : "") + y.join(" "))
				}) : this
			},
			removeClass: function(a) {
				return this.each(function(b) {
					return a === v ? s(this, "") : (y = s(this), q(this, a, b, y).split(/\s+/g).forEach(function(a) {
						y = y.replace(k(a), " ")
					}), void s(this, y.trim()))
				})
			},
			toggleClass: function(a, b) {
				return a ? this.each(function(c) {
					var d = x(this),
						e = q(this, a, c, s(this));
					e.split(/\s+/g).forEach(function(a) {
						(b === v ? !d.hasClass(a) : b) ? d.addClass(a) : d.removeClass(a)
					})
				}) : this
			},
			scrollTop: function(a) {
				if (this.length) {
					var b = "scrollTop" in this[0];
					return a === v ? b ? this[0].scrollTop : this[0].pageYOffset : this.each(b ?
					function() {
						this.scrollTop = a
					} : function() {
						this.scrollTo(this.scrollX, a)
					})
				}
			},
			scrollLeft: function(a) {
				if (this.length) {
					var b = "scrollLeft" in this[0];
					return a === v ? b ? this[0].scrollLeft : this[0].pageXOffset : this.each(b ?
					function() {
						this.scrollLeft = a
					} : function() {
						this.scrollTo(a, this.scrollY)
					})
				}
			},
			position: function() {
				if (this.length) {
					var a = this[0],
						b = this.offsetParent(),
						c = this.offset(),
						d = L.test(b[0].nodeName) ? {
							top: 0,
							left: 0
						} : b.offset();
					return c.top -= parseFloat(x(a).css("margin-top")) || 0, c.left -= parseFloat(x(a).css("margin-left")) || 0, d.top += parseFloat(x(b[0]).css("border-top-width")) || 0, d.left += parseFloat(x(b[0]).css("border-left-width")) || 0, {
						top: c.top - d.top,
						left: c.left - d.left
					}
				}
			},
			offsetParent: function() {
				return this.map(function() {
					for (var a = this.offsetParent || E.body; a && !L.test(a.nodeName) && "static" == x(a).css("position");) a = a.offsetParent;
					return a
				})
			}
		}, x.fn.detach = x.fn.remove, ["width", "height"].forEach(function(a) {
			var b = a.replace(/./, function(a) {
				return a[0].toUpperCase()
			});
			x.fn[a] = function(e) {
				var f, g = this[0];
				return e === v ? c(g) ? g["inner" + b] : d(g) ? g.documentElement["scroll" + b] : (f = this.offset()) && f[a] : this.each(function(b) {
					g = x(this), g.css(a, q(this, e, b, g[a]()))
				})
			}
		}), O.forEach(function(b, c) {
			var d = c % 2;
			x.fn[b] = function() {
				var b, e, f = x.map(arguments, function(c) {
					return b = a(c), "object" == b || "array" == b || null == c ? c : W.fragment(c)
				}),
					g = this.length > 1;
				return f.length < 1 ? this : this.each(function(a, b) {
					e = d ? b : b.parentNode, b = 0 == c ? b.nextSibling : 1 == c ? b.firstChild : 2 == c ? b : null;
					var h = x.contains(E.documentElement, e);
					f.forEach(function(a) {
						if (g) a = a.cloneNode(!0);
						else if (!e) return x(a).remove();
						e.insertBefore(a, b), h && u(a, function(a) {
							null == a.nodeName || "SCRIPT" !== a.nodeName.toUpperCase() || a.type && "text/javascript" !== a.type || a.src || window.eval.call(window, a.innerHTML)
						})
					})
				})
			}, x.fn[d ? b + "To" : "insert" + (c ? "Before" : "After")] = function(a) {
				return x(a)[b](this), this
			}
		}), W.Z.prototype = x.fn, W.uniq = A, W.deserializeValue = t, x.zepto = W, x
	}();
window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto), function(a) {
	function b(a) {
		return a._zid || (a._zid = m++)
	}
	function c(a, c, f, g) {
		if (c = d(c), c.ns) var h = e(c.ns);
		return (q[b(a)] || []).filter(function(a) {
			return !(!a || c.e && a.e != c.e || c.ns && !h.test(a.ns) || f && b(a.fn) !== b(f) || g && a.sel != g)
		})
	}
	function d(a) {
		var b = ("" + a).split(".");
		return {
			e: b[0],
			ns: b.slice(1).sort().join(" ")
		}
	}
	function e(a) {
		return new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)")
	}
	function f(a, b) {
		return a.del && !s && a.e in t || !! b
	}
	function g(a) {
		return u[a] || s && t[a] || a
	}
	function h(c, e, h, i, k, m, n) {
		var o = b(c),
			p = q[o] || (q[o] = []);
		e.split(/\s/).forEach(function(b) {
			if ("ready" == b) return a(document).ready(h);
			var e = d(b);
			e.fn = h, e.sel = k, e.e in u && (h = function(b) {
				var c = b.relatedTarget;
				return !c || c !== this && !a.contains(this, c) ? e.fn.apply(this, arguments) : void 0
			}), e.del = m;
			var o = m || h;
			e.proxy = function(a) {
				if (a = j(a), !a.isImmediatePropagationStopped()) {
					a.data = i;
					var b = o.apply(c, a._args == l ? [a] : [a].concat(a._args));
					return b === !1 && (a.preventDefault(), a.stopPropagation()), b
				}
			}, e.i = p.length, p.push(e), "addEventListener" in c && c.addEventListener(g(e.e), e.proxy, f(e, n))
		})
	}
	function i(a, d, e, h, i) {
		var j = b(a);
		(d || "").split(/\s/).forEach(function(b) {
			c(a, b, e, h).forEach(function(b) {
				delete q[j][b.i], "removeEventListener" in a && a.removeEventListener(g(b.e), b.proxy, f(b, i))
			})
		})
	}
	function j(b, c) {
		return (c || !b.isDefaultPrevented) && (c || (c = b), a.each(y, function(a, d) {
			var e = c[a];
			b[a] = function() {
				return this[d] = v, e && e.apply(c, arguments)
			}, b[d] = w
		}), (c.defaultPrevented !== l ? c.defaultPrevented : "returnValue" in c ? c.returnValue === !1 : c.getPreventDefault && c.getPreventDefault()) && (b.isDefaultPrevented = v)), b
	}
	function k(a) {
		var b, c = {
			originalEvent: a
		};
		for (b in a) x.test(b) || a[b] === l || (c[b] = a[b]);
		return j(c, a)
	}
	var l, m = 1,
		n = Array.prototype.slice,
		o = a.isFunction,
		p = function(a) {
			return "string" == typeof a
		},
		q = {},
		r = {},
		s = "onfocusin" in window,
		t = {
			focus: "focusin",
			blur: "focusout"
		},
		u = {
			mouseenter: "mouseover",
			mouseleave: "mouseout"
		};
	r.click = r.mousedown = r.mouseup = r.mousemove = "MouseEvents", a.event = {
		add: h,
		remove: i
	}, a.proxy = function(c, d) {
		var e = 2 in arguments && n.call(arguments, 2);
		if (o(c)) {
			var f = function() {
					return c.apply(d, e ? e.concat(n.call(arguments)) : arguments)
				};
			return f._zid = b(c), f
		}
		if (p(d)) return e ? (e.unshift(c[d], c), a.proxy.apply(null, e)) : a.proxy(c[d], c);
		throw new TypeError("expected function")
	}, a.fn.bind = function(a, b, c) {
		return this.on(a, b, c)
	}, a.fn.unbind = function(a, b) {
		return this.off(a, b)
	}, a.fn.one = function(a, b, c, d) {
		return this.on(a, b, c, d, 1)
	};
	var v = function() {
			return !0
		},
		w = function() {
			return !1
		},
		x = /^([A-Z]|returnValue$|layer[XY]$)/,
		y = {
			preventDefault: "isDefaultPrevented",
			stopImmediatePropagation: "isImmediatePropagationStopped",
			stopPropagation: "isPropagationStopped"
		};
	a.fn.delegate = function(a, b, c) {
		return this.on(b, a, c)
	}, a.fn.undelegate = function(a, b, c) {
		return this.off(b, a, c)
	}, a.fn.live = function(b, c) {
		return a(document.body).delegate(this.selector, b, c), this
	}, a.fn.die = function(b, c) {
		return a(document.body).undelegate(this.selector, b, c), this
	}, a.fn.on = function(b, c, d, e, f) {
		var g, j, m = this;
		return b && !p(b) ? (a.each(b, function(a, b) {
			m.on(a, c, d, b, f)
		}), m) : (p(c) || o(e) || e === !1 || (e = d, d = c, c = l), (o(d) || d === !1) && (e = d, d = l), e === !1 && (e = w), m.each(function(l, m) {
			f && (g = function(a) {
				return i(m, a.type, e), e.apply(this, arguments)
			}), c && (j = function(b) {
				var d, f = a(b.target).closest(c, m).get(0);
				return f && f !== m ? (d = a.extend(k(b), {
					currentTarget: f,
					liveFired: m
				}), (g || e).apply(f, [d].concat(n.call(arguments, 1)))) : void 0
			}), h(m, b, e, d, c, j || g)
		}))
	}, a.fn.off = function(b, c, d) {
		var e = this;
		return b && !p(b) ? (a.each(b, function(a, b) {
			e.off(a, c, b)
		}), e) : (p(c) || o(d) || d === !1 || (d = c, c = l), d === !1 && (d = w), e.each(function() {
			i(this, b, d, c)
		}))
	}, a.fn.trigger = function(b, c) {
		return b = p(b) || a.isPlainObject(b) ? a.Event(b) : j(b), b._args = c, this.each(function() {
			"dispatchEvent" in this ? this.dispatchEvent(b) : a(this).triggerHandler(b, c)
		})
	}, a.fn.triggerHandler = function(b, d) {
		var e, f;
		return this.each(function(g, h) {
			e = k(p(b) ? a.Event(b) : b), e._args = d, e.target = h, a.each(c(h, b.type || b), function(a, b) {
				return f = b.proxy(e), e.isImmediatePropagationStopped() ? !1 : void 0
			})
		}), f
	}, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(b) {
		a.fn[b] = function(a) {
			return a ? this.bind(b, a) : this.trigger(b)
		}
	}), ["focus", "blur"].forEach(function(b) {
		a.fn[b] = function(a) {
			return a ? this.bind(b, a) : this.each(function() {
				try {
					this[b]()
				} catch (a) {}
			}), this
		}
	}), a.Event = function(a, b) {
		p(a) || (b = a, a = b.type);
		var c = document.createEvent(r[a] || "Events"),
			d = !0;
		if (b) for (var e in b)"bubbles" == e ? d = !! b[e] : c[e] = b[e];
		return c.initEvent(a, d, !0), j(c)
	}
}(Zepto), function(a) {
	function b(b, c, d) {
		var e = a.Event(c);
		return a(b).trigger(e, d), !e.isDefaultPrevented()
	}
	function c(a, c, d, e) {
		return a.global ? b(c || s, d, e) : void 0
	}
	function d(b) {
		b.global && 0 === a.active++ && c(b, null, "ajaxStart")
	}
	function e(b) {
		b.global && !--a.active && c(b, null, "ajaxStop")
	}
	function f(a, b) {
		var d = b.context;
		return b.beforeSend.call(d, a, b) === !1 || c(b, d, "ajaxBeforeSend", [a, b]) === !1 ? !1 : void c(b, d, "ajaxSend", [a, b])
	}
	function g(a, b, d, e) {
		var f = d.context,
			g = "success";
		d.success.call(f, a, g, b), e && e.resolveWith(f, [a, g, b]), c(d, f, "ajaxSuccess", [b, d, a]), i(g, b, d)
	}
	function h(a, b, d, e, f) {
		var g = e.context;
		e.error.call(g, d, b, a), f && f.rejectWith(g, [d, b, a]), c(e, g, "ajaxError", [d, e, a || b]), i(b, d, e)
	}
	function i(a, b, d) {
		var f = d.context;
		d.complete.call(f, b, a), c(d, f, "ajaxComplete", [b, d]), e(d)
	}
	function j() {}
	function k(a) {
		return a && (a = a.split(";", 2)[0]), a && (a == x ? "html" : a == w ? "json" : u.test(a) ? "script" : v.test(a) && "xml") || "text"
	}
	function l(a, b) {
		return "" == b ? a : (a + "&" + b).replace(/[&?]{1,2}/, "?")
	}
	function m(b) {
		b.processData && b.data && "string" != a.type(b.data) && (b.data = a.param(b.data, b.traditional)), !b.data || b.type && "GET" != b.type.toUpperCase() || (b.url = l(b.url, b.data), b.data = void 0)
	}
	function n(b, c, d, e) {
		return a.isFunction(c) && (e = d, d = c, c = void 0), a.isFunction(d) || (e = d, d = void 0), {
			url: b,
			data: c,
			success: d,
			dataType: e
		}
	}
	function o(b, c, d, e) {
		var f, g = a.isArray(c),
			h = a.isPlainObject(c);
		a.each(c, function(c, i) {
			f = a.type(i), e && (c = d ? e : e + "[" + (h || "object" == f || "array" == f ? c : "") + "]"), !e && g ? b.add(i.name, i.value) : "array" == f || !d && "object" == f ? o(b, i, d, c) : b.add(c, i)
		})
	}
	var p, q, r = 0,
		s = window.document,
		t = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		u = /^(?:text|application)\/javascript/i,
		v = /^(?:text|application)\/xml/i,
		w = "application/json",
		x = "text/html",
		y = /^\s*$/;
	a.active = 0, a.ajaxJSONP = function(b, c) {
		if (!("type" in b)) return a.ajax(b);
		var d, e, i = b.jsonpCallback,
			j = (a.isFunction(i) ? i() : i) || "jsonp" + ++r,
			k = s.createElement("script"),
			l = window[j],
			m = function(b) {
				a(k).triggerHandler("error", b || "abort")
			},
			n = {
				abort: m
			};
		return c && c.promise(n), a(k).on("load error", function(f, i) {
			clearTimeout(e), a(k).off().remove(), "error" != f.type && d ? g(d[0], n, b, c) : h(null, i || "error", n, b, c), window[j] = l, d && a.isFunction(l) && l(d[0]), l = d = void 0
		}), f(n, b) === !1 ? (m("abort"), n) : (window[j] = function() {
			d = arguments
		}, k.src = b.url.replace(/\?(.+)=\?/, "?$1=" + j), s.head.appendChild(k), b.timeout > 0 && (e = setTimeout(function() {
			m("timeout")
		}, b.timeout)), n)
	}, a.ajaxSettings = {
		type: "GET",
		beforeSend: j,
		success: j,
		error: j,
		complete: j,
		context: null,
		global: !0,
		xhr: function() {
			return new window.XMLHttpRequest
		},
		accepts: {
			script: "text/javascript, application/javascript, application/x-javascript",
			json: w,
			xml: "application/xml, text/xml",
			html: x,
			text: "text/plain"
		},
		crossDomain: !1,
		timeout: 0,
		processData: !0,
		cache: !0
	}, a.ajax = function(b) {
		var c = a.extend({}, b || {}),
			e = a.Deferred && a.Deferred();
		for (p in a.ajaxSettings) void 0 === c[p] && (c[p] = a.ajaxSettings[p]);
		d(c), c.crossDomain || (c.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(c.url) && RegExp.$2 != window.location.host), c.url || (c.url = window.location.toString()), m(c);
		var i = c.dataType,
			n = /\?.+=\?/.test(c.url);
		if (n && (i = "jsonp"), c.cache !== !1 && (b && b.cache === !0 || "script" != i && "jsonp" != i) || (c.url = l(c.url, "_=" + Date.now())), "jsonp" == i) return n || (c.url = l(c.url, c.jsonp ? c.jsonp + "=?" : c.jsonp === !1 ? "" : "callback=?")), a.ajaxJSONP(c, e);
		var o, r = c.accepts[i],
			s = {},
			t = function(a, b) {
				s[a.toLowerCase()] = [a, b]
			},
			u = /^([\w-]+:)\/\//.test(c.url) ? RegExp.$1 : window.location.protocol,
			v = c.xhr(),
			w = v.setRequestHeader;
		if (e && e.promise(v), c.crossDomain || t("X-Requested-With", "XMLHttpRequest"), t("Accept", r || "*/*"), (r = c.mimeType || r) && (r.indexOf(",") > -1 && (r = r.split(",", 2)[0]), v.overrideMimeType && v.overrideMimeType(r)), (c.contentType || c.contentType !== !1 && c.data && "GET" != c.type.toUpperCase()) && t("Content-Type", c.contentType || "application/x-www-form-urlencoded"), c.headers) for (q in c.headers) t(q, c.headers[q]);
		if (v.setRequestHeader = t, v.onreadystatechange = function() {
			if (4 == v.readyState) {
				v.onreadystatechange = j, clearTimeout(o);
				var b, d = !1;
				if (v.status >= 200 && v.status < 300 || 304 == v.status || 0 == v.status && "file:" == u) {
					i = i || k(c.mimeType || v.getResponseHeader("content-type")), b = v.responseText;
					try {
						"script" == i ? (1, eval)(b) : "xml" == i ? b = v.responseXML : "json" == i && (b = y.test(b) ? null : a.parseJSON(b))
					} catch (f) {
						d = f
					}
					d ? h(d, "parsererror", v, c, e) : g(b, v, c, e)
				} else h(v.statusText || null, v.status ? "error" : "abort", v, c, e)
			}
		}, f(v, c) === !1) return v.abort(), h(null, "abort", v, c, e), v;
		if (c.xhrFields) for (q in c.xhrFields) v[q] = c.xhrFields[q];
		var x = "async" in c ? c.async : !0;
		v.open(c.type, c.url, x, c.username, c.password);
		for (q in s) w.apply(v, s[q]);
		return c.timeout > 0 && (o = setTimeout(function() {
			v.onreadystatechange = j, v.abort(), h(null, "timeout", v, c, e)
		}, c.timeout)), v.send(c.data ? c.data : null), v
	}, a.get = function() {
		return a.ajax(n.apply(null, arguments))
	}, a.post = function() {
		var b = n.apply(null, arguments);
		return b.type = "POST", a.ajax(b)
	}, a.getJSON = function() {
		var b = n.apply(null, arguments);
		return b.dataType = "json", a.ajax(b)
	}, a.fn.load = function(b, c, d) {
		if (!this.length) return this;
		var e, f = this,
			g = b.split(/\s/),
			h = n(b, c, d),
			i = h.success;
		return g.length > 1 && (h.url = g[0], e = g[1]), h.success = function(b) {
			f.html(e ? a("<div>").html(b.replace(t, "")).find(e) : b), i && i.apply(f, arguments)
		}, a.ajax(h), this
	};
	var z = encodeURIComponent;
	a.param = function(a, b) {
		var c = [];
		return c.add = function(a, b) {
			this.push(z(a) + "=" + z(b))
		}, o(c, a, b), c.join("&").replace(/%20/g, "+")
	}
}(Zepto), function(a) {
	a.fn.serializeArray = function() {
		var b, c = [];
		return a([].slice.call(this.get(0).elements)).each(function() {
			b = a(this);
			var d = b.attr("type");
			"fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != d && "reset" != d && "button" != d && ("radio" != d && "checkbox" != d || this.checked) && c.push({
				name: b.attr("name"),
				value: b.val()
			})
		}), c
	}, a.fn.serialize = function() {
		var a = [];
		return this.serializeArray().forEach(function(b) {
			a.push(encodeURIComponent(b.name) + "=" + encodeURIComponent(b.value))
		}), a.join("&")
	}, a.fn.submit = function(b) {
		if (b) this.bind("submit", b);
		else if (this.length) {
			var c = a.Event("submit");
			this.eq(0).trigger(c), c.isDefaultPrevented() || this.get(0).submit()
		}
		return this
	}
}(Zepto), function(a) {
	"__proto__" in {} || a.extend(a.zepto, {
		Z: function(b, c) {
			return b = b || [], a.extend(b, a.fn), b.selector = c || "", b.__Z = !0, b
		},
		isZ: function(b) {
			return "array" === a.type(b) && "__Z" in b
		}
	});
	try {
		getComputedStyle(void 0)
	} catch (b) {
		var c = getComputedStyle;
		window.getComputedStyle = function(a) {
			try {
				return c(a)
			} catch (b) {
				return null
			}
		}
	}
}(Zepto), function(a, b, c) {
	"use strict";

	function d(a, b) {
		return b = b || Error, function() {
			var c, d, e = 2,
				f = arguments,
				g = f[0],
				h = "[" + (a ? a + ":" : "") + g + "] ",
				i = f[1];
			for (h += i.replace(/\{\d+\}/g, function(a) {
				var b = +a.slice(1, -1),
					c = b + e;
				return c < f.length ? ta(f[c]) : a
			}), h += "\nhttp://errors.angularjs.org/1.4.4/" + (a ? a + "/" : "") + g, d = e, c = "?"; d < f.length; d++, c = "&") h += c + "p" + (d - e) + "=" + encodeURIComponent(ta(f[d]));
			return new b(h)
		}
	}
	function e(a) {
		if (null == a || C(a)) return !1;
		var b = "length" in Object(a) && a.length;
		return a.nodeType === Sd && b ? !0 : x(a) || Jd(a) || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
	}
	function f(a, b, c) {
		var d, g;
		if (a) if (A(a)) for (d in a)"prototype" == d || "length" == d || "name" == d || a.hasOwnProperty && !a.hasOwnProperty(d) || b.call(c, a[d], d, a);
		else if (Jd(a) || e(a)) {
			var h = "object" != typeof a;
			for (d = 0, g = a.length; g > d; d++)(h || d in a) && b.call(c, a[d], d, a)
		} else if (a.forEach && a.forEach !== f) a.forEach(b, c, a);
		else if (w(a)) for (d in a) b.call(c, a[d], d, a);
		else if ("function" == typeof a.hasOwnProperty) for (d in a) a.hasOwnProperty(d) && b.call(c, a[d], d, a);
		else for (d in a) sd.call(a, d) && b.call(c, a[d], d, a);
		return a
	}
	function g(a, b, c) {
		for (var d = Object.keys(a).sort(), e = 0; e < d.length; e++) b.call(c, a[d[e]], d[e]);
		return d
	}
	function h(a) {
		return function(b, c) {
			a(c, b)
		}
	}
	function i() {
		return ++Hd
	}
	function j(a, b) {
		b ? a.$$hashKey = b : delete a.$$hashKey
	}
	function k(a, b, c) {
		for (var d = a.$$hashKey, e = 0, f = b.length; f > e; ++e) {
			var g = b[e];
			if (v(g) || A(g)) for (var h = Object.keys(g), i = 0, l = h.length; l > i; i++) {
				var m = h[i],
					n = g[m];
				c && v(n) ? z(n) ? a[m] = new Date(n.valueOf()) : B(n) ? a[m] = new RegExp(n) : (v(a[m]) || (a[m] = Jd(n) ? [] : {}), k(a[m], [n], !0)) : a[m] = n
			}
		}
		return j(a, d), a
	}
	function l(a) {
		return k(a, Ad.call(arguments, 1), !1)
	}
	function m(a) {
		return k(a, Ad.call(arguments, 1), !0)
	}
	function n(a) {
		return parseInt(a, 10)
	}
	function o(a, b) {
		return l(Object.create(a), b)
	}
	function p() {}
	function q(a) {
		return a
	}
	function r(a) {
		return function() {
			return a
		}
	}
	function s(a) {
		return A(a.toString) && a.toString !== Object.prototype.toString
	}
	function t(a) {
		return "undefined" == typeof a
	}
	function u(a) {
		return "undefined" != typeof a
	}
	function v(a) {
		return null !== a && "object" == typeof a
	}
	function w(a) {
		return null !== a && "object" == typeof a && !Ed(a)
	}
	function x(a) {
		return "string" == typeof a
	}
	function y(a) {
		return "number" == typeof a
	}
	function z(a) {
		return "[object Date]" === Dd.call(a)
	}
	function A(a) {
		return "function" == typeof a
	}
	function B(a) {
		return "[object RegExp]" === Dd.call(a)
	}
	function C(a) {
		return a && a.window === a
	}
	function D(a) {
		return a && a.$evalAsync && a.$watch
	}
	function E(a) {
		return "[object File]" === Dd.call(a)
	}
	function F(a) {
		return "[object FormData]" === Dd.call(a)
	}
	function G(a) {
		return "[object Blob]" === Dd.call(a)
	}
	function H(a) {
		return "boolean" == typeof a
	}
	function I(a) {
		return a && A(a.then)
	}
	function J(a) {
		return Kd.test(Dd.call(a))
	}
	function K(a) {
		return !(!a || !(a.nodeName || a.prop && a.attr && a.find))
	}
	function L(a) {
		var b, c = {},
			d = a.split(",");
		for (b = 0; b < d.length; b++) c[d[b]] = !0;
		return c
	}
	function M(a) {
		return rd(a.nodeName || a[0] && a[0].nodeName)
	}
	function N(a, b) {
		var c = a.indexOf(b);
		return c >= 0 && a.splice(c, 1), c
	}
	function O(a, b, c, d) {
		if (C(a) || D(a)) throw Fd("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
		if (J(b)) throw Fd("cpta", "Can't copy! TypedArray destination cannot be mutated.");
		if (b) {
			if (a === b) throw Fd("cpi", "Can't copy! Source and destination are identical.");
			c = c || [], d = d || [], v(a) && (c.push(a), d.push(b));
			var e;
			if (Jd(a)) {
				b.length = 0;
				for (var g = 0; g < a.length; g++) b.push(O(a[g], null, c, d))
			} else {
				var h = b.$$hashKey;
				if (Jd(b) ? b.length = 0 : f(b, function(a, c) {
					delete b[c]
				}), w(a)) for (e in a) b[e] = O(a[e], null, c, d);
				else if (a && "function" == typeof a.hasOwnProperty) for (e in a) a.hasOwnProperty(e) && (b[e] = O(a[e], null, c, d));
				else for (e in a) sd.call(a, e) && (b[e] = O(a[e], null, c, d));
				j(b, h)
			}
		} else if (b = a, v(a)) {
			var i;
			if (c && -1 !== (i = c.indexOf(a))) return d[i];
			if (Jd(a)) return O(a, [], c, d);
			if (J(a)) b = new a.constructor(a);
			else if (z(a)) b = new Date(a.getTime());
			else {
				if (!B(a)) {
					var k = Object.create(Ed(a));
					return O(a, k, c, d)
				}
				b = new RegExp(a.source, a.toString().match(/[^\/]*$/)[0]), b.lastIndex = a.lastIndex
			}
			d && (c.push(a), d.push(b))
		}
		return b
	}
	function P(a, b) {
		if (Jd(a)) {
			b = b || [];
			for (var c = 0, d = a.length; d > c; c++) b[c] = a[c]
		} else if (v(a)) {
			b = b || {};
			for (var e in a)("$" !== e.charAt(0) || "$" !== e.charAt(1)) && (b[e] = a[e])
		}
		return b || a
	}
	function Q(a, b) {
		if (a === b) return !0;
		if (null === a || null === b) return !1;
		if (a !== a && b !== b) return !0;
		var d, e, f, g = typeof a,
			h = typeof b;
		if (g == h && "object" == g) {
			if (!Jd(a)) {
				if (z(a)) return z(b) ? Q(a.getTime(), b.getTime()) : !1;
				if (B(a)) return B(b) ? a.toString() == b.toString() : !1;
				if (D(a) || D(b) || C(a) || C(b) || Jd(b) || z(b) || B(b)) return !1;
				f = qa();
				for (e in a) if ("$" !== e.charAt(0) && !A(a[e])) {
					if (!Q(a[e], b[e])) return !1;
					f[e] = !0
				}
				for (e in b) if (!(e in f || "$" === e.charAt(0) || b[e] === c || A(b[e]))) return !1;
				return !0
			}
			if (!Jd(b)) return !1;
			if ((d = a.length) == b.length) {
				for (e = 0; d > e; e++) if (!Q(a[e], b[e])) return !1;
				return !0
			}
		}
		return !1
	}
	function R(a, b, c) {
		return a.concat(Ad.call(b, c))
	}
	function S(a, b) {
		return Ad.call(a, b || 0)
	}
	function T(a, b) {
		var c = arguments.length > 2 ? S(arguments, 2) : [];
		return !A(b) || b instanceof RegExp ? b : c.length ?
		function() {
			return arguments.length ? b.apply(a, R(c, arguments, 0)) : b.apply(a, c)
		} : function() {
			return arguments.length ? b.apply(a, arguments) : b.call(a)
		}
	}
	function U(a, d) {
		var e = d;
		return "string" == typeof a && "$" === a.charAt(0) && "$" === a.charAt(1) ? e = c : C(d) ? e = "$WINDOW" : d && b === d ? e = "$DOCUMENT" : D(d) && (e = "$SCOPE"), e
	}
	function V(a, b) {
		return "undefined" == typeof a ? c : (y(b) || (b = b ? 2 : null), JSON.stringify(a, U, b))
	}
	function W(a) {
		return x(a) ? JSON.parse(a) : a
	}
	function X(a, b) {
		var c = Date.parse("Jan 01, 1970 00:00:00 " + a) / 6e4;
		return isNaN(c) ? b : c
	}
	function Y(a, b) {
		return a = new Date(a.getTime()), a.setMinutes(a.getMinutes() + b), a
	}
	function Z(a, b, c) {
		c = c ? -1 : 1;
		var d = X(b, a.getTimezoneOffset());
		return Y(a, c * (d - a.getTimezoneOffset()))
	}
	function $(a) {
		a = xd(a).clone();
		try {
			a.empty()
		} catch (b) {}
		var c = xd("<div>").append(a).html();
		try {
			return a[0].nodeType === Ud ? rd(c) : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(a, b) {
				return "<" + rd(b)
			})
		} catch (b) {
			return rd(c)
		}
	}
	function _(a) {
		try {
			return decodeURIComponent(a)
		} catch (b) {}
	}
	function aa(a) {
		var b = {};
		return f((a || "").split("&"), function(a) {
			var c, d, e;
			a && (d = a = a.replace(/\+/g, "%20"), c = a.indexOf("="), -1 !== c && (d = a.substring(0, c), e = a.substring(c + 1)), d = _(d), u(d) && (e = u(e) ? _(e) : !0, sd.call(b, d) ? Jd(b[d]) ? b[d].push(e) : b[d] = [b[d], e] : b[d] = e))
		}), b
	}
	function ba(a) {
		var b = [];
		return f(a, function(a, c) {
			Jd(a) ? f(a, function(a) {
				b.push(da(c, !0) + (a === !0 ? "" : "=" + da(a, !0)))
			}) : b.push(da(c, !0) + (a === !0 ? "" : "=" + da(a, !0)))
		}), b.length ? b.join("&") : ""
	}
	function ca(a) {
		return da(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
	}
	function da(a, b) {
		return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, b ? "%20" : "+")
	}
	function ea(a, b) {
		var c, d, e = Pd.length;
		for (d = 0; e > d; ++d) if (c = Pd[d] + b, x(c = a.getAttribute(c))) return c;
		return null
	}
	function fa(a, b) {
		var c, d, e = {};
		f(Pd, function(b) {
			var e = b + "app";
			!c && a.hasAttribute && a.hasAttribute(e) && (c = a, d = a.getAttribute(e))
		}), f(Pd, function(b) {
			var e, f = b + "app";
			!c && (e = a.querySelector("[" + f.replace(":", "\\:") + "]")) && (c = e, d = e.getAttribute(f))
		}), c && (e.strictDi = null !== ea(c, "strict-di"), b(c, d ? [d] : [], e))
	}
	function ga(c, d, e) {
		v(e) || (e = {});
		var g = {
			strictDi: !1
		};
		e = l(g, e);
		var h = function() {
				if (c = xd(c), c.injector()) {
					var a = c[0] === b ? "document" : $(c);
					throw Fd("btstrpd", "App Already Bootstrapped with this Element '{0}'", a.replace(/</, "&lt;").replace(/>/, "&gt;"))
				}
				d = d || [], d.unshift(["$provide", function(a) {
					a.value("$rootElement", c)
				}]), e.debugInfoEnabled && d.push(["$compileProvider", function(a) {
					a.debugInfoEnabled(!0)
				}]), d.unshift("ng");
				var f = $a(d, e.strictDi);
				return f.invoke(["$rootScope", "$rootElement", "$compile", "$injector", function(a, b, c, d) {
					a.$apply(function() {
						b.data("$injector", d), c(b)(a)
					})
				}]), f
			},
			i = /^NG_ENABLE_DEBUG_INFO!/,
			j = /^NG_DEFER_BOOTSTRAP!/;
		return a && i.test(a.name) && (e.debugInfoEnabled = !0, a.name = a.name.replace(i, "")), a && !j.test(a.name) ? h() : (a.name = a.name.replace(j, ""), Gd.resumeBootstrap = function(a) {
			return f(a, function(a) {
				d.push(a)
			}), h()
		}, void(A(Gd.resumeDeferredBootstrap) && Gd.resumeDeferredBootstrap()))
	}
	function ha() {
		a.name = "NG_ENABLE_DEBUG_INFO!" + a.name, a.location.reload()
	}
	function ia(a) {
		var b = Gd.element(a).injector();
		if (!b) throw Fd("test", "no injector found for element argument to getTestability");
		return b.get("$$testability")
	}
	function ja(a, b) {
		return b = b || "_", a.replace(Qd, function(a, c) {
			return (c ? b : "") + a.toLowerCase()
		})
	}
	function ka() {
		var b;
		if (!Rd) {
			var d = Od();
			yd = a.jQuery, u(d) && (yd = null === d ? c : a[d]), yd && yd.fn.on ? (xd = yd, l(yd.fn, {
				scope: ke.scope,
				isolateScope: ke.isolateScope,
				controller: ke.controller,
				injector: ke.injector,
				inheritedData: ke.inheritedData
			}), b = yd.cleanData, yd.cleanData = function(a) {
				var c;
				if (Id) Id = !1;
				else for (var d, e = 0; null != (d = a[e]); e++) c = yd._data(d, "events"), c && c.$destroy && yd(d).triggerHandler("$destroy");
				b(a)
			}) : xd = Ca, Gd.element = xd, Rd = !0
		}
	}
	function la(a, b, c) {
		if (!a) throw Fd("areq", "Argument '{0}' is {1}", b || "?", c || "required");
		return a
	}
	function ma(a, b, c) {
		return c && Jd(a) && (a = a[a.length - 1]), la(A(a), b, "not a function, got " + (a && "object" == typeof a ? a.constructor.name || "Object" : typeof a)), a
	}
	function na(a, b) {
		if ("hasOwnProperty" === a) throw Fd("badname", "hasOwnProperty is not a valid {0} name", b)
	}
	function oa(a, b, c) {
		if (!b) return a;
		for (var d, e = b.split("."), f = a, g = e.length, h = 0; g > h; h++) d = e[h], a && (a = (f = a)[d]);
		return !c && A(a) ? T(f, a) : a
	}
	function pa(a) {
		var b = a[0],
			c = a[a.length - 1],
			d = [b];
		do {
			if (b = b.nextSibling, !b) break;
			d.push(b)
		} while (b !== c);
		return xd(d)
	}
	function qa() {
		return Object.create(null)
	}
	function ra(a) {
		function b(a, b, c) {
			return a[b] || (a[b] = c())
		}
		var c = d("$injector"),
			e = d("ng"),
			f = b(a, "angular", Object);
		return f.$$minErr = f.$$minErr || d, b(f, "module", function() {
			var a = {};
			return function(d, f, g) {
				var h = function(a, b) {
						if ("hasOwnProperty" === a) throw e("badname", "hasOwnProperty is not a valid {0} name", b)
					};
				return h(d, "module"), f && a.hasOwnProperty(d) && (a[d] = null), b(a, d, function() {
					function a(a, b, c, d) {
						return d || (d = e), function() {
							return d[c || "push"]([a, b, arguments]), k
						}
					}
					function b(a, b) {
						return function(c, f) {
							return f && A(f) && (f.$$moduleName = d), e.push([a, b, arguments]), k
						}
					}
					if (!f) throw c("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", d);
					var e = [],
						h = [],
						i = [],
						j = a("$injector", "invoke", "push", h),
						k = {
							_invokeQueue: e,
							_configBlocks: h,
							_runBlocks: i,
							requires: f,
							name: d,
							provider: b("$provide", "provider"),
							factory: b("$provide", "factory"),
							service: b("$provide", "service"),
							value: a("$provide", "value"),
							constant: a("$provide", "constant", "unshift"),
							decorator: b("$provide", "decorator"),
							animation: b("$animateProvider", "register"),
							filter: b("$filterProvider", "register"),
							controller: b("$controllerProvider", "register"),
							directive: b("$compileProvider", "directive"),
							config: j,
							run: function(a) {
								return i.push(a), this
							}
						};
					return g && j(g), k
				})
			}
		})
	}
	function sa(a) {
		var b = [];
		return JSON.stringify(a, function(a, c) {
			if (c = U(a, c), v(c)) {
				if (b.indexOf(c) >= 0) return "<<already seen>>";
				b.push(c)
			}
			return c
		})
	}
	function ta(a) {
		return "function" == typeof a ? a.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof a ? "undefined" : "string" != typeof a ? sa(a) : a
	}
	function ua(b) {
		l(b, {
			bootstrap: ga,
			copy: O,
			extend: l,
			merge: m,
			equals: Q,
			element: xd,
			forEach: f,
			injector: $a,
			noop: p,
			bind: T,
			toJson: V,
			fromJson: W,
			identity: q,
			isUndefined: t,
			isDefined: u,
			isString: x,
			isFunction: A,
			isObject: v,
			isNumber: y,
			isElement: K,
			isArray: Jd,
			version: Yd,
			isDate: z,
			lowercase: rd,
			uppercase: td,
			callbacks: {
				counter: 0
			},
			getTestability: ia,
			$$minErr: d,
			$$csp: Nd,
			reloadWithDebugInfo: ha
		}), (zd = ra(a))("ng", ["ngLocale"], ["$provide", function(a) {
			a.provider({
				$$sanitizeUri: oc
			}), a.provider("$compile", ib).directive({
				a: lf,
				input: Cf,
				textarea: Cf,
				form: qf,
				script: ug,
				select: xg,
				style: zg,
				option: yg,
				ngBind: Ff,
				ngBindHtml: Hf,
				ngBindTemplate: Gf,
				ngClass: Jf,
				ngClassEven: Lf,
				ngClassOdd: Kf,
				ngCloak: Mf,
				ngController: Nf,
				ngForm: rf,
				ngHide: og,
				ngIf: Qf,
				ngInclude: Rf,
				ngInit: Tf,
				ngNonBindable: fg,
				ngPluralize: jg,
				ngRepeat: kg,
				ngShow: ng,
				ngStyle: pg,
				ngSwitch: qg,
				ngSwitchWhen: rg,
				ngSwitchDefault: sg,
				ngOptions: ig,
				ngTransclude: tg,
				ngModel: cg,
				ngList: Uf,
				ngChange: If,
				pattern: Bg,
				ngPattern: Bg,
				required: Ag,
				ngRequired: Ag,
				minlength: Dg,
				ngMinlength: Dg,
				maxlength: Cg,
				ngMaxlength: Cg,
				ngValue: Ef,
				ngModelOptions: eg
			}).directive({
				ngInclude: Sf
			}).directive(mf).directive(Of), a.provider({
				$anchorScroll: _a,
				$animate: ze,
				$animateCss: Ae,
				$$animateQueue: ye,
				$$AnimateRunner: xe,
				$browser: fb,
				$cacheFactory: gb,
				$controller: nb,
				$document: ob,
				$exceptionHandler: pb,
				$filter: Cc,
				$$forceReflow: Fe,
				$interpolate: Db,
				$interval: Eb,
				$http: zb,
				$httpParamSerializer: rb,
				$httpParamSerializerJQLike: sb,
				$httpBackend: Bb,
				$location: Sb,
				$log: Tb,
				$parse: ic,
				$rootScope: nc,
				$q: jc,
				$$q: kc,
				$sce: sc,
				$sceDelegate: rc,
				$sniffer: tc,
				$templateCache: hb,
				$templateRequest: uc,
				$$testability: vc,
				$timeout: wc,
				$window: zc,
				$$rAF: mc,
				$$jqLite: Va,
				$$HashMap: oe,
				$$cookieReader: Bc
			})
		}])
	}
	function va() {
		return ++$d
	}
	function wa(a) {
		return a.replace(be, function(a, b, c, d) {
			return d ? c.toUpperCase() : c
		}).replace(ce, "Moz$1")
	}
	function xa(a) {
		return !ge.test(a)
	}
	function ya(a) {
		var b = a.nodeType;
		return b === Sd || !b || b === Wd
	}
	function za(a) {
		for (var b in Zd[a.ng339]) return !0;
		return !1
	}
	function Aa(a, b) {
		var c, d, e, g, h = b.createDocumentFragment(),
			i = [];
		if (xa(a)) i.push(b.createTextNode(a));
		else {
			for (c = c || h.appendChild(b.createElement("div")), d = (he.exec(a) || ["", ""])[1].toLowerCase(), e = je[d] || je._default, c.innerHTML = e[1] + a.replace(ie, "<$1></$2>") + e[2], g = e[0]; g--;) c = c.lastChild;
			i = R(i, c.childNodes), c = h.firstChild, c.textContent = ""
		}
		return h.textContent = "", h.innerHTML = "", f(i, function(a) {
			h.appendChild(a)
		}), h
	}
	function Ba(a, c) {
		c = c || b;
		var d;
		return (d = fe.exec(a)) ? [c.createElement(d[1])] : (d = Aa(a, c)) ? d.childNodes : []
	}
	function Ca(a) {
		if (a instanceof Ca) return a;
		var b;
		if (x(a) && (a = Ld(a), b = !0), !(this instanceof Ca)) {
			if (b && "<" != a.charAt(0)) throw ee("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
			return new Ca(a)
		}
		b ? Ma(this, Ba(a)) : Ma(this, a)
	}
	function Da(a) {
		return a.cloneNode(!0)
	}
	function Ea(a, b) {
		if (b || Ga(a), a.querySelectorAll) for (var c = a.querySelectorAll("*"), d = 0, e = c.length; e > d; d++) Ga(c[d])
	}
	function Fa(a, b, c, d) {
		if (u(d)) throw ee("offargs", "jqLite#off() does not support the `selector` argument");
		var e = Ha(a),
			g = e && e.events,
			h = e && e.handle;
		if (h) if (b) f(b.split(" "), function(b) {
			if (u(c)) {
				var d = g[b];
				if (N(d || [], c), d && d.length > 0) return
			}
			ae(a, b, h), delete g[b]
		});
		else for (b in g)"$destroy" !== b && ae(a, b, h), delete g[b]
	}
	function Ga(a, b) {
		var d = a.ng339,
			e = d && Zd[d];
		if (e) {
			if (b) return void delete e.data[b];
			e.handle && (e.events.$destroy && e.handle({}, "$destroy"), Fa(a)), delete Zd[d], a.ng339 = c
		}
	}
	function Ha(a, b) {
		var d = a.ng339,
			e = d && Zd[d];
		return b && !e && (a.ng339 = d = va(), e = Zd[d] = {
			events: {},
			data: {},
			handle: c
		}), e
	}
	function Ia(a, b, c) {
		if (ya(a)) {
			var d = u(c),
				e = !d && b && !v(b),
				f = !b,
				g = Ha(a, !e),
				h = g && g.data;
			if (d) h[b] = c;
			else {
				if (f) return h;
				if (e) return h && h[b];
				l(h, b)
			}
		}
	}
	function Ja(a, b) {
		return a.getAttribute ? (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + b + " ") > -1 : !1
	}
	function Ka(a, b) {
		b && a.setAttribute && f(b.split(" "), function(b) {
			a.setAttribute("class", Ld((" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + Ld(b) + " ", " ")))
		})
	}
	function La(a, b) {
		if (b && a.setAttribute) {
			var c = (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
			f(b.split(" "), function(a) {
				a = Ld(a), -1 === c.indexOf(" " + a + " ") && (c += a + " ")
			}), a.setAttribute("class", Ld(c))
		}
	}
	function Ma(a, b) {
		if (b) if (b.nodeType) a[a.length++] = b;
		else {
			var c = b.length;
			if ("number" == typeof c && b.window !== b) {
				if (c) for (var d = 0; c > d; d++) a[a.length++] = b[d]
			} else a[a.length++] = b
		}
	}
	function Na(a, b) {
		return Oa(a, "$" + (b || "ngController") + "Controller")
	}
	function Oa(a, b, d) {
		a.nodeType == Wd && (a = a.documentElement);
		for (var e = Jd(b) ? b : [b]; a;) {
			for (var f = 0, g = e.length; g > f; f++) if ((d = xd.data(a, e[f])) !== c) return d;
			a = a.parentNode || a.nodeType === Xd && a.host
		}
	}
	function Pa(a) {
		for (Ea(a, !0); a.firstChild;) a.removeChild(a.firstChild)
	}
	function Qa(a, b) {
		b || Ea(a);
		var c = a.parentNode;
		c && c.removeChild(a)
	}
	function Ra(b, c) {
		c = c || a, "complete" === c.document.readyState ? c.setTimeout(b) : xd(c).on("load", b)
	}
	function Sa(a, b) {
		var c = le[b.toLowerCase()];
		return c && me[M(a)] && c
	}
	function Ta(a, b) {
		var c = a.nodeName;
		return ("INPUT" === c || "TEXTAREA" === c) && ne[b]
	}
	function Ua(a, b) {
		var c = function(c, d) {
				c.isDefaultPrevented = function() {
					return c.defaultPrevented
				};
				var e = b[d || c.type],
					f = e ? e.length : 0;
				if (f) {
					if (t(c.immediatePropagationStopped)) {
						var g = c.stopImmediatePropagation;
						c.stopImmediatePropagation = function() {
							c.immediatePropagationStopped = !0, c.stopPropagation && c.stopPropagation(), g && g.call(c)
						}
					}
					c.isImmediatePropagationStopped = function() {
						return c.immediatePropagationStopped === !0
					}, f > 1 && (e = P(e));
					for (var h = 0; f > h; h++) c.isImmediatePropagationStopped() || e[h].call(a, c)
				}
			};
		return c.elem = a, c
	}
	function Va() {
		this.$get = function() {
			return l(Ca, {
				hasClass: function(a, b) {
					return a.attr && (a = a[0]), Ja(a, b)
				},
				addClass: function(a, b) {
					return a.attr && (a = a[0]), La(a, b)
				},
				removeClass: function(a, b) {
					return a.attr && (a = a[0]), Ka(a, b)
				}
			})
		}
	}
	function Wa(a, b) {
		var c = a && a.$$hashKey;
		if (c) return "function" == typeof c && (c = a.$$hashKey()), c;
		var d = typeof a;
		return c = "function" == d || "object" == d && null !== a ? a.$$hashKey = d + ":" + (b || i)() : d + ":" + a
	}
	function Xa(a, b) {
		if (b) {
			var c = 0;
			this.nextUid = function() {
				return ++c
			}
		}
		f(a, this.put, this)
	}
	function Ya(a) {
		var b = a.toString().replace(se, ""),
			c = b.match(pe);
		return c ? "function(" + (c[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn"
	}
	function Za(a, b, c) {
		var d, e, g, h;
		if ("function" == typeof a) {
			if (!(d = a.$inject)) {
				if (d = [], a.length) {
					if (b) throw x(c) && c || (c = a.name || Ya(a)), te("strictdi", "{0} is not using explicit annotation and cannot be invoked in strict mode", c);
					e = a.toString().replace(se, ""), g = e.match(pe), f(g[1].split(qe), function(a) {
						a.replace(re, function(a, b, c) {
							d.push(c)
						})
					})
				}
				a.$inject = d
			}
		} else Jd(a) ? (h = a.length - 1, ma(a[h], "fn"), d = a.slice(0, h)) : ma(a, "fn", !0);
		return d
	}
	function $a(a, b) {
		function d(a) {
			return function(b, c) {
				return v(b) ? void f(b, h(a)) : a(b, c)
			}
		}
		function e(a, b) {
			if (na(a, "service"), (A(b) || Jd(b)) && (b = y.instantiate(b)), !b.$get) throw te("pget", "Provider '{0}' must define $get factory method.", a);
			return w[a + q] = b
		}
		function g(a, b) {
			return function() {
				var c = B.invoke(b, this);
				if (t(c)) throw te("undef", "Provider '{0}' must return a value from $get factory method.", a);
				return c
			}
		}
		function i(a, b, c) {
			return e(a, {
				$get: c !== !1 ? g(a, b) : b
			})
		}
		function j(a, b) {
			return i(a, ["$injector", function(a) {
				return a.instantiate(b)
			}])
		}
		function k(a, b) {
			return i(a, r(b), !1)
		}
		function l(a, b) {
			na(a, "constant"), w[a] = b, z[a] = b
		}
		function m(a, b) {
			var c = y.get(a + q),
				d = c.$get;
			c.$get = function() {
				var a = B.invoke(d, c);
				return B.invoke(b, null, {
					$delegate: a
				})
			}
		}
		function n(a) {
			la(t(a) || Jd(a), "modulesToLoad", "not an array");
			var b, c = [];
			return f(a, function(a) {
				function d(a) {
					var b, c;
					for (b = 0, c = a.length; c > b; b++) {
						var d = a[b],
							e = y.get(d[0]);
						e[d[1]].apply(e, d[2])
					}
				}
				if (!u.get(a)) {
					u.put(a, !0);
					try {
						x(a) ? (b = zd(a), c = c.concat(n(b.requires)).concat(b._runBlocks), d(b._invokeQueue), d(b._configBlocks)) : A(a) ? c.push(y.invoke(a)) : Jd(a) ? c.push(y.invoke(a)) : ma(a, "module")
					} catch (e) {
						throw Jd(a) && (a = a[a.length - 1]), e.message && e.stack && -1 == e.stack.indexOf(e.message) && (e = e.message + "\n" + e.stack), te("modulerr", "Failed to instantiate module {0} due to:\n{1}", a, e.stack || e.message || e)
					}
				}
			}), c
		}
		function o(a, c) {
			function d(b, d) {
				if (a.hasOwnProperty(b)) {
					if (a[b] === p) throw te("cdep", "Circular dependency found: {0}", b + " <- " + s.join(" <- "));
					return a[b]
				}
				try {
					return s.unshift(b), a[b] = p, a[b] = c(b, d)
				} catch (e) {
					throw a[b] === p && delete a[b], e
				} finally {
					s.shift()
				}
			}
			function e(a, c, e, f) {
				"string" == typeof e && (f = e, e = null);
				var g, h, i, j = [],
					k = $a.$$annotate(a, b, f);
				for (h = 0, g = k.length; g > h; h++) {
					if (i = k[h], "string" != typeof i) throw te("itkn", "Incorrect injection token! Expected service name as string, got {0}", i);
					j.push(e && e.hasOwnProperty(i) ? e[i] : d(i, f))
				}
				return Jd(a) && (a = a[g]), a.apply(c, j)
			}
			function f(a, b, c) {
				var d = Object.create((Jd(a) ? a[a.length - 1] : a).prototype || null),
					f = e(a, d, b, c);
				return v(f) || A(f) ? f : d
			}
			return {
				invoke: e,
				instantiate: f,
				get: d,
				annotate: $a.$$annotate,
				has: function(b) {
					return w.hasOwnProperty(b + q) || a.hasOwnProperty(b)
				}
			}
		}
		b = b === !0;
		var p = {},
			q = "Provider",
			s = [],
			u = new Xa([], !0),
			w = {
				$provide: {
					provider: d(e),
					factory: d(i),
					service: d(j),
					value: d(k),
					constant: d(l),
					decorator: m
				}
			},
			y = w.$injector = o(w, function(a, b) {
				throw Gd.isString(b) && s.push(b), te("unpr", "Unknown provider: {0}", s.join(" <- "))
			}),
			z = {},
			B = z.$injector = o(z, function(a, b) {
				var d = y.get(a + q, b);
				return B.invoke(d.$get, d, c, a)
			});
		return f(n(a), function(a) {
			a && B.invoke(a)
		}), B
	}
	function _a() {
		var a = !0;
		this.disableAutoScrolling = function() {
			a = !1
		}, this.$get = ["$window", "$location", "$rootScope", function(b, c, d) {
			function e(a) {
				var b = null;
				return Array.prototype.some.call(a, function(a) {
					return "a" === M(a) ? (b = a, !0) : void 0
				}), b
			}
			function f() {
				var a = h.yOffset;
				if (A(a)) a = a();
				else if (K(a)) {
					var c = a[0],
						d = b.getComputedStyle(c);
					a = "fixed" !== d.position ? 0 : c.getBoundingClientRect().bottom
				} else y(a) || (a = 0);
				return a
			}
			function g(a) {
				if (a) {
					a.scrollIntoView();
					var c = f();
					if (c) {
						var d = a.getBoundingClientRect().top;
						b.scrollBy(0, d - c)
					}
				} else b.scrollTo(0, 0)
			}
			function h(a) {
				a = x(a) ? a : c.hash();
				var b;
				a ? (b = i.getElementById(a)) ? g(b) : (b = e(i.getElementsByName(a))) ? g(b) : "top" === a && g(null) : g(null)
			}
			var i = b.document;
			return a && d.$watch(function() {
				return c.hash()
			}, function(a, b) {
				(a !== b || "" !== a) && Ra(function() {
					d.$evalAsync(h)
				})
			}), h
		}]
	}
	function ab(a, b) {
		return a || b ? a ? b ? (Jd(a) && (a = a.join(" ")), Jd(b) && (b = b.join(" ")), a + " " + b) : a : b : ""
	}
	function bb(a) {
		for (var b = 0; b < a.length; b++) {
			var c = a[b];
			if (c.nodeType === ve) return c
		}
	}
	function cb(a) {
		x(a) && (a = a.split(" "));
		var b = qa();
		return f(a, function(a) {
			a.length && (b[a] = !0)
		}), b
	}
	function db(a) {
		return v(a) ? a : {}
	}
	function eb(a, b, c, d) {
		function e(a) {
			try {
				a.apply(null, S(arguments, 1))
			} finally {
				if (s--, 0 === s) for (; u.length;) try {
					u.pop()()
				} catch (b) {
					c.error(b)
				}
			}
		}
		function g(a) {
			var b = a.indexOf("#");
			return -1 === b ? "" : a.substr(b)
		}
		function h() {
			j(), k()
		}
		function i() {
			try {
				return n.state
			} catch (a) {}
		}
		function j() {
			v = i(), v = t(v) ? null : v, Q(v, C) && (v = C), C = v
		}
		function k() {
			(x !== l.url() || w !== v) && (x = l.url(), w = v, f(A, function(a) {
				a(l.url(), v)
			}))
		}
		var l = this,
			m = (b[0], a.location),
			n = a.history,
			o = a.setTimeout,
			q = a.clearTimeout,
			r = {};
		l.isMock = !1;
		var s = 0,
			u = [];
		l.$$completeOutstandingRequest = e, l.$$incOutstandingRequestCount = function() {
			s++
		}, l.notifyWhenNoOutstandingRequests = function(a) {
			0 === s ? a() : u.push(a)
		};
		var v, w, x = m.href,
			y = b.find("base"),
			z = null;
		j(), w = v, l.url = function(b, c, e) {
			if (t(e) && (e = null), m !== a.location && (m = a.location), n !== a.history && (n = a.history), b) {
				var f = w === e;
				if (x === b && (!d.history || f)) return l;
				var h = x && Jb(x) === Jb(b);
				return x = b, w = e, !d.history || h && f ? ((!h || z) && (z = b), c ? m.replace(b) : h ? m.hash = g(b) : m.href = b) : (n[c ? "replaceState" : "pushState"](e, "", b), j(), w = v), l
			}
			return z || m.href.replace(/%27/g, "'")
		}, l.state = function() {
			return v
		};
		var A = [],
			B = !1,
			C = null;
		l.onUrlChange = function(b) {
			return B || (d.history && xd(a).on("popstate", h), xd(a).on("hashchange", h), B = !0), A.push(b), b
		}, l.$$applicationDestroyed = function() {
			xd(a).off("hashchange popstate", h)
		}, l.$$checkUrlChange = k, l.baseHref = function() {
			var a = y.attr("href");
			return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
		}, l.defer = function(a, b) {
			var c;
			return s++, c = o(function() {
				delete r[c], e(a)
			}, b || 0), r[c] = !0, c
		}, l.defer.cancel = function(a) {
			return r[a] ? (delete r[a], q(a), e(p), !0) : !1
		}
	}
	function fb() {
		this.$get = ["$window", "$log", "$sniffer", "$document", function(a, b, c, d) {
			return new eb(a, d, b, c)
		}]
	}
	function gb() {
		this.$get = function() {
			function a(a, c) {
				function e(a) {
					a != m && (n ? n == a && (n = a.n) : n = a, f(a.n, a.p), f(a, m), m = a, m.n = null)
				}
				function f(a, b) {
					a != b && (a && (a.p = b), b && (b.n = a))
				}
				if (a in b) throw d("$cacheFactory")("iid", "CacheId '{0}' is already taken!", a);
				var g = 0,
					h = l({}, c, {
						id: a
					}),
					i = {},
					j = c && c.capacity || Number.MAX_VALUE,
					k = {},
					m = null,
					n = null;
				return b[a] = {
					put: function(a, b) {
						if (!t(b)) {
							if (j < Number.MAX_VALUE) {
								var c = k[a] || (k[a] = {
									key: a
								});
								e(c)
							}
							return a in i || g++, i[a] = b, g > j && this.remove(n.key), b
						}
					},
					get: function(a) {
						if (j < Number.MAX_VALUE) {
							var b = k[a];
							if (!b) return;
							e(b)
						}
						return i[a]
					},
					remove: function(a) {
						if (j < Number.MAX_VALUE) {
							var b = k[a];
							if (!b) return;
							b == m && (m = b.p), b == n && (n = b.n), f(b.n, b.p), delete k[a]
						}
						delete i[a], g--
					},
					removeAll: function() {
						i = {}, g = 0, k = {}, m = n = null
					},
					destroy: function() {
						i = null, h = null, k = null, delete b[a]
					},
					info: function() {
						return l({}, h, {
							size: g
						})
					}
				}
			}
			var b = {};
			return a.info = function() {
				var a = {};
				return f(b, function(b, c) {
					a[c] = b.info()
				}), a
			}, a.get = function(a) {
				return b[a]
			}, a
		}
	}
	function hb() {
		this.$get = ["$cacheFactory", function(a) {
			return a("templates")
		}]
	}
	function ib(a, d) {
		function e(a, b, c) {
			var d = /^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,
				e = {};
			return f(a, function(a, f) {
				var g = a.match(d);
				if (!g) throw Be("iscp", "Invalid {3} for directive '{0}'. Definition: {... {1}: '{2}' ...}", b, f, a, c ? "controller bindings definition" : "isolate scope definition");
				e[f] = {
					mode: g[1][0],
					collection: "*" === g[2],
					optional: "?" === g[3],
					attrName: g[4] || f
				}
			}), e
		}
		function g(a, b) {
			var c = {
				isolateScope: null,
				bindToController: null
			};
			if (v(a.scope) && (a.bindToController === !0 ? (c.bindToController = e(a.scope, b, !0), c.isolateScope = {}) : c.isolateScope = e(a.scope, b, !1)), v(a.bindToController) && (c.bindToController = e(a.bindToController, b, !0)), v(c.bindToController)) {
				var d = a.controller,
					f = a.controllerAs;
				if (!d) throw Be("noctrl", "Cannot bind to controller without directive '{0}'s controller.", b);
				if (!mb(d, f)) throw Be("noident", "Cannot bind to controller without identifier for directive '{0}'.", b)
			}
			return c
		}
		function i(a) {
			var b = a.charAt(0);
			if (!b || b !== rd(b)) throw Be("baddir", "Directive name '{0}' is invalid. The first character must be a lowercase letter", a);
			if (a !== a.trim()) throw Be("baddir", "Directive name '{0}' is invalid. The name should not contain leading or trailing whitespaces", a)
		}
		var j = {},
			k = "Directive",
			m = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/,
			n = /(([\w\-]+)(?:\:([^;]+))?;?)/,
			s = L("ngSrc,ngSrcset,src,srcset"),
			w = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/,
			y = /^(on[a-z]+|formaction)$/;
		this.directive = function B(b, c) {
			return na(b, "directive"), x(b) ? (i(b), la(c, "directiveFactory"), j.hasOwnProperty(b) || (j[b] = [], a.factory(b + k, ["$injector", "$exceptionHandler", function(a, c) {
				var d = [];
				return f(j[b], function(e, f) {
					try {
						var h = a.invoke(e);
						A(h) ? h = {
							compile: r(h)
						} : !h.compile && h.link && (h.compile = r(h.link)), h.priority = h.priority || 0, h.index = f, h.name = h.name || b, h.require = h.require || h.controller && h.name, h.restrict = h.restrict || "EA";
						var i = h.$$bindings = g(h, h.name);
						v(i.isolateScope) && (h.$$isolateBindings = i.isolateScope), h.$$moduleName = e.$$moduleName, d.push(h)
					} catch (j) {
						c(j)
					}
				}), d
			}])), j[b].push(c)) : f(b, h(B)), this
		}, this.aHrefSanitizationWhitelist = function(a) {
			return u(a) ? (d.aHrefSanitizationWhitelist(a), this) : d.aHrefSanitizationWhitelist()
		}, this.imgSrcSanitizationWhitelist = function(a) {
			return u(a) ? (d.imgSrcSanitizationWhitelist(a), this) : d.imgSrcSanitizationWhitelist()
		};
		var z = !0;
		this.debugInfoEnabled = function(a) {
			return u(a) ? (z = a, this) : z
		}, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function(a, d, e, g, h, i, r, u, B, C, E) {
			function F(a, b) {
				try {
					a.addClass(b)
				} catch (c) {}
			}
			function G(a, b, c, d, e) {
				a instanceof xd || (a = xd(a)), f(a, function(b, c) {
					b.nodeType == Ud && b.nodeValue.match(/\S+/) && (a[c] = xd(b).wrap("<span></span>").parent()[0])
				});
				var g = I(a, b, a, c, d, e);
				G.$$addScopeClass(a);
				var h = null;
				return function(b, c, d) {
					la(b, "scope"), d = d || {};
					var e = d.parentBoundTranscludeFn,
						f = d.transcludeControllers,
						i = d.futureParentElement;
					e && e.$$boundTransclude && (e = e.$$boundTransclude), h || (h = H(i));
					var j;
					if (j = "html" !== h ? xd(_(h, xd("<div>").append(a).html())) : c ? ke.clone.call(a) : a, f) for (var k in f) j.data("$" + k + "Controller", f[k].instance);
					return G.$$addScopeInfo(j, b), c && c(j, b), g && g(b, j, j, e), j
				}
			}
			function H(a) {
				var b = a && a[0];
				return b && "foreignobject" !== M(b) && b.toString().match(/SVG/) ? "svg" : "html"
			}
			function I(a, b, d, e, f, g) {
				function h(a, d, e, f) {
					var g, h, i, j, k, l, m, n, q;
					if (o) {
						var r = d.length;
						for (q = new Array(r), k = 0; k < p.length; k += 3) m = p[k], q[m] = d[m]
					} else q = d;
					for (k = 0, l = p.length; l > k;) if (i = q[p[k++]], g = p[k++], h = p[k++], g) {
						if (g.scope) {
							j = a.$new(), G.$$addScopeInfo(xd(i), j);
							var s = g.$$destroyBindings;
							s && (g.$$destroyBindings = null, j.$on("$destroyed", s))
						} else j = a;
						n = g.transcludeOnThisElement ? J(a, g.transclude, f) : !g.templateOnThisElement && f ? f : !f && b ? J(a, b) : null, g(h, j, i, e, n, g)
					} else h && h(a, i.childNodes, c, f)
				}
				for (var i, j, k, l, m, n, o, p = [], q = 0; q < a.length; q++) i = new ga, j = K(a[q], [], i, 0 === q ? e : c, f), k = j.length ? P(j, a[q], i, b, d, null, [], [], g) : null, k && k.scope && G.$$addScopeClass(i.$$element), m = k && k.terminal || !(l = a[q].childNodes) || !l.length ? null : I(l, k ? (k.transcludeOnThisElement || !k.templateOnThisElement) && k.transclude : b), (k || m) && (p.push(q, k, m), n = !0, o = o || k), g = null;
				return n ? h : null
			}
			function J(a, b, c) {
				var d = function(d, e, f, g, h) {
						return d || (d = a.$new(!1, h), d.$$transcluded = !0), b(d, e, {
							parentBoundTranscludeFn: c,
							transcludeControllers: f,
							futureParentElement: g
						})
					};
				return d
			}
			function K(a, b, c, d, e) {
				var f, g, h = a.nodeType,
					i = c.$attr;
				switch (h) {
				case Sd:
					T(b, jb(M(a)), "E", d, e);
					for (var j, k, l, o, p, q, r = a.attributes, s = 0, t = r && r.length; t > s; s++) {
						var u = !1,
							w = !1;
						j = r[s], k = j.name, p = Ld(j.value), o = jb(k), (q = ma.test(o)) && (k = k.replace(Ce, "").substr(8).replace(/_(.)/g, function(a, b) {
							return b.toUpperCase()
						}));
						var y = o.replace(/(Start|End)$/, "");
						U(y) && o === y + "Start" && (u = k, w = k.substr(0, k.length - 5) + "end", k = k.substr(0, k.length - 6)), l = jb(k.toLowerCase()), i[l] = k, (q || !c.hasOwnProperty(l)) && (c[l] = p, Sa(a, l) && (c[l] = !0)), ba(a, b, p, l, q), T(b, l, "A", d, e, u, w)
					}
					if (g = a.className, v(g) && (g = g.animVal), x(g) && "" !== g) for (; f = n.exec(g);) l = jb(f[2]), T(b, l, "C", d, e) && (c[l] = Ld(f[3])), g = g.substr(f.index + f[0].length);
					break;
				case Ud:
					if (11 === wd) for (; a.parentNode && a.nextSibling && a.nextSibling.nodeType === Ud;) a.nodeValue = a.nodeValue + a.nextSibling.nodeValue, a.parentNode.removeChild(a.nextSibling);
					Z(b, a.nodeValue);
					break;
				case Vd:
					try {
						f = m.exec(a.nodeValue), f && (l = jb(f[1]), T(b, l, "M", d, e) && (c[l] = Ld(f[2])))
					} catch (z) {}
				}
				return b.sort(X), b
			}
			function L(a, b, c) {
				var d = [],
					e = 0;
				if (b && a.hasAttribute && a.hasAttribute(b)) {
					do {
						if (!a) throw Be("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", b, c);
						a.nodeType == Sd && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--), d.push(a), a = a.nextSibling
					} while (e > 0)
				} else d.push(a);
				return xd(d)
			}
			function O(a, b, c) {
				return function(d, e, f, g, h) {
					return e = L(e[0], b, c), a(d, e, f, g, h)
				}
			}
			function P(a, d, f, g, h, j, k, l, m) {
				function n(a, b, c, d) {
					a && (c && (a = O(a, c, d)), a.require = r.require, a.directiveName = s, (E === r || r.$$isolateScope) && (a = da(a, {
						isolateScope: !0
					})), k.push(a)), b && (c && (b = O(b, c, d)), b.require = r.require, b.directiveName = s, (E === r || r.$$isolateScope) && (b = da(b, {
						isolateScope: !0
					})), l.push(b))
				}
				function o(a, b, c, d) {
					var e;
					if (x(b)) {
						var f = b.match(w),
							g = b.substring(f[0].length),
							h = f[1] || f[3],
							i = "?" === f[2];
						if ("^^" === h ? c = c.parent() : (e = d && d[g], e = e && e.instance), !e) {
							var j = "$" + g + "Controller";
							e = h ? c.inheritedData(j) : c.data(j)
						}
						if (!e && !i) throw Be("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", g, a)
					} else if (Jd(b)) {
						e = [];
						for (var k = 0, l = b.length; l > k; k++) e[k] = o(a, b[k], c, d)
					}
					return e || null
				}
				function p(a, b, c, d, e, f) {
					var g = qa();
					for (var h in d) {
						var j = d[h],
							k = {
								$scope: j === E || j.$$isolateScope ? e : f,
								$element: a,
								$attrs: b,
								$transclude: c
							},
							l = j.controller;
						"@" == l && (l = b[j.name]);
						var m = i(l, k, !0, j.controllerAs);
						g[j.name] = m, M || a.data("$" + j.name + "Controller", m.instance)
					}
					return g
				}
				function q(a, b, e, g, h, i) {
					function j(a, b, d) {
						var e;
						return D(a) || (d = b, b = a, a = c), M && (e = t), d || (d = M ? v.parent() : v), h(a, b, e, d, H)
					}
					var m, n, q, r, s, t, u, v, w;
					if (d === e ? (w = f, v = f.$$element) : (v = xd(e), w = new ga(v, f)), E && (s = b.$new(!0)), h && (u = j, u.$$boundTransclude = h), C && (t = p(v, w, u, C, s, b)), E && (G.$$addScopeInfo(v, s, !0, !(F && (F === E || F === E.$$originalDirective))), G.$$addScopeClass(v, !0), s.$$isolateBindings = E.$$isolateBindings, fa(b, w, s, s.$$isolateBindings, E, s)), t) {
						var x, y, z = E || B;
						z && t[z.name] && (x = z.$$bindings.bindToController, r = t[z.name], r && r.identifier && x && (y = r, i.$$destroyBindings = fa(b, w, r.instance, x, z)));
						for (m in t) {
							r = t[m];
							var A = r();
							A !== r.instance && (r.instance = A, v.data("$" + m + "Controller", A), r === y && (i.$$destroyBindings(), i.$$destroyBindings = fa(b, w, A, x, z)))
						}
					}
					for (m = 0, n = k.length; n > m; m++) q = k[m], ea(q, q.isolateScope ? s : b, v, w, q.require && o(q.directiveName, q.require, v, t), u);
					var H = b;
					for (E && (E.template || null === E.templateUrl) && (H = s), a && a(H, e.childNodes, c, h), m = l.length - 1; m >= 0; m--) q = l[m], ea(q, q.isolateScope ? s : b, v, w, q.require && o(q.directiveName, q.require, v, t), u)
				}
				m = m || {};
				for (var r, s, t, u, y, z = -Number.MAX_VALUE, B = m.newScopeDirective, C = m.controllerDirectives, E = m.newIsolateScopeDirective, F = m.templateDirective, H = m.nonTlbTranscludeDirective, I = !1, J = !1, M = m.hasElementTranscludeDirective, N = f.$$element = xd(d), P = j, Q = g, T = 0, U = a.length; U > T; T++) {
					r = a[T];
					var X = r.$$start,
						Z = r.$$end;
					if (X && (N = L(d, X, Z)), t = c, z > r.priority) break;
					if ((y = r.scope) && (r.templateUrl || (v(y) ? (Y("new/isolated scope", E || B, r, N), E = r) : Y("new/isolated scope", E, r, N)), B = B || r), s = r.name, !r.templateUrl && r.controller && (y = r.controller, C = C || qa(), Y("'" + s + "' controller", C[s], r, N), C[s] = r), (y = r.transclude) && (I = !0, r.$$tlb || (Y("transclusion", H, r, N), H = r), "element" == y ? (M = !0, z = r.priority, t = N, N = f.$$element = xd(b.createComment(" " + s + ": " + f[s] + " ")), d = N[0], ca(h, S(t), d), Q = G(t, g, z, P && P.name, {
						nonTlbTranscludeDirective: H
					})) : (t = xd(Da(d)).contents(), N.empty(), Q = G(t, g))), r.template) if (J = !0, Y("template", F, r, N), F = r, y = A(r.template) ? r.template(N, f) : r.template, y = ka(y), r.replace) {
						if (P = r, t = xa(y) ? [] : lb(_(r.templateNamespace, Ld(y))), d = t[0], 1 != t.length || d.nodeType !== Sd) throw Be("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", s, "");
						ca(h, N, d);
						var aa = {
							$attr: {}
						},
							ba = K(d, [], aa),
							ha = a.splice(T + 1, a.length - (T + 1));
						E && R(ba), a = a.concat(ba).concat(ha), V(f, aa), U = a.length
					} else N.html(y);
					if (r.templateUrl) J = !0, Y("template", F, r, N), F = r, r.replace && (P = r), q = W(a.splice(T, a.length - T), N, f, h, I && Q, k, l, {
						controllerDirectives: C,
						newScopeDirective: B !== r && B,
						newIsolateScopeDirective: E,
						templateDirective: F,
						nonTlbTranscludeDirective: H
					}), U = a.length;
					else if (r.compile) try {
						u = r.compile(N, f, Q), A(u) ? n(null, u, X, Z) : u && n(u.pre, u.post, X, Z)
					} catch (ia) {
						e(ia, $(N))
					}
					r.terminal && (q.terminal = !0, z = Math.max(z, r.priority))
				}
				return q.scope = B && B.scope === !0, q.transcludeOnThisElement = I, q.templateOnThisElement = J, q.transclude = Q, m.hasElementTranscludeDirective = M, q
			}
			function R(a) {
				for (var b = 0, c = a.length; c > b; b++) a[b] = o(a[b], {
					$$isolateScope: !0
				})
			}
			function T(b, d, f, g, h, i, l) {
				if (d === h) return null;
				var m = null;
				if (j.hasOwnProperty(d)) for (var n, p = a.get(d + k), q = 0, r = p.length; r > q; q++) try {
					n = p[q], (g === c || g > n.priority) && -1 != n.restrict.indexOf(f) && (i && (n = o(n, {
						$$start: i,
						$$end: l
					})), b.push(n), m = n)
				} catch (s) {
					e(s)
				}
				return m
			}
			function U(b) {
				if (j.hasOwnProperty(b)) for (var c, d = a.get(b + k), e = 0, f = d.length; f > e; e++) if (c = d[e], c.multiElement) return !0;
				return !1
			}
			function V(a, b) {
				var c = b.$attr,
					d = a.$attr,
					e = a.$$element;
				f(a, function(d, e) {
					"$" != e.charAt(0) && (b[e] && b[e] !== d && (d += ("style" === e ? ";" : " ") + b[e]), a.$set(e, d, !0, c[e]))
				}), f(b, function(b, f) {
					"class" == f ? (F(e, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b), a.style = (a.style ? a.style + ";" : "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, d[f] = c[f])
				})
			}
			function W(a, b, c, d, e, h, i, j) {
				var k, l, m = [],
					n = b[0],
					p = a.shift(),
					q = o(p, {
						templateUrl: null,
						transclude: null,
						replace: null,
						$$originalDirective: p
					}),
					r = A(p.templateUrl) ? p.templateUrl(b, c) : p.templateUrl,
					s = p.templateNamespace;
				return b.empty(), g(r).then(function(g) {
					var o, t, u, w;
					if (g = ka(g), p.replace) {
						if (u = xa(g) ? [] : lb(_(s, Ld(g))), o = u[0], 1 != u.length || o.nodeType !== Sd) throw Be("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", p.name, r);
						t = {
							$attr: {}
						}, ca(d, b, o);
						var x = K(o, [], t);
						v(p.scope) && R(x), a = x.concat(a), V(c, t)
					} else o = n, b.html(g);
					for (a.unshift(q), k = P(a, o, c, e, b, p, h, i, j), f(d, function(a, c) {
						a == o && (d[c] = b[0])
					}), l = I(b[0].childNodes, e); m.length;) {
						var y = m.shift(),
							z = m.shift(),
							A = m.shift(),
							B = m.shift(),
							C = b[0];
						if (!y.$$destroyed) {
							if (z !== n) {
								var D = z.className;
								j.hasElementTranscludeDirective && p.replace || (C = Da(o)), ca(A, xd(z), C), F(xd(C), D)
							}
							w = k.transcludeOnThisElement ? J(y, k.transclude, B) : B, k(l, y, C, d, w, k)
						}
					}
					m = null
				}), function(a, b, c, d, e) {
					var f = e;
					b.$$destroyed || (m ? m.push(b, c, d, f) : (k.transcludeOnThisElement && (f = J(b, k.transclude, e)), k(l, b, c, d, f, k)))
				}
			}
			function X(a, b) {
				var c = b.priority - a.priority;
				return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index
			}
			function Y(a, b, c, d) {
				function e(a) {
					return a ? " (module: " + a + ")" : ""
				}
				if (b) throw Be("multidir", "Multiple directives [{0}{1}, {2}{3}] asking for {4} on: {5}", b.name, e(b.$$moduleName), c.name, e(c.$$moduleName), a, $(d))
			}
			function Z(a, b) {
				var c = d(b, !0);
				c && a.push({
					priority: 0,
					compile: function(a) {
						var b = a.parent(),
							d = !! b.length;
						return d && G.$$addBindingClass(b), function(a, b) {
							var e = b.parent();
							d || G.$$addBindingClass(e), G.$$addBindingInfo(e, c.expressions), a.$watch(c, function(a) {
								b[0].nodeValue = a
							})
						}
					}
				})
			}
			function _(a, c) {
				switch (a = rd(a || "html")) {
				case "svg":
				case "math":
					var d = b.createElement("div");
					return d.innerHTML = "<" + a + ">" + c + "</" + a + ">", d.childNodes[0].childNodes;
				default:
					return c
				}
			}
			function aa(a, b) {
				if ("srcdoc" == b) return B.HTML;
				var c = M(a);
				return "xlinkHref" == b || "form" == c && "action" == b || "img" != c && ("src" == b || "ngSrc" == b) ? B.RESOURCE_URL : void 0
			}
			function ba(a, b, c, e, f) {
				var g = aa(a, e);
				f = s[e] || f;
				var h = d(c, !0, g, f);
				if (h) {
					if ("multiple" === e && "select" === M(a)) throw Be("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", $(a));
					b.push({
						priority: 100,
						compile: function() {
							return {
								pre: function(a, b, i) {
									var j = i.$$observers || (i.$$observers = {});
									if (y.test(e)) throw Be("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
									var k = i[e];
									k !== c && (h = k && d(k, !0, g, f), c = k), h && (i[e] = h(a), (j[e] || (j[e] = [])).$$inter = !0, (i.$$observers && i.$$observers[e].$$scope || a).$watch(h, function(a, b) {
										"class" === e && a != b ? i.$updateClass(a, b) : i.$set(e, a)
									}))
								}
							}
						}
					})
				}
			}
			function ca(a, c, d) {
				var e, f, g = c[0],
					h = c.length,
					i = g.parentNode;
				if (a) for (e = 0, f = a.length; f > e; e++) if (a[e] == g) {
					a[e++] = d;
					for (var j = e, k = j + h - 1, l = a.length; l > j; j++, k++) l > k ? a[j] = a[k] : delete a[j];
					a.length -= h - 1, a.context === g && (a.context = d);
					break
				}
				i && i.replaceChild(d, g);
				var m = b.createDocumentFragment();
				m.appendChild(g), xd.hasData(g) && (xd(d).data(xd(g).data()), yd ? (Id = !0, yd.cleanData([g])) : delete xd.cache[g[xd.expando]]);
				for (var n = 1, o = c.length; o > n; n++) {
					var p = c[n];
					xd(p).remove(), m.appendChild(p), delete c[n]
				}
				c[0] = d, c.length = 1
			}
			function da(a, b) {
				return l(function() {
					return a.apply(null, arguments)
				}, a, b)
			}
			function ea(a, b, c, d, f, g) {
				try {
					a(b, c, d, f, g)
				} catch (h) {
					e(h, $(c))
				}
			}
			function fa(a, b, c, e, g, i) {
				var j;
				f(e, function(e, f) {
					var i, k, l, m, n = e.attrName,
						o = e.optional,
						q = e.mode;
					switch (q) {
					case "@":
						o || sd.call(b, n) || (c[f] = b[n] = void 0), b.$observe(n, function(a) {
							x(a) && (c[f] = a)
						}), b.$$observers[n].$$scope = a, x(b[n]) && (c[f] = d(b[n])(a));
						break;
					case "=":
						if (!sd.call(b, n)) {
							if (o) break;
							b[n] = void 0
						}
						if (o && !b[n]) break;
						k = h(b[n]), m = k.literal ? Q : function(a, b) {
							return a === b || a !== a && b !== b
						}, l = k.assign ||
						function() {
							throw i = c[f] = k(a), Be("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", b[n], g.name)
						}, i = c[f] = k(a);
						var r = function(b) {
								return m(b, c[f]) || (m(b, i) ? l(a, b = c[f]) : c[f] = b), i = b
							};
						r.$stateful = !0;
						var s;
						s = e.collection ? a.$watchCollection(b[n], r) : a.$watch(h(b[n], r), null, k.literal), j = j || [], j.push(s);
						break;
					case "&":
						if (k = b.hasOwnProperty(n) ? h(b[n]) : p, k === p && o) break;
						c[f] = function(b) {
							return k(a, b)
						}
					}
				});
				var k = j ?
				function() {
					for (var a = 0, b = j.length; b > a; ++a) j[a]()
				} : p;
				return i && k !== p ? (i.$on("$destroy", k), p) : k
			}
			var ga = function(a, b) {
					if (b) {
						var c, d, e, f = Object.keys(b);
						for (c = 0, d = f.length; d > c; c++) e = f[c], this[e] = b[e]
					} else this.$attr = {};
					this.$$element = a
				};
			ga.prototype = {
				$normalize: jb,
				$addClass: function(a) {
					a && a.length > 0 && C.addClass(this.$$element, a)
				},
				$removeClass: function(a) {
					a && a.length > 0 && C.removeClass(this.$$element, a)
				},
				$updateClass: function(a, b) {
					var c = kb(a, b);
					c && c.length && C.addClass(this.$$element, c);
					var d = kb(b, a);
					d && d.length && C.removeClass(this.$$element, d)
				},
				$set: function(a, b, d, g) {
					var h, i = this.$$element[0],
						j = Sa(i, a),
						k = Ta(i, a),
						l = a;
					if (j ? (this.$$element.prop(a, b), g = j) : k && (this[k] = b, l = k), this[a] = b, g ? this.$attr[a] = g : (g = this.$attr[a], g || (this.$attr[a] = g = ja(a, "-"))), h = M(this.$$element), "a" === h && "href" === a || "img" === h && "src" === a) this[a] = b = E(b, "src" === a);
					else if ("img" === h && "srcset" === a) {
						for (var m = "", n = Ld(b), o = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, p = /\s/.test(n) ? o : /(,)/, q = n.split(p), r = Math.floor(q.length / 2), s = 0; r > s; s++) {
							var t = 2 * s;
							m += E(Ld(q[t]), !0), m += " " + Ld(q[t + 1])
						}
						var u = Ld(q[2 * s]).split(/\s/);
						m += E(Ld(u[0]), !0), 2 === u.length && (m += " " + Ld(u[1])), this[a] = b = m
					}
					d !== !1 && (null === b || b === c ? this.$$element.removeAttr(g) : this.$$element.attr(g, b));
					var v = this.$$observers;
					v && f(v[l], function(a) {
						try {
							a(b)
						} catch (c) {
							e(c)
						}
					})
				},
				$observe: function(a, b) {
					var c = this,
						d = c.$$observers || (c.$$observers = qa()),
						e = d[a] || (d[a] = []);
					return e.push(b), r.$evalAsync(function() {
						e.$$inter || !c.hasOwnProperty(a) || t(c[a]) || b(c[a])
					}), function() {
						N(e, b)
					}
				}
			};
			var ha = d.startSymbol(),
				ia = d.endSymbol(),
				ka = "{{" == ha || "}}" == ia ? q : function(a) {
					return a.replace(/\{\{/g, ha).replace(/}}/g, ia)
				},
				ma = /^ngAttr[A-Z]/;
			return G.$$addBindingInfo = z ?
			function(a, b) {
				var c = a.data("$binding") || [];
				Jd(b) ? c = c.concat(b) : c.push(b), a.data("$binding", c)
			} : p, G.$$addBindingClass = z ?
			function(a) {
				F(a, "ng-binding")
			} : p, G.$$addScopeInfo = z ?
			function(a, b, c, d) {
				var e = c ? d ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope";
				a.data(e, b)
			} : p, G.$$addScopeClass = z ?
			function(a, b) {
				F(a, b ? "ng-isolate-scope" : "ng-scope")
			} : p, G
		}]
	}
	function jb(a) {
		return wa(a.replace(Ce, ""))
	}
	function kb(a, b) {
		var c = "",
			d = a.split(/\s+/),
			e = b.split(/\s+/);
		a: for (var f = 0; f < d.length; f++) {
			for (var g = d[f], h = 0; h < e.length; h++) if (g == e[h]) continue a;
			c += (c.length > 0 ? " " : "") + g
		}
		return c
	}
	function lb(a) {
		a = xd(a);
		var b = a.length;
		if (1 >= b) return a;
		for (; b--;) {
			var c = a[b];
			c.nodeType === Vd && Bd.call(a, b, 1)
		}
		return a
	}
	function mb(a, b) {
		if (b && x(b)) return b;
		if (x(a)) {
			var c = Ee.exec(a);
			if (c) return c[3]
		}
	}
	function nb() {
		var a = {},
			b = !1;
		this.register = function(b, c) {
			na(b, "controller"), v(b) ? l(a, b) : a[b] = c
		}, this.allowGlobals = function() {
			b = !0
		}, this.$get = ["$injector", "$window", function(e, f) {
			function g(a, b, c, e) {
				if (!a || !v(a.$scope)) throw d("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", e, b);
				a.$scope[b] = c
			}
			return function(d, h, i, j) {
				var k, m, n, o;
				if (i = i === !0, j && x(j) && (o = j), x(d)) {
					if (m = d.match(Ee), !m) throw De("ctrlfmt", "Badly formed controller string '{0}'. Must match `__name__ as __id__` or `__name__`.", d);
					n = m[1], o = o || m[3], d = a.hasOwnProperty(n) ? a[n] : oa(h.$scope, n, !0) || (b ? oa(f, n, !0) : c), ma(d, n, !0)
				}
				if (i) {
					var p = (Jd(d) ? d[d.length - 1] : d).prototype;
					k = Object.create(p || null), o && g(h, o, k, n || d.name);
					var q;
					return q = l(function() {
						var a = e.invoke(d, k, h, n);
						return a !== k && (v(a) || A(a)) && (k = a, o && g(h, o, k, n || d.name)), k
					}, {
						instance: k,
						identifier: o
					})
				}
				return k = e.instantiate(d, h, n), o && g(h, o, k, n || d.name), k
			}
		}]
	}
	function ob() {
		this.$get = ["$window", function(a) {
			return xd(a.document)
		}]
	}
	function pb() {
		this.$get = ["$log", function(a) {
			return function(b, c) {
				a.error.apply(a, arguments)
			}
		}]
	}
	function qb(a) {
		return v(a) ? z(a) ? a.toISOString() : V(a) : a
	}
	function rb() {
		this.$get = function() {
			return function(a) {
				if (!a) return "";
				var b = [];
				return g(a, function(a, c) {
					null === a || t(a) || (Jd(a) ? f(a, function(a, d) {
						b.push(da(c) + "=" + da(qb(a)))
					}) : b.push(da(c) + "=" + da(qb(a))))
				}), b.join("&")
			}
		}
	}
	function sb() {
		this.$get = function() {
			return function(a) {
				function b(a, d, e) {
					null === a || t(a) || (Jd(a) ? f(a, function(a, c) {
						b(a, d + "[" + (v(a) ? c : "") + "]")
					}) : v(a) && !z(a) ? g(a, function(a, c) {
						b(a, d + (e ? "" : "[") + c + (e ? "" : "]"))
					}) : c.push(da(d) + "=" + da(qb(a))))
				}
				if (!a) return "";
				var c = [];
				return b(a, "", !0), c.join("&")
			}
		}
	}
	function tb(a, b) {
		if (x(a)) {
			var c = a.replace(Ke, "").trim();
			if (c) {
				var d = b("Content-Type");
				(d && 0 === d.indexOf(Ge) || ub(c)) && (a = W(c))
			}
		}
		return a
	}
	function ub(a) {
		var b = a.match(Ie);
		return b && Je[b[0]].test(a)
	}
	function vb(a) {
		function b(a, b) {
			a && (d[a] = d[a] ? d[a] + ", " + b : b)
		}
		var c, d = qa();
		return x(a) ? f(a.split("\n"), function(a) {
			c = a.indexOf(":"), b(rd(Ld(a.substr(0, c))), Ld(a.substr(c + 1)))
		}) : v(a) && f(a, function(a, c) {
			b(rd(c), Ld(a))
		}), d
	}
	function wb(a) {
		var b;
		return function(c) {
			if (b || (b = vb(a)), c) {
				var d = b[rd(c)];
				return void 0 === d && (d = null), d
			}
			return b
		}
	}
	function xb(a, b, c, d) {
		return A(d) ? d(a, b, c) : (f(d, function(d) {
			a = d(a, b, c)
		}), a)
	}
	function yb(a) {
		return a >= 200 && 300 > a
	}
	function zb() {
		var a = this.defaults = {
			transformResponse: [tb],
			transformRequest: [function(a) {
				return !v(a) || E(a) || G(a) || F(a) ? a : V(a)
			}],
			headers: {
				common: {
					Accept: "application/json, text/plain, */*"
				},
				post: P(He),
				put: P(He),
				patch: P(He)
			},
			xsrfCookieName: "XSRF-TOKEN",
			xsrfHeaderName: "X-XSRF-TOKEN",
			paramSerializer: "$httpParamSerializer"
		},
			b = !1;
		this.useApplyAsync = function(a) {
			return u(a) ? (b = !! a, this) : b
		};
		var e = !0;
		this.useLegacyPromiseExtensions = function(a) {
			return u(a) ? (e = !! a, this) : e
		};
		var g = this.interceptors = [];
		this.$get = ["$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", function(h, i, j, k, m, n) {
			function o(b) {
				function g(a) {
					var b = l({}, a);
					return a.data ? b.data = xb(a.data, a.headers, a.status, j.transformResponse) : b.data = a.data, yb(a.status) ? b : m.reject(b)
				}
				function h(a, b) {
					var c, d = {};
					return f(a, function(a, e) {
						A(a) ? (c = a(b), null != c && (d[e] = c)) : d[e] = a
					}), d
				}
				function i(b) {
					var c, d, e, f = a.headers,
						g = l({}, b.headers);
					f = l({}, f.common, f[rd(b.method)]);
					a: for (c in f) {
						d = rd(c);
						for (e in g) if (rd(e) === d) continue a;
						g[c] = f[c]
					}
					return h(g, P(b))
				}
				if (!Gd.isObject(b)) throw d("$http")("badreq", "Http request configuration must be an object.  Received: {0}", b);
				var j = l({
					method: "get",
					transformRequest: a.transformRequest,
					transformResponse: a.transformResponse,
					paramSerializer: a.paramSerializer
				}, b);
				j.headers = i(b), j.method = td(j.method), j.paramSerializer = x(j.paramSerializer) ? n.get(j.paramSerializer) : j.paramSerializer;
				var k = function(b) {
						var d = b.headers,
							e = xb(b.data, wb(d), c, b.transformRequest);
						return t(e) && f(d, function(a, b) {
							"content-type" === rd(b) && delete d[b]
						}), t(b.withCredentials) && !t(a.withCredentials) && (b.withCredentials = a.withCredentials), r(b, e).then(g, g)
					},
					o = [k, c],
					p = m.when(j);
				for (f(y, function(a) {
					(a.request || a.requestError) && o.unshift(a.request, a.requestError), (a.response || a.responseError) && o.push(a.response, a.responseError)
				}); o.length;) {
					var q = o.shift(),
						s = o.shift();
					p = p.then(q, s)
				}
				return e ? (p.success = function(a) {
					return ma(a, "fn"), p.then(function(b) {
						a(b.data, b.status, b.headers, j)
					}), p
				}, p.error = function(a) {
					return ma(a, "fn"), p.then(null, function(b) {
						a(b.data, b.status, b.headers, j)
					}), p
				}) : (p.success = Me("success"), p.error = Me("error")), p
			}
			function p(a) {
				f(arguments, function(a) {
					o[a] = function(b, c) {
						return o(l({}, c || {}, {
							method: a,
							url: b
						}))
					}
				})
			}
			function q(a) {
				f(arguments, function(a) {
					o[a] = function(b, c, d) {
						return o(l({}, d || {}, {
							method: a,
							url: b,
							data: c
						}))
					}
				})
			}
			function r(d, e) {
				function f(a, c, d, e) {
					function f() {
						g(c, a, d, e)
					}
					n && (yb(a) ? n.put(y, [a, c, vb(d), e]) : n.remove(y)), b ? k.$applyAsync(f) : (f(), k.$$phase || k.$apply())
				}
				function g(a, b, c, e) {
					b = Math.max(b, 0), (yb(b) ? q.resolve : q.reject)({
						data: a,
						status: b,
						headers: wb(c),
						config: d,
						statusText: e
					})
				}
				function j(a) {
					g(a.data, a.status, P(a.headers()), a.statusText)
				}
				function l() {
					var a = o.pendingRequests.indexOf(d); - 1 !== a && o.pendingRequests.splice(a, 1)
				}
				var n, p, q = m.defer(),
					r = q.promise,
					x = d.headers,
					y = s(d.url, d.paramSerializer(d.params));
				if (o.pendingRequests.push(d), r.then(l, l), !d.cache && !a.cache || d.cache === !1 || "GET" !== d.method && "JSONP" !== d.method || (n = v(d.cache) ? d.cache : v(a.cache) ? a.cache : w), n && (p = n.get(y), u(p) ? I(p) ? p.then(j, j) : Jd(p) ? g(p[1], p[0], P(p[2]), p[3]) : g(p, 200, {}, "OK") : n.put(y, r)), t(p)) {
					var z = yc(d.url) ? i()[d.xsrfCookieName || a.xsrfCookieName] : c;
					z && (x[d.xsrfHeaderName || a.xsrfHeaderName] = z), h(d.method, y, e, f, x, d.timeout, d.withCredentials, d.responseType)
				}
				return r
			}
			function s(a, b) {
				return b.length > 0 && (a += (-1 == a.indexOf("?") ? "?" : "&") + b), a
			}
			var w = j("$http");
			a.paramSerializer = x(a.paramSerializer) ? n.get(a.paramSerializer) : a.paramSerializer;
			var y = [];
			return f(g, function(a) {
				y.unshift(x(a) ? n.get(a) : n.invoke(a))
			}), o.pendingRequests = [], p("get", "delete", "head", "jsonp"), q("post", "put", "patch"), o.defaults = a, o
		}]
	}
	function Ab() {
		return new a.XMLHttpRequest
	}
	function Bb() {
		this.$get = ["$browser", "$window", "$document", function(a, b, c) {
			return Cb(a, Ab, a.defer, b.angular.callbacks, c[0])
		}]
	}
	function Cb(a, b, d, e, g) {
		function h(a, b, c) {
			var d = g.createElement("script"),
				f = null;
			return d.type = "text/javascript", d.src = a, d.async = !0, f = function(a) {
				ae(d, "load", f), ae(d, "error", f), g.body.removeChild(d), d = null;
				var h = -1,
					i = "unknown";
				a && ("load" !== a.type || e[b].called || (a = {
					type: "error"
				}), i = a.type, h = "error" === a.type ? 404 : 200), c && c(h, i)
			}, _d(d, "load", f), _d(d, "error", f), g.body.appendChild(d), f
		}
		return function(g, i, j, k, l, m, n, o) {
			function q() {
				t && t(), v && v.abort()
			}
			function r(b, e, f, g, h) {
				y !== c && d.cancel(y), t = v = null, b(e, f, g, h), a.$$completeOutstandingRequest(p)
			}
			if (a.$$incOutstandingRequestCount(), i = i || a.url(), "jsonp" == rd(g)) {
				var s = "_" + (e.counter++).toString(36);
				e[s] = function(a) {
					e[s].data = a, e[s].called = !0
				};
				var t = h(i.replace("JSON_CALLBACK", "angular.callbacks." + s), s, function(a, b) {
					r(k, a, e[s].data, "", b), e[s] = p
				})
			} else {
				var v = b();
				v.open(g, i, !0), f(l, function(a, b) {
					u(a) && v.setRequestHeader(b, a)
				}), v.onload = function() {
					var a = v.statusText || "",
						b = "response" in v ? v.response : v.responseText,
						c = 1223 === v.status ? 204 : v.status;
					0 === c && (c = b ? 200 : "file" == xc(i).protocol ? 404 : 0), r(k, c, b, v.getAllResponseHeaders(), a)
				};
				var w = function() {
						r(k, -1, null, null, "")
					};
				if (v.onerror = w, v.onabort = w, n && (v.withCredentials = !0), o) try {
					v.responseType = o
				} catch (x) {
					if ("json" !== o) throw x
				}
				v.send(j)
			}
			if (m > 0) var y = d(q, m);
			else I(m) && m.then(q)
		}
	}
	function Db() {
		var a = "{{",
			b = "}}";
		this.startSymbol = function(b) {
			return b ? (a = b, this) : a
		}, this.endSymbol = function(a) {
			return a ? (b = a, this) : b
		}, this.$get = ["$parse", "$exceptionHandler", "$sce", function(c, d, e) {
			function f(a) {
				return "\\\\\\" + a
			}
			function g(c) {
				return c.replace(m, a).replace(n, b)
			}
			function h(a) {
				if (null == a) return "";
				switch (typeof a) {
				case "string":
					break;
				case "number":
					a = "" + a;
					break;
				default:
					a = V(a)
				}
				return a
			}
			function i(f, i, m, n) {
				function o(a) {
					try {
						return a = C(a), n && !u(a) ? a : h(a)
					} catch (b) {
						d(Ne.interr(f, b))
					}
				}
				n = !! n;
				for (var p, q, r, s = 0, v = [], w = [], x = f.length, y = [], z = []; x > s;) {
					if (-1 == (p = f.indexOf(a, s)) || -1 == (q = f.indexOf(b, p + j))) {
						s !== x && y.push(g(f.substring(s)));
						break
					}
					s !== p && y.push(g(f.substring(s, p))), r = f.substring(p + j, q), v.push(r), w.push(c(r, o)), s = q + k, z.push(y.length), y.push("")
				}
				if (m && y.length > 1 && Ne.throwNoconcat(f), !i || v.length) {
					var B = function(a) {
							for (var b = 0, c = v.length; c > b; b++) {
								if (n && t(a[b])) return;
								y[z[b]] = a[b]
							}
							return y.join("")
						},
						C = function(a) {
							return m ? e.getTrusted(m, a) : e.valueOf(a)
						};
					return l(function(a) {
						var b = 0,
							c = v.length,
							e = new Array(c);
						try {
							for (; c > b; b++) e[b] = w[b](a);
							return B(e)
						} catch (g) {
							d(Ne.interr(f, g))
						}
					}, {
						exp: f,
						expressions: v,
						$$watchDelegate: function(a, b) {
							var c;
							return a.$watchGroup(w, function(d, e) {
								var f = B(d);
								A(b) && b.call(this, f, d !== e ? c : f, a), c = f
							})
						}
					})
				}
			}
			var j = a.length,
				k = b.length,
				m = new RegExp(a.replace(/./g, f), "g"),
				n = new RegExp(b.replace(/./g, f), "g");
			return i.startSymbol = function() {
				return a
			}, i.endSymbol = function() {
				return b
			}, i
		}]
	}
	function Eb() {
		this.$get = ["$rootScope", "$window", "$q", "$$q", function(a, b, c, d) {
			function e(e, g, h, i) {
				var j = arguments.length > 4,
					k = j ? S(arguments, 4) : [],
					l = b.setInterval,
					m = b.clearInterval,
					n = 0,
					o = u(i) && !i,
					p = (o ? d : c).defer(),
					q = p.promise;
				return h = u(h) ? h : 0, q.then(null, null, j ?
				function() {
					e.apply(null, k)
				} : e), q.$$intervalId = l(function() {
					p.notify(n++), h > 0 && n >= h && (p.resolve(n), m(q.$$intervalId), delete f[q.$$intervalId]), o || a.$apply()
				}, g), f[q.$$intervalId] = p, q
			}
			var f = {};
			return e.cancel = function(a) {
				return a && a.$$intervalId in f ? (f[a.$$intervalId].reject("canceled"), b.clearInterval(a.$$intervalId), delete f[a.$$intervalId], !0) : !1
			}, e
		}]
	}
	function Fb(a) {
		for (var b = a.split("/"), c = b.length; c--;) b[c] = ca(b[c]);
		return b.join("/")
	}
	function Gb(a, b) {
		var c = xc(a);
		b.$$protocol = c.protocol, b.$$host = c.hostname, b.$$port = n(c.port) || Pe[c.protocol] || null
	}
	function Hb(a, b) {
		var c = "/" !== a.charAt(0);
		c && (a = "/" + a);
		var d = xc(a);
		b.$$path = decodeURIComponent(c && "/" === d.pathname.charAt(0) ? d.pathname.substring(1) : d.pathname), b.$$search = aa(d.search), b.$$hash = decodeURIComponent(d.hash), b.$$path && "/" != b.$$path.charAt(0) && (b.$$path = "/" + b.$$path)
	}
	function Ib(a, b) {
		return 0 === b.indexOf(a) ? b.substr(a.length) : void 0
	}
	function Jb(a) {
		var b = a.indexOf("#");
		return -1 == b ? a : a.substr(0, b)
	}
	function Kb(a) {
		return a.replace(/(#.+)|#$/, "$1")
	}
	function Lb(a) {
		return a.substr(0, Jb(a).lastIndexOf("/") + 1)
	}
	function Mb(a) {
		return a.substring(0, a.indexOf("/", a.indexOf("//") + 2))
	}
	function Nb(a, b, d) {
		this.$$html5 = !0, d = d || "", Gb(a, this), this.$$parse = function(a) {
			var c = Ib(b, a);
			if (!x(c)) throw Qe("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', a, b);
			Hb(c, this), this.$$path || (this.$$path = "/"), this.$$compose()
		}, this.$$compose = function() {
			var a = ba(this.$$search),
				c = this.$$hash ? "#" + ca(this.$$hash) : "";
			this.$$url = Fb(this.$$path) + (a ? "?" + a : "") + c, this.$$absUrl = b + this.$$url.substr(1)
		}, this.$$parseLinkUrl = function(e, f) {
			if (f && "#" === f[0]) return this.hash(f.slice(1)), !0;
			var g, h, i;
			return (g = Ib(a, e)) !== c ? (h = g, i = (g = Ib(d, g)) !== c ? b + (Ib("/", g) || g) : a + h) : (g = Ib(b, e)) !== c ? i = b + g : b == e + "/" && (i = b), i && this.$$parse(i), !! i
		}
	}
	function Ob(a, b, c) {
		Gb(a, this), this.$$parse = function(d) {
			function e(a, b, c) {
				var d, e = /^\/[A-Z]:(\/.*)/;
				return 0 === b.indexOf(c) && (b = b.replace(c, "")), e.exec(b) ? a : (d = e.exec(a), d ? d[1] : a)
			}
			var f, g = Ib(a, d) || Ib(b, d);
			t(g) || "#" !== g.charAt(0) ? this.$$html5 ? f = g : (f = "", t(g) && (a = d, this.replace())) : (f = Ib(c, g), t(f) && (f = g)), Hb(f, this), this.$$path = e(this.$$path, f, a), this.$$compose()
		}, this.$$compose = function() {
			var b = ba(this.$$search),
				d = this.$$hash ? "#" + ca(this.$$hash) : "";
			this.$$url = Fb(this.$$path) + (b ? "?" + b : "") + d, this.$$absUrl = a + (this.$$url ? c + this.$$url : "")
		}, this.$$parseLinkUrl = function(b, c) {
			return Jb(a) == Jb(b) ? (this.$$parse(b), !0) : !1
		}
	}
	function Pb(a, b, c) {
		this.$$html5 = !0, Ob.apply(this, arguments), this.$$parseLinkUrl = function(d, e) {
			if (e && "#" === e[0]) return this.hash(e.slice(1)), !0;
			var f, g;
			return a == Jb(d) ? f = d : (g = Ib(b, d)) ? f = a + c + g : b === d + "/" && (f = b), f && this.$$parse(f), !! f
		}, this.$$compose = function() {
			var b = ba(this.$$search),
				d = this.$$hash ? "#" + ca(this.$$hash) : "";
			this.$$url = Fb(this.$$path) + (b ? "?" + b : "") + d, this.$$absUrl = a + c + this.$$url
		}
	}
	function Qb(a) {
		return function() {
			return this[a]
		}
	}
	function Rb(a, b) {
		return function(c) {
			return t(c) ? this[a] : (this[a] = b(c), this.$$compose(), this)
		}
	}
	function Sb() {
		var a = "",
			b = {
				enabled: !1,
				requireBase: !0,
				rewriteLinks: !0
			};
		this.hashPrefix = function(b) {
			return u(b) ? (a = b, this) : a
		}, this.html5Mode = function(a) {
			return H(a) ? (b.enabled = a, this) : v(a) ? (H(a.enabled) && (b.enabled = a.enabled), H(a.requireBase) && (b.requireBase = a.requireBase), H(a.rewriteLinks) && (b.rewriteLinks = a.rewriteLinks), this) : b
		}, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function(c, d, e, f, g) {
			function h(a, b, c) {
				var e = j.url(),
					f = j.$$state;
				try {
					d.url(a, b, c), j.$$state = d.state()
				} catch (g) {
					throw j.url(e), j.$$state = f, g
				}
			}
			function i(a, b) {
				c.$broadcast("$locationChangeSuccess", j.absUrl(), a, j.$$state, b)
			}
			var j, k, l, m = d.baseHref(),
				n = d.url();
			if (b.enabled) {
				if (!m && b.requireBase) throw Qe("nobase", "$location in HTML5 mode requires a <base> tag to be present!");
				l = Mb(n) + (m || "/"), k = e.history ? Nb : Pb
			} else l = Jb(n), k = Ob;
			var o = Lb(l);
			j = new k(l, o, "#" + a), j.$$parseLinkUrl(n, n), j.$$state = d.state();
			var p = /^\s*(javascript|mailto):/i;
			f.on("click", function(a) {
				if (b.rewriteLinks && !a.ctrlKey && !a.metaKey && !a.shiftKey && 2 != a.which && 2 != a.button) {
					for (var e = xd(a.target);
					"a" !== M(e[0]);) if (e[0] === f[0] || !(e = e.parent())[0]) return;
					var h = e.prop("href"),
						i = e.attr("href") || e.attr("xlink:href");
					v(h) && "[object SVGAnimatedString]" === h.toString() && (h = xc(h.animVal).href), p.test(h) || !h || e.attr("target") || a.isDefaultPrevented() || j.$$parseLinkUrl(h, i) && (a.preventDefault(), j.absUrl() != d.url() && (c.$apply(), g.angular["ff-684208-preventDefault"] = !0))
				}
			}), Kb(j.absUrl()) != Kb(n) && d.url(j.absUrl(), !0);
			var q = !0;
			return d.onUrlChange(function(a, b) {
				return t(Ib(o, a)) ? void(g.location.href = a) : (c.$evalAsync(function() {
					var d, e = j.absUrl(),
						f = j.$$state;
					j.$$parse(a), j.$$state = b, d = c.$broadcast("$locationChangeStart", a, e, b, f).defaultPrevented, j.absUrl() === a && (d ? (j.$$parse(e), j.$$state = f, h(e, !1, f)) : (q = !1, i(e, f)))
				}), void(c.$$phase || c.$digest()))
			}), c.$watch(function() {
				var a = Kb(d.url()),
					b = Kb(j.absUrl()),
					f = d.state(),
					g = j.$$replace,
					k = a !== b || j.$$html5 && e.history && f !== j.$$state;
				(q || k) && (q = !1, c.$evalAsync(function() {
					var b = j.absUrl(),
						d = c.$broadcast("$locationChangeStart", b, a, j.$$state, f).defaultPrevented;
					j.absUrl() === b && (d ? (j.$$parse(a), j.$$state = f) : (k && h(b, g, f === j.$$state ? null : j.$$state), i(a, f)))
				})), j.$$replace = !1
			}), j
		}]
	}
	function Tb() {
		var a = !0,
			b = this;
		this.debugEnabled = function(b) {
			return u(b) ? (a = b, this) : a
		}, this.$get = ["$window", function(c) {
			function d(a) {
				return a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line)), a
			}
			function e(a) {
				var b = c.console || {},
					e = b[a] || b.log || p,
					g = !1;
				try {
					g = !! e.apply
				} catch (h) {}
				return g ?
				function() {
					var a = [];
					return f(arguments, function(b) {
						a.push(d(b))
					}), e.apply(b, a)
				} : function(a, b) {
					e(a, null == b ? "" : b)
				}
			}
			return {
				log: e("log"),
				info: e("info"),
				warn: e("warn"),
				error: e("error"),
				debug: function() {
					var c = e("debug");
					return function() {
						a && c.apply(b, arguments)
					}
				}()
			}
		}]
	}
	function Ub(a, b) {
		if ("__defineGetter__" === a || "__defineSetter__" === a || "__lookupGetter__" === a || "__lookupSetter__" === a || "__proto__" === a) throw Se("isecfld", "Attempting to access a disallowed field in Angular expressions! Expression: {0}", b);
		return a
	}
	function Vb(a, b) {
		if (a) {
			if (a.constructor === a) throw Se("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", b);
			if (a.window === a) throw Se("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", b);
			if (a.children && (a.nodeName || a.prop && a.attr && a.find)) throw Se("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", b);
			if (a === Object) throw Se("isecobj", "Referencing Object in Angular expressions is disallowed! Expression: {0}", b)
		}
		return a
	}
	function Wb(a, b) {
		if (a) {
			if (a.constructor === a) throw Se("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", b);
			if (a === Te || a === Ue || a === Ve) throw Se("isecff", "Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}", b)
		}
	}
	function Xb(a, b) {
		return "undefined" != typeof a ? a : b
	}
	function Yb(a, b) {
		return "undefined" == typeof a ? b : "undefined" == typeof b ? a : a + b
	}
	function Zb(a, b) {
		var c = a(b);
		return !c.$stateful
	}
	function $b(a, b) {
		var c, d;
		switch (a.type) {
		case Ze.Program:
			c = !0, f(a.body, function(a) {
				$b(a.expression, b), c = c && a.expression.constant
			}), a.constant = c;
			break;
		case Ze.Literal:
			a.constant = !0, a.toWatch = [];
			break;
		case Ze.UnaryExpression:
			$b(a.argument, b), a.constant = a.argument.constant, a.toWatch = a.argument.toWatch;
			break;
		case Ze.BinaryExpression:
			$b(a.left, b), $b(a.right, b), a.constant = a.left.constant && a.right.constant, a.toWatch = a.left.toWatch.concat(a.right.toWatch);
			break;
		case Ze.LogicalExpression:
			$b(a.left, b), $b(a.right, b), a.constant = a.left.constant && a.right.constant, a.toWatch = a.constant ? [] : [a];
			break;
		case Ze.ConditionalExpression:
			$b(a.test, b), $b(a.alternate, b), $b(a.consequent, b), a.constant = a.test.constant && a.alternate.constant && a.consequent.constant, a.toWatch = a.constant ? [] : [a];
			break;
		case Ze.Identifier:
			a.constant = !1, a.toWatch = [a];
			break;
		case Ze.MemberExpression:
			$b(a.object, b), a.computed && $b(a.property, b), a.constant = a.object.constant && (!a.computed || a.property.constant), a.toWatch = [a];
			break;
		case Ze.CallExpression:
			c = a.filter ? Zb(b, a.callee.name) : !1, d = [], f(a.arguments, function(a) {
				$b(a, b), c = c && a.constant, a.constant || d.push.apply(d, a.toWatch)
			}), a.constant = c, a.toWatch = a.filter && Zb(b, a.callee.name) ? d : [a];
			break;
		case Ze.AssignmentExpression:
			$b(a.left, b), $b(a.right, b), a.constant = a.left.constant && a.right.constant, a.toWatch = [a];
			break;
		case Ze.ArrayExpression:
			c = !0, d = [], f(a.elements, function(a) {
				$b(a, b), c = c && a.constant, a.constant || d.push.apply(d, a.toWatch)
			}), a.constant = c, a.toWatch = d;
			break;
		case Ze.ObjectExpression:
			c = !0, d = [], f(a.properties, function(a) {
				$b(a.value, b), c = c && a.value.constant, a.value.constant || d.push.apply(d, a.value.toWatch)
			}), a.constant = c, a.toWatch = d;
			break;
		case Ze.ThisExpression:
			a.constant = !1, a.toWatch = []
		}
	}
	function _b(a) {
		if (1 == a.length) {
			var b = a[0].expression,
				d = b.toWatch;
			return 1 !== d.length ? d : d[0] !== b ? d : c
		}
	}
	function ac(a) {
		return a.type === Ze.Identifier || a.type === Ze.MemberExpression
	}
	function bc(a) {
		return 1 === a.body.length && ac(a.body[0].expression) ? {
			type: Ze.AssignmentExpression,
			left: a.body[0].expression,
			right: {
				type: Ze.NGValueParameter
			},
			operator: "="
		} : void 0
	}
	function cc(a) {
		return 0 === a.body.length || 1 === a.body.length && (a.body[0].expression.type === Ze.Literal || a.body[0].expression.type === Ze.ArrayExpression || a.body[0].expression.type === Ze.ObjectExpression)
	}
	function dc(a) {
		return a.constant
	}
	function ec(a, b) {
		this.astBuilder = a, this.$filter = b
	}
	function fc(a, b) {
		this.astBuilder = a, this.$filter = b
	}
	function gc(a) {
		return "constructor" == a
	}
	function hc(a) {
		return A(a.valueOf) ? a.valueOf() : _e.call(a)
	}
	function ic() {
		var a = qa(),
			b = qa();
		this.$get = ["$filter", function(d) {
			function e(a, b) {
				return null == a || null == b ? a === b : "object" == typeof a && (a = hc(a), "object" == typeof a) ? !1 : a === b || a !== a && b !== b
			}
			function g(a, b, d, f, g) {
				var h, i = f.inputs;
				if (1 === i.length) {
					var j = e;
					return i = i[0], a.$watch(function(a) {
						var b = i(a);
						return e(b, j) || (h = f(a, c, c, [b]), j = b && hc(b)), h
					}, b, d, g)
				}
				for (var k = [], l = [], m = 0, n = i.length; n > m; m++) k[m] = e, l[m] = null;
				return a.$watch(function(a) {
					for (var b = !1, d = 0, g = i.length; g > d; d++) {
						var j = i[d](a);
						(b || (b = !e(j, k[d]))) && (l[d] = j, k[d] = j && hc(j))
					}
					return b && (h = f(a, c, c, l)), h
				}, b, d, g)
			}
			function h(a, b, c, d) {
				var e, f;
				return e = a.$watch(function(a) {
					return d(a)
				}, function(a, c, d) {
					f = a, A(b) && b.apply(this, arguments), u(a) && d.$$postDigest(function() {
						u(f) && e()
					})
				}, c)
			}
			function i(a, b, c, d) {
				function e(a) {
					var b = !0;
					return f(a, function(a) {
						u(a) || (b = !1)
					}), b
				}
				var g, h;
				return g = a.$watch(function(a) {
					return d(a)
				}, function(a, c, d) {
					h = a, A(b) && b.call(this, a, c, d), e(a) && d.$$postDigest(function() {
						e(h) && g()
					})
				}, c)
			}
			function j(a, b, c, d) {
				var e;
				return e = a.$watch(function(a) {
					return d(a)
				}, function(a, c, d) {
					A(b) && b.apply(this, arguments), e()
				}, c)
			}
			function k(a, b) {
				if (!b) return a;
				var c = a.$$watchDelegate,
					d = c !== i && c !== h,
					e = d ?
				function(c, d, e, f) {
					var g = a(c, d, e, f);
					return b(g, c, d)
				} : function(c, d, e, f) {
					var g = a(c, d, e, f),
						h = b(g, c, d);
					return u(g) ? h : g
				};
				return a.$$watchDelegate && a.$$watchDelegate !== g ? e.$$watchDelegate = a.$$watchDelegate : b.$stateful || (e.$$watchDelegate = g, e.inputs = a.inputs ? a.inputs : [a]), e
			}
			var l = Nd().noUnsafeEval,
				m = {
					csp: l,
					expensiveChecks: !1
				},
				n = {
					csp: l,
					expensiveChecks: !0
				};
			return function(c, e, f) {
				var l, o, q;
				switch (typeof c) {
				case "string":
					c = c.trim(), q = c;
					var r = f ? b : a;
					if (l = r[q], !l) {
						":" === c.charAt(0) && ":" === c.charAt(1) && (o = !0, c = c.substring(2));
						var s = f ? n : m,
							t = new Ye(s),
							u = new $e(t, d, s);
						l = u.parse(c), l.constant ? l.$$watchDelegate = j : o ? l.$$watchDelegate = l.literal ? i : h : l.inputs && (l.$$watchDelegate = g), r[q] = l
					}
					return k(l, e);
				case "function":
					return k(c, e);
				default:
					return p
				}
			}
		}]
	}
	function jc() {
		this.$get = ["$rootScope", "$exceptionHandler", function(a, b) {
			return lc(function(b) {
				a.$evalAsync(b)
			}, b)
		}]
	}
	function kc() {
		this.$get = ["$browser", "$exceptionHandler", function(a, b) {
			return lc(function(b) {
				a.defer(b)
			}, b)
		}]
	}
	function lc(a, b) {
		function e(a, b, c) {
			function d(b) {
				return function(c) {
					e || (e = !0, b.call(a, c))
				}
			}
			var e = !1;
			return [d(b), d(c)]
		}
		function g() {
			this.$$state = {
				status: 0
			}
		}
		function h(a, b) {
			return function(c) {
				b.call(a, c)
			}
		}
		function i(a) {
			var d, e, f;
			f = a.pending, a.processScheduled = !1, a.pending = c;
			for (var g = 0, h = f.length; h > g; ++g) {
				e = f[g][0], d = f[g][a.status];
				try {
					A(d) ? e.resolve(d(a.value)) : 1 === a.status ? e.resolve(a.value) : e.reject(a.value)
				} catch (i) {
					e.reject(i), b(i)
				}
			}
		}
		function j(b) {
			!b.processScheduled && b.pending && (b.processScheduled = !0, a(function() {
				i(b)
			}))
		}
		function k() {
			this.promise = new g, this.resolve = h(this, this.resolve), this.reject = h(this, this.reject), this.notify = h(this, this.notify)
		}
		function m(a) {
			var b = new k,
				c = 0,
				d = Jd(a) ? [] : {};
			return f(a, function(a, e) {
				c++, s(a).then(function(a) {
					d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d))
				}, function(a) {
					d.hasOwnProperty(e) || b.reject(a)
				})
			}), 0 === c && b.resolve(d), b.promise
		}
		var n = d("$q", TypeError),
			o = function() {
				return new k
			};
		l(g.prototype, {
			then: function(a, b, c) {
				if (t(a) && t(b) && t(c)) return this;
				var d = new k;
				return this.$$state.pending = this.$$state.pending || [], this.$$state.pending.push([d, a, b, c]), this.$$state.status > 0 && j(this.$$state), d.promise
			},
			"catch": function(a) {
				return this.then(null, a)
			},
			"finally": function(a, b) {
				return this.then(function(b) {
					return r(b, !0, a)
				}, function(b) {
					return r(b, !1, a)
				}, b)
			}
		}), l(k.prototype, {
			resolve: function(a) {
				this.promise.$$state.status || (a === this.promise ? this.$$reject(n("qcycle", "Expected promise to be resolved with value other than itself '{0}'", a)) : this.$$resolve(a))
			},
			$$resolve: function(a) {
				var c, d;
				d = e(this, this.$$resolve, this.$$reject);
				try {
					(v(a) || A(a)) && (c = a && a.then), A(c) ? (this.promise.$$state.status = -1, c.call(a, d[0], d[1], this.notify)) : (this.promise.$$state.value = a, this.promise.$$state.status = 1, j(this.promise.$$state))
				} catch (f) {
					d[1](f), b(f)
				}
			},
			reject: function(a) {
				this.promise.$$state.status || this.$$reject(a)
			},
			$$reject: function(a) {
				this.promise.$$state.value = a, this.promise.$$state.status = 2, j(this.promise.$$state)
			},
			notify: function(c) {
				var d = this.promise.$$state.pending;
				this.promise.$$state.status <= 0 && d && d.length && a(function() {
					for (var a, e, f = 0, g = d.length; g > f; f++) {
						e = d[f][0], a = d[f][3];
						try {
							e.notify(A(a) ? a(c) : c)
						} catch (h) {
							b(h)
						}
					}
				})
			}
		});
		var p = function(a) {
				var b = new k;
				return b.reject(a), b.promise
			},
			q = function(a, b) {
				var c = new k;
				return b ? c.resolve(a) : c.reject(a), c.promise
			},
			r = function(a, b, c) {
				var d = null;
				try {
					A(c) && (d = c())
				} catch (e) {
					return q(e, !1)
				}
				return I(d) ? d.then(function() {
					return q(a, b)
				}, function(a) {
					return q(a, !1)
				}) : q(a, b)
			},
			s = function(a, b, c, d) {
				var e = new k;
				return e.resolve(a), e.promise.then(b, c, d)
			},
			u = s,
			w = function x(a) {
				function b(a) {
					d.resolve(a)
				}
				function c(a) {
					d.reject(a)
				}
				if (!A(a)) throw n("norslvr", "Expected resolverFn, got '{0}'", a);
				if (!(this instanceof x)) return new x(a);
				var d = new k;
				return a(b, c), d.promise
			};
		return w.defer = o, w.reject = p, w.when = s, w.resolve = u, w.all = m, w
	}
	function mc() {
		this.$get = ["$window", "$timeout", function(a, b) {
			function c() {
				for (var a = 0; a < k.length; a++) {
					var b = k[a];
					b && (k[a] = null, b())
				}
				j = k.length = 0
			}
			function d(a) {
				var b = k.length;
				return j++, k.push(a), 0 === b && (i = h(c)), function() {
					b >= 0 && (k[b] = null, b = null, 0 === --j && i && (i(), i = null, k.length = 0))
				}
			}
			var e = a.requestAnimationFrame || a.webkitRequestAnimationFrame,
				f = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.webkitCancelRequestAnimationFrame,
				g = !! e,
				h = g ?
			function(a) {
				var b = e(a);
				return function() {
					f(b)
				}
			} : function(a) {
				var c = b(a, 16.66, !1);
				return function() {
					b.cancel(c)
				}
			};
			d.supported = g;
			var i, j = 0,
				k = [];
			return d
		}]
	}
	function nc() {
		function a(a) {
			function b() {
				this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$id = i(), this.$$ChildScope = null
			}
			return b.prototype = a, b
		}
		var b = 10,
			c = d("$rootScope"),
			g = null,
			h = null;
		this.digestTtl = function(a) {
			return arguments.length && (b = a), b
		}, this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser", function(d, j, k, l) {
			function m(a) {
				a.currentScope.$$destroyed = !0
			}
			function n() {
				this.$id = i(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this.$root = this, this.$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$$isolateBindings = null
			}
			function o(a) {
				if (y.$$phase) throw c("inprog", "{0} already in progress", y.$$phase);
				y.$$phase = a
			}
			function q() {
				y.$$phase = null
			}
			function r(a, b) {
				do a.$$watchersCount += b;
				while (a = a.$parent)
			}
			function s(a, b, c) {
				do a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c];
				while (a = a.$parent)
			}
			function u() {}
			function w() {
				for (; C.length;) try {
					C.shift()()
				} catch (a) {
					j(a)
				}
				h = null
			}
			function x() {
				null === h && (h = l.defer(function() {
					y.$apply(w)
				}))
			}
			n.prototype = {
				constructor: n,
				$new: function(b, c) {
					var d;
					return c = c || this, b ? (d = new n, d.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = a(this)), d = new this.$$ChildScope), d.$parent = c, d.$$prevSibling = c.$$childTail, c.$$childHead ? (c.$$childTail.$$nextSibling = d, c.$$childTail = d) : c.$$childHead = c.$$childTail = d, (b || c != this) && d.$on("$destroy", m), d
				},
				$watch: function(a, b, c, d) {
					var e = k(a);
					if (e.$$watchDelegate) return e.$$watchDelegate(this, b, c, e, a);
					var f = this,
						h = f.$$watchers,
						i = {
							fn: b,
							last: u,
							get: e,
							exp: d || a,
							eq: !! c
						};
					return g = null, A(b) || (i.fn = p), h || (h = f.$$watchers = []), h.unshift(i), r(this, 1), function() {
						N(h, i) >= 0 && r(f, -1), g = null
					}
				},
				$watchGroup: function(a, b) {
					function c() {
						i = !1, j ? (j = !1, b(e, e, h)) : b(e, d, h)
					}
					var d = new Array(a.length),
						e = new Array(a.length),
						g = [],
						h = this,
						i = !1,
						j = !0;
					if (!a.length) {
						var k = !0;
						return h.$evalAsync(function() {
							k && b(e, e, h)
						}), function() {
							k = !1
						}
					}
					return 1 === a.length ? this.$watch(a[0], function(a, c, f) {
						e[0] = a, d[0] = c, b(e, a === c ? e : d, f)
					}) : (f(a, function(a, b) {
						var f = h.$watch(a, function(a, f) {
							e[b] = a, d[b] = f, i || (i = !0, h.$evalAsync(c))
						});
						g.push(f)
					}), function() {
						for (; g.length;) g.shift()()
					})
				},
				$watchCollection: function(a, b) {
					function c(a) {
						f = a;
						var b, c, d, h, i;
						if (!t(f)) {
							if (v(f)) if (e(f)) {
								g !== n && (g = n, q = g.length = 0, l++), b = f.length, q !== b && (l++, g.length = q = b);
								for (var j = 0; b > j; j++) i = g[j], h = f[j], d = i !== i && h !== h, d || i === h || (l++, g[j] = h)
							} else {
								g !== o && (g = o = {}, q = 0, l++), b = 0;
								for (c in f) f.hasOwnProperty(c) && (b++, h = f[c], i = g[c], c in g ? (d = i !== i && h !== h, d || i === h || (l++, g[c] = h)) : (q++, g[c] = h, l++));
								if (q > b) {
									l++;
									for (c in g) f.hasOwnProperty(c) || (q--, delete g[c])
								}
							} else g !== f && (g = f, l++);
							return l
						}
					}
					function d() {
						if (p ? (p = !1, b(f, f, i)) : b(f, h, i), j) if (v(f)) if (e(f)) {
							h = new Array(f.length);
							for (var a = 0; a < f.length; a++) h[a] = f[a]
						} else {
							h = {};
							for (var c in f) sd.call(f, c) && (h[c] = f[c])
						} else h = f
					}
					c.$stateful = !0;
					var f, g, h, i = this,
						j = b.length > 1,
						l = 0,
						m = k(a, c),
						n = [],
						o = {},
						p = !0,
						q = 0;
					return this.$watch(m, d)
				},
				$digest: function() {
					var a, d, e, f, i, k, m, n, p, r, s = b,
						t = this,
						v = [];
					o("$digest"), l.$$checkUrlChange(), this === y && null !== h && (l.defer.cancel(h), w()), g = null;
					do {
						for (k = !1, n = t; z.length;) {
							try {
								r = z.shift(), r.scope.$eval(r.expression, r.locals)
							} catch (x) {
								j(x)
							}
							g = null
						}
						a: do {
							if (f = n.$$watchers) for (i = f.length; i--;) try {
								if (a = f[i]) if ((d = a.get(n)) === (e = a.last) || (a.eq ? Q(d, e) : "number" == typeof d && "number" == typeof e && isNaN(d) && isNaN(e))) {
									if (a === g) {
										k = !1;
										break a
									}
								} else k = !0, g = a, a.last = a.eq ? O(d, null) : d, a.fn(d, e === u ? d : e, n), 5 > s && (p = 4 - s, v[p] || (v[p] = []), v[p].push({
									msg: A(a.exp) ? "fn: " + (a.exp.name || a.exp.toString()) : a.exp,
									newVal: d,
									oldVal: e
								}))
							} catch (x) {
								j(x)
							}
							if (!(m = n.$$watchersCount && n.$$childHead || n !== t && n.$$nextSibling)) for (; n !== t && !(m = n.$$nextSibling);) n = n.$parent
						} while (n = m);
						if ((k || z.length) && !s--) throw q(), c("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", b, v)
					}
					while (k || z.length);
					for (q(); B.length;) try {
						B.shift()()
					} catch (x) {
						j(x)
					}
				},
				$destroy: function() {
					if (!this.$$destroyed) {
						var a = this.$parent;
						this.$broadcast("$destroy"), this.$$destroyed = !0, this === y && l.$$applicationDestroyed(), r(this, -this.$$watchersCount);
						for (var b in this.$$listenerCount) s(this, this.$$listenerCount[b], b);
						a && a.$$childHead == this && (a.$$childHead = this.$$nextSibling), a && a.$$childTail == this && (a.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = p, this.$on = this.$watch = this.$watchGroup = function() {
							return p
						}, this.$$listeners = {}, this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = this.$$watchers = null
					}
				},
				$eval: function(a, b) {
					return k(a)(this, b)
				},
				$evalAsync: function(a, b) {
					y.$$phase || z.length || l.defer(function() {
						z.length && y.$digest()
					}), z.push({
						scope: this,
						expression: a,
						locals: b
					})
				},
				$$postDigest: function(a) {
					B.push(a)
				},
				$apply: function(a) {
					try {
						o("$apply");
						try {
							return this.$eval(a)
						} finally {
							q()
						}
					} catch (b) {
						j(b)
					} finally {
						try {
							y.$digest()
						} catch (b) {
							throw j(b), b
						}
					}
				},
				$applyAsync: function(a) {
					function b() {
						c.$eval(a)
					}
					var c = this;
					a && C.push(b), x()
				},
				$on: function(a, b) {
					var c = this.$$listeners[a];
					c || (this.$$listeners[a] = c = []), c.push(b);
					var d = this;
					do d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++;
					while (d = d.$parent);
					var e = this;
					return function() {
						var d = c.indexOf(b); - 1 !== d && (c[d] = null, s(e, 1, a))
					}
				},
				$emit: function(a, b) {
					var c, d, e, f = [],
						g = this,
						h = !1,
						i = {
							name: a,
							targetScope: g,
							stopPropagation: function() {
								h = !0
							},
							preventDefault: function() {
								i.defaultPrevented = !0
							},
							defaultPrevented: !1
						},
						k = R([i], arguments, 1);
					do {
						for (c = g.$$listeners[a] || f, i.currentScope = g, d = 0, e = c.length; e > d; d++) if (c[d]) try {
							c[d].apply(null, k)
						} catch (l) {
							j(l)
						} else c.splice(d, 1), d--, e--;
						if (h) return i.currentScope = null, i;
						g = g.$parent
					} while (g);
					return i.currentScope = null, i
				},
				$broadcast: function(a, b) {
					var c = this,
						d = c,
						e = c,
						f = {
							name: a,
							targetScope: c,
							preventDefault: function() {
								f.defaultPrevented = !0
							},
							defaultPrevented: !1
						};
					if (!c.$$listenerCount[a]) return f;
					for (var g, h, i, k = R([f], arguments, 1); d = e;) {
						for (f.currentScope = d, g = d.$$listeners[a] || [], h = 0, i = g.length; i > h; h++) if (g[h]) try {
							g[h].apply(null, k)
						} catch (l) {
							j(l)
						} else g.splice(h, 1), h--, i--;
						if (!(e = d.$$listenerCount[a] && d.$$childHead || d !== c && d.$$nextSibling)) for (; d !== c && !(e = d.$$nextSibling);) d = d.$parent
					}
					return f.currentScope = null, f
				}
			};
			var y = new n,
				z = y.$$asyncQueue = [],
				B = y.$$postDigestQueue = [],
				C = y.$$applyAsyncQueue = [];
			return y
		}]
	}
	function oc() {
		var a = /^\s*(https?|ftp|mailto|tel|file):/,
			b = /^\s*((https?|ftp|file|blob):|data:image\/)/;
		this.aHrefSanitizationWhitelist = function(b) {
			return u(b) ? (a = b, this) : a
		}, this.imgSrcSanitizationWhitelist = function(a) {
			return u(a) ? (b = a, this) : b
		}, this.$get = function() {
			return function(c, d) {
				var e, f = d ? b : a;
				return e = xc(c).href, "" === e || e.match(f) ? c : "unsafe:" + e
			}
		}
	}
	function pc(a) {
		if ("self" === a) return a;
		if (x(a)) {
			if (a.indexOf("***") > -1) throw af("iwcard", "Illegal sequence *** in string matcher.  String: {0}", a);
			return a = Md(a).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), new RegExp("^" + a + "$")
		}
		if (B(a)) return new RegExp("^" + a.source + "$");
		throw af("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
	}
	function qc(a) {
		var b = [];
		return u(a) && f(a, function(a) {
			b.push(pc(a))
		}), b
	}
	function rc() {
		this.SCE_CONTEXTS = bf;
		var a = ["self"],
			b = [];
		this.resourceUrlWhitelist = function(b) {
			return arguments.length && (a = qc(b)), a
		}, this.resourceUrlBlacklist = function(a) {
			return arguments.length && (b = qc(a)), b
		}, this.$get = ["$injector", function(d) {
			function e(a, b) {
				return "self" === a ? yc(b) : !! a.exec(b.href)
			}
			function f(c) {
				var d, f, g = xc(c.toString()),
					h = !1;
				for (d = 0, f = a.length; f > d; d++) if (e(a[d], g)) {
					h = !0;
					break
				}
				if (h) for (d = 0, f = b.length; f > d; d++) if (e(b[d], g)) {
					h = !1;
					break
				}
				return h
			}
			function g(a) {
				var b = function(a) {
						this.$$unwrapTrustedValue = function() {
							return a
						}
					};
				return a && (b.prototype = new a), b.prototype.valueOf = function() {
					return this.$$unwrapTrustedValue()
				}, b.prototype.toString = function() {
					return this.$$unwrapTrustedValue().toString()
				}, b
			}
			function h(a, b) {
				var d = m.hasOwnProperty(a) ? m[a] : null;
				if (!d) throw af("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", a, b);
				if (null === b || b === c || "" === b) return b;
				if ("string" != typeof b) throw af("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", a);
				return new d(b)
			}
			function i(a) {
				return a instanceof l ? a.$$unwrapTrustedValue() : a
			}
			function j(a, b) {
				if (null === b || b === c || "" === b) return b;
				var d = m.hasOwnProperty(a) ? m[a] : null;
				if (d && b instanceof d) return b.$$unwrapTrustedValue();
				if (a === bf.RESOURCE_URL) {
					if (f(b)) return b;
					throw af("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", b.toString())
				}
				if (a === bf.HTML) return k(b);
				throw af("unsafe", "Attempting to use an unsafe value in a safe context.")
			}
			var k = function(a) {
					throw af("unsafe", "Attempting to use an unsafe value in a safe context.")
				};
			d.has("$sanitize") && (k = d.get("$sanitize"));
			var l = g(),
				m = {};
			return m[bf.HTML] = g(l), m[bf.CSS] = g(l), m[bf.URL] = g(l), m[bf.JS] = g(l), m[bf.RESOURCE_URL] = g(m[bf.URL]), {
				trustAs: h,
				getTrusted: j,
				valueOf: i
			}
		}]
	}
	function sc() {
		var a = !0;
		this.enabled = function(b) {
			return arguments.length && (a = !! b), a
		}, this.$get = ["$parse", "$sceDelegate", function(b, c) {
			if (a && 8 > wd) throw af("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
			var d = P(bf);
			d.isEnabled = function() {
				return a
			}, d.trustAs = c.trustAs, d.getTrusted = c.getTrusted, d.valueOf = c.valueOf, a || (d.trustAs = d.getTrusted = function(a, b) {
				return b
			}, d.valueOf = q), d.parseAs = function(a, c) {
				var e = b(c);
				return e.literal && e.constant ? e : b(c, function(b) {
					return d.getTrusted(a, b)
				})
			};
			var e = d.parseAs,
				g = d.getTrusted,
				h = d.trustAs;
			return f(bf, function(a, b) {
				var c = rd(b);
				d[wa("parse_as_" + c)] = function(b) {
					return e(a, b)
				}, d[wa("get_trusted_" + c)] = function(b) {
					return g(a, b)
				}, d[wa("trust_as_" + c)] = function(b) {
					return h(a, b)
				}
			}), d
		}]
	}
	function tc() {
		this.$get = ["$window", "$document", function(a, b) {
			var c, d, e = {},
				f = n((/android (\d+)/.exec(rd((a.navigator || {}).userAgent)) || [])[1]),
				g = /Boxee/i.test((a.navigator || {}).userAgent),
				h = b[0] || {},
				i = /^(Moz|webkit|ms)(?=[A-Z])/,
				j = h.body && h.body.style,
				k = !1,
				l = !1;
			if (j) {
				for (var m in j) if (d = i.exec(m)) {
					c = d[0], c = c.substr(0, 1).toUpperCase() + c.substr(1);
					break
				}
				c || (c = "WebkitOpacity" in j && "webkit"), k = !! ("transition" in j || c + "Transition" in j), l = !! ("animation" in j || c + "Animation" in j), !f || k && l || (k = x(j.webkitTransition), l = x(j.webkitAnimation))
			}
			return {
				history: !(!a.history || !a.history.pushState || 4 > f || g),
				hasEvent: function(a) {
					if ("input" === a && 11 >= wd) return !1;
					if (t(e[a])) {
						var b = h.createElement("div");
						e[a] = "on" + a in b
					}
					return e[a]
				},
				csp: Nd(),
				vendorPrefix: c,
				transitions: k,
				animations: l,
				android: f
			}
		}]
	}
	function uc() {
		this.$get = ["$templateCache", "$http", "$q", "$sce", function(a, b, c, d) {
			function e(f, g) {
				function h(a) {
					if (!g) throw Be("tpload", "Failed to load template: {0} (HTTP status: {1} {2})", f, a.status, a.statusText);
					return c.reject(a)
				}
				e.totalPendingRequests++, x(f) && a.get(f) || (f = d.getTrustedResourceUrl(f));
				var i = b.defaults && b.defaults.transformResponse;
				Jd(i) ? i = i.filter(function(a) {
					return a !== tb
				}) : i === tb && (i = null);
				var j = {
					cache: a,
					transformResponse: i
				};
				return b.get(f, j)["finally"](function() {
					e.totalPendingRequests--
				}).then(function(b) {
					return a.put(f, b.data), b.data
				}, h)
			}
			return e.totalPendingRequests = 0, e
		}]
	}
	function vc() {
		this.$get = ["$rootScope", "$browser", "$location", function(a, b, c) {
			var d = {};
			return d.findBindings = function(a, b, c) {
				var d = a.getElementsByClassName("ng-binding"),
					e = [];
				return f(d, function(a) {
					var d = Gd.element(a).data("$binding");
					d && f(d, function(d) {
						if (c) {
							var f = new RegExp("(^|\\s)" + Md(b) + "(\\s|\\||$)");
							f.test(d) && e.push(a)
						} else - 1 != d.indexOf(b) && e.push(a)
					})
				}), e
			}, d.findModels = function(a, b, c) {
				for (var d = ["ng-", "data-ng-", "ng\\:"], e = 0; e < d.length; ++e) {
					var f = c ? "=" : "*=",
						g = "[" + d[e] + "model" + f + '"' + b + '"]',
						h = a.querySelectorAll(g);
					if (h.length) return h
				}
			}, d.getLocation = function() {
				return c.url()
			}, d.setLocation = function(b) {
				b !== c.url() && (c.url(b), a.$digest())
			}, d.whenStable = function(a) {
				b.notifyWhenNoOutstandingRequests(a)
			}, d
		}]
	}
	function wc() {
		this.$get = ["$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function(a, b, c, d, e) {
			function f(f, h, i) {
				A(f) || (i = h, h = f, f = p);
				var j, k = S(arguments, 3),
					l = u(i) && !i,
					m = (l ? d : c).defer(),
					n = m.promise;
				return j = b.defer(function() {
					try {
						m.resolve(f.apply(null, k))
					} catch (b) {
						m.reject(b), e(b)
					} finally {
						delete g[n.$$timeoutId]
					}
					l || a.$apply()
				}, h), n.$$timeoutId = j, g[j] = m, n
			}
			var g = {};
			return f.cancel = function(a) {
				return a && a.$$timeoutId in g ? (g[a.$$timeoutId].reject("canceled"), delete g[a.$$timeoutId], b.defer.cancel(a.$$timeoutId)) : !1
			}, f
		}]
	}
	function xc(a) {
		var b = a;
		return wd && (cf.setAttribute("href", b), b = cf.href), cf.setAttribute("href", b), {
			href: cf.href,
			protocol: cf.protocol ? cf.protocol.replace(/:$/, "") : "",
			host: cf.host,
			search: cf.search ? cf.search.replace(/^\?/, "") : "",
			hash: cf.hash ? cf.hash.replace(/^#/, "") : "",
			hostname: cf.hostname,
			port: cf.port,
			pathname: "/" === cf.pathname.charAt(0) ? cf.pathname : "/" + cf.pathname
		}
	}
	function yc(a) {
		var b = x(a) ? xc(a) : a;
		return b.protocol === df.protocol && b.host === df.host
	}
	function zc() {
		this.$get = r(a)
	}
	function Ac(a) {
		function b(a) {
			try {
				return decodeURIComponent(a)
			} catch (b) {
				return a
			}
		}
		var d = a[0] || {},
			e = {},
			f = "";
		return function() {
			var a, g, h, i, j, k = d.cookie || "";
			if (k !== f) for (f = k, a = f.split("; "), e = {}, h = 0; h < a.length; h++) g = a[h], i = g.indexOf("="), i > 0 && (j = b(g.substring(0, i)), e[j] === c && (e[j] = b(g.substring(i + 1))));
			return e
		}
	}
	function Bc() {
		this.$get = Ac
	}
	function Cc(a) {
		function b(d, e) {
			if (v(d)) {
				var g = {};
				return f(d, function(a, c) {
					g[c] = b(c, a)
				}), g
			}
			return a.factory(d + c, e)
		}
		var c = "Filter";
		this.register = b, this.$get = ["$injector", function(a) {
			return function(b) {
				return a.get(b + c)
			}
		}], b("currency", Hc), b("date", Uc), b("filter", Dc), b("json", Vc), b("limitTo", Wc), b("lowercase", jf), b("number", Ic), b("orderBy", Xc), b("uppercase", kf)
	}
	function Dc() {
		return function(a, b, c) {
			if (!e(a)) {
				if (null == a) return a;
				throw d("filter")("notarray", "Expected array but received: {0}", a)
			}
			var f, g, h = Gc(b);
			switch (h) {
			case "function":
				f = b;
				break;
			case "boolean":
			case "null":
			case "number":
			case "string":
				g = !0;
			case "object":
				f = Ec(b, c, g);
				break;
			default:
				return a
			}
			return Array.prototype.filter.call(a, f)
		}
	}
	function Ec(a, b, c) {
		var d, e = v(a) && "$" in a;
		return b === !0 ? b = Q : A(b) || (b = function(a, b) {
			return t(a) ? !1 : null === a || null === b ? a === b : v(b) || v(a) && !s(a) ? !1 : (a = rd("" + a), b = rd("" + b), -1 !== a.indexOf(b))
		}), d = function(d) {
			return e && !v(d) ? Fc(d, a.$, b, !1) : Fc(d, a, b, c)
		}
	}
	function Fc(a, b, c, d, e) {
		var f = Gc(a),
			g = Gc(b);
		if ("string" === g && "!" === b.charAt(0)) return !Fc(a, b.substring(1), c, d);
		if (Jd(a)) return a.some(function(a) {
			return Fc(a, b, c, d)
		});
		switch (f) {
		case "object":
			var h;
			if (d) {
				for (h in a) if ("$" !== h.charAt(0) && Fc(a[h], b, c, !0)) return !0;
				return e ? !1 : Fc(a, b, c, !1)
			}
			if ("object" === g) {
				for (h in b) {
					var i = b[h];
					if (!A(i) && !t(i)) {
						var j = "$" === h,
							k = j ? a : a[h];
						if (!Fc(k, i, c, j, j)) return !1
					}
				}
				return !0
			}
			return c(a, b);
		case "function":
			return !1;
		default:
			return c(a, b)
		}
	}
	function Gc(a) {
		return null === a ? "null" : typeof a
	}
	function Hc(a) {
		var b = a.NUMBER_FORMATS;
		return function(a, c, d) {
			return t(c) && (c = b.CURRENCY_SYM), t(d) && (d = b.PATTERNS[1].maxFrac), null == a ? a : Jc(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, d).replace(/\u00A4/g, c)
		}
	}
	function Ic(a) {
		var b = a.NUMBER_FORMATS;
		return function(a, c) {
			return null == a ? a : Jc(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c)
		}
	}
	function Jc(a, b, c, d, e) {
		if (v(a)) return "";
		var f = 0 > a;
		a = Math.abs(a);
		var g = a === 1 / 0;
		if (!g && !isFinite(a)) return "";
		var h = a + "",
			i = "",
			j = !1,
			k = [];
		if (g && (i = "∞"), !g && -1 !== h.indexOf("e")) {
			var l = h.match(/([\d\.]+)e(-?)(\d+)/);
			l && "-" == l[2] && l[3] > e + 1 ? a = 0 : (i = h, j = !0)
		}
		if (g || j) e > 0 && 1 > a && (i = a.toFixed(e), a = parseFloat(i));
		else {
			var m = (h.split(ef)[1] || "").length;
			t(e) && (e = Math.min(Math.max(b.minFrac, m), b.maxFrac)), a = +(Math.round(+(a.toString() + "e" + e)).toString() + "e" + -e);
			var n = ("" + a).split(ef),
				o = n[0];
			n = n[1] || "";
			var p, q = 0,
				r = b.lgSize,
				s = b.gSize;
			if (o.length >= r + s) for (q = o.length - r, p = 0; q > p; p++)(q - p) % s === 0 && 0 !== p && (i += c), i += o.charAt(p);
			for (p = q; p < o.length; p++)(o.length - p) % r === 0 && 0 !== p && (i += c), i += o.charAt(p);
			for (; n.length < e;) n += "0";
			e && "0" !== e && (i += d + n.substr(0, e))
		}
		return 0 === a && (f = !1), k.push(f ? b.negPre : b.posPre, i, f ? b.negSuf : b.posSuf), k.join("")
	}
	function Kc(a, b, c) {
		var d = "";
		for (0 > a && (d = "-", a = -a), a = "" + a; a.length < b;) a = "0" + a;
		return c && (a = a.substr(a.length - b)), d + a
	}
	function Lc(a, b, c, d) {
		return c = c || 0, function(e) {
			var f = e["get" + a]();
			return (c > 0 || f > -c) && (f += c), 0 === f && -12 == c && (f = 12), Kc(f, b, d)
		}
	}
	function Mc(a, b) {
		return function(c, d) {
			var e = c["get" + a](),
				f = td(b ? "SHORT" + a : a);
			return d[f][e]
		}
	}
	function Nc(a, b, c) {
		var d = -1 * c,
			e = d >= 0 ? "+" : "";
		return e += Kc(Math[d > 0 ? "floor" : "ceil"](d / 60), 2) + Kc(Math.abs(d % 60), 2)
	}
	function Oc(a) {
		var b = new Date(a, 0, 1).getDay();
		return new Date(a, 0, (4 >= b ? 5 : 12) - b)
	}
	function Pc(a) {
		return new Date(a.getFullYear(), a.getMonth(), a.getDate() + (4 - a.getDay()))
	}
	function Qc(a) {
		return function(b) {
			var c = Oc(b.getFullYear()),
				d = Pc(b),
				e = +d - +c,
				f = 1 + Math.round(e / 6048e5);
			return Kc(f, a)
		}
	}
	function Rc(a, b) {
		return a.getHours() < 12 ? b.AMPMS[0] : b.AMPMS[1]
	}
	function Sc(a, b) {
		return a.getFullYear() <= 0 ? b.ERAS[0] : b.ERAS[1]
	}
	function Tc(a, b) {
		return a.getFullYear() <= 0 ? b.ERANAMES[0] : b.ERANAMES[1]
	}
	function Uc(a) {
		function b(a) {
			var b;
			if (b = a.match(c)) {
				var d = new Date(0),
					e = 0,
					f = 0,
					g = b[8] ? d.setUTCFullYear : d.setFullYear,
					h = b[8] ? d.setUTCHours : d.setHours;
				b[9] && (e = n(b[9] + b[10]), f = n(b[9] + b[11])), g.call(d, n(b[1]), n(b[2]) - 1, n(b[3]));
				var i = n(b[4] || 0) - e,
					j = n(b[5] || 0) - f,
					k = n(b[6] || 0),
					l = Math.round(1e3 * parseFloat("0." + (b[7] || 0)));
				return h.call(d, i, j, k, l), d
			}
			return a
		}
		var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
		return function(c, d, e) {
			var g, h, i = "",
				j = [];
			if (d = d || "mediumDate", d = a.DATETIME_FORMATS[d] || d, x(c) && (c = hf.test(c) ? n(c) : b(c)), y(c) && (c = new Date(c)), !z(c) || !isFinite(c.getTime())) return c;
			for (; d;) h = gf.exec(d), h ? (j = R(j, h, 1), d = j.pop()) : (j.push(d), d = null);
			var k = c.getTimezoneOffset();
			return e && (k = X(e, c.getTimezoneOffset()), c = Z(c, e, !0)), f(j, function(b) {
				g = ff[b], i += g ? g(c, a.DATETIME_FORMATS, k) : b.replace(/(^'|'$)/g, "").replace(/''/g, "'")
			}), i
		}
	}
	function Vc() {
		return function(a, b) {
			return t(b) && (b = 2), V(a, b)
		}
	}
	function Wc() {
		return function(a, b, c) {
			return b = Math.abs(Number(b)) === 1 / 0 ? Number(b) : n(b), isNaN(b) ? a : (y(a) && (a = a.toString()), Jd(a) || x(a) ? (c = !c || isNaN(c) ? 0 : n(c), c = 0 > c && c >= -a.length ? a.length + c : c, b >= 0 ? a.slice(c, c + b) : 0 === c ? a.slice(b, a.length) : a.slice(Math.max(0, c + b), c)) : a)
		}
	}
	function Xc(a) {
		function b(b, c) {
			return c = c ? -1 : 1, b.map(function(b) {
				var d = 1,
					e = q;
				if (A(b)) e = b;
				else if (x(b) && (("+" == b.charAt(0) || "-" == b.charAt(0)) && (d = "-" == b.charAt(0) ? -1 : 1, b = b.substring(1)), "" !== b && (e = a(b), e.constant))) {
					var f = e();
					e = function(a) {
						return a[f]
					}
				}
				return {
					get: e,
					descending: d * c
				}
			})
		}
		function c(a) {
			switch (typeof a) {
			case "number":
			case "boolean":
			case "string":
				return !0;
			default:
				return !1
			}
		}
		function d(a, b) {
			return "function" == typeof a.valueOf && (a = a.valueOf(), c(a)) ? a : s(a) && (a = a.toString(), c(a)) ? a : b
		}
		function f(a, b) {
			var c = typeof a;
			return null === a ? (c = "string", a = "null") : "string" === c ? a = a.toLowerCase() : "object" === c && (a = d(a, b)), {
				value: a,
				type: c
			}
		}
		function g(a, b) {
			var c = 0;
			return a.type === b.type ? a.value !== b.value && (c = a.value < b.value ? -1 : 1) : c = a.type < b.type ? -1 : 1, c
		}
		return function(a, c, d) {
			function h(a, b) {
				return {
					value: a,
					predicateValues: j.map(function(c) {
						return f(c.get(a), b)
					})
				}
			}
			function i(a, b) {
				for (var c = 0, d = 0, e = j.length; e > d && !(c = g(a.predicateValues[d], b.predicateValues[d]) * j[d].descending); ++d);
				return c
			}
			if (!e(a)) return a;
			Jd(c) || (c = [c]), 0 === c.length && (c = ["+"]);
			var j = b(c, d);
			j.push({
				get: function() {
					return {}
				},
				descending: d ? -1 : 1
			});
			var k = Array.prototype.map.call(a, h);
			return k.sort(i), a = k.map(function(a) {
				return a.value
			})
		}
	}
	function Yc(a) {
		return A(a) && (a = {
			link: a
		}), a.restrict = a.restrict || "AC", r(a)
	}
	function Zc(a, b) {
		a.$name = b
	}
	function $c(a, b, d, e, g) {
		var h = this,
			i = [],
			j = h.$$parentForm = a.parent().controller("form") || nf;
		h.$error = {}, h.$$success = {}, h.$pending = c, h.$name = g(b.name || b.ngForm || "")(d), h.$dirty = !1, h.$pristine = !0, h.$valid = !0, h.$invalid = !1, h.$submitted = !1, j.$addControl(h), h.$rollbackViewValue = function() {
			f(i, function(a) {
				a.$rollbackViewValue()
			})
		}, h.$commitViewValue = function() {
			f(i, function(a) {
				a.$commitViewValue()
			})
		}, h.$addControl = function(a) {
			na(a.$name, "input"), i.push(a), a.$name && (h[a.$name] = a)
		}, h.$$renameControl = function(a, b) {
			var c = a.$name;
			h[c] === a && delete h[c], h[b] = a, a.$name = b
		}, h.$removeControl = function(a) {
			a.$name && h[a.$name] === a && delete h[a.$name], f(h.$pending, function(b, c) {
				h.$setValidity(c, null, a)
			}), f(h.$error, function(b, c) {
				h.$setValidity(c, null, a)
			}), f(h.$$success, function(b, c) {
				h.$setValidity(c, null, a)
			}), N(i, a)
		}, nd({
			ctrl: this,
			$element: a,
			set: function(a, b, c) {
				var d = a[b];
				if (d) {
					var e = d.indexOf(c); - 1 === e && d.push(c)
				} else a[b] = [c]
			},
			unset: function(a, b, c) {
				var d = a[b];
				d && (N(d, c), 0 === d.length && delete a[b])
			},
			parentForm: j,
			$animate: e
		}), h.$setDirty = function() {
			e.removeClass(a, Xf), e.addClass(a, Yf), h.$dirty = !0, h.$pristine = !1, j.$setDirty()
		}, h.$setPristine = function() {
			e.setClass(a, Xf, Yf + " " + of), h.$dirty = !1, h.$pristine = !0, h.$submitted = !1, f(i, function(a) {
				a.$setPristine()
			})
		}, h.$setUntouched = function() {
			f(i, function(a) {
				a.$setUntouched()
			})
		}, h.$setSubmitted = function() {
			e.addClass(a, of), h.$submitted = !0, j.$setSubmitted()
		}
	}
	function _c(a) {
		a.$formatters.push(function(b) {
			return a.$isEmpty(b) ? b : b.toString()
		})
	}
	function ad(a, b, c, d, e, f) {
		bd(a, b, c, d, e, f), _c(d)
	}
	function bd(a, b, c, d, e, f) {
		var g = rd(b[0].type);
		if (!e.android) {
			var h = !1;
			b.on("compositionstart", function(a) {
				h = !0
			}), b.on("compositionend", function() {
				h = !1, i()
			})
		}
		var i = function(a) {
				if (j && (f.defer.cancel(j), j = null), !h) {
					var e = b.val(),
						i = a && a.type;
					"password" === g || c.ngTrim && "false" === c.ngTrim || (e = Ld(e)), (d.$viewValue !== e || "" === e && d.$$hasNativeValidators) && d.$setViewValue(e, i)
				}
			};
		if (e.hasEvent("input")) b.on("input", i);
		else {
			var j, k = function(a, b, c) {
					j || (j = f.defer(function() {
						j = null, b && b.value === c || i(a)
					}))
				};
			b.on("keydown", function(a) {
				var b = a.keyCode;
				91 === b || b > 15 && 19 > b || b >= 37 && 40 >= b || k(a, this, this.value)
			}), e.hasEvent("paste") && b.on("paste cut", k)
		}
		b.on("change", i), d.$render = function() {
			var a = d.$isEmpty(d.$viewValue) ? "" : d.$viewValue;
			b.val() !== a && b.val(a)
		}
	}
	function cd(a, b) {
		if (z(a)) return a;
		if (x(a)) {
			yf.lastIndex = 0;
			var c = yf.exec(a);
			if (c) {
				var d = +c[1],
					e = +c[2],
					f = 0,
					g = 0,
					h = 0,
					i = 0,
					j = Oc(d),
					k = 7 * (e - 1);
				return b && (f = b.getHours(), g = b.getMinutes(), h = b.getSeconds(), i = b.getMilliseconds()), new Date(d, 0, j.getDate() + k, f, g, h, i)
			}
		}
		return NaN
	}
	function dd(a, b) {
		return function(c, d) {
			var e, g;
			if (z(c)) return c;
			if (x(c)) {
				if ('"' == c.charAt(0) && '"' == c.charAt(c.length - 1) && (c = c.substring(1, c.length - 1)), sf.test(c)) return new Date(c);
				if (a.lastIndex = 0, e = a.exec(c)) return e.shift(), g = d ? {
					yyyy: d.getFullYear(),
					MM: d.getMonth() + 1,
					dd: d.getDate(),
					HH: d.getHours(),
					mm: d.getMinutes(),
					ss: d.getSeconds(),
					sss: d.getMilliseconds() / 1e3
				} : {
					yyyy: 1970,
					MM: 1,
					dd: 1,
					HH: 0,
					mm: 0,
					ss: 0,
					sss: 0
				}, f(e, function(a, c) {
					c < b.length && (g[b[c]] = +a)
				}), new Date(g.yyyy, g.MM - 1, g.dd, g.HH, g.mm, g.ss || 0, 1e3 * g.sss || 0)
			}
			return NaN
		}
	}
	function ed(a, b, d, e) {
		return function(f, g, h, i, j, k, l) {
			function m(a) {
				return a && !(a.getTime && a.getTime() !== a.getTime())
			}
			function n(a) {
				return u(a) ? z(a) ? a : d(a) : c
			}
			fd(f, g, h, i), bd(f, g, h, i, j, k);
			var o, p = i && i.$options && i.$options.timezone;
			if (i.$$parserName = a, i.$parsers.push(function(a) {
				if (i.$isEmpty(a)) return null;
				if (b.test(a)) {
					var e = d(a, o);
					return p && (e = Z(e, p)), e
				}
				return c
			}), i.$formatters.push(function(a) {
				if (a && !z(a)) throw ag("datefmt", "Expected `{0}` to be a date", a);
				return m(a) ? (o = a, o && p && (o = Z(o, p, !0)), l("date")(a, e, p)) : (o = null, "")
			}), u(h.min) || h.ngMin) {
				var q;
				i.$validators.min = function(a) {
					return !m(a) || t(q) || d(a) >= q
				}, h.$observe("min", function(a) {
					q = n(a), i.$validate()
				})
			}
			if (u(h.max) || h.ngMax) {
				var r;
				i.$validators.max = function(a) {
					return !m(a) || t(r) || d(a) <= r
				}, h.$observe("max", function(a) {
					r = n(a), i.$validate()
				})
			}
		}
	}
	function fd(a, b, d, e) {
		var f = b[0],
			g = e.$$hasNativeValidators = v(f.validity);
		g && e.$parsers.push(function(a) {
			var d = b.prop(qd) || {};
			return d.badInput && !d.typeMismatch ? c : a
		})
	}
	function gd(a, b, d, e, f, g) {
		if (fd(a, b, d, e), bd(a, b, d, e, f, g), e.$$parserName = "number", e.$parsers.push(function(a) {
			return e.$isEmpty(a) ? null : vf.test(a) ? parseFloat(a) : c
		}), e.$formatters.push(function(a) {
			if (!e.$isEmpty(a)) {
				if (!y(a)) throw ag("numfmt", "Expected `{0}` to be a number", a);
				a = a.toString()
			}
			return a
		}), u(d.min) || d.ngMin) {
			var h;
			e.$validators.min = function(a) {
				return e.$isEmpty(a) || t(h) || a >= h
			}, d.$observe("min", function(a) {
				u(a) && !y(a) && (a = parseFloat(a, 10)), h = y(a) && !isNaN(a) ? a : c, e.$validate()
			})
		}
		if (u(d.max) || d.ngMax) {
			var i;
			e.$validators.max = function(a) {
				return e.$isEmpty(a) || t(i) || i >= a
			}, d.$observe("max", function(a) {
				u(a) && !y(a) && (a = parseFloat(a, 10)), i = y(a) && !isNaN(a) ? a : c, e.$validate()
			})
		}
	}
	function hd(a, b, c, d, e, f) {
		bd(a, b, c, d, e, f), _c(d), d.$$parserName = "url", d.$validators.url = function(a, b) {
			var c = a || b;
			return d.$isEmpty(c) || tf.test(c)
		}
	}
	function id(a, b, c, d, e, f) {
		bd(a, b, c, d, e, f), _c(d), d.$$parserName = "email", d.$validators.email = function(a, b) {
			var c = a || b;
			return d.$isEmpty(c) || uf.test(c)
		}
	}
	function jd(a, b, c, d) {
		t(c.name) && b.attr("name", i());
		var e = function(a) {
				b[0].checked && d.$setViewValue(c.value, a && a.type)
			};
		b.on("click", e), d.$render = function() {
			var a = c.value;
			b[0].checked = a == d.$viewValue
		}, c.$observe("value", d.$render)
	}
	function kd(a, b, c, d, e) {
		var f;
		if (u(d)) {
			if (f = a(d), !f.constant) throw ag("constexpr", "Expected constant expression for `{0}`, but saw `{1}`.", c, d);
			return f(b)
		}
		return e
	}
	function ld(a, b, c, d, e, f, g, h) {
		var i = kd(h, a, "ngTrueValue", c.ngTrueValue, !0),
			j = kd(h, a, "ngFalseValue", c.ngFalseValue, !1),
			k = function(a) {
				d.$setViewValue(b[0].checked, a && a.type)
			};
		b.on("click", k), d.$render = function() {
			b[0].checked = d.$viewValue
		}, d.$isEmpty = function(a) {
			return a === !1
		}, d.$formatters.push(function(a) {
			return Q(a, i)
		}), d.$parsers.push(function(a) {
			return a ? i : j
		})
	}
	function md(a, b) {
		return a = "ngClass" + a, ["$animate", function(c) {
			function d(a, b) {
				var c = [];
				a: for (var d = 0; d < a.length; d++) {
					for (var e = a[d], f = 0; f < b.length; f++) if (e == b[f]) continue a;
					c.push(e)
				}
				return c
			}
			function e(a) {
				var b = [];
				return Jd(a) ? (f(a, function(a) {
					b = b.concat(e(a))
				}), b) : x(a) ? a.split(" ") : v(a) ? (f(a, function(a, c) {
					a && (b = b.concat(c.split(" ")))
				}), b) : a
			}
			return {
				restrict: "AC",
				link: function(g, h, i) {
					function j(a) {
						var b = l(a, 1);
						i.$addClass(b)
					}
					function k(a) {
						var b = l(a, -1);
						i.$removeClass(b)
					}
					function l(a, b) {
						var c = h.data("$classCounts") || qa(),
							d = [];
						return f(a, function(a) {
							(b > 0 || c[a]) && (c[a] = (c[a] || 0) + b, c[a] === +(b > 0) && d.push(a))
						}), h.data("$classCounts", c), d.join(" ")
					}
					function m(a, b) {
						var e = d(b, a),
							f = d(a, b);
						e = l(e, 1), f = l(f, -1), e && e.length && c.addClass(h, e), f && f.length && c.removeClass(h, f)
					}
					function n(a) {
						if (b === !0 || g.$index % 2 === b) {
							var c = e(a || []);
							if (o) {
								if (!Q(a, o)) {
									var d = e(o);
									m(d, c)
								}
							} else j(c)
						}
						o = P(a)
					}
					var o;
					g.$watch(i[a], n, !0), i.$observe("class", function(b) {
						n(g.$eval(i[a]))
					}), "ngClass" !== a && g.$watch("$index", function(c, d) {
						var f = 1 & c;
						if (f !== (1 & d)) {
							var h = e(g.$eval(i[a]));
							f === b ? j(h) : k(h)
						}
					})
				}
			}
		}]
	}
	function nd(a) {
		function b(a, b, i) {
			b === c ? d("$pending", a, i) : e("$pending", a, i), H(b) ? b ? (l(h.$error, a, i), k(h.$$success, a, i)) : (k(h.$error, a, i), l(h.$$success, a, i)) : (l(h.$error, a, i), l(h.$$success, a, i)), h.$pending ? (f(_f, !0), h.$valid = h.$invalid = c, g("", null)) : (f(_f, !1), h.$valid = od(h.$error), h.$invalid = !h.$valid, g("", h.$valid));
			var j;
			j = h.$pending && h.$pending[a] ? c : h.$error[a] ? !1 : h.$$success[a] ? !0 : null, g(a, j), m.$setValidity(a, j, h)
		}
		function d(a, b, c) {
			h[a] || (h[a] = {}), k(h[a], b, c)
		}
		function e(a, b, d) {
			h[a] && l(h[a], b, d), od(h[a]) && (h[a] = c)
		}
		function f(a, b) {
			b && !j[a] ? (n.addClass(i, a), j[a] = !0) : !b && j[a] && (n.removeClass(i, a), j[a] = !1)
		}
		function g(a, b) {
			a = a ? "-" + ja(a, "-") : "", f(Vf + a, b === !0), f(Wf + a, b === !1)
		}
		var h = a.ctrl,
			i = a.$element,
			j = {},
			k = a.set,
			l = a.unset,
			m = a.parentForm,
			n = a.$animate;
		j[Wf] = !(j[Vf] = i.hasClass(Vf)), h.$setValidity = b
	}
	function od(a) {
		if (a) for (var b in a) if (a.hasOwnProperty(b)) return !1;
		return !0
	}
	var pd = /^\/(.+)\/([a-z]*)$/,
		qd = "validity",
		rd = function(a) {
			return x(a) ? a.toLowerCase() : a
		},
		sd = Object.prototype.hasOwnProperty,
		td = function(a) {
			return x(a) ? a.toUpperCase() : a
		},
		ud = function(a) {
			return x(a) ? a.replace(/[A-Z]/g, function(a) {
				return String.fromCharCode(32 | a.charCodeAt(0))
			}) : a
		},
		vd = function(a) {
			return x(a) ? a.replace(/[a-z]/g, function(a) {
				return String.fromCharCode(-33 & a.charCodeAt(0))
			}) : a
		};
	"i" !== "I".toLowerCase() && (rd = ud, td = vd);
	var wd, xd, yd, zd, Ad = [].slice,
		Bd = [].splice,
		Cd = [].push,
		Dd = Object.prototype.toString,
		Ed = Object.getPrototypeOf,
		Fd = d("ng"),
		Gd = a.angular || (a.angular = {}),
		Hd = 0;
	wd = b.documentMode, p.$inject = [], q.$inject = [];
	var Id, Jd = Array.isArray,
		Kd = /^\[object (Uint8(Clamped)?)|(Uint16)|(Uint32)|(Int8)|(Int16)|(Int32)|(Float(32)|(64))Array\]$/,
		Ld = function(a) {
			return x(a) ? a.trim() : a
		},
		Md = function(a) {
			return a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
		},
		Nd = function() {
			function a() {
				try {
					return new Function(""), !1
				} catch (a) {
					return !0
				}
			}
			if (!u(Nd.rules)) {
				var c = b.querySelector("[ng-csp]") || b.querySelector("[data-ng-csp]");
				if (c) {
					var d = c.getAttribute("ng-csp") || c.getAttribute("data-ng-csp");
					Nd.rules = {
						noUnsafeEval: !d || -1 !== d.indexOf("no-unsafe-eval"),
						noInlineStyle: !d || -1 !== d.indexOf("no-inline-style")
					}
				} else Nd.rules = {
					noUnsafeEval: a(),
					noInlineStyle: !1
				}
			}
			return Nd.rules
		},
		Od = function() {
			if (u(Od.name_)) return Od.name_;
			var a, c, d, e, f = Pd.length;
			for (c = 0; f > c; ++c) if (d = Pd[c], a = b.querySelector("[" + d.replace(":", "\\:") + "jq]")) {
				e = a.getAttribute(d + "jq");
				break
			}
			return Od.name_ = e
		},
		Pd = ["ng-", "data-ng-", "ng:", "x-ng-"],
		Qd = /[A-Z]/g,
		Rd = !1,
		Sd = 1,
		Td = 2,
		Ud = 3,
		Vd = 8,
		Wd = 9,
		Xd = 11,
		Yd = {
			full: "1.4.4",
			major: 1,
			minor: 4,
			dot: 4,
			codeName: "pylon-requirement"
		};
	Ca.expando = "ng339";
	var Zd = Ca.cache = {},
		$d = 1,
		_d = function(a, b, c) {
			a.addEventListener(b, c, !1)
		},
		ae = function(a, b, c) {
			a.removeEventListener(b, c, !1)
		};
	Ca._data = function(a) {
		return this.cache[a[this.expando]] || {}
	};
	var be = /([\:\-\_]+(.))/g,
		ce = /^moz([A-Z])/,
		de = {
			mouseleave: "mouseout",
			mouseenter: "mouseover"
		},
		ee = d("jqLite"),
		fe = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		ge = /<|&#?\w+;/,
		he = /<([\w:]+)/,
		ie = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		je = {
			option: [1, '<select multiple="multiple">', "</select>"],
			thead: [1, "<table>", "</table>"],
			col: [2, "<table><colgroup>", "</colgroup></table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: [0, "", ""]
		};
	je.optgroup = je.option, je.tbody = je.tfoot = je.colgroup = je.caption = je.thead, je.th = je.td;
	var ke = Ca.prototype = {
		ready: function(c) {
			function d() {
				e || (e = !0, c())
			}
			var e = !1;
			"complete" === b.readyState ? setTimeout(d) : (this.on("DOMContentLoaded", d), Ca(a).on("load", d))
		},
		toString: function() {
			var a = [];
			return f(this, function(b) {
				a.push("" + b)
			}), "[" + a.join(", ") + "]"
		},
		eq: function(a) {
			return xd(a >= 0 ? this[a] : this[this.length + a])
		},
		length: 0,
		push: Cd,
		sort: [].sort,
		splice: [].splice
	},
		le = {};
	f("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(a) {
		le[rd(a)] = a
	});
	var me = {};
	f("input,select,option,textarea,button,form,details".split(","), function(a) {
		me[a] = !0
	});
	var ne = {
		ngMinlength: "minlength",
		ngMaxlength: "maxlength",
		ngMin: "min",
		ngMax: "max",
		ngPattern: "pattern"
	};
	f({
		data: Ia,
		removeData: Ga,
		hasData: za
	}, function(a, b) {
		Ca[b] = a
	}), f({
		data: Ia,
		inheritedData: Oa,
		scope: function(a) {
			return xd.data(a, "$scope") || Oa(a.parentNode || a, ["$isolateScope", "$scope"])
		},
		isolateScope: function(a) {
			return xd.data(a, "$isolateScope") || xd.data(a, "$isolateScopeNoTemplate")
		},
		controller: Na,
		injector: function(a) {
			return Oa(a, "$injector")
		},
		removeAttr: function(a, b) {
			a.removeAttribute(b)
		},
		hasClass: Ja,
		css: function(a, b, c) {
			return b = wa(b), u(c) ? void(a.style[b] = c) : a.style[b]
		},
		attr: function(a, b, d) {
			var e = a.nodeType;
			if (e !== Ud && e !== Td && e !== Vd) {
				var f = rd(b);
				if (le[f]) {
					if (!u(d)) return a[b] || (a.attributes.getNamedItem(b) || p).specified ? f : c;
					d ? (a[b] = !0, a.setAttribute(b, f)) : (a[b] = !1, a.removeAttribute(f))
				} else if (u(d)) a.setAttribute(b, d);
				else if (a.getAttribute) {
					var g = a.getAttribute(b, 2);
					return null === g ? c : g
				}
			}
		},
		prop: function(a, b, c) {
			return u(c) ? void(a[b] = c) : a[b]
		},
		text: function() {
			function a(a, b) {
				if (t(b)) {
					var c = a.nodeType;
					return c === Sd || c === Ud ? a.textContent : ""
				}
				a.textContent = b
			}
			return a.$dv = "", a
		}(),
		val: function(a, b) {
			if (t(b)) {
				if (a.multiple && "select" === M(a)) {
					var c = [];
					return f(a.options, function(a) {
						a.selected && c.push(a.value || a.text)
					}), 0 === c.length ? null : c
				}
				return a.value
			}
			a.value = b
		},
		html: function(a, b) {
			return t(b) ? a.innerHTML : (Ea(a, !0), void(a.innerHTML = b))
		},
		empty: Pa
	}, function(a, b) {
		Ca.prototype[b] = function(b, d) {
			var e, f, g = this.length;
			if (a !== Pa && (2 == a.length && a !== Ja && a !== Na ? b : d) === c) {
				if (v(b)) {
					for (e = 0; g > e; e++) if (a === Ia) a(this[e], b);
					else for (f in b) a(this[e], f, b[f]);
					return this
				}
				for (var h = a.$dv, i = h === c ? Math.min(g, 1) : g, j = 0; i > j; j++) {
					var k = a(this[j], b, d);
					h = h ? h + k : k
				}
				return h
			}
			for (e = 0; g > e; e++) a(this[e], b, d);
			return this
		}
	}), f({
		removeData: Ga,
		on: function Eg(a, b, c, d) {
			if (u(d)) throw ee("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
			if (ya(a)) {
				var e = Ha(a, !0),
					f = e.events,
					g = e.handle;
				g || (g = e.handle = Ua(a, f));
				for (var h = b.indexOf(" ") >= 0 ? b.split(" ") : [b], i = h.length; i--;) {
					b = h[i];
					var j = f[b];
					j || (f[b] = [], "mouseenter" === b || "mouseleave" === b ? Eg(a, de[b], function(a) {
						var c = this,
							d = a.relatedTarget;
						(!d || d !== c && !c.contains(d)) && g(a, b)
					}) : "$destroy" !== b && _d(a, b, g), j = f[b]), j.push(c)
				}
			}
		},
		off: Fa,
		one: function(a, b, c) {
			a = xd(a), a.on(b, function d() {
				a.off(b, c), a.off(b, d)
			}), a.on(b, c)
		},
		replaceWith: function(a, b) {
			var c, d = a.parentNode;
			Ea(a), f(new Ca(b), function(b) {
				c ? d.insertBefore(b, c.nextSibling) : d.replaceChild(b, a), c = b
			})
		},
		children: function(a) {
			var b = [];
			return f(a.childNodes, function(a) {
				a.nodeType === Sd && b.push(a)
			}), b
		},
		contents: function(a) {
			return a.contentDocument || a.childNodes || []
		},
		append: function(a, b) {
			var c = a.nodeType;
			if (c === Sd || c === Xd) {
				b = new Ca(b);
				for (var d = 0, e = b.length; e > d; d++) {
					var f = b[d];
					a.appendChild(f)
				}
			}
		},
		prepend: function(a, b) {
			if (a.nodeType === Sd) {
				var c = a.firstChild;
				f(new Ca(b), function(b) {
					a.insertBefore(b, c)
				})
			}
		},
		wrap: function(a, b) {
			b = xd(b).eq(0).clone()[0];
			var c = a.parentNode;
			c && c.replaceChild(b, a), b.appendChild(a)
		},
		remove: Qa,
		detach: function(a) {
			Qa(a, !0)
		},
		after: function(a, b) {
			var c = a,
				d = a.parentNode;
			b = new Ca(b);
			for (var e = 0, f = b.length; f > e; e++) {
				var g = b[e];
				d.insertBefore(g, c.nextSibling), c = g
			}
		},
		addClass: La,
		removeClass: Ka,
		toggleClass: function(a, b, c) {
			b && f(b.split(" "), function(b) {
				var d = c;
				t(d) && (d = !Ja(a, b)), (d ? La : Ka)(a, b)
			})
		},
		parent: function(a) {
			var b = a.parentNode;
			return b && b.nodeType !== Xd ? b : null
		},
		next: function(a) {
			return a.nextElementSibling
		},
		find: function(a, b) {
			return a.getElementsByTagName ? a.getElementsByTagName(b) : []
		},
		clone: Da,
		triggerHandler: function(a, b, c) {
			var d, e, g, h = b.type || b,
				i = Ha(a),
				j = i && i.events,
				k = j && j[h];
			k && (d = {
				preventDefault: function() {
					this.defaultPrevented = !0
				},
				isDefaultPrevented: function() {
					return this.defaultPrevented === !0
				},
				stopImmediatePropagation: function() {
					this.immediatePropagationStopped = !0
				},
				isImmediatePropagationStopped: function() {
					return this.immediatePropagationStopped === !0
				},
				stopPropagation: p,
				type: h,
				target: a
			}, b.type && (d = l(d, b)), e = P(k), g = c ? [d].concat(c) : [d], f(e, function(b) {
				d.isImmediatePropagationStopped() || b.apply(a, g)
			}))
		}
	}, function(a, b) {
		Ca.prototype[b] = function(b, c, d) {
			for (var e, f = 0, g = this.length; g > f; f++) t(e) ? (e = a(this[f], b, c, d), u(e) && (e = xd(e))) : Ma(e, a(this[f], b, c, d));
			return u(e) ? e : this
		}, Ca.prototype.bind = Ca.prototype.on, Ca.prototype.unbind = Ca.prototype.off
	}), Xa.prototype = {
		put: function(a, b) {
			this[Wa(a, this.nextUid)] = b
		},
		get: function(a) {
			return this[Wa(a, this.nextUid)]
		},
		remove: function(a) {
			var b = this[a = Wa(a, this.nextUid)];
			return delete this[a], b
		}
	};
	var oe = [function() {
		this.$get = [function() {
			return Xa
		}]
	}],
		pe = /^[^\(]*\(\s*([^\)]*)\)/m,
		qe = /,/,
		re = /^\s*(_?)(\S+?)\1\s*$/,
		se = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
		te = d("$injector");
	$a.$$annotate = Za;
	var ue = d("$animate"),
		ve = 1,
		we = "ng-animate",
		xe = function() {
			this.$get = ["$q", "$$rAF", function(a, b) {
				function c() {}
				return c.all = p, c.chain = p, c.prototype = {
					end: p,
					cancel: p,
					resume: p,
					pause: p,
					complete: p,
					then: function(c, d) {
						return a(function(a) {
							b(function() {
								a()
							})
						}).then(c, d)
					}
				}, c
			}]
		},
		ye = function() {
			var a = new Xa,
				b = [];
			this.$get = ["$$AnimateRunner", "$rootScope", function(c, d) {
				function e(c, e, g) {
					var h = a.get(c);
					h || (a.put(c, h = {}), b.push(c));
					var i = function(a, b) {
							var c = !1;
							return a && (a = x(a) ? a.split(" ") : Jd(a) ? a : [], f(a, function(a) {
								a && (c = !0, h[a] = b)
							})), c
						},
						j = i(e, !0),
						k = i(g, !1);
					!j && !k || b.length > 1 || d.$$postDigest(function() {
						f(b, function(b) {
							var c = a.get(b);
							if (c) {
								var d = cb(b.attr("class")),
									e = "",
									g = "";
								f(c, function(a, b) {
									var c = !! d[b];
									a !== c && (a ? e += (e.length ? " " : "") + b : g += (g.length ? " " : "") + b)
								}), f(b, function(a) {
									e && La(a, e), g && Ka(a, g)
								}), a.remove(b)
							}
						}), b.length = 0
					})
				}
				return {
					enabled: p,
					on: p,
					off: p,
					pin: p,
					push: function(a, b, d, f) {
						return f && f(), d = d || {}, d.from && a.css(d.from), d.to && a.css(d.to), (d.addClass || d.removeClass) && e(a, d.addClass, d.removeClass), new c
					}
				}
			}]
		},
		ze = ["$provide", function(a) {
			var b = this;
			this.$$registeredAnimations = Object.create(null), this.register = function(c, d) {
				if (c && "." !== c.charAt(0)) throw ue("notcsel", "Expecting class selector starting with '.' got '{0}'.", c);
				var e = c + "-animation";
				b.$$registeredAnimations[c.substr(1)] = e, a.factory(e, d)
			}, this.classNameFilter = function(a) {
				if (1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null, this.$$classNameFilter)) {
					var b = new RegExp("(\\s+|\\/)" + we + "(\\s+|\\/)");
					if (b.test(this.$$classNameFilter.toString())) throw ue("nongcls", '$animateProvider.classNameFilter(regex) prohibits accepting a regex value which matches/contains the "{0}" CSS class.', we)
				}
				return this.$$classNameFilter
			}, this.$get = ["$$animateQueue", function(a) {
				function b(a, b, c) {
					if (c) {
						var d = bb(c);
						!d || d.parentNode || d.previousElementSibling || (c = null)
					}
					c ? c.after(a) : b.prepend(a)
				}
				return {
					on: a.on,
					off: a.off,
					pin: a.pin,
					enabled: a.enabled,
					cancel: function(a) {
						a.end && a.end()
					},
					enter: function(c, d, e, f) {
						return d = d && xd(d), e = e && xd(e), d = d || e.parent(), b(c, d, e), a.push(c, "enter", db(f))
					},
					move: function(c, d, e, f) {
						return d = d && xd(d), e = e && xd(e), d = d || e.parent(), b(c, d, e), a.push(c, "move", db(f))
					},
					leave: function(b, c) {
						return a.push(b, "leave", db(c), function() {
							b.remove()
						})
					},
					addClass: function(b, c, d) {
						return d = db(d), d.addClass = ab(d.addclass, c), a.push(b, "addClass", d)
					},
					removeClass: function(b, c, d) {
						return d = db(d), d.removeClass = ab(d.removeClass, c), a.push(b, "removeClass", d)
					},
					setClass: function(b, c, d, e) {
						return e = db(e), e.addClass = ab(e.addClass, c), e.removeClass = ab(e.removeClass, d), a.push(b, "setClass", e)
					},
					animate: function(b, c, d, e, f) {
						return f = db(f), f.from = f.from ? l(f.from, c) : c, f.to = f.to ? l(f.to, d) : d, e = e || "ng-inline-animate", f.tempClasses = ab(f.tempClasses, e), a.push(b, "animate", f)
					}
				}
			}]
		}],
		Ae = function() {
			this.$get = ["$$rAF", "$q", function(a, b) {
				var c = function() {};
				return c.prototype = {
					done: function(a) {
						this.defer && this.defer[a === !0 ? "reject" : "resolve"]()
					},
					end: function() {
						this.done()
					},
					cancel: function() {
						this.done(!0)
					},
					getPromise: function() {
						return this.defer || (this.defer = b.defer()), this.defer.promise
					},
					then: function(a, b) {
						return this.getPromise().then(a, b)
					},
					"catch": function(a) {
						return this.getPromise()["catch"](a)
					},
					"finally": function(a) {
						return this.getPromise()["finally"](a)
					}
				}, function(b, d) {
					function e() {
						return a(function() {
							f(), g || h.done(), g = !0
						}), h
					}
					function f() {
						d.addClass && (b.addClass(d.addClass), d.addClass = null), d.removeClass && (b.removeClass(d.removeClass), d.removeClass = null), d.to && (b.css(d.to), d.to = null)
					}
					d.from && (b.css(d.from), d.from = null);
					var g, h = new c;
					return {
						start: e,
						end: e
					}
				}
			}]
		},
		Be = d("$compile");
	ib.$inject = ["$provide", "$$sanitizeUriProvider"];
	var Ce = /^((?:x|data)[\:\-_])/i,
		De = d("$controller"),
		Ee = /^(\S+)(\s+as\s+(\w+))?$/,
		Fe = function() {
			this.$get = ["$document", function(a) {
				return function(b) {
					return b ? !b.nodeType && b instanceof xd && (b = b[0]) : b = a[0].body, b.offsetWidth + 1
				}
			}]
		},
		Ge = "application/json",
		He = {
			"Content-Type": Ge + ";charset=utf-8"
		},
		Ie = /^\[|^\{(?!\{)/,
		Je = {
			"[": /]$/,
			"{": /}$/
		},
		Ke = /^\)\]\}',?\n/,
		Le = d("$http"),
		Me = function(a) {
			return function() {
				throw Le("legacy", "The method `{0}` on the promise returned from `$http` has been disabled.", a)
			}
		},
		Ne = Gd.$interpolateMinErr = d("$interpolate");
	Ne.throwNoconcat = function(a) {
		throw Ne("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", a)
	}, Ne.interr = function(a, b) {
		return Ne("interr", "Can't interpolate: {0}\n{1}", a, b.toString())
	};
	var Oe = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
		Pe = {
			http: 80,
			https: 443,
			ftp: 21
		},
		Qe = d("$location"),
		Re = {
			$$html5: !1,
			$$replace: !1,
			absUrl: Qb("$$absUrl"),
			url: function(a) {
				if (t(a)) return this.$$url;
				var b = Oe.exec(a);
				return (b[1] || "" === a) && this.path(decodeURIComponent(b[1])), (b[2] || b[1] || "" === a) && this.search(b[3] || ""), this.hash(b[5] || ""), this
			},
			protocol: Qb("$$protocol"),
			host: Qb("$$host"),
			port: Qb("$$port"),
			path: Rb("$$path", function(a) {
				return a = null !== a ? a.toString() : "", "/" == a.charAt(0) ? a : "/" + a
			}),
			search: function(a, b) {
				switch (arguments.length) {
				case 0:
					return this.$$search;
				case 1:
					if (x(a) || y(a)) a = a.toString(), this.$$search = aa(a);
					else {
						if (!v(a)) throw Qe("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
						a = O(a, {}), f(a, function(b, c) {
							null == b && delete a[c]
						}), this.$$search = a
					}
					break;
				default:
					t(b) || null === b ? delete this.$$search[a] : this.$$search[a] = b
				}
				return this.$$compose(), this
			},
			hash: Rb("$$hash", function(a) {
				return null !== a ? a.toString() : ""
			}),
			replace: function() {
				return this.$$replace = !0, this
			}
		};
	f([Pb, Ob, Nb], function(a) {
		a.prototype = Object.create(Re), a.prototype.state = function(b) {
			if (!arguments.length) return this.$$state;
			if (a !== Nb || !this.$$html5) throw Qe("nostate", "History API state support is available only in HTML5 mode and only in browsers supporting HTML5 History API");
			return this.$$state = t(b) ? null : b, this
		}
	});
	var Se = d("$parse"),
		Te = Function.prototype.call,
		Ue = Function.prototype.apply,
		Ve = Function.prototype.bind,
		We = qa();
	f("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function(a) {
		We[a] = !0
	});
	var Xe = {
		n: "\n",
		f: "\f",
		r: "\r",
		t: "	",
		v: "\x0B",
		"'": "'",
		'"': '"'
	},
		Ye = function(a) {
			this.options = a
		};
	Ye.prototype = {
		constructor: Ye,
		lex: function(a) {
			for (this.text = a, this.index = 0, this.tokens = []; this.index < this.text.length;) {
				var b = this.text.charAt(this.index);
				if ('"' === b || "'" === b) this.readString(b);
				else if (this.isNumber(b) || "." === b && this.isNumber(this.peek())) this.readNumber();
				else if (this.isIdent(b)) this.readIdent();
				else if (this.is(b, "(){}[].,;:?")) this.tokens.push({
					index: this.index,
					text: b
				}), this.index++;
				else if (this.isWhitespace(b)) this.index++;
				else {
					var c = b + this.peek(),
						d = c + this.peek(2),
						e = We[b],
						f = We[c],
						g = We[d];
					if (e || f || g) {
						var h = g ? d : f ? c : b;
						this.tokens.push({
							index: this.index,
							text: h,
							operator: !0
						}), this.index += h.length
					} else this.throwError("Unexpected next character ", this.index, this.index + 1)
				}
			}
			return this.tokens
		},
		is: function(a, b) {
			return -1 !== b.indexOf(a)
		},
		peek: function(a) {
			var b = a || 1;
			return this.index + b < this.text.length ? this.text.charAt(this.index + b) : !1
		},
		isNumber: function(a) {
			return a >= "0" && "9" >= a && "string" == typeof a
		},
		isWhitespace: function(a) {
			return " " === a || "\r" === a || "	" === a || "\n" === a || "\x0B" === a || " " === a
		},
		isIdent: function(a) {
			return a >= "a" && "z" >= a || a >= "A" && "Z" >= a || "_" === a || "$" === a
		},
		isExpOperator: function(a) {
			return "-" === a || "+" === a || this.isNumber(a)
		},
		throwError: function(a, b, c) {
			c = c || this.index;
			var d = u(b) ? "s " + b + "-" + this.index + " [" + this.text.substring(b, c) + "]" : " " + c;
			throw Se("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", a, d, this.text)
		},
		readNumber: function() {
			for (var a = "", b = this.index; this.index < this.text.length;) {
				var c = rd(this.text.charAt(this.index));
				if ("." == c || this.isNumber(c)) a += c;
				else {
					var d = this.peek();
					if ("e" == c && this.isExpOperator(d)) a += c;
					else if (this.isExpOperator(c) && d && this.isNumber(d) && "e" == a.charAt(a.length - 1)) a += c;
					else {
						if (!this.isExpOperator(c) || d && this.isNumber(d) || "e" != a.charAt(a.length - 1)) break;
						this.throwError("Invalid exponent")
					}
				}
				this.index++
			}
			this.tokens.push({
				index: b,
				text: a,
				constant: !0,
				value: Number(a)
			})
		},
		readIdent: function() {
			for (var a = this.index; this.index < this.text.length;) {
				var b = this.text.charAt(this.index);
				if (!this.isIdent(b) && !this.isNumber(b)) break;
				this.index++
			}
			this.tokens.push({
				index: a,
				text: this.text.slice(a, this.index),
				identifier: !0
			})
		},
		readString: function(a) {
			var b = this.index;
			this.index++;
			for (var c = "", d = a, e = !1; this.index < this.text.length;) {
				var f = this.text.charAt(this.index);
				if (d += f, e) {
					if ("u" === f) {
						var g = this.text.substring(this.index + 1, this.index + 5);
						g.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + g + "]"), this.index += 4, c += String.fromCharCode(parseInt(g, 16))
					} else {
						var h = Xe[f];
						c += h || f
					}
					e = !1
				} else if ("\\" === f) e = !0;
				else {
					if (f === a) return this.index++, void this.tokens.push({
						index: b,
						text: d,
						constant: !0,
						value: c
					});
					c += f
				}
				this.index++
			}
			this.throwError("Unterminated quote", b)
		}
	};
	var Ze = function(a, b) {
			this.lexer = a, this.options = b
		};
	Ze.Program = "Program", Ze.ExpressionStatement = "ExpressionStatement", Ze.AssignmentExpression = "AssignmentExpression", Ze.ConditionalExpression = "ConditionalExpression", Ze.LogicalExpression = "LogicalExpression", Ze.BinaryExpression = "BinaryExpression", Ze.UnaryExpression = "UnaryExpression", Ze.CallExpression = "CallExpression", Ze.MemberExpression = "MemberExpression", Ze.Identifier = "Identifier", Ze.Literal = "Literal", Ze.ArrayExpression = "ArrayExpression", Ze.Property = "Property", Ze.ObjectExpression = "ObjectExpression", Ze.ThisExpression = "ThisExpression", Ze.NGValueParameter = "NGValueParameter", Ze.prototype = {
		ast: function(a) {
			this.text = a, this.tokens = this.lexer.lex(a);
			var b = this.program();
			return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), b
		},
		program: function() {
			for (var a = [];;) if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && a.push(this.expressionStatement()), !this.expect(";")) return {
				type: Ze.Program,
				body: a
			}
		},
		expressionStatement: function() {
			return {
				type: Ze.ExpressionStatement,
				expression: this.filterChain()
			}
		},
		filterChain: function() {
			for (var a, b = this.expression(); a = this.expect("|");) b = this.filter(b);
			return b
		},
		expression: function() {
			return this.assignment()
		},
		assignment: function() {
			var a = this.ternary();
			return this.expect("=") && (a = {
				type: Ze.AssignmentExpression,
				left: a,
				right: this.assignment(),
				operator: "="
			}), a
		},
		ternary: function() {
			var a, b, c = this.logicalOR();
			return this.expect("?") && (a = this.expression(), this.consume(":")) ? (b = this.expression(), {
				type: Ze.ConditionalExpression,
				test: c,
				alternate: a,
				consequent: b
			}) : c
		},
		logicalOR: function() {
			for (var a = this.logicalAND(); this.expect("||");) a = {
				type: Ze.LogicalExpression,
				operator: "||",
				left: a,
				right: this.logicalAND()
			};
			return a
		},
		logicalAND: function() {
			for (var a = this.equality(); this.expect("&&");) a = {
				type: Ze.LogicalExpression,
				operator: "&&",
				left: a,
				right: this.equality()
			};
			return a
		},
		equality: function() {
			for (var a, b = this.relational(); a = this.expect("==", "!=", "===", "!==");) b = {
				type: Ze.BinaryExpression,
				operator: a.text,
				left: b,
				right: this.relational()
			};
			return b
		},
		relational: function() {
			for (var a, b = this.additive(); a = this.expect("<", ">", "<=", ">=");) b = {
				type: Ze.BinaryExpression,
				operator: a.text,
				left: b,
				right: this.additive()
			};
			return b
		},
		additive: function() {
			for (var a, b = this.multiplicative(); a = this.expect("+", "-");) b = {
				type: Ze.BinaryExpression,
				operator: a.text,
				left: b,
				right: this.multiplicative()
			};
			return b
		},
		multiplicative: function() {
			for (var a, b = this.unary(); a = this.expect("*", "/", "%");) b = {
				type: Ze.BinaryExpression,
				operator: a.text,
				left: b,
				right: this.unary()
			};
			return b
		},
		unary: function() {
			var a;
			return (a = this.expect("+", "-", "!")) ? {
				type: Ze.UnaryExpression,
				operator: a.text,
				prefix: !0,
				argument: this.unary()
			} : this.primary()
		},
		primary: function() {
			var a;
			this.expect("(") ? (a = this.filterChain(), this.consume(")")) : this.expect("[") ? a = this.arrayDeclaration() : this.expect("{") ? a = this.object() : this.constants.hasOwnProperty(this.peek().text) ? a = O(this.constants[this.consume().text]) : this.peek().identifier ? a = this.identifier() : this.peek().constant ? a = this.constant() : this.throwError("not a primary expression", this.peek());
			for (var b; b = this.expect("(", "[", ".");)"(" === b.text ? (a = {
				type: Ze.CallExpression,
				callee: a,
				arguments: this.parseArguments()
			}, this.consume(")")) : "[" === b.text ? (a = {
				type: Ze.MemberExpression,
				object: a,
				property: this.expression(),
				computed: !0
			}, this.consume("]")) : "." === b.text ? a = {
				type: Ze.MemberExpression,
				object: a,
				property: this.identifier(),
				computed: !1
			} : this.throwError("IMPOSSIBLE");
			return a
		},
		filter: function(a) {
			for (var b = [a], c = {
				type: Ze.CallExpression,
				callee: this.identifier(),
				arguments: b,
				filter: !0
			}; this.expect(":");) b.push(this.expression());
			return c
		},
		parseArguments: function() {
			var a = [];
			if (")" !== this.peekToken().text) do a.push(this.expression());
			while (this.expect(","));
			return a
		},
		identifier: function() {
			var a = this.consume();
			return a.identifier || this.throwError("is not a valid identifier", a), {
				type: Ze.Identifier,
				name: a.text
			}
		},
		constant: function() {
			return {
				type: Ze.Literal,
				value: this.consume().value
			}
		},
		arrayDeclaration: function() {
			var a = [];
			if ("]" !== this.peekToken().text) do {
				if (this.peek("]")) break;
				a.push(this.expression())
			} while (this.expect(","));
			return this.consume("]"), {
				type: Ze.ArrayExpression,
				elements: a
			}
		},
		object: function() {
			var a, b = [];
			if ("}" !== this.peekToken().text) do {
				if (this.peek("}")) break;
				a = {
					type: Ze.Property,
					kind: "init"
				}, this.peek().constant ? a.key = this.constant() : this.peek().identifier ? a.key = this.identifier() : this.throwError("invalid key", this.peek()), this.consume(":"), a.value = this.expression(), b.push(a)
			} while (this.expect(","));
			return this.consume("}"), {
				type: Ze.ObjectExpression,
				properties: b
			}
		},
		throwError: function(a, b) {
			throw Se("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", b.text, a, b.index + 1, this.text, this.text.substring(b.index))
		},
		consume: function(a) {
			if (0 === this.tokens.length) throw Se("ueoe", "Unexpected end of expression: {0}", this.text);
			var b = this.expect(a);
			return b || this.throwError("is unexpected, expecting [" + a + "]", this.peek()), b
		},
		peekToken: function() {
			if (0 === this.tokens.length) throw Se("ueoe", "Unexpected end of expression: {0}", this.text);
			return this.tokens[0]
		},
		peek: function(a, b, c, d) {
			return this.peekAhead(0, a, b, c, d)
		},
		peekAhead: function(a, b, c, d, e) {
			if (this.tokens.length > a) {
				var f = this.tokens[a],
					g = f.text;
				if (g === b || g === c || g === d || g === e || !b && !c && !d && !e) return f
			}
			return !1
		},
		expect: function(a, b, c, d) {
			var e = this.peek(a, b, c, d);
			return e ? (this.tokens.shift(), e) : !1
		},
		constants: {
			"true": {
				type: Ze.Literal,
				value: !0
			},
			"false": {
				type: Ze.Literal,
				value: !1
			},
			"null": {
				type: Ze.Literal,
				value: null
			},
			undefined: {
				type: Ze.Literal,
				value: c
			},
			"this": {
				type: Ze.ThisExpression
			}
		}
	}, ec.prototype = {
		compile: function(a, b) {
			var d = this,
				e = this.astBuilder.ast(a);
			this.state = {
				nextId: 0,
				filters: {},
				expensiveChecks: b,
				fn: {
					vars: [],
					body: [],
					own: {}
				},
				assign: {
					vars: [],
					body: [],
					own: {}
				},
				inputs: []
			}, $b(e, d.$filter);
			var g, h = "";
			if (this.stage = "assign", g = bc(e)) {
				this.state.computing = "assign";
				var i = this.nextId();
				this.recurse(g, i), h = "fn.assign=" + this.generateFunction("assign", "s,v,l")
			}
			var j = _b(e.body);
			d.stage = "inputs", f(j, function(a, b) {
				var c = "fn" + b;
				d.state[c] = {
					vars: [],
					body: [],
					own: {}
				}, d.state.computing = c;
				var e = d.nextId();
				d.recurse(a, e), d.return_(e), d.state.inputs.push(c), a.watchId = b
			}), this.state.computing = "fn", this.stage = "main", this.recurse(e);
			var k = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + h + this.watchFns() + "return fn;",
				l = new Function("$filter", "ensureSafeMemberName", "ensureSafeObject", "ensureSafeFunction", "ifDefined", "plus", "text", k)(this.$filter, Ub, Vb, Wb, Xb, Yb, a);
			return this.state = this.stage = c, l.literal = cc(e), l.constant = dc(e), l
		},
		USE: "use",
		STRICT: "strict",
		watchFns: function() {
			var a = [],
				b = this.state.inputs,
				c = this;
			return f(b, function(b) {
				a.push("var " + b + "=" + c.generateFunction(b, "s"))
			}), b.length && a.push("fn.inputs=[" + b.join(",") + "];"), a.join("")
		},
		generateFunction: function(a, b) {
			return "function(" + b + "){" + this.varsPrefix(a) + this.body(a) + "};"
		},
		filterPrefix: function() {
			var a = [],
				b = this;
			return f(this.state.filters, function(c, d) {
				a.push(c + "=$filter(" + b.escape(d) + ")")
			}), a.length ? "var " + a.join(",") + ";" : ""
		},
		varsPrefix: function(a) {
			return this.state[a].vars.length ? "var " + this.state[a].vars.join(",") + ";" : ""
		},
		body: function(a) {
			return this.state[a].body.join("")
		},
		recurse: function(a, b, d, e, g, h) {
			var i, j, k, l, m = this;
			if (e = e || p, !h && u(a.watchId)) return b = b || this.nextId(), void this.if_("i", this.lazyAssign(b, this.computedMember("i", a.watchId)), this.lazyRecurse(a, b, d, e, g, !0));
			switch (a.type) {
			case Ze.Program:
				f(a.body, function(b, d) {
					m.recurse(b.expression, c, c, function(a) {
						j = a
					}), d !== a.body.length - 1 ? m.current().body.push(j, ";") : m.return_(j)
				});
				break;
			case Ze.Literal:
				l = this.escape(a.value), this.assign(b, l), e(l);
				break;
			case Ze.UnaryExpression:
				this.recurse(a.argument, c, c, function(a) {
					j = a
				}), l = a.operator + "(" + this.ifDefined(j, 0) + ")", this.assign(b, l), e(l);
				break;
			case Ze.BinaryExpression:
				this.recurse(a.left, c, c, function(a) {
					i = a
				}), this.recurse(a.right, c, c, function(a) {
					j = a
				}), l = "+" === a.operator ? this.plus(i, j) : "-" === a.operator ? this.ifDefined(i, 0) + a.operator + this.ifDefined(j, 0) : "(" + i + ")" + a.operator + "(" + j + ")", this.assign(b, l), e(l);
				break;
			case Ze.LogicalExpression:
				b = b || this.nextId(), m.recurse(a.left, b), m.if_("&&" === a.operator ? b : m.not(b), m.lazyRecurse(a.right, b)), e(b);
				break;
			case Ze.ConditionalExpression:
				b = b || this.nextId(), m.recurse(a.test, b), m.if_(b, m.lazyRecurse(a.alternate, b), m.lazyRecurse(a.consequent, b)), e(b);
				break;
			case Ze.Identifier:
				b = b || this.nextId(), d && (d.context = "inputs" === m.stage ? "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", a.name) + "?l:s"), d.computed = !1, d.name = a.name), Ub(a.name), m.if_("inputs" === m.stage || m.not(m.getHasOwnProperty("l", a.name)), function() {
					m.if_("inputs" === m.stage || "s", function() {
						g && 1 !== g && m.if_(m.not(m.nonComputedMember("s", a.name)), m.lazyAssign(m.nonComputedMember("s", a.name), "{}")), m.assign(b, m.nonComputedMember("s", a.name))
					})
				}, b && m.lazyAssign(b, m.nonComputedMember("l", a.name))), (m.state.expensiveChecks || gc(a.name)) && m.addEnsureSafeObject(b), e(b);
				break;
			case Ze.MemberExpression:
				i = d && (d.context = this.nextId()) || this.nextId(), b = b || this.nextId(), m.recurse(a.object, i, c, function() {
					m.if_(m.notNull(i), function() {
						a.computed ? (j = m.nextId(), m.recurse(a.property, j), m.addEnsureSafeMemberName(j), g && 1 !== g && m.if_(m.not(m.computedMember(i, j)), m.lazyAssign(m.computedMember(i, j), "{}")), l = m.ensureSafeObject(m.computedMember(i, j)), m.assign(b, l), d && (d.computed = !0, d.name = j)) : (Ub(a.property.name), g && 1 !== g && m.if_(m.not(m.nonComputedMember(i, a.property.name)), m.lazyAssign(m.nonComputedMember(i, a.property.name), "{}")), l = m.nonComputedMember(i, a.property.name), (m.state.expensiveChecks || gc(a.property.name)) && (l = m.ensureSafeObject(l)), m.assign(b, l), d && (d.computed = !1, d.name = a.property.name))
					}, function() {
						m.assign(b, "undefined")
					}), e(b)
				}, !! g);
				break;
			case Ze.CallExpression:
				b = b || this.nextId(), a.filter ? (j = m.filter(a.callee.name), k = [], f(a.arguments, function(a) {
					var b = m.nextId();
					m.recurse(a, b), k.push(b)
				}), l = j + "(" + k.join(",") + ")", m.assign(b, l), e(b)) : (j = m.nextId(), i = {}, k = [], m.recurse(a.callee, j, i, function() {
					m.if_(m.notNull(j), function() {
						m.addEnsureSafeFunction(j), f(a.arguments, function(a) {
							m.recurse(a, m.nextId(), c, function(a) {
								k.push(m.ensureSafeObject(a))
							})
						}), i.name ? (m.state.expensiveChecks || m.addEnsureSafeObject(i.context), l = m.member(i.context, i.name, i.computed) + "(" + k.join(",") + ")") : l = j + "(" + k.join(",") + ")", l = m.ensureSafeObject(l), m.assign(b, l)
					}, function() {
						m.assign(b, "undefined")
					}), e(b)
				}));
				break;
			case Ze.AssignmentExpression:
				if (j = this.nextId(), i = {}, !ac(a.left)) throw Se("lval", "Trying to assing a value to a non l-value");
				this.recurse(a.left, c, i, function() {
					m.if_(m.notNull(i.context), function() {
						m.recurse(a.right, j), m.addEnsureSafeObject(m.member(i.context, i.name, i.computed)), l = m.member(i.context, i.name, i.computed) + a.operator + j, m.assign(b, l), e(b || l)
					})
				}, 1);
				break;
			case Ze.ArrayExpression:
				k = [], f(a.elements, function(a) {
					m.recurse(a, m.nextId(), c, function(a) {
						k.push(a)
					})
				}), l = "[" + k.join(",") + "]", this.assign(b, l), e(l);
				break;
			case Ze.ObjectExpression:
				k = [], f(a.properties, function(a) {
					m.recurse(a.value, m.nextId(), c, function(b) {
						k.push(m.escape(a.key.type === Ze.Identifier ? a.key.name : "" + a.key.value) + ":" + b)
					})
				}), l = "{" + k.join(",") + "}", this.assign(b, l), e(l);
				break;
			case Ze.ThisExpression:
				this.assign(b, "s"), e("s");
				break;
			case Ze.NGValueParameter:
				this.assign(b, "v"), e("v")
			}
		},
		getHasOwnProperty: function(a, b) {
			var c = a + "." + b,
				d = this.current().own;
			return d.hasOwnProperty(c) || (d[c] = this.nextId(!1, a + "&&(" + this.escape(b) + " in " + a + ")")), d[c]
		},
		assign: function(a, b) {
			return a ? (this.current().body.push(a, "=", b, ";"), a) : void 0
		},
		filter: function(a) {
			return this.state.filters.hasOwnProperty(a) || (this.state.filters[a] = this.nextId(!0)), this.state.filters[a]
		},
		ifDefined: function(a, b) {
			return "ifDefined(" + a + "," + this.escape(b) + ")"
		},
		plus: function(a, b) {
			return "plus(" + a + "," + b + ")"
		},
		return_: function(a) {
			this.current().body.push("return ", a, ";")
		},
		if_: function(a, b, c) {
			if (a === !0) b();
			else {
				var d = this.current().body;
				d.push("if(", a, "){"), b(), d.push("}"), c && (d.push("else{"), c(), d.push("}"))
			}
		},
		not: function(a) {
			return "!(" + a + ")"
		},
		notNull: function(a) {
			return a + "!=null"
		},
		nonComputedMember: function(a, b) {
			return a + "." + b
		},
		computedMember: function(a, b) {
			return a + "[" + b + "]"
		},
		member: function(a, b, c) {
			return c ? this.computedMember(a, b) : this.nonComputedMember(a, b)
		},
		addEnsureSafeObject: function(a) {
			this.current().body.push(this.ensureSafeObject(a), ";")
		},
		addEnsureSafeMemberName: function(a) {
			this.current().body.push(this.ensureSafeMemberName(a), ";")
		},
		addEnsureSafeFunction: function(a) {
			this.current().body.push(this.ensureSafeFunction(a), ";")
		},
		ensureSafeObject: function(a) {
			return "ensureSafeObject(" + a + ",text)"
		},
		ensureSafeMemberName: function(a) {
			return "ensureSafeMemberName(" + a + ",text)"
		},
		ensureSafeFunction: function(a) {
			return "ensureSafeFunction(" + a + ",text)"
		},
		lazyRecurse: function(a, b, c, d, e, f) {
			var g = this;
			return function() {
				g.recurse(a, b, c, d, e, f)
			}
		},
		lazyAssign: function(a, b) {
			var c = this;
			return function() {
				c.assign(a, b)
			}
		},
		stringEscapeRegex: /[^ a-zA-Z0-9]/g,
		stringEscapeFn: function(a) {
			return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
		},
		escape: function(a) {
			if (x(a)) return "'" + a.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";
			if (y(a)) return a.toString();
			if (a === !0) return "true";
			if (a === !1) return "false";
			if (null === a) return "null";
			if ("undefined" == typeof a) return "undefined";
			throw Se("esc", "IMPOSSIBLE")
		},
		nextId: function(a, b) {
			var c = "v" + this.state.nextId++;
			return a || this.current().vars.push(c + (b ? "=" + b : "")), c
		},
		current: function() {
			return this.state[this.state.computing]
		}
	}, fc.prototype = {
		compile: function(a, b) {
			var c = this,
				d = this.astBuilder.ast(a);
			this.expression = a, this.expensiveChecks = b, $b(d, c.$filter);
			var e, g;
			(e = bc(d)) && (g = this.recurse(e));
			var h, i = _b(d.body);
			i && (h = [], f(i, function(a, b) {
				var d = c.recurse(a);
				a.input = d, h.push(d), a.watchId = b
			}));
			var j = [];
			f(d.body, function(a) {
				j.push(c.recurse(a.expression))
			});
			var k = 0 === d.body.length ?
			function() {} : 1 === d.body.length ? j[0] : function(a, b) {
				var c;
				return f(j, function(d) {
					c = d(a, b)
				}), c
			};
			return g && (k.assign = function(a, b, c) {
				return g(a, c, b)
			}), h && (k.inputs = h), k.literal = cc(d), k.constant = dc(d), k
		},
		recurse: function(a, b, d) {
			var e, g, h, i = this;
			if (a.input) return this.inputs(a.input, a.watchId);
			switch (a.type) {
			case Ze.Literal:
				return this.value(a.value, b);
			case Ze.UnaryExpression:
				return g = this.recurse(a.argument), this["unary" + a.operator](g, b);
			case Ze.BinaryExpression:
				return e = this.recurse(a.left), g = this.recurse(a.right), this["binary" + a.operator](e, g, b);
			case Ze.LogicalExpression:
				return e = this.recurse(a.left), g = this.recurse(a.right), this["binary" + a.operator](e, g, b);
			case Ze.ConditionalExpression:
				return this["ternary?:"](this.recurse(a.test), this.recurse(a.alternate), this.recurse(a.consequent), b);
			case Ze.Identifier:
				return Ub(a.name, i.expression), i.identifier(a.name, i.expensiveChecks || gc(a.name), b, d, i.expression);
			case Ze.MemberExpression:
				return e = this.recurse(a.object, !1, !! d), a.computed || (Ub(a.property.name, i.expression), g = a.property.name), a.computed && (g = this.recurse(a.property)), a.computed ? this.computedMember(e, g, b, d, i.expression) : this.nonComputedMember(e, g, i.expensiveChecks, b, d, i.expression);
			case Ze.CallExpression:
				return h = [], f(a.arguments, function(a) {
					h.push(i.recurse(a))
				}), a.filter && (g = this.$filter(a.callee.name)), a.filter || (g = this.recurse(a.callee, !0)), a.filter ?
				function(a, d, e, f) {
					for (var i = [], j = 0; j < h.length; ++j) i.push(h[j](a, d, e, f));
					var k = g.apply(c, i, f);
					return b ? {
						context: c,
						name: c,
						value: k
					} : k
				} : function(a, c, d, e) {
					var f, j = g(a, c, d, e);
					if (null != j.value) {
						Vb(j.context, i.expression), Wb(j.value, i.expression);
						for (var k = [], l = 0; l < h.length; ++l) k.push(Vb(h[l](a, c, d, e), i.expression));
						f = Vb(j.value.apply(j.context, k), i.expression)
					}
					return b ? {
						value: f
					} : f
				};
			case Ze.AssignmentExpression:
				return e = this.recurse(a.left, !0, 1), g = this.recurse(a.right), function(a, c, d, f) {
					var h = e(a, c, d, f),
						j = g(a, c, d, f);
					return Vb(h.value, i.expression), h.context[h.name] = j, b ? {
						value: j
					} : j
				};
			case Ze.ArrayExpression:
				return h = [], f(a.elements, function(a) {
					h.push(i.recurse(a))
				}), function(a, c, d, e) {
					for (var f = [], g = 0; g < h.length; ++g) f.push(h[g](a, c, d, e));
					return b ? {
						value: f
					} : f
				};
			case Ze.ObjectExpression:
				return h = [], f(a.properties, function(a) {
					h.push({
						key: a.key.type === Ze.Identifier ? a.key.name : "" + a.key.value,
						value: i.recurse(a.value)
					})
				}), function(a, c, d, e) {
					for (var f = {}, g = 0; g < h.length; ++g) f[h[g].key] = h[g].value(a, c, d, e);
					return b ? {
						value: f
					} : f
				};
			case Ze.ThisExpression:
				return function(a) {
					return b ? {
						value: a
					} : a
				};
			case Ze.NGValueParameter:
				return function(a, c, d, e) {
					return b ? {
						value: d
					} : d
				}
			}
		},
		"unary+": function(a, b) {
			return function(c, d, e, f) {
				var g = a(c, d, e, f);
				return g = u(g) ? +g : 0, b ? {
					value: g
				} : g
			}
		},
		"unary-": function(a, b) {
			return function(c, d, e, f) {
				var g = a(c, d, e, f);
				return g = u(g) ? -g : 0, b ? {
					value: g
				} : g
			}
		},
		"unary!": function(a, b) {
			return function(c, d, e, f) {
				var g = !a(c, d, e, f);
				return b ? {
					value: g
				} : g
			}
		},
		"binary+": function(a, b, c) {
			return function(d, e, f, g) {
				var h = a(d, e, f, g),
					i = b(d, e, f, g),
					j = Yb(h, i);
				return c ? {
					value: j
				} : j
			}
		},
		"binary-": function(a, b, c) {
			return function(d, e, f, g) {
				var h = a(d, e, f, g),
					i = b(d, e, f, g),
					j = (u(h) ? h : 0) - (u(i) ? i : 0);
				return c ? {
					value: j
				} : j
			}
		},
		"binary*": function(a, b, c) {
			return function(d, e, f, g) {
				var h = a(d, e, f, g) * b(d, e, f, g);
				return c ? {
					value: h
				} : h
			}
		},
		"binary/": function(a, b, c) {
			return function(d, e, f, g) {
				var h = a(d, e, f, g) / b(d, e, f, g);
				return c ? {
					value: h
				} : h
			}
		},
		"binary%": function(a, b, c) {
			return function(d, e, f, g) {
				var h = a(d, e, f, g) % b(d, e, f, g);
				return c ? {
					value: h
				} : h
			}
		},
		"binary===": function(a, b, c) {
			return function(d, e, f, g) {
				var h = a(d, e, f, g) === b(d, e, f, g);
				return c ? {
					value: h
				} : h
			}
		},
		"binary!==": function(a, b, c) {
			return function(d, e, f, g) {
				var h = a(d, e, f, g) !== b(d, e, f, g);
				return c ? {
					value: h
				} : h
			}
		},
		"binary==": function(a, b, c) {
			return function(d, e, f, g) {
				var h = a(d, e, f, g) == b(d, e, f, g);
				return c ? {
					value: h
				} : h
			}
		},
		"binary!=": function(a, b, c) {
			return function(d, e, f, g) {
				var h = a(d, e, f, g) != b(d, e, f, g);
				return c ? {
					value: h
				} : h
			}
		},
		"binary<": function(a, b, c) {
			return function(d, e, f, g) {
				var h = a(d, e, f, g) < b(d, e, f, g);
				return c ? {
					value: h
				} : h
			}
		},
		"binary>": function(a, b, c) {
			return function(d, e, f, g) {
				var h = a(d, e, f, g) > b(d, e, f, g);
				return c ? {
					value: h
				} : h
			}
		},
		"binary<=": function(a, b, c) {
			return function(d, e, f, g) {
				var h = a(d, e, f, g) <= b(d, e, f, g);
				return c ? {
					value: h
				} : h
			}
		},
		"binary>=": function(a, b, c) {
			return function(d, e, f, g) {
				var h = a(d, e, f, g) >= b(d, e, f, g);
				return c ? {
					value: h
				} : h
			}
		},
		"binary&&": function(a, b, c) {
			return function(d, e, f, g) {
				var h = a(d, e, f, g) && b(d, e, f, g);
				return c ? {
					value: h
				} : h
			}
		},
		"binary||": function(a, b, c) {
			return function(d, e, f, g) {
				var h = a(d, e, f, g) || b(d, e, f, g);
				return c ? {
					value: h
				} : h
			}
		},
		"ternary?:": function(a, b, c, d) {
			return function(e, f, g, h) {
				var i = a(e, f, g, h) ? b(e, f, g, h) : c(e, f, g, h);
				return d ? {
					value: i
				} : i
			}
		},
		value: function(a, b) {
			return function() {
				return b ? {
					context: c,
					name: c,
					value: a
				} : a
			}
		},
		identifier: function(a, b, d, e, f) {
			return function(g, h, i, j) {
				var k = h && a in h ? h : g;
				e && 1 !== e && k && !k[a] && (k[a] = {});
				var l = k ? k[a] : c;
				return b && Vb(l, f), d ? {
					context: k,
					name: a,
					value: l
				} : l
			}
		},
		computedMember: function(a, b, c, d, e) {
			return function(f, g, h, i) {
				var j, k, l = a(f, g, h, i);
				return null != l && (j = b(f, g, h, i), Ub(j, e), d && 1 !== d && l && !l[j] && (l[j] = {}), k = l[j], Vb(k, e)), c ? {
					context: l,
					name: j,
					value: k
				} : k
			}
		},
		nonComputedMember: function(a, b, d, e, f, g) {
			return function(h, i, j, k) {
				var l = a(h, i, j, k);
				f && 1 !== f && l && !l[b] && (l[b] = {});
				var m = null != l ? l[b] : c;
				return (d || gc(b)) && Vb(m, g), e ? {
					context: l,
					name: b,
					value: m
				} : m
			}
		},
		inputs: function(a, b) {
			return function(c, d, e, f) {
				return f ? f[b] : a(c, d, e)
			}
		}
	};
	var $e = function(a, b, c) {
			this.lexer = a, this.$filter = b, this.options = c, this.ast = new Ze(this.lexer), this.astCompiler = c.csp ? new fc(this.ast, b) : new ec(this.ast, b)
		};
	$e.prototype = {
		constructor: $e,
		parse: function(a) {
			return this.astCompiler.compile(a, this.options.expensiveChecks)
		}
	};
	var _e = (qa(), qa(), Object.prototype.valueOf),
		af = d("$sce"),
		bf = {
			HTML: "html",
			CSS: "css",
			URL: "url",
			RESOURCE_URL: "resourceUrl",
			JS: "js"
		},
		Be = d("$compile"),
		cf = b.createElement("a"),
		df = xc(a.location.href);
	Ac.$inject = ["$document"], Cc.$inject = ["$provide"], Hc.$inject = ["$locale"], Ic.$inject = ["$locale"];
	var ef = ".",
		ff = {
			yyyy: Lc("FullYear", 4),
			yy: Lc("FullYear", 2, 0, !0),
			y: Lc("FullYear", 1),
			MMMM: Mc("Month"),
			MMM: Mc("Month", !0),
			MM: Lc("Month", 2, 1),
			M: Lc("Month", 1, 1),
			dd: Lc("Date", 2),
			d: Lc("Date", 1),
			HH: Lc("Hours", 2),
			H: Lc("Hours", 1),
			hh: Lc("Hours", 2, -12),
			h: Lc("Hours", 1, -12),
			mm: Lc("Minutes", 2),
			m: Lc("Minutes", 1),
			ss: Lc("Seconds", 2),
			s: Lc("Seconds", 1),
			sss: Lc("Milliseconds", 3),
			EEEE: Mc("Day"),
			EEE: Mc("Day", !0),
			a: Rc,
			Z: Nc,
			ww: Qc(2),
			w: Qc(1),
			G: Sc,
			GG: Sc,
			GGG: Sc,
			GGGG: Tc
		},
		gf = /((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,
		hf = /^\-?\d+$/;
	Uc.$inject = ["$locale"];
	var jf = r(rd),
		kf = r(td);
	Xc.$inject = ["$parse"];
	var lf = r({
		restrict: "E",
		compile: function(a, b) {
			return b.href || b.xlinkHref ? void 0 : function(a, b) {
				if ("a" === b[0].nodeName.toLowerCase()) {
					var c = "[object SVGAnimatedString]" === Dd.call(b.prop("href")) ? "xlink:href" : "href";
					b.on("click", function(a) {
						b.attr(c) || a.preventDefault()
					})
				}
			}
		}
	}),
		mf = {};
	f(le, function(a, b) {
		function c(a, c, e) {
			a.$watch(e[d], function(a) {
				e.$set(b, !! a)
			})
		}
		if ("multiple" != a) {
			var d = jb("ng-" + b),
				e = c;
			"checked" === a && (e = function(a, b, e) {
				e.ngModel !== e[d] && c(a, b, e)
			}), mf[d] = function() {
				return {
					restrict: "A",
					priority: 100,
					link: e
				}
			}
		}
	}), f(ne, function(a, b) {
		mf[b] = function() {
			return {
				priority: 100,
				link: function(a, c, d) {
					if ("ngPattern" === b && "/" == d.ngPattern.charAt(0)) {
						var e = d.ngPattern.match(pd);
						if (e) return void d.$set("ngPattern", new RegExp(e[1], e[2]))
					}
					a.$watch(d[b], function(a) {
						d.$set(b, a)
					})
				}
			}
		}
	}), f(["src", "srcset", "href"], function(a) {
		var b = jb("ng-" + a);
		mf[b] = function() {
			return {
				priority: 99,
				link: function(c, d, e) {
					var f = a,
						g = a;
					"href" === a && "[object SVGAnimatedString]" === Dd.call(d.prop("href")) && (g = "xlinkHref", e.$attr[g] = "xlink:href", f = null), e.$observe(b, function(b) {
						return b ? (e.$set(g, b), void(wd && f && d.prop(f, e[g]))) : void("href" === a && e.$set(g, null))
					})
				}
			}
		}
	});
	var nf = {
		$addControl: p,
		$$renameControl: Zc,
		$removeControl: p,
		$setValidity: p,
		$setDirty: p,
		$setPristine: p,
		$setSubmitted: p
	},
		of = "ng-submitted";
	$c.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"];
	var pf = function(a) {
			return ["$timeout", "$parse", function(b, d) {
				function e(a) {
					return "" === a ? d('this[""]').assign : d(a).assign || p
				}
				var f = {
					name: "form",
					restrict: a ? "EAC" : "E",
					controller: $c,
					compile: function(d, f) {
						d.addClass(Xf).addClass(Vf);
						var g = f.name ? "name" : a && f.ngForm ? "ngForm" : !1;
						return {
							pre: function(a, d, f, h) {
								if (!("action" in f)) {
									var i = function(b) {
											a.$apply(function() {
												h.$commitViewValue(), h.$setSubmitted()
											}), b.preventDefault()
										};
									_d(d[0], "submit", i), d.on("$destroy", function() {
										b(function() {
											ae(d[0], "submit", i)
										}, 0, !1)
									})
								}
								var j = h.$$parentForm,
									k = g ? e(h.$name) : p;
								g && (k(a, h), f.$observe(g, function(b) {
									h.$name !== b && (k(a, c), j.$$renameControl(h, b), (k = e(h.$name))(a, h))
								})), d.on("$destroy", function() {
									j.$removeControl(h), k(a, c), l(h, nf)
								})
							}
						}
					}
				};
				return f
			}]
		},
		qf = pf(),
		rf = pf(!0),
		sf = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
		tf = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
		uf = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
		vf = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,
		wf = /^(\d{4})-(\d{2})-(\d{2})$/,
		xf = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
		yf = /^(\d{4})-W(\d\d)$/,
		zf = /^(\d{4})-(\d\d)$/,
		Af = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
		Bf = {
			text: ad,
			date: ed("date", wf, dd(wf, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"),
			"datetime-local": ed("datetimelocal", xf, dd(xf, ["yyyy", "MM", "dd", "HH", "mm", "ss", "sss"]), "yyyy-MM-ddTHH:mm:ss.sss"),
			time: ed("time", Af, dd(Af, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"),
			week: ed("week", yf, cd, "yyyy-Www"),
			month: ed("month", zf, dd(zf, ["yyyy", "MM"]), "yyyy-MM"),
			number: gd,
			url: hd,
			email: id,
			radio: jd,
			checkbox: ld,
			hidden: p,
			button: p,
			submit: p,
			reset: p,
			file: p
		},
		Cf = ["$browser", "$sniffer", "$filter", "$parse", function(a, b, c, d) {
			return {
				restrict: "E",
				require: ["?ngModel"],
				link: {
					pre: function(e, f, g, h) {
						h[0] && (Bf[rd(g.type)] || Bf.text)(e, f, g, h[0], b, a, c, d)
					}
				}
			}
		}],
		Df = /^(true|false|\d+)$/,
		Ef = function() {
			return {
				restrict: "A",
				priority: 100,
				compile: function(a, b) {
					return Df.test(b.ngValue) ?
					function(a, b, c) {
						c.$set("value", a.$eval(c.ngValue))
					} : function(a, b, c) {
						a.$watch(c.ngValue, function(a) {
							c.$set("value", a)
						})
					}
				}
			}
		},
		Ff = ["$compile", function(a) {
			return {
				restrict: "AC",
				compile: function(b) {
					return a.$$addBindingClass(b), function(b, d, e) {
						a.$$addBindingInfo(d, e.ngBind), d = d[0], b.$watch(e.ngBind, function(a) {
							d.textContent = a === c ? "" : a
						})
					}
				}
			}
		}],
		Gf = ["$interpolate", "$compile", function(a, b) {
			return {
				compile: function(d) {
					return b.$$addBindingClass(d), function(d, e, f) {
						var g = a(e.attr(f.$attr.ngBindTemplate));
						b.$$addBindingInfo(e, g.expressions), e = e[0], f.$observe("ngBindTemplate", function(a) {
							e.textContent = a === c ? "" : a
						})
					}
				}
			}
		}],
		Hf = ["$sce", "$parse", "$compile", function(a, b, c) {
			return {
				restrict: "A",
				compile: function(d, e) {
					var f = b(e.ngBindHtml),
						g = b(e.ngBindHtml, function(a) {
							return (a || "").toString()
						});
					return c.$$addBindingClass(d), function(b, d, e) {
						c.$$addBindingInfo(d, e.ngBindHtml), b.$watch(g, function() {
							d.html(a.getTrustedHtml(f(b)) || "")
						})
					}
				}
			}
		}],
		If = r({
			restrict: "A",
			require: "ngModel",
			link: function(a, b, c, d) {
				d.$viewChangeListeners.push(function() {
					a.$eval(c.ngChange)
				})
			}
		}),
		Jf = md("", !0),
		Kf = md("Odd", 0),
		Lf = md("Even", 1),
		Mf = Yc({
			compile: function(a, b) {
				b.$set("ngCloak", c), a.removeClass("ng-cloak")
			}
		}),
		Nf = [function() {
			return {
				restrict: "A",
				scope: !0,
				controller: "@",
				priority: 500
			}
		}],
		Of = {},
		Pf = {
			blur: !0,
			focus: !0
		};
	f("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(a) {
		var b = jb("ng-" + a);
		Of[b] = ["$parse", "$rootScope", function(c, d) {
			return {
				restrict: "A",
				compile: function(e, f) {
					var g = c(f[b], null, !0);
					return function(b, c) {
						c.on(a, function(c) {
							var e = function() {
									g(b, {
										$event: c
									})
								};
							Pf[a] && d.$$phase ? b.$evalAsync(e) : b.$apply(e)
						})
					}
				}
			}
		}]
	});
	var Qf = ["$animate", function(a) {
		return {
			multiElement: !0,
			transclude: "element",
			priority: 600,
			terminal: !0,
			restrict: "A",
			$$tlb: !0,
			link: function(c, d, e, f, g) {
				var h, i, j;
				c.$watch(e.ngIf, function(c) {
					c ? i || g(function(c, f) {
						i = f, c[c.length++] = b.createComment(" end ngIf: " + e.ngIf + " "), h = {
							clone: c
						}, a.enter(c, d.parent(), d)
					}) : (j && (j.remove(), j = null), i && (i.$destroy(), i = null), h && (j = pa(h.clone), a.leave(j).then(function() {
						j = null
					}), h = null))
				})
			}
		}
	}],
		Rf = ["$templateRequest", "$anchorScroll", "$animate", function(a, b, c) {
			return {
				restrict: "ECA",
				priority: 400,
				terminal: !0,
				transclude: "element",
				controller: Gd.noop,
				compile: function(d, e) {
					var f = e.ngInclude || e.src,
						g = e.onload || "",
						h = e.autoscroll;
					return function(d, e, i, j, k) {
						var l, m, n, o = 0,
							p = function() {
								m && (m.remove(), m = null), l && (l.$destroy(), l = null), n && (c.leave(n).then(function() {
									m = null
								}), m = n, n = null)
							};
						d.$watch(f, function(f) {
							var i = function() {
									!u(h) || h && !d.$eval(h) || b()
								},
								m = ++o;
							f ? (a(f, !0).then(function(a) {
								if (m === o) {
									var b = d.$new();
									j.template = a;
									var h = k(b, function(a) {
										p(), c.enter(a, null, e).then(i)
									});
									l = b, n = h, l.$emit("$includeContentLoaded", f), d.$eval(g)
								}
							}, function() {
								m === o && (p(), d.$emit("$includeContentError", f))
							}), d.$emit("$includeContentRequested", f)) : (p(), j.template = null)
						})
					}
				}
			}
		}],
		Sf = ["$compile", function(a) {
			return {
				restrict: "ECA",
				priority: -400,
				require: "ngInclude",
				link: function(c, d, e, f) {
					return /SVG/.test(d[0].toString()) ? (d.empty(), void a(Aa(f.template, b).childNodes)(c, function(a) {
						d.append(a)
					}, {
						futureParentElement: d
					})) : (d.html(f.template), void a(d.contents())(c))
				}
			}
		}],
		Tf = Yc({
			priority: 450,
			compile: function() {
				return {
					pre: function(a, b, c) {
						a.$eval(c.ngInit)
					}
				}
			}
		}),
		Uf = function() {
			return {
				restrict: "A",
				priority: 100,
				require: "ngModel",
				link: function(a, b, d, e) {
					var g = b.attr(d.$attr.ngList) || ", ",
						h = "false" !== d.ngTrim,
						i = h ? Ld(g) : g,
						j = function(a) {
							if (!t(a)) {
								var b = [];
								return a && f(a.split(i), function(a) {
									a && b.push(h ? Ld(a) : a)
								}), b
							}
						};
					e.$parsers.push(j), e.$formatters.push(function(a) {
						return Jd(a) ? a.join(g) : c
					}), e.$isEmpty = function(a) {
						return !a || !a.length
					}
				}
			}
		},
		Vf = "ng-valid",
		Wf = "ng-invalid",
		Xf = "ng-pristine",
		Yf = "ng-dirty",
		Zf = "ng-untouched",
		$f = "ng-touched",
		_f = "ng-pending",
		ag = d("ngModel"),
		bg = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function(a, b, d, e, g, h, i, j, k, l) {
			this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$$rawModelValue = c, this.$validators = {}, this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$untouched = !0, this.$touched = !1, this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, this.$pending = c, this.$name = l(d.name || "", !1)(a);
			var m, n = g(d.ngModel),
				o = n.assign,
				q = n,
				r = o,
				s = null,
				v = this;
			this.$$setOptions = function(a) {
				if (v.$options = a, a && a.getterSetter) {
					var b = g(d.ngModel + "()"),
						c = g(d.ngModel + "($$$p)");
					q = function(a) {
						var c = n(a);
						return A(c) && (c = b(a)), c
					}, r = function(a, b) {
						A(n(a)) ? c(a, {
							$$$p: v.$modelValue
						}) : o(a, v.$modelValue)
					}
				} else if (!n.assign) throw ag("nonassign", "Expression '{0}' is non-assignable. Element: {1}", d.ngModel, $(e))
			}, this.$render = p, this.$isEmpty = function(a) {
				return t(a) || "" === a || null === a || a !== a
			};
			var w = e.inheritedData("$formController") || nf,
				x = 0;
			nd({
				ctrl: this,
				$element: e,
				set: function(a, b) {
					a[b] = !0
				},
				unset: function(a, b) {
					delete a[b]
				},
				parentForm: w,
				$animate: h
			}), this.$setPristine = function() {
				v.$dirty = !1, v.$pristine = !0, h.removeClass(e, Yf), h.addClass(e, Xf)
			}, this.$setDirty = function() {
				v.$dirty = !0, v.$pristine = !1, h.removeClass(e, Xf), h.addClass(e, Yf), w.$setDirty()
			}, this.$setUntouched = function() {
				v.$touched = !1, v.$untouched = !0, h.setClass(e, Zf, $f)
			}, this.$setTouched = function() {
				v.$touched = !0, v.$untouched = !1, h.setClass(e, $f, Zf)
			}, this.$rollbackViewValue = function() {
				i.cancel(s), v.$viewValue = v.$$lastCommittedViewValue, v.$render()
			}, this.$validate = function() {
				if (!y(v.$modelValue) || !isNaN(v.$modelValue)) {
					var a = v.$$lastCommittedViewValue,
						b = v.$$rawModelValue,
						d = v.$valid,
						e = v.$modelValue,
						f = v.$options && v.$options.allowInvalid;
					v.$$runValidators(b, a, function(a) {
						f || d === a || (v.$modelValue = a ? b : c, v.$modelValue !== e && v.$$writeModelToScope())
					})
				}
			}, this.$$runValidators = function(a, b, d) {
				function e() {
					var a = v.$$parserName || "parse";
					return m !== c ? (m || (f(v.$validators, function(a, b) {
						i(b, null)
					}), f(v.$asyncValidators, function(a, b) {
						i(b, null)
					})), i(a, m), m) : (i(a, null), !0)
				}
				function g() {
					var c = !0;
					return f(v.$validators, function(d, e) {
						var f = d(a, b);
						c = c && f, i(e, f)
					}), c ? !0 : (f(v.$asyncValidators, function(a, b) {
						i(b, null)
					}), !1)
				}
				function h() {
					var d = [],
						e = !0;
					f(v.$asyncValidators, function(f, g) {
						var h = f(a, b);
						if (!I(h)) throw ag("$asyncValidators", "Expected asynchronous validator to return a promise but got '{0}' instead.", h);
						i(g, c), d.push(h.then(function() {
							i(g, !0)
						}, function(a) {
							e = !1, i(g, !1)
						}))
					}), d.length ? k.all(d).then(function() {
						j(e)
					}, p) : j(!0)
				}
				function i(a, b) {
					l === x && v.$setValidity(a, b)
				}
				function j(a) {
					l === x && d(a)
				}
				x++;
				var l = x;
				return e() && g() ? void h() : void j(!1)
			}, this.$commitViewValue = function() {
				var a = v.$viewValue;
				i.cancel(s), (v.$$lastCommittedViewValue !== a || "" === a && v.$$hasNativeValidators) && (v.$$lastCommittedViewValue = a, v.$pristine && this.$setDirty(), this.$$parseAndValidate())
			}, this.$$parseAndValidate = function() {
				function b() {
					v.$modelValue !== g && v.$$writeModelToScope()
				}
				var d = v.$$lastCommittedViewValue,
					e = d;
				if (m = t(e) ? c : !0) for (var f = 0; f < v.$parsers.length; f++) if (e = v.$parsers[f](e), t(e)) {
					m = !1;
					break
				}
				y(v.$modelValue) && isNaN(v.$modelValue) && (v.$modelValue = q(a));
				var g = v.$modelValue,
					h = v.$options && v.$options.allowInvalid;
				v.$$rawModelValue = e, h && (v.$modelValue = e, b()), v.$$runValidators(e, v.$$lastCommittedViewValue, function(a) {
					h || (v.$modelValue = a ? e : c, b())
				})
			}, this.$$writeModelToScope = function() {
				r(a, v.$modelValue), f(v.$viewChangeListeners, function(a) {
					try {
						a()
					} catch (c) {
						b(c)
					}
				})
			}, this.$setViewValue = function(a, b) {
				v.$viewValue = a, (!v.$options || v.$options.updateOnDefault) && v.$$debounceViewValueCommit(b)
			}, this.$$debounceViewValueCommit = function(b) {
				var c, d = 0,
					e = v.$options;
				e && u(e.debounce) && (c = e.debounce, y(c) ? d = c : y(c[b]) ? d = c[b] : y(c["default"]) && (d = c["default"])), i.cancel(s), d ? s = i(function() {
					v.$commitViewValue()
				}, d) : j.$$phase ? v.$commitViewValue() : a.$apply(function() {
					v.$commitViewValue()
				})
			}, a.$watch(function() {
				var b = q(a);
				if (b !== v.$modelValue && (v.$modelValue === v.$modelValue || b === b)) {
					v.$modelValue = v.$$rawModelValue = b, m = c;
					for (var d = v.$formatters, e = d.length, f = b; e--;) f = d[e](f);
					v.$viewValue !== f && (v.$viewValue = v.$$lastCommittedViewValue = f, v.$render(), v.$$runValidators(b, f, p))
				}
				return b
			})
		}],
		cg = ["$rootScope", function(a) {
			return {
				restrict: "A",
				require: ["ngModel", "^?form", "^?ngModelOptions"],
				controller: bg,
				priority: 1,
				compile: function(b) {
					return b.addClass(Xf).addClass(Zf).addClass(Vf), {
						pre: function(a, b, c, d) {
							var e = d[0],
								f = d[1] || nf;
							e.$$setOptions(d[2] && d[2].$options), f.$addControl(e), c.$observe("name", function(a) {
								e.$name !== a && f.$$renameControl(e, a)
							}), a.$on("$destroy", function() {
								f.$removeControl(e)
							})
						},
						post: function(b, c, d, e) {
							var f = e[0];
							f.$options && f.$options.updateOn && c.on(f.$options.updateOn, function(a) {
								f.$$debounceViewValueCommit(a && a.type)
							}), c.on("blur", function(c) {
								f.$touched || (a.$$phase ? b.$evalAsync(f.$setTouched) : b.$apply(f.$setTouched))
							})
						}
					}
				}
			}
		}],
		dg = /(\s+|^)default(\s+|$)/,
		eg = function() {
			return {
				restrict: "A",
				controller: ["$scope", "$attrs", function(a, b) {
					var d = this;
					this.$options = O(a.$eval(b.ngModelOptions)), this.$options.updateOn !== c ? (this.$options.updateOnDefault = !1, this.$options.updateOn = Ld(this.$options.updateOn.replace(dg, function() {
						return d.$options.updateOnDefault = !0, " "
					}))) : this.$options.updateOnDefault = !0
				}]
			}
		},
		fg = Yc({
			terminal: !0,
			priority: 1e3
		}),
		gg = d("ngOptions"),
		hg = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
		ig = ["$compile", "$parse", function(a, c) {
			function d(a, b, d) {
				function f(a, b, c, d, e) {
					this.selectValue = a, this.viewValue = b, this.label = c, this.group = d, this.disabled = e
				}
				function g(a) {
					var b;
					if (!j && e(a)) b = a;
					else {
						b = [];
						for (var c in a) a.hasOwnProperty(c) && "$" !== c.charAt(0) && b.push(c)
					}
					return b
				}
				var h = a.match(hg);
				if (!h) throw gg("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", a, $(b));
				var i = h[5] || h[7],
					j = h[6],
					k = / as /.test(h[0]) && h[1],
					l = h[9],
					m = c(h[2] ? h[1] : i),
					n = k && c(k),
					o = n || m,
					p = l && c(l),
					q = l ?
				function(a, b) {
					return p(d, b)
				} : function(a) {
					return Wa(a)
				}, r = function(a, b) {
					return q(a, x(a, b))
				}, s = c(h[2] || h[1]), t = c(h[3] || ""), u = c(h[4] || ""), v = c(h[8]), w = {}, x = j ?
				function(a, b) {
					return w[j] = b, w[i] = a, w
				} : function(a) {
					return w[i] = a, w
				};
				return {
					trackBy: l,
					getTrackByValue: r,
					getWatchables: c(v, function(a) {
						var b = [];
						a = a || [];
						for (var c = g(a), e = c.length, f = 0; e > f; f++) {
							var i = a === c ? f : c[f],
								j = (a[i], x(a[i], i)),
								k = q(a[i], j);
							if (b.push(k), h[2] || h[1]) {
								var l = s(d, j);
								b.push(l)
							}
							if (h[4]) {
								var m = u(d, j);
								b.push(m)
							}
						}
						return b
					}),
					getOptions: function() {
						for (var a = [], b = {}, c = v(d) || [], e = g(c), h = e.length, i = 0; h > i; i++) {
							var j = c === e ? i : e[i],
								k = c[j],
								m = x(k, j),
								n = o(d, m),
								p = q(n, m),
								w = s(d, m),
								y = t(d, m),
								z = u(d, m),
								A = new f(p, n, w, y, z);
							a.push(A), b[p] = A
						}
						return {
							items: a,
							selectValueMap: b,
							getOptionFromViewValue: function(a) {
								return b[r(a)]
							},
							getViewValueFromOption: function(a) {
								return l ? Gd.copy(a.viewValue) : a.viewValue
							}
						}
					}
				}
			}
			var g = b.createElement("option"),
				h = b.createElement("optgroup");
			return {
				restrict: "A",
				terminal: !0,
				require: ["select", "?ngModel"],
				link: function(b, c, e, i) {
					function j(a, b) {
						a.element = b, b.disabled = a.disabled, a.value !== b.value && (b.value = a.selectValue), a.label !== b.label && (b.label = a.label, b.textContent = a.label)
					}
					function k(a, b, c, d) {
						var e;
						return b && rd(b.nodeName) === c ? e = b : (e = d.cloneNode(!1), b ? a.insertBefore(e, b) : a.appendChild(e)), e
					}
					function l(a) {
						for (var b; a;) b = a.nextSibling, Qa(a), a = b
					}
					function m(a) {
						var b = p && p[0],
							c = w && w[0];
						if (b || c) for (; a && (a === b || a === c);) a = a.nextSibling;
						return a
					}
					function n() {
						var a = x && q.readValue();
						x = y.getOptions();
						var b = {},
							d = c[0].firstChild;
						if (v && c.prepend(p), d = m(d), x.items.forEach(function(a) {
							var e, f, i;
							a.group ? (e = b[a.group], e || (f = k(c[0], d, "optgroup", h), d = f.nextSibling, f.label = a.group, e = b[a.group] = {
								groupElement: f,
								currentOptionElement: f.firstChild
							}), i = k(e.groupElement, e.currentOptionElement, "option", g), j(a, i), e.currentOptionElement = i.nextSibling) : (i = k(c[0], d, "option", g), j(a, i), d = i.nextSibling)
						}), Object.keys(b).forEach(function(a) {
							l(b[a].currentOptionElement)
						}), l(d), o.$render(), !o.$isEmpty(a)) {
							var e = q.readValue();
							(y.trackBy ? Q(a, e) : a === e) || (o.$setViewValue(e), o.$render())
						}
					}
					var o = i[1];
					if (o) {
						for (var p, q = i[0], r = e.multiple, s = 0, t = c.children(), u = t.length; u > s; s++) if ("" === t[s].value) {
							p = t.eq(s);
							break
						}
						var v = !! p,
							w = xd(g.cloneNode(!1));
						w.val("?");
						var x, y = d(e.ngOptions, c, b),
							z = function() {
								v || c.prepend(p), c.val(""), p.prop("selected", !0), p.attr("selected", !0)
							},
							A = function() {
								v || p.remove()
							},
							B = function() {
								c.prepend(w), c.val("?"), w.prop("selected", !0), w.attr("selected", !0)
							},
							C = function() {
								w.remove()
							};
						r ? (o.$isEmpty = function(a) {
							return !a || 0 === a.length
						}, q.writeValue = function(a) {
							x.items.forEach(function(a) {
								a.element.selected = !1
							}), a && a.forEach(function(a) {
								var b = x.getOptionFromViewValue(a);
								b && !b.disabled && (b.element.selected = !0)
							})
						}, q.readValue = function() {
							var a = c.val() || [],
								b = [];
							return f(a, function(a) {
								var c = x.selectValueMap[a];
								c && !c.disabled && b.push(x.getViewValueFromOption(c))
							}), b
						}, y.trackBy && b.$watchCollection(function() {
							return Jd(o.$viewValue) ? o.$viewValue.map(function(a) {
								return y.getTrackByValue(a)
							}) : void 0
						}, function() {
							o.$render()
						})) : (q.writeValue = function(a) {
							var b = x.getOptionFromViewValue(a);
							b && !b.disabled ? c[0].value !== b.selectValue && (C(), A(), c[0].value = b.selectValue, b.element.selected = !0, b.element.setAttribute("selected", "selected")) : null === a || v ? (C(), z()) : (A(), B())
						}, q.readValue = function() {
							var a = x.selectValueMap[c.val()];
							return a && !a.disabled ? (A(), C(), x.getViewValueFromOption(a)) : null
						}, y.trackBy && b.$watch(function() {
							return y.getTrackByValue(o.$viewValue)
						}, function() {
							o.$render()
						})), v ? (p.remove(), a(p)(b), p.removeClass("ng-scope")) : p = xd(g.cloneNode(!1)), n(), b.$watchCollection(y.getWatchables, n)
					}
				}
			}
		}],
		jg = ["$locale", "$interpolate", "$log", function(a, b, c) {
			var d = /{}/g,
				e = /^when(Minus)?(.+)$/;
			return {
				link: function(g, h, i) {
					function j(a) {
						h.text(a || "")
					}
					var k, l = i.count,
						m = i.$attr.when && h.attr(i.$attr.when),
						n = i.offset || 0,
						o = g.$eval(m) || {},
						q = {},
						r = b.startSymbol(),
						s = b.endSymbol(),
						u = r + l + "-" + n + s,
						v = Gd.noop;
					f(i, function(a, b) {
						var c = e.exec(b);
						if (c) {
							var d = (c[1] ? "-" : "") + rd(c[2]);
							o[d] = h.attr(i.$attr[b])
						}
					}), f(o, function(a, c) {
						q[c] = b(a.replace(d, u))
					}), g.$watch(l, function(b) {
						var d = parseFloat(b),
							e = isNaN(d);
						if (e || d in o || (d = a.pluralCat(d - n)), d !== k && !(e && y(k) && isNaN(k))) {
							v();
							var f = q[d];
							t(f) ? (null != b && c.debug("ngPluralize: no rule defined for '" + d + "' in " + m), v = p, j()) : v = g.$watch(f, j), k = d
						}
					})
				}
			}
		}],
		kg = ["$parse", "$animate", function(a, g) {
			var h = "$$NG_REMOVED",
				i = d("ngRepeat"),
				j = function(a, b, c, d, e, f, g) {
					a[c] = d, e && (a[e] = f), a.$index = b, a.$first = 0 === b, a.$last = b === g - 1, a.$middle = !(a.$first || a.$last), a.$odd = !(a.$even = 0 === (1 & b))
				},
				k = function(a) {
					return a.clone[0]
				},
				l = function(a) {
					return a.clone[a.clone.length - 1]
				};
			return {
				restrict: "A",
				multiElement: !0,
				transclude: "element",
				priority: 1e3,
				terminal: !0,
				$$tlb: !0,
				compile: function(d, m) {
					var n = m.ngRepeat,
						o = b.createComment(" end ngRepeat: " + n + " "),
						p = n.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
					if (!p) throw i("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", n);
					var q = p[1],
						r = p[2],
						s = p[3],
						t = p[4];
					if (p = q.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/), !p) throw i("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", q);
					var u = p[3] || p[1],
						v = p[2];
					if (s && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(s) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(s))) throw i("badident", "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.", s);
					var w, x, y, z, A = {
						$id: Wa
					};
					return t ? w = a(t) : (y = function(a, b) {
						return Wa(b)
					}, z = function(a) {
						return a
					}), function(a, b, d, m, p) {
						w && (x = function(b, c, d) {
							return v && (A[v] = b), A[u] = c, A.$index = d, w(a, A)
						});
						var q = qa();
						a.$watchCollection(r, function(d) {
							var m, r, t, w, A, B, C, D, E, F, G, H, I = b[0],
								J = qa();
							if (s && (a[s] = d), e(d)) E = d, D = x || y;
							else {
								D = x || z, E = [];
								for (var K in d) d.hasOwnProperty(K) && "$" !== K.charAt(0) && E.push(K)
							}
							for (w = E.length, G = new Array(w), m = 0; w > m; m++) if (A = d === E ? m : E[m], B = d[A], C = D(A, B, m), q[C]) F = q[C], delete q[C], J[C] = F, G[m] = F;
							else {
								if (J[C]) throw f(G, function(a) {
									a && a.scope && (q[a.id] = a)
								}), i("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}", n, C, B);
								G[m] = {
									id: C,
									scope: c,
									clone: c
								}, J[C] = !0
							}
							for (var L in q) {
								if (F = q[L], H = pa(F.clone), g.leave(H), H[0].parentNode) for (m = 0, r = H.length; r > m; m++) H[m][h] = !0;
								F.scope.$destroy()
							}
							for (m = 0; w > m; m++) if (A = d === E ? m : E[m], B = d[A], F = G[m], F.scope) {
								t = I;
								do t = t.nextSibling;
								while (t && t[h]);
								k(F) != t && g.move(pa(F.clone), null, xd(I)), I = l(F), j(F.scope, m, u, B, v, A, w)
							} else p(function(a, b) {
								F.scope = b;
								var c = o.cloneNode(!1);
								a[a.length++] = c, g.enter(a, null, xd(I)), I = c, F.clone = a, J[F.id] = F, j(F.scope, m, u, B, v, A, w)
							});
							q = J
						})
					}
				}
			}
		}],
		lg = "ng-hide",
		mg = "ng-hide-animate",
		ng = ["$animate", function(a) {
			return {
				restrict: "A",
				multiElement: !0,
				link: function(b, c, d) {
					b.$watch(d.ngShow, function(b) {
						a[b ? "removeClass" : "addClass"](c, lg, {
							tempClasses: mg
						})
					})
				}
			}
		}],
		og = ["$animate", function(a) {
			return {
				restrict: "A",
				multiElement: !0,
				link: function(b, c, d) {
					b.$watch(d.ngHide, function(b) {
						a[b ? "addClass" : "removeClass"](c, lg, {
							tempClasses: mg
						})
					})
				}
			}
		}],
		pg = Yc(function(a, b, c) {
			a.$watch(c.ngStyle, function(a, c) {
				c && a !== c && f(c, function(a, c) {
					b.css(c, "")
				}), a && b.css(a)
			}, !0)
		}),
		qg = ["$animate", function(a) {
			return {
				require: "ngSwitch",
				controller: ["$scope", function() {
					this.cases = {}
				}],
				link: function(c, d, e, g) {
					var h = e.ngSwitch || e.on,
						i = [],
						j = [],
						k = [],
						l = [],
						m = function(a, b) {
							return function() {
								a.splice(b, 1)
							}
						};
					c.$watch(h, function(c) {
						var d, e;
						for (d = 0, e = k.length; e > d; ++d) a.cancel(k[d]);
						for (k.length = 0, d = 0, e = l.length; e > d; ++d) {
							var h = pa(j[d].clone);
							l[d].$destroy();
							var n = k[d] = a.leave(h);
							n.then(m(k, d))
						}
						j.length = 0, l.length = 0, (i = g.cases["!" + c] || g.cases["?"]) && f(i, function(c) {
							c.transclude(function(d, e) {
								l.push(e);
								var f = c.element;
								d[d.length++] = b.createComment(" end ngSwitchWhen: ");
								var g = {
									clone: d
								};
								j.push(g), a.enter(d, f.parent(), f)
							})
						})
					})
				}
			}
		}],
		rg = Yc({
			transclude: "element",
			priority: 1200,
			require: "^ngSwitch",
			multiElement: !0,
			link: function(a, b, c, d, e) {
				d.cases["!" + c.ngSwitchWhen] = d.cases["!" + c.ngSwitchWhen] || [], d.cases["!" + c.ngSwitchWhen].push({
					transclude: e,
					element: b
				})
			}
		}),
		sg = Yc({
			transclude: "element",
			priority: 1200,
			require: "^ngSwitch",
			multiElement: !0,
			link: function(a, b, c, d, e) {
				d.cases["?"] = d.cases["?"] || [], d.cases["?"].push({
					transclude: e,
					element: b
				})
			}
		}),
		tg = Yc({
			restrict: "EAC",
			link: function(a, b, c, e, f) {
				if (!f) throw d("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", $(b));
				f(function(a) {
					b.empty(), b.append(a)
				})
			}
		}),
		ug = ["$templateCache", function(a) {
			return {
				restrict: "E",
				terminal: !0,
				compile: function(b, c) {
					if ("text/ng-template" == c.type) {
						var d = c.id,
							e = b[0].text;
						a.put(d, e)
					}
				}
			}
		}],
		vg = {
			$setViewValue: p,
			$render: p
		},
		wg = ["$element", "$scope", "$attrs", function(a, d, e) {
			var f = this,
				g = new Xa;
			f.ngModelCtrl = vg, f.unknownOption = xd(b.createElement("option")), f.renderUnknownOption = function(b) {
				var c = "? " + Wa(b) + " ?";
				f.unknownOption.val(c), a.prepend(f.unknownOption), a.val(c)
			}, d.$on("$destroy", function() {
				f.renderUnknownOption = p
			}), f.removeUnknownOption = function() {
				f.unknownOption.parent() && f.unknownOption.remove()
			}, f.readValue = function() {
				return f.removeUnknownOption(), a.val()
			}, f.writeValue = function(b) {
				f.hasOption(b) ? (f.removeUnknownOption(), a.val(b), "" === b && f.emptyOption.prop("selected", !0)) : null == b && f.emptyOption ? (f.removeUnknownOption(), a.val("")) : f.renderUnknownOption(b)
			}, f.addOption = function(a, b) {
				na(a, '"option value"'), "" === a && (f.emptyOption = b);
				var c = g.get(a) || 0;
				g.put(a, c + 1)
			}, f.removeOption = function(a) {
				var b = g.get(a);
				b && (1 === b ? (g.remove(a), "" === a && (f.emptyOption = c)) : g.put(a, b - 1))
			}, f.hasOption = function(a) {
				return !!g.get(a)
			}
		}],
		xg = function() {
			return {
				restrict: "E",
				require: ["select", "?ngModel"],
				controller: wg,
				link: function(a, b, c, d) {
					var e = d[1];
					if (e) {
						var g = d[0];
						if (g.ngModelCtrl = e, e.$render = function() {
							g.writeValue(e.$viewValue)
						}, b.on("change", function() {
							a.$apply(function() {
								e.$setViewValue(g.readValue())
							})
						}), c.multiple) {
							g.readValue = function() {
								var a = [];
								return f(b.find("option"), function(b) {
									b.selected && a.push(b.value)
								}), a
							}, g.writeValue = function(a) {
								var c = new Xa(a);
								f(b.find("option"), function(a) {
									a.selected = u(c.get(a.value))
								})
							};
							var h, i = NaN;
							a.$watch(function() {
								i !== e.$viewValue || Q(h, e.$viewValue) || (h = P(e.$viewValue), e.$render()), i = e.$viewValue
							}), e.$isEmpty = function(a) {
								return !a || 0 === a.length
							}
						}
					}
				}
			}
		},
		yg = ["$interpolate", function(a) {
			function b(a) {
				a[0].hasAttribute("selected") && (a[0].selected = !0)
			}
			return {
				restrict: "E",
				priority: 100,
				compile: function(c, d) {
					if (t(d.value)) {
						var e = a(c.text(), !0);
						e || d.$set("value", c.text())
					}
					return function(a, c, d) {
						var f = "$selectController",
							g = c.parent(),
							h = g.data(f) || g.parent().data(f);
						h && h.ngModelCtrl && (e ? a.$watch(e, function(a, e) {
							d.$set("value", a), e !== a && h.removeOption(e), h.addOption(a, c), h.ngModelCtrl.$render(), b(c)
						}) : (h.addOption(d.value, c), h.ngModelCtrl.$render(), b(c)), c.on("$destroy", function() {
							h.removeOption(d.value), h.ngModelCtrl.$render()
						}))
					}
				}
			}
		}],
		zg = r({
			restrict: "E",
			terminal: !1
		}),
		Ag = function() {
			return {
				restrict: "A",
				require: "?ngModel",
				link: function(a, b, c, d) {
					d && (c.required = !0, d.$validators.required = function(a, b) {
						return !c.required || !d.$isEmpty(b)
					}, c.$observe("required", function() {
						d.$validate()
					}))
				}
			}
		},
		Bg = function() {
			return {
				restrict: "A",
				require: "?ngModel",
				link: function(a, b, e, f) {
					if (f) {
						var g, h = e.ngPattern || e.pattern;
						e.$observe("pattern", function(a) {
							if (x(a) && a.length > 0 && (a = new RegExp("^" + a + "$")), a && !a.test) throw d("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", h, a, $(b));
							g = a || c, f.$validate()
						}), f.$validators.pattern = function(a) {
							return f.$isEmpty(a) || t(g) || g.test(a)
						}
					}
				}
			}
		},
		Cg = function() {
			return {
				restrict: "A",
				require: "?ngModel",
				link: function(a, b, c, d) {
					if (d) {
						var e = -1;
						c.$observe("maxlength", function(a) {
							var b = n(a);
							e = isNaN(b) ? -1 : b, d.$validate()
						}), d.$validators.maxlength = function(a, b) {
							return 0 > e || d.$isEmpty(b) || b.length <= e
						}
					}
				}
			}
		},
		Dg = function() {
			return {
				restrict: "A",
				require: "?ngModel",
				link: function(a, b, c, d) {
					if (d) {
						var e = 0;
						c.$observe("minlength", function(a) {
							e = n(a) || 0, d.$validate()
						}), d.$validators.minlength = function(a, b) {
							return d.$isEmpty(b) || b.length >= e
						}
					}
				}
			}
		};
	return a.angular.bootstrap ? void console.log("WARNING: Tried to load angular more than once.") : (ka(), ua(Gd), Gd.module("ngLocale", [], ["$provide", function(a) {
		function b(a) {
			a += "";
			var b = a.indexOf(".");
			return -1 == b ? 0 : a.length - b - 1
		}
		function d(a, d) {
			var e = d;
			c === e && (e = Math.min(b(a), 3));
			var f = Math.pow(10, e),
				g = (a * f | 0) % f;
			return {
				v: e,
				f: g
			}
		}
		var e = {
			ZERO: "zero",
			ONE: "one",
			TWO: "two",
			FEW: "few",
			MANY: "many",
			OTHER: "other"
		};
		a.value("$locale", {
			DATETIME_FORMATS: {
				AMPMS: ["AM", "PM"],
				DAY: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				ERANAMES: ["Before Christ", "Anno Domini"],
				ERAS: ["BC", "AD"],
				FIRSTDAYOFWEEK: 6,
				MONTH: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				SHORTDAY: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				SHORTMONTH: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				WEEKENDRANGE: [5, 6],
				fullDate: "EEEE, MMMM d, y",
				longDate: "MMMM d, y",
				medium: "MMM d, y h:mm:ss a",
				mediumDate: "MMM d, y",
				mediumTime: "h:mm:ss a",
				"short": "M/d/yy h:mm a",
				shortDate: "M/d/yy",
				shortTime: "h:mm a"
			},
			NUMBER_FORMATS: {
				CURRENCY_SYM: "$",
				DECIMAL_SEP: ".",
				GROUP_SEP: ",",
				PATTERNS: [{
					gSize: 3,
					lgSize: 3,
					maxFrac: 3,
					minFrac: 0,
					minInt: 1,
					negPre: "-",
					negSuf: "",
					posPre: "",
					posSuf: ""
				}, {
					gSize: 3,
					lgSize: 3,
					maxFrac: 2,
					minFrac: 2,
					minInt: 1,
					negPre: "-¤",
					negSuf: "",
					posPre: "¤",
					posSuf: ""
				}]
			},
			id: "en-us",
			pluralCat: function(a, b) {
				var c = 0 | a,
					f = d(a, b);
				return 1 == c && 0 == f.v ? e.ONE : e.OTHER
			}
		})
	}]), void xd(b).ready(function() {
		fa(b, ga)
	}))
}(window, document), !window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>'), "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.router"), function(a, b, c) {
	"use strict";

	function d(a, b) {
		return N(new(N(function() {}, {
			prototype: a
		})), b)
	}
	function e(a) {
		return M(arguments, function(b) {
			b !== a && M(b, function(b, c) {
				a.hasOwnProperty(c) || (a[c] = b)
			})
		}), a
	}
	function f(a, b) {
		var c = [];
		for (var d in a.path) {
			if (a.path[d] !== b.path[d]) break;
			c.push(a.path[d])
		}
		return c
	}
	function g(a) {
		if (Object.keys) return Object.keys(a);
		var b = [];
		return M(a, function(a, c) {
			b.push(c)
		}), b
	}
	function h(a, b) {
		if (Array.prototype.indexOf) return a.indexOf(b, Number(arguments[2]) || 0);
		var c = a.length >>> 0,
			d = Number(arguments[2]) || 0;
		for (d = 0 > d ? Math.ceil(d) : Math.floor(d), 0 > d && (d += c); c > d; d++) if (d in a && a[d] === b) return d;
		return -1
	}
	function i(a, b, c, d) {
		var e, i = f(c, d),
			j = {},
			k = [];
		for (var l in i) if (i[l].params && (e = g(i[l].params), e.length)) for (var m in e) h(k, e[m]) >= 0 || (k.push(e[m]), j[e[m]] = a[e[m]]);
		return N({}, j, b)
	}
	function j(a, b, c) {
		if (!c) {
			c = [];
			for (var d in a) c.push(d)
		}
		for (var e = 0; e < c.length; e++) {
			var f = c[e];
			if (a[f] != b[f]) return !1
		}
		return !0
	}
	function k(a, b) {
		var c = {};
		return M(a, function(a) {
			c[a] = b[a]
		}), c
	}
	function l(a) {
		var b = {},
			c = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
		return M(c, function(c) {
			c in a && (b[c] = a[c])
		}), b
	}
	function m(a) {
		var b = {},
			c = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
		for (var d in a) - 1 == h(c, d) && (b[d] = a[d]);
		return b
	}
	function n(a, b) {
		var c = L(a),
			d = c ? [] : {};
		return M(a, function(a, e) {
			b(a, e) && (d[c ? d.length : e] = a)
		}), d
	}
	function o(a, b) {
		var c = L(a) ? [] : {};
		return M(a, function(a, d) {
			c[d] = b(a, d)
		}), c
	}
	function p(a, b) {
		var d = 1,
			f = 2,
			i = {},
			j = [],
			k = i,
			l = N(a.when(i), {
				$$promises: i,
				$$values: i
			});
		this.study = function(i) {
			function n(a, c) {
				if (s[c] !== f) {
					if (r.push(c), s[c] === d) throw r.splice(0, h(r, c)), new Error("Cyclic dependency: " + r.join(" -> "));
					if (s[c] = d, J(a)) q.push(c, [function() {
						return b.get(a)
					}], j);
					else {
						var e = b.annotate(a);
						M(e, function(a) {
							a !== c && i.hasOwnProperty(a) && n(i[a], a)
						}), q.push(c, a, e)
					}
					r.pop(), s[c] = f
				}
			}
			function o(a) {
				return K(a) && a.then && a.$$promises
			}
			if (!K(i)) throw new Error("'invocables' must be an object");
			var p = g(i || {}),
				q = [],
				r = [],
				s = {};
			return M(i, n), i = r = s = null, function(d, f, g) {
				function h() {
					--u || (v || e(t, f.$$values), r.$$values = t, r.$$promises = r.$$promises || !0, delete r.$$inheritedValues, n.resolve(t))
				}
				function i(a) {
					r.$$failure = a, n.reject(a)
				}
				function j(c, e, f) {
					function j(a) {
						l.reject(a), i(a)
					}
					function k() {
						if (!H(r.$$failure)) try {
							l.resolve(b.invoke(e, g, t)), l.promise.then(function(a) {
								t[c] = a, h()
							}, j)
						} catch (a) {
							j(a)
						}
					}
					var l = a.defer(),
						m = 0;
					M(f, function(a) {
						s.hasOwnProperty(a) && !d.hasOwnProperty(a) && (m++, s[a].then(function(b) {
							t[a] = b, --m || k()
						}, j))
					}), m || k(), s[c] = l.promise
				}
				if (o(d) && g === c && (g = f, f = d, d = null), d) {
					if (!K(d)) throw new Error("'locals' must be an object")
				} else d = k;
				if (f) {
					if (!o(f)) throw new Error("'parent' must be a promise returned by $resolve.resolve()")
				} else f = l;
				var n = a.defer(),
					r = n.promise,
					s = r.$$promises = {},
					t = N({}, d),
					u = 1 + q.length / 3,
					v = !1;
				if (H(f.$$failure)) return i(f.$$failure), r;
				f.$$inheritedValues && e(t, m(f.$$inheritedValues, p)), N(s, f.$$promises), f.$$values ? (v = e(t, m(f.$$values, p)), r.$$inheritedValues = m(f.$$values, p), h()) : (f.$$inheritedValues && (r.$$inheritedValues = m(f.$$inheritedValues, p)), f.then(h, i));
				for (var w = 0, x = q.length; x > w; w += 3) d.hasOwnProperty(q[w]) ? h() : j(q[w], q[w + 1], q[w + 2]);
				return r
			}
		}, this.resolve = function(a, b, c, d) {
			return this.study(a)(b, c, d)
		}
	}
	function q(a, b, c) {
		this.fromConfig = function(a, b, c) {
			return H(a.template) ? this.fromString(a.template, b) : H(a.templateUrl) ? this.fromUrl(a.templateUrl, b) : H(a.templateProvider) ? this.fromProvider(a.templateProvider, b, c) : null
		}, this.fromString = function(a, b) {
			return I(a) ? a(b) : a
		}, this.fromUrl = function(c, d) {
			return I(c) && (c = c(d)), null == c ? null : a.get(c, {
				cache: b,
				headers: {
					Accept: "text/html"
				}
			}).then(function(a) {
				return a.data
			})
		}, this.fromProvider = function(a, b, d) {
			return c.invoke(a, null, d || {
				params: b
			})
		}
	}
	function r(a, b, e) {
		function f(b, c, d, e) {
			if (q.push(b), o[b]) return o[b];
			if (!/^\w+(-+\w+)*(?:\[\])?$/.test(b)) throw new Error("Invalid parameter name '" + b + "' in pattern '" + a + "'");
			if (p[b]) throw new Error("Duplicate parameter name '" + b + "' in pattern '" + a + "'");
			return p[b] = new P.Param(b, c, d, e), p[b]
		}
		function g(a, b, c, d) {
			var e = ["", ""],
				f = a.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
			if (!b) return f;
			switch (c) {
			case !1:
				e = ["(", ")" + (d ? "?" : "")];
				break;
			case !0:
				e = ["?(", ")?"];
				break;
			default:
				e = ["(" + c + "|", ")?"]
			}
			return f + e[0] + b + e[1]
		}
		function h(e, f) {
			var g, h, i, j, k;
			return g = e[2] || e[3], k = b.params[g], i = a.substring(m, e.index), h = f ? e[4] : e[4] || ("*" == e[1] ? ".*" : null), j = P.type(h || "string") || d(P.type("string"), {
				pattern: new RegExp(h, b.caseInsensitive ? "i" : c)
			}), {
				id: g,
				regexp: h,
				segment: i,
				type: j,
				cfg: k
			}
		}
		b = N({
			params: {}
		}, K(b) ? b : {});
		var i, j = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
			k = /([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
			l = "^",
			m = 0,
			n = this.segments = [],
			o = e ? e.params : {},
			p = this.params = e ? e.params.$$new() : new P.ParamSet,
			q = [];
		this.source = a;
		for (var r, s, t;
		(i = j.exec(a)) && (r = h(i, !1), !(r.segment.indexOf("?") >= 0));) s = f(r.id, r.type, r.cfg, "path"), l += g(r.segment, s.type.pattern.source, s.squash, s.isOptional), n.push(r.segment), m = j.lastIndex;
		t = a.substring(m);
		var u = t.indexOf("?");
		if (u >= 0) {
			var v = this.sourceSearch = t.substring(u);
			if (t = t.substring(0, u), this.sourcePath = a.substring(0, m + u), v.length > 0) for (m = 0; i = k.exec(v);) r = h(i, !0), s = f(r.id, r.type, r.cfg, "search"), m = j.lastIndex
		} else this.sourcePath = a, this.sourceSearch = "";
		l += g(t) + (b.strict === !1 ? "/?" : "") + "$", n.push(t), this.regexp = new RegExp(l, b.caseInsensitive ? "i" : c), this.prefix = n[0], this.$$paramNames = q
	}
	function s(a) {
		N(this, a)
	}
	function t() {
		function a(a) {
			return null != a ? a.toString().replace(/\//g, "%2F") : a
		}
		function e(a) {
			return null != a ? a.toString().replace(/%2F/g, "/") : a
		}
		function f() {
			return {
				strict: p,
				caseInsensitive: m
			}
		}
		function i(a) {
			return I(a) || L(a) && I(a[a.length - 1])
		}
		function j() {
			for (; w.length;) {
				var a = w.shift();
				if (a.pattern) throw new Error("You cannot override a type's .pattern at runtime.");
				b.extend(u[a.name], l.invoke(a.def))
			}
		}
		function k(a) {
			N(this, a || {})
		}
		P = this;
		var l, m = !1,
			p = !0,
			q = !1,
			u = {},
			v = !0,
			w = [],
			x = {
				string: {
					encode: a,
					decode: e,
					is: function(a) {
						return null == a || !H(a) || "string" == typeof a
					},
					pattern: /[^\/]*/
				},
				"int": {
					encode: a,
					decode: function(a) {
						return parseInt(a, 10)
					},
					is: function(a) {
						return H(a) && this.decode(a.toString()) === a
					},
					pattern: /\d+/
				},
				bool: {
					encode: function(a) {
						return a ? 1 : 0
					},
					decode: function(a) {
						return 0 !== parseInt(a, 10)
					},
					is: function(a) {
						return a === !0 || a === !1
					},
					pattern: /0|1/
				},
				date: {
					encode: function(a) {
						return this.is(a) ? [a.getFullYear(), ("0" + (a.getMonth() + 1)).slice(-2), ("0" + a.getDate()).slice(-2)].join("-") : c
					},
					decode: function(a) {
						if (this.is(a)) return a;
						var b = this.capture.exec(a);
						return b ? new Date(b[1], b[2] - 1, b[3]) : c
					},
					is: function(a) {
						return a instanceof Date && !isNaN(a.valueOf())
					},
					equals: function(a, b) {
						return this.is(a) && this.is(b) && a.toISOString() === b.toISOString()
					},
					pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
					capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
				},
				json: {
					encode: b.toJson,
					decode: b.fromJson,
					is: b.isObject,
					equals: b.equals,
					pattern: /[^\/]*/
				},
				any: {
					encode: b.identity,
					decode: b.identity,
					equals: b.equals,
					pattern: /.*/
				}
			};
		t.$$getDefaultValue = function(a) {
			if (!i(a.value)) return a.value;
			if (!l) throw new Error("Injectable functions cannot be called at configuration time");
			return l.invoke(a.value)
		}, this.caseInsensitive = function(a) {
			return H(a) && (m = a), m
		}, this.strictMode = function(a) {
			return H(a) && (p = a), p
		}, this.defaultSquashPolicy = function(a) {
			if (!H(a)) return q;
			if (a !== !0 && a !== !1 && !J(a)) throw new Error("Invalid squash policy: " + a + ". Valid policies: false, true, arbitrary-string");
			return q = a, a
		}, this.compile = function(a, b) {
			return new r(a, N(f(), b))
		}, this.isMatcher = function(a) {
			if (!K(a)) return !1;
			var b = !0;
			return M(r.prototype, function(c, d) {
				I(c) && (b = b && H(a[d]) && I(a[d]))
			}), b
		}, this.type = function(a, b, c) {
			if (!H(b)) return u[a];
			if (u.hasOwnProperty(a)) throw new Error("A type named '" + a + "' has already been defined.");
			return u[a] = new s(N({
				name: a
			}, b)), c && (w.push({
				name: a,
				def: c
			}), v || j()), this
		}, M(x, function(a, b) {
			u[b] = new s(N({
				name: b
			}, a))
		}), u = d(u, {}), this.$get = ["$injector", function(a) {
			return l = a, v = !1, j(), M(x, function(a, b) {
				u[b] || (u[b] = new s(a))
			}), this
		}], this.Param = function(a, b, d, e) {
			function f(a) {
				var b = K(a) ? g(a) : [],
					c = -1 === h(b, "value") && -1 === h(b, "type") && -1 === h(b, "squash") && -1 === h(b, "array");
				return c && (a = {
					value: a
				}), a.$$fn = i(a.value) ? a.value : function() {
					return a.value
				}, a
			}
			function j(b, c, d) {
				if (b.type && c) throw new Error("Param '" + a + "' has two type configurations.");
				return c ? c : b.type ? b.type instanceof s ? b.type : new s(b.type) : "config" === d ? u.any : u.string
			}
			function k() {
				var b = {
					array: "search" === e ? "auto" : !1
				},
					c = a.match(/\[\]$/) ? {
						array: !0
					} : {};
				return N(b, c, d).array
			}
			function m(a, b) {
				var c = a.squash;
				if (!b || c === !1) return !1;
				if (!H(c) || null == c) return q;
				if (c === !0 || J(c)) return c;
				throw new Error("Invalid squash policy: '" + c + "'. Valid policies: false, true, or arbitrary string")
			}
			function p(a, b, d, e) {
				var f, g, i = [{
					from: "",
					to: d || b ? c : ""
				}, {
					from: null,
					to: d || b ? c : ""
				}];
				return f = L(a.replace) ? a.replace : [], J(e) && f.push({
					from: e,
					to: c
				}), g = o(f, function(a) {
					return a.from
				}), n(i, function(a) {
					return -1 === h(g, a.from)
				}).concat(f)
			}
			function r() {
				if (!l) throw new Error("Injectable functions cannot be called at configuration time");
				var a = l.invoke(d.$$fn);
				if (null !== a && a !== c && !w.type.is(a)) throw new Error("Default value (" + a + ") for parameter '" + w.id + "' is not an instance of Type (" + w.type.name + ")");
				return a
			}
			function t(a) {
				function b(a) {
					return function(b) {
						return b.from === a
					}
				}
				function c(a) {
					var c = o(n(w.replace, b(a)), function(a) {
						return a.to
					});
					return c.length ? c[0] : a
				}
				return a = c(a), H(a) ? w.type.$normalize(a) : r()
			}
			function v() {
				return "{Param:" + a + " " + b + " squash: '" + z + "' optional: " + y + "}"
			}
			var w = this;
			d = f(d), b = j(d, b, e);
			var x = k();
			b = x ? b.$asArray(x, "search" === e) : b, "string" !== b.name || x || "path" !== e || d.value !== c || (d.value = "");
			var y = d.value !== c,
				z = m(d, y),
				A = p(d, x, y, z);
			N(this, {
				id: a,
				type: b,
				location: e,
				array: x,
				squash: z,
				replace: A,
				isOptional: y,
				value: t,
				dynamic: c,
				config: d,
				toString: v
			})
		}, k.prototype = {
			$$new: function() {
				return d(this, N(new k, {
					$$parent: this
				}))
			},
			$$keys: function() {
				for (var a = [], b = [], c = this, d = g(k.prototype); c;) b.push(c), c = c.$$parent;
				return b.reverse(), M(b, function(b) {
					M(g(b), function(b) {
						-1 === h(a, b) && -1 === h(d, b) && a.push(b)
					})
				}), a
			},
			$$values: function(a) {
				var b = {},
					c = this;
				return M(c.$$keys(), function(d) {
					b[d] = c[d].value(a && a[d])
				}), b
			},
			$$equals: function(a, b) {
				var c = !0,
					d = this;
				return M(d.$$keys(), function(e) {
					var f = a && a[e],
						g = b && b[e];
					d[e].type.equals(f, g) || (c = !1)
				}), c
			},
			$$validates: function(a) {
				var d, e, f, g, h, i = this.$$keys();
				for (d = 0; d < i.length && (e = this[i[d]], f = a[i[d]], f !== c && null !== f || !e.isOptional); d++) {
					if (g = e.type.$normalize(f), !e.type.is(g)) return !1;
					if (h = e.type.encode(g), b.isString(h) && !e.type.pattern.exec(h)) return !1
				}
				return !0
			},
			$$parent: c
		}, this.ParamSet = k
	}
	function u(a, d) {
		function e(a) {
			var b = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);
			return null != b ? b[1].replace(/\\(.)/g, "$1") : ""
		}
		function f(a, b) {
			return a.replace(/\$(\$|\d{1,2})/, function(a, c) {
				return b["$" === c ? 0 : Number(c)]
			})
		}
		function g(a, b, c) {
			if (!c) return !1;
			var d = a.invoke(b, b, {
				$match: c
			});
			return H(d) ? d : !0
		}
		function h(d, e, f, g) {
			function h(a, b, c) {
				return "/" === p ? a : b ? p.slice(0, -1) + a : c ? p.slice(1) + a : a
			}
			function m(a) {
				function b(a) {
					var b = a(f, d);
					return b ? (J(b) && d.replace().url(b), !0) : !1
				}
				if (!a || !a.defaultPrevented) {
					o && d.url() === o;
					o = c;
					var e, g = j.length;
					for (e = 0; g > e; e++) if (b(j[e])) return;
					k && b(k)
				}
			}
			function n() {
				return i = i || e.$on("$locationChangeSuccess", m)
			}
			var o, p = g.baseHref(),
				q = d.url();
			return l || n(), {
				sync: function() {
					m()
				},
				listen: function() {
					return n()
				},
				update: function(a) {
					return a ? void(q = d.url()) : void(d.url() !== q && (d.url(q), d.replace()))
				},
				push: function(a, b, e) {
					var f = a.format(b || {});
					null !== f && b && b["#"] && (f += "#" + b["#"]), d.url(f), o = e && e.$$avoidResync ? d.url() : c, e && e.replace && d.replace()
				},
				href: function(c, e, f) {
					if (!c.validates(e)) return null;
					var g = a.html5Mode();
					b.isObject(g) && (g = g.enabled);
					var i = c.format(e);
					if (f = f || {}, g || null === i || (i = "#" + a.hashPrefix() + i), null !== i && e && e["#"] && (i += "#" + e["#"]), i = h(i, g, f.absolute), !f.absolute || !i) return i;
					var j = !g && i ? "/" : "",
						k = d.port();
					return k = 80 === k || 443 === k ? "" : ":" + k, [d.protocol(), "://", d.host(), k, j, i].join("");
				}
			}
		}
		var i, j = [],
			k = null,
			l = !1;
		this.rule = function(a) {
			if (!I(a)) throw new Error("'rule' must be a function");
			return j.push(a), this
		}, this.otherwise = function(a) {
			if (J(a)) {
				var b = a;
				a = function() {
					return b
				}
			} else if (!I(a)) throw new Error("'rule' must be a function");
			return k = a, this
		}, this.when = function(a, b) {
			var c, h = J(b);
			if (J(a) && (a = d.compile(a)), !h && !I(b) && !L(b)) throw new Error("invalid 'handler' in when()");
			var i = {
				matcher: function(a, b) {
					return h && (c = d.compile(b), b = ["$match", function(a) {
						return c.format(a)
					}]), N(function(c, d) {
						return g(c, b, a.exec(d.path(), d.search()))
					}, {
						prefix: J(a.prefix) ? a.prefix : ""
					})
				},
				regex: function(a, b) {
					if (a.global || a.sticky) throw new Error("when() RegExp must not be global or sticky");
					return h && (c = b, b = ["$match", function(a) {
						return f(c, a)
					}]), N(function(c, d) {
						return g(c, b, a.exec(d.path()))
					}, {
						prefix: e(a)
					})
				}
			},
				j = {
					matcher: d.isMatcher(a),
					regex: a instanceof RegExp
				};
			for (var k in j) if (j[k]) return this.rule(i[k](a, b));
			throw new Error("invalid 'what' in when()")
		}, this.deferIntercept = function(a) {
			a === c && (a = !0), l = a
		}, this.$get = h, h.$inject = ["$location", "$rootScope", "$injector", "$browser"]
	}
	function v(a, e) {
		function f(a) {
			return 0 === a.indexOf(".") || 0 === a.indexOf("^")
		}
		function m(a, b) {
			if (!a) return c;
			var d = J(a),
				e = d ? a : a.name,
				g = f(e);
			if (g) {
				if (!b) throw new Error("No reference point given for path '" + e + "'");
				b = m(b);
				for (var h = e.split("."), i = 0, j = h.length, k = b; j > i; i++) if ("" !== h[i] || 0 !== i) {
					if ("^" !== h[i]) break;
					if (!k.parent) throw new Error("Path '" + e + "' not valid for state '" + b.name + "'");
					k = k.parent
				} else k = b;
				h = h.slice(i).join("."), e = k.name + (k.name && h ? "." : "") + h
			}
			var l = z[e];
			return !l || !d && (d || l !== a && l.self !== a) ? c : l
		}
		function n(a, b) {
			A[a] || (A[a] = []), A[a].push(b)
		}
		function p(a) {
			for (var b = A[a] || []; b.length;) q(b.shift())
		}
		function q(b) {
			b = d(b, {
				self: b,
				resolve: b.resolve || {},
				toString: function() {
					return this.name
				}
			});
			var c = b.name;
			if (!J(c) || c.indexOf("@") >= 0) throw new Error("State must have a valid name");
			if (z.hasOwnProperty(c)) throw new Error("State '" + c + "'' is already defined");
			var e = -1 !== c.indexOf(".") ? c.substring(0, c.lastIndexOf(".")) : J(b.parent) ? b.parent : K(b.parent) && J(b.parent.name) ? b.parent.name : "";
			if (e && !z[e]) return n(e, b.self);
			for (var f in C) I(C[f]) && (b[f] = C[f](b, C.$delegates[f]));
			return z[c] = b, !b[B] && b.url && a.when(b.url, ["$match", "$stateParams", function(a, c) {
				y.$current.navigable == b && j(a, c) || y.transitionTo(b, a, {
					inherit: !0,
					location: !1
				})
			}]), p(c), b
		}
		function r(a) {
			return a.indexOf("*") > -1
		}
		function s(a) {
			for (var b = a.split("."), c = y.$current.name.split("."), d = 0, e = b.length; e > d; d++)"*" === b[d] && (c[d] = "*");
			return "**" === b[0] && (c = c.slice(h(c, b[1])), c.unshift("**")), "**" === b[b.length - 1] && (c.splice(h(c, b[b.length - 2]) + 1, Number.MAX_VALUE), c.push("**")), b.length != c.length ? !1 : c.join("") === b.join("")
		}
		function t(a, b) {
			return J(a) && !H(b) ? C[a] : I(b) && J(a) ? (C[a] && !C.$delegates[a] && (C.$delegates[a] = C[a]), C[a] = b, this) : this
		}
		function u(a, b) {
			return K(a) ? b = a : b.name = a, q(b), this
		}
		function v(a, e, f, h, l, n, p, q, t) {
			function u(b, c, d, f) {
				var g = a.$broadcast("$stateNotFound", b, c, d);
				if (g.defaultPrevented) return p.update(), D;
				if (!g.retry) return null;
				if (f.$retry) return p.update(), E;
				var h = y.transition = e.when(g.retry);
				return h.then(function() {
					return h !== y.transition ? A : (b.options.$retry = !0, y.transitionTo(b.to, b.toParams, b.options))
				}, function() {
					return D
				}), p.update(), h
			}
			function v(a, c, d, g, i, j) {
				function m() {
					var c = [];
					return M(a.views, function(d, e) {
						var g = d.resolve && d.resolve !== a.resolve ? d.resolve : {};
						g.$template = [function() {
							return f.load(e, {
								view: d,
								locals: i.globals,
								params: n,
								notify: j.notify
							}) || ""
						}], c.push(l.resolve(g, i.globals, i.resolve, a).then(function(c) {
							if (I(d.controllerProvider) || L(d.controllerProvider)) {
								var f = b.extend({}, g, i.globals);
								c.$$controller = h.invoke(d.controllerProvider, null, f)
							} else c.$$controller = d.controller;
							c.$$state = a, c.$$controllerAs = d.controllerAs, i[e] = c
						}))
					}), e.all(c).then(function() {
						return i.globals
					})
				}
				var n = d ? c : k(a.params.$$keys(), c),
					o = {
						$stateParams: n
					};
				i.resolve = l.resolve(a.resolve, o, i.resolve, a);
				var p = [i.resolve.then(function(a) {
					i.globals = a
				})];
				return g && p.push(g), e.all(p).then(m).then(function(a) {
					return i
				})
			}
			var A = e.reject(new Error("transition superseded")),
				C = e.reject(new Error("transition prevented")),
				D = e.reject(new Error("transition aborted")),
				E = e.reject(new Error("transition failed"));
			return x.locals = {
				resolve: null,
				globals: {
					$stateParams: {}
				}
			}, y = {
				params: {},
				current: x.self,
				$current: x,
				transition: null
			}, y.reload = function(a) {
				return y.transitionTo(y.current, n, {
					reload: a || !0,
					inherit: !1,
					notify: !0
				})
			}, y.go = function(a, b, c) {
				return y.transitionTo(a, b, N({
					inherit: !0,
					relative: y.$current
				}, c))
			}, y.transitionTo = function(b, c, f) {
				c = c || {}, f = N({
					location: !0,
					inherit: !1,
					relative: null,
					notify: !0,
					reload: !1,
					$retry: !1
				}, f || {});
				var g, j = y.$current,
					l = y.params,
					o = j.path,
					q = m(b, f.relative),
					r = c["#"];
				if (!H(q)) {
					var s = {
						to: b,
						toParams: c,
						options: f
					},
						t = u(s, j.self, l, f);
					if (t) return t;
					if (b = s.to, c = s.toParams, f = s.options, q = m(b, f.relative), !H(q)) {
						if (!f.relative) throw new Error("No such state '" + b + "'");
						throw new Error("Could not resolve '" + b + "' from state '" + f.relative + "'")
					}
				}
				if (q[B]) throw new Error("Cannot transition to abstract state '" + b + "'");
				if (f.inherit && (c = i(n, c || {}, y.$current, q)), !q.params.$$validates(c)) return E;
				c = q.params.$$values(c), b = q;
				var z = b.path,
					D = 0,
					F = z[D],
					G = x.locals,
					I = [];
				if (f.reload) {
					if (J(f.reload) || K(f.reload)) {
						if (K(f.reload) && !f.reload.name) throw new Error("Invalid reload state object");
						var L = f.reload === !0 ? o[0] : m(f.reload);
						if (f.reload && !L) throw new Error("No such reload state '" + (J(f.reload) ? f.reload : f.reload.name) + "'");
						for (; F && F === o[D] && F !== L;) G = I[D] = F.locals, D++, F = z[D]
					}
				} else for (; F && F === o[D] && F.ownParams.$$equals(c, l);) G = I[D] = F.locals, D++, F = z[D];
				if (w(b, c, j, l, G, f)) return r && (c["#"] = r), y.params = c, O(y.params, n), f.location && b.navigable && b.navigable.url && (p.push(b.navigable.url, c, {
					$$avoidResync: !0,
					replace: "replace" === f.location
				}), p.update(!0)), y.transition = null, e.when(y.current);
				if (c = k(b.params.$$keys(), c || {}), f.notify && a.$broadcast("$stateChangeStart", b.self, c, j.self, l).defaultPrevented) return a.$broadcast("$stateChangeCancel", b.self, c, j.self, l), p.update(), C;
				for (var M = e.when(G), P = D; P < z.length; P++, F = z[P]) G = I[P] = d(G), M = v(F, c, F === b, M, G, f);
				var Q = y.transition = M.then(function() {
					var d, e, g;
					if (y.transition !== Q) return A;
					for (d = o.length - 1; d >= D; d--) g = o[d], g.self.onExit && h.invoke(g.self.onExit, g.self, g.locals.globals), g.locals = null;
					for (d = D; d < z.length; d++) e = z[d], e.locals = I[d], e.self.onEnter && h.invoke(e.self.onEnter, e.self, e.locals.globals);
					return r && (c["#"] = r), y.transition !== Q ? A : (y.$current = b, y.current = b.self, y.params = c, O(y.params, n), y.transition = null, f.location && b.navigable && p.push(b.navigable.url, b.navigable.locals.globals.$stateParams, {
						$$avoidResync: !0,
						replace: "replace" === f.location
					}), f.notify && a.$broadcast("$stateChangeSuccess", b.self, c, j.self, l), p.update(!0), y.current)
				}, function(d) {
					return y.transition !== Q ? A : (y.transition = null, g = a.$broadcast("$stateChangeError", b.self, c, j.self, l, d), g.defaultPrevented || p.update(), e.reject(d))
				});
				return Q
			}, y.is = function(a, b, d) {
				d = N({
					relative: y.$current
				}, d || {});
				var e = m(a, d.relative);
				return H(e) ? y.$current !== e ? !1 : b ? j(e.params.$$values(b), n) : !0 : c
			}, y.includes = function(a, b, d) {
				if (d = N({
					relative: y.$current
				}, d || {}), J(a) && r(a)) {
					if (!s(a)) return !1;
					a = y.$current.name
				}
				var e = m(a, d.relative);
				return H(e) ? H(y.$current.includes[e.name]) ? b ? j(e.params.$$values(b), n, g(b)) : !0 : !1 : c
			}, y.href = function(a, b, d) {
				d = N({
					lossy: !0,
					inherit: !0,
					absolute: !1,
					relative: y.$current
				}, d || {});
				var e = m(a, d.relative);
				if (!H(e)) return null;
				d.inherit && (b = i(n, b || {}, y.$current, e));
				var f = e && d.lossy ? e.navigable : e;
				return f && f.url !== c && null !== f.url ? p.href(f.url, k(e.params.$$keys().concat("#"), b || {}), {
					absolute: d.absolute
				}) : null
			}, y.get = function(a, b) {
				if (0 === arguments.length) return o(g(z), function(a) {
					return z[a].self
				});
				var c = m(a, b || y.$current);
				return c && c.self ? c.self : null
			}, y
		}
		function w(a, b, c, d, e, f) {
			function g(a, b, c) {
				function d(b) {
					return "search" != a.params[b].location
				}
				var e = a.params.$$keys().filter(d),
					f = l.apply({}, [a.params].concat(e)),
					g = new P.ParamSet(f);
				return g.$$equals(b, c)
			}
			return !f.reload && a === c && (e === c.locals || a.self.reloadOnSearch === !1 && g(c, d, b)) ? !0 : void 0
		}
		var x, y, z = {},
			A = {},
			B = "abstract",
			C = {
				parent: function(a) {
					if (H(a.parent) && a.parent) return m(a.parent);
					var b = /^(.+)\.[^.]+$/.exec(a.name);
					return b ? m(b[1]) : x
				},
				data: function(a) {
					return a.parent && a.parent.data && (a.data = a.self.data = N({}, a.parent.data, a.data)), a.data
				},
				url: function(a) {
					var b = a.url,
						c = {
							params: a.params || {}
						};
					if (J(b)) return "^" == b.charAt(0) ? e.compile(b.substring(1), c) : (a.parent.navigable || x).url.concat(b, c);
					if (!b || e.isMatcher(b)) return b;
					throw new Error("Invalid url '" + b + "' in state '" + a + "'")
				},
				navigable: function(a) {
					return a.url ? a : a.parent ? a.parent.navigable : null
				},
				ownParams: function(a) {
					var b = a.url && a.url.params || new P.ParamSet;
					return M(a.params || {}, function(a, c) {
						b[c] || (b[c] = new P.Param(c, null, a, "config"))
					}), b
				},
				params: function(a) {
					return a.parent && a.parent.params ? N(a.parent.params.$$new(), a.ownParams) : new P.ParamSet
				},
				views: function(a) {
					var b = {};
					return M(H(a.views) ? a.views : {
						"": a
					}, function(c, d) {
						d.indexOf("@") < 0 && (d += "@" + a.parent.name), b[d] = c
					}), b
				},
				path: function(a) {
					return a.parent ? a.parent.path.concat(a) : []
				},
				includes: function(a) {
					var b = a.parent ? N({}, a.parent.includes) : {};
					return b[a.name] = !0, b
				},
				$delegates: {}
			};
		x = q({
			name: "",
			url: "^",
			views: null,
			"abstract": !0
		}), x.navigable = null, this.decorator = t, this.state = u, this.$get = v, v.$inject = ["$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$urlRouter", "$location", "$urlMatcherFactory"]
	}
	function w() {
		function a(a, b) {
			return {
				load: function(c, d) {
					var e, f = {
						template: null,
						controller: null,
						view: null,
						locals: null,
						notify: !0,
						async: !0,
						params: {}
					};
					return d = N(f, d), d.view && (e = b.fromConfig(d.view, d.params, d.locals)), e && d.notify && a.$broadcast("$viewContentLoading", d), e
				}
			}
		}
		this.$get = a, a.$inject = ["$rootScope", "$templateFactory"]
	}
	function x() {
		var a = !1;
		this.useAnchorScroll = function() {
			a = !0
		}, this.$get = ["$anchorScroll", "$timeout", function(b, c) {
			return a ? b : function(a) {
				return c(function() {
					a[0].scrollIntoView()
				}, 0, !1)
			}
		}]
	}
	function y(a, c, d, e) {
		function f() {
			return c.has ?
			function(a) {
				return c.has(a) ? c.get(a) : null
			} : function(a) {
				try {
					return c.get(a)
				} catch (b) {
					return null
				}
			}
		}
		function g(a, b) {
			var c = function() {
					return {
						enter: function(a, b, c) {
							b.after(a), c()
						},
						leave: function(a, b) {
							a.remove(), b()
						}
					}
				};
			if (j) return {
				enter: function(a, b, c) {
					var d = j.enter(a, null, b, c);
					d && d.then && d.then(c)
				},
				leave: function(a, b) {
					var c = j.leave(a, b);
					c && c.then && c.then(b)
				}
			};
			if (i) {
				var d = i && i(b, a);
				return {
					enter: function(a, b, c) {
						d.enter(a, null, b), c()
					},
					leave: function(a, b) {
						d.leave(a), b()
					}
				}
			}
			return c()
		}
		var h = f(),
			i = h("$animator"),
			j = h("$animate"),
			k = {
				restrict: "ECA",
				terminal: !0,
				priority: 400,
				transclude: "element",
				compile: function(c, f, h) {
					return function(c, f, i) {
						function j() {
							l && (l.remove(), l = null), n && (n.$destroy(), n = null), m && (r.leave(m, function() {
								l = null
							}), l = m, m = null)
						}
						function k(g) {
							var k, l = A(c, i, f, e),
								s = l && a.$current && a.$current.locals[l];
							if (g || s !== o) {
								k = c.$new(), o = a.$current.locals[l];
								var t = h(k, function(a) {
									r.enter(a, f, function() {
										n && n.$emit("$viewContentAnimationEnded"), (b.isDefined(q) && !q || c.$eval(q)) && d(a)
									}), j()
								});
								m = t, n = k, n.$emit("$viewContentLoaded"), n.$eval(p)
							}
						}
						var l, m, n, o, p = i.onload || "",
							q = i.autoscroll,
							r = g(i, c);
						c.$on("$stateChangeSuccess", function() {
							k(!1)
						}), c.$on("$viewContentLoading", function() {
							k(!1)
						}), k(!0)
					}
				}
			};
		return k
	}
	function z(a, b, c, d) {
		return {
			restrict: "ECA",
			priority: -400,
			compile: function(e) {
				var f = e.html();
				return function(e, g, h) {
					var i = c.$current,
						j = A(e, h, g, d),
						k = i && i.locals[j];
					if (k) {
						g.data("$uiView", {
							name: j,
							state: k.$$state
						}), g.html(k.$template ? k.$template : f);
						var l = a(g.contents());
						if (k.$$controller) {
							k.$scope = e, k.$element = g;
							var m = b(k.$$controller, k);
							k.$$controllerAs && (e[k.$$controllerAs] = m), g.data("$ngControllerController", m), g.children().data("$ngControllerController", m)
						}
						l(e)
					}
				}
			}
		}
	}
	function A(a, b, c, d) {
		var e = d(b.uiView || b.name || "")(a),
			f = c.inheritedData("$uiView");
		return e.indexOf("@") >= 0 ? e : e + "@" + (f ? f.state.name : "")
	}
	function B(a, b) {
		var c, d = a.match(/^\s*({[^}]*})\s*$/);
		if (d && (a = b + "(" + d[1] + ")"), c = a.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/), !c || 4 !== c.length) throw new Error("Invalid state ref '" + a + "'");
		return {
			state: c[1],
			paramExpr: c[3] || null
		}
	}
	function C(a) {
		var b = a.parent().inheritedData("$uiView");
		return b && b.state && b.state.name ? b.state : void 0
	}
	function D(a, c) {
		var d = ["location", "inherit", "reload", "absolute"];
		return {
			restrict: "A",
			require: ["?^uiSrefActive", "?^uiSrefActiveEq"],
			link: function(e, f, g, h) {
				var i = B(g.uiSref, a.current.name),
					j = null,
					k = C(f) || a.$current,
					l = "[object SVGAnimatedString]" === Object.prototype.toString.call(f.prop("href")) ? "xlink:href" : "href",
					m = null,
					n = "A" === f.prop("tagName").toUpperCase(),
					o = "FORM" === f[0].nodeName,
					p = o ? "action" : l,
					q = !0,
					r = {
						relative: k,
						inherit: !0
					},
					s = e.$eval(g.uiSrefOpts) || {};
				b.forEach(d, function(a) {
					a in s && (r[a] = s[a])
				});
				var t = function(c) {
						if (c && (j = b.copy(c)), q) {
							m = a.href(i.state, j, r);
							var d = h[1] || h[0];
							return d && d.$$addStateInfo(i.state, j), null === m ? (q = !1, !1) : void g.$set(p, m)
						}
					};
				i.paramExpr && (e.$watch(i.paramExpr, function(a, b) {
					a !== j && t(a)
				}, !0), j = b.copy(e.$eval(i.paramExpr))), t(), o || f.bind("click", function(b) {
					var d = b.which || b.button;
					if (!(d > 1 || b.ctrlKey || b.metaKey || b.shiftKey || f.attr("target"))) {
						var e = c(function() {
							a.go(i.state, j, r)
						});
						b.preventDefault();
						var g = n && !m ? 1 : 0;
						b.preventDefault = function() {
							g-- <= 0 && c.cancel(e)
						}
					}
				})
			}
		}
	}
	function E(a, b, c) {
		return {
			restrict: "A",
			controller: ["$scope", "$element", "$attrs", function(b, d, e) {
				function f() {
					g() ? d.addClass(i) : d.removeClass(i)
				}
				function g() {
					for (var a = 0; a < j.length; a++) if (h(j[a].state, j[a].params)) return !0;
					return !1
				}
				function h(b, c) {
					return "undefined" != typeof e.uiSrefActiveEq ? a.is(b.name, c) : a.includes(b.name, c)
				}
				var i, j = [];
				i = c(e.uiSrefActiveEq || e.uiSrefActive || "", !1)(b), this.$$addStateInfo = function(b, c) {
					var e = a.get(b, C(d));
					j.push({
						state: e || {
							name: b
						},
						params: c
					}), f()
				}, b.$on("$stateChangeSuccess", f)
			}]
		}
	}
	function F(a) {
		var b = function(b) {
				return a.is(b)
			};
		return b.$stateful = !0, b
	}
	function G(a) {
		var b = function(b) {
				return a.includes(b)
			};
		return b.$stateful = !0, b
	}
	var H = b.isDefined,
		I = b.isFunction,
		J = b.isString,
		K = b.isObject,
		L = b.isArray,
		M = b.forEach,
		N = b.extend,
		O = b.copy;
	b.module("ui.router.util", ["ng"]), b.module("ui.router.router", ["ui.router.util"]), b.module("ui.router.state", ["ui.router.router", "ui.router.util"]), b.module("ui.router", ["ui.router.state"]), b.module("ui.router.compat", ["ui.router"]), p.$inject = ["$q", "$injector"], b.module("ui.router.util").service("$resolve", p), q.$inject = ["$http", "$templateCache", "$injector"], b.module("ui.router.util").service("$templateFactory", q);
	var P;
	r.prototype.concat = function(a, b) {
		var c = {
			caseInsensitive: P.caseInsensitive(),
			strict: P.strictMode(),
			squash: P.defaultSquashPolicy()
		};
		return new r(this.sourcePath + a + this.sourceSearch, N(c, b), this)
	}, r.prototype.toString = function() {
		return this.source
	}, r.prototype.exec = function(a, b) {
		function c(a) {
			function b(a) {
				return a.split("").reverse().join("")
			}
			function c(a) {
				return a.replace(/\\-/g, "-")
			}
			var d = b(a).split(/-(?!\\)/),
				e = o(d, b);
			return o(e, c).reverse()
		}
		var d = this.regexp.exec(a);
		if (!d) return null;
		b = b || {};
		var e, f, g, h = this.parameters(),
			i = h.length,
			j = this.segments.length - 1,
			k = {};
		if (j !== d.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");
		for (e = 0; j > e; e++) {
			g = h[e];
			var l = this.params[g],
				m = d[e + 1];
			for (f = 0; f < l.replace; f++) l.replace[f].from === m && (m = l.replace[f].to);
			m && l.array === !0 && (m = c(m)), k[g] = l.value(m)
		}
		for (; i > e; e++) g = h[e], k[g] = this.params[g].value(b[g]);
		return k
	}, r.prototype.parameters = function(a) {
		return H(a) ? this.params[a] || null : this.$$paramNames
	}, r.prototype.validates = function(a) {
		return this.params.$$validates(a)
	}, r.prototype.format = function(a) {
		function b(a) {
			return encodeURIComponent(a).replace(/-/g, function(a) {
				return "%5C%" + a.charCodeAt(0).toString(16).toUpperCase()
			})
		}
		a = a || {};
		var c = this.segments,
			d = this.parameters(),
			e = this.params;
		if (!this.validates(a)) return null;
		var f, g = !1,
			h = c.length - 1,
			i = d.length,
			j = c[0];
		for (f = 0; i > f; f++) {
			var k = h > f,
				l = d[f],
				m = e[l],
				n = m.value(a[l]),
				p = m.isOptional && m.type.equals(m.value(), n),
				q = p ? m.squash : !1,
				r = m.type.encode(n);
			if (k) {
				var s = c[f + 1];
				if (q === !1) null != r && (j += L(r) ? o(r, b).join("-") : encodeURIComponent(r)), j += s;
				else if (q === !0) {
					var t = j.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
					j += s.match(t)[1]
				} else J(q) && (j += q + s)
			} else {
				if (null == r || p && q !== !1) continue;
				L(r) || (r = [r]), r = o(r, encodeURIComponent).join("&" + l + "="), j += (g ? "&" : "?") + (l + "=" + r), g = !0
			}
		}
		return j
	}, s.prototype.is = function(a, b) {
		return !0
	}, s.prototype.encode = function(a, b) {
		return a
	}, s.prototype.decode = function(a, b) {
		return a
	}, s.prototype.equals = function(a, b) {
		return a == b
	}, s.prototype.$subPattern = function() {
		var a = this.pattern.toString();
		return a.substr(1, a.length - 2)
	}, s.prototype.pattern = /.*/, s.prototype.toString = function() {
		return "{Type:" + this.name + "}"
	}, s.prototype.$normalize = function(a) {
		return this.is(a) ? a : this.decode(a)
	}, s.prototype.$asArray = function(a, b) {
		function d(a, b) {
			function d(a, b) {
				return function() {
					return a[b].apply(a, arguments)
				}
			}
			function e(a) {
				return L(a) ? a : H(a) ? [a] : []
			}
			function f(a) {
				switch (a.length) {
				case 0:
					return c;
				case 1:
					return "auto" === b ? a[0] : a;
				default:
					return a
				}
			}
			function g(a) {
				return !a
			}
			function h(a, b) {
				return function(c) {
					c = e(c);
					var d = o(c, a);
					return b === !0 ? 0 === n(d, g).length : f(d)
				}
			}
			function i(a) {
				return function(b, c) {
					var d = e(b),
						f = e(c);
					if (d.length !== f.length) return !1;
					for (var g = 0; g < d.length; g++) if (!a(d[g], f[g])) return !1;
					return !0
				}
			}
			this.encode = h(d(a, "encode")), this.decode = h(d(a, "decode")), this.is = h(d(a, "is"), !0), this.equals = i(d(a, "equals")), this.pattern = a.pattern, this.$normalize = h(d(a, "$normalize")), this.name = a.name, this.$arrayMode = b
		}
		if (!a) return this;
		if ("auto" === a && !b) throw new Error("'auto' array mode is for query parameters only");
		return new d(this, a)
	}, b.module("ui.router.util").provider("$urlMatcherFactory", t), b.module("ui.router.util").run(["$urlMatcherFactory", function(a) {}]), u.$inject = ["$locationProvider", "$urlMatcherFactoryProvider"], b.module("ui.router.router").provider("$urlRouter", u), v.$inject = ["$urlRouterProvider", "$urlMatcherFactoryProvider"], b.module("ui.router.state").value("$stateParams", {}).provider("$state", v), w.$inject = [], b.module("ui.router.state").provider("$view", w), b.module("ui.router.state").provider("$uiViewScroll", x), y.$inject = ["$state", "$injector", "$uiViewScroll", "$interpolate"], z.$inject = ["$compile", "$controller", "$state", "$interpolate"], b.module("ui.router.state").directive("uiView", y), b.module("ui.router.state").directive("uiView", z), D.$inject = ["$state", "$timeout"], E.$inject = ["$state", "$stateParams", "$interpolate"], b.module("ui.router.state").directive("uiSref", D).directive("uiSrefActive", E).directive("uiSrefActiveEq", E), F.$inject = ["$state"], G.$inject = ["$state"], b.module("ui.router.state").filter("isState", F).filter("includedByState", G)
}(window, window.angular), function() {
	"use strict";

	function a(b, d) {
		function e(a, b) {
			return function() {
				return a.apply(b, arguments)
			}
		}
		var f;
		if (d = d || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = d.touchBoundary || 10, this.layer = b, this.tapDelay = d.tapDelay || 200, this.tapTimeout = d.tapTimeout || 700, !a.notNeeded(b)) {
			for (var g = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], h = this, i = 0, j = g.length; j > i; i++) h[g[i]] = e(h[g[i]], h);
			c && (b.addEventListener("mouseover", this.onMouse, !0), b.addEventListener("mousedown", this.onMouse, !0), b.addEventListener("mouseup", this.onMouse, !0)), b.addEventListener("click", this.onClick, !0), b.addEventListener("touchstart", this.onTouchStart, !1), b.addEventListener("touchmove", this.onTouchMove, !1), b.addEventListener("touchend", this.onTouchEnd, !1), b.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (b.removeEventListener = function(a, c, d) {
				var e = Node.prototype.removeEventListener;
				"click" === a ? e.call(b, a, c.hijacked || c, d) : e.call(b, a, c, d)
			}, b.addEventListener = function(a, c, d) {
				var e = Node.prototype.addEventListener;
				"click" === a ? e.call(b, a, c.hijacked || (c.hijacked = function(a) {
					a.propagationStopped || c(a)
				}), d) : e.call(b, a, c, d)
			}), "function" == typeof b.onclick && (f = b.onclick, b.addEventListener("click", function(a) {
				f(a)
			}, !1), b.onclick = null)
		}
	}
	var b = navigator.userAgent.indexOf("Windows Phone") >= 0,
		c = navigator.userAgent.indexOf("Android") > 0 && !b,
		d = /iP(ad|hone|od)/.test(navigator.userAgent) && !b,
		e = d && /OS 4_\d(_\d)?/.test(navigator.userAgent),
		f = d && /OS [6-7]_\d/.test(navigator.userAgent),
		g = navigator.userAgent.indexOf("BB10") > 0;
	a.prototype.needsClick = function(a) {
		switch (a.nodeName.toLowerCase()) {
		case "button":
		case "select":
		case "textarea":
			if (a.disabled) return !0;
			break;
		case "input":
			if (d && "file" === a.type || a.disabled) return !0;
			break;
		case "label":
		case "iframe":
		case "video":
			return !0
		}
		return /\bneedsclick\b/.test(a.className)
	}, a.prototype.needsFocus = function(a) {
		switch (a.nodeName.toLowerCase()) {
		case "textarea":
			return !0;
		case "select":
			return !c;
		case "input":
			switch (a.type) {
			case "button":
			case "checkbox":
			case "file":
			case "image":
			case "radio":
			case "submit":
				return !1
			}
			return !a.disabled && !a.readOnly;
		default:
			return /\bneedsfocus\b/.test(a.className)
		}
	}, a.prototype.sendClick = function(a, b) {
		var c, d;
		document.activeElement && document.activeElement !== a && document.activeElement.blur(), d = b.changedTouches[0], c = document.createEvent("MouseEvents"), c.initMouseEvent(this.determineEventType(a), !0, !0, window, 1, d.screenX, d.screenY, d.clientX, d.clientY, !1, !1, !1, !1, 0, null), c.forwardedTouchEvent = !0, a.dispatchEvent(c)
	}, a.prototype.determineEventType = function(a) {
		return c && "select" === a.tagName.toLowerCase() ? "mousedown" : "click"
	}, a.prototype.focus = function(a) {
		var b;
		d && a.setSelectionRange && 0 !== a.type.indexOf("date") && "time" !== a.type && "month" !== a.type ? (b = a.value.length, a.setSelectionRange(b, b)) : a.focus()
	}, a.prototype.updateScrollParent = function(a) {
		var b, c;
		if (b = a.fastClickScrollParent, !b || !b.contains(a)) {
			c = a;
			do {
				if (c.scrollHeight > c.offsetHeight) {
					b = c, a.fastClickScrollParent = c;
					break
				}
				c = c.parentElement
			} while (c)
		}
		b && (b.fastClickLastScrollTop = b.scrollTop)
	}, a.prototype.getTargetElementFromEventTarget = function(a) {
		return a.nodeType === Node.TEXT_NODE ? a.parentNode : a
	}, a.prototype.onTouchStart = function(a) {
		var b, c, f;
		if (a.targetTouches.length > 1) return !0;
		if (b = this.getTargetElementFromEventTarget(a.target), c = a.targetTouches[0], d) {
			if (f = window.getSelection(), f.rangeCount && !f.isCollapsed) return !0;
			if (!e) {
				if (c.identifier && c.identifier === this.lastTouchIdentifier) return a.preventDefault(), !1;
				this.lastTouchIdentifier = c.identifier, this.updateScrollParent(b)
			}
		}
		return this.trackingClick = !0, this.trackingClickStart = a.timeStamp, this.targetElement = b, this.touchStartX = c.pageX, this.touchStartY = c.pageY, a.timeStamp - this.lastClickTime < this.tapDelay && a.preventDefault(), !0
	}, a.prototype.touchHasMoved = function(a) {
		var b = a.changedTouches[0],
			c = this.touchBoundary;
		return Math.abs(b.pageX - this.touchStartX) > c || Math.abs(b.pageY - this.touchStartY) > c ? !0 : !1
	}, a.prototype.onTouchMove = function(a) {
		return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(a.target) || this.touchHasMoved(a)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
	}, a.prototype.findControl = function(a) {
		return void 0 !== a.control ? a.control : a.htmlFor ? document.getElementById(a.htmlFor) : a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
	}, a.prototype.onTouchEnd = function(a) {
		var b, g, h, i, j, k = this.targetElement;
		if (!this.trackingClick) return !0;
		if (a.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
		if (a.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
		if (this.cancelNextClick = !1, this.lastClickTime = a.timeStamp, g = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, f && (j = a.changedTouches[0], k = document.elementFromPoint(j.pageX - window.pageXOffset, j.pageY - window.pageYOffset) || k, k.fastClickScrollParent = this.targetElement.fastClickScrollParent), h = k.tagName.toLowerCase(), "label" === h) {
			if (b = this.findControl(k)) {
				if (this.focus(k), c) return !1;
				k = b
			}
		} else if (this.needsFocus(k)) return a.timeStamp - g > 100 || d && window.top !== window && "input" === h ? (this.targetElement = null, !1) : (this.focus(k), this.sendClick(k, a), d && "select" === h || (this.targetElement = null, a.preventDefault()), !1);
		return d && !e && (i = k.fastClickScrollParent, i && i.fastClickLastScrollTop !== i.scrollTop) ? !0 : (this.needsClick(k) || (a.preventDefault(), this.sendClick(k, a)), !1)
	}, a.prototype.onTouchCancel = function() {
		this.trackingClick = !1, this.targetElement = null
	}, a.prototype.onMouse = function(a) {
		return this.targetElement ? a.forwardedTouchEvent ? !0 : a.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.propagationStopped = !0, a.stopPropagation(), a.preventDefault(), !1) : !0 : !0
	}, a.prototype.onClick = function(a) {
		var b;
		return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === a.target.type && 0 === a.detail ? !0 : (b = this.onMouse(a), b || (this.targetElement = null), b)
	}, a.prototype.destroy = function() {
		var a = this.layer;
		c && (a.removeEventListener("mouseover", this.onMouse, !0), a.removeEventListener("mousedown", this.onMouse, !0), a.removeEventListener("mouseup", this.onMouse, !0)), a.removeEventListener("click", this.onClick, !0), a.removeEventListener("touchstart", this.onTouchStart, !1), a.removeEventListener("touchmove", this.onTouchMove, !1), a.removeEventListener("touchend", this.onTouchEnd, !1), a.removeEventListener("touchcancel", this.onTouchCancel, !1)
	}, a.notNeeded = function(a) {
		var b, d, e, f;
		if ("undefined" == typeof window.ontouchstart) return !0;
		if (d = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
			if (!c) return !0;
			if (b = document.querySelector("meta[name=viewport]")) {
				if (-1 !== b.content.indexOf("user-scalable=no")) return !0;
				if (d > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
			}
		}
		if (g && (e = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), e[1] >= 10 && e[2] >= 3 && (b = document.querySelector("meta[name=viewport]")))) {
			if (-1 !== b.content.indexOf("user-scalable=no")) return !0;
			if (document.documentElement.scrollWidth <= window.outerWidth) return !0
		}
		return "none" === a.style.msTouchAction || "manipulation" === a.style.touchAction ? !0 : (f = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], f >= 27 && (b = document.querySelector("meta[name=viewport]"), b && (-1 !== b.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === a.style.touchAction || "manipulation" === a.style.touchAction ? !0 : !1)
	}, a.attach = function(b, c) {
		return new a(b, c)
	}, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
		return a
	}) : "undefined" != typeof module && module.exports ? (module.exports = a.attach, module.exports.FastClick = a) : window.FastClick = a
}(), function(a, b, c) {
	"use strict";

	function d(a, b, c) {
		if (!a) throw ngMinErr("areq", "Argument '{0}' is {1}", b || "?", c || "required");
		return a
	}
	function e(a, b) {
		return a || b ? a ? b ? (Q(a) && (a = a.join(" ")), Q(b) && (b = b.join(" ")), a + " " + b) : a : b : ""
	}
	function f(a) {
		var b = {};
		return a && (a.to || a.from) && (b.to = a.to, b.from = a.from), b
	}
	function g(a, b, c) {
		var d = "";
		return a = Q(a) ? a : a && R(a) && a.length ? a.split(/\s+/) : [], P(a, function(a, e) {
			a && a.length > 0 && (d += e > 0 ? " " : "", d += c ? b + a : a + b)
		}), d
	}
	function h(a, b) {
		var c = a.indexOf(b);
		b >= 0 && a.splice(c, 1)
	}
	function i(a) {
		if (a instanceof O) switch (a.length) {
		case 0:
			return [];
		case 1:
			if (a[0].nodeType === X) return a;
			break;
		default:
			return O(j(a))
		}
		return a.nodeType === X ? O(a) : void 0
	}
	function j(a) {
		if (!a[0]) return a;
		for (var b = 0; b < a.length; b++) {
			var c = a[b];
			if (c.nodeType == X) return c
		}
	}
	function k(a, b, c) {
		P(b, function(b) {
			a.addClass(b, c)
		})
	}
	function l(a, b, c) {
		P(b, function(b) {
			a.removeClass(b, c)
		})
	}
	function m(a) {
		return function(b, c) {
			c.addClass && (k(a, b, c.addClass), c.addClass = null), c.removeClass && (l(a, b, c.removeClass), c.removeClass = null)
		}
	}
	function n(a) {
		if (a = a || {}, !a.$$prepared) {
			var b = a.domOperation || M;
			a.domOperation = function() {
				a.$$domOperationFired = !0, b(), b = M
			}, a.$$prepared = !0
		}
		return a
	}
	function o(a, b) {
		p(a, b), q(a, b)
	}
	function p(a, b) {
		b.from && (a.css(b.from), b.from = null)
	}
	function q(a, b) {
		b.to && (a.css(b.to), b.to = null)
	}
	function r(a, b, c) {
		var d = (b.addClass || "") + " " + (c.addClass || ""),
			e = (b.removeClass || "") + " " + (c.removeClass || ""),
			f = s(a.attr("class"), d, e);
		c.preparationClasses && (b.preparationClasses = z(c.preparationClasses, b.preparationClasses), delete c.preparationClasses);
		var g = b.domOperation !== M ? b.domOperation : null;
		return N(b, c), g && (b.domOperation = g), f.addClass ? b.addClass = f.addClass : b.addClass = null, f.removeClass ? b.removeClass = f.removeClass : b.removeClass = null, b
	}
	function s(a, b, c) {
		function d(a) {
			R(a) && (a = a.split(" "));
			var b = {};
			return P(a, function(a) {
				a.length && (b[a] = !0)
			}), b
		}
		var e = 1,
			f = -1,
			g = {};
		a = d(a), b = d(b), P(b, function(a, b) {
			g[b] = e
		}), c = d(c), P(c, function(a, b) {
			g[b] = g[b] === e ? null : f
		});
		var h = {
			addClass: "",
			removeClass: ""
		};
		return P(g, function(b, c) {
			var d, g;
			b === e ? (d = "addClass", g = !a[c]) : b === f && (d = "removeClass", g = a[c]), g && (h[d].length && (h[d] += " "), h[d] += c)
		}), h
	}
	function t(a) {
		return a instanceof b.element ? a[0] : a
	}
	function u(a, b, c) {
		var d = "";
		b && (d = g(b, $, !0)), c.addClass && (d = z(d, g(c.addClass, Y))), c.removeClass && (d = z(d, g(c.removeClass, Z))), d.length && (c.preparationClasses = d, a.addClass(d))
	}
	function v(a, b) {
		b.preparationClasses && (a.removeClass(b.preparationClasses), b.preparationClasses = null), b.activeClasses && (a.removeClass(b.activeClasses), b.activeClasses = null)
	}
	function w(a, b) {
		var c = b ? "-" + b + "s" : "";
		return y(a, [ma, c]), [ma, c]
	}
	function x(a, b) {
		var c = b ? "paused" : "",
			d = K + ia;
		return y(a, [d, c]), [d, c]
	}
	function y(a, b) {
		var c = b[0],
			d = b[1];
		a.style[c] = d
	}
	function z(a, b) {
		return a ? b ? a + " " + b : a : b
	}
	function A() {
		this.$get = ["$document", function(a) {
			return O(a[0].body)
		}]
	}
	function B(a) {
		return [la, a + "s"]
	}
	function C(a, b) {
		var c = b ? ka : ma;
		return [c, a + "s"]
	}
	function D(a, b, c) {
		var d = Object.create(null),
			e = a.getComputedStyle(b) || {};
		return P(c, function(a, b) {
			var c = e[a];
			if (c) {
				var f = c.charAt(0);
				("-" === f || "+" === f || f >= 0) && (c = E(c)), 0 === c && (c = null), d[b] = c
			}
		}), d
	}
	function E(a) {
		var b = 0,
			c = a.split(/\s*,\s*/);
		return P(c, function(a) {
			"s" == a.charAt(a.length - 1) && (a = a.substring(0, a.length - 1)), a = parseFloat(a) || 0, b = b ? Math.max(a, b) : a
		}), b
	}
	function F(a) {
		return 0 === a || null != a
	}
	function G(a, b) {
		var c = I,
			d = a + "s";
		return b ? c += da : d += " linear all", [c, d]
	}
	function H() {
		var a = Object.create(null);
		return {
			flush: function() {
				a = Object.create(null)
			},
			count: function(b) {
				var c = a[b];
				return c ? c.total : 0
			},
			get: function(b) {
				var c = a[b];
				return c && c.value
			},
			put: function(b, c) {
				a[b] ? a[b].total++ : a[b] = {
					total: 1,
					value: c
				}
			}
		}
	}
	var I, J, K, L, M = b.noop,
		N = b.extend,
		O = b.element,
		P = b.forEach,
		Q = b.isArray,
		R = b.isString,
		S = b.isObject,
		T = b.isUndefined,
		U = b.isDefined,
		V = b.isFunction,
		W = b.isElement,
		X = 1,
		Y = "-add",
		Z = "-remove",
		$ = "ng-",
		_ = "-active",
		aa = "ng-animate",
		ba = "$$ngAnimateChildren",
		ca = "";
	a.ontransitionend === c && a.onwebkittransitionend !== c ? (ca = "-webkit-", I = "WebkitTransition", J = "webkitTransitionEnd transitionend") : (I = "transition", J = "transitionend"), a.onanimationend === c && a.onwebkitanimationend !== c ? (ca = "-webkit-", K = "WebkitAnimation", L = "webkitAnimationEnd animationend") : (K = "animation", L = "animationend");
	var da = "Duration",
		ea = "Property",
		fa = "Delay",
		ga = "TimingFunction",
		ha = "IterationCount",
		ia = "PlayState",
		ja = 9999,
		ka = K + fa,
		la = K + da,
		ma = I + fa,
		na = I + da,
		oa = [function() {
			return function(a, c, d) {
				var e = d.ngAnimateChildren;
				b.isString(e) && 0 === e.length ? c.data(ba, !0) : d.$observe("ngAnimateChildren", function(a) {
					a = "on" === a || "true" === a, c.data(ba, a)
				})
			}
		}],
		pa = 1e3,
		qa = 3,
		ra = 1.5,
		sa = {
			transitionDuration: na,
			transitionDelay: ma,
			transitionProperty: I + ea,
			animationDuration: la,
			animationDelay: ka,
			animationIterationCount: K + ha
		},
		ta = {
			transitionDuration: na,
			transitionDelay: ma,
			animationDuration: la,
			animationDelay: ka
		},
		ua = ["$animateProvider", function(a) {
			var b = H(),
				c = H();
			this.$get = ["$window", "$$jqLite", "$$AnimateRunner", "$timeout", "$$forceReflow", "$sniffer", "$$rAF", function(a, d, e, i, j, k, l) {
				function r(a, b) {
					var c = "$$ngAnimateParentKey",
						d = a.parentNode,
						e = d[c] || (d[c] = ++M);
					return e + "-" + a.getAttribute("class") + "-" + b
				}
				function s(c, d, e, f) {
					var g = b.get(e);
					return g || (g = D(a, c, f), "infinite" === g.animationIterationCount && (g.animationIterationCount = 1)), b.put(e, g), g
				}
				function u(e, f, h, i) {
					var j;
					if (b.count(h) > 0 && (j = c.get(h), !j)) {
						var k = g(f, "-stagger");
						d.addClass(e, k), j = D(a, e, i), j.animationDuration = Math.max(j.animationDuration, 0), j.transitionDuration = Math.max(j.transitionDuration, 0), d.removeClass(e, k), c.put(h, j)
					}
					return j || {}
				}
				function v(a) {
					E && E(), N.push(a), E = l(function() {
						E = null, b.flush(), c.flush();
						for (var a = j(), d = 0; d < N.length; d++) N[d](a);
						N.length = 0
					})
				}
				function z(a, b, c) {
					var d = s(a, b, c, sa),
						e = d.animationDelay,
						f = d.transitionDelay;
					return d.maxDelay = e && f ? Math.max(e, f) : e || f, d.maxDuration = Math.max(d.animationDuration * d.animationIterationCount, d.transitionDuration), d
				}
				function A(a, c) {
					function j() {
						m()
					}
					function l() {
						m(!0)
					}
					function m(b) {
						M || O && N || (M = !0, N = !1, c.$$skipPreparationClasses || d.removeClass(a, ia), d.removeClass(a, la), x(E, !1), w(E, !1), P(X, function(a) {
							E.style[a[0]] = ""
						}), H(a, c), o(a, c), c.onDone && c.onDone(), R && R.complete(!b))
					}
					function s(a) {
						Da.blockTransition && w(E, a), Da.blockKeyframeAnimation && x(E, !! a)
					}
					function A() {
						return R = new e({
							end: j,
							cancel: l
						}), m(), {
							$$willAnimate: !1,
							start: function() {
								return R
							},
							end: j
						}
					}
					function D() {
						function b() {
							if (!M) {
								if (s(!1), P(X, function(a) {
									var b = a[0],
										c = a[1];
									E.style[b] = c
								}), H(a, c), d.addClass(a, la), Da.recalculateTimingStyles) {
									if (ka = E.className + " " + ia, oa = r(E, ka), Ba = z(E, ka, oa), Ca = Ba.maxDelay, T = Math.max(Ca, 0), V = Ba.maxDuration, 0 === V) return void m();
									Da.hasTransitions = Ba.transitionDuration > 0, Da.hasAnimations = Ba.animationDuration > 0
								}
								if (Da.applyTransitionDelay || Da.applyAnimationDelay) {
									Ca = "boolean" != typeof c.delay && F(c.delay) ? parseFloat(c.delay) : Ca, T = Math.max(Ca, 0);
									var b;
									Da.applyTransitionDelay && (Ba.transitionDelay = Ca, b = C(Ca), X.push(b), E.style[b[0]] = b[1]), Da.applyAnimationDelay && (Ba.animationDelay = Ca, b = C(Ca, !0), X.push(b), E.style[b[0]] = b[1])
								}
								if (U = T * pa, W = V * pa, c.easing) {
									var h, k = c.easing;
									Da.hasTransitions && (h = I + ga, X.push([h, k]), E.style[h] = k), Da.hasAnimations && (h = K + ga, X.push([h, k]), E.style[h] = k)
								}
								Ba.transitionDuration && j.push(J), Ba.animationDuration && j.push(L), g = Date.now(), a.on(j.join(" "), f), i(e, U + ra * W, !1), q(a, c)
							}
						}
						function e() {
							m()
						}
						function f(a) {
							a.stopPropagation();
							var b = a.originalEvent || a,
								c = b.$manualTimeStamp || b.timeStamp || Date.now(),
								d = parseFloat(b.elapsedTime.toFixed(qa));
							Math.max(c - g, 0) >= U && d >= V && (O = !0, m())
						}
						if (!M) {
							if (!E.parentNode) return void m();
							var g, j = [],
								k = function(a) {
									if (O) N && a && (N = !1, m());
									else if (N = !a, Ba.animationDuration) {
										var b = x(E, N);
										N ? X.push(b) : h(X, b)
									}
								},
								l = za > 0 && (Ba.transitionDuration && 0 === sa.transitionDuration || Ba.animationDuration && 0 === sa.animationDuration) && Math.max(sa.animationDelay, sa.transitionDelay);
							l ? i(b, Math.floor(l * za * pa), !1) : b(), S.resume = function() {
								k(!0)
							}, S.pause = function() {
								k(!1)
							}
						}
					}
					var E = t(a);
					if (!E || !E.parentNode) return A();
					c = n(c);
					var M, N, O, R, S, T, U, V, W, X = [],
						aa = a.attr("class"),
						ba = f(c);
					if (0 === c.duration || !k.animations && !k.transitions) return A();
					var ca = c.event && Q(c.event) ? c.event.join(" ") : c.event,
						da = ca && c.structural,
						fa = "",
						ha = "";
					da ? fa = g(ca, $, !0) : ca && (fa = ca), c.addClass && (ha += g(c.addClass, Y)), c.removeClass && (ha.length && (ha += " "), ha += g(c.removeClass, Z)), c.applyClassesEarly && ha.length && (H(a, c), ha = "");
					var ia = [fa, ha].join(" ").trim(),
						ka = aa + " " + ia,
						la = g(ia, _),
						ma = ba.to && Object.keys(ba.to).length > 0,
						na = (c.keyframeStyle || "").length > 0;
					if (!na && !ma && !ia) return A();
					var oa, sa;
					if (c.stagger > 0) {
						var ua = parseFloat(c.stagger);
						sa = {
							transitionDelay: ua,
							animationDelay: ua,
							transitionDuration: 0,
							animationDuration: 0
						}
					} else oa = r(E, ka), sa = u(E, ia, oa, ta);
					c.$$skipPreparationClasses || d.addClass(a, ia);
					var va;
					if (c.transitionStyle) {
						var wa = [I, c.transitionStyle];
						y(E, wa), X.push(wa)
					}
					if (c.duration >= 0) {
						va = E.style[I].length > 0;
						var xa = G(c.duration, va);
						y(E, xa), X.push(xa)
					}
					if (c.keyframeStyle) {
						var ya = [K, c.keyframeStyle];
						y(E, ya), X.push(ya)
					}
					var za = sa ? c.staggerIndex >= 0 ? c.staggerIndex : b.count(oa) : 0,
						Aa = 0 === za;
					Aa && !c.skipBlocking && w(E, ja);
					var Ba = z(E, ka, oa),
						Ca = Ba.maxDelay;
					T = Math.max(Ca, 0), V = Ba.maxDuration;
					var Da = {};
					return Da.hasTransitions = Ba.transitionDuration > 0, Da.hasAnimations = Ba.animationDuration > 0, Da.hasTransitionAll = Da.hasTransitions && "all" == Ba.transitionProperty, Da.applyTransitionDuration = ma && (Da.hasTransitions && !Da.hasTransitionAll || Da.hasAnimations && !Da.hasTransitions), Da.applyAnimationDuration = c.duration && Da.hasAnimations, Da.applyTransitionDelay = F(c.delay) && (Da.applyTransitionDuration || Da.hasTransitions), Da.applyAnimationDelay = F(c.delay) && Da.hasAnimations, Da.recalculateTimingStyles = ha.length > 0, (Da.applyTransitionDuration || Da.applyAnimationDuration) && (V = c.duration ? parseFloat(c.duration) : V, Da.applyTransitionDuration && (Da.hasTransitions = !0, Ba.transitionDuration = V, va = E.style[I + ea].length > 0, X.push(G(V, va))), Da.applyAnimationDuration && (Da.hasAnimations = !0, Ba.animationDuration = V, X.push(B(V)))), 0 !== V || Da.recalculateTimingStyles ? (null == c.duration && Ba.transitionDuration > 0 && (Da.recalculateTimingStyles = Da.recalculateTimingStyles || Aa), U = T * pa, W = V * pa, c.skipBlocking || (Da.blockTransition = Ba.transitionDuration > 0, Da.blockKeyframeAnimation = Ba.animationDuration > 0 && sa.animationDelay > 0 && 0 === sa.animationDuration), p(a, c), Da.blockTransition || Da.blockKeyframeAnimation ? s(V) : c.skipBlocking || w(E, !1), {
						$$willAnimate: !0,
						end: j,
						start: function() {
							return M ? void 0 : (S = {
								end: j,
								cancel: l,
								resume: null,
								pause: null
							}, R = new e(S), v(D), R)
						}
					}) : A()
				}
				var E, H = m(d),
					M = 0,
					N = [];
				return A
			}]
		}],
		va = ["$$animationProvider", function(a) {
			a.drivers.push("$$animateCssDriver");
			var b = "ng-animate-shim",
				c = "ng-anchor",
				d = "ng-anchor-out",
				e = "ng-anchor-in";
			this.$get = ["$animateCss", "$rootScope", "$$AnimateRunner", "$rootElement", "$$body", "$sniffer", "$$jqLite", function(a, f, g, h, i, j, k) {
				function l(a) {
					return a.replace(/\bng-\S+\b/g, "")
				}
				function n(a, b) {
					return R(a) && (a = a.split(" ")), R(b) && (b = b.split(" ")), a.filter(function(a) {
						return -1 === b.indexOf(a)
					}).join(" ")
				}
				function o(f, h, i) {
					function j(a) {
						var b = {},
							c = t(a).getBoundingClientRect();
						return P(["width", "height", "top", "left"], function(a) {
							var d = c[a];
							switch (a) {
							case "top":
								d += r.scrollTop;
								break;
							case "left":
								d += r.scrollLeft
							}
							b[a] = Math.floor(d) + "px"
						}), b
					}
					function k() {
						var b = a(q, {
							addClass: d,
							delay: !0,
							from: j(h)
						});
						return b.$$willAnimate ? b : null
					}
					function m(a) {
						return a.attr("class") || ""
					}
					function o() {
						var b = l(m(i)),
							c = n(b, s),
							f = n(s, b),
							g = a(q, {
								to: j(i),
								addClass: e + " " + c,
								removeClass: d + " " + f,
								delay: !0
							});
						return g.$$willAnimate ? g : null
					}
					function p() {
						q.remove(), h.removeClass(b), i.removeClass(b)
					}
					var q = O(t(h).cloneNode(!0)),
						s = l(m(q));
					h.addClass(b), i.addClass(b), q.addClass(c), u.append(q);
					var v, w = k();
					if (!w && (v = o(), !v)) return p();
					var x = w || v;
					return {
						start: function() {
							function a() {
								c && c.end()
							}
							var b, c = x.start();
							return c.done(function() {
								return c = null, !v && (v = o()) ? (c = v.start(), c.done(function() {
									c = null, p(), b.complete()
								}), c) : (p(), void b.complete())
							}), b = new g({
								end: a,
								cancel: a
							})
						}
					}
				}
				function p(a, b, c, d) {
					var e = q(a, M),
						f = q(b, M),
						h = [];
					return P(d, function(a) {
						var b = a.out,
							d = a["in"],
							e = o(c, b, d);
						e && h.push(e)
					}), e || f || 0 !== h.length ? {
						start: function() {
							function a() {
								P(b, function(a) {
									a.end()
								})
							}
							var b = [];
							e && b.push(e.start()), f && b.push(f.start()), P(h, function(a) {
								b.push(a.start())
							});
							var c = new g({
								end: a,
								cancel: a
							});
							return g.all(b, function(a) {
								c.complete(a)
							}), c
						}
					} : void 0
				}
				function q(b, c) {
					var d = b.element,
						e = b.options || {};
					e.$$skipPreparationClasses = !0, e.skipBlocking = !0, b.structural && (e.event = b.event, "leave" === b.event && (e.onDone = e.domOperation)), c(d), v(d, e), e.preparationClasses && (e.event = z(e.event, e.preparationClasses));
					var f = a(d, e);
					return f.$$willAnimate ? f : null
				}
				if (!j.animations && !j.transitions) return M;
				var r = t(i),
					s = t(h),
					u = O(r.parentNode === s ? r : s),
					v = m(k);
				return function(a, b) {
					return a.from && a.to ? p(a.from, a.to, a.classes, a.anchors) : q(a, b)
				}
			}]
		}],
		wa = ["$animateProvider", function(a) {
			this.$get = ["$injector", "$$AnimateRunner", "$$rAFMutex", "$$jqLite", function(b, c, d, e) {
				function f(c) {
					c = Q(c) ? c : c.split(" ");
					for (var d = [], e = {}, f = 0; f < c.length; f++) {
						var g = c[f],
							h = a.$$registeredAnimations[g];
						h && !e[g] && (d.push(b.get(h)), e[g] = !0)
					}
					return d
				}
				var g = m(e);
				return function(a, b, d, e) {
					function h() {
						e.domOperation(), g(a, e)
					}
					function i(a, b, d, e, f) {
						var g;
						switch (d) {
						case "animate":
							g = [b, e.from, e.to, f];
							break;
						case "setClass":
							g = [b, p, q, f];
							break;
						case "addClass":
							g = [b, p, f];
							break;
						case "removeClass":
							g = [b, q, f];
							break;
						default:
							g = [b, f]
						}
						g.push(e);
						var h = a.apply(a, g);
						if (h) if (V(h.start) && (h = h.start()), h instanceof c) h.done(f);
						else if (V(h)) return h;
						return M
					}
					function j(a, b, d, e, f) {
						var g = [];
						return P(e, function(e) {
							var h = e[f];
							h && g.push(function() {
								var e, f, g = !1,
									j = function(a) {
										g || (g = !0, (f || M)(a), e.complete(!a))
									};
								return e = new c({
									end: function() {
										j()
									},
									cancel: function() {
										j(!0)
									}
								}), f = i(h, a, b, d, function(a) {
									var b = a === !1;
									j(b)
								}), e
							})
						}), g
					}
					function k(a, b, d, e, f) {
						var g = j(a, b, d, e, f);
						if (0 === g.length) {
							var h, i;
							"beforeSetClass" === f ? (h = j(a, "removeClass", d, e, "beforeRemoveClass"), i = j(a, "addClass", d, e, "beforeAddClass")) : "setClass" === f && (h = j(a, "removeClass", d, e, "removeClass"), i = j(a, "addClass", d, e, "addClass")), h && (g = g.concat(h)), i && (g = g.concat(i))
						}
						if (0 !== g.length) return function(a) {
							var b = [];
							return g.length && P(g, function(a) {
								b.push(a())
							}), b.length ? c.all(b, a) : a(), function(a) {
								P(b, function(b) {
									a ? b.cancel() : b.end()
								})
							}
						}
					}
					3 === arguments.length && S(d) && (e = d, d = null), e = n(e), d || (d = a.attr("class") || "", e.addClass && (d += " " + e.addClass), e.removeClass && (d += " " + e.removeClass));
					var l, m, p = e.addClass,
						q = e.removeClass,
						r = f(d);
					if (r.length) {
						var s, t;
						"leave" == b ? (t = "leave", s = "afterLeave") : (t = "before" + b.charAt(0).toUpperCase() + b.substr(1), s = b), "enter" !== b && "move" !== b && (l = k(a, b, e, r, t)), m = k(a, b, e, r, s)
					}
					return l || m ? {
						start: function() {
							function b(b) {
								i = !0, h(), o(a, e), j.complete(b)
							}
							function d(a) {
								i || ((f || M)(a), b(a))
							}
							var f, g = [];
							l && g.push(function(a) {
								f = l(a)
							}), g.length ? g.push(function(a) {
								h(), a(!0)
							}) : h(), m && g.push(function(a) {
								f = m(a)
							});
							var i = !1,
								j = new c({
									end: function() {
										d()
									},
									cancel: function() {
										d(!0)
									}
								});
							return c.chain(g, b), j
						}
					} : void 0
				}
			}]
		}],
		xa = ["$$animationProvider", function(a) {
			a.drivers.push("$$animateJsDriver"), this.$get = ["$$animateJs", "$$AnimateRunner", function(a, b) {
				function c(b) {
					var c = b.element,
						d = b.event,
						e = b.options,
						f = b.classes;
					return a(c, d, f, e)
				}
				return function(a) {
					if (a.from && a.to) {
						var d = c(a.from),
							e = c(a.to);
						if (!d && !e) return;
						return {
							start: function() {
								function a() {
									return function() {
										P(f, function(a) {
											a.end()
										})
									}
								}
								function c(a) {
									g.complete(a)
								}
								var f = [];
								d && f.push(d.start()), e && f.push(e.start()), b.all(f, c);
								var g = new b({
									end: a(),
									cancel: a()
								});
								return g
							}
						}
					}
					return c(a)
				}
			}]
		}],
		ya = "data-ng-animate",
		za = "$ngAnimatePin",
		Aa = ["$animateProvider", function(a) {
			function b(a, b, c, d) {
				return g[a].some(function(a) {
					return a(b, c, d)
				})
			}
			function c(a, b) {
				a = a || {};
				var c = (a.addClass || "").length > 0,
					d = (a.removeClass || "").length > 0;
				return b ? c && d : c || d
			}
			var e = 1,
				f = 2,
				g = this.rules = {
					skip: [],
					cancel: [],
					join: []
				};
			g.join.push(function(a, b, d) {
				return !b.structural && c(b.options)
			}), g.skip.push(function(a, b, d) {
				return !b.structural && !c(b.options)
			}), g.skip.push(function(a, b, c) {
				return "leave" == c.event && b.structural
			}), g.skip.push(function(a, b, c) {
				return c.structural && c.state === f && !b.structural
			}), g.cancel.push(function(a, b, c) {
				return c.structural && b.structural
			}), g.cancel.push(function(a, b, c) {
				return c.state === f && b.structural
			}), g.cancel.push(function(a, b, c) {
				var d = b.options,
					e = c.options;
				return d.addClass && d.addClass === e.removeClass || d.removeClass && d.removeClass === e.addClass
			}), this.$get = ["$$rAF", "$rootScope", "$rootElement", "$document", "$$body", "$$HashMap", "$$animation", "$$AnimateRunner", "$templateRequest", "$$jqLite", "$$forceReflow", function(g, h, k, l, p, q, s, x, y, z, A) {
				function B(a, b) {
					return r(a, b, {})
				}
				function C(a, b) {
					var c = t(a),
						d = [],
						e = V[b];
					return e && P(e, function(a) {
						a.node.contains(c) && d.push(a.callback)
					}), d
				}
				function D(a, b, c, d) {
					g(function() {
						P(C(b, a), function(a) {
							a(b, c, d)
						})
					})
				}
				function E(a, d, g) {
					function j(b, c, d, e) {
						D(c, a, d, e), b.progress(c, d, e)
					}
					function k(b) {
						v(a, g), $(a, g), o(a, g), g.domOperation(), p.complete(!b)
					}
					var l, m;
					a = i(a), a && (l = t(a), m = a.parent()), g = n(g);
					var p = new x;
					if (Q(g.addClass) && (g.addClass = g.addClass.join(" ")), g.addClass && !R(g.addClass) && (g.addClass = null), Q(g.removeClass) && (g.removeClass = g.removeClass.join(" ")), g.removeClass && !R(g.removeClass) && (g.removeClass = null), g.from && !S(g.from) && (g.from = null), g.to && !S(g.to) && (g.to = null), !l) return k(), p;
					var q = [l.className, g.addClass, g.removeClass].join(" ");
					if (!Z(q)) return k(), p;
					var y = ["enter", "move", "leave"].indexOf(d) >= 0,
						z = !M || L.get(l),
						C = !z && K.get(l) || {},
						E = !! C.state;
					if (z || E && C.state == e || (z = !I(a, m, d)), z) return k(), p;
					y && F(a);
					var H = {
						structural: y,
						element: a,
						event: d,
						close: k,
						options: g,
						runner: p
					};
					if (E) {
						var N = b("skip", a, H, C);
						if (N) return C.state === f ? (k(), p) : (r(a, C.options, g), C.runner);
						var O = b("cancel", a, H, C);
						if (O) if (C.state === f) C.runner.end();
						else {
							if (!C.structural) return r(a, C.options, H.options), C.runner;
							C.close()
						} else {
							var P = b("join", a, H, C);
							if (P) {
								if (C.state !== f) return u(a, y ? d : null, g), d = H.event = C.event, g = r(a, C.options, H.options), C.runner;
								B(a, g)
							}
						}
					} else B(a, g);
					var T = H.structural;
					if (T || (T = "animate" === H.event && Object.keys(H.options.to || {}).length > 0 || c(H.options)), !T) return k(), G(a), p;
					u(a, y ? d : null, g), w(l, ja);
					var U = (C.counter || 0) + 1;
					return H.counter = U, J(a, e, H), h.$$postDigest(function() {
						var b = K.get(l),
							e = !b;
						b = b || {};
						var h = a.parent() || [],
							i = h.length > 0 && ("animate" === b.event || b.structural || c(b.options));
						if (e || b.counter !== U || !i) return e && ($(a, g), o(a, g)), (e || y && b.event !== d) && (g.domOperation(), p.end()), void(i || G(a));
						d = !b.structural && c(b.options, !0) ? "setClass" : b.event, J(a, f);
						var m = s(a, d, b.options, function(a) {
							A(), w(t(a), !1)
						});
						m.done(function(b) {
							k(!b);
							var c = K.get(l);
							c && c.counter === U && G(t(a)), j(p, d, "close", {})
						}), p.setHost(m), j(p, d, "start", {})
					}), p
				}
				function F(a) {
					var b = t(a),
						c = b.querySelectorAll("[" + ya + "]");
					P(c, function(a) {
						var b = parseInt(a.getAttribute(ya)),
							c = K.get(a);
						switch (b) {
						case f:
							c.runner.end();
						case e:
							c && K.remove(a)
						}
					})
				}
				function G(a) {
					var b = t(a);
					b.removeAttribute(ya), K.remove(b)
				}
				function H(a, b) {
					return t(a) === t(b)
				}
				function I(a, b, c) {
					var d, e = H(a, p) || "HTML" === a[0].nodeName,
						f = H(a, k),
						g = !1,
						h = a.data(za);
					for (h && (b = h); b && b.length;) {
						f || (f = H(b, k));
						var i = b[0];
						if (i.nodeType !== X) break;
						var j = K.get(i) || {};
						if (g || (g = j.structural || L.get(i)), T(d) || d === !0) {
							var l = b.data(ba);
							U(l) && (d = l)
						}
						if (g && d === !1) break;
						f || (f = H(b, k), f || (h = b.data(za), h && (b = h))), e || (e = H(b, p)), b = b.parent()
					}
					var m = !g || d;
					return m && f && e
				}
				function J(a, b, c) {
					c = c || {}, c.state = b;
					var d = t(a);
					d.setAttribute(ya, b);
					var e = K.get(d),
						f = e ? N(e, c) : c;
					K.put(d, f)
				}
				var K = new q,
					L = new q,
					M = null,
					O = h.$watch(function() {
						return 0 === y.totalPendingRequests
					}, function(a) {
						a && (O(), h.$$postDigest(function() {
							h.$$postDigest(function() {
								null === M && (M = !0)
							})
						}))
					}),
					V = {},
					Y = a.classNameFilter(),
					Z = Y ?
				function(a) {
					return Y.test(a)
				} : function() {
					return !0
				}, $ = m(z);
				return {
					on: function(a, b, c) {
						var d = j(b);
						V[a] = V[a] || [], V[a].push({
							node: d,
							callback: c
						})
					},
					off: function(a, b, c) {
						function d(a, b, c) {
							var d = j(b);
							return a.filter(function(a) {
								var b = a.node === d && (!c || a.callback === c);
								return !b
							})
						}
						var e = V[a];
						e && (V[a] = 1 === arguments.length ? null : d(e, b, c))
					},
					pin: function(a, b) {
						d(W(a), "element", "not an element"), d(W(b), "parentElement", "not an element"), a.data(za, b)
					},
					push: function(a, b, c, d) {
						return c = c || {}, c.domOperation = d, E(a, b, c)
					},
					enabled: function(a, b) {
						var c = arguments.length;
						if (0 === c) b = !! M;
						else {
							var d = W(a);
							if (d) {
								var e = t(a),
									f = L.get(e);
								1 === c ? b = !f : (b = !! b, b ? f && L.remove(e) : L.put(e, !0))
							} else b = M = !! a
						}
						return b
					}
				}
			}]
		}],
		Ba = ["$$rAF", function(a) {
			return function() {
				var b = !1;
				return a(function() {
					b = !0
				}), function(c) {
					b ? c() : a(c)
				}
			}
		}],
		Ca = ["$q", "$$rAFMutex", function(a, b) {
			function c(a) {
				this.setHost(a), this._doneCallbacks = [], this._runInAnimationFrame = b(), this._state = 0
			}
			var d = 0,
				e = 1,
				f = 2;
			return c.chain = function(a, b) {
				function c() {
					return d === a.length ? void b(!0) : void a[d](function(a) {
						return a === !1 ? void b(!1) : (d++, void c())
					})
				}
				var d = 0;
				c()
			}, c.all = function(a, b) {
				function c(c) {
					e = e && c, ++d === a.length && b(e)
				}
				var d = 0,
					e = !0;
				P(a, function(a) {
					a.done(c)
				})
			}, c.prototype = {
				setHost: function(a) {
					this.host = a || {}
				},
				done: function(a) {
					this._state === f ? a() : this._doneCallbacks.push(a)
				},
				progress: M,
				getPromise: function() {
					if (!this.promise) {
						var b = this;
						this.promise = a(function(a, c) {
							b.done(function(b) {
								b === !1 ? c() : a()
							})
						})
					}
					return this.promise
				},
				then: function(a, b) {
					return this.getPromise().then(a, b)
				},
				"catch": function(a) {
					return this.getPromise()["catch"](a)
				},
				"finally": function(a) {
					return this.getPromise()["finally"](a)
				},
				pause: function() {
					this.host.pause && this.host.pause()
				},
				resume: function() {
					this.host.resume && this.host.resume()
				},
				end: function() {
					this.host.end && this.host.end(), this._resolve(!0)
				},
				cancel: function() {
					this.host.cancel && this.host.cancel(), this._resolve(!1)
				},
				complete: function(a) {
					var b = this;
					b._state === d && (b._state = e, b._runInAnimationFrame(function() {
						b._resolve(a)
					}))
				},
				_resolve: function(a) {
					this._state !== f && (P(this._doneCallbacks, function(b) {
						b(a)
					}), this._doneCallbacks.length = 0, this._state = f)
				}
			}, c
		}],
		Da = ["$animateProvider", function(a) {
			function b(a, b) {
				a.data(h, b)
			}
			function c(a) {
				a.removeData(h)
			}
			function d(a) {
				return a.data(h)
			}
			var f = "ng-animate-ref",
				g = this.drivers = [],
				h = "$$animationRunner";
			this.$get = ["$$jqLite", "$rootScope", "$injector", "$$AnimateRunner", "$$HashMap", function(a, h, i, j, k) {
				function l(a) {
					function b(a) {
						if (a.processed) return a;
						a.processed = !0;
						var c = a.domNode,
							d = c.parentNode;
						f.put(c, a);
						for (var g; d;) {
							if (g = f.get(d)) {
								g.processed || (g = b(g));
								break
							}
							d = d.parentNode
						}
						return (g || e).children.push(a), a
					}
					function c(a) {
						var b, c = [],
							d = [];
						for (b = 0; b < a.children.length; b++) d.push(a.children[b]);
						var e = d.length,
							f = 0,
							g = [];
						for (b = 0; b < d.length; b++) {
							var h = d[b];
							0 >= e && (e = f, f = 0, c = c.concat(g), g = []), g.push(h.fn), P(h.children, function(a) {
								f++, d.push(a)
							}), e--
						}
						return g.length && (c = c.concat(g)), c
					}
					var d, e = {
						children: []
					},
						f = new k;
					for (d = 0; d < a.length; d++) {
						var g = a[d];
						f.put(g.domNode, a[d] = {
							domNode: g.domNode,
							fn: g.fn,
							children: []
						})
					}
					for (d = 0; d < a.length; d++) b(a[d]);
					return c(e)
				}
				var p = [],
					q = m(a);
				return function(k, m, r, s) {
					function u(a) {
						var b = "[" + f + "]",
							c = a.hasAttribute(f) ? [a] : a.querySelectorAll(b),
							d = [];
						return P(c, function(a) {
							var b = a.getAttribute(f);
							b && b.length && d.push(a)
						}), d
					}
					function v(a) {
						var b = [],
							c = {};
						P(a, function(a, d) {
							var e = a.element,
								g = t(e),
								h = a.event,
								i = ["enter", "move"].indexOf(h) >= 0,
								j = a.structural ? u(g) : [];
							if (j.length) {
								var k = i ? "to" : "from";
								P(j, function(a) {
									var b = a.getAttribute(f);
									c[b] = c[b] || {}, c[b][k] = {
										animationID: d,
										element: O(a)
									}
								})
							} else b.push(a)
						});
						var d = {},
							e = {};
						return P(c, function(c, f) {
							var g = c.from,
								h = c.to;
							if (!g || !h) {
								var i = g ? g.animationID : h.animationID,
									j = i.toString();
								return void(d[j] || (d[j] = !0, b.push(a[i])))
							}
							var k = a[g.animationID],
								l = a[h.animationID],
								m = g.animationID.toString();
							if (!e[m]) {
								var n = e[m] = {
									beforeStart: function() {
										k.beforeStart(), l.beforeStart()
									},
									close: function() {
										k.close(), l.close()
									},
									classes: w(k.classes, l.classes),
									from: k,
									to: l,
									anchors: []
								};
								n.classes.length ? b.push(n) : (b.push(k), b.push(l))
							}
							e[m].anchors.push({
								out: g.element,
								"in": h.element
							})
						}), b
					}
					function w(a, b) {
						a = a.split(" "), b = b.split(" ");
						for (var c = [], d = 0; d < a.length; d++) {
							var e = a[d];
							if ("ng-" !== e.substring(0, 3)) for (var f = 0; f < b.length; f++) if (e === b[f]) {
								c.push(e);
								break
							}
						}
						return c.join(" ")
					}
					function x(a, b) {
						for (var c = g.length - 1; c >= 0; c--) {
							var d = g[c];
							if (i.has(d)) {
								var e = i.get(d),
									f = e(a, b);
								if (f) return f
							}
						}
					}
					function y() {
						k.addClass(aa), F && a.addClass(k, F)
					}
					function z(a, b) {
						function c(a) {
							d(a).setHost(b)
						}
						a.from && a.to ? (c(a.from.element), c(a.to.element)) : c(a.element)
					}
					function A() {
						var a = d(k);
						!a || "leave" === m && r.$$domOperationFired || a.end()
					}
					function B(b) {
						k.off("$destroy", A), c(k), q(k, r), o(k, r), r.domOperation(), F && a.removeClass(k, F), k.removeClass(aa), D.complete(!b)
					}
					r = n(r);
					var C = ["enter", "move", "leave"].indexOf(m) >= 0,
						D = new j({
							end: function() {
								B()
							},
							cancel: function() {
								B(!0)
							}
						});
					if (!g.length) return B(), D;
					b(k, D);
					var E = e(k.attr("class"), e(r.addClass, r.removeClass)),
						F = r.tempClasses;
					return F && (E += " " + F, r.tempClasses = null), p.push({
						element: k,
						classes: E,
						event: m,
						structural: C,
						options: r,
						beforeStart: y,
						close: B
					}), k.on("$destroy", A), p.length > 1 ? D : (h.$$postDigest(function() {
						var a = [];
						P(p, function(b) {
							var c = b.element;
							d(c) && t(c).parentNode ? a.push(b) : b.close()
						}), p.length = 0;
						var b = v(a),
							c = [];
						P(b, function(a) {
							c.push({
								domNode: t(a.from ? a.from.element : a.element),
								fn: function() {
									a.beforeStart();
									var b, c = a.close,
										e = a.anchors ? a.from.element || a.to.element : a.element;
									if (d(e)) {
										var f = x(a, s);
										f && (b = f.start)
									}
									if (b) {
										var g = b();
										g.done(function(a) {
											c(!a)
										}), z(a, g)
									} else c()
								}
							})
						}), P(l(c), function(a) {
							a()
						})
					}), D)
				}
			}]
		}];
	b.module("ngAnimate", []).provider("$$body", A).directive("ngAnimateChildren", oa).factory("$$rAFMutex", Ba).factory("$$AnimateRunner", Ca).provider("$$animateQueue", Aa).provider("$$animation", Da).provider("$animateCss", ua).provider("$$animateCssDriver", va).provider("$$animateJs", wa).provider("$$animateJsDriver", xa)
}(window, window.angular);