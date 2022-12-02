var ctx, canvas;
function setup() {
	canvas = document.querySelector("canvas");
	ctx = canvas.getContext("2d");
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	ctx.fillStyle = "#2d2e30";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function isPrime(num) {
	for (let i = 2, s = Math.sqrt(num); i <= s; i++) if (num % i === 0) return false;
	return num > 1;
}

function drawRect(i, x, y, step) {
	ctx.fillStyle = "#7eddd3";
	if (isPrime(i)) {
		ctx.beginPath();
		ctx.fillRect(x, y, 1 * step, 1 * step);
		ctx.stroke();
	}
}

function start(random) {
	setup();
	var x = canvas.width / 2;
	var y = canvas.height / 2;
	var step = 1;
	var count = ctx.canvas.width *ctx.canvas.width;
	var direction = 0;
	var stepCount = 0;
	var thresh = 2;
	var threshCount = 0;
	var oldX, oldY;
	for (let i = random; i < count; i++) {
		drawRect(i, x, y, step);

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
