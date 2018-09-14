package com.chess.cn.dto;

import java.util.List;

/**
 * 消息类
 */
public class ChessMessageDTO {
    private String step;
    private String isSkill;
    private String chessRoom;
    private String color;
    private ChessPointDTO chessFirstPoint;
    private String chessFirstClass;
    private List<String> chessFirstTrackX;
    private List<String> chessFirstTrackY;
    private ChessPointDTO chessSecondPoint;
    private String chessSecondClass;
    private List<String> chessSecondTrackX;
    private List<String> chessSecondTrackY;
    /**
     * 传输类型
     * 0:开始游戏
     */
    private Integer type;

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getStep() {
        return step;
    }

    public void setStep(String step) {
        this.step = step;
    }

    public String getIsSkill() {
        return isSkill;
    }

    public void setIsSkill(String isSkill) {
        this.isSkill = isSkill;
    }

    public String getChessRoom() {
        return chessRoom;
    }

    public void setChessRoom(String chessRoom) {
        this.chessRoom = chessRoom;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getChessFirstClass() {
        return chessFirstClass;
    }

    public void setChessFirstClass(String chessFirstClass) {
        this.chessFirstClass = chessFirstClass;
    }

    public ChessPointDTO getChessFirstPoint() {
        return chessFirstPoint;
    }

    public void setChessFirstPoint(ChessPointDTO chessFirstPoint) {
        this.chessFirstPoint = chessFirstPoint;
    }

    public ChessPointDTO getChessSecondPoint() {
        return chessSecondPoint;
    }

    public void setChessSecondPoint(ChessPointDTO chessSecondPoint) {
        this.chessSecondPoint = chessSecondPoint;
    }

    public String getChessSecondClass() {
        return chessSecondClass;
    }

    public void setChessSecondClass(String chessSecondClass) {
        this.chessSecondClass = chessSecondClass;
    }

    public List<String> getChessFirstTrackX() {
        return chessFirstTrackX;
    }

    public void setChessFirstTrackX(List<String> chessFirstTrackX) {
        this.chessFirstTrackX = chessFirstTrackX;
    }

    public List<String> getChessFirstTrackY() {
        return chessFirstTrackY;
    }

    public void setChessFirstTrackY(List<String> chessFirstTrackY) {
        this.chessFirstTrackY = chessFirstTrackY;
    }

    public List<String> getChessSecondTrackX() {
        return chessSecondTrackX;
    }

    public void setChessSecondTrackX(List<String> chessSecondTrackX) {
        this.chessSecondTrackX = chessSecondTrackX;
    }

    public List<String> getChessSecondTrackY() {
        return chessSecondTrackY;
    }

    public void setChessSecondTrackY(List<String> chessSecondTrackY) {
        this.chessSecondTrackY = chessSecondTrackY;
    }
}
