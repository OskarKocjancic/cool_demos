var canvas = document.querySelector("canvas");
var slider = document.querySelector("#myRange");
var endingAngle = document.querySelector("#endingAngle").value;
var startingAngle = document.querySelector("#startingAngle").value;
var lengthAngle = Math.abs(startingAngle - endingAngle);
console.log(startingAngle, endingAngle, lengthAngle);
var ctx = canvas.getContext("2d");
var balls = [];
var spd = 0.05;
class Ball {
  constructor(d, step, color, radius) {
    this.radius = radius;
    this.step = step;
    this.d = d;
    this.color = color;
    this.angle = 0;
    this.count = 0;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.hasCollided = false;
  }
  drawBall() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.d, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    this.count += this.step;

    this.angle = -(
      Math.cos(this.count) * (lengthAngle / 2) +
      lengthAngle / 2 +
      startingAngle
    );
    this.angle = this.count;
    this.x = this.radius * Math.cos(this.angle) + 300;
    this.y = this.radius * Math.sin(this.angle) + 300;
  }
}

function gameCounter() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball) => {
    ball.drawBall();
  });
  for (let i = 0; i < balls.length - 1; i++) {
    ctx.strokeStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.moveTo(balls[i].x, balls[i].y);
    ctx.lineTo(balls[i + 1].x, balls[i + 1].y);
    ctx.stroke();
  }

  timer = window.requestAnimationFrame(gameCounter);
}

function main(params) {
  var n = 60;
  for (let i = 0; i < n; i++) {
    balls.push(
      new Ball(
        4,
        (Math.PI / 8) * spd * ((60 - n + i) / 60),
        "#" + Math.floor(Math.random() * 16777215).toString(16),
        (200 / n) * i + 50
      )
    );
  }

  window.requestAnimationFrame(gameCounter);
}

main();
