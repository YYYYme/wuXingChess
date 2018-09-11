var myStep = 0;
var myColor = 0;
var firstPoint={
    x: 0,
    y: 0
};
//第一点
var chessFirstClass;
//是否释放技能
var isSkill = 0;
var skillj;
var skillm;
var skills;
var skillh;
var skillt;

//根据id获取坐标值
function chessGetPosition(id){
    var point = id.split("_");
    return point;
}

//第一存点是否为空
function chessIsFirst() {
    if(firstPoint.x===0 && firstPoint.y===0){
        return true;
    } else {
        return false;
    }
}

function chessPutFirstPoint(point) {
    firstPoint.x = point[0];
    firstPoint.y = point[1];
    console.log(firstPoint);
}
//判断是否可以走这里
function chessCanMove(point, chessClass, isSkill) {
     if (chessClass == "jin"){
         //没放技能
         if (!isSkill){
             //落点是否有我方棋子

             //可以走
             if(chessNoSkillCanMove(point)){
                 //把棋子class添加到第二步位置,删除第一步位置
                 var firstPointId = firstPoint.x + "_" + firstPoint.y;
                 var secondPointId = point[0] + "_" + point[1];
                 $("#" + firstPointId).removeClass(chessClass);
                 $("#" + secondPointId).addClass(chessClass);
                 //初始化第一个有效点
                 chessClearFirstPoint();
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
    firstPoint.x = 0;
    firstPoint.y = 0;
}
//判断点击点对应棋子
function chessJudgePoint(classList) {
    for(var i = 0; i < classList.size; i++){
        var cl = classList[i];
        if (chessJudgeRed(cl) || chessJudgeBlack(cl)) {
            return cl;
        }
    }
}
//判断是否是红方
function chessJudgeRed(cl) {
    if (cl === "jin" || cl === "mu" || cl === "shui" || cl === "huo" || cl === "tu") {
        return true;
    }
    return false;
}
//判断是否是黑方
function chessJudgeBlack(cl) {
    if (cl === "jin0" || cl === "mu0" || cl === "shui0" || cl === "huo0" || cl === "tu0") {
        return true;
    }
    return false;
}
//判断点击是否是我方棋子
function chessJudgeMyChess(cl) {
    if (cl === "jin" || cl === "mu" || cl === "shui" || cl === "huo" || cl === "tu") {
        if (myColor === 1){
            return true;
        }
    } else {
        if (cl === "jin0" || cl === "mu0" || cl === "shui0" || cl === "huo0" || cl === "tu0") {
            if (myColor === 0){
                return true;
            }
        }
    }
}
//填充释放技能后的棋子位置
function chessPutSkillPoint(point, classList){
    //点击处是否为空
    cl = chessJudgePoint(classList);
    if(!cl){
        return;
    } else {
        //木技能
        if(chessFirstClass === "mu" || chessFirstClass === "mu0"){
            //判断第二个点击点是否为我方棋子
            if(chessJudgeMyChess(cl)){
                return;
            } else {
                //计算是否在舒服范围内

            }
        }
    }
}
//是否释放技能
function chessIsSkill(){

}
