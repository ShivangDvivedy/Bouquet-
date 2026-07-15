// ===================================================================
// Content — straight from the bouquet plan
// ===================================================================
const BOUQUET_CARDS = [
  { type:'rose',       title:'Favourite Person', message:"You're my favourite person." },
  { type:'blossom',    title:'Your Smile',       message:"Your smile is my favourite place." },
  { type:'tulip',      title:'Thank You',        message:"Thank you for choosing me every single day." },
  { type:'lily',       title:'Safe Place',       message:"I hope you always feel safe with me." },
  { type:'daisy',      title:'Believe',          message:"I'm proud of you." },
  { type:'lavender',   title:'Always',           message:"No matter what happens… I'm here." },
  { type:'rose-warm',  title:'Home',             message:"You're home." },
  { type:'peony',      title:'Together',         message:"You make ordinary days feel special." },
  { type:'sunflower',  title:'Forever',          message:"You're the best thing that happened to me." },
  { type:'bouquet',    title:'Open Me',          message:"I love every version of you." }
];

// ===================================================================
// Flower illustrations — minimal, elegant inline SVGs (no cartoon
// outlines, muted palette pulled straight from the site's colour
// tokens). Each one returns a self-contained <svg> string.
// ===================================================================
function petalPath(len, wid){
  const hw = (wid / 2).toFixed(1);
  const l = len.toFixed(1);
  return `M0,0 C-${hw},-${(len*0.32).toFixed(1)} -${hw},-${(len*0.78).toFixed(1)} 0,-${l} C${hw},-${(len*0.78).toFixed(1)} ${hw},-${(len*0.32).toFixed(1)} 0,0 Z`;
}
function petalRing(cx, cy, count, len, wid, fill, offset = 0, opacity = 1){
  let out = '';
  for (let i = 0; i < count; i++){
    const a = i * (360 / count) + offset;
    out += `<path d="${petalPath(len, wid)}" fill="${fill}" opacity="${opacity}" transform="translate(${cx} ${cy}) rotate(${a})"/>`;
  }
  return out;
}
function stem(cx, topY, leafSide = 1){
  return `<line x1="${cx}" y1="${topY}" x2="${cx}" y2="112" stroke="var(--leaf)" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M${cx} ${topY+22} q${10*leafSide} -4 ${14*leafSide} 5 q-${10*leafSide} 4 -${14*leafSide} -5 Z" fill="var(--leaf)"/>`;
}

