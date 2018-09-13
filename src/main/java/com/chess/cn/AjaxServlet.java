package com.chess.cn;


import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/AjaxServlet")
public class AjaxServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("doPost--------");    //打印请求类型
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        
        String roomName=request.getParameter("roomName");
        System.out.println("roomName------"+roomName);    //打印获取的参数
        /*if(email.equals("Higgin@qq.com")){            //模拟查询数据库判断
            response.getWriter().print("true");    //将结果返回到前端页面
        }else{
            response.getWriter().print("false");  //将结果返回到前端页面
        }*/
        //判断房间是否满员
        for (RoomDTO roomDTO : WebSocket.getRoomList()){
            if (roomDTO.getName().equals(roomName)){
                if (null != roomDTO.getFirstPlayer() || !"".equals(roomDTO.getFirstPlayer())){
                    roomDTO.setFirstPlayer("1");
                    response.getWriter().print("1");
                } else if (null != roomDTO.getSecondPlayer() || !"".equals(roomDTO.getSecondPlayer())) {
                    roomDTO.setSecondPlayer("0");
                    response.getWriter().print("0");
                } else {
                    response.getWriter().print("-1");
                }
            }
        }
    }
    public AjaxServlet() {
        super();
    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("doGet---------");
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        

    }
}