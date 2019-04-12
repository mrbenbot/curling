// 1D collision square
// function Square(x, y, color, size = 100) {
//   this.x = x;
//   this.y = y;
//   this.dx = 0;
//   this.size = size;
//   this.color = color;
//   this.friction = 0.975;
//   this.mass = Math.pow(this.size, 3);
//   this.velocity = this.dx * this.mass;
//   this.draw = () => {
//     c.fillStyle = this.color;
//     c.fillRect(this.x, this.y, this.size, this.size);
//   };
//   this.update = () => {
//     this.draw();
//   };
// }

// const elasticCollision = (a, b) => {
// spongey weird collision
// a.dx = -((a.dx * (a.mass - b.mass) + 2 * b.mass * b.dx) / (a.mass + b.mass));
// b.dx = (b.dx * (b.mass - a.mass) + 2 * a.mass * a.dx) / (a.mass + b.mass);

//   var velocityAx =
//     ((a.mass - b.mass) / (a.mass + b.mass)) * a.dx +
//     ((2 * b.mass) / (a.mass + b.mass)) * b.dx;
//   var velocityBx =
//     ((b.mass - a.mass) / (a.mass + b.mass)) * b.dx +
//     ((2 * a.mass) / (a.mass + b.mass)) * a.dx;
//   var velocityAy =
//     ((a.mass - b.mass) / (a.mass + b.mass)) * a.dy +
//     ((2 * b.mass) / (a.mass + b.mass)) * b.dy;
//   var velocityBy =
//     ((b.mass - a.mass) / (a.mass + b.mass)) * b.dy +
//     ((2 * a.mass) / (a.mass + b.mass)) * a.dy;

//   a.dx = velocityAx;
//   b.dx = velocityBx;
//   a.dy = velocityAy;
//   b.dy = velocityBy;
//   console.log(a.dx, b.dx);
// };

// function displayText(input, size, x, y, colour) {
//   c.font = `${size}px Courier`;
//   c.fillStyle = colour;
//   c.textAlign = "center";
//   c.fillText(input, x, y);
// }