const FLOWER_BUILDERS = {
  rose(cx=50, cy=58){
    let s = petalRing(cx, cy, 6, 32, 21, 'var(--deep-rose)', 0, .95);
    s += petalRing(cx, cy, 5, 22, 16, 'var(--rose)', 22, 1);
    s += petalRing(cx, cy, 4, 12, 10, 'var(--rose-soft)', 45, 1);
    s += `<circle cx="${cx}" cy="${cy}" r="3.5" fill="var(--rose-soft)"/>`;
    s += stem(cx, cy + 28);
    return s;
  },
  'rose-warm'(){
    let s = petalRing(50, 58, 6, 32, 21, 'var(--rose)', 0, .95);
    s += petalRing(50, 58, 5, 22, 16, 'var(--rose-soft)', 22, 1);
    s += petalRing(50, 58, 4, 12, 10, 'var(--gold)', 45, .9);
    s += `<circle cx="50" cy="58" r="3.5" fill="var(--gold)"/>`;
    s += stem(50, 86, -1);
    return s;
  },
  blossom(){
    let s = petalRing(50, 55, 5, 20, 20, 'var(--rose-soft)', 0, 1);
    s += petalRing(50, 55, 5, 12, 13, 'var(--paper)', 0, .5);
    for (let i = 0; i < 5; i++){
      const a = i * 72 * (Math.PI/180);
      s += `<line x1="50" y1="55" x2="${(50+7*Math.sin(a)).toFixed(1)}" y2="${(55-7*Math.cos(a)).toFixed(1)}" stroke="var(--gold)" stroke-width="1"/>`;
    }
    s += `<circle cx="50" cy="55" r="3" fill="var(--gold)"/>`;
    s += stem(50, 74);
    return s;
  },
  tulip(){
    let s = '';
    [-34, 0, 34].forEach(a => {
      s += `<path d="${petalPath(38, 20)}" fill="var(--rose)" transform="translate(50 62) rotate(${a})"/>`;
    });
    s += `<path d="${petalPath(30, 14)}" fill="var(--deep-rose)" opacity=".8" transform="translate(50 62)"/>`;
    s += stem(50, 70);
    s += stem(50, 90, -1);
    return s;
  },
  lily(){
    let s = petalRing(50, 60, 6, 36, 12, 'var(--paper)', 0, 1);
    for (let i = 0; i < 6; i++){
      const a = i * 60 * (Math.PI/180);
      const x = (50 + 26*Math.sin(a)).toFixed(1), y = (60 - 26*Math.cos(a)).toFixed(1);
      s += `<line x1="50" y1="60" x2="${x}" y2="${y}" stroke="var(--gold)" stroke-width=".8" opacity=".7"/>`;
    }
    for (let i = 0; i < 6; i++){
      const a = 30 + i * 60 * (Math.PI/180);
      const x = (50 + 14*Math.sin(a)).toFixed(1), y = (60 - 14*Math.cos(a)).toFixed(1);
      s += `<circle cx="${x}" cy="${y}" r="1.6" fill="var(--gold)"/>`;
    }
    s += `<circle cx="50" cy="60" r="3" fill="var(--gold)"/>`;
    s += stem(50, 88);
    return s;
  },
  daisy(){
    let s = petalRing(50, 58, 14, 26, 8, 'var(--paper)', 0, 1);
    s += `<circle cx="50" cy="58" r="7" fill="var(--gold)"/>`;
    s += stem(50, 82);
    return s;
  },
  lavender(){
    let s = `<line x1="50" y1="30" x2="50" y2="110" stroke="var(--leaf)" stroke-width="2" stroke-linecap="round"/>`;
    for (let y = 34; y < 68; y += 7){
      s += `<ellipse cx="${(50-4).toFixed(1)}" cy="${y}" rx="4.5" ry="3" fill="var(--lavender)" transform="rotate(-20 ${50-4} ${y})"/>`;
      s += `<ellipse cx="${(50+4).toFixed(1)}" cy="${y+3.5}" rx="4.5" ry="3" fill="var(--lavender)" transform="rotate(20 ${50+4} ${y+3.5})"/>`;
    }
    return s;
  },
  peony(){
    let s = petalRing(50, 58, 8, 30, 19, 'var(--rose-soft)', 0, .9);
    s += petalRing(50, 58, 7, 22, 16, 'var(--paper)', 15, .95);
    s += petalRing(50, 58, 6, 14, 12, 'var(--rose-soft)', 30, 1);
    s += petalRing(50, 58, 5, 7, 7, 'var(--gold)', 10, .9);
    s += stem(50, 82);
    return s;
  },
  sunflower(){
    let s = petalRing(50, 58, 16, 30, 10, 'var(--gold)', 0, 1);
    s += `<circle cx="50" cy="58" r="9" fill="var(--sun-center)"/>`;
    for (let i = 0; i < 10; i++){
      const a = i * 36 * (Math.PI/180);
      const r = 4 + (i % 2) * 2.5;
      s += `<circle cx="${(50+r*Math.sin(a)).toFixed(1)}" cy="${(58-r*Math.cos(a)).toFixed(1)}" r=".9" fill="var(--gold)" opacity=".6"/>`;
    }
    s += stem(50, 84);
    return s;
  },
  bouquet(){
    let s = '';
    s += `<g transform="translate(-10 6) scale(.55)">${FLOWER_BUILDERS.rose(50,58)}</g>`;
    s += `<g transform="translate(12 4) scale(.55)">${FLOWER_BUILDERS['rose-warm']()}</g>`;
    s += `<g transform="translate(1 -14) scale(.6)">${FLOWER_BUILDERS.rose(50,58)}</g>`;
    s += `<path d="M38 96 Q50 88 62 96 L58 106 Q50 100 42 106 Z" fill="var(--gold)" opacity=".85"/>`;
    s += `<line x1="50" y1="96" x2="50" y2="114" stroke="var(--leaf)" stroke-width="2.5" stroke-linecap="round"/>`;
    return s;
  }
};

