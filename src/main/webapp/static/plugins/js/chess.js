//房间名称
var chessMyRoom;
//是否开始游戏,0:未开始 1:开始
var chessIsBegin = 0;
//1:走棋 2:获胜 3:认输 4:悔棋
var chessType = 1;
//控制是否我方可以移动棋子
var myStep = 0;
//我方走的步数
var chessMyStepCount = 0;
//保存对方发送的走棋信息
var chessAcceptMessage;
//保存我方发送的走棋信息
var chessSendMessage;
//我放颜色 1:红色
var myColor = 1;
//悔棋次数
var chessRegretCount = 0;
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
var chessSecondClass = '';
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
//删除点记录
var chessDeleteClass = new Array();
var chessDeleteTrackX = new Array();
var chessDeleteTrackY = new Array();
// 1:获胜 2 失败
var chessIsWin = 0;
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

//保存删除点
function chessSaveDelete(point, pointClass) {
    chessDeleteTrackX.push(point[0]);
    chessDeleteTrackY.push(point[1]);
    //没有双引号发到服务端无法格式化成功,暂时这样处理
    chessDeleteClass.push('"' + pointClass + '"');
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
                chessFadeDiv("此处有我方棋子");
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
                    chessFadeDiv('水只能吃一个棋子');
                    return;
                }
                if (chessSkills === 2) {
                    chessFadeDiv('水只能走两步');
                    return;
                }
                //水吃掉棋子后不能走
                if (chessDeleteClass.length > 0){
                    chessFadeDiv('水吃掉棋子后不能走');
                    return;
                }
            }
            //保存后续点轨迹
            chessPutFirstTracePoint(point);
            if (pointIsOther) {
                //保存被吃掉的棋子
                chessSaveDelete(point, pointClass);
            }
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
        //chessType = 2;
        //chessAssembleMessage(chessType);
        //初始化
        //chessType = 1;
        //chessFadeDiv("你赢了");
        //return;
    }
    //是否非帅走的中心
    if (chessJudgeIsInDiamond(point[0], point[1])) {
        chessFadeDiv("只有帅可以获取钻石");
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
                    chessFadeDiv("不在金攻击范围");
                    return;
                }
            } else {
                chessFadeDiv("金只能连续吃");
                return;
            }
        }
    }
    //只走一步
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
        //chessPutFirstTracePoint(point);
        //获胜
        //chessIsWin = 1;
        return true;
    }
    var cl = chessJudgePointById(point[0] + "_" + point[1]);
    if (cl === "shuai" || cl === "shuai0") {
        //保存轨迹
        //chessPutFirstTracePoint(point);
        //获胜
        //chessIsWin = 1;
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
    return false;
}

//填充释放技能后的棋子位置
function chessPutSkillPoint(point, classList) {
    //点击处是否为空
    var cl = chessJudgePoint(classList);
    if (!cl) {
        //土释放技能点击落点时
        if (chessFirstClass === "tu" || chessFirstClass === "tu0") {
            //土必须带一个传送
            if (chessSecondTrackX.length == 0){
                chessFadeDiv("请选择第二个我方棋子");
                return;
            }
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
            }
        }
        return;
    } else {
        //木技能
        if (chessFirstClass === "mu" || chessFirstClass === "mu0") {
            //判断第二个点击点class是否为我方棋子
            if (chessJudgeMyChess(cl)) {
                chessFadeDiv("只能束缚对方棋子");
                return;
            }
            //判断点击点class是否为老将
            if (chessJudgeIsBoss(cl)) {
                chessFadeDiv("不可以束缚帅");
                return;
            }
            //计算是否在束缚范围内
            if (chessCanShuFu(point)) {
                //保存第二点
                chessPutSecondPoint(point, cl);
            } else {
                chessFadeDiv("不在束缚范围内");
                return;
            }
            //加入束缚点
            chessShuFuPoint.x = point[0];
            chessShuFuPoint.y = point[1];
            //加入边框
            chessAddCssForFirst(point[0], point[1]);
            //木技能已释放
            chessSkillm = 1;
            //释放技能按钮失效
            chessSkillDark();
            //更新步数
            myStep += 1;
            //可以走棋
            chessWalkLight();
            //todo 增加被束缚样式

        } else if (chessFirstClass === "huo" || chessFirstClass === "huo0") {
            //判断第二个点击点class是否为我方棋子
            if (chessJudgeMyChess(cl)) {
                chessFadeDiv("只能燃烧对方棋子");
                return;
            }
            //判断点击点class是否为老将
            if (chessJudgeIsBoss(cl)) {
                chessFadeDiv("不可以燃烧帅");
                return;
            }
            //计算是否可以燃烧
            if (chessCanBorn(point)) {
                //保存第二点
                chessPutSecondPoint(point, cl);
            } else {
                chessFadeDiv("此位置不可燃烧");
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
        } else if (chessFirstClass === "tu" || chessFirstClass === "tu0") {
            //第二个点击点class不是我方棋子
            if (!chessJudgeMyChess(cl)) {
                chessFadeDiv("只能传送我方棋子");
                return;
            }
            //判断点击点class是否为老将
            if (chessJudgeIsBoss(cl)) {
                chessFadeDiv("不可以传送帅");
                return;
            }
            //计算是否可以传送
            if (chessCanDelivery(point)) {
                //保存第二点
                chessPutSecondPoint(point, cl);
                //加边框
                chessAddCssForFirst(chessSecondTrackX[chessSecondTrackX.length - 1], chessSecondTrackY[chessSecondTrackY.length - 1]);
                //提示淡入淡出
                chessFadeDiv("请选择被传送棋子的落点");
            } else {
                chessFadeDiv("此位置不可传送");
                return;
            }
        }
    }
}

