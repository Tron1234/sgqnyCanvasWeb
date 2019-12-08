$(function () {
    $(".login_box").hover(function () {
        $("#right").addClass("show");
    });
    var temp1, temp2, temp3, temp4, temp5, temp6, temp7, temp8, temp9, temp10, temp11, temp12, temp13, temp14, temp15;
    $("#right").click(function () {
        $("#right").addClass("click");
        temp1 = setInterval(function () {
            $(".nav").css("display", "flex");
        }, 200);
        $(".login").addClass("login1");
        temp2 = setTimeout(function () {
            $(".container").addClass("moveToNext");
            $(".four_leaf_clover").addClass("four_leaf_clover_up");
        }, 4800);
        temp3 = setTimeout(function () {
            $(".circle").addClass("circle_click");
        }, 7100)
        temp4 = setTimeout(function () {
            $("#a1").addClass("a1_show_css");
        }, 12400);
        temp5 = setTimeout(function () {
            $("#a2").addClass("a2_show_css");
        }, 14100);
        temp6 = setTimeout(function () {
            $("#a3").addClass("a3_show_css");
        }, 15800);
        temp7 = setTimeout(function () {
            $("#a4").addClass("a4_show_css");
        }, 17500);
        temp8 = setTimeout(function () {
            $(".poem").css("display", "block");
            $("#a1").css("transform", "scale(1.1)");
        }, 19200);
        temp9 = setTimeout(function () {
            $("#a1").css("transform", "scale(1.0)");
        }, 19700);
        temp10 = setTimeout(function () {
            $("#a2_div1").css("transform", "scale(1.1)");
        }, 20400);
        temp11 = setTimeout(function () {
            $("#a2_div1").css("transform", "scale(1.0)");
        }, 20900);
        temp12 = setTimeout(function () {
            $("#a3_div1").css("transform", "scale(1.1)");
        }, 21600);
        temp13 = setTimeout(function () {
            $("#a3_div1").css("transform", "scale(1.0)");
        }, 22100);
        temp14 = setTimeout(function () {
            $("#a4_div1").css("transform", "scale(1.1)");
        }, 22800);
        temp15 = setTimeout(function () {
            $("#a4_div1").css("transform", "scale(1.0)");
        }, 23300);
    })
    clearInterval(temp1);
    clearTimeout(temp2);
    clearTimeout(temp3);
    clearTimeout(temp4);
    clearTimeout(temp5);
    clearTimeout(temp6);
    clearTimeout(temp7);
    clearTimeout(temp8);
    clearTimeout(temp9);
    clearTimeout(temp10);
    clearTimeout(temp11);
    clearTimeout(temp12);
    clearTimeout(temp13);
    clearTimeout(temp14);
    clearTimeout(temp15);
    $("#next").click(function () {
        $(".container").addClass("moveToNext1");
        $(".family").addClass("family_down");
    })

    const svg = document.querySelector('svg')
    const ns = svg.namespaceURI

    const getStar = () => {
        const star = document.createElementNS(ns, 'circle');
        const props = {
            class: "★",
            cx: Math.round(Math.random() * 100) + "%",
            cy: Math.round(Math.random() * 70) + "%",
            r: (Math.random() * 3).toFixed(2)
        }

        return Object.keys(props).reduce((star, key) => {
            star.setAttribute(key, props[key]);
            return star
        }, star)
    }
    Array.from(Array(150)).map(() => svg.appendChild(getStar()))

    const getParams = () => ({
        angle: Math.random() * 90 + 135,
        gradStartLightness: Math.random() * 40 + 10,
        gradEndStop: Math.random() * 25 + 50,
        gradEndLightness: Math.random() * 10 + 10
    })

    const updateBG = () => {
        document.documentElement.style.cssText =
            `--grad-startLightness: ${params.gradStartLightness}%;` +
            `--grad-endStop: ${params.gradEndStop}%;` +
            `--grad-endLightness: ${params.gradEndLightness}%;` +
            `--grad-angle: ${params.angle}deg;`
    }

    const animateBG = () => {
        TweenMax.to(params, 3, Object.assign({}, getParams(), animFns))
    }

    const params = getParams()
    const animFns = {
        onUpdate: updateBG,
        onComplete: animateBG
    }

    // Trigger animation
    animateBG();


    var cvs = document.getElementById('cvs');
    cvs.width = 1536;
    cvs.height = 480;
    var ctx3 = cvs.getContext('2d');
    var meteorArr = [];
    for (var i = 0; i < 30; i++) {
        meteorArr.push({
            x: Math.random() * cvs.width * 20,
            y: -Math.random() * cvs.height,
            r: 0.1,
            opacity: 1
        });
    }

    setInterval(function () {
        ctx3.clearRect(0, 0, cvs.width, cvs.height);
        ctx3.lineCap = 'round';
        for (var i = 0; i < meteorArr.length; i++) {
            var x = meteorArr[i].x,
                y = meteorArr[i].y,
                r = meteorArr[i].r;
            for (var j = r; j < 70; j++) {
                ctx3.beginPath();
                ctx3.fillStyle = 'rgb(255,255,255)'
                ctx3.arc(x, y, r, 0, 360 * Math.PI / 180, true);
                r += 0.02;
                x -= 2;
                y += 1;
                ctx3.fill();
                ctx3.closePath();
            }
            meteorArr[i].x -= 16;
            meteorArr[i].y += 8;
            if (meteorArr[i].y >= cvs.height + 50) {
                meteorArr[i].x = Math.random() * cvs.width * 20;
                meteorArr[i].y = -Math.random() * cvs.height;
            }
        }
    }, 20);
})