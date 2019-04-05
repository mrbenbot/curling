// git test

var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

//player objects
let CurlingBall = new Circle(100, 100, 50, "pink");
let CurlingBall2 = new Circle(800, 100, 50, "lightblue");

// volume

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
  if (
    getDistance(a.x, a.y, b.x, b.y) >= -(a.radius + b.radius) &&
    getDistance(a.x, a.y, b.x, b.y) <= a.radius + b.radius
  ) {
    return true;
  }
};

// function displayText(input, size, x, y, colour) {
//   c.font = `${size}px Courier`;
//   c.fillStyle = colour;
//   c.textAlign = "center";
//   c.fillText(input, x, y);
// }

// circle constructor
function Circle(x, y, radius, colour) {
  this.dx = 0;
  this.dy = 0;
  this.x = x;
  this.y = y;
  this.angle = () => Math.atan2(this.dy, this.dx);
  this.speed = () => Math.sqrt(this.dx * this.dx + this.dy * this.dy);
  this.friction = 0.975;
  this.radius = radius;
  this.colour = colour;
  this.update = function() {
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

const bounce = ball => {
  if (ball.x + ball.radius > innerWidth || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.radius > innerHeight || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
  }
};

const friction = ball => {
  if (ball.dx > 0.1 || ball.dx < -0.1) {
    ball.dx *= ball.friction;
  } else {
    ball.dx = 0;
  }
  if (ball.dy > 0.1 || ball.dy < -0.1) {
    ball.dy *= ball.friction;
  } else {
    ball.dy = 0;
  }
};

const move = ball => {
  ball.x += ball.dx;
  ball.y += ball.dy;
};

const hit = () => {
  if (getCollision(CurlingBall, CurlingBall2)) {
    if (CurlingBall.speed() > CurlingBall2.speed()) {
      CurlingBall2.dx = CurlingBall.dx;
      CurlingBall2.dy = CurlingBall.dy;
      CurlingBall.dx = 0;
      CurlingBall.dy = 0;
    } else {
      CurlingBall.dx = CurlingBall2.dx;
      CurlingBall.dy = CurlingBall2.dy;
      CurlingBall2.dx = 0;
      CurlingBall2.dy = 0;
    }
  }
};

// animation function
function animate() {
  c.clearRect(0, 0, innerWidth, innerHeight);
  hit();

  friction(CurlingBall);
  bounce(CurlingBall);
  move(CurlingBall);

  friction(CurlingBall2);
  bounce(CurlingBall2);
  move(CurlingBall2);

  CurlingBall2.update();
  CurlingBall.update();

  console.log("angle 1: ", CurlingBall.angle() * 57.2958);
  console.log("speed 1: ", CurlingBall.speed());
  console.log("distnace: ", showDistance(CurlingBall, CurlingBall2));
  console.log(Math.sin(CurlingBall.angle()) * CurlingBall.speed());
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
  if (getCollision(CurlingBall, { x, y, radius: 0 })) {
    throwBall(
      CurlingBall,
      Math.round((clientX - x) / 10),
      Math.round((clientY - y) / 10)
    );
  }
  if (getCollision(CurlingBall2, { x, y, radius: 0 })) {
    throwBall(
      CurlingBall2,
      Math.round((clientX - x) / 10),
      Math.round((clientY - y) / 10)
    );
  }
});
