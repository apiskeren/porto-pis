const judul = document.querySelector('[data-split]');
const kata = judul.textContent.trim().split(' ');
judul.textContent = '';

kata.forEach((k, i) => {
  const kotak = document.createElement('span');
  kotak.className = 'kata';

  const isi = document.createElement('span');
  isi.textContent = k;
  isi.style.animationDelay = (0.1 + i * 0.08) + 's';

  kotak.appendChild(isi);
  judul.appendChild(kotak);
  judul.appendChild(document.createTextNode(' '));
});
const pengamat = new IntersectionObserver((daftar) => {
  daftar.forEach((item) => {
    if (item.isIntersecting) {
      item.target.classList.add('muncul');
      pengamat.unobserve(item.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => {
  pengamat.observe(el);
});
const kanvas = document.getElementById('partikel');
const ctx = kanvas.getContext('2d');
const mouse = { x: -999, y: -999 };

function ukur() {
  kanvas.width = window.innerWidth;
  kanvas.height = window.innerHeight;
}
ukur();
window.addEventListener('resize', ukur);

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
const jumlah = window.innerWidth < 800 ? 35 : 70;
const titik = [];

for (let i = 0; i < jumlah; i++) {
  titik.push({
    x: Math.random() * kanvas.width,
    y: Math.random() * kanvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2 + 1
  });
}
function gambar() {
  ctx.clearRect(0, 0, kanvas.width, kanvas.height);

  titik.forEach((t, i) => {
    t.x += t.vx;
    t.y += t.vy;

    if (t.x < 0 || t.x > kanvas.width) t.vx *= -1;
    if (t.y < 0 || t.y > kanvas.height) t.vy *= -1;

    const dx = t.x - mouse.x;
    const dy = t.y - mouse.y;
    const jarak = Math.hypot(dx, dy);
    if (jarak < 120 && jarak > 0) {
      t.x += (dx / jarak) * 1.5;
      t.y += (dy / jarak) * 1.5;
    }

    ctx.beginPath();
    ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(26, 20, 89, 0.35)';
    ctx.fill();

    for (let j = i + 1; j < titik.length; j++) {
      const d = Math.hypot(t.x - titik[j].x, t.y - titik[j].y);
      if (d < 120) {
        ctx.beginPath();
        ctx.moveTo(t.x, t.y);
        ctx.lineTo(titik[j].x, titik[j].y);
        ctx.strokeStyle = 'rgba(26, 20, 89, ' + 0.15 * (1 - d / 120) + ')';
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(gambar);
}
gambar();
