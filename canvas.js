// git test

var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

//player objects

const balls = [];
const friction = 0.9;
const gravity = 1;

// for (let i = 0; i < 6; i++) {
//   balls.push(
//     new Circle(
//       i < 3 ? 100 : canvas.width - 100,
//       i < 3 ? 110 * (i + 2) : 110 * (i - 1),
//       50,
//       i < 3 ? "red" : "yellow"
//     )
//   );
// }
balls.push(new Circle(canvas.width - 200, canvas.height / 2 + 25, 50, "white"));
balls.push(new Circle(500, canvas.height / 2 + 25, 50, "red"));
balls.push(new Circle(500 - 90, canvas.height / 2 - 55 + 25, 50, "red"));
balls.push(new Circle(500 - 90, canvas.height / 2 + 55 + 25, 50, "red"));

balls.push(
	new Circle(500 - 90 - 90, canvas.height / 2 + 55 + 55 + 25, 50, "red")
);
balls.push(new Circle(500 - 90 - 90, canvas.height / 2 + 25, 50, "red"));
balls.push(new Circle(500 - 90 - 90, canvas.height / 2 - 110 + 25, 50, "red"));

// pythag collision detection
function getDistance(x1, y1, x2, y2) {
	let xDistance = x2 - x1;
	let yDistance = y2 - y1;
	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

const showDistance = (ball1, ball2) => {
	let xDistance = ball2.x - ball1.x;
	let yDistance = ball2.y - ball1.y;
	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
};

const getCollision = (a, b) => {
	return (
		getDistance(a.x, a.y, b.x, b.y) > -(a.radius + b.radius) &&
		getDistance(a.x, a.y, b.x, b.y) < a.radius + b.radius
	);
};

// circle constructor
function Circle(x, y, radius, colour) {
	this.dx = 0;
	this.dy = 0;
	this.x = x;
	this.y = y;
	this.tableFriction = () => {
		if (this.dx > 0.1 || this.dx < -0.1) {
			this.dx *= friction;
		} else {
			this.dx = 0;
		}
		if (this.dy > 0.1 || this.dy < -0.1) {
			this.dy *= friction;
		} else {
			this.dy = 0;
		}
	};
	this.radius = radius;
	this.colour = colour;
	this.angle = () => Math.atan2(this.dy, this.dx);
	this.speed = () => Math.sqrt(this.dx * this.dx + this.dy * this.dy);
	this.mass = () => Math.pow(this.radius, 3);
	this.bounce = () => {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}
	};
	this.update = function() {
		if (this.y + this.radius > canvas.height) {
			this.dy += 0;
			this.y = canvas.height - this.radius;
		} else {
			this.dy += 1;
		}
		this.y += this.dy;
		this.x += this.dx;
		// this.tableFriction();
		this.bounce();
		this.draw();
	};
	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		c.fillStyle = this.colour;
		c.fill();
		c.closePath();
	};
}

// const bounce = ball => {
// 	if (ball.x + ball.radius > innerWidth || ball.x - ball.radius < 0) {
// 		ball.dx = -ball.dx;
// 	}
// 	if (ball.y + ball.radius > innerHeight || ball.y - ball.radius < 0) {
// 		ball.dy = -ball.dy;
// 	}
// };

// const friction = ball => {
// 	if (ball.dx > 0.1 || ball.dx < -0.1) {
// 		ball.dx *= ball.friction;
// 	} else {
// 		ball.dx = 0;
// 	}
// 	if (ball.dy > 0.1 || ball.dy < -0.1) {
// 		ball.dy *= ball.friction;
// 	} else {
// 		ball.dy = 0;
// 	}
// };

// const move = ball => {
// 	ball.x += ball.dx;
// 	ball.y += ball.dy;
// };

const circleOnCircle2d = (a, b) => {
	let phi = Math.atan2(a.y - b.y, a.x - b.x);
	const aSpeed = a.speed();
	const bSpeed = b.speed();
	const aAngle = a.angle();
	const bAngle = b.angle();
	const aMass = a.mass();
	const bMass = b.mass();

	let newVxA =
		((aSpeed * Math.cos(aAngle - phi) * (aMass - bMass) +
			2 * bMass * bSpeed * Math.cos(bAngle - phi)) /
			(aMass + bMass)) *
			Math.cos(phi) +
		aSpeed * Math.sin(aAngle - phi) * Math.cos(phi + Math.PI / 2);

	let newVyA =
		((aSpeed * Math.cos(aAngle - phi) * (aMass - bMass) +
			2 * bMass * bSpeed * Math.cos(bAngle - phi)) /
			(aMass + bMass)) *
			Math.sin(phi) +
		aSpeed * Math.sin(aAngle - phi) * Math.sin(phi + Math.PI / 2);

	let newVxB =
		((bSpeed * Math.cos(bAngle - phi) * (bMass - aMass) +
			2 * aMass * aSpeed * Math.cos(aAngle - phi)) /
			(bMass + aMass)) *
			Math.cos(phi) +
		bSpeed * Math.sin(bAngle - phi) * Math.cos(phi + Math.PI / 2);

	let newVyB =
		((bSpeed * Math.cos(bAngle - phi) * (bMass - aMass) +
			2 * aMass * aSpeed * Math.cos(aAngle - phi)) /
			(bMass + aMass)) *
			Math.sin(phi) +
		bSpeed * Math.sin(bAngle - phi) * Math.sin(phi + Math.PI / 2);

	a.dx = newVxA;
	a.dy = newVyA;
	b.dx = newVxB;
	b.dy = newVyB;
};

// animation function
function animate() {
	c.clearRect(0, 0, innerWidth, innerHeight);

	balls.forEach(ball => {
		for (let i = 0; i < balls.length; i++) {
			getCollision(ball, balls[i]) && circleOnCircle2d(ball, balls[i]);
		}

		// friction(ball);
		ball.update();
	});
	requestAnimationFrame(animate);
}

//calling it to start
animate();

var x = 0;
var y = 0;

document.addEventListener("mousedown", ({ clientX, clientY }) => {
	x = clientX;
	y = clientY;
});

const throwBall = (ball, dx, dy) => {
	ball.dx = dx;
	ball.dy = dy;
};

document.addEventListener("mouseup", ({ clientX, clientY }) => {
	for (let i = 0; i < balls.length; i++) {
		if (getCollision(balls[i], { x, y, radius: 0 })) {
			throwBall(
				balls[i],
				Math.round((clientX - x) / 10),
				Math.round((clientY - y) / 10)
			);
		}
	}
});
