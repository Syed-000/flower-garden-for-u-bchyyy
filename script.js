const canvas = document.getElementById("garden");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = [
  "#ff6ec7", "#ffd86f", "#8cfffb", "#ff9f1c", "#ff4d6d",
  "#c77dff", "#4cc9f0", "#80ff72", "#f72585", "#ffd166"
];

let autoBloom = false;
let autoInterval;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

canvas.addEventListener("click", e => {
  bloom(e.clientX, e.clientY);
});

document.getElementById("autoBloom").addEventListener("click", () => {
  autoBloom = !autoBloom;
  if (autoBloom) {
    autoInterval = setInterval(() => {
      bloom(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );
    }, 300);
  } else {
    clearInterval(autoInterval);
  }
});

document.getElementById("clear").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function bloom(x, y) {
  const petals = 6;
  const color = colors[Math.floor(Math.random() * colors.length)];
  let grow = 0;

  function animate() {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;

    for (let i = 0; i < petals; i++) {
      ctx.rotate((Math.PI * 2) / petals);
      ctx.beginPath();
      ctx.ellipse(0, grow, grow / 2, grow, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    if (grow < 20) {
      grow += 1;
      requestAnimationFrame(animate);
    }
  }
  animate();
}
