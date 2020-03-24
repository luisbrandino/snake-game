const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

const grid = 20;

const keysDx = {
	w: {
		dx: 0,
		dy: -grid
	},
	s: {
		dx: 0,
		dy: grid
	}
}

const keysDy = {
	a: {
		dx: -grid,
		dy: 0
	},
	d: {
		dx: grid,
		dy: 0
	}
}

var snake = {
	x: grid * 3,
	y: 0,
	dx: grid,
	dy: 0,
	blocks: 3,
	trails: []
};

var fruit = {
	x: 0,
	y: 0
};

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

fruit.x = random(0, 24) * grid;
fruit.y = random(0, 24) * grid;

function main() {

	snake.x += snake.dx;
	snake.y += snake.dy;

	if (snake.x >= canvas.width) {
		snake.x = 0;
	} else if (snake.x < 0) {
		snake.x = canvas.width;
	}

	if (snake.y >= canvas.width) {
		snake.y = 0;
	} else if (snake.y < 0) {
		snake.y = canvas.width
	}

	snake.trails.push({
		x: snake.x,
		y: snake.y
	});

	if (snake.trails.length > snake.blocks) {
		snake.trails.shift();
	}

	snake.trails.forEach((t, i) => {
		if (i != snake.trails.length - 1) {
			if (t.x == snake.x && t.y == snake.y) {
				snake = {
					x: grid * 3,
					y: 0,
					dx: grid,
					dy: 0,
					blocks: 3,
					trails: []
				};
				fruit.x = random(0, 24) * grid;
				fruit.y = random(0, 24) * grid;
				return false;
			}
		}
	});

	snake.trails.forEach(t => {
		if (t.x == fruit.x && t.y == fruit.y) {
			snake.blocks += 1;
			fruit.x = random(0, 24) * grid;
			fruit.y = random(0, 24) * grid;
		}
	});

	ctx.clearRect(0, 0, canvas.width, canvas.width);
	ctx.fillStyle = 'red';

	ctx.fillRect(fruit.x, fruit.y, grid - 1, grid - 1);

	ctx.fillStyle = 'green';
	snake.trails.forEach(t => {
		ctx.fillRect(t.x, t.y, grid - 1, grid - 1);
	})
}

window.addEventListener("keydown", (e) => {
	try {
		if (snake.dx != 0) {
			snake.dx = keysDx[e.key].dx;
			snake.dy = keysDx[e.key].dy;
		} else {
			snake.dx = keysDy[e.key].dx;
			snake.dy = keysDy[e.key].dy;
		}
	} catch (err) {
		return false;
	}
})

setInterval(main, 125)