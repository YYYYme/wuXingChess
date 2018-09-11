<%@ page language="java" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>房间界面</title>
    <script type="text/javascript" src="./static/plugins/js/jquery-3.2.1.min.js"></script>
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
    <div>
        <input type="button" onclick="joinRoom()" value="加入房间">
    </div>
</body>

<script type="text/javascript">
    function joinRoom() {
        //判断房间是否满员

        //未满员
        var websocket = null;
        //判断当前浏览器是否支持WebSocket
        if ('WebSocket' in window) {
            websocket = new WebSocket("ws://localhost:8080/websocket");
        } else {
            alert('当前浏览器 Not support websocket')
        }
        //roomList放入值,获得进入房间名次,获得颜色,第一个为红方,第二个黑方

        //跳转页面,将颜色和步骤传入跳转页面

    }

</script>
</html>