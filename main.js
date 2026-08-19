/* ===========================================================
   Happy Birthday, Tahmina — interactions
   Sections: starfield, progress bar, hero typewriter,
   constellation game, balloons, candle wish, reason cards,
   gift + letter, fireworks finale, confetti + cursor hearts
   =========================================================== */

const CONFETTI_COLORS = ['#e8b84b', '#e6a4a0', '#a8e6cf', '#c9b6e4', '#f6efe4'];

/* -------------------- 0. starfield -------------------- */
(function starfield(){
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let w, h;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = document.documentElement.scrollHeight;
    const count = Math.floor((w * h) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.3 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.8
    }));
  }

  let t = 0;
  function draw(){
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#f6efe4';
    for(const s of stars){
      const twinkle = 0.35 + 0.4 * Math.abs(Math.sin(t * 0.001 * s.speed + s.phase));
      ctx.globalAlpha = twinkle;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    t++;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();

/* -------------------- 1. scroll progress bar -------------------- */
(function progressBar(){
  const bar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = scrolled + '%';
  });
})();

/* -------------------- 2. hero typewriter -------------------- */
(function heroType(){
  const el = document.getElementById('typedName');
  const text = 'Tahmina';
  let i = 0;
  function tick(){
    if(i <= text.length){
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(tick, 140);
    } else {
      el.classList.add('done');
    }
  }
  setTimeout(tick, 900);
})();

/* -------------------- 3. reveal-on-scroll -------------------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

/* -------------------- 4. constellation game -------------------- */
(function constellation(){
  const name = 'TAHMINA';
  const svgW = 500, svgH = 160, margin = 40;
  const positions = [];
  for(let i = 0; i < name.length; i++){
    const x = margin + (i * (svgW - 2 * margin) / (name.length - 1));
    const y = svgH / 2 + Math.sin(i * 1.1) * 28;
    positions.push({ x, y, letter: name[i] });
  }

  const linksG = document.getElementById('links');
  const nodesG = document.getElementById('nodes');
  const hint = document.getElementById('hint');
  const NS = 'http://www.w3.org/2000/svg';

  positions.forEach((p, i) => {
    if(i < positions.length - 1){
      const b = positions[i + 1];
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', p.x); line.setAttribute('y1', p.y);
      line.setAttribute('x2', b.x); line.setAttribute('y2', b.y);
      line.setAttribute('class', 'link');
      line.setAttribute('id', 'link-' + i);
      linksG.appendChild(line);
    }
  });

  let litCount = 0;
  positions.forEach((p, i) => {
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', p.x); c.setAttribute('cy', p.y);
    c.setAttribute('r', 4.5);
    c.setAttribute('class', 'node');
    c.setAttribute('id', 'node-' + i);
    c.addEventListener('click', () => lightStar(i));
    nodesG.appendChild(c);

    const t = document.createElementNS(NS, 'text');
    t.setAttribute('x', p.x); t.setAttribute('y', p.y + 22);
    t.setAttribute('class', 'glabel');
    t.textContent = p.letter;
    nodesG.appendChild(t);
  });

  function lightStar(i){
    const node = document.getElementById('node-' + i);
    if(node.classList.contains('lit')) return;
    if(i !== litCount){
      hint.textContent = 'try the next star in line →';
      return;
    }
    node.classList.add('lit');
    if(i > 0){
      const prevLink = document.getElementById('link-' + (i - 1));
      if(prevLink) prevLink.style.opacity = '.9';
    }
    litCount++;
    hint.textContent = litCount === positions.length
      ? 'her whole name, written in stars ✨'
      : 'keep going…';
  }
})();

/* -------------------- 5. balloons -------------------- */
(function balloons(){
  const field = document.getElementById('balloonField');
  const poppedCountEl = document.getElementById('poppedCount');
  const colors = ['#e8b84b', '#e6a4a0', '#a8e6cf', '#c9b6e4', '#f4d35e', '#f7a1a1', '#9ad1c9', '#b7a6e0'];
  const total = colors.length;
  let popped = 0;
  document.getElementById('totalBalloons').textContent = total;

  colors.forEach((color, i) => {
    const b = document.createElement('div');
    b.className = 'balloon';
    b.style.background = `radial-gradient(circle at 30% 28%, ${lighten(color)}, ${color})`;
    b.style.left = (4 + i * (92 / total) + (Math.random() * 4 - 2)) + '%';
    b.style.animationDuration = (9 + Math.random() * 5) + 's, ' + (3 + Math.random() * 2) + 's';
    b.style.animationDelay = (Math.random() * -8) + 's, ' + (Math.random() * -3) + 's';
    b.addEventListener('click', (e) => {
      if(b.classList.contains('popped')) return;
      b.classList.add('popped');
      popped++;
      poppedCountEl.textContent = popped;
      burstConfetti(e.clientX, e.clientY, 18);
    });
    field.appendChild(b);
  });

  function lighten(hex){
    return hex; // simple: reuse color as core, gradient handles the highlight visually
  }
})();