function flowerSVG(type){
  const build = FLOWER_BUILDERS[type] || FLOWER_BUILDERS.rose;
  return `<svg viewBox="0 0 100 120" aria-hidden="true">${build()}</svg>`;
}

const HIDDEN_NOTES = [
  "Sometimes I don't know how to express everything. Maybe I don't always show it the right way. But one thing is always true… You matter to me more than you know.",
  "Tu meri life ki sabse special person hai. Sabse best. Aur honestly… Mujhe kisi aur ki zarurat hi nahi lagti.",
  "Jo tu kahegi… Jaha tu chalegi… Jaisa tu sochegi… I'm all in. Always.",
  "Thank you for trusting me. Thank you for letting me love you.",
  "Whenever life gets difficult… Remember… You don't have to fight alone anymore. You have me. Always.",
  "If someday you forget how amazing you are… I'll remind you. Every single time.",
  "My favourite notification is your message. My favourite smile is yours. My favourite person will always be you."
];

const BONUS_NOTE = "Warning ⚠️ — Ab itna pyaar padh liya hai… to lifetime membership cancel nahi hogi. 😌❤️";

const MEMORIES = [
  "Our random late-night talks.",
  "Tera \u201chmmm\u201d jab tu sochti hai.",
  "Teri hasi.",
  "Every good morning.",
  "Every good night.",
  "Har wo moment jo sirf tere hone se better ban gaya."
];

const PASS_PERKS = [
  "Unlimited hugs",
  "Random forehead kisses",
  "Mood swing support",
  "2 AM calls",
  "Unlimited motivation before exams",
  "Happy dance celebrations",
  "One personal cheerleader forever"
];

