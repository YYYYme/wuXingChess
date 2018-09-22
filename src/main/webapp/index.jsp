<%@ page language="java" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>棋盘界面</title>
    <script type="text/javascript" src="./static/plugins/js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="./static/plugins/js/chess.js"></script>
    <link rel="stylesheet" href="./static/plugins/css/buttonStyle.css" media="screen" type="text/css"/>
    <link rel="stylesheet" href="./static/plugins/css/circleReset.css">
    <link rel="stylesheet" href="./static/plugins/css/circleStyle.css" media="screen" type="text/css"/>
    <link rel="stylesheet" type="text/css" href="./static/plugins/css/xcConfirm.css"/>
    <script src="./static/plugins/js/xcConfirm.js" type="text/javascript" charset="utf-8"></script>
    <style>
        .squ-line {
            border: 1px solid #ddd;
            border-radius: 4px;
            display: inline-block;
            /*background-color: rgb(209,169,118);*/
            background-color: rgb(209, 169, 90);
        }

        .diamond {
            background-image: url("./static/plugins/images/diamond.png");
        }

        .jin {
            background-image: url("./static/plugins/images/jin.png");
        }

        .mu {
            background-image: url("./static/plugins/images/mu.png");
        }

        .shui {
            background-image: url("./static/plugins/images/shui.png");
        }

        .huo {
            background-image: url("./static/plugins/images/huo.png");
        }

        .tu {
            background-image: url("./static/plugins/images/tu.png");
        }

        .shuai {
            background-image: url("./static/plugins/images/shuai.png");
        }

        .jin0 {
            background-image: url("./static/plugins/images/jin0.png");
        }

        .mu0 {
            background-image: url("./static/plugins/images/mu0.png");
        }

        .shui0 {
            background-image: url("./static/plugins/images/shui0.png");
        }

        .huo0 {
            background-image: url("./static/plugins/images/huo0.png");
        }

        .tu0 {
            background-image: url("./static/plugins/images/tu0.png");
        }

        .shuai0 {
            background-image: url("./static/plugins/images/shuai0.png");
        }

        .add-border {
            border-top: 2px solid #000;
            border-bottom: 2px solid #000;
            border-left: 2px solid #000;
            border-right: 2px solid #000;
        }

        .squ-line, .jin, .jin0, .mu, .mu0, .shui, .shui0, .huo, .huo0, .tu, .tu0, .shuai, .shuai0 {
            width: 60px;
            height: 60px;
        }

        .jin, .jin0, .mu, .mu0, .shui, .shui0, .huo, .huo0, .tu, .tu0, .shuai, .shuai0, .diamond {
            background-size: 60px;
        }

        .back {
            margin: 0px;
            text-align: center;
            background: url(./static/plugins/images/bgpic2.jpg) no-repeat;
            /*background-attachment: fixed;*/
            background-size: cover;
            width: 100%;
            height: 100%;
        }

        .remind-mes {
            text-align: center;
            display: block;
            margin: 0 auto;
        }
        .remind-div{
            padding: 10px 0px;
        }
    </style>
</head>
<body class="back">
<div class="remind-div">
    <p id="remindMes" class="btn-medium cancel remind-mes">等待开始</p>
</div>
<div id="chessBoard">
    <div class="row-line">
        <span id="0_6" class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="-1_5" class="squ-line"></span>
        <span id="0_5" class="squ-line"></span>
        <span id="1_5" class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="-2_4" class="squ-line"></span>
        <span id="-1_4" class="squ-line"></span>
        <span id="0_4" class="squ-line"></span>
        <span id="1_4" class="squ-line"></span>
        <span id="2_4" class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="-3_3" class="squ-line"></span>
        <span id="-2_3" class="squ-line"></span>
        <span id="-1_3" class="squ-line"></span>
        <span id="0_3" class="squ-line"></span>
        <span id="1_3" class="squ-line"></span>
        <span id="2_3" class="squ-line"></span>
        <span id="3_3" class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="-4_2" class="squ-line"></span>
        <span id="-3_2" class="squ-line"></span>
        <span id="-2_2" class="squ-line"></span>
        <span id="-1_2" class="squ-line"></span>
        <span id="0_2" class="squ-line"></span>
        <span id="1_2" class="squ-line"></span>
        <span id="2_2" class="squ-line"></span>
        <span id="3_2" class="squ-line"></span>
        <span id="4_2" class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="-5_1" class="squ-line"></span>
        <span id="-4_1" class="squ-line"></span>
        <span id="-3_1" class="squ-line"></span>
        <span id="-2_1" class="squ-line"></span>
        <span id="-1_1" class="squ-line"></span>
        <span id="0_1" class="squ-line"></span>
        <span id="1_1" class="squ-line"></span>
        <span id="2_1" class="squ-line"></span>
        <span id="3_1" class="squ-line"></span>
        <span id="4_1" class="squ-line"></span>
        <span id="5_1" class="squ-line"></span>
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
        <span id="0_-2" class="squ-line"></span>
        <span id="1_-2" class="squ-line"></span>
        <span id="2_-2" class="squ-line"></span>
        <span id="3_-2" class="squ-line"></span>
        <span id="4_-2" class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="-3_-3" class="squ-line"></span>
        <span id="-2_-3" class="squ-line"></span>
        <span id="-1_-3" class="squ-line"></span>
        <span id="0_-3" class="squ-line"></span>
        <span id="1_-3" class="squ-line"></span>
        <span id="2_-3" class="squ-line"></span>
        <span id="3_-3" class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="-2_-4" class="squ-line"></span>
        <span id="-1_-4" class="squ-line"></span>
        <span id="0_-4" class="squ-line"></span>
        <span id="1_-4" class="squ-line"></span>
        <span id="2_-4" class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="-1_-5" class="squ-line"></span>
        <span id="0_-5" class="squ-line"></span>
        <span id="1_-5" class="squ-line"></span>
    </div>
    <div class="row-line">
        <span id="0_-6" class="squ-line"></span>
    </div>