/* -------------------- 6. candle wish -------------------- */
(function candle(){
  const wishBtn = document.getElementById('wishBtn');
  const flame = document.getElementById('flame');
  const smoke = document.getElementById('smoke');

  wishBtn.addEventListener('click', () => {
    if(wishBtn.disabled) return;
    flame.classList.add('out');
    smoke.classList.add('go');
    wishBtn.textContent = 'wish made ✨';
    wishBtn.disabled = true;
    const rect = wishBtn.getBoundingClientRect();
    burstConfetti(rect.left + rect.width / 2, rect.top, 40);
  });
})();

/* -------------------- 7. reason cards -------------------- */
(function reasons(){
  const reasons = [
    { tag: 'her laugh', text: 'It finds me even on my worst days and rewires the whole room.' },
    { tag: 'her mind', text: 'The way she notices things no one else catches — quietly, generously.' },
    { tag: 'her heart', text: 'Fierce for the people she loves, gentle with everyone else.' },
    { tag: 'the little things', text: 'Bad jokes, late-night talks, and the way she says my name.' },
    { tag: 'her strength', text: 'She carries so much and still shows up soft for the world.' },
    { tag: 'simply, her', text: 'Out of everyone, everywhere — I would still choose her.' }
  ];

  const grid = document.getElementById('reasonsGrid');
  reasons.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'reason-card reveal';
    card.style.transitionDelay = (i * 0.08) + 's';
    card.innerHTML = `
      <div class="reason-inner">
        <div class="reason-face reason-front">
          <div class="num">0${i + 1}</div>
          <div class="tag">${r.tag}</div>
        </div>
        <div class="reason-face reason-back">${r.text}</div>
      </div>
    `;
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    grid.appendChild(card);
    revealObserver.observe(card);
  });
})();

/* also observe section titles generally */
document.querySelectorAll('.section-title, .section-sub').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* -------------------- 8. gift + letter -------------------- */
(function gift(){
  const box = document.getElementById('gift');
  const giftHint = document.getElementById('giftHint');
  const letter = document.getElementById('letter');
  const letterText = document.getElementById('letterText');
  const message = `Tahmina, some people search their whole lives for one person who feels like home. I just got lucky enough to find you. Every year with you has been softer, warmer, and a little more magical than the last — and I'm endlessly grateful I get to keep collecting these years by your side. So here's to you: to your laugh I'd know anywhere, to the way you make ordinary days feel worth remembering, and to every wish still waiting to come true.`;

  let opened = false;
  box.addEventListener('click', () => {
    if(opened) return;
    opened = true;
    box.classList.add('open');
    giftHint.textContent = 'a little something for you';
    setTimeout(() => {
      letter.classList.add('show');
      typeWriter(letterText, message, 18);
    }, 500);
  });

  function typeWriter(el, text, speed){
    let i = 0;
    el.textContent = '';
    (function step(){
      if(i < text.length){
        el.textContent += text[i];
        i++;
        setTimeout(step, speed);
      }
    })();
  }
})();

/* -------------------- 9. fireworks finale -------------------- */
(function fireworks(){
  const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d');
  const btn = document.getElementById('fireworksBtn');
  let particles = [];
  let running = false;

  function resize(){
    const section = document.getElementById('finale-section');
    canvas.width = section.clientWidth;
    canvas.height = section.clientHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function spawnBurst(x, y){
    const count = 46;
    const hue = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    for(let i = 0; i < count; i++){
      const angle = (Math.PI * 2 * i) / count;
      const speed = 1.5 + Math.random() * 3.5;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: hue,
        size: 1.5 + Math.random() * 1.5
      });
    }
  }

  function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.035;
      p.alpha -= 0.012;
      ctx.globalAlpha = Math.max(p.alpha, 0);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    particles = particles.filter(p => p.alpha > 0);
    if(particles.length > 0){
      requestAnimationFrame(loop);
    } else {
      running = false;
    }
  }

  btn.addEventListener('click', () => {
    for(let i = 0; i < 5; i++){
      setTimeout(() => {
        spawnBurst(
          canvas.width * (0.2 + Math.random() * 0.6),
          canvas.height * (0.2 + Math.random() * 0.4)
        );
        if(!running){ running = true; loop(); }
      }, i * 350);
    }
  });
})();

/* -------------------- 10. shared confetti burst (DOM) -------------------- */
function burstConfetti(x, y, count){
  for(let i = 0; i < count; i++){
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    piece.style.background = color;
    piece.style.left = x + 'px';
    piece.style.top = y + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';

    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 120;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 40;
    const rotate = Math.random() * 720 - 360;
    const duration = 700 + Math.random() * 500;

    document.body.appendChild(piece);
    const anim = piece.animate([
      { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy + 160}px) rotate(${rotate}deg)`, opacity: 0 }
    ], { duration, easing: 'cubic-bezier(.2,.6,.3,1)' });

    anim.onfinish = () => piece.remove();
  }
}

/* -------------------- 11. cursor hearts (light touch) -------------------- */
(function cursorHearts(){
  let last = 0;
  document.addEventListener('click', (e) => {
    const now = Date.now();
    if(now - last < 120) return;
    last = now;
    const heart = document.createElement('div');
    heart.className = 'cursor-heart';
    heart.textContent = '♥';
    heart.style.left = (e.clientX - 6) + 'px';
    heart.style.top = (e.clientY - 6) + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1600);
  });
})();