//样式改文字,type:1 改我方
function chessClassChangeTxt(cl, txt, type) {
    if (type === 1) {
        if (myColor === "1") {
            if (cl === "mu") {
                $("#" + "red_" + cl).text(txt);
            } else if (cl === "huo") {
                $("#" + "red_" + cl).text(txt);
            } else if (cl === "tu") {
                $("#" + "red_" + cl).text(txt);
            }
        } else {
            if (cl === "mu") {
                $("#" + "black_" + cl).text(txt);
            } else if (cl === "huo") {
                $("#" + "black_" + cl).text(txt);
            } else if (cl === "tu") {
                $("#" + "black_" + cl).text(txt);
            }
        }
    } else {
        if (myColor === "0") {
            if (cl === "mu") {
                $("#" + "red_" + cl).text(txt);
            } else if (cl === "huo") {
                $("#" + "red_" + cl).text(txt);
            } else if (cl === "tu") {
                $("#" + "red_" + cl).text(txt);
            }
        } else {
            if (cl === "mu") {
                $("#" + "black_" + cl).text(txt);
            } else if (cl === "huo") {
                $("#" + "black_" + cl).text(txt);
            } else if (cl === "tu") {
                $("#" + "black_" + cl).text(txt);
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
            if (cl) {
                return false;
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
            var id = i + "_" + firstPoint.y;
            var cl = chessJudgePointById(id);
            if (cl) {
                return false;
            }
        }
    }
    return true;
}

//是否可以释放技能,点我方棋子时控制按钮是否亮起
function chessIsSkill() {
    if (chessSkillm !== 1) {
        if (chessFirstClass === "mu" || chessFirstClass === "mu0") {
            //周围一圈是否有对方棋子
            if (chessExistClassAround(firstPoint.x, firstPoint.y, false)) {
                chessSkillLight();
                //技能重命名
                chessSkillRename("束缚");
                return;
            }
        }
    }
    if (chessSkillh !== 1) {
        if (chessFirstClass === "huo" || chessFirstClass === "huo0") {
            //横向或纵向最近处是否有对方棋子
            if (chessHaveCanBornClass()) {
                chessSkillLight();
                //技能重命名
                chessSkillRename("燃烧");
                return;
            }
        }
    }
    if (chessSkillt !== 1) {
        if (chessFirstClass === "tu" || chessFirstClass === "tu0") {
            //周围一圈是否有我方棋子
            if (chessExistClassAround(firstPoint.x, firstPoint.y, true)) {
                chessSkillLight();
                //技能重命名
                chessSkillRename("传送");
                return;
            }
        }
    }
    chessSkillDark();
}

//技能重命名
function chessSkillRename(name) {
    $("#chessIsSkill").val(name);
}

//横向或纵向最近处是否有可燃烧的对方棋子
function chessHaveCanBornClass() {
    var x = parseInt(firstPoint.x);
    var y = parseInt(firstPoint.y);
    //横向
    for (var i = x + 1; i < x + 10; i++) {
        var id = i + "_" + y;
        var cl = chessJudgePointById(id);
        if (cl) {
            if (!chessJudgeIsBoss(cl)) {
                if (!chessJudgeMyChess(cl)) {
                    return true;
                } else {
                    break;
                }
            } else {
                return false;
            }
        }
    }
    for (var i = x - 1; i > x - 10; i--) {
        var id = i + "_" + y;
        var cl = chessJudgePointById(id);
        if (cl) {
            if (!chessJudgeIsBoss(cl)) {
                if (!chessJudgeMyChess(cl)) {
                    return true;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }
    //纵向
    for (var j = y + 1; j < y + 10; j++) {
        var idZong = x + "_" + j;
        var clZong = chessJudgePointById(idZong);
        if (clZong) {
            if (!chessJudgeIsBoss(clZong)) {
                if (!chessJudgeMyChess(clZong)) {
                    return true;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }
    for (var j = y - 1; j > y - 10; j--) {
        var idZong = x + "_" + j;
        var clZong = chessJudgePointById(idZong);
        if (clZong) {
            if (!chessJudgeIsBoss(clZong)) {
                if (!chessJudgeMyChess(clZong)) {
                    return true;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }
    return false;
}

//判断周围一圈是否有我方/对方棋子,myClass:true 我方
function chessExistClassAround(x, y, myClass) {
    var xp = parseInt(x);
    var yp = parseInt(y);
    var id1 = (xp - 1) + "_" + (yp - 1);
    var id2 = (xp - 0) + "_" + (yp - 1);
    var id3 = (xp + 1) + "_" + (yp - 1);
    var id4 = (xp - 1) + "_" + (yp - 0);
    var id5 = (xp + 1) + "_" + (yp - 0);
    var id6 = (xp - 1) + "_" + (yp + 1);
    var id7 = (xp - 0) + "_" + (yp + 1);
    var id8 = (xp + 1) + "_" + (yp + 1);
    var idArray = [id1, id2, id3, id4, id5, id6, id7, id8];
    var cl = '';
    for (var i = 0; i < idArray.length; i++) {
        cl = chessJudgePointById(idArray[i]);
        if (cl) {
            if (!chessJudgeIsBoss(cl)) {
                if (chessJudgeMyChess(cl) === myClass) {
                    return true;
                }
            }
        }
    }
    return false;
}

//技能释放按钮亮起
function chessSkillLight() {
    $("#chessIsSkill").attr("disabled", false);
}

//技能释放按钮变暗
function chessSkillDark() {
    $("#chessIsSkill").attr("disabled", true);
    //技能重命名
    chessSkillRename("技能");
}

//走按钮亮起
function chessWalkLight() {
    $("#chessMeStop").attr("disabled", false);
}

//走按钮变暗
function chessWalkDark() {
    $("#chessMeStop").attr("disabled", true);
}

//重走按钮亮起
function chessResetLight() {
    $("#chessReset").attr("disabled", false);
}

//重走按钮变暗
function chessResetDark() {
    $("#chessReset").attr("disabled", true);
}

//判断是否为老将
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
    var message = chessAssembleMessage(1);
    //保存
    chessSendMessage = message;
    //发送信息
    send(message);
    //修改已释放
    if(isSkill === 1){
        if (chessFirstClass === "mu" || chessFirstClass === "mu0") {
            chessClassChangeTxt("mu","束缚:已释放",1);
        }
        if (chessFirstClass === "huo" || chessFirstClass === "huo") {
            chessClassChangeTxt("huo","燃烧:已释放",1);
        }
        if (chessFirstClass === "tu" || chessFirstClass === "tu0") {
            chessClassChangeTxt("tu","传送:已释放",1);
        }
    }
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
    //重走变暗
    chessResetDark();
    //技能释放初始化
    isSkill = 0;
    //步数加一
    chessMyStepCount++;
    chessRemindMes("对方回合");
    //对方回合
    myStep = 0;
    //技能变暗
    chessSkillDark();
    //删除点清空
    chessDeleteClass = [];
    chessDeleteTrackX = [];
    chessDeleteTrackY = [];
    //获胜
    if (chessIsWin === 1){
        chessAlertEndMessage("你赢了");
    }
}

//组装走步信息
function chessAssembleMessage(type) {
    var message = '{type:' + type + ',step:' + 1 + ',isSkill:"' + isSkill + '",chessRoom:"' + chessMyRoom + '",color:"' + myColor + '",chessFirstPoint:{x:' + firstPoint.x + ',y:' + firstPoint.y + '},chessFirstClass:"' + chessFirstClass + '",chessSecondPoint:{x:' + chessSecondPoint.x + ',y:' + chessSecondPoint.y + '},chessFirstTrackX:[' + chessFirstTrackX + '],chessFirstTrackY:[' + chessFirstTrackY + '],chessSecondTrackX:[' + chessSecondTrackX + '],chessSecondTrackY:[' + chessSecondTrackY + '],chessSecondClass:"' + chessSecondClass + '",chessShuFuPoint:{x:' + chessShuFuPoint.x + ',y:' + chessShuFuPoint.y + '},chessDeleteClass:[' + chessDeleteClass + '],chessDeleteTrackX:[' + chessDeleteTrackX + '],chessDeleteTrackY:[' + chessDeleteTrackY + ']}';
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
            //todo 撤销束缚样式
            var shuFuId = chessShuFuPoint.x + "_" + chessShuFuPoint.y;

            chessClearShuFuPoint();
            //对方木技能状态为撤销束缚
            chessOperateSkillm = 2;
        }
    }
    if (message.chessFirstTrackX.length<=2){
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
                    $("#" + traceId).removeClass(message.chessFirstClass);
                }
            }
        }
    }else if (message.chessFirstTrackX.length>2) {
        /*for (let i = 1; i < message.chessFirstTrackX.length; i++) {
            setTimeout(function () {
                //得到上一点对方id
                var traceId = message.chessFirstTrackX[i-1] + "_" + message.chessFirstTrackY[i-1];
                var cl = chessJudgePointById(traceId);
                //删除上一点
                $("#" + traceId).removeClass(cl);
                //删除当前点我方被吃掉棋子
                var currentId = message.chessFirstTrackX[i] + "_" + message.chessFirstTrackY[i];
                var myCl = chessJudgePointById(currentId);
                $("#" + currentId).removeClass(myCl);
                //增加对方落点样式
                $("#" + currentId).addClass(message.chessFirstClass);
            },500);
        }*/
        chessMoveAsTrace(chessMoveIndex, message);
    }
    //我方失败
    chessMeFail(message);
}
//我方失败
function chessMeFail(message) {
    if (message.chessFirstTrackX[1] == 0 && message.chessFirstTrackY[1] == 0){
        chessAlertEndMessage("你输了");
    }
    if (message.chessDeleteClass[message.chessDeleteClass.length - 1] === "shuai" && message.chessDeleteClass[message.chessDeleteClass.length - 1] === "shuai0") {
        chessAlertEndMessage("你输了");
    }
}
//移动棋子展示轨迹
var chessMoveIndex = 1;
function chessMoveAsTrace(chessMoveIndex, message) {
    if (chessMoveIndex < message.chessFirstTrackX.length) {
        //得到上一点对方id
        var traceId = message.chessFirstTrackX[chessMoveIndex-1] + "_" + message.chessFirstTrackY[chessMoveIndex-1];
        var cl = chessJudgePointById(traceId);
        //删除上一点
        $("#" + traceId).removeClass(cl);
        //删除当前点我方被吃掉棋子
        var currentId = message.chessFirstTrackX[chessMoveIndex] + "_" + message.chessFirstTrackY[chessMoveIndex];
        var myCl = chessJudgePointById(currentId);
        $("#" + currentId).removeClass(myCl);
        //增加对方落点样式
        $("#" + currentId).addClass(message.chessFirstClass);
        chessMoveIndex++;
        setTimeout(function(){chessMoveAsTrace(chessMoveIndex, message)},500);
    } else {
        chessMoveIndex = 1;
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
        //文字改为已释放
        chessClassChangeTxt("mu","束缚:已释放" ,2);
        //todo secondId加样式

        //对方释放技能提示
        chessFadeDiv("对方释放束缚技能");
    } else if (message.chessFirstClass === 'huo' || message.chessFirstClass === 'huo0') {
        //对方放火技能,让两个点消失
        $("#" + firstId).removeClass(message.chessFirstClass);
        $("#" + secondId).removeClass(message.chessSecondClass);
        //对方释放技能展示
        chessFadeDiv("对方释放燃烧技能");
        //文字改为已释放
        chessClassChangeTxt("huo","燃烧:已释放" ,2);
    } else if (message.chessFirstClass === 'tu' || message.chessFirstClass === 'tu0') {
        //删除开始点,描绘结束点
        $("#" + firstId).removeClass(message.chessFirstClass);
        $("#" + secondId).removeClass(message.chessSecondClass);
        $("#" + message.chessFirstTrackX[1] + "_" + message.chessFirstTrackY[1]).addClass(message.chessFirstClass);
        $("#" + message.chessSecondTrackX[1] + "_" + message.chessSecondTrackY[1]).addClass(message.chessSecondClass);
        //对方释放技能展示
        chessFadeDiv("对方释放传送技能");
        //文字改为已释放
        chessClassChangeTxt("tu","传送:已释放" ,2);
    }
}

//点击释放技能
function chessReleaseSkill() {
    isSkill = 1;
    //变暗
    chessSkillDark();
    //提示
    chessFadeDiv("请点击被技能作用的棋子");
}

//加入点击边框样式
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
    chessType = 3;
    var message = chessAssembleMessage(chessType);
    chessType = 1;
    send(message);
    chessAlertEndMessage("已认输");
}

//翻转棋盘
function chessTurn(message) {
    message.chessFirstPoint.x = message.chessFirstPoint.x * -1;
    message.chessFirstPoint.y = message.chessFirstPoint.y * -1;
    if (message.chessSecondPoint.x !== 99) {
        message.chessSecondPoint.x = message.chessSecondPoint.x * -1;
        message.chessSecondPoint.y = message.chessSecondPoint.y * -1;
    }
    if (message.chessShuFuPoint.x !== 99) {
        message.chessShuFuPoint.x = message.chessShuFuPoint.x * -1;
        message.chessShuFuPoint.y = message.chessShuFuPoint.y * -1;
    }
    message.chessFirstTrackX = chessTurnTrace(message.chessFirstTrackX);
    message.chessFirstTrackY = chessTurnTrace(message.chessFirstTrackY);
    if (message.chessSecondTrackX.length > 0) {
        message.chessSecondTrackX = chessTurnTrace(message.chessSecondTrackX);
        message.chessSecondTrackY = chessTurnTrace(message.chessSecondTrackY);
    }
    if (message.chessDeleteClass.length > 0) {
        message.chessDeleteTrackX = chessTurnTrace(message.chessDeleteTrackX);
        message.chessDeleteTrackY = chessTurnTrace(message.chessDeleteTrackY);
    }
    return message;
}

//翻转轨迹
function chessTurnTrace(trace) {
    for (var i = 0; i < trace.length; i++) {
        trace[i] = trace[i] * -1;
    }
    return trace;
}

//重走
function chessReset() {
    if (chessIsBegin === 0) {
        return;
    }
    if (myStep % 2 !== 1) {
        //判断走是亮着的
        var goDis = $("#chessMeStop").prop("disabled");
        if (goDis) {
            return;
        }
    }
    //删除最后的位置
    $("#" + chessFirstTrackX[chessFirstTrackX.length - 1] + "_" + chessFirstTrackY[chessFirstTrackY.length - 1]).removeClass(chessFirstClass);
    //清空最后边框
    chessRemoveCssForFirst(chessFirstTrackX[chessFirstTrackX.length - 1], chessFirstTrackY[chessFirstTrackY.length - 1]);
    //增加起点位置样式
    $("#" + chessFirstTrackX[0] + "_" + chessFirstTrackY[0]).addClass(chessFirstClass);
    //第二点同样操作
    if (chessSecondClass) {
        $("#" + chessSecondTrackX[chessSecondTrackX.length - 1] + "_" + chessSecondTrackY[chessSecondTrackY.length - 1]).removeClass(chessSecondClass);
        chessRemoveCssForFirst(chessSecondTrackX[chessSecondTrackX.length - 1], chessSecondTrackY[chessSecondTrackY.length - 1]);
        $("#" + chessSecondTrackX[0] + "_" + chessSecondTrackY[0]).addClass(chessSecondClass);
    }
    //增加删除点样式
    chessDeleteAddClass();
    //清空本回合存点
    chessClearThisStepPoint();
}

//增加删除点样式
function chessDeleteAddClass() {
    for (var d = 0; d < chessDeleteClass.length; d++) {
        var deleteId = chessDeleteTrackX[d] + "_" + chessDeleteTrackY[d];
        $("#" + deleteId).addClass(chessDeleteClass[d].substring(1,chessDeleteClass[d].length - 1));
    }
}

//清空本回合存点
function chessClearThisStepPoint() {
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
    //释放技能时
    if (isSkill === 1) {
        //木要清空束缚点,技能次数
        if (chessFirstClass === "mu" || chessFirstClass === "mu0") {
            chessClearShuFuPoint();
            chessSkillm = 0;
        }
        //火要清技能次数
        if (chessFirstClass === "huo" || chessFirstClass === "huo0") {
            chessSkillh = 0;
        }
        //土要清空技能次数
        if (chessFirstClass === "tu" || chessFirstClass === "tu0") {
            chessClearShuFuPoint();
            chessSkillt = 0;
        }
    }
    //技能释放初始化
    isSkill = 0;
    //步数变为奇数
    myStep = 1;
    //删除点清空
    chessDeleteClass = [];
    chessDeleteTrackX = [];
    chessDeleteTrackY = [];
}

//悔棋
function chessRegret() {
    if (chessIsBegin === 0) {
        return;
    }
    if (chessMyStepCount === 0) {
        return;
    }
    if (chessRegretCount === 1) {
        chessFadeDiv("只能悔棋一次");
        return;
    }
    chessFadeDiv("已发出悔棋请求,请等待");
    //发送申请
    var message = chessAssembleMessage(4);
    send(message);
    chessRegretCount = 1;
    //todo 弹出框倒计时5s,什么都不能干

}

//同意悔棋操作
function chessAgreeRegret() {
    //判断是否我方操作
    var isMyStep = false;
    if (myStep % 2 !== 1) {
        //判断走是亮着的
        var goDis = $("#chessMeStop").prop("disabled");
        if (!goDis) {
            isMyStep = true;
        }
    } else {
        isMyStep = true;
    }
    //我方操作
    if (isMyStep) {
        //先调用重走功能
        chessReset();
        //步数加一,不让我方手动移动棋子
        myStep++;
    } else {
        //撤回我方上次走的棋子
        var sendMessage = eval('(' + chessSendMessage + ')');
        chessCancelLastStep(sendMessage);
        //我方释放技能则撤回
        chessCancelMySkill(sendMessage);
    }
    //撤回对方走的棋子
    chessCancelLastStep(chessAcceptMessage);
    //提示:对方回合
    chessRemindMes("对方回合");
    //释放技能则更改文字
    chessOperateRegretChangeTxt(chessAcceptMessage);
}
//我方释放技能则撤回
function chessCancelMySkill(sendMessage){
    if (sendMessage.isSkill == 1){
        if (sendMessage.chessFirstClass === "mu" || sendMessage.chessFirstClass === "mu0") {
            chessSkillm = 0;
            chessClassChangeTxt("mu", "束缚:未释放", 1);
        } else if (sendMessage.chessFirstClass === "huo" || sendMessage.chessFirstClass === "huo0") {
            chessSkillh = 0;
            chessClassChangeTxt("huo", "燃烧:未释放", 1);
        } else if (sendMessage.chessFirstClass === "tu" || sendMessage.chessFirstClass === "tu0") {
            chessSkillt = 0;
            chessClassChangeTxt("tu", "传送:未释放", 1);
        }
    }
}
//同意对方悔棋时释放技能更改文字
function chessOperateRegretChangeTxt(chessAcceptMessage) {
    if (chessAcceptMessage.isSkill == 1){
        if (chessAcceptMessage.chessFirstClass === "mu" || chessAcceptMessage.chessFirstClass === "mu0") {
            chessClassChangeTxt("mu", "束缚:未释放", 2);
        } else if (chessAcceptMessage.chessFirstClass === "huo" || chessAcceptMessage.chessFirstClass === "huo0") {
            chessClassChangeTxt("huo", "燃烧:未释放", 2);
        } else if (chessAcceptMessage.chessFirstClass === "tu" || chessAcceptMessage.chessFirstClass === "tu0") {
            chessClassChangeTxt("tu", "传送:未释放", 2);
        }
    }
}
//对方同意悔棋我方操作
function chessAcceptAgreeRegret() {
    //判断是否我方操作
    var isMyStep = false;
    if (myStep % 2 !== 1) {
        //判断走是亮着的
        var goDis = $("#chessMeStop").prop("disabled");
        if (!goDis) {
            isMyStep = true;
        }
    } else {
        isMyStep = true;
    }
    //我方可以走
    if (isMyStep) {
        //先调用重走功能
        chessReset();
        //撤回对方之前走的棋子
        chessCancelLastStep(chessAcceptMessage);
        //撤回我方上次走的棋子
        var sendMessage = eval('(' + chessSendMessage + ')');
        chessCancelLastStep(sendMessage);
    } else {
        //撤回我方上次走的棋子
        var sendMessage = eval('(' + chessSendMessage + ')');
        chessCancelLastStep(sendMessage);
        //步数回到奇数
        myStep = 1;
        //提示:我方回合
        chessRemindMes("我方回合");
    }
    //检查我方上次是否放技能,放技能进行回滚
    if (sendMessage.isSkill == 1) {
        if (sendMessage.chessFirstClass === "mu" || sendMessage.chessFirstClass === "mu0") {
            chessSkillm = 0;
            //增加土已释放文字
            chessClassChangeTxt("mu", "束缚:未释放", 1);
        } else if (sendMessage.chessFirstClass === "huo" || sendMessage.chessFirstClass === "huo0") {
            chessSkillh = 0;
            chessClassChangeTxt("huo", "燃烧:未释放", 1);
        } else if (sendMessage.chessFirstClass === "tu" || sendMessage.chessFirstClass === "tu0") {
            chessSkillt = 0;
            //增加土已释放文字
            chessClassChangeTxt("tu", "传送:未释放", 1);
        }
    }
    //检查对方是否放技能
    chessOperateRegretChangeTxt(chessAcceptMessage);
    /*if (chessAcceptMessage.isSkill == 1) {
        if (chessAcceptMessage.chessFirstClass === "mu" || chessAcceptMessage.chessFirstClass === "mu0") {
            chessClassChangeTxt("mu", "束缚:未释放", 2);
        } else if (chessAcceptMessage.chessFirstClass === "huo" || chessAcceptMessage.chessFirstClass === "huo0") {
            chessClassChangeTxt("huo", "燃烧:未释放", 2);
        } else if (chessAcceptMessage.chessFirstClass === "huo" || chessAcceptMessage.chessFirstClass === "huo0") {
            chessClassChangeTxt("tu", "传送:未释放", 2);
        }
    }*/
}

//撤回之前走的棋子
function chessCancelLastStep(chessMessage) {
    var lastChessFirstTrackX = chessMessage.chessFirstTrackX;
    var lastChessFirstTrackY = chessMessage.chessFirstTrackY;
    //删除最后的位置
    $("#" + lastChessFirstTrackX[lastChessFirstTrackX.length - 1] + "_" + lastChessFirstTrackY[lastChessFirstTrackY.length - 1]).removeClass(chessMessage.chessFirstClass);
    //增加起点位置样式
    $("#" + lastChessFirstTrackX[0] + "_" + lastChessFirstTrackY[0]).addClass(chessMessage.chessFirstClass);
    //第二点同样操作
    if (chessMessage.chessSecondClass) {
        var lastChessSecondTrackX = chessMessage.chessSecondTrackX;
        var lastChessSecondTrackY = chessMessage.chessSecondTrackY;
        $("#" + lastChessSecondTrackX[lastChessSecondTrackX.length - 1] + "_" + lastChessSecondTrackY[lastChessSecondTrackY.length - 1]).removeClass(chessMessage.chessSecondClass);
        $("#" + lastChessSecondTrackX[0] + "_" + lastChessSecondTrackY[0]).addClass(chessMessage.chessSecondClass);
    }
    //增加删除点样式
    for (var d = 0; d < chessMessage.chessDeleteClass.length; d++) {
        var deleteId = chessMessage.chessDeleteTrackX[d] + "_" + chessMessage.chessDeleteTrackY[d];
        $("#" + deleteId).addClass(chessMessage.chessDeleteClass[d]);
    }
}

//退出
function chessBackToRoom() {
    window.self.location = "room.jsp";
}

//查看规则
function chessWatchRules() {
    var txt = "一步一步走,不能斜着走" +
        "金:对方棋子相连时可以连续吃" +
        "木:可以束缚一圈以内的一个对方棋子双方都不能动,当木走动时束缚取消" +
        "火:可以拼掉一排的另一个敌人" +
        "土:可以带着一个人瞬移一次" +
        "火,木,土技能都只能发动一次,且老将免疫攻击" +
        "水可以走两步,只能吃掉一个" +
        "只能悔棋一次,不管对方是否同意";
    //页面层-自定义
    layer.open({
        type: 1
        ,title: false //不显示标题栏
        ,closeBtn: false
        ,area: '620px;'
        ,shade: 0.8
        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
        ,resize: true
        ,btn: ['确定']
        ,btnAlign: 'c'
        ,moveType: 1 //拖拽模式，0或者1
        ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;text-align: left;">一次走一步,不能斜着走<br>走完请点击(走)按钮,点击走之前可点击(重走)按钮重新规划路线<br>吃掉对方将,或者我方将走到钻石处获胜<br>金 : 对方棋子相连时可以连续吃<br>木 : 可以束缚一圈以内的一个对方棋子双方都不能动,当木走动时束缚取消<br>水 : 可以走两步,但只能吃掉一个<br>火 : 可以拼掉横排或竖排的另一个敌人(中间不能有棋子或钻石等障碍)<br>土 : 可以带着周围一圈我方棋子瞬移一次<br>技能每局只能发动一次,且老将免疫攻击<br>技能释放顺序:先点击第一个棋子,再点击(技能)按钮,最后点击被技能作用的棋子<br>只能悔棋一次,不管对方是否同意<br></div>'
        ,success: function(layero){
            var btn = layero.find('.layui-layer-btn');
            btn.find('.layui-layer-btn0').attr({
                href: '#'
            });
        }
    });
}

//收到悔棋弹出框
function chessAlertRegret() {
    var txt = "对方请求悔棋";
    layer.confirm(txt, {
        closeBtn: 0,
        btn: ['同意','拒绝'] //按钮
    }, function(index){
        layer.close(index);
        //发送同意悔棋
        var message = chessAssembleMessage(5);
        send(message);
        //同意悔棋操作
        chessAgreeRegret();
    }, function(index){
        layer.close(index);
        //发送拒绝悔棋
        var message = chessAssembleMessage(6);
        send(message);
    });
    chessSetTime(txt);
}

//倒计时
var chessCountDown = 5;
function chessSetTime(txt) {
    if (chessCountDown === 0) {
        //关闭弹出框
        $(".layui-layer-btn1").trigger("click");
        chessCountDown = 5;
    } else {
        chessCountDown--;
        $('.layui-layer-content').html(txt + chessCountDown);
        setTimeout(function () {
            chessSetTime(txt)
        }, 1000)
    }
}

//弹出信息框,只有确定按钮
function chessAlertMessage(txt) {
    layer.alert(txt, {
        skin: 'layui-layer-lan'
        ,closeBtn: 0
        ,anim: 4 //动画类型
    });
}

//结束提示框,按钮:重新开始,退出房间
function chessAlertEndMessage(txt) {
    layer.confirm(txt, {
        btn: ['重新开始','退出房间'] //按钮
    }, function(){
        location.reload();
    }, function(){
        window.self.location = "room.jsp";
    });
}

//更改顶部提示文字
function chessRemindMes(mes) {
    $("#remindMes").text(mes);
}

//求和
function chessPeace() {
    layer.alert("不想做这个功能");
}

//错误弹框
function chessAlertError(txt) {
    layer.alert(txt, {
        icon: 2
    })
}
//提示框淡入淡出
function chessFadeDiv(txt) {
    layer.msg(txt, {
        time: 2000 //2秒关闭（如果不配置，默认是3秒）
    });
}