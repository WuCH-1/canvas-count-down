let windowH = document.documentElement.clientHeight;
let windowW = document.documentElement.clientWidth;

let radius = 8;
let marginLeft = 80;
let marginTop = 80;
const endTime = (new Date(2018, 10, 19, 10, 00, 00)).getTime();
let curTimeSeconds = 0;

let particle = [];
let colors = ['#DEDEDE', '#8B4513', '#66CD00', '#FFFF00', '	#00EE00', '#0000FF', '#787878', '#FF6A6A', '#CAE1FF', '#2E8B57']

window.onload = function () {
    let countDown = document.getElementById("countDown");
    let cxt = countDown.getContext("2d");

    countDown.width = windowW;
    countDown.height = windowH;

    let curTimeSeconds = getTimeSconds()
    setInterval(function () {
        render(cxt);
        updata();
    }, 50)
}


function updata() {
    let nextTimeSeconds = getTimeSconds();

    let curHours = curTimeSeconds / 3600;
    let curMinutes = curTimeSeconds % 3600 / 60;
    let curSeconds = curTimeSeconds % 60;

    let nextHours = nextTimeSeconds / 3600;
    let nextMinutes = nextTimeSeconds % 3600 / 60;
    let nextSeconds = nextTimeSeconds % 60;

    if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
        addParticle(marginLeft, marginTop, parseInt(nextHours / 10));
    }
    if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
        addParticle(marginLeft + 16 * (radius + 1), marginTop, parseInt(nextHours % 10));
    }
    if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
        addParticle(marginLeft + 47 * (radius + 1), marginTop, parseInt(nextMinutes / 10));
    }
    if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
        addParticle(marginLeft + 63 * (radius + 1), marginTop, parseInt(nextMinutes % 10));
    }
    if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
        addParticle(marginLeft + 94 * (radius + 1), marginTop, parseInt(nextSeconds / 10));
    }
    if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
        addParticle(marginLeft + 110 * (radius + 1), marginTop, parseInt(nextSeconds % 10));
    }
    if (curSeconds != nextSeconds) {
        curTimeSeconds = nextTimeSeconds;
    }
    updataParticle();
}

function updataParticle() {
    for (let i = 0; i < particle.length; i++) {
        let thisBall = particle[i];
        thisBall.x += thisBall.vx;
        thisBall.y += thisBall.vy;
        thisBall.vy += thisBall.g;

        if (thisBall.y >= windowH - radius) {
            thisBall.y = windowH - radius;
            thisBall.vy = -thisBall.vy * 0.75;
        }
        let count = 0;
        for (let i = 0; i < particle.length; i++) {
            let temp = particle[i].x;
            if (temp <= -radius || temp >= windowW+radius ) {
                particle.splice(i,1);
            }
        }
    }
}

function addParticle(x, y, num) {
    for (let i = 0; i < digit[num].length; i++) {
        for (let j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                let aball = {
                    x: x + j * 2 * (radius + 1),
                    y: y + i * 2 * (radius + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 10)) * 5,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                particle.push(aball);
            }
        }
    }
}
// 获取距离秒数
function getTimeSconds() {
    let result = endTime - (new Date()).getTime();
    return result > 0 ? result / 1000 : 0;
}
// 渲染显示数字函数
function render(cxt) {
    cxt.clearRect(0, 0, windowW, windowH);

    let hours = curTimeSeconds / 3600;
    let minutes = curTimeSeconds % 3600 / 60;
    let seconds = curTimeSeconds % 60;


    getNum(marginLeft, marginTop, parseInt(hours / 10), cxt);
    getNum(marginLeft + 16 * (radius + 1), marginTop, parseInt(hours % 10), cxt);
    getNum(marginLeft + 34 * (radius + 1), marginTop, 10, cxt);
    getNum(marginLeft + 47 * (radius + 1), marginTop, parseInt(minutes / 10), cxt);
    getNum(marginLeft + 63 * (radius + 1), marginTop, parseInt(minutes % 10), cxt);
    getNum(marginLeft + 81 * (radius + 1), marginTop, 10, cxt);
    getNum(marginLeft + 94 * (radius + 1), marginTop, parseInt(seconds / 10), cxt);
    getNum(marginLeft + 110 * (radius + 1), marginTop, parseInt(seconds % 10), cxt);

    for (i = 0; i < particle.length; i++) {
        let thisBall = particle[i]
        cxt.fillStyle = thisBall.color;
        cxt.beginPath();
        cxt.arc(thisBall.x, thisBall.y, radius, 0, 2 * Math.PI)
        cxt.closePath();
        cxt.fill();
    }
}

// 获取数字中的小球位置函数
function getNum(x, y, num, cxt) {
    cxt.fillStyle = "#cc3399";
    for (let i = 0; i < digit[num].length; i++) {
        for (let j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (radius + 1), y + i * 2 * (radius + 1), radius, 0, 2 * Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}