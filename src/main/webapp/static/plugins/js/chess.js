//房间名称
var chessMyRoom;
//是否开始游戏,0:未开始 1:开始
var chessIsBegin = 0;
var myStep = 0;
var myColor = 1;
var INIT_VALUE = 99;
var firstPoint = {
    x: INIT_VALUE,
    y: INIT_VALUE
};
//束缚点
var chessShuFuPoint = {
    x: INIT_VALUE,
    y: INIT_VALUE
};
//1:获胜
var chessIsWin = 0;
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
var chessSkillj = 0;
var chessSkillm = 0;
var chessSkills = 0;
var chessSkillh = 0;
var chessSkillt = 0;
//对方技能释放状态
var chessOperateSkillm = 0;
//水吃掉的棋子数量(两步只能吃一个)
var chessWalterEat = 0;

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

function chessPutFirstPoint(point, firstClass) {
    firstPoint.x = point[0];
    firstPoint.y = point[1];
    chessFirstTrackX[0] = point[0];
    chessFirstTrackY[0] = point[1];
    //class
    chessFirstClass = firstClass;
}

function chessPutSecondPoint(point, secondClass) {
    chessSecondPoint.x = point[0];
    chessSecondPoint.y = point[1];
    chessSecondTrackX[0] = point[0];
    chessSecondTrackY[0] = point[1];
    //class
    chessSecondClass = secondClass;
}

//判断是否可以走这里
function chessCanMove(point, isSkill) {
    //落点是否有对方棋子
    var pointIsOther = false;
    //没放技能
    if (!isSkill) {
        //落点是否有我方棋子
        //根据落点id,获取落点class
        var pointClass = chessJudgePointById(point[0] + "_" + point[1]);
        //落点有棋子
        if (pointClass) {
            //棋子是我方
            if (chessJudgeMyChess(pointClass)) {
                alert("此处有我方棋子");
                return;
            }
            pointIsOther = true;
        }
        //可以走
        if (chessNoSkillCanMove(point, pointIsOther)) {
            //木释放技能后走动时清空束缚点
            if (chessFirstClass === "mu" || chessFirstClass === "mu0") {
                if (chessSkillm === 1) {
                    chessClearShuFuPoint();
                }
            }
            //水只能走两步
            if (chessFirstClass === "shui" || chessFirstClass === "shui0") {
                if (pointIsOther && chessWalterEat === 1) {
                    alert('水只能吃一个棋子');
                    return;
                }
                if (chessSkills === 2) {
                    alert('水只能走两步');
                    return;
                }
            }
            //保存后续点轨迹
            chessPutFirstTracePoint(point);
            //移动棋子
            chessMoveFirst();
            //木并且已释放技能时,束缚点初始化
            if (chessFirstClass === "mu" || chessFirstClass === "mu0") {
                chessClearShuFuPoint();
            }
            //水棋子步数加一
            if (chessFirstClass === "shui" || chessFirstClass === "shui0") {
                chessSkills += 1;
                //水棋子吃数加一
                if (pointIsOther) {
                    chessWalterEat++;
                }
            }
            //判断是否增加步数,true:增加 false:减少,保证发送时为偶数,message里会+1变奇数
            if (chessIsAddStep(pointIsOther)) {
                myStep += 1;
            }
            //走按钮变亮
            chessWalkLight();
        }
    }
}

