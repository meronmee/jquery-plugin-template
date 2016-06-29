/*!
 * jquery.demo.js 0.0.1
 */
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define("demo.js", [ "jquery" ], function(a0) {
            return factory(a0);
        });
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"));
    } else {
        factory(jQuery);
    }
})(this, function($) {
	/**
     * 工具类
     */
    var _ = function() {
        "use strict";
        return {
            isMsie: function() {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function(str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            isString: function(obj) {
                return typeof obj === "string";
            },
            isNumber: function(obj) {
                return typeof obj === "number";
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function(obj) {
                return typeof obj === "undefined";
            },
            isElement: function(obj) {
                return !!(obj && obj.nodeType === 1);
            },
            isJQuery: function(obj) {
                return obj instanceof $;
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? "" : s + "";
            },
            clone: function(obj) {
                return $.extend(true, {}, obj);
            },
            getIdGenerator: function() {
                var counter = 0;
                return function() {
                    return counter++;
                };
            },
            stringify: function(val) {
                return _.isString(val) ? val : JSON.stringify(val);
            },            
            mixin: $.extend,
            noop: function() {}
        };
    }();//_
    
    //...其他内部组件类

    /**
     * 主类
     */
    var Demo = function() {
        "use strict";
		/**
         * 构造函数
         * @param {json} opts   配置参数
         */
        function Demo(opts) {
			//参数预处理        
            opts = this._prepare(opts);
            
            //参数校验
            if (!opts.input) {
                $.error("missing input");
            }

            //初始化
            this._init();            
        }

        /**
         * 类方法
         */
        _.mixin(Demo.prototype, {
            //内部方法
            //--------------------------
            //配置参数参数预处理
            _prepare: function(opts) {
                opts = opts || {};
                //...
            },
            //初始化
            _init: function() {
                this._initDom();
                this._initEvents();
            },
            //初始化DOM结构
            _initDom: function() {
                
            },
            //初始化事件
            _initEvents: function() {
                
            },


            //API方法
            //--------------------------
            getInstance: function getInstance(){
                return this;
            }
            isEnabled: function isEnabled() {
                return this.enabled;
            },
            enable: function enable() {
                this.enabled = true;
            },
            disable: function disable() {
                this.enabled = false;
            },
            isActive: function isActive() {
                return this.active;
            },            
            destroy: function destroy() {
                this.input.destroy();
                this.menu.destroy();
            }
        });//_.mixin(Demo.prototype

        return Demo;
    }();//var Demo = function()

    //jQuery 插件
    (function() {
        "use strict";
        var old, keys, methods;
       
        old = $.fn.demo;

        //关键变量名
        keys = {
            demo: "demo"
        };
        methods = {
            /**
             * 初始化插件
             * @param  {json} opts  配置参数
             * @return {jq}         可链式的jQuery对象
             */
            initialize: function initialize(opts) {
                var opts = opts || {};

                return this.each(create);

                function create() {
                    var $this, demo;

                    $this = $(this);
                    
                    //创建各个内部组件和主插件
					//...
                    demo = new Demo({
                        //...
                    });

                    //绑定主插件到元素上
                    $this.data(keys.demo, demo);
                }
            },

            //插件API接口
            //------------------
            getInstance: function getInstance(){
                return this;
            }
            isEnabled: function isEnabled() {
                var enabled;
                runEach(this.first(), function(t) {
                    enabled = t.isEnabled();
                });
                return enabled;
            },
            enable: function enable() {
                runEach(this, function(t) {
                    t.enable();
                });
                return this;
            },
            disable: function disable() {
                runEach(this, function(t) {
                    t.disable();
                });
                return this;
            },
            isActive: function isActive() {
                var active;
                runEach(this.first(), function(t) {
                    active = t.isActive();
                });
                return active;
            },
            destroy: function destroy() {
                runEach(this, function(t, $input) {
                    t.destroy();
                });
                return this;
            }
        };//methods

        //执行具体API方法
        function runEach($els, fn) {
            $els.each(function() {
                var $this = $(this), demo;
                (demo = $this.data(keys.demo)) && fn(demo, $this);
            });
        }

        //插件定义
        $.fn.demo = function(method) {
            if (methods[method]) {//如果method是API方法名，则执行调用API方法
                return methods[method].apply(this, [].slice.call(arguments, 1));
            } else {//否则执行插件初始化操作
                return methods.initialize.apply(this, arguments);
            }
        };
        
        /**
         * 冲突处理
         */
        $.fn.demo.noConflict = function noConflict() {
            $.fn.demo = old;
            return this;
        };

        /**
         * 默认配置参数
         */
        $.fn.demo.defaults = {
             "foo":"xxx",
            ,"noop": "upload", /* yy */
            ,"bar": 2 /* xx */
        };//$.fn.demo.defaults
    })();//jQuery 插件
});