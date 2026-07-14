// ===================================================================
// Content — straight from the bouquet plan
// ===================================================================
const FLOWER_TAGS = [
  "You're my favourite person.",
  "Thank you for choosing me every single day.",
  "I'm proud of you.",
  "Your smile is my favourite place.",
  "I hope you always feel safe with me.",
  "No matter what happens… I'm here.",
  "You're home.",
  "You make ordinary days feel special.",
  "You're the best thing that happened to me.",
  "I love every version of you."
];

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
  FLOWER_TAGS.forEach((text, i) => {
    const card = document.createElement('div');
    card.className = 'tag-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Flower tag ${i + 1}, tap to reveal`);

    card.innerHTML = `
      <div class="tag-card-inner">
        <div class="tag-face tag-front">
          <span class="tag-num">${String(i + 1).padStart(2,'0')}</span>
        </div>
        <div class="tag-face tag-back">
          <p>${text}</p>
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
  const open = () => {
    envelope.classList.add('is-open');
    envelope.setAttribute('aria-label', 'Envelope opened');
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
