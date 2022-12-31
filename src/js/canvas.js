import utils, {randomColor} from './utils'
const { noise } = require('@chriscourses/perlin-noise')

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
class Circle {
  constructor(x, y, radius, color, offset) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.offset = offset;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.draw();
  }
}


// Implementation
let circles = [];
function init() {
  circles = [];

  for (let i = 0; i < 75; i++) {
    circles.push(
        new Circle(
            -30,
            -30,
            10,
            `hsl(${Math.random() * 255}, 50%, 50%)`,
            i * 0.01
        )
    );
  }
}

let time = 0;

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  circles.forEach((circle) => {
    circle.draw();
    circle.y = noise(time + circle.offset) * canvas.height;
    circle.x = noise(time + circle.offset + 20) * canvas.width;
  });

  time += 0.005;
}

init();
animate();
