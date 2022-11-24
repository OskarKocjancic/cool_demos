var ctx, canvas;
var scale;
function setup() {
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");

  // Set display size (css pixels).
  var size = 1000;
  canvas.style.width = size + "px";
  canvas.style.height = size + "px";

  // Set actual size in memory (scaled to account for extra pixel density).
  scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
  canvas.width = size * scale;
  canvas.height = size * scale;

  // Normalize coordinate system to use css pixels.
  ctx.scale(scale, scale);
  ctx.fillStyle = "#2d2e30";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function isPrime(num) {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++)
    if (num % i === 0) return false;
  return num > 1;
}

function drawRect(oldX, oldY, i, x, y, step) {
  ctx.fillStyle = "#7eddd3";
  if (isPrime(i)) {
    ctx.beginPath();
    ctx.fillRect(x, y, 1 * step, 1 * step);

    ctx.stroke();
  }

}

function start(random) {
  setup();
  var x = canvas.width / scale / 2;
  var y = canvas.height / scale / 2;
  var step = 1;
  var count = 3000000;
  var direction = 0;
  var stepCount = 0;
  var thresh = 2;
  var threshCount = 0;
  var oldX, oldY;
  for (let i = random; i < count; i++) {
    drawRect(oldX, oldY, i, x, y, step);

    oldX = x + step / 2;
    oldY = y + step / 2;
    switch (direction) {
      case 0:
        x += step;
        break;
      case 1:
        y -= step;
        break;
      case 2:
        x -= step;
        break;
      case 3:
        y += step;
        break;

      default:
        break;
    }

    stepCount++;
    if (stepCount == thresh - 1) {
      threshCount += 1;
      if (threshCount == 2) {
        threshCount = 0;
        thresh += 1;
      }
      direction = (direction + 1) % 4;
      stepCount = 0;
    }
  }
}

start(1);
