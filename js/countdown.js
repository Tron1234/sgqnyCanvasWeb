var RADIUS;

var curShowTimeSeconds = 0;

var balls = [];
var width, height;
var canvas5 = document.getElementById('canvas5');
var context5 = canvas5.getContext("2d");
width = canvas5.width = 800;
height = canvas5.height = 180;

//数字部分占屏幕的4/5,每个数字占15个(RADIUS+1),6个数字占90个(RADIUS+1),1个冒号占9个(RADIUS+1)，两个冒号占18个(RADIUS+1),共108个(RADIUS+1)
RADIUS = Math.round(canvas5.width / 1.5 / 108) - 1;

function startTime() {
    setInterval(
        function () {
            render(context5); //逐桢动画,每50毫秒执行一次
            updateBalls();
        }, 50);
}


function updateBalls() {

    for (var i = 0; i < balls.length; i++) {

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g; //将重力加速度加到垂直方向的速度上

        //碰撞检测
        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) { //小球碰到底部
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75; //0.75摩擦系数,使得小球的弹跳更符合实际
        }
    }
    //控制小球数量
    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) { //留在画布中的小球
            balls[cnt++] = balls[i]; //cnt <= i,前cnt个小球符合要求，cnt后面的小球可以删掉
        }
    }
    while (balls.length > cnt) {
        balls.pop(); //删除病返回数组最后一个元素
    }
}


function render(cxt) {

    cxt.clearRect(0, 0, width, height); //刷新掉原来的图像，否则新图像会叠加在上面

    var startDate = new Date(); //定义开始时间
    var endDate = new Date(2020, 6, 10, 8, 0, 0); //定义结束时间
    var date = endDate.getTime() - startDate.getTime();

    var hours = Math.floor(date / (1000 * 3600));
    var level1 = date % (1000 * 3600);
    var minutes = Math.floor(level1 / (60 * 1000));
    console.log(minutes);
    var level2 = level1 % (60 * 1000);
    var seconds = Math.round(level2 / 1000);
    var temp1 = 0;

    //万内小时计算
    if (hours >= 10000) { //当小时小于100000
        renderDigit(0, 0, parseInt(hours / 10000), cxt); //绘制小时的万位数
        renderDigit(15 * (RADIUS + 1), 0, parseInt((hours % 10000) / 1000), cxt); //绘制小时的千位数
        renderDigit(30 * (RADIUS + 1), 0, parseInt(((hours % 10000) % 1000) / 100), cxt); //绘制小时的百位数
        renderDigit(45 * (RADIUS + 1), 0, parseInt((((hours % 10000) % 1000) % 100) / 10), cxt); //绘制小时的十位数
        renderDigit(60 * (RADIUS + 1), 0, parseInt((((hours % 10000) % 1000) % 100) % 10), cxt); //绘制小时的个位数
    } else if (hours >= 1000) { //当小时小于10000
        renderDigit(0, 0, parseInt(hours / 1000), cxt); //绘制小时的千位数
        renderDigit(15 * (RADIUS + 1), 0, parseInt((hours % 1000) / 100), cxt); //绘制小时的百位数
        renderDigit(30 * (RADIUS + 1), 0, parseInt(((hours % 1000) % 100) / 10), cxt); //绘制小时的十位数
        renderDigit(45 * (RADIUS + 1), 0, parseInt(((hours % 1000) % 100) % 10), cxt); //绘制小时的个位数
        temp1++;
    } else if (hours >= 100) { //当小时小于1000
        renderDigit(0, 0, parseInt(hours / 100), cxt); //绘制小时的百位数
        renderDigit(15 * (RADIUS + 1), 0, parseInt((hours % 100) / 10), cxt); //绘制小时的十位数
        renderDigit(30 * (RADIUS + 1), 0, parseInt((hours % 100) % 10), cxt); //绘制小时的个位数
        temp1 += 2;
    } else if (hours >= 10) { //当小时小于100
        renderDigit(0, 0, parseInt(hours / 10), cxt); //绘制小时的十位数
        renderDigit(15 * (RADIUS + 1), 0, parseInt(hours % 10), cxt); //绘制小时的个位数
        temp1 += 3;
    } else if (hours >= 0) { //当小时小于10
        renderDigit(0, 0, parseInt(hours % 10), cxt); //绘制小时的个位数
        temp1 += 4;
    }

    //绘制数字
    renderDigit((75 - 15 * temp1) * (RADIUS + 1), 0, 10, cxt); //冒号只有4列, 8个(R+1),多取一个9个(R+1)
    renderDigit((84 - 15 * temp1) * (RADIUS + 1), 0, parseInt(minutes / 10), cxt); //绘制分钟的十位数
    renderDigit((99 - 15 * temp1) * (RADIUS + 1), 0, parseInt(minutes % 10), cxt); //绘制分钟的个位数
    renderDigit((114 - 15 * temp1) * (RADIUS + 1), 0, 10, cxt);
    renderDigit((123 - 15 * temp1) * (RADIUS + 1), 0, parseInt(seconds / 10), cxt); //绘制秒数的十位数
    renderDigit((138 - 15 * temp1) * (RADIUS + 1), 0, parseInt(seconds % 10), cxt); //绘制秒数的个位数 

    cxt.font = "30px Arial";
    cxt.fillText("--离异地恋结束", 570, 160);

    //绘制小球
    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
        cxt.closePath();

        cxt.fill();
    }
}

function renderDigit(x, y, num, cxt) { //数字最左端横坐标,数字最左端纵坐标,绘制的数字,绘制的上下文环境

    //cxt.fillStyle = "rgb(192,192,192)"; //设置小球的填充颜色
    cxt.fillStyle = "rgb(176,224,230)"; //设置小球的填充颜色

    for (var i = 0; i < digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++)
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                cxt.closePath();

                cxt.fill()
            }
}