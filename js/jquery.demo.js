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

    //jQuery ���
    (function() {
        "use strict";
        var old, keys, methods;
       
        old = $.fn.demo;

        //�ؼ�������
        keys = {
            demo: "demo"
        };
        methods = {
            /**
             * ��ʼ�����
             * @param  {json} opts  ���ò���
             * @return {jq}         ����ʽ��jQuery����
             */
            initialize: function initialize(opts) {
                var opts = opts || {};

                return this.each(create);

                function create() {
                    var $this, demo;

                    $this = $(this);
                    
                    //���������ڲ�����������
					//...
                    demo = new Demo({
                        //...
                    });

                    //���������Ԫ����
                    $this.data(keys.demo, demo);
                }
            },

            //���API�ӿ�
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

        //ִ�о���API����
        function runEach($els, fn) {
            $els.each(function() {
                var $this = $(this), demo;
                (demo = $this.data(keys.demo)) && fn(demo, $this);
            });
        }

        //�������
        $.fn.demo = function(method) {
            if (methods[method]) {//���method��API����������ִ�е���API����
                return methods[method].apply(this, [].slice.call(arguments, 1));
            } else {//����ִ�в����ʼ������
                return methods.initialize.apply(this, arguments);
            }
        };
        
        /**
         * ��ͻ����
         */
        $.fn.demo.noConflict = function noConflict() {
            $.fn.demo = old;
            return this;
        };

        /**
         * Ĭ�����ò���
         */
        $.fn.demo.defaults = {
             "foo":"xxx",
            ,"noop": "upload", /* yy */
            ,"bar": 2 /* xx */
        };//$.fn.demo.defaults
    })();//jQuery ���
});