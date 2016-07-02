/*!
 * jquery.demo.js 0.0.1
 */
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define("jquery.demo.js", [ "jquery" ], function(a0) {
            return factory(a0);
        });
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"));
    } else {
        factory(jQuery);
    }
})(this, function($) {
	var lang, consts;

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
        	//初始化全局变量
        	lang = $.fn.demo.lang;
        	consts = $.fn.demo.consts;

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
            },
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

    /**
	 * jQuery插件
	 * =====================
	 */
    (function() {
        "use strict";

        var old, keys;       
        old = $.fn.demo;

        //关键变量名
        keys = {
            "datakey": "demo"
        };

		/**
         * 插件定义
		 * =====================
         */
        $.fn.demo = function(options) {
            if (typeof options === 'string') {//第一个参数是string类型，对已有对象调用API方法
				var args = arguments,
					method = options;

				if (method.charAt(0) === "_"){ //不处理私有方法
					return this;
				}

				Array.prototype.shift.call(args); //移除第一个参数，即方法名method
				if (method.substr(0,3) === "get"){ //取值类的方法，只获得第一个元素的返回值			
					var $first = $($(this)[0]);
					var instance = $first.data(keys.datakey);
					if (instance && instance[method]){
						return instance[method].apply(instance, args);
					}
				} else { //其他方法
					return this.each(function() {
						var instance =	$(this).data(keys.datakey);
						if (instance && instance[method]) {
							instance[method].apply(instance, args);
						}
					});
				}
			} else {//初始化对象			
				return initialize.apply(this, arguments);
			}
        };//$.fn.demo

        /**
         * 插件定义
         * 首字母小写，初始化后返回可链式操作的jQuery对象
		 * =====================
         */
		$.fn.demo = function(options) {		
			if (typeof options === 'string') {//第一个参数是string类型，则对已有对象调用API方法
				return invokeapi.apply(this, arguments);
			} else {//初始化对象			
				return initialize.apply(this, arguments);
			}
		};//$.fn.demo
		
		/**
         * 插件定义
         * 首字母大写的变形的插件，初始化后返回第一个插件实例
		 * =====================
         */
		$.fn.Demo = function(options) {		
			if (typeof options === 'string') {//第一个参数是string类型，则对已有对象调用API方法
				return invokeapi.apply(this, arguments);
			} else {//初始化对象			
				initialize.apply(this, arguments);
				
				var $first = $($(this)[0]);
				var instance = $first.data(keys.datakey);
				return instance;
			}
		};//$.fn.Demo
		
		/**
	     * 调用API方法
	     */
	    function invokeapi() {
	    	var method = arguments[0],//第一个参数是API方法名
	    	args = [].slice.call(arguments, 1);//第一个参数外的所有参数才是API方法的参数;
			
	    	if (method.charAt(0) == "_"){ //不处理私有方法
				return this;
			}
			if (method.substr(0,3) == "get"){ //取值类方法，只获得第一个元素的返回值			
				var $first = $($(this)[0]);
				var instance = $first.data(keys.datakey);
				if (instance && instance[method]){
					return instance[method].apply(instance, args);
				}
			} else { //其他方法
				return this.each(function() {
					var instance =	$(this).data(keys.datakey);
					if (instance && instance[method]) {
						instance[method].apply(instance, args);
					}
				});
			}
	    }//invokeapi
	    
	    /**
	     * 初始化插件
	     * @param  {json} opts  	配置参数
	     * @return {jq}         	可链式的jQuery对象
	     */
	    function initialize(opts) {
	        var opts = opts || {};
	
	        return this.each(create);
	
	        function create() {
	            var $this, instance;	            
	            $this = $(this);
	            
	            if($this.data(keys.datakey)){
					//已初始化
				} else {
					//创建各内部辅助类
					
					//创建主类
					instance = new Demo(this, opts);
						
		            //绑定主插件到元素上
		            $this.data(keys.datakey, instance);				
				}
	        }//create
	    }//initialize

        
        /**
         * 冲突处理
		 * =====================
         */
        $.fn.demo.noConflict = function noConflict() {
            $.fn.demo = old;
            return this;
        };

        /**
         * 默认配置参数
		 * =====================
         */
        $.fn.demo.defaults = {
             "foo":"xxx"
            ,"noop": "upload" /* yy */
            ,"bar": 2 /* xx */
        };//$.fn.demo.defaults

        /**
         * 文言
		 * =====================
         */
        $.fn.demo.lang = {
        	 "foo":""

        	,"bar":""
	    };//$.fn.demo.lang

	    /**
	     * 关键变量
		 * =====================
	     */
	    $.fn.demo.consts = {
		    'boxcls':'demo'//最外容器类名
		};
    })();//jQuery 插件
});