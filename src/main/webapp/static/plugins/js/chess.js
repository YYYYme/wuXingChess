var myStep = 0;
var myColor = 0;
var firstPoint={
    x: 0,
    y: 0
};
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

    //是否是第一个点
    function chessIsFirst(point) {
        if(firstPoint.x==0 && firstPoint.y==0){
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

    }
