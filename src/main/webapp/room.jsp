<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.chess.cn.WebSocket" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>房间界面</title>
    <script type="text/javascript" src="./static/plugins/js/jquery-3.2.1.min.js"></script>
    <style>

    </style>
</head>
<body>
<div>

    <c:forEach items="${WebSocket.getRoomList()}" var="rm">
        <div>
            <input type="button" onclick="joinRoom(${rm.getName})" value="加入房间">
        </div>
    </c:forEach>
</div>
</body>

<script type="text/javascript">
    var roomList = <%WebSocket.getRoomList();%>;
    console.log(roomList);

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