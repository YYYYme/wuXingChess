package com.chess.cn.dto;

import java.util.List;

/**
 * 消息类
 */
public class ChessMessageDTO {
    private Integer step;
    private String isSkill;
    private String chessRoom;
    private String color;
    private ChessPointDTO chessFirstPoint;
    private String chessFirstClass;
    private List<Integer> chessFirstTrackX;
    private List<Integer> chessFirstTrackY;
    private ChessPointDTO chessSecondPoint;
    private String chessSecondClass;
    private List<Integer> chessSecondTrackX;
    private List<Integer> chessSecondTrackY;
    /**
     * 束缚点
     */
    private ChessPointDTO chessShuFuPoint;

    /**
     * 传输类型
     * 0:开始游戏
     */
    private Integer type;

    public ChessPointDTO getChessShuFuPoint() {
        return chessShuFuPoint;
    }

    public void setChessShuFuPoint(ChessPointDTO chessShuFuPoint) {
        this.chessShuFuPoint = chessShuFuPoint;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getStep() {
        return step;
    }

    public void setStep(Integer step) {
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

    public List<Integer> getChessFirstTrackX() {
        return chessFirstTrackX;
    }

    public void setChessFirstTrackX(List<Integer> chessFirstTrackX) {
        this.chessFirstTrackX = chessFirstTrackX;
    }

    public List<Integer> getChessFirstTrackY() {
        return chessFirstTrackY;
    }

    public void setChessFirstTrackY(List<Integer> chessFirstTrackY) {
        this.chessFirstTrackY = chessFirstTrackY;
    }

    public List<Integer> getChessSecondTrackX() {
        return chessSecondTrackX;
    }

    public void setChessSecondTrackX(List<Integer> chessSecondTrackX) {
        this.chessSecondTrackX = chessSecondTrackX;
    }

    public List<Integer> getChessSecondTrackY() {
        return chessSecondTrackY;
    }

    public void setChessSecondTrackY(List<Integer> chessSecondTrackY) {
        this.chessSecondTrackY = chessSecondTrackY;
    }
}
