package com.chess.cn;

public class RoomDTO {

    private String name;

    private String firstPlayer;

    private String secondPlayer;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstPlayer() {
        return firstPlayer;
    }

    public void setFirstPlayer(String firstPlayer) {
        this.firstPlayer = firstPlayer;
    }

    public String getSecondPlayer() {
        return secondPlayer;
    }

    public void setSecondPlayer(String secondPlayer) {
        this.secondPlayer = secondPlayer;
    }

    public static void main(String[] args) {
        RoomDTO roomDTO = new RoomDTO();
        roomDTO.setName("");
    }
}
