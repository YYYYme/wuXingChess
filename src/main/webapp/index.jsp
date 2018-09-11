<%@ page language="java" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>棋盘界面</title>
    <script type="text/javascript" src="./static/plugins/js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="./static/plugins/js/chess.js"></script>
    <style>
        .squ-line{
            width:65px;
            height:65px;
            border:1px solid #ddd;
            border-radius:4px;
            display: inline-block;
            /*background-color: rgb(209,169,118);*/
            background-color: rgb(209,169,90);
        }
        .diamond{
            width:65px;
            height:65px;
        }
        .jin{
            background-image: url("./static/plugins/images/jin.png");
            width:65px;
            height:65px;
        }
        .mu{
            background-image: url("./static/plugins/images/mu.png");
            width:65px;
            height:65px;
        }
        .shui{
            background-image: url("./static/plugins/images/shui.png");
            width:65px;
            height:65px;
        }
        .huo{
            background-image: url("./static/plugins/images/huo.png");
            width:65px;
            height:65px;
        }
        .tu{
            background-image: url("./static/plugins/images/tu.png");
            width:65px;
            height:65px;
        }
        .shuai{
            background-image: url("./static/plugins/images/shuai.png");
            width:65px;
            height:65px;
        }
    </style>
</head>
<body>
<div id="chessBoard" style="width:90%;height:100%;margin:20px 0;text-align:center;background: url(./static/plugins/images/bgpic.png) no-repeat 250px 0px;">
    <div class="row-line">
        <span id="0_6" class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="-1_5" class="squ-line"></span>
        <span id="0_5"  class="squ-line"></span>
        <span id="1_5"  class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="-2_4" class="squ-line"></span>
        <span id="-1_4" class="squ-line"></span>
        <span id="0_4"  class="squ-line"></span>
        <span id="1_4"  class="squ-line"></span>
        <span id="2_4"  class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="-3_3" class="squ-line"></span>
        <span id="-2_3" class="squ-line"></span>
        <span id="-1_3" class="squ-line"></span>
        <span id="0_3"  class="squ-line"></span>
        <span id="1_3"  class="squ-line"></span>
        <span id="2_3"  class="squ-line"></span>
        <span id="3_3"  class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="-4_2" class="squ-line"></span>
        <span id="-3_2" class="squ-line"></span>
        <span id="-2_2" class="squ-line"></span>
        <span id="-1_2" class="squ-line"></span>
        <span id="0_2"  class="squ-line"></span>
        <span id="1_2"  class="squ-line"></span>
        <span id="2_2"  class="squ-line"></span>
        <span id="3_2"  class="squ-line"></span>
        <span id="4_2"  class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="-5_1" class="squ-line"></span>
        <span id="-4_1" class="squ-line"></span>
        <span id="-3_1" class="squ-line"></span>
        <span id="-2_1" class="squ-line"></span>
        <span id="-1_1" class="squ-line"></span>
        <span id="0_1"  class="squ-line"></span>
        <span id="1_1"  class="squ-line"></span>
        <span id="2_1"  class="squ-line"></span>
        <span id="3_1"  class="squ-line"></span>
        <span id="4_1"  class="squ-line"></span>
        <span id="5_1"  class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="-6_0" class="squ-line"></span>
        <span id="-5_0" class="squ-line"></span>
        <span id="-4_0" class="squ-line"></span>
        <span id="-3_0" class="squ-line"></span>
        <span id="-2_0" class="squ-line"></span>
        <span id="-1_0" class="squ-line"></span>
        <span id="0_0" class="squ-line">
                    <img alt="" class="diamond" src="./static/plugins/images/diamond.png">
                </span>
        <span id="1_0" class="squ-line"></span>
        <span id="2_0" class="squ-line"></span>
        <span id="3_0" class="squ-line"></span>
        <span id="4_0" class="squ-line"></span>
        <span id="5_0" class="squ-line"></span>
        <span id="6_0" class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="-5_-1" class="squ-line"></span>
        <span id="-4_-1" class="squ-line"></span>
        <span id="-3_-1" class="squ-line"></span>
        <span id="-2_-1" class="squ-line"></span>
        <span id="-1_-1" class="squ-line"></span>
        <span id="0_-1" class="squ-line"></span>
        <span id="1_-1" class="squ-line"></span>
        <span id="2_-1" class="squ-line"></span>
        <span id="3_-1" class="squ-line"></span>
        <span id="4_-1" class="squ-line"></span>
        <span id="5_-1" class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="-4_-2" class="squ-line"></span>
        <span id="-3_-2" class="squ-line"></span>
        <span id="-2_-2" class="squ-line"></span>
        <span id="-1_-2" class="squ-line"></span>
        <span id="0_-2"  class="squ-line"></span>
        <span id="1_-2"  class="squ-line"></span>
        <span id="2_-2"  class="squ-line"></span>
        <span id="3_-2"  class="squ-line"></span>
        <span id="4_-2"  class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="-3_-3" class="squ-line"></span>
        <span id="-2_-3" class="squ-line"></span>
        <span id="-1_-3" class="squ-line"></span>
        <span id="0_-3"  class="squ-line"></span>
        <span id="1_-3"  class="squ-line"></span>
        <span id="2_-3"  class="squ-line"></span>
        <span id="3_-3"  class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="-2_-4" class="squ-line"></span>
        <span id="-1_-4" class="squ-line"></span>
        <span id="0_-4"  class="squ-line"></span>
        <span id="1_-4"  class="squ-line"></span>
        <span id="2_-4"  class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="-1_-5" class="squ-line"></span>
        <span id="0_-5"  class="squ-line"></span>
        <span id="1_-5"  class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="0_-6" class="squ-line"></span>
    </div>