//判断是否增加步数
function chessIsAddStep(pointIsOther) {
    //落点没对方棋子时,金不可以继续走
    if (pointIsOther) {
        //金,上下左右有对方棋子时不增加
        if (chessFirstClass === "jin" || chessFirstClass === "jin0") {
            //获取落点id
            var id = chessFirstTrackX[chessFirstTrackX.length - 1] + "_" + chessFirstTrackY[chessFirstTrackY.length - 1];
            var idLeft = (parseInt(chessFirstTrackX[chessFirstTrackX.length - 1]) - 1) + "_" + chessFirstTrackY[chessFirstTrackY.length - 1]
                ,
                idRight = (parseInt(chessFirstTrackX[chessFirstTrackX.length - 1]) + 1) + "_" + chessFirstTrackY[chessFirstTrackY.length - 1]
                ,
                idTop = chessFirstTrackX[chessFirstTrackX.length - 1] + "_" + (parseInt(chessFirstTrackY[chessFirstTrackY.length - 1]) + 1)
                ,
                idBottom = chessFirstTrackX[chessFirstTrackX.length - 1] + "_" + (parseInt(chessFirstTrackY[chessFirstTrackY.length - 1]) - 1);
            //计算上下左右四个点放入数组
            var idList = [idLeft, idRight, idTop, idBottom];
            //循环数组获取是否id点有对方class
            for (var i = 0; i < idList.length; i++) {
                //判断id点是否有对方棋子
                //获得样式
                var cl = chessJudgePointById(idList[i]);
                if (cl) {
                    //有样式时判断是否是对方棋子
                    if (!chessJudgeMyChess()) {
                        return false;
                    }
                }
            }
        }
    }
    //水只能吃一个棋子
    if (chessFirstClass === "shui" || chessFirstClass === "shui0") {
        //走一步后我方可以继续走
        if (chessSkills == 1) {
            return false;
        }
    }
    return true;
}

//保存第一点轨迹
function chessPutFirstTracePoint(point) {
    chessFirstTrackX.push(point[0]);
    chessFirstTrackY.push(point[1]);
}

//保存第二点轨迹
function chessPutSecondTracePoint(point) {
    chessSecondTrackX.push(point[0]);
    chessSecondTrackY.push(point[1]);
}

//移动棋子
function chessMoveFirst() {
    //删除上一点class
    $("#" + chessFirstTrackX[chessFirstTrackX.length - 2] + "_" + chessFirstTrackY[chessFirstTrackX.length - 2]).removeClass(chessFirstClass);
    var finalId = chessFirstTrackX[chessFirstTrackX.length - 1] + "_" + chessFirstTrackY[chessFirstTrackX.length - 1];
    //清空点击样式
    chessRemoveCssForFirst(chessFirstTrackX[chessFirstTrackX.length - 2], chessFirstTrackY[chessFirstTrackX.length - 2]);
    //删除落子点对方class
    chessRemoveOtherClass(finalId);
    //棋子落点绘制
    $("#" + finalId).addClass(chessFirstClass);
    //落点加边框
    chessAddCssForFirst(chessFirstTrackX[chessFirstTrackX.length - 1], chessFirstTrackY[chessFirstTrackX.length - 1]);
}

//删除落子点对方class
function chessRemoveOtherClass(id) {
    var cl = chessJudgePointById(id);
    if (cl) {
        $("#" + id).removeClass(cl);
    }
}

//判断没放技能时下一步是否可以走这里,不考虑落点是否有我方棋子,pointIsOther:bool类型,true:是对方棋子
function chessNoSkillCanMove(point, pointIsOther) {
    //是否获胜
    if (chessWin(point)) {
        chessIsWin = 1;
        chessAssembleMessage();
        alert("你赢了");
        return;
    }
    //是否非帅走的中心
    if (chessJudgeIsInDiamond(point[0], point[1])) {
        alert("只有帅可以获取钻石");
        return;
    }
    //金后续连踩需要根据轨迹点判断
    if (chessFirstClass === "jin" || chessFirstClass === "jin0") {
        //第一次落子不需要判断是否是对方棋子
        if (chessFirstTrackX.length !== 1) {
            //有对方棋子
            if (pointIsOther) {
                //判断是否在攻击范围
                var xMoveJ = Math.abs(parseInt(chessFirstTrackX[chessFirstTrackX.length - 1]) - parseInt(point[0]));
                var yMoveJ = Math.abs(parseInt(chessFirstTrackY[chessFirstTrackY.length - 1]) - parseInt(point[1]));
                if (xMoveJ <= 1 && yMoveJ <= 1 && xMoveJ != yMoveJ) {
                    return true;
                } else {
                    alert("不在金攻击范围");
                    return;
                }
            } else {
                alert("金只能连续吃");
                return;
            }
        }
    }
    var xMove = Math.abs(parseInt(point[0]) - parseInt(chessFirstTrackX[chessFirstTrackX.length - 1]));
    var yMove = Math.abs(parseInt(point[1]) - parseInt(chessFirstTrackY[chessFirstTrackY.length - 1]));
    if (xMove <= 1 && yMove <= 1 && xMove != yMove) {
        return true;
    }
    return false;
}

