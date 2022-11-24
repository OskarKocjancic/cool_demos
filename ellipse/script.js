var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var yoffset = canvas.height / 2;
var xoffset = canvas.width / 2;
var ellipse;
var baseVectorX, centerVector;
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  addVector(v2) {
    this.x += v2.x;
    this.y += v2.y;
  }
  scalarProduct(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }
  dotProduct(v2) {
    return this.x * v2.x + this.y * v2.y;
  }
  length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
  angle(v2) {
    return Math.acos(this.dotProduct(v2) / (this.length() * v2.length()));
  }
  print() {
    console.log("x: " + this.x + " y: " + this.y);
  }
}

class Ball {
  constructor(x, y, d) {
    this.position = new Vector(x, y);
    this.d = d;
    this.direction = new Vector(1, 1);
  }
  drawBall() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.d, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    var phi, tmp_vector;

    if (ellipse.checkCollision(this.position.x, this.position.y)) {
      tmp_vector = new Vector(this.position.x, this.position.y);

      if (this.position.y > centerVector.y)
        var angle1 = 2 * Math.PI - tmp_vector.angle(baseVectorX);
      else var angle1 = tmp_vector.angle(baseVectorX);
      var tangentDirection = new Vector(
        1,
        (-ellipse.b / ellipse.a) * Math.tan(angle1)
      );
      console.log(this.position);
      var angle2 = tangentDirection.angle(this.direction);
      angle2 = 2 * (Math.PI - angle2);

      //shit fix god help me
      this.position.x = ellipse.a * Math.cos(angle1) + centerVector.x;
      this.position.y = ellipse.b * Math.sin(angle1) + centerVector.y;
      console.log(this.position);
      this.direction.scalarProduct(-1);
      this.position.addVector(this.direction);
      this.direction.scalarProduct(-1);

      this.direction = new Vector(
        Math.cos(angle2) * this.direction.x -
          Math.sin(angle2) * this.direction.y,
        Math.sin(angle2) * this.direction.x +
          Math.cos(angle2) * this.direction.y
      );
    }

    this.position.addVector(this.direction);
  }
}

class Ellipse {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  drawEllipse() {
    ctx.beginPath();
    ctx.strokeStyle = "#FFFFFF";
    ctx.ellipse(xoffset, yoffset, this.a, this.b, 0, 0, 2 * Math.PI);
    ctx.stroke();
  }
  checkCollision(x, y) {
    return (
      Math.pow(x - xoffset, 2) / Math.pow(this.a, 2) +
        Math.pow(y - yoffset, 2) / Math.pow(this.b, 2) >=
      1
    );
  }
}

function gameCounter() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ellipse.drawEllipse();
  ball.drawBall();
  timer = window.requestAnimationFrame(gameCounter);
}
function main(params) {
  ellipse = new Ellipse(200, 100);
  ball = new Ball(xoffset, yoffset, 10);
  baseVectorX = new Vector(1, 0);
  centerVector = new Vector(xoffset, yoffset);
  window.requestAnimationFrame(gameCounter);
}

main();
