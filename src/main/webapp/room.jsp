<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.chess.cn.WebSocket" %>
<%@ page import="com.chess.cn.dto.RoomDTO" %>
<%
    request.setAttribute("roomList", WebSocket.getRoomList());

%>
<!DOCTYPE html>
<html>
<head>
    <title>房间界面</title>
    <script type="text/javascript" src="./static/plugins/js/jquery-3.2.1.min.js"></script>
    <link rel="stylesheet" href="./static/plugins/css/buttonStyle.css" media="screen" type="text/css"/>
    <style>
        .back {
            width:100%;
            height:100%;
            margin: 0px;
            text-align: center;
            background: url(./static/plugins/images/bgpic2.jpg) no-repeat;
            background-size: 100% 100%;
            background-attachment: fixed;
        }

        .room{
            margin:auto;
            position: absolute;
            width: 50%;
            height: 30%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
    </style>
</head>
<body class="back">
<div class="room">
    <% for (RoomDTO roomDTO : WebSocket.getRoomList()) {%>
        <%--<input type="button" class="btn btn-room info pos" onclick="joinRoom(<%= roomDTO.getName()%>)"
               value="加入房间<%= roomDTO.getName()%>"/>--%>
        <span class="btn btn-room cancel" onclick="joinRoom(<%= roomDTO.getName()%>)">加入房间<%= roomDTO.getName()%></span>
    <%}%>
</div>
</body>

<script type="text/javascript">
    console.log("1");

    //加入房间
    function joinRoom(roomName) {
        //判断房间是否满员
        var desc = judgeRoomFull(roomName);
        console.log("desc:" + desc);
        //1:第一个 0:第二个  -1:满员
        if (desc === -1) {
            alert("房间已满员");
            return;
        }
        //未满员
        //跳转页面,将颜色和步骤传入跳转页面,第一个为红方,第二个黑方
        window.self.location = "index.jsp?desc=" + desc + "&roomName=" + roomName;
        //location.href = "index.jsp?desc="+desc;
    }

    function judgeRoomFull(roomName) {
        var result;
        $.ajax({
            url: "/servlet/AjaxServlet",//要请求的服务器url
            //这是一个对象，表示请求的参数，两个参数：method=ajax&val=xxx，服务器可以通过request.getParameter()来获取
            //data:{method:"ajaxTest",val:value},
            data: {roomName: roomName},  //这里的email对应表单中的name="email"，也是发送url中的email=value(GET方式)
            async: false,   //是否为异步请求
            cache: false,  //是否缓存结果
            type: "POST", //请求方式为POST
            dataType: "json",   //服务器返回的数据是什么类型
            success: function (data) {  //这个方法会在服务器执行成功是被调用 ，参数result就是服务器返回的值(现在是json类型)
                result = data;
            }
        });
        return result;
    }
</script>
</html>