</div>
</body>

<script type="text/javascript">
    var desc = "<%=request.getParameter("desc")%>";
    console.log(desc);
    var websocket = null;
    //判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://localhost:8080/websocket");
        init();
    }
    else {
        alert('当前浏览器 Not support websocket');
    }

    //连接发生错误的回调方法
    websocket.onerror = function () {
        setMessageInnerHTML("WebSocket连接发生错误");
    };

    //连接成功建立的回调方法
    websocket.onopen = function () {
        setMessageInnerHTML("WebSocket连接成功");
    }

    //接收到消息的回调方法
    websocket.onmessage = function (event) {
        setMessageInnerHTML(event.data);
    }

    //连接关闭的回调方法
    websocket.onclose = function () {
        setMessageInnerHTML("WebSocket连接关闭");
    }

    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function () {
        closeWebSocket();
    }

    //将消息显示在网页上
    function setMessageInnerHTML(innerHTML) {
        //document.getElementById('message').innerHTML += innerHTML + '<br/>';
    }

    //关闭WebSocket连接
    function closeWebSocket() {
        websocket.close();
    }

    //发送消息
    function send() {
        var message = document.getElementById('text').value;
        websocket.send(message);
    }
    //初始位置
    function init(){
        $("#0_-1").addClass("jin");
        $("#0_-2").addClass("mu");
        $("#0_-3").addClass("shui");
        $("#0_-4").addClass("huo");
        $("#0_-5").addClass("tu");
        $("#0_-6").addClass("shuai");
        //我方为红色
        myColor = 1;
        //红方先走
        myStep = 1;
    }

    $('#chessBoard').click(function (e) {
        console.log(e);
        if(myStep % 2 !== 1){
            return;
        }
        //判断是否第一次有效点击
        var id = e.target.id;
        //判断点击处是否有棋子
        var firstClass = chessJudgePoint(e.target.classList);
        if (!firstClass){
            if (myColor % 2 === 1){

            }
        }
        var point = chessGetPosition(id);
        if ( chessIsFirst(point)){
            chessPutFirstPoint(point);
            return;
        } else{
            //判断是否释放技能

            //判断可不可以走这里
            chessCanMove(point, "jin", false);
        }

    });

</script>
</html>