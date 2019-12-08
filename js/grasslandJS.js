var canva1, ctx1, width, height, stems, bubbles;
var i1 = 0;
var speed1 = -220;
stems = [];
bubbles = [];

function Stem(points, color) {
    this.points = points;
    this.color = color;
}

Stem.prototype.draw = function (ctx1) {
    var len, ctrlPoint, point;

    len = this.points.length - 1;
    ctrlPoint = {
        x: 0,
        y: 0
    };

    ctx1.save();
    ctx1.strokeStyle = this.color;
    ctx1.beginPath();
    ctx1.moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
    for (var i = len; i >= 1; i--) {
        point = this.points[i];
        ctrlPoint.x = (point.x + this.points[i - 1].x) / 2;
        ctrlPoint.y = (point.y + this.points[i - 1].y) / 2;
        ctx1.quadraticCurveTo(point.x, point.y, ctrlPoint.x, ctrlPoint.y);
        ctx1.lineWidth = i * 1.1;
        ctx1.stroke();
        ctx1.fillStyle = 'red';
    }
    ctx1.restore();
}


function init() {
    canvas1 = document.getElementById("grassland");
    ctx1 = canvas1.getContext('2d');
    width = canvas1.width = 1535;
    height = canvas1.height = 280;
    populateStems(height / 3, width, 1.5);
    drawFrame();

};

function populateStems(offset, limit, step) {
    for (var x = 0; x <= limit; x += step) {
        generateStem(x, height / 2.5 - offset / 2.5 + Math.random() * offset, 50)
    }
}

function generateStem(x, pointsLen, step) {
    var positions, y, offset, colorsArr, color;

    colorsArr = ['#6e881b', '#5d7314', '#54690f', '#657f0f', '#6f8f06'];
    color = Math.floor(1 + Math.random() * colorsArr.length - 1);
    positions = [];

    if (height < 600) {
        offset = -40 + Math.random() * 80;
        for (y = height - pointsLen; y <= height + 100; y += step / 2) {
            positions.push({
                x: x + offset / (y / 2000),
                y: y,
                angle: Math.random() * 360,
                speed: 0.1 + Math.random() * 0.3
            });
        }
    } else {
        offset = -200 + Math.random() * 100;
        for (y = height - pointsLen; y <= height + 100; y += step) {
            positions.push({
                x: x + offset / (y / 2000),
                y: y,
                angle: Math.random() * 360,
                speed: 0.1 + Math.random() * 0.3
            });
        }
    }
    stems.push(new Stem(positions, colorsArr[color]));
}

function drawFrame() {
    var timePack;
    if(speed1!=1170){
        timePack=setTimeout(function(){
            window.requestAnimationFrame(drawFrame, canvas1);
        },100);
    } else{
        clearTimeout(timePack);
        window.requestAnimationFrame(drawFrame, canvas1);
    } 
    ctx1.clearRect(0, 0, width, height);
    drawGirl();
    drawBoy();
    bubbles.forEach(moveBubble);
    stems.forEach(function (stem) {
        stem.points.forEach(movePoint);
        stem.draw(ctx1);
    });
}

function moveBubble(bubble) {
    if (bubble.y + bubble.radius <= 0) bubble.y = bubble.oldY;
    bubble.y += bubble.vy;
    bubble.draw(ctx1);
}

function movePoint(point, index) {
    point.x += Math.sin(point.angle) / (index / 2.2);
    point.angle += point.speed;
}

function drawGirl() {
    var girl = new Image();
    girl.src = "images/girl.png";
    ctx1.drawImage(girl, 1195, 0);
}

function drawBoy() {
    var boy = new Image();
    boy.src = "images/walk.png";
    var w = boy.width / 5;
    var h = boy.height;
    //ctx1.clearRect(0, 0, width, height);
    /*
     * 第一个参数是图片的对象
     * 第二个和第三个参数是 图片左上角的x,y坐标点
     * 第四个和第五个参数是 图片的宽 高
     * 第六个和第七个参数是 显示在画布上的x,y坐标点
     * 第八和第九个参数 显示在画布上的宽高
     * */
    ctx1.drawImage(boy, w * i1, 0, w, h, speed1, 0, w, h)
    i1++;
    speed1 += 10;
    i1 = i1 % 4;
    if (speed1 > 1170) {
        speed1 = 1170;
        i1 = 4;
    }
}