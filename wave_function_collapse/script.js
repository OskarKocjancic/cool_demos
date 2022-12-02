var ctx, canvas;
var scale;
var grid;
var cellSize = 50;
var gridSize = 20;
var interval;
var intervalCounter = 0;

var processedCellsStack = [];
function setup() {
	canvas = document.querySelector("canvas");
	ctx = canvas.getContext("2d");
}

const generateGrid = (width, height) => {
	grid = new Array(width);
	for (let i = 0; i < grid.length; i++) {
		grid[i] = new Array(height);
		for (let j = 0; j < grid[i].length; j++) {
			grid[i][j] = new Cell(i, j, CellTypes.EMPTY);
		}
	}
};

const drawGrid = () => {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			grid[i][j].draw(false);
		}
	}
};

const CellTypes = {
	UP: "tiles/up.png",
	DOWN: "tiles/down.png",
	LEFT: "tiles/left.png",
	RIGHT: "tiles/right.png",
	BLANK: "tiles/blank.png",
	EMPTY: "tiles/empty.png",
};

class Cell {
	x;
	y;
	typeOfCell;
	availableCellTypes = [CellTypes.UP, CellTypes.DOWN, CellTypes.LEFT, CellTypes.RIGHT, CellTypes.BLANK];
	constructor(_x, _y, _typeOfCell) {
		this.x = _x;
		this.y = _y;
		this.typeOfCell = _typeOfCell;
	}
	draw(entropy) {
		var img = new Image();
		img.src = this.typeOfCell;

		img.onload = () => {
			ctx.drawImage(img, this.x * cellSize, this.y * cellSize);
			if (entropy) ctx.fillText(this.availableCellTypes.length, this.x * cellSize, this.y * cellSize + cellSize);
		};
	}
	changeCellType(newTypeOfCell) {
		this.typeOfCell = newTypeOfCell;
		this.availableCellTypes = [];
		this.updateSurroundingCells();
	}
	updateSurroundingCells() {
		var x = this.x; //get i and j values for navigation
		var y = this.y;
		var k = 0;
		switch (this.typeOfCell) {
			case CellTypes.UP:
				var toRemove = [
					[CellTypes.RIGHT, CellTypes.BLANK], //r
					[CellTypes.LEFT, CellTypes.BLANK], //l
					[CellTypes.LEFT, CellTypes.RIGHT, CellTypes.UP], //d
					[CellTypes.BLANK, CellTypes.UP], //u
				];
				break;
			case CellTypes.DOWN:
				var toRemove = [
					[CellTypes.RIGHT, CellTypes.BLANK],
					[CellTypes.LEFT, CellTypes.BLANK],
					[CellTypes.BLANK, CellTypes.DOWN],
					[CellTypes.RIGHT, CellTypes.LEFT, CellTypes.DOWN],
				];
				break;
			case CellTypes.LEFT:
				var toRemove = [
					[CellTypes.LEFT, CellTypes.UP, CellTypes.DOWN],
					[CellTypes.LEFT, CellTypes.BLANK],
					[CellTypes.DOWN, CellTypes.BLANK],
					[CellTypes.UP, CellTypes.BLANK],
				];
				break;
			case CellTypes.RIGHT:
				var toRemove = [
					[CellTypes.RIGHT, CellTypes.BLANK],
					[CellTypes.RIGHT, CellTypes.UP, CellTypes.DOWN],
					[CellTypes.DOWN, CellTypes.BLANK],
					[CellTypes.UP, CellTypes.BLANK],
				];
				break;
			case CellTypes.BLANK:
				var toRemove = [
					[CellTypes.DOWN, CellTypes.LEFT, CellTypes.UP],
					[CellTypes.DOWN, CellTypes.RIGHT, CellTypes.UP],
					[CellTypes.RIGHT, CellTypes.LEFT, CellTypes.UP],
					[CellTypes.RIGHT, CellTypes.LEFT, CellTypes.DOWN],
				];
				break;
			default:
				break;
		}
		var positions = [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		];
		positions.forEach((p) => {
			try {
				var neighboringCell = grid[x + p[0]][y + p[1]];
				if (x + p[0] < grid.length && y + p[1] < grid[x + p[0]].length && neighboringCell.availableCellTypes.length != 0) {
					toRemove[k].forEach((c) => {
						if (neighboringCell.availableCellTypes.indexOf(c) != -1) {
							neighboringCell.availableCellTypes.splice(neighboringCell.availableCellTypes.indexOf(c), 1);
						}
					});
				}
			} catch (error) {}
			k++;
		});
	}
}

function findLowestEntropy() {
	let min = Number.MAX_VALUE;
	var arrOfLowestEntropies = [];
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			min = grid[i][j].availableCellTypes.length < min && grid[i][j].availableCellTypes.length != 0 ? grid[i][j].availableCellTypes.length : min;
		}
	}
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j].availableCellTypes.length == min) arrOfLowestEntropies.push(grid[i][j]);
		}
	}
	return arrOfLowestEntropies[Math.floor(Math.random() * arrOfLowestEntropies.length)];
}

function updateCellWithLowestEntropy() {
	var cell = findLowestEntropy();
	if (cell != undefined) {
		cell.changeCellType(cell.availableCellTypes[Math.floor(Math.random() * cell.availableCellTypes.length)]);
		processedCellsStack.push(cell);
	}
}
function start() {
	setup();
	console.log(canvas.height);
	generateGrid(gridSize, gridSize);
	for (let i = 0; i < gridSize * gridSize; i++) {
		updateCellWithLowestEntropy();
	}
	drawGrid();
}