// ===================================================================
// Build flower tag cards
// ===================================================================
function buildTagGrid(){
  const grid = document.getElementById('tagGrid');
  BOUQUET_CARDS.forEach(({ type, title, message }, i) => {
    const card = document.createElement('div');
    card.className = 'tag-card';
    card.style.setProperty('--i', i);
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${title}, tap to reveal`);

    const sparkles = [
      { top: '8%',  left: '12%', delay: '0s'   },
      { top: '18%', left: '82%', delay: '1.1s' },
      { top: '68%', left: '78%', delay: '2.2s' }
    ].map(p => `<span class="sparkle" style="top:${p.top};left:${p.left};animation-delay:${p.delay}"></span>`).join('');

    card.innerHTML = `
      <div class="tag-card-inner">
        <div class="tag-face tag-front">
          ${sparkles}
          <div class="flower-float"><div class="flower-sway">${flowerSVG(type)}</div></div>
          <span class="tag-title">${title}</span>
          <span class="tag-hint">Tap to Reveal ❤️</span>
        </div>
        <div class="tag-face tag-back">
          <p>${message}</p>
        </div>
      </div>
    `;

    const flip = () => card.classList.toggle('is-flipped');
    card.addEventListener('click', flip);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
    });

    grid.appendChild(card);
  });
}

// ===================================================================
// Build hidden notes (unfold one at a time)
// ===================================================================
function buildNotes(){
  const stack = document.getElementById('notesStack');
  HIDDEN_NOTES.forEach((text, i) => {
    const note = document.createElement('div');
    note.className = 'note-fold';
    note.tabIndex = 0;
    note.setAttribute('role', 'button');
    note.setAttribute('aria-label', `Hidden note ${i + 1}, tap to unfold`);

    note.innerHTML = `
      <div class="note-fold-label">
        <span>Note ${i + 1}</span>
        <span class="note-fold-mark">+</span>
      </div>
      <p class="note-fold-body">${text}</p>
    `;

    const toggle = () => note.classList.toggle('is-open');
    note.addEventListener('click', toggle);
    note.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });

    stack.appendChild(note);
  });

  // bonus note — the funny one, tucked in last
  const bonus = document.createElement('div');
  bonus.className = 'note-fold note-fold-bonus';
  bonus.tabIndex = 0;
  bonus.setAttribute('role', 'button');
  bonus.setAttribute('aria-label', 'Bonus note, tap to unfold');
  bonus.innerHTML = `
    <div class="note-fold-label">
      <span>Bonus find</span>
      <span class="note-fold-mark">+</span>
    </div>
    <p class="note-fold-body">${BONUS_NOTE}</p>
  `;
  const toggleBonus = () => bonus.classList.toggle('is-open');
  bonus.addEventListener('click', toggleBonus);
  bonus.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleBonus(); }
  });
  stack.appendChild(bonus);
}

// ===================================================================
// Build memory list
// ===================================================================
function buildMemories(){
  const list = document.getElementById('memoryList');
  MEMORIES.forEach((text) => {
    const li = document.createElement('li');
    li.className = 'memory-item';
    li.innerHTML = `<span class="memory-heart">❤</span><span>${text}</span>`;
    list.appendChild(li);
  });
}

// ===================================================================
// Build Batman pass perks
// ===================================================================
function buildPassPerks(){
  const list = document.getElementById('passPerks');
  PASS_PERKS.forEach((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    list.appendChild(li);
  });
}

// ===================================================================
// Envelope open interaction
// ===================================================================
function setupEnvelope(){
  const envelope = document.getElementById('envelope');
  const music = document.getElementById('bgMusic');
  const open = () => {
    envelope.classList.add('is-open');
    envelope.setAttribute('aria-label', 'Envelope opened');
    if (music) {
      music.volume = 0.7;
      music.play().catch(() => { /* browser blocked autoplay — she can tap again */ });
    }
    setTimeout(() => {
      document.getElementById('opening').scrollIntoView({ behavior: 'smooth' });
    }, 1300);
  };
  envelope.addEventListener('click', open);
  envelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });
}

// ===================================================================
// Scroll reveal
// ===================================================================
function setupScrollReveal(){
  const sections = document.querySelectorAll('.reveal-section');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.18 });
  sections.forEach((s) => io.observe(s));
}

// ===================================================================
// Ambient falling petals — quiet, occasional, respects reduced motion
// ===================================================================
function setupPetals(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  const field = document.getElementById('petals');
  const glyphs = ['❤', '✿', '❀'];

  function spawn(){
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    p.style.left = Math.random() * 100 + 'vw';
    const duration = 8 + Math.random() * 6;
    p.style.animationDuration = duration + 's';
    p.style.fontSize = (10 + Math.random() * 10) + 'px';
    field.appendChild(p);
    setTimeout(() => p.remove(), duration * 1000 + 200);
  }

  setInterval(spawn, 1400);
  spawn();
}

// ===================================================================
// Secret note — a genuine easter egg.
// The heart button only appears once she's scrolled all the way to the
// finale, so finding it actually means she explored everything.
// ===================================================================
function setupSecretNote(){
  const heart = document.getElementById('secretHeart');
  const overlay = document.getElementById('secretOverlay');
  const closeBtn = document.getElementById('secretClose');
  const finale = document.getElementById('finale');

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) heart.classList.add('is-visible');
    });
  }, { threshold: 0.5 });
  io.observe(finale);

  const open = () => {
    overlay.classList.add('is-visible');
    overlay.setAttribute('aria-hidden', 'false');
  };
  const close = () => {
    overlay.classList.remove('is-visible');
    overlay.setAttribute('aria-hidden', 'true');
  };

  heart.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

// ===================================================================
// Init
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {
  buildTagGrid();
  buildNotes();
  buildMemories();
  buildPassPerks();
  setupEnvelope();
  setupScrollReveal();
  setupPetals();
  setupSecretNote();
});