</div>
<%--<input type="button" id="chessMeStop" class="walk" value="走" disabled="disabled"
       onclick="chessMeStop()"/>
<input type="button" id="chessIsSkill" class="skill" value="技能" disabled="disabled"
       onclick="chessReleaseSkill()"/>
<input type="button" id="chessReset" class="btn btn-small submit reset" value="重走" onclick="chessReset()"/>
<input type="button" id="chessRegret" class="btn btn-small submit regret" value="悔棋" onclick="chessRegret()"/>
<input type="button" id="chessPeace" class="btn btn-small submit peace" value="求和" onclick="chessPeace()"/>
<input type="button" id="chessFail" class="btn btn-small submit fail" value="认输" onclick="chessFail()"/>--%>
<%--<div class="container">
    <div class="row">
        <span id="chessMeStop" class="btn btn-small submit walk" disabled="true" onclick="chessMeStop()">走</span>
        <span id="chessIsSkill" class="btn btn-small submit skill" disabled="true"
              onclick="chessReleaseSkill()">技能</span>
    </div>
    <div class="row">
        <span id="chessReset" class="btn btn-small submit reset" disabled="true" onclick="chessReset()">重走</span>
        <span id="chessRegret" class="btn btn-small submit regret" onclick="chessRegret()">悔棋</span>
    </div>
    <div class="row">
        <span id="chessPeace" class="btn btn-small submit peace" onclick="chessPeace()">求和</span>
        <span id="chessFail" class="btn btn-small submit fail" onclick="chessFail()">认输</span>
    </div>
</div>--%>
<div class="container">
    <div class="row">
        <input type="button" id="chessMeStop" class="btn btn-small submit " value="走" disabled="disabled"
               onclick="chessMeStop()"/>
        <input type="button" id="chessIsSkill" class="btn btn-small submit " value="技能" disabled="disabled"
               onclick="chessReleaseSkill()"/>
    </div>
    <div class="row">
        <input type="button" id="chessReset" class="btn btn-small submit " value="重走" onclick="chessReset()"/>
        <input type="button" id="chessRegret" class="btn btn-small submit " value="悔棋" onclick="chessRegret()"/>
    </div>
    <div class="row">
        <input type="button" id="chessPeace" class="btn btn-small submit " value="求和" onclick="chessPeace()"/>
        <input type="button" id="chessFail" class="btn btn-small submit " value="认输" onclick="chessFail()"/>
    </div>
    <div class="row">
        <input type="button" id="chessBackToRoom" class="btn btn-small submit" value="退出" onclick="chessBackToRoom()"/>
        <input type="button" id="chessWatchRules" class="btn btn-small submit" value="查看规则"
               onclick="chessWatchRules()"/>
    </div>
</div>

<div style="text-align:center;clear:both">
</div>
<div class="radmenu"><a href="#" id="red_mu" class="show" style="color:red">束缚:未释放</a>
    <ul>
        <li><a href="#" id="red_huo" style="color:red">燃烧:未释放</a></li>
        <li><a href="#" id="red_tu" style="color:red">传送:未释放</a></li>
        <li><a href="#"id="black_mu" >束缚:未释放</a></li>
        <li><a href="#"id="black_huo" >燃烧:未释放</a></li>
        <li><a href="#"id="black_tu" >传送:未释放</a></li>
    </ul>