//获胜
function chessWin(point) {
    if (point[0] == 0 && point[1] == 0 && (chessFirstClass === "shuai" || chessFirstClass === "shuai0")) {
        //保存轨迹
        chessPutFirstTracePoint(point);
        return true;
    }
    var cl = chessJudgePointById(point[0]+"_"+point[1]);
    if (cl === "shuai" || cl === "shuai0"){
        //保存轨迹
        chessPutFirstTracePoint(point);
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

//清空束缚点
function chessClearShuFuPoint() {
    chessShuFuPoint.x = INIT_VALUE;
    chessShuFuPoint.y = INIT_VALUE;
}

//判断点击点对应棋子样式
function chessJudgePoint(classList) {
    var cl = '';
    for (var i = 0; i < classList.length; i++) {
        if (chessJudgeRed(classList[i]) || chessJudgeBlack(classList[i])) {
            cl = classList[i];
            break;
        }
    }
    return cl;
}

//根据id获取棋子样式
function chessJudgePointById(id) {
    var cl = $("#" + id).attr("class");
    if (!cl) {
        return;
    }
    if (cl.indexOf(" ") <= 0) {
        return;
    }
    var clList = cl.split(" ");
    var clResult = chessJudgePoint(clList);
    return clResult;
}

//判断是否是红方
function chessJudgeRed(cl) {
    if (cl == "jin" || cl === "mu" || cl === "shui" || cl === "huo" || cl === "tu" || cl === "shuai") {
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

//计算是否在束缚范围内
function chessCanShuFu(point) {
    var xMove = Math.abs(parseInt(point[0]) - parseInt(firstPoint.x));
    var yMove = Math.abs(parseInt(point[1]) - parseInt(firstPoint.y));
    if (xMove <= 1 && yMove <= 1) {
        return true;
    }
    return false;
}

//判断点击是class否是我方棋子
function chessJudgeMyChess(cl) {
    if (cl === "jin" || cl === "mu" || cl === "shui" || cl === "huo" || cl === "tu" || cl === "shuai") {
        if (myColor == 1) {
            return true;
        }
    } else {
        if (cl === "jin0" || cl === "mu0" || cl === "shui0" || cl === "huo0" || cl === "tu0" || cl === "shuai0") {
            if (myColor == 0) {
                return true;
            }
        }
    }
}

//填充释放技能后的棋子位置
function chessPutSkillPoint(point, classList) {
    //点击处是否为空
    var cl = chessJudgePoint(classList);
    if (!cl) {
        //土释放技能点击落点时
        if (chessFirstClass === "tu" || chessFirstClass === "tu0") {
            //计算被传送棋子位置是否可以落子,落点应为被传送棋子的落点,保存轨迹
            if (chessDeliveryCanTrue(point)) {
                //删除起点,绘制落点
                $("#" + firstPoint.x + "_" + firstPoint.y).removeClass(chessFirstClass);
                $("#" + chessSecondPoint.x + "_" + chessSecondPoint.y).removeClass(chessSecondClass);
                $("#" + chessFirstTrackX[chessFirstTrackX.length - 1] + "_" + chessFirstTrackY[chessFirstTrackY.length - 1]).addClass(chessFirstClass);
                $("#" + chessSecondTrackX[chessSecondTrackX.length - 1] + "_" + chessSecondTrackY[chessSecondTrackY.length - 1]).addClass(chessSecondClass);
                //落点加边框
                chessAddCssForFirst(chessFirstTrackX[chessFirstTrackX.length - 1], chessFirstTrackY[chessFirstTrackY.length - 1]);
                chessAddCssForFirst(chessSecondTrackX[chessSecondTrackX.length - 1], chessSecondTrackY[chessSecondTrackY.length - 1]);
                //取消点击处边框样式
                chessRemoveCssForFirst(chessFirstTrackX[chessFirstTrackX.length - 2], chessFirstTrackY[chessFirstTrackY.length - 2]);
                chessRemoveCssForFirst(chessSecondTrackX[chessSecondTrackX.length - 2], chessSecondTrackY[chessSecondTrackY.length - 2]);
                //土技能已释放
                chessSkillt = 1;
                //释放技能按钮失效
                chessSkillDark();
                //更新步数
                myStep += 1;
                //可以走棋
                chessWalkLight();
                //todo 增加土已释放文字

            }
        }
        return;
    } else {
        //木技能
        if (chessFirstClass === "mu" || chessFirstClass === "mu0") {
            //判断第二个点击点class是否为我方棋子
            if (chessJudgeMyChess(cl)) {
                alert("只能束缚对方棋子");
                return;
            }
            //判断点击点class是否为老将
            if (chessJudgeIsBoss(cl)) {
                alert("不可以束缚帅");
                return;
            }
            //计算是否在束缚范围内
            if (chessCanShuFu(point)) {
                //保存第二点
                chessPutSecondPoint(point, cl);
            } else {
                alert("不在束缚范围内");
                return;
            }
            //加入束缚点
            chessShuFuPoint.x = point[0];
            chessShuFuPoint.y = point[1];
            //木技能已释放
            chessSkillm = 1;
            //释放技能按钮失效
            chessSkillDark();
            //更新步数
            myStep += 1;
            //可以走棋
            chessWalkLight();
            //todo 增加被束缚样式

            //todo 增加已释放文字

        } else if (chessFirstClass === "huo" || chessFirstClass === "huo0") {
            //判断第二个点击点class是否为我方棋子
            if (chessJudgeMyChess(cl)) {
                alert("只能燃烧对方棋子");
                return;
            }
            //判断点击点class是否为老将
            if (chessJudgeIsBoss(cl)) {
                alert("不可以燃烧帅");
                return;
            }
            //计算是否可以燃烧
            if (chessCanBorn(point)) {
                //保存第二点
                chessPutSecondPoint(point, cl);
            } else {
                alert("此位置不可燃烧");
                return;
            }
            //火技能已释放
            chessSkillh = 1;
            //删除燃烧掉的点
            $("#" + firstPoint.x + "_" + firstPoint.y).removeClass(chessFirstClass);
            $("#" + point[0] + "_" + point[1]).removeClass(chessSecondClass);
            //取消点击处边框样式
            chessRemoveCssForFirst(chessFirstTrackX[chessFirstTrackX.length - 1], chessFirstTrackY[chessFirstTrackY.length - 1]);
            //更新步数
            myStep += 1;
            //可以走棋
            chessWalkLight();
            //todo 增加火已释放文字

        } else if (chessFirstClass === "tu" || chessFirstClass === "tu0") {
            //第二个点击点class不是我方棋子
            if (!chessJudgeMyChess(cl)) {
                alert("只能传送我方棋子");
                return;
            }
            //判断点击点class是否为老将
            if (chessJudgeIsBoss(cl)) {
                alert("不可以传送帅");
                return;
            }
            //计算是否可以传送
            if (chessCanDelivery(point)) {
                //保存第二点
                chessPutSecondPoint(point, cl);
                //加边框
                chessAddCssForFirst(chessSecondTrackX[chessSecondTrackX.length - 1], chessSecondTrackY[chessSecondTrackY.length - 1]);
            } else {
                alert("此位置不可传送");
                return;
            }
        }
    }
}

//是否可以传送到这个位置,计算土是否可以落
function chessDeliveryCanTrue(point) {
    //根据第一点和第二点计算角度差值
    var xVal = firstPoint.x - chessSecondPoint.x;
    var yVal = firstPoint.y - chessSecondPoint.y;
    //计算土落点坐标
    var xCoor = parseInt(point[0]) + xVal;
    var yCoor = parseInt(point[1]) + yVal;
    var tuId = xCoor + "_" + yCoor;
    //判断是否为空
    if (!chessJudgePointById(tuId)) {
        //判断是否在棋盘内
        if (chessIsInChess(tuId)) {
            //保存轨迹
            chessPutFirstTracePoint([xCoor, yCoor]);
            chessPutSecondTracePoint(point);
            return true;
        }
    }
    return false;
}

//判断是否在棋盘内
function chessIsInChess(id) {
    var cl = $("#" + id).attr("class");
    if (!cl) {
        return false;
    }
    return true;
}

//计算是否可以传送
function chessCanDelivery(point) {
    //和束缚同样方法
    if (chessCanShuFu(point)) {
        return true;
    }
    return false;
}

//计算是否可以燃烧
function chessCanBorn(point) {
    //不在同一行或同一列
    if (firstPoint.x != point[0] && firstPoint.y != point[1]) {
        return false;
    }
    //中间有钻石
    if (firstPoint.x == 0 && firstPoint.y * point[1] < 0) {
        return false;
    }
    if (firstPoint.y == 0 && firstPoint.x * point[0] < 0) {
        return false;
    }
    //中间有其它棋子
    if (!chessJudgeBetween(firstPoint, point)) {
        return false;
    }
    return true;
}

//判断两个点之间是否有棋子,true:没有
function chessJudgeBetween(firstPoint, point) {
    var m1, m2;
    //横坐标相同
    if (firstPoint.x == point[0]) {
        if (firstPoint.y < point[1]) {
            m1 = parseInt(firstPoint.y);
            m2 = parseInt(point[1]);
        } else {
            m1 = parseInt(point[1]);
            m2 = parseInt(firstPoint.y);
        }
        for (var i = m1 + 1; i < m2; i++) {
            var id = firstPoint.x + "_" + i;
            var cl = chessJudgePointById(id);
            if (!cl) {
                return true;
            }
        }
    } else {
        if (firstPoint.x < point[0]) {
            m1 = parseInt(firstPoint.x);
            m2 = parseInt(point[0]);
        } else {
            m1 = parseInt(point[0]);
            m2 = parseInt(firstPoint.x);
        }
        for (var i = m1 + 1; i < m2; i++) {
            var id = i + "_" + firstPoint;
            var cl = chessJudgePointById(id);
            if (!cl) {
                return true;
            }
        }
    }
    return false;
}

//是否可以释放技能,点我方棋子时控制按钮是否亮起
function chessIsSkill() {

}

//技能释放按钮亮起
function chessSkillLight() {
    $("#chessIsSkill").removeAttr("disabled");
}

//技能释放按钮变暗
function chessSkillDark() {
    $("#chessMeStop").attr("disabled", "true");
}

//走按钮亮起
function chessWalkLight() {
    $("#chessMeStop").attr("disabled", false);
}

//走按钮变暗
function chessWalkDark() {
    $("#chessMeStop").attr("disabled", true);
}

//是否为老将
function chessJudgeIsBoss(cl) {
    if (cl === "shuai" || cl === "shuai0") {
        return true;
    }
    return false;
}

//点击走判断是否可以完成,完成就发送信息
function chessMeStop() {
    //水只走一步时步数加一
    if (chessFirstClass === "shui" || chessFirstClass === "shui0") {
        if (chessSkills === 1) {
            myStep++;
        }
    }
    //组装步数信息
    var message = chessAssembleMessage();
    //发送信息
    send(message);
    //取消点击处边框样式
    chessRemoveCssForFirst(chessFirstTrackX[chessFirstTrackX.length - 1], chessFirstTrackY[chessFirstTrackY.length - 1]);
    chessRemoveCssForFirst(chessSecondTrackX[chessSecondTrackX.length - 1], chessSecondTrackY[chessSecondTrackY.length - 1]);
    //初始化第一个有效点
    chessClearFirstPoint();
    //初始化第二个有效点
    chessClearSecondPoint();
    //初始化数组轨迹点
    chessFirstTrackX = new Array();
    chessFirstTrackY = new Array();
    chessSecondTrackX = new Array();
    chessSecondTrackY = new Array();
    //初始化水步数
    chessSkills = 0;
    //初始化水吃掉数
    chessWalterEat = 0;
    //走按钮变暗
    chessWalkDark();
    //技能释放初始化
    isSkill = 0;
}

//组装走步信息
function chessAssembleMessage() {
    var type = 1;
    //获胜type:2
    if (chessIsWin === 1) {
        type = 2;
    }
    //认输
    if (chessIsWin === 2) {
        type = 3;
    }
    var message = '{type:' + type + ',step:' + (myStep + 1) + ',isSkill:"' + isSkill + '",chessRoom:"' + chessMyRoom + '",color:"' + myColor + '",chessFirstPoint:{x:' + firstPoint.x + ',y:' + firstPoint.y + '},chessFirstClass:"' + chessFirstClass + '",chessSecondPoint:{x:' + chessSecondPoint.x + ',y:' + chessSecondPoint.y + '},chessFirstTrackX:[' + chessFirstTrackX + '],chessFirstTrackY:[' + chessFirstTrackY + '],chessSecondTrackX:[' + chessSecondTrackX + '],chessSecondTrackY:[' + chessSecondTrackY + '],chessSecondClass:"' + chessSecondClass + '",chessShuFuPoint:{x:' + chessShuFuPoint.x + ',y:' + chessShuFuPoint.y + '}}';
    return message;
}

//判断目标位置坐标（x,y）是否为（0,0），若为(0,0)且所选棋子不为'帅'，则需重选目标位置
function chessJudgeIsInDiamond(x, y) {
    if (x == 0 && y == 0 && chessFirstClass != "shuai" && chessFirstClass != "shuai0") {
        return true;
    }
    return false;
}

//收到消息对方未放技能时描绘棋盘轨迹
function chessTraceNoSkill(message) {
    //木释放技能后走动时清空束缚点
    if (message.chessFirstClass === "mu" || message.chessFirstClass === "mu0") {
        if (chessOperateSkillm === 1) {
            //撤销束缚样式
            var shuFuId = chessShuFuPoint.x + "_" + chessShuFuPoint.y;

            chessClearShuFuPoint();
            //对方木技能状态为撤销束缚
            chessOperateSkillm = 2;
        }
    }
    for (var i = 0; i < message.chessFirstTrackX.length; i++) {
        //得到轨迹点样式
        var traceId = message.chessFirstTrackX[i] + "_" + message.chessFirstTrackY[i];
        var cl = chessJudgePointById(traceId);
        //删除轨迹点的样式
        $("#" + traceId).removeClass(cl);
        if (i !== 0) {
            //增加移动棋子样式
            $("#" + traceId).addClass(message.chessFirstClass);
            //不是最后一组轨迹则删除样式
            if (i != message.chessFirstTrackX.length - 1) {
                sleep(500);
                $("#" + traceId).removeClass(message.chessFirstClass);
            }
        }
    }
}

//休眠毫秒
function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

//收到消息对方放技能时描绘棋盘轨迹
function chessTraceSkill(message) {
    //获取第一个点id
    var firstId = message.chessFirstPoint.x + "_" + message.chessFirstPoint.y;
    //获取第二个点id
    var secondId = message.chessSecondPoint.x + "_" + message.chessSecondPoint.y;
    //对方释放束缚,把被束缚棋子加个样式
    if (message.chessFirstClass === 'mu' || message.chessFirstClass === 'mu0') {
        //加入束缚点
        chessShuFuPoint.x = message.chessShuFuPoint.x;
        chessShuFuPoint.y = message.chessShuFuPoint.y;
        //对方木释放状态为已释放
        chessOperateSkillm = 1;
        //secondId加样式

        //todo 对方释放技能展示

    } else if (message.chessFirstClass === 'huo' || message.chessFirstClass === 'huo0') {
        //对方放火技能,让两个点消失
        $("#" + firstId).removeClass(message.chessFirstClass);
        $("#" + secondId).removeClass(message.chessSecondClass);
        //todo 对方释放技能展示

    } else if (message.chessFirstClass === 'tu' || message.chessFirstClass === 'tu0') {
        //删除开始点,描绘结束点
        $("#" + firstId).removeClass(message.chessFirstClass);
        $("#" + secondId).removeClass(message.chessSecondClass);
        $("#" + message.chessFirstTrackX[1] + "_" + message.chessFirstTrackY[1]).addClass(message.chessFirstClass);
        $("#" + message.chessSecondTrackX[1] + "_" + message.chessSecondTrackY[1]).addClass(message.chessSecondClass);
        //todo 对方释放技能展示

    }
}

//点击释放技能
function chessReleaseSkill() {
    isSkill = 1;
}

//加入点击点样式
function chessAddCssForFirst(x, y) {
    var clickId = x + "_" + y;
    $("#" + clickId).addClass("add-border");
}

//取消点击点样式
function chessRemoveCssForFirst(x, y) {
    var removeId = x + "_" + y;
    $("#" + removeId).removeClass("add-border");
}
//认输
function chessFail() {
    chessIsWin = 2;
    chessAssembleMessage();
}