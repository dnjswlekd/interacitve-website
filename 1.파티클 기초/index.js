const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d"); //사용할 도구
console.log(window.devicePixelRatio);

const dpr = window.devicePixelRatio;

const canvasWidth = 300;
const canvasHeight = 300;

canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";

canvas.width = canvasHeight * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr, dpr);

//animation 한프레임마다 다음 위치에 그려줘서 모든 프레임을 재생시켜주면 하나의 애니메이션이 됌

class Particle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  draw() {
    ctx.beginPath(); //그리기 시작하는 곳
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = "red";
    // ctx.stroke();
    ctx.fill();
    ctx.closePath(); //끝나는 곳
  }
}

const x = 100;
const y = 100;
const radius = 50;
const particle = new Particle(x, y, radius);

function animate() {
  window.requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  particle.draw();
}

animate();
