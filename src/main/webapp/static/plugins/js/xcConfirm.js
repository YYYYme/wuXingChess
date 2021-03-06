/*
 * 使用说明:
 * window.wxc.Pop(popHtml, [type], [options])
 * popHtml:html字符串
 * type:window.wxc.xcConfirm.typeEnum集合中的元素
 * options:扩展对象
 * 用法:
 * 1. window.wxc.xcConfirm("我是弹窗<span>lalala</span>");
 * 2. window.wxc.xcConfirm("成功","success");
 * 3. window.wxc.xcConfirm("请输入","input",{onOk:function(){}})
 * 4. window.wxc.xcConfirm("自定义",{title:"自定义"})
 */
(function ($) {
    window.wxc = window.wxc || {};
    window.wxc.xcConfirm = function (popHtml, type, options) {
        var btnType = window.wxc.xcConfirm.btnEnum;
        var eventType = window.wxc.xcConfirm.eventEnum;
        var popType = {
            info: {
                title: "信息",
                icon: "0 0",//蓝色i
                btn: btnType.ok
            },
            success: {
                title: "成功",
                icon: "0 -48px",//绿色对勾
                btn: btnType.ok
            },
            error: {
                title: "错误",
                icon: "-48px -48px",//红色叉
                btn: btnType.ok
            },
            confirm: {
                title: "提示",
                icon: "-48px 0",//黄色问号
                btn: btnType.okcancel
            },
            warning: {
                title: "警告",
                icon: "0 -96px",//黄色叹号
                btn: btnType.okcancel
            },
            input: {
                title: "输入",
                icon: "",
                btn: btnType.ok
            },
            custom: {
                title: "",
                icon: "",
                btn: btnType.ok
            },
            restartout: {
                title: "",
                icon: "",
                btn: btnType.restartout
            }
        };
        var itype = type ? type instanceof Object ? type : popType[type] || {} : {};//格式化输入的参数:弹窗类型
        var config = $.extend(true, {
            //属性
            title: "", //自定义的标题
            icon: "", //图标
            btn: btnType.ok, //按钮,默认单按钮
            //事件
            onOk: $.noop,//点击确定的按钮回调
            onCancel: $.noop,//点击取消的按钮回调
            onClose: $.noop,//弹窗关闭的回调,返回触发事件
            onRestart: $.noop,//点击重新开始的按钮回调
            onOut: $.noop//退出的回调,返回触发事件
        }, itype, options);

        var $txt = $("<p>").html(popHtml);//弹窗文本dom
        var $tt = $("<span>").addClass("tt").text(config.title);//标题
        var icon = config.icon;
        var $icon = icon ? $("<div>").addClass("bigIcon").css("backgroundPosition", icon) : "";
        var btn = config.btn;//按钮组生成参数

        var popId = creatPopId();//弹窗索引

        var $box = $("<div>").addClass("xcConfirm");//弹窗插件容器
        var $layer = $("<div>").addClass("xc_layer");//遮罩层
        var $popBox = $("<div>").addClass("popBox");//弹窗盒子
        var $ttBox = $("<div>").addClass("ttBox");//弹窗顶部区域
        var $txtBox = $("<div>").addClass("txtBox");//弹窗内容主体区
        var $btnArea = $("<div>").addClass("btnArea");//按钮区域

        var $ok = $("<a>").addClass("sgBtn").addClass("ok").text("确定");//确定按钮
        var $cancel = $("<a>").addClass("sgBtn").addClass("cancel").text("取消");//取消按钮
        var $restart = $("<a>").addClass("sgBtn").addClass("ok").text("重新开始");//重新开始按钮
        var $out = $("<a>").addClass("sgBtn").addClass("cancel").text("退出房间");//退出按钮
        var $input = $("<input>").addClass("inputBox");//输入框
        var $clsBtn = $("<a>").addClass("");//关闭按钮
        //var $clsBtn = $("<a>").addClass("clsBtn");//关闭按钮

        //建立按钮映射关系
        var btns = {
            ok: $ok,
            cancel: $cancel,
            restart: $restart,
            out: $out
        };

        init();

        function init() {
            //处理特殊类型input
            if (popType["input"] === itype) {
                $txt.append($input);
            }

            creatDom();
            bind();
        }

        function creatDom() {
            $popBox.append(
                $ttBox.append(
                    $clsBtn
                ).append(
                    $tt
                )
            ).append(
                $txtBox.append($icon).append($txt)
            ).append(
                $btnArea.append(creatBtnGroup(btn))
            );
            $box.attr("id", popId).append($layer).append($popBox);
            $("body").append($box);
        }

        function bind() {
            //点击确认按钮
            $ok.click(doOk);

            //回车键触发确认按钮事件
            $(window).bind("keydown", function (e) {
                if (e.keyCode == 13) {
                    if ($("#" + popId).length == 1) {
                        doOk();
                    }
                }
            });

            //点击取消按钮
            $cancel.click(doCancel);

            //点击关闭按钮
            $clsBtn.click(doClose);

            //点击重新开始按钮var $clsBtn = $("<a>").add
            $restart.click(doRestart);

            //点击退出房间按钮
            $out.click(doOut);
        }

        //确认按钮事件
        function doOk() {
            var $o = $(this);
            var v = $.trim($input.val());
            if ($input.is(":visible"))
                config.onOk(v);
            else
                config.onOk();
            $("#" + popId).remove();
            config.onClose(eventType.ok);
        }

        //取消按钮事件
        function doCancel() {
            var $o = $(this);
            config.onCancel();
            $("#" + popId).remove();
            config.onClose(eventType.cancel);
        }

        //关闭按钮事件
        function doClose() {
            $("#" + popId).remove();
            config.onClose(eventType.close);
            $(window).unbind("keydown");
        }

        //重新开始按钮事件
        function doRestart() {
            $("#" + popId).remove();
            config.onClose(eventType.close);
            $(window).unbind("keydown");
        }

        //退出房间按钮事件
        function doOut() {
            $("#" + popId).remove();
            config.onClose(eventType.close);
            $(window).unbind("keydown");
        }

        //生成按钮组
        function creatBtnGroup(tp) {
            var $bgp = $("<div>").addClass("btnGroup");
            $.each(btns, function (i, n) {
                if (btnType[i] == (tp & btnType[i])) {
                    $bgp.append(n);
                }
                if (tp == 4) {
                    if (i === 'restart' || i === 'out')
                        $bgp.append(n);
                }
            });
            return $bgp;
        }

        //重生popId,防止id重复
        function creatPopId() {
            var i = "pop_" + (new Date()).getTime() + parseInt(Math.random() * 100000);//弹窗索引
            if ($("#" + i).length > 0) {
                return creatPopId();
            } else {
                return i;
            }
        }
    };

    //按钮类型
    window.wxc.xcConfirm.btnEnum = {
        ok: parseInt("0001", 2), //确定按钮
        cancel: parseInt("0010", 2), //取消按钮
        okcancel: parseInt("0011", 2), //确定&&取消
        restartout: parseInt("0100", 2), //重新开始&&退出房间
    };

    //触发事件类型
    window.wxc.xcConfirm.eventEnum = {
        ok: 1,
        cancel: 2,
        close: 3,
        restart: 4,
        out: 5
    };

    //弹窗类型
    window.wxc.xcConfirm.typeEnum = {
        info: "info",
        success: "success",
        error: "error",
        confirm: "confirm",
        warning: "warning",
        input: "input",
        custom: "custom",
        restartout: "restartout"
    };

})(jQuery);