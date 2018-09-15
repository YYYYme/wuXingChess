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
            background-image: url("./static/plugins/images/diamond.png");
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
        .jin0{
            background-image: url("./static/plugins/images/jin0.png");
            width:65px;
            height:65px;
        }
        .mu0{
            background-image: url("./static/plugins/images/mu0.png");
            width:65px;
            height:65px;
        }
        .shui0{
            background-image: url("./static/plugins/images/shui0.png");
            width:65px;
            height:65px;
        }
        .huo0{
            background-image: url("./static/plugins/images/huo0.png");
            width:65px;
            height:65px;
        }
        .tu0{
            background-image: url("./static/plugins/images/tu0.png");
            width:65px;
            height:65px;
        }
        .shuai0{
            background-image: url("./static/plugins/images/shuai0.png");
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
        <span id="0_0" class="squ-line"></span>
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
<input type="button" id="chessIsSkill" value="释放技能" disabled="true" onclick="chessReleaseSkill()"/>
<input type="button" id="chessMeStop" value="走" onclick="chessMeStop()"/>
</body>

<script type="text/javascript">
    var desc = "<%=request.getParameter("desc")%>";
    var roomName = "<%=request.getParameter("roomName")%>";
    //记录房间名称
    chessMyRoom = roomName;
    //1 红色
    myColor = desc;
    //红方先走
    myStep = parseInt(desc);
    console.log(desc);
    var websocket = null;
    //判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://localhost:8080/websocket?roomName="+ roomName+"&color="+myColor);
        init();
    }
    else {
        alert('当前浏览器 Not support websocket');
    }

    //连接发生错误的回调方法
    websocket.onerror = function () {
        alert("WebSocket连接发生错误");
    };

    //连接成功建立的回调方法
    websocket.onopen = function () {
        setMessageInnerHTML("WebSocket连接成功");
    };

    //接收到消息的回调方法
    websocket.onmessage = function (event) {
        var message = eval('(' + event.data + ')');
        console.log(message);
        //开始游戏
        if(message.type === 0){
            chessIsBegin = 1;
            //初始化对方棋子
            initOtherChess();
        }
        //收到对方走步
        if(message.type === 1){
            //对方没放技能
            if (message.isSkill == 0){
                chessTraceNoSkill(message);
            } else {

            }
            //更新步数
            myStep = message.step;
            //走按钮变亮
            chessWalkLight();
        }

    };

    //连接关闭的回调方法
    websocket.onclose = function () {
        setMessageInnerHTML("WebSocket连接关闭");
    };

    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function () {
        closeWebSocket();
    };

    //将消息显示在网页上
    function setMessageInnerHTML(innerHTML) {
        //document.getElementById('message').innerHTML += innerHTML + '<br/>';
    }

    //关闭WebSocket连接
    function closeWebSocket() {
        websocket.close();
    }

    //发送消息
    function send(message) {
        websocket.send(message);
    }

    $('.squ-line').click(function (e) {
        console.log(e);
        if (chessIsBegin === 0){
            alert("没有对手加入房间");
            return;
        }
        if(myStep % 2 !== 1){
            alert("未到我方走");
            return;
        }
        //获取点击点id,class
        var id = e.target.id;
        var classList = e.target.classList;

        //根据id获取坐标值
        var point = chessGetPosition(id);
        //判断是否第一次有效点击
        //第一存点为空
        if (chessIsFirst()){
            //判断点击处是否有棋子,返回对应class
            var firstClass = chessJudgePoint(classList);
            if (firstClass){
                //判断点击是否是我方棋子
                if (chessJudgeMyChess(firstClass)){
                    chessFirstClass = firstClass;
                    chessIsSkill();
                } else {
                    return;
                }
            } else {
                return;
            }
            //第一个有效点击点放入第一存点
            chessPutFirstPoint(point);
            return;
        } else{
            //判断是否释放技能
            if (isSkill === 1){
                //填充释放技能后的棋子位置
                chessPutSkillPoint(point, classList);
            }
            //判断可不可以走这里
            chessCanMove(point, false)
        }

    });

    //初始位置
    function init(){
        if (myColor == 0){
            $("#0_0").addClass("diamond");
            $("#0_1").addClass("jin0");
            $("#0_2").addClass("mu0");
            $("#0_3").addClass("shui0");
            $("#0_4").addClass("huo0");
            $("#0_5").addClass("tu0");
            $("#0_6").addClass("shuai0");
        } else {
            $("#0_0").addClass("diamond");
            $("#0_-1").addClass("jin");
            $("#0_-2").addClass("mu");
            $("#0_-3").addClass("shui");
            $("#0_-4").addClass("huo");
            $("#0_-5").addClass("tu");
            $("#0_-6").addClass("shuai");
        }
    }
    //初始对方位置
    function initOtherChess(){
        if (myColor == 1){
            $("#0_1").addClass("jin0");
            $("#0_2").addClass("mu0");
            $("#0_3").addClass("shui0");
            $("#0_4").addClass("huo0");
            $("#0_5").addClass("tu0");
            $("#0_6").addClass("shuai0");
        } else {
            $("#0_-1").addClass("jin");
            $("#0_-2").addClass("mu");
            $("#0_-3").addClass("shui");
            $("#0_-4").addClass("huo");
            $("#0_-5").addClass("tu");
            $("#0_-6").addClass("shuai");

        }
    }
</script>
</html>