</div>
<script src="./static/plugins/js/circleIndex.js"></script>
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
        websocket = new WebSocket("ws://localhost:8080/websocket?roomName=" + roomName + "&color=" + myColor);
        //初始化我放位置
        init();
    }
    else {
        chessAlertError('当前浏览器 Not support websocket');
    }

    //接收到消息的回调方法
    websocket.onmessage = function (event) {
        var message = eval('(' + event.data + ')');
        console.log(message);
        //开始游戏
        if (message.type === 0) {
            chessIsBegin = 1;
            //初始化对方棋子
            initOtherChess();
            chessRemindMes("开始游戏");
        }
        //收到对方走步
        if (message.type === 1) {
            //翻转棋盘
            message = chessTurn(message);
            //保存message
            chessAcceptMessage = message;
            //对方没放技能
            if (message.isSkill == 0) {
                chessTraceNoSkill(message);
            } else {
                chessTraceSkill(message);
            }
            //更新步数
            myStep = message.step;
            chessRemindMes("我方回合");
        }
        //收到对方胜利
        if (message.type === 2) {
            chessAlertEndMessage("对方获胜");
            return;
        }
        //收到对方认输
        if (message.type === 3) {
            chessAlertEndMessage("对方认输");
            return;
        }
        //收到对方请求悔棋
        if (message.type === 4) {
            chessAlertRegret();
            return;
        }
        //收到对方同意悔棋
        if (message.type === 5) {
            chessAlertMessage("对方同意悔棋");
            //对方同意悔棋我方操作
            chessAcceptAgreeRegret();
            return;
        }
        //收到对方拒绝悔棋
        if (message.type === 6) {
            chessAlertMessage("对方拒绝悔棋");
            return;
        }
    };

    //点击格子时触发
    $('.squ-line').click(function (e) {
        console.log(e);
        if (chessIsBegin === 0) {
            chessAlertError("没有对手加入房间");
            return;
        }
        if (myStep % 2 !== 1) {
            chessAlertError("未到我方走");
            return;
        }
        //获取点击点id,class
        var id = e.target.id;
        var classList = e.target.classList;
        //判断点击处是否有棋子,返回对应class
        var firstClass = chessJudgePoint(classList);
        //根据id获取坐标值
        var point = chessGetPosition(id);
        //判断是否第一次有效点击
        //第一存点为空
        if (chessIsFirst()) {
            //有棋子
            if (firstClass) {
                //点击点是我方棋子
                if (chessJudgeMyChess(firstClass)) {
                    //点击点已被束缚
                    if (point[0] == chessShuFuPoint.x && point[1] == chessShuFuPoint.y) {
                        chessAlertError("此子已被对方束缚");
                        return;
                    }
                } else {
                    return;
                }
            } else {
                return;
            }
            //第一个有效点击点放入第一存点
            chessPutFirstPoint(point, firstClass);
            //加入第一点击点样式
            chessAddCssForFirst(point[0], point[1]);
            //技能是否亮起
            chessIsSkill();
            //重走亮起
            chessResetLight();
            return;
        } else {
            //释放技能
            if (isSkill === 1) {
                //填充释放技能后的棋子位置
                chessPutSkillPoint(point, classList);
            } else {
                //切换第一个操作点
                if (chessFirstTrackX.length === 1) {
                    //有棋子
                    if (firstClass) {
                        //点击点是我方棋子
                        if (chessJudgeMyChess(firstClass)) {
                            //点击点已被束缚
                            if (point[0] == chessShuFuPoint.x && point[1] == chessShuFuPoint.y) {
                                chessAlertError("此子已被对方束缚");
                                return;
                            }
                            //取消上个点击点样式
                            chessRemoveCssForFirst(firstPoint.x, firstPoint.y);
                            //更新第一点
                            chessPutFirstPoint(point, firstClass);
                            //加入点击样式
                            chessAddCssForFirst(point[0], point[1]);
                            //技能是否亮起
                            chessIsSkill();
                            return;
                        }
                    }
                }
                //判断可不可以走这里
                chessCanMove(point, false)
            }
        }
    });

    //连接发生错误的回调方法
    websocket.onerror = function () {
        chessAlertError("WebSocket连接发生错误");
    };

    //连接成功建立的回调方法
    websocket.onopen = function () {
        setMessageInnerHTML("WebSocket连接成功");
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

    //初始我方位置
    function init() {
        if (myColor == 0) {
            $("#0_0").addClass("diamond");
            $("#0_-1").addClass("jin0");
            $("#0_-2").addClass("mu0");
            $("#0_-3").addClass("shui0");
            $("#0_-4").addClass("huo0");
            $("#0_-5").addClass("tu0");
            $("#0_-6").addClass("shuai0");
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
    function initOtherChess() {
        if (myColor == 1) {
            $("#0_1").addClass("jin0");
            $("#0_2").addClass("mu0");
            $("#0_3").addClass("shui0");
            $("#0_4").addClass("huo0");
            $("#0_5").addClass("tu0");
            $("#0_6").addClass("shuai0");
        } else {
            $("#0_1").addClass("jin");
            $("#0_2").addClass("mu");
            $("#0_3").addClass("shui");
            $("#0_4").addClass("huo");
            $("#0_5").addClass("tu");
            $("#0_6").addClass("shuai");
        }
    }
</script>
</html>