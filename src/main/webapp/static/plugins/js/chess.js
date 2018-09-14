var chessMyRoom;
var myStep = 0;
var myColor = 1;
var INIT_VALUE = 99;
var firstPoint={
    x: INIT_VALUE,
    y: INIT_VALUE
};
//第一点样式
var chessFirstClass;
//第一个棋子操作X,Y轴轨迹,用于发送给对方
var chessFirstTrackX = new Array();
var chessFirstTrackY = new Array();
//第二个棋子操作X,Y轴轨迹,用于发送给对方
var chessSecondTrackX = new Array();
var chessSecondTrackY = new Array();
//第二个点
var chessSecondPoint = {
    x: INIT_VALUE,
    y: INIT_VALUE
};
var chessSecondClass;
//是否释放技能
var isSkill = 0;
var skillj = 0;
var skillm = 0;
var skills = 0;
var skillh = 0;
var skillt = 0;

//根据id获取坐标值
function chessGetPosition(id) {
    var point = id.split("_");
    return point;
}

//第一存点是否为空
function chessIsFirst() {
    if (firstPoint.x === INIT_VALUE && firstPoint.y === INIT_VALUE) {
        return true;
    } else {
        return false;
    }
}

function chessPutFirstPoint(point) {
    firstPoint.x = point[0];
    firstPoint.y = point[1];
    chessFirstTrackX[0] = point[0];
    chessFirstTrackY[0] = point[1];
}

function chessPutSecondPoint(point) {
    chessSecondPoint.x = point[0];
    chessSecondPoint.y = point[1];
    chessSecondTrackX[0] = point[0];
    chessSecondTrackY[0] = point[1];
}

//判断是否可以走这里
function chessCanMove(point, chessClass, isSkill) {
    if (chessClass === chessFirstClass) {
        //没放技能
        if (!isSkill) {
            //落点是否有我方棋子

            //可以走
            if(chessNoSkillCanMove(point)){
                //保存第二点
                chessPutSecondPoint(point);
                //发送信息
            }
        }
    }
}
//判断没放技能时下一步是否可以走这里
function chessNoSkillCanMove(point) {
    var xMove = Math.abs(parseInt(point[0]) - parseInt(firstPoint.x));
    var yMove = Math.abs(parseInt(point[1]) - parseInt(firstPoint.y) );
    if(xMove <= 1 && yMove <= 1 && xMove != yMove){
        return true;
    }
    return false;
}
//清空第一个点击保存点
function chessClearFirstPoint() {
    firstPoint.x = INIT_VALUE;
    firstPoint.y = INIT_VALUE;
}
//清空第二个点击保存点
function chessClearSecondPoint() {
    chessSecondPoint.x = INIT_VALUE;
    chessSecondPoint.y = INIT_VALUE;
}
//判断点击点对应棋子
function chessJudgePoint(classList) {
    var cl='';
    for(var i = 0; i < classList.length; i++){
        if (chessJudgeRed(classList[i]) || chessJudgeBlack(classList[i])) {
            cl=classList[i];
            break;
        }
    }
    return cl;
}

//判断点击是否是我方棋子
function chessJudgeMyChess(cl) {
    alert(cl);
    if (cl == "jin" || cl === "mu" || cl === "shui" || cl === "huo" || cl === "tu" || cl === "shuai") {
        if (myColor == 1){
            return true;
        }
    } else {
        if (cl === "jin0" || cl === "mu0" || cl === "shui0" || cl === "huo0" || cl === "tu0" || cl === "shuai0") {
            if (myColor == 0){
                return true;
            }
        }
    }
}

//计算是否在束缚范围内
function chessCanShuFu(point) {
    var xMove = Math.abs(parseInt(point[0]) - parseInt(firstPoint.x));
    var yMove = Math.abs(parseInt(point[1]) - parseInt(firstPoint.y) );
    if(xMove <= 1 && yMove <= 1){
        return true;
    }
    return false;
}
//是否亮起释放技能,点我方棋子时控制按钮是否亮起
function chessIsSkill(){

}
//技能释放按钮亮起
function chessSkillLight() {

}
//技能释放按钮变暗
function chessSkillDark() {

}
//判断是否是红方
function chessJudgeRed(cl) {
    if (cl === "jin" || cl === "mu" || cl === "shui" || cl === "huo" || cl === "tu" || cl === "shuai") {
        return true;
    }
    return false;
}

//判断是否是黑方
function chessJudgeBlack(cl) {
    if (cl === "jin0" || cl === "mu0" || cl === "shui0" || cl === "huo0" || cl === "tu0" || cl === "shuai0") {
        return true;
    }
    return false;
}

//填充释放技能后的棋子位置
function chessPutSkillPoint(point, classList) {
    //点击处是否为空
    cl = chessJudgePoint(classList);
    if (!cl) {
        return;
    } else {
        //木技能
        if (chessFirstClass === "mu" || chessFirstClass === "mu0") {
            //判断第二个点击点class是否为我方棋子
            if (chessJudgeMyChess(cl)) {
                return;
            }
            //判断点击点class是否为老将
            if (chessJudgeIsBoss(cl)) {
                return;
            }
            //计算是否在束缚范围内
            if (chessCanShuFu(point)) {
                //保存第二点
                chessPutSecondPoint(point);
            } else {
                return;
            }
        }
        //组装消息
        var message = '{step:"' + myStep + '",isSkill:"' + isSkill + '",chessRoom:"' + chessMyRoom + '",color:"' + myColor + '",chessFirstPoint:{x:"'+firstPoint.x+  '",y:"'+firstPoint.y+'"},chessFirstClass:"' + chessFirstClass + '",chessSecondPoint:{x:"'+chessSecondPoint.x+  '",y:"'+chessSecondPoint.y+'"},chessFirstTrackX:"' + chessFirstTrackX + '",chessFirstTrackY:"' + chessFirstTrackY + '",chessSecondTrackX:"' + chessSecondTrackX + '",chessSecondTrackY:"' + chessSecondTrackY + '",chessSecondClass:"' + chessSecondClass + '"}';
        send(message);
    }
}

//是否为老将
function chessJudgeIsBoss(cl) {
    if (cl === "shuai" || cl === "shuai0") {
        return true;
    }
    return false;
}

//点击查看是否可以完成,完成就发送信息
function chessMeStop(){
    //判断目标位置坐标（x,y）是否为（0,0），若为(0,0)且所选棋子不为'帅'，则需重选目标位置
    if (chessSecondPoint.x==INIT_VALUE && chessSecondPoint.y==INIT_VALUE){
        alert("请选择目标位置");
    }else {
        //把棋子class添加到第二步位置,删除第一步位置
        var firstPointId = firstPoint.x + "_" + firstPoint.y;
        var secondPointId = chessSecondPoint.x + "_" + chessSecondPoint.y;
        $("#" + firstPointId).removeClass(chessFirstClass);
        $("#" + secondPointId).addClass(chessFirstClass);
        //初始化第一个有效点
        chessClearFirstPoint();
        //初始化第二个有效点
        chessClearSecondPoint();
        //组装消息
        var message = '{step:"0",isSkill:"0",chessRoom:"1",color:"1",chessFirstPoint:{x:0,y:-1},chessFirstClass:"jin",chessSecondPoint:{x:0,y:0},chessFirstTrackX:["' + chessFirstTrackX + '"],chessFirstTrackY:["' + chessFirstTrackX + '"],chessSecondTrackX:["' + chessFirstTrackX + '"],chessSecondTrackY:["' + chessFirstTrackX + '"],chessSecondClass:"' + chessSecondClass + '"}';
        //发送信息
        send(message);
    }

}
