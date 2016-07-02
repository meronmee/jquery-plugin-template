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
     * ������
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
     

    //...�����ڲ������

    /**
     * ����
     */
    var Demo = function() {
        "use strict";
		/**
         * ���캯��
         * @param {json} opts   ���ò���
         */
        function Demo(opts) {
        	//��ʼ��ȫ�ֱ���
        	lang = $.fn.demo.lang;
        	consts = $.fn.demo.consts;

			//����Ԥ����        
            opts = this._prepare(opts);
            
            //����У��
            if (!opts.input) {
                $.error("missing input");
            }

            //��ʼ��
            this._init();            
        }

        /**
         * �෽��
         */
        _.mixin(Demo.prototype, {
            //�ڲ�����
            //--------------------------
            //���ò�������Ԥ����
            _prepare: function(opts) {
                opts = opts || {};
                //...
            },
            //��ʼ��
            _init: function() {
                this._initDom();
                this._initEvents();
            },
            //��ʼ��DOM�ṹ
            _initDom: function() {
                
            },
            //��ʼ���¼�
            _initEvents: function() {
                
            },


            //API����
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
	 * jQuery���
	 * =====================
	 */
    (function() {
        "use strict";

        var old, keys;       
        old = $.fn.demo;

        //�ؼ�������
        keys = {
            "datakey": "demo"
        };

		/**
         * �������
		 * =====================
         */
        $.fn.demo = function(options) {
            if (typeof options === 'string') {//��һ��������string���ͣ������ж������API����
				var args = arguments,
					method = options;

				if (method.charAt(0) === "_"){ //������˽�з���
					return this;
				}

				Array.prototype.shift.call(args); //�Ƴ���һ����������������method
				if (method.substr(0,3) === "get"){ //ȡֵ��ķ�����ֻ��õ�һ��Ԫ�صķ���ֵ			
					var $first = $($(this)[0]);
					var instance = $first.data(keys.datakey);
					if (instance && instance[method]){
						return instance[method].apply(instance, args);
					}
				} else { //��������
					return this.each(function() {
						var instance =	$(this).data(keys.datakey);
						if (instance && instance[method]) {
							instance[method].apply(instance, args);
						}
					});
				}
			} else {//��ʼ������			
				return initialize.apply(this, arguments);
			}
        };//$.fn.demo

        /**
         * �������
         * ����ĸСд����ʼ���󷵻ؿ���ʽ������jQuery����
		 * =====================
         */
		$.fn.demo = function(options) {		
			if (typeof options === 'string') {//��һ��������string���ͣ�������ж������API����
				return invokeapi.apply(this, arguments);
			} else {//��ʼ������			
				return initialize.apply(this, arguments);
			}
		};//$.fn.demo
		
		/**
         * �������
         * ����ĸ��д�ı��εĲ������ʼ���󷵻ص�һ�����ʵ��
		 * =====================
         */
		$.fn.Demo = function(options) {		
			if (typeof options === 'string') {//��һ��������string���ͣ�������ж������API����
				return invokeapi.apply(this, arguments);
			} else {//��ʼ������			
				initialize.apply(this, arguments);
				
				var $first = $($(this)[0]);
				var instance = $first.data(keys.datakey);
				return instance;
			}
		};//$.fn.Demo
		
		/**
	     * ����API����
	     */
	    function invokeapi() {
	    	var method = arguments[0],//��һ��������API������
	    	args = [].slice.call(arguments, 1);//��һ������������в�������API�����Ĳ���;
			
	    	if (method.charAt(0) == "_"){ //������˽�з���
				return this;
			}
			if (method.substr(0,3) == "get"){ //ȡֵ�෽����ֻ��õ�һ��Ԫ�صķ���ֵ			
				var $first = $($(this)[0]);
				var instance = $first.data(keys.datakey);
				if (instance && instance[method]){
					return instance[method].apply(instance, args);
				}
			} else { //��������
				return this.each(function() {
					var instance =	$(this).data(keys.datakey);
					if (instance && instance[method]) {
						instance[method].apply(instance, args);
					}
				});
			}
	    }//invokeapi
	    
	    /**
	     * ��ʼ�����
	     * @param  {json} opts  	���ò���
	     * @return {jq}         	����ʽ��jQuery����
	     */
	    function initialize(opts) {
	        var opts = opts || {};
	
	        return this.each(create);
	
	        function create() {
	            var $this, instance;	            
	            $this = $(this);
	            
	            if($this.data(keys.datakey)){
					//�ѳ�ʼ��
				} else {
					//�������ڲ�������
					
					//��������
					instance = new Demo(this, opts);
						
		            //���������Ԫ����
		            $this.data(keys.datakey, instance);				
				}
	        }//create
	    }//initialize

        
        /**
         * ��ͻ����
		 * =====================
         */
        $.fn.demo.noConflict = function noConflict() {
            $.fn.demo = old;
            return this;
        };

        /**
         * Ĭ�����ò���
		 * =====================
         */
        $.fn.demo.defaults = {
             "foo":"xxx"
            ,"noop": "upload" /* yy */
            ,"bar": 2 /* xx */
        };//$.fn.demo.defaults

        /**
         * ����
		 * =====================
         */
        $.fn.demo.lang = {
        	 "foo":""

        	,"bar":""
	    };//$.fn.demo.lang

	    /**
	     * �ؼ�����
		 * =====================
	     */
	    $.fn.demo.consts = {
		    'boxcls':'demo'//������������
		};
    })();//jQuery ���
});