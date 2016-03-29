/**
 * Created by xiexz on 16/3/24.
 */
/**
 * 显示和管理弹出层
 * 包括alert、confirm、tooltip、dropdown、loading、context、panel等弹出层与相关的jquery插件
 *
 * @module panel
 * @file js/util/panel/panel.js
 * @requires panel
 */

GJ.add(
    'js/util/panel/panel.js',
    ['js/util/panel/panel.css','iframe','js/util/dragdrop/dragdrop.js'],
    function(){
        if (GJ.panel) return;

        var isFunc = GJ.isFunction, doc=document, $doc=$(doc), ua = navigator.userAgent,
            getJqObj = function(el) {
                return GJ.isObject(el) ? $(el) : $("#"+el);
            },
            getScrollBarWidth = function() {
                return 30;
                /*
                 var p = $('<p></p>'), div=$('<div></div>'), w1, w2;
                 p.css({width:"100%", height:200});
                 div.css({position:"absolute", top:0, left:0, visibility:'hidden', width:200, height:150, overflow:'hidden'})
                 .append(p);
                 $(doc.body).append(div);
                 w1 = p[0].offsetWidth;
                 div.css({overflow:'scroll'});
                 w2 = p[0].offsetWidth;
                 if (w1 == w2) w2 = div.clientWidth;
                 div.remove();
                 delete div;

                 return (w1 - w2);
                 */
            },
            getContextXY = function ($src, $dst, place, pageXY){
                var opt = {}, dp, sp, vp;

                if ($src.length == 0) return opt;
                sp = { x:$src.offset().left, y:$src.offset().top, w:$src.width(), h:$src.height() };

                if ($dst && $dst.length > 0) dp = { x:$dst.offset().left, y:$dst.offset().top, w:$dst.width(), h:$dst.innerHeight() };
                else if (pageXY && pageXY.x && pageXY.y) dp = { x:pageXY.x, y:pageXY.y, w:0, h:0 };
                else return opt;

                vp = GJ.getViewPort();

                if (!place) place = "bottom";
                if (place == "bottom"){
                    opt.x = dp.x;
                    opt.y = (sp.h+dp.y+dp.h > vp.top+vp.height && dp.y-vp.top > sp.h)
                        ? dp.y - sp.h
                        : dp.y + dp.h;
                }
                else if (place == "right"){
                    opt.x = (dp.x+dp.w+sp.w > vp.left+vp.width && dp.x-vp.left>sp.w)
                        ? dp.x-sp.w
                        : dp.x+dp.w;
                    opt.y = dp.y;
                }
                else if (place == "left"){
                    opt.x = (dp.x-sp.w < vp.left && dp.x-vp.left<sp.w)
                        ? dp.x+dp.w
                        : dp.x-sp.w;
                    opt.y = dp.y;
                }
                else if (place == "top"){
                    opt.x = dp.x;
                    opt.y = (dp.y-vp.top < sp.h && vp.height+vp.top-dp.y-dp.h > sp.h)
                        ? dp.y + dp.h
                        : dp.y-sp.h;
                }

                if (place == "bottom" || place == "top"){
                    if (dp.x+sp.w > vp.left+vp.width && dp.x+dp.w-vp.left>sp.w)opt.x = dp.x+dp.w-sp.w;
                }
                if (place == "left" || place == "right"){
                    if (sp.h+dp.y > vp.top+vp.height && dp.y+dp.h-vp.top > sp.h) opt.y = dp.y+dp.h - sp.h;
                }
                return opt;
            },

        //PanelManager
            P = {
                panels : {},
                currId : 0,
                zIndex : 3000000,
                masks : {},
                mask  : null,
                showCount : 0,

                showMask : function(id)
                {
                    if (!P.masks[id]){
                        var mask = $('<div></div>');
                        $(doc.body).prepend(mask);

                        P.masks[id] = mask;
                    }

                    if (P.showCount == 0){
                        $('body').addClass("lpn_masked").css({overflowX:'hidden'});
                        if (!GJ.ua.gecko){
                            $('html').css({overflowX:'hidden'});
                        }
                    }

                    P.masks[id].addClass('lpn_mask')
                        .css({left:0, top:0, height:$doc.height()})
                        .show();

                    P.showCount++;
                },

                hideMask : function(id)
                {
                    if (P.masks[id]) {
                        P.masks[id].hide();
                        if (P.showCount > 0){
                            P.showCount--;
                        }

                        if (P.showCount == 0){
                            $('body').removeClass("lpn_masked").css({overflow:''});
                            if (!GJ.ua.gecko){
                                $('html').css({overflow:''});
                            }
                        }
                    }
                },

                setMaskZIndex : function(id, zIndex){
                    if (P.masks[id] && !isNaN(zIndex)) {
                        P.masks[id].css('z-index', zIndex);
                    }
                },

                setPlace : function(el, o)
                {
                    var $el = getJqObj(el);
                    if (o.contextElement || (o.left && o.top)) {
                        var pos={};
                        if (o.contextElement) pos = getContextXY($el, getJqObj(o.contextElement), o.contextPosition || 'bottom');
                        else if (o.left && o.top) pos = getContextXY($el, null, null, {x:o.left, y:o.top});
                        if (pos.x && pos.y){
                            $el.css({left:pos.x, top:pos.y});
                        }
                    }
                    else if (o.mask) {
                        var ml = o.left ? 0 : -Math.round($el.width() / 2.0)+$doc.scrollLeft();
                        var mt  = o.top ? 0  : -Math.round($el.height() / 2.0)+$doc.scrollTop();
                        $el.css({top:o.top||'50%', left:o.left||'50%', marginLeft:ml, marginTop:mt});
                    }
                    else {
                        var pos = GJ.getViewPort(),
                            left = o.left || pos.left + Math.round((pos.width - $el.width()) / 2.0),
                            top = o.top || pos.top + Math.round((pos.height - $el.height()) / 2.0);
                        $el.css({top:Math.max(0, top), left:Math.max(0, left)});
                    }
                },

                /**
                 * 简单的将页面元素作为弹出层显示
                 * @method GJ.popup
                 * @static
                 * @param {object} config 配置参数
                 * 包括：
                 * <ul>
                 *     <li><strong>elementId</strong> &nbsp; &nbsp; 要显示的元素id号或对象</li>
                 *     <li><strong>width</strong> &nbsp; &nbsp; 表示弹出层的宽的整数</li>
                 *     <li><strong>height</strong> &nbsp; &nbsp; 表示弹出层的高的整数。如果未指定将根内容自动设置高</li>
                 *     <li><strong>mask</strong> &nbsp; &nbsp; 是否显示背景遮罩，ture or false，默认为false</li>
                 *     <li><strong>left</strong> &nbsp; &nbsp; 表示定位的x轴坐标值的整数，默认值为0</li>
                 *     <li><strong>top</strong> &nbsp; &nbsp; 表示定位的y轴坐标值的整数，默认值为0</li>
                 *     <li><strong>contextElement</strong> &nbsp; &nbsp; 如果要相对某元素定位，指定的id号或对象。如果width、height与contextElement都不指定，将居中显示</li>
                 *     <li><strong>contextPosition</strong> &nbsp; &nbsp; 如果要相对某元素定位，指定的方位，left or bottom，默认为bottom</li>
                 *     <li><strong>autoHide</strong> &nbsp; &nbsp; 点层外时是否自动关闭层，默认为true</li>
                 * </ul>
                 * @return {object} 返回一个对象，可以管理这个弹出层
                 * 包含三个方法：
                 * <ul>
                 *     <li><strong>show()</strong> &nbsp; &nbsp; 显示该弹出层</li>
                 *     <li><strong>close()</strong> &nbsp; &nbsp; 隐藏该弹出层</li>
                 *     <li><strong>toggle()</strong> &nbsp; &nbsp; 切换显示或隐藏该弹出层</li>
                 * </ul>
                 * @example
                 * <script type="text/javascript">
                 * GJ.use('panel', function(){
         *     var config = {
         *         elementId : 'div_id',
         *         width : 200
         *     };
         *     var popupObj = GJ.popup(config);
         *     popupObj.show();
         *     //两秒钟后关闭
         *     setTimeout(function(){
         *         popupObj.close();
         *     }, 2000);
         * });
                 * </script>
                 */
                popup : function(o)
                {
                    var $el = getJqObj(o.elementId), init=false, isHide=true, zIndex=P.zIndex+=2, id=GJ.guid(),
                        autoHide = GJ.isUndefined(o.autoHide) ? true : o.autoHide,
                        docClickHandler = function(e){
                            var obj = e.target, hit = false;
                            if (obj == $el[0]) return;
                            do {
                                obj = $(obj).parent()[0];
                                if (obj == $el[0]) {
                                    hit = true;
                                }
                            }
                            while (obj != doc);
                            if (!hit) {
                                close();
                            }
                        },
                        show = function(top, left){
                            if  (autoHide) {
                                $(doc).unbind('click', docClickHandler);
                            }

                            if ($el.size() == 0) return false;

                            if (!init){
                                init = true;

                                var css = {position:'absolute', zIndex:zIndex};
                                if (o.width)css['width'] = o.width;
                                if (o.height)css['height'] = o.height;
                                $el.css(css);
                            }

                            if (o.mask){
                                P.showMask(id);
                                P.setMaskZIndex(id, zIndex-1);
                            }

                            P.setPlace($el, {
                                contextElement : o.contextElement || null,
                                contextPosition : o.contextPosition || 'bottom',
                                left : left || o.left || null,
                                top : top || o.top || null,
                                mask : o.mask || false
                            });
                            $el.show();

                            isHide = false;

                            if  (autoHide) {
                                GJ.later(function(){
                                    $(doc).bind('click', docClickHandler);
                                }, 200);
                            }
                        },
                        close = function(){
                            if ($el.size() == 0) return false;

                            if (o.mask){
                                P.hideMask(id);
                            }

                            $el.hide();
                            isHide = true;

                            if  (autoHide) {
                                $(doc).unbind('click', docClickHandler);
                            }
                        },
                        toggle = function(){
                            if (isHide === false) close();
                            else show();
                        };

                    return {
                        show : show,
                        close : close,
                        toggle : toggle
                    };
                },


                /**
                 * 根据一个弹出层对象的id，取得这个弹出层对象
                 * 如果参数id为空，将取得当前弹出层对象
                 * @method GJ.getPanel
                 * @static
                 * @param {string} id 创建弹出层时生成或指定的id号
                 * @return {object} 返回该弹出层对象
                 */
                getPanel : function(id)
                {
                    var ps=P.panels;
                    if (id) {
                        if (GJ.isObject(id) && id.id && ps[id.id]){
                            return ps[id.id];
                        }
                        else if (GJ.isString(id) && ps[id]){
                            return ps[id];
                        }
                        return null;
                    }

                    var ix=0, p, types = {panel:1, alert:1, confirm:1, dropdown:1, loading:1};
                    GJ.each(ps, function(v){
                        if (v && (v.config.type in types) && v.zIndex > ix && v.isHide === false){
                            p = v;
                            ix = v.zIndex;
                        }
                    });
                    return p;
                },

                /**
                 * 显示一个信息提示框
                 * @method GJ.alert
                 * @static
                 * @param {object} config 配置参数
                 * 包括：
                 * <ul>
                 *     <li><strong>title</strong> &nbsp; &nbsp; 提示框标题，默认值为：信息提示</li>
                 *     <li><strong>content</strong> &nbsp; &nbsp; 要显示的文字内容</li>
                 *     <li><strong>width</strong> &nbsp; &nbsp; 表示弹出层的宽的整数</li>
                 *     <li><strong>style</strong> &nbsp; &nbsp; 表示弹出层的样式，默认可用的样式有：default、1、2、text</li>
                 *     <li><strong>onSubmit</strong> &nbsp; &nbsp; 当点击确定按钮时触发的事件，在函数内部可以通过this调用该弹出层对象</li>
                 *     <li><strong>submitText</strong> &nbsp; &nbsp; 确定按钮上要显示的文字内容</li>
                 *     <li><strong>onClose</strong> &nbsp; &nbsp; 当关闭时触发的事件，在函数内部可以通过this调用该弹出层对象</li>
                 *     <li><strong>checkShow</strong> &nbsp; &nbsp; 是否要显示提信息的检测函数</li>
                 *     <li><strong>iconClass</strong> &nbsp; &nbsp; 图标的className，用来改变图标， 默认为：lpn_alert</li>
                 * </ul>
                 * @return {object} 返回该信息提示框对象，该对象拥有close()方法
                 * @example
                 * <script type="text/javascript">
                 * GJ.use('panel', function(){
         *     var alertObj = GJ.alert({
         *         content : '欢迎关临!',
         *         onClose : function(){
         *             window.location.href = 'http://www.***.com';
         *         }
         *     });
         *     //两秒钟后关闭
         *     setTimeout(function(){
         *         alertObj.close();
         *     }, 2000);
         * });
                 * </script>
                 */
                alert : function(config)
                {
                    var id = GJ.guid(), //'lpn_panel_alert',
                        p = P.getPanel(id),
                        o = GJ.mix({
                            onSubmit : null,
                            onClose : null,
                            checkShow : null
                        }, config || {}, true);

                    if (!p) {
                        p = new Panel({
                            type : 'alert',
                            mask : true,
                            height : 0,
                            id : id,
                            width : o.width || 400,
                            content : o.content || 'no message',
                            style : o.style || 'default',
                            title : o.title || '信息提示',
                            submitText : o.submitText || '确定'
                        });
                        p.wrapper.append('<div class="lpn_icon lpn_' + (o.iconClass || 'alert') + '"></div>');
                    }

                    GJ.mix(p.config, o, true);
                    p.setContent(o.content || 'no message');

                    if (!isFunc(o.checkShow) || o.checkShow()){
                        p.show();
                    }
                    return p;
                },

                /**
                 * 显示一个确认提示框
                 * @method GJ.confirm
                 * @static
                 * @param {object} config 配置参数
                 * 包括：
                 * <ul>
                 *     <li><strong>title</strong> &nbsp; &nbsp; 提示框标题，默认值为：信息提示</li>
                 *     <li><strong>content</strong> &nbsp; &nbsp; 要显示的文字内容</li>
                 *     <li><strong>width</strong> &nbsp; &nbsp; 表示弹出层的宽的整数</li>
                 *     <li><strong>style</strong> &nbsp; &nbsp; 表示弹出层的样式，默认可用的样式有：default、1、2、text</li>
                 *     <li><strong>onSubmit</strong> &nbsp; &nbsp; 当点击确定按钮时触发的事件，在函数内部可以通过this调用该弹出层对象</li>
                 *     <li><strong>submitText</strong> &nbsp; &nbsp; 确定按钮上要显示的文字内容</li>
                 *     <li><strong>onCancel</strong> &nbsp; &nbsp; 当点击取消按钮时触发的事件，在函数内部可以通过this调用该弹出层对象</li>
                 *     <li><strong>cancelText</strong> &nbsp; &nbsp; 取消按钮上要显示的文字内容</li>
                 *     <li><strong>onClose</strong> &nbsp; &nbsp; 当关闭时触发的事件，在函数内部可以通过this调用该弹出层对象</li>
                 *     <li><strong>checkShow</strong> &nbsp; &nbsp; 是否要显示提信息的检测函数</li>
                 *     <li><strong>iconClass</strong> &nbsp; &nbsp; 图标的className，用来改变图标， 默认为：lpn_confirm</li>
                 * </ul>
                 * @return {object} 返回该信息提示框对象，该对象拥有close()方法
                 * @example
                 * <script type="text/javascript">
                 * GJ.use('panel', function(){
         *     $('#del').click(function(){
         *         GJ.confirm({
         *             content : '确定要删除吗？',
         *             onSubmit : function(){
         *                 alert('正在删除，请稍候');
         *             },
         *             onCancel : function(){
         *                 alert('已取消');
         *             }
         *         });
         *     });
         * });
                 * </script>
                 */
                confirm : function(config)
                {
                    var id = GJ.guid(),  //'lpn_panel_confirm',
                        p = P.getPanel(id),
                        o = GJ.mix({
                            onSubmit : null,
                            onCancel : null,
                            onClose : null,
                            checkShow : null
                        }, config || {}, true);

                    if (!p) {
                        p = new Panel({
                            type : 'confirm',
                            mask : true,
                            height : 0,
                            id : id,
                            width : o.width || 400,
                            content : o.content || 'no message',
                            style : o.style || 'default',
                            title : o.title || '信息提示',
                            submitText : o.submitText || '确定',
                            cancelText: o.cancelText || '取消'
                        });
                        p.wrapper.append('<div class="lpn_icon lpn_' + (o.iconClass || 'confirm') + '"></div>');
                    }

                    GJ.mix(p.config, o, true);
                    p.setContent(o.content || 'no message');

                    if (!isFunc(o.checkShow) || o.checkShow()){
                        p.show();
                    }
                    return p;
                },

                /**
                 * 显示一个正在载入的提示框
                 * @method GJ.loading
                 * @static
                 * @param {object} config 配置参数
                 * 包括：
                 * <ul>
                 *     <li><strong>content</strong> &nbsp; &nbsp; 要显示的文字内容</li>
                 *     <li><strong>width</strong> &nbsp; &nbsp; 表示弹出层的宽的整数</li>
                 *     <li><strong>checkShow</strong> &nbsp; &nbsp; 是否要显示提信息的检测函数</li>
                 * </ul>
                 * @return {object} 返回该提示框对象，该对象拥有close()方法
                 * @example
                 * <script type="text/javascript">
                 * GJ.use('panel', function(){
         *     var loadingObj = GJ.loading({
         *         content : '正在载入，请稍候。。。'
         *     });
         *     $(window).load(function(){
         *         loadingObj.close();
         *     });
         * });
                 * </script>
                 */
                loading : function(config)
                {
                    var id = 'lpn_panel_loading',
                        p = P.getPanel(id),
                        o = GJ.mix({
                            checkShow : null
                        }, config || {}, true);

                    if (!p) {
                        p = new Panel({
                            title : "",
                            closeAble : false,
                            moveAble : false,
                            resizeAble : false,
                            type : 'loading',
                            mask : true,
                            content : o.content || '',
                            width : o.width || 300,
                            height : 0,
                            id : id
                        });
                        p.wrapper.append('<div class="lpn_icon"></div>');
                    }

                    GJ.mix(p.config, o, true);
                    p.setContent(o.content || 'no message');

                    if (!isFunc(o.checkShow) || o.checkShow()){
                        p.show();
                    }
                    return p;
                },

                /**
                 * 鼠标经过时显示提示文本
                 * @method GJ.tooltip
                 * @static
                 * @param {object} config 配置参数
                 * 包括：
                 * <ul>
                 *     <li><strong>title</strong> &nbsp; &nbsp; 要显示的文字内容</li>
                 *     <li><strong>width</strong> &nbsp; &nbsp; 表示弹出层的宽的整数</li>
                 *     <li><strong>handleElement</strong> &nbsp; &nbsp; 鼠标经过的页面元素id或对象</li>
                 *     <li><strong>handleElementClassName</strong> &nbsp; &nbsp; 对需要显示提示文本的页面元素添加的className</li>
                 *     <li><strong>checkShow</strong> &nbsp; &nbsp; 是否要显示提信息的检测函数</li>
                 * </ul>
                 * @return {object} 返回该提示框对象，该对象拥有close()方法
                 * @example
                 * <span id="span_id">未审核</span>
                 *
                 * <script type="text/javascript">
                 * GJ.use('panel', function(){
         *     GJ.tooltip({
         *         content : '您的信息尚未通过审核，暂不能显示',
         *         handleElement : 'span_id',
         *     });
         * });
                 * </script>
                 */
                tooltip : function(o)
                {
                    var o = o || {}, el = getJqObj(o.handleElement || '');
                    if (!el) return false;
                    var title = o.title || el.attr('title');
                    if (!title) return false;

                    el.attr('title', '').addClass(o.handleElementClassName || 'lpn_panel_tooltip_el');

                    var id = 'lpn_panel_tooltip', p = P.getPanel(id);
                    if (!p) {
                        var o = {
                            content : title,
                            width : o.width || 0,
                            type : 'tooltip',
                            handleElement : el,
                            resizeAble : false,
                            moveAble : false,
                            closeAble : false,
                            id : id
                        };
                        p = new Panel(o);
                    }

                    el.hover(
                        function (e){
                            if (isFunc(o.checkShow) && !o.checkShow()){
                                return false;
                            }

                            p.config.width = o.width || 0;
                            //p.config.context = [el, 'bottom'];
                            p.setContent(title);
                            p.config.left = e.pageX+20;
                            p.config.top = e.pageY+10;
                            p.show().resetPlace();
                        },
                        function (){
                            p.close();
                        }
                    );

                    return p;
                },

                /**
                 * 功能比较全面的弹出层
                 * @method GJ.panel
                 * @static
                 * @param {object} config <see:PanelConfig> 配置参数
                 * @return {object} <see:Panel> 返回该弹出层对象
                 * @example
                 * <script type="text/javascript">
                 * GJ.use('panel', function(){
         *     GJ.panel({
         *         url : 'http://www.***.com',
         *         iframe : true,
         *         width : 500,
         *         height : 450
         *     });
         * });
                 * </script>
                 */
                panel : function(o)
                {
                    if (!o.id) o.id = GJ.guid();
                    var p = new Panel(o);

                    if (!isFunc(o.checkShow) || o.checkShow()){
                        p.show();
                    }
                    return p;
                },

                /**
                 * 根据某个元素显示下拉弹出层
                 * 当鼠标经过时打开，移走时关闭。该弹出层显示在该元素的相对位置。
                 * @method GJ.dropdown
                 * @static
                 * @param {object} config <see:PanelConfig> 配置参数
                 * @return {object} <see:Panel> 返回该弹出层对象
                 * @example
                 * <a id="a_id">详细信息</a>
                 *
                 * <script type="text/javascript">
                 * GJ.use('panel', function(){
         *     GJ.dropdown({
         *         handleElement : 'a_id',
         *         url : 'http://www.***.com',
         *         iframe : true,
         *         width : 500,
         *         height : 450
         *     });
         * });
                 * </script>
                 */
                dropdown : function(o)
                {
                    var el = getJqObj(o.handleElement || '');
                    if (!el) return false;

                    var p, on_panel=false, on_el=false, tmo_el = null, tmo_panel = null;

                    o.handleElement = el;
                    o.type = 'dropdown';
                    o.resizeAble = o.resizeAble ? true : false;
                    o.moveAble = o.moveAble ? true : false;
                    o.closeAble = o.closeAble ? true : false;
                    o.contextElement = o.contextElement || el;
                    o.contextPosition = o.contextPosition || 'bottom';
                    //if (!o.context)o.context = [el, o.align || 'bottom'];
                    if (!o.id) o.id = GJ.guid();

                    var clearTimer = function ()
                        {
                            if(tmo_el){
                                clearTimeout(tmo_el);
                                tmo_el=null;
                            }
                            if(tmo_panel){
                                clearTimeout(tmo_panel);
                                tmo_panel=null;
                            }
                        },

                        over_handler = function(e){
                            if (isFunc(o.checkShow) && !o.checkShow()){
                                return false;
                            }

                            if(!p){
                                p = new Panel(o);
                                p.panel.hover(
                                    function(){
                                        p.show();
                                        on_panel = true;
                                        clearTimer();
                                    },
                                    function(){
                                        on_panel = false;
                                        tmo_panel = setTimeout(function (){
                                            if (!on_el)p.close();
                                        }, 100);
                                    }
                                );
                            }
                            p.show().resetPlace();
                            if(p.config.overClassName)el.addClass(p.config.overClassName);
                            on_el = true;
                            clearTimer();
                        },

                        out_handler = function(){
                            if (isFunc(o.checkShow) && !o.checkShow()){
                                return false;
                            }
                            if(!p)return false;
                            on_el = false;
                            tmo_el = setTimeout(function (){
                                if (!on_panel)p.close();
                            },100);
                        };

                    if (o.mouseType == 'click'){
                        el.click(function (e){ over_handler(e); return false; });
                        el.mouseout(out_handler);
                    }
                    else el.hover(over_handler, out_handler);
                },

                /**
                 * 在某个元素上右键弹出层
                 * 在页面上其它地方点击鼠标时关闭弹出层
                 * @method GJ.context
                 * @static
                 * @param {object} config <see:PanelConfig> 配置参数
                 * @return {object} <see:Panel> 返回该弹出层对象
                 * @example
                 * <a id="a_id">菜单</a>
                 *
                 * <script type="text/javascript">
                 * GJ.use('panel', function(){
         *     GJ.context({
         *         handleElement : 'a_id',
         *         content : '<ul><li>新增</li><li>修改</li><li>删除</li><ul>'
         *     });
         * });
                 * </script>
                 */
                context : function(o)
                {
                    var el = getJqObj(o.handleElement || '');
                    if (!el) return false;

                    var p, on_panel=false, on_el=false, tmo_el = null, tmo_panel = null;

                    o = $.extend(o || {}, {
                        type:'context',
                        resizeAble:false,
                        moveAble:false,
                        closeAble:false
                    });
                    //o.context = [];
                    if (!o.id) o.id = GJ.guid();

                    var closePanel = function(){
                        if (p) p.close();
                        $doc.unbind('mousedown', closePanel);
                    };

                    el.bind('contextmenu', function(e){
                        if (isFunc(o.checkShow) && !o.checkShow()){
                            return false;
                        }

                        if(!p) p = new Panel(o);
                        p.config.left = e.pageX+10;
                        p.config.top = e.pageY;
                        p.resetPlace().show();

                        $doc.bind('mousedown', closePanel);
                        return false;
                    });

                    el.bind('mousedown', function(e){return false;});
                },

                /**
                 * 在行内显示内容块
                 *
                 * @method GJ.module
                 * @static
                 * @param {object} config <see:PanelConfig> 配置参数
                 * @return {object} <see:Panel> 返回该层对象
                 * @example
                 * <div id="div_id">
                 *     <div class="hd">标题</div>
                 *     <div class="bd">内容</div>
                 * </div>
                 *
                 * <script type="text/javascript">
                 * GJ.use('panel', function(){
         *     GJ.module({
         *         id : 'div_id'
         *     });
         * });
                 * </script>
                 */
                module : function (o)
                {
                    o.inline = true;
                    o.type = 'module';
                    o.moveAble = o.moveAble ? true : false;

                    var p = new Panel(o);
                    p.show();

                    return p;
                },

                /**
                 * 根据弹出层对象的id号，关闭弹出层
                 *
                 * @method GJ.closePanel
                 * @static
                 * @param {string} id 弹出层对象的id号，如果id为空，将关闭当前弹出层
                 * @param {int} speed 延迟关闭的时间
                 * @return {void}
                 * @example
                 * <a id="open_id">打开</a> <a id="close_id">关闭</a>
                 *
                 * <script type="text/javascript">
                 * GJ.use('panel', function(){
         *     var panelObj;
         *     $('#open_id').click(function(){
         *         panelObj = GJ.panel({
         *             content : 'Hello world!'
         *         });
         *     });
         *     $('#close_id').click(function(){
         *         if (panelObj){
         *             panelObj.close();
         *         }
         *     });
         * });
                 * </script>
                 */
                closePanel : function (id, speed)
                {
                    var p = P.getPanel(id);
                    if(p)p.close(speed);
                }
            };

        GJ.mix(GJ, {
            popup       : P.popup,
            getPanel    : P.getPanel,
            alert       : P.alert,
            confirm     : P.confirm,
            loading     : P.loading,
            tooltip     : P.tooltip,
            panel       : P.panel,
            dropdown    : P.dropdown,
            context     : P.context,
            module      : P.module,
            closePanel  : P.closePanel
        });

        var getParams = function (obj, p, type)
        {
            var o = {}, title, url, rel, rels, cla;
            obj = $(obj);
            if (title = obj.attr("title")) o.title = title;
            if (url = obj.attr("href")) o.url = url;
            if (type == 'module' && (cla = obj.attr("class"))) o.className = cla;
            var rel = obj.attr("rel");
            if (rel){
                rels = rel.split(/&amp;|&/);
                $.each(rels, function(i,v){
                    vs = v.split("=");
                    if (!/^([\d\.+\-]+|true|false|null|undefined)$/i.test(vs[1])) vs[1] = '"'+vs[1]+'"';
                    if (vs[0]) eval("o."+vs[0]+"="+vs[1]);
                });
            }
            if (p) o = $.extend(o, p);
            return o;
        };

        $.fn.extend({
            /**
             * 点击某个链接时显示一个弹出层
             * 弹出层的标题是这个链接的title，将该链接的href作为页面的url打开在层中，通过rel设置其它参数
             * @jquery GJ_panel
             * @param {object} config <see:PanelConfig> 配置参数
             * @example
             * <a class="btn_panel" href="login.php", title="登录" rel="width=500&height=350&iframe=true&mask=true">登录</a>
             * <a class="btn_panel" href="register.php", title="注册" rel="width=600&height=500&iframe=true&mask=true">注册</a>
             *
             * <script type="text/javascript">
             * GJ.use('panel', function(){
         *     $('.btn_panel').GJ_panel();
         * });
             * </script>
             */
            GJ_panel: function(o) {
                return this.each(function() {
                    var p = getParams(this, o);
                    $(this).click(function(){ P.panel(p); this.blur(); return false; });
                });
            },

            /**
             * 将页面中的内容作为行内内容块显示
             * @jquery GJ_module
             * @param {object} config <see:PanelConfig> 配置参数
             * @example
             * <div id="block_1" class="inline_module">
             *     <div class="hd">标题1</div>
             *     <div class="bd">内容1</div>
             * </div>
             * <div id="block_2" class="inline_module">
             *     <div class="hd">标题2</div>
             *     <div class="bd">内容2</div>
             * </div>
             *
             * <script type="text/javascript">
             * GJ.use('panel', function(){
         *     $('.inline_module').GJ_module();
         * });
             * </script>
             */
            GJ_module: function(o) {
                return this.each(function() {
                    var p = getParams(this, o, 'module');
                    var id = $(this).attr('id');
                    p.id = id;
                    P.module(p);
                });
            },

            /**
             * 根据某个元素显示下拉弹出层
             * 当鼠标经过时打开，移走时关闭。该弹出层显示在该元素的相对位置。
             * @jquery GJ_dropdown
             * @param {object} config <see:PanelConfig> 配置参数
             * @example
             * <a class="btn_dropdown" href="login.php", title="登录" rel="width=500&height=350">登录</a>
             * <a class="btn_dropdown" href="register.php", title="注册" rel="width=600&height=500">注册</a>
             *
             * <script type="text/javascript">
             * GJ.use('panel', function(){
         *     $('.btn_dropdown').GJ_dropdown({
         *         iframe : true,
         *         mask : false
         *     });
         * });
             * </script>
             */
            GJ_dropdown: function(o) {
                return this.each(function() {
                    var p = getParams(this, o);
                    p.handleElement = this;
                    P.dropdown(p);
                });
            },

            /**
             * 鼠标经过时显示提示文本
             * @jquery GJ_tooltip
             * @static
             * @param {object} config <see:PanelConfig> 配置参数
             * @example
             * <span id="span_id" title="您的信息尚未通过审核，暂不能显示">未审核</span>
             *
             * <script type="text/javascript">
             * GJ.use('panel', function(){
         *     $('#span_id').GJ_tooltip();
         * });
             * </script>
             */
            GJ_tooltip: function(o) {
                return this.each(function() {
                    var p = getParams(this, o);
                    p.handleElement = this;
                    P.tooltip(p);
                });
            },

            /**
             * 在某个元素上右键弹出层
             * 在页面上其它地方点击鼠标时关闭弹出层
             * @jquery GJ_context
             * @param {object} config <see:PanelConfig> 配置参数
             * @example
             * <a id="a_id">菜单</a>
             *
             * <script type="text/javascript">
             * GJ.use('panel', function(){
         *     $('#a_id').GJ_context({
         *         content : '<ul><li>新增</li><li>修改</li><li>删除</li><ul>'
         *     });
         * });
             * </script>
             */
            GJ_context: function(o) {
                return this.each(function() {
                    var p = getParams(this, o);
                    p.handleElement = this;
                    P.context(p);
                });
            }
        });

        $('body').keydown(function(event){
            if(event.which == 27){
                var p = P.getPanel();
                if (!p || !p.config.closeAble) {
                    return;
                }
                p.close();
            }
        });

        var _getStyleClassName = function (style){
                return style ? 'lpn_panel_' + style : '';
            },

            _getFullUrl = function(url){
                if (url){
                    return url + (url.indexOf('?') == -1 ? '?' : '&') + '&random=' + (new Date().getTime()+Math.random());
                }
                return '';
            },

        /**
         * 弹出层类
         * 这是一个私有类。为了简化应用，使用GJ.alert()、GJ.panel()...等方法建立此类的实例
         *
         * @class GJPanel
         * @private
         */

            /**
             * @constructor GJPanel
             * @param {object} config <see:PanelConfig> 配置参数对象
             */
            Panel = function (o)
            {
                var t = this, o = o || {};

                /**
                 * id号
                 * @property id
                 * @type string
                 * @default 随机不重复字符串
                 */
                t.id = o.id || GJ.guid();

                if (P.panels[t.id]){
                    return P.panels[t.id];
                }
                P.panels[t.id] = t;

                /**
                 * 配置参数对象
                 * @property config <see:PanelConfig>
                 * @type object
                 */
                t.config = new PanelConfig(t, o);

                t._styleClassName = _getStyleClassName(t.config.style);

                t._w = 0;
                t._h = 0;
                t.panel = null;
                t.underlay = null;
                t.wrapper = null;
                t.iframeObj = null;
                t.canvas = null;
                t._canvas = null;
                t.hd = null;
                t.bd = null;
                t.ft = null;
                t.btnGroup = null;
                t.btnClose = null;
                t.btnRefresh = null;
                t.loader = null;
                t.headerBtnGroup = null;
                t.zIndex = 0;
                t.isHide = null;
                t.loaded = false;
                t.error = '';
                t.btnGroupWidth = 0;
                t.generate();
                if (o.top) {
                    $('.lpn_panel').css('top', o.top);
                }
            };

        Panel.prototype = {
            generate : function(){
                var t=this, o=t.config, el = $("#"+t.id), tmp_hd, tmp_bd;

                if (el.size() > 0) {
                    if ((tmp_hd = $(".hd", el)).size() > 0) o.title = tmp_hd.get(0);
                    if ((tmp_bd = $(".bd", el)).size() > 0) o.content = tmp_bd.get(0);
                }

                t.setContent(o.content);

                t.panel = $('<div></div>');
                t.panel.addClass("lpn_panel")
                    .addClass("lpn_panel_"+o.type)
                    .data('id', t.id);
                if (t._styleClassName)t.panel.addClass(t._styleClassName);
                if (o.className)t.panel.addClass(o.className);
                if (o.inline)t.panel.addClass('lpn_inline');

                t.iframeBg = null;
                if (GJ.ua.ie < 7){
                    t.iframeBg = $('<iframe></iframe>');
                    t.iframeBg.attr({
                        border : 0,
                        frameSpacing : 0,
                        frameBorder : 0,
                        scrolling : 'no'
                    }).addClass('lpn_iframe_bg');
                    t.panel.append(t.iframeBg);
                }

                t.wrapper = $('<div></div>');
                t.wrapper.attr('id', t.id).addClass("lpn_wrapper");
                t.panel.append(t.wrapper);

                t.canvas = $('<div></div>');
                t.canvas.addClass("lpn_canvas");
                t.wrapper.append(t.canvas);

                if (o.inline) {
                    el.after(t.panel);
                    el.remove();
                }
                else {
                    $("body").prepend(t.panel);
                    if (el && el.length > 0){
                        el.remove();
                    }
                }

                if (o.shadow){
                    t.showShadow();
                }

                if (o.submitButton){
                    t.addSubmitButton();
                }

                if (o.cancelButton){
                    t.addCancelButton();
                }

                if (o.resizeAble) {
                    t.setResizeAble();
                }

                if (o.title){
                    t.setTitle(o.title);
                }

                t.setCloseAble(o.closeAble);
                t.setRefreshAble(o.refreshAble);

                t.setMoveAble();

                if (isFunc(o.onInit)) o.onInit.call(t);
            },
            generateHeader : function(){
                if (!this.hd) {
                    this.hd = $('<div></div>');
                    this.hd.addClass('hd').html('窗口');
                    this.canvas.before(this.hd);
                }
            },
            generateFooter : function(){
                if (!this.ft) {
                    this.ft = $('<div></div>');
                    this.ft.addClass('ft');
                    this.canvas.after(this.ft);
                }
            },
            generateButtonGroup : function(){
                this.generateFooter();
                if (!this.btnGroup) {
                    this.btnGroup = $('<div></div>');
                    this.btnGroup.addClass('lpn_button_group');
                    this.ft.append(this.btnGroup);
                }
            },
            addSubmitButton : function(){
                var t=this, o=t.config;
                t.generateButtonGroup();
                var btn = $('<button class="lpn_submit" type="button"></button>'),
                    handler = function(){
                        t.close(0);
                        if (isFunc(o.onSubmit))o.onSubmit.call(t);
                    };
                t.btnGroup.append(btn);
                btn.html(o.submitText).bind('click', handler).bind('keypress', function(e){
                    if (e.keyCode == 13) handler();
                });
                return this;
            },
            addCancelButton : function(){
                var t=this, o=t.config;
                t.generateButtonGroup();
                var btn = $('<button type="button"></button>');
                t.btnGroup.append(btn);
                btn.html(o.cancelText).bind('click', function(){
                    t.close();
                    if (isFunc(o.onCancel))o.onCancel.call(t);
                });
                return this;
            },

            /**
             * 在顶部添加控制按钮
             *
             * @method addHeaderButton
             * @param {string|object} html 要添加的表示按钮的html
             * @param {Function} callback 点击该按钮的回调函数
             * @return {object} 返回该按钮的jquery对象
             */
            addHeaderButton : function(html, callback)
            {
                var t=this, m=3, btn = $(html), h=t.headerBtnGroup;
                t.generateHeader();
                if (!h){
                    h = $('<div></div>');
                    h.addClass('lpn_ctrl_group');
                    t.wrapper.append(h);
                    t.headerBtnGroup = h;
                }

                h.css('width', 500);
                btn.bind('focus', function(){this.blur();});
                h.append(btn);
                btn.css('marginLeft', m);
                t.btnGroupWidth += m + btn.outerWidth(true);
                h.css('width', t.btnGroupWidth);
                if (isFunc(callback)){
                    btn.bind('click', function(e){callback.call(t, e);return false;});
                }
                return btn;
            },
            setCloseAble : function(bool, text){
                var t=this, o=t.config;
                if (typeof bool === 'boolean') o.closeAble = bool;
                if (GJ.isValue(text)) o.closeText = text;
                if (o.closeAble){
                    if (!t.btnClose){
                        t.btnClose = t.addHeaderButton($('<a class="lpn_close" href="#">'+((o.useText && o.closeText)||'&nbsp;')+'</a>'), t.close);
                    }
                    t.btnClose.show();
                }
                else if (t.btnClose){
                    t.btnClose.hide();
                }
                return this;
            },
            setRefreshAble : function(bool, text){
                var t=this, o=t.config;
                if (!o.url) return this;
                if (typeof bool === 'boolean') o.refreshAble = bool;
                if (GJ.isValue(text)) o.refreshText = text;
                if (o.refreshAble){
                    if (!t.btnRefresh){
                        t.btnRefresh = t.addHeaderButton($('<a class="lpn_refresh" href="#">'+((o.useText && o.refreshText)||'&nbsp;')+'</a>'), t.doRefresh);
                    }
                    t.btnRefresh.show();
                }
                else if (t.btnRefresh){
                    t.btnRefresh.hide();
                }
                return this;
            },
            setResizeAble : function(){
                var t=this, o=t.config;
                t.generateFooter();
                var btn = $('<div></div>');
                btn.addClass('lpn_resize_br');
                t.ft.append(btn);

                t.panel.GJ_resize({
                    handle:btn,
                    useProxy:true,
                    onStop:function(ret){ t.resizePanel(ret.width, ret.height); t.focus();},
                    inViewPort:o.mask
                });
                return this;
            },
            setMoveAble : function(bool){
                var t=this, o=t.config;
                if (typeof bool === 'boolean') o.moveAble = bool;
                if (o.moveAble){
                    t.panel.addClass("lpn_hd_move");
                    if (t.hd) t.panel.GJ_drag({
                        handle:t.hd,
                        useProxy:true,
                        onStop:function(ret){
                            if (isFunc(o.onDragStop)) o.onDragStop.call(t, ret);
                            else {
                                t.moveBy(ret.left, ret.top);
                                t.focus();
                            }
                        },
                        onMove:function(ret){
                            if (isFunc(o.onDragMove)) o.onDragMove.call(t, ret);
                        },
                        inViewPort:o.mask,
                        onMouseDown:function(ret){ return o.moveAble; }
                    });
                }
                else {
                    t.panel.removeClass("lpn_hd_move");
                }
                return this;
            },
            showShadow : function(){
                var t=this, o=t.config;
                o.shadow = true;
                if (!o.inline){
                    if (!t.underlay){
                        t.underlay = $('<div></div>');
                        t.underlay.addClass('lpn_underlay');
                        t.wrapper.before(t.underlay);
                    }
                    t.underlay.show();
                }
                return t;
            },

            /**
             * 设置弹出层的标题
             *
             * @method setTitle
             * @param {string} title 要设为标题的文字
             * @return {object} 返回当前实例的引用
             */
            setTitle : function(title)
            {
                var t = this, o=t.config;
                t.generateHeader();
                title = title || t.config.title;
                o.title = title;
                if (typeof title == 'object') {
                    t.hd.replaceWith(title);
                    t.hd = $(title);
                }
                else if(typeof title == 'string' && title != '') {
                    t.hd.html(title);
                }
                return this;
            },

            /**
             * 设置弹出层中显示的远程页面的url
             *
             * @method setUrl
             * @param {string} url 远程页面的url
             * @param {boolean} iframe 是否使用iframe，默认为null
             * @return {object} 返回当前实例的引用
             */
            setUrl : function(url, iframe)
            {
                if (url) {
                    var t=this, o=t.config;
                    o.url = url;
                    o.content = '';
                    t.loaded = false;
                    if (GJ.isBoolean(iframe)) o.iframe = iframe;

                    if (t.isHide === false) t.loadContent();
                }
                return this;
            },

            /**
             * 设置弹出层中显示的内容
             *
             * @method setContent
             * @param {string|object} content 要显示的字符串或网页元素
             * @return {object} 返回当前实例的引用
             */
            setContent : function(content)
            {
                var t=this, o=t.config;

                if (content){
                    if (typeof content == 'string'){
                        o.content = content;
                    }
                    else {
                        var id, $ct = $(content), ct=$ct.get(0);
                        if (typeof ct == 'object'){
                            o.content = ct;
                            //id = $ct.attr('id');
                            //if (id) t.id = id;
                        }
                        else {
                            o.content = null;
                        }
                    }
                }

                if (o.content){
                    o.url = null;
                    o.iframe = false;
                    t.loaded = false;

                    if (t.isHide === false) t.loadContent();
                }

                return this;
            },
            loadContent : function()
            {
                var t=this, o=t.config, canvas, bd_class;

                if (t.loaded) return this;
                t.loaded = true;

                if ((!o.url || o.url == '#') && !o.content && o.type != 'loading') {
                    t.error = 'No content or URL ';
                    alert(t.error);
                    return this;
                }
                t.error = '';

                if (o.url && o.iframe){
                    if (t.bd){
                        t.bd.remove();
                        delete t.bd;
                    }

                    if (!o.width) t._w = 320;
                    if (!o.height) t._h = 200;
                    t.resizePanel();

                    t.showLoading();

                    if (!t.iframeObj){
                        t.iframeObj = GJ.createIframe({
                            containerId : t.canvas,
                            url : o.url,
                            scrolling : o.iframeScrolling,
                            proxyUrl: o.proxyUrl || 'http://sta.ganji.com/crossdomain.html',
                            //height : 0,
                            onLoad : function(){
                                t.hideLoading();
                                if (o.type != 'alert' && o.type != 'confirm' && isFunc(o.onLoad))o.onLoad.call(t);
                            },
                            autoSetHeight : o.autoSetHeight || false,
                            useBrowseCache : false,
                            paramsForChild : o.paramsForChild,
                            handlersForChild : o.handlersForChild
                        });
                        t.iframeObj.rpc.set('setIframeHeight', function (height) {
                            t.resizePanel(0, height);
                        });
                        t.iframeObj.iframe.focus();
                    }
                    else {
                        t.iframeObj.redirect(o.url);
                    }
                }
                else {
                    if (t.iframeObj){
                        t.iframeObj.destroy();
                        t.iframeObj = null;
                    }
                    if (!t.bd) {
                        t.bd = $('<div></div>');
                        t.bd.addClass('bd');
                        t.canvas.append(t.bd);
                    }
                    if (o.width < 1) {
                        if (!t._canvas){
                            t._canvas = $('<div class="'+t._styleClassName+' lpn_tmp_canvas '+o.className+'"></div>');
                            $("body").prepend(t._canvas);
                        }
                        t._canvas.append(t.bd);
                    }

                    if (o.url){
                        t.showLoading();
                        t.bd.load(_getFullUrl(o.url), null, function(){
                            if (o.width < 1){
                                t._setTmpSize().canvas.css('height', 'auto').append(t.bd);
                            }
                            t.hideLoading().resizePanel();
                            if (o.onLoad) {
                                o.onLoad.call(t);
                            }
                        });
                    }
                    else {
                        if (typeof o.content == 'object') {
                            t.bd.remove();
                            delete t.bd;
                            if (o.width < 1){
                                t._canvas.get(0).appendChild($(o.content).get(0));
                            }
                            else {
                                t.canvas.get(0).appendChild($(o.content).get(0));
                            }
                            t.bd = $(o.content);
                            t.bd.addClass('bd');
                        }
                        else if(typeof o.content == 'string') {
                            t.bd.html(o.content);
                        }

                        if (o.width < 1){
                            t._setTmpSize().canvas.css('height', 'auto').append(t.bd);
                        }
                    }

                    t.resizePanel();
                }
                return this;
            },
            _setTmpSize : function(){
                var t=this, o=t.config;
                t._w = t._canvas.outerWidth(true);
                if (o.type == 'tooltip' && t._w > 350) {
                    t._w = 350;
                }
                return this;
            },

            /**
             * 显示弹出层
             *
             * @method show
             * @return {object} 返回当前实例的引用
             */
            show : function()
            {
                if (this.error)return this;
                var t=this, o=t.config;

                if (t.isHide === false) return t.focus();

                if (o.type != 'alert' && o.type != 'confirm' && isFunc(o.onBeforeShow)){
                    o.onBeforeShow.call(t);
                }

                t.isHide = false;
                if (o.url) t.loaded = false;

                if(GJ.ua.ie && $('#panelHideInput').length === 0) {
                    var $hideInput = $('<input type="text" id="panelHideInput" style="position:absolute; top:0; left:-20000px;"/>');
                    $(doc.body).prepend($hideInput);
                }

                var showPanel = function (){
                    t.panel.show();
                    t.loadContent();
                    t.focus();

                    if (o.type != 'alert' && o.type != 'confirm'){
                        if (isFunc(o.onShow)) {
                            o.onShow.call(t);
                        }
                    }
                };

                if (o.mask) {
                    P.showMask(t.id);
                    P.setMaskZIndex(t.id, t.zIndex-1);
                    //GJ.later(function() {
                    showPanel();
                    //}, 100);
                } else {
                    showPanel();
                }

                return t;
            },

            /**
             * 聚焦弹出层
             *
             * @method focus
             * @return {object} 返回当前实例的引用
             */
            focus : function()
            {
                if (this.error)return this;
                var t=this, o=t.config;

                var input = $('<input type="hidden" style="top:-1000px;left:-1000px;" />');
                t.wrapper.append(input);
                input.focus().remove();
                input = null;
                try {
                    $('.lpn_submit', t.panel).focus();
                } catch (ex) {
                    // 在IE下会由于按钮不可见而触发一个异常
                }
                P.currId = t.id;

                if (!o.inline){
                    //if (o.mask)P.setMaskZIndex(t.id, P.zIndex++);
                    t.zIndex = P.zIndex+=2;
                    t.panel.css('z-index', t.zIndex);
                    if (o.mask){
                        P.setMaskZIndex(t.id, t.zIndex-1);
                    }
                }

                if (o.type != 'alert' && o.type != 'confirm' && isFunc(o.onFocus)){
                    o.onFocus.call(t);
                }

                return t;
            },

            _closeTimer : null,

            /**
             * 关闭弹出层
             *
             * @method close
             * @param {int} speed 延迟关闭的秒数。空表示渐关闭，0表示立即关闭
             * @return {object} 返回当前实例的引用
             */
            close : function(seconds)
            {
                var t = this;

                if(GJ.ua.ie) {
                    $('#panelHideInput').focus();
                }

                if (t._closeTimer){
                    t._closeTimer.cancel();
                    t._closeTimer = null;
                }

                if (t.error || t.isHide)return t;
                var o=t.config, ix = 0, p;

                function hide(){
                    if (t.isHide)return ;

                    if (o.onBeforeClose) {
                        if (!o.onBeforeClose.call(t)) {
                            return ;
                        }
                    }

                    t.isHide = true;

                    t.panel.hide();
                    P.hideMask(t.id);

                    if(o.handleElement && o.overClassName)o.handleElement.removeClass(o.overClassName);

                    if (o.url){
                        if (t.iframeObj){
                            t.iframeObj.destroy();
                            t.iframeObj = null;
                        }
                        else if (t.bd) {
                            t.bd.html('');
                        }
                    }

                    if (isFunc(o.onClose)){
                        o.onClose.call(t);
                    }
                }

                seconds = GJ.isNumber(seconds) ? parseInt(seconds) : 0;
                if (seconds == 0) {
                    hide();
                }
                else {
                    t._closeTimer = GJ.later(function(){
                        hide();
                    }, seconds * 1000);
                }

                return t;
            },
            showLoading : function()
            {
                if (this.error)return this;
                if (this.config.url){
                    if (!this.loader) {
                        this.loader = $('<div></div>');
                        this.loader.addClass('lpn_load').html('&nbsp;');
                        this.wrapper.append(this.loader);
                    }
                    this.loader.show();
                }
                return this;
            },
            hideLoading : function()
            {
                if (this.error)return this;
                if (this.loader) this.loader.hide();
                return this;
            },
            doRefresh : function()
            {
                if (this.error)return this;
                var t=this, o=t.config;
                if (!o.url) return t;

                if (t.iframeObj) {
                    t.showLoading();
                    t.iframeObj.load();
                }
                else {
                    t.showLoading();
                    t.bd.load(_getFullUrl(o.url), function(){  t.hideLoading(); });
                }

                return t;
            },

            /**
             * 将弹出层移动到提定位置
             *
             * @method moveBy
             * @param {int} left 相对左边的整数值
             * @param {int} top 相对顶部的整数值
             * @return {object} 返回当前实例的引用
             */
            moveBy : function(left, top)
            {
                if (this.error)return this;
                var t = this, moveTo;

                t.panel.css({left:left, top:top});

                return this;
            },
            setUnderlaySize : function()
            {
                if (this.error)return this;
                var u=this.underlay, wp=this.wrapper;
                if (u) {
                    var h = -(parseInt(u.css('marginTop') || 0) + parseInt(u.css('marginBottom') || 0));
                    var w = -(parseInt(u.css('marginLeft') || 0) + parseInt(u.css('marginRight') || 0));
                    u.css({"width":wp.outerWidth(true)+w, "height":wp.outerHeight(true)+h});
                }
                if (this.iframeBg){
                    this.iframeBg.css({"width":wp.outerWidth(true), "height":wp.outerHeight(true)});
                }
            },

            /**
             * 修改弹出层的大小
             *
             * @method resize
             * @param {int} width 弹出层的宽度
             * @param {int} height 弹出层的高度
             * @return {object} 返回当前实例的引用
             */
            resize : function(dw, dh)
            {
                return this.resizePanel(dw, dh, true);
            },
            resizePanel : function(dw, dh, isBody)
            {
                if (this.error)return this;
                var t=this, o=t.config, $p=t.panel, _w=t.wrapper.outerWidth(true) - t.canvas.outerWidth(true), _h=t.wrapper.outerHeight(true) - t.canvas.outerHeight(true);

                if (o.inline) dw = "100%";
                if (GJ.isNumber(dw)) t._w = dw;
                if (GJ.isNumber(dh)) {
                    t._h = dh;
                    if (!isBody) t._h -= _h;
                }

                var w, h, vp = GJ.getViewPort();
                w = t._w > 0 ? t._w : o.width;
                if (!o.inline){
                    if (isBody) {
                        w += _w;
                        if (o.url && o.iframe && o.iframeScrolling) {
                            w += getScrollBarWidth();
                        }
                    }
                    if (w > vp.width - 30) w = vp.width - 30;
                    if (w < o.minWidth) w = o.minWidth;
                }
                t.panel.css("width", w);

                h = t._h > 0 ? t._h : o.height-_h;
                if (h > 0) {
                    if (h < o.minHeight) {
                        h = o.minHeight;
                    }
                    t.canvas.css("height", h);
                }

                t.setUnderlaySize();

                setTimeout(function() {
                    t.resetPlace();
                }, 0);

                t._w = 0;
                t._h = 0;

                return t;
            },

            /**
             * 重新定位弹出层的位置
             *
             * @method resetPlace
             * @return {object} 返回当前实例的引用
             */
            resetPlace : function()
            {
                var o=this.config, $p=this.panel;
                P.setPlace($p, {
                    contextElement : o.contextElement,
                    contextPosition : o.contextPosition,
                    left : o.left,
                    top : o.top,
                    mask : o.mask
                });
                return this;
            },
            useIframe : function(bool)
            {
                this.config.iframe = bool ? true : false;
                return this;
            },
            setStyle : function(style)
            {
                var t=this, p=t.panel, cla=t._styleClassName;
                if (p) {
                    if (cla) {
                        p.removeClass(cla);
                    }
                    if(style) {
                        t._styleClassName = _getStyleClassName(style);
                        p.addClass(cla);
                    }
                    t.setUnderlaySize();
                }
                return t;
            }
        };

        /**
         * 弹出层配置类
         *
         * @class GJPanelConfig
         * @private
         */
        function PanelConfig(panelObj, o) {
            var t = this;

            /**
             * 弹出层的类型
             * 其值可以是：
             * <ul>
             *     <li><strong>panel</strong> &nbsp; &nbsp; 一个普通的弹出层面板</li>
             *     <li><strong>alert</strong> &nbsp; &nbsp; 信息提示面板</li>
             *     <li><strong>confirm</strong> &nbsp; &nbsp; 交互信息提示面板</li>
             *     <li><strong>loading</strong> &nbsp; &nbsp; 正在载入提示面板</li>
             *     <li><strong>tooltip</strong> &nbsp; &nbsp; 鼠标经过时提示面板</li>
             *     <li><strong>dropdown</strong> &nbsp; &nbsp; 下拉面板</li>
             *     <li><strong>context</strong> &nbsp; &nbsp; 右键弹出面板</li>
             *     <li><strong>module</strong> &nbsp; &nbsp; 行内面板</li>
             * </ul>
             * @property type
             * @type string
             * @default panel
             */
            t.type = 'panel';

            /**
             * 弹出层的内容
             * 其值可以是文本字符串、html字符串、页面元素
             * @property content
             * @type string|object
             * @default ''
             */
            t.content = '';

            /**
             * 弹出层的标题
             * @property title
             * @type string
             * @default ''
             */
            t.title = '';

            /**
             * 在弹出层显示的远程页面的url
             * 如果同时设置了content和url，url将无效
             * @property url
             * @type string
             * @default ''
             */
            t.url = '';

            /**
             * 是否在行内显示
             * @property inline
             * @type boolean
             * @default false
             */
            t.inline = false;

            /**
             * 弹出层的宽度
             * 当inline为true是为100%，如果为0表示自适应宽度。
             * 如果iframe为true，必须指定width的值
             * @property width
             * @type int
             * @default 0
             */
            t.width = 0;

            /**
             * 弹出层的高度
             * 如果为0表示自适应高度。
             * 如果iframe为true，必须指定height的值
             * @property height
             * @type int
             * @default 0
             */
            t.height = 0;

            /**
             * 弹出层相对于网页左侧的位置
             * @property left
             * @type int
             * @default 0
             */
            t.left = 0;

            /**
             * 弹出层相对于网页顶部的位置
             * @property top
             * @type int
             * @default 0
             */
            t.top = 0;
            t.minWidth = 100;
            t.minHeight = 20;

            /**
             * 是否显示背景覆盖层
             * @property mask
             * @type boolean
             * @default false
             */
            t.mask = false;

            /**
             * 是否可移动
             * @property moveAble
             * @type boolean
             * @default true
             */
            t.moveAble = true;

            /**
             * 是否可缩放大小
             * @property resizeAble
             * @type boolean
             * @default true
             */
            t.resizeAble = true;

            /**
             * 是否可显示控制关闭的按钮或文字
             * @property closeAble
             * @type boolean
             * @default true
             */
            t.closeAble = true;

            /**
             * 是否可显示控制刷新的按钮或文字
             * @property refreshAble
             * @type boolean
             * @default false
             */
            t.refreshAble = false;

            /**
             * 是否显示阴影
             * @property shadow
             * @type boolean
             * @default true
             */
            t.shadow = true;

            /**
             * 如果是通过url远程加载，是否显示正在加载的图标
             * @property showLoading
             * @type boolean
             * @default true
             */
            t.showLoading = true;

            /**
             * 如果使用iframe加载远程页面，是否允许iframe有滚动条
             * @property iframeScrolling
             * @type boolean
             * @default true
             */
            t.iframeScrolling = true;

            /**
             * 触发弹出层的页面元素的id或对象
             * @property handleElement
             * @type string|object
             * @default null
             */
            t.handleElement = null;

            /**
             * 是否使用iframe加载远程页面
             * @property iframe
             * @type boolean
             * @default false
             */
            t.iframe = false;

            /**
             * 弹出层定位时，参考的页面元素
             * @property contextElement
             * @type string|object
             * @default null
             */
            t.contextElement = null;

            /**
             * 弹出层定位时，相对于参考的页面元素的位置
             * @property contextPosition
             * @type string
             * @default bottom
             */
            t.contextPosition = 'bottom';

            /**
             * 给弹出层定义的className
             * @property className
             * @type string
             * @default ''
             */
            t.className = '';

            /**
             * 当鼠标经过触发元素时，该元素的className
             * @property overClassName
             * @type string
             * @default ''
             */
            t.overClassName = '';

            /**
             * 给触发元素定义的className
             * 暂只对tooltip有效
             * @property handleElementClassName
             * @type string
             * @default ''
             */
            t.handleElementClassName = '';

            /**
             * 弹出层的样式
             * 默认可用的样式有：default、1、2、text
             * @property style
             * @type string
             * @default default
             */
            t.style = 'default';

            /**
             * 是否对控制关闭等按钮使用文字
             * @property useText
             * @type boolean
             * @default false
             */
            t.useText = false;

            /**
             * 表示关闭的文字
             * @property closeText
             * @type string
             * @default 关闭
             */
            t.closeText = '关闭';

            /**
             * 表示刷新的文字
             * @property refreshText
             * @type string
             * @default 刷新
             */
            t.refreshText = '刷新';

            /**
             * 是否显示提交按钮
             * @property submitButton
             * @type boolean
             * @default false
             */
            t.submitButton = false;

            /**
             *表示提交按钮上面的文字
             *@property submitText
             *type string
             *default 确定
             */
            t.submitText = '确定';

            /**
             * 是否显示取消按钮
             * @property cancelButton
             * @type boolean
             * @default false
             */
            t.cancelButton = false;

            /**
             *表示取消按钮上面的文字
             *@property cancelText
             *type string
             *default 取消
             */
            t.cancelText = '确定';

            /**
             * 检测是否允许显示弹出层的回调函数
             * @property checkShow
             * @type Function
             * @default null
             */
            t.checkShow = null;

            /**
             * 如果使用iframe载入远程页面，要传给iframe子窗口的参数
             * @property paramsForChild
             * @type object
             * @default {}
             */
            t.paramsForChild = {};

            /**
             * 如果使用iframe载入远程页面，要给iframe子窗口调用的函数
             * 将自动添加如下几个函数
             * <ul>
             *     <li><strong>setTitle(title)</strong> &nbsp; &nbsp; 设置弹出层的标题</li>
             *     <li><strong>close()</strong> &nbsp; &nbsp; 关闭弹出层</li>
             *     <li><strong>resize(width, height)</strong> &nbsp; &nbsp; 修改弹出层的大小</li>
             *     <li><strong>resetPlace()</strong> &nbsp; &nbsp; 重置弹出层的位置</li>
             * </ul>
             * @property handlersForChild
             * @type object
             * @default {}
             */
            t.handlersForChild = {};

            /**
             * 初始化时触发的事件
             * 在函数内部，this作为当前对象的引用
             * @event onInit
             * @default null
             */
            t.onInit = null;

            /**
             * 显示弹出层之前触发的事件
             * 在函数内部，this作为当前对象的引用
             * @event onBeforeShow
             * @default null
             */
            t.onBeforeShow = null;

            /**
             * 如果远程载入页面，载入完成之后触发的事件
             * 在函数内部，this作为当前对象的引用
             * @event onLoad
             * @default null
             */
            t.onLoad = null;

            /**
             * 显示弹出层之后触发的事件
             * 在函数内部，this作为当前对象的引用
             * @event onShow
             * @default null
             */
            t.onShow = null;

            /**
             * 弹出层聚焦时触发的事件
             * 在函数内部，this作为当前对象的引用
             * @event onFocus
             * @default null
             */
            t.onFocus = null;

            /**
             * 当点击确定按钮时触发的事件
             * 在函数内部，this作为当前对象的引用
             * @event onSubmit
             * @default null
             */
            t.onSubmit = null;

            /**
             * 当点击取消按钮时触发的事件
             * 在函数内部，this作为当前对象的引用
             * @event onCancel
             * @default null
             */
            t.onCancel = null;

            /**
             * 当弹出层关闭时触发的事件
             * 在函数内部，this作为当前对象的引用
             * @event onClose
             * @default null
             */
            t.onClose = null;

            /**
             * 当弹出层关闭之前时触发的事件
             * 在函数内部，this作为当前对象的引用
             * @event onBeforeClose
             * @default null
             */
            t.onBeforeClose = null;

            /**
             * 当弹出层停止移动时触发的事件
             * 在函数内部，this作为当前对象的引用
             * @event onDragStop
             * @default null
             */
            t.onDragStop = null;

            /**
             * 在移动弹出层的过程中触发的事件
             * 在函数内部，this作为当前对象的引用
             * @event onDragMove
             * @default null
             */
            t.onDragMove = null;

            var o = o || {};

            GJ.each(o, function(v, k){
                t[k] = v;
            });

            if (t.url == '#') t.url = '';
            if (t.inline) t.width = "100%";
            t.height = parseInt(t.height);
            t.left = parseInt(t.left);
            t.top = parseInt(t.top);
            t.minWidth = parseInt(t.minWidth);
            t.minHeight = parseInt(t.minHeight);
            if (t.style.indexOf('text') != -1) t.useText =  true;
            if (t.type == 'alert' || t.type == 'confirm' || t.type == 'loading') t.mask = true;

            if (t.type == 'alert' || t.type == 'confirm'){
                t.resizeAble = false;
                t.submitButton = true;
                if (t.type == 'confirm') t.cancelButton = true;
            }

            GJ.mix(t.handlersForChild, {
                setTitle : function(title){
                    panelObj.setTitle(title);
                },
                //setContent : function(content){
                //    panelObj.setContent(content);
                //},
                close : function(seconds){
                    panelObj.close(seconds);
                },
                resize : function(width, height){
                    panelObj.resize(width, height);
                },
                resetPlace: function(){
                    panelObj.resetPlace();
                }
            }, true);
        };
    });

