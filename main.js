// ===========================
// DOOMINIKS PARADISE - MAIN JS
// ===========================

// ---- NAVIGATION ----
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');

  // Close mobile menu
  document.getElementById('navLinks').classList.remove('open');

  // Update active link
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
  if (activeLink) activeLink.classList.add('active');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Set home as active on load
document.addEventListener('DOMContentLoaded', () => {
  showSection('home');
  renderComments();
});

// ---- TOAST ----
function showToast(msg, type = '') {
  const old = document.querySelector('.toast');
  if (old) old.remove();
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

// ---- STORAGE HELPERS ----
function getComments() {
  return JSON.parse(localStorage.getItem('dp_comments') || '[]');
}
function saveComments(arr) {
  localStorage.setItem('dp_comments', JSON.stringify(arr));
}
function getApplications() {
  return JSON.parse(localStorage.getItem('dp_applications') || '[]');
}
function saveApplications(arr) {
  localStorage.setItem('dp_applications', JSON.stringify(arr));
}

// ---- COMMENTS ----
function submitComment() {
  const name = document.getElementById('commentName').value.trim();
  const game = document.getElementById('commentGame').value.trim();
  const text = document.getElementById('commentText').value.trim();

  if (!name || !text) {
    showToast('⚠ Nama dan komentar wajib diisi!');
    return;
  }

  const comment = {
    id: Date.now(),
    name,
    game: game || '—',
    text,
    date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
  };

  const comments = getComments();
  comments.unshift(comment);
  saveComments(comments);

  document.getElementById('commentName').value = '';
  document.getElementById('commentGame').value = '';
  document.getElementById('commentText').value = '';

  renderComments();
  showToast('✓ Komentar berhasil dikirim!', 'success');
}

function renderComments() {
  const list = document.getElementById('commentList');
  if (!list) return;
  const comments = getComments();

  if (comments.length === 0) {
    list.innerHTML = '<p class="empty-msg">Belum ada komentar. Jadilah yang pertama!</p>';
    return;
  }

  list.innerHTML = comments.map(c => `
    <div class="comment-item">
      <div class="comment-header">
        <div class="comment-avatar">${c.name.charAt(0).toUpperCase()}</div>
        <div>
          <div class="comment-name">${escHtml(c.name)}</div>
          <div class="comment-game">${escHtml(c.game)}</div>
        </div>
        <div class="comment-date">${c.date}</div>
      </div>
      <div class="comment-text">${escHtml(c.text)}</div>
    </div>
  `).join('');
}

// ---- STAFF APPLICATION ----
const roleInfo = {
  'Moderator': {
    title: 'MODERATOR — Penjaga Ketertiban',
    desc: 'Bertugas memantau chat, menegakkan aturan komunitas, menangani laporan dari member, dan memastikan lingkungan komunitas tetap kondusif dan aman untuk semua anggota.'
  },
  'Admin map': {
    title: 'ADMIN MAP — Robot map Roblox',
    desc: 'Bertugas menertibkan map, server, atau area dalam game Roblox komunitas. Dibutuhkan Loyalitas tinggi dan pemahaman tentang Roblox Executive.'
  },
  'Staff discord': {
    title: 'STAFF DISCORD — Memantau Komunitas',
    desc: 'Bertugas memantau, memeriksa, memberi informasi komunitas.'
  },
  'Admin discord': {
    title: 'ADMIN DISCORD — Pilar komunitas',
    desc: 'Bertugas menertibkan member, memberi teguran bagi member yang melanggar aturan, melaporkan sesuatu yang janggal kepada ketua.'
  },
  'Developer': {
    title: 'DEVELOPER — Pembuat game',
    desc: 'Bertugas pengembang game, membuat game, mengoptimalkan game, dan mengurus kendala di dalam game.'
  }
};

function updateRoleInfo() {
  const role = document.getElementById('appRole').value;
  const card = document.getElementById('roleInfoCard');
  if (role && roleInfo[role]) {
    document.getElementById('roleInfoTitle').textContent = roleInfo[role].title;
    document.getElementById('roleInfoDesc').textContent = roleInfo[role].desc;
    card.style.display = 'block';
  } else {
    card.style.display = 'none';
  }
}

let currentStep = 1;

function nextStep(step) {
  // Validate current step before going forward
  if (step > currentStep) {
    if (!validateStep(currentStep)) return;
  }

  // Hide current step
  document.getElementById(`form-step-${currentStep}`).style.display = 'none';
  // Update dots
  const dot = document.getElementById(`step-dot-${currentStep}`);
  if (step > currentStep) dot.classList.remove('active'), dot.classList.add('done');
  else dot.classList.remove('done', 'active'), dot.classList.add('active');

  currentStep = step;

  // Update step lines
  document.querySelectorAll('.step-line').forEach((line, i) => {
    line.classList.toggle('done', i + 1 < currentStep);
  });

  // Show target step
  const target = document.getElementById(`form-step-${currentStep}`);
  if (target) {
    target.style.display = 'block';
    document.getElementById(`step-dot-${currentStep}`).classList.add('active');
    document.getElementById(`step-dot-${currentStep}`).classList.remove('done');
  }
}

function validateStep(step) {
  if (step === 1) {
    const roblox  = document.getElementById('appRoblox').value.trim();
    const discord = document.getElementById('appDiscord').value.trim();
    if (!roblox)  { showToast('⚠ Username Roblox wajib diisi!'); return false; }
    if (!discord) { showToast('⚠ Username Discord wajib diisi!'); return false; }
  }
  if (step === 2) {
    const role      = document.getElementById('appRole').value;
    const knowledge = document.getElementById('appKnowledge').value.trim();
    if (!role)                    { showToast('⚠ Pilih role yang ingin dilamar!'); return false; }
    if (knowledge.length < 50)   { showToast('⚠ Penjelasan pengetahuan minimal 50 karakter!'); return false; }
  }
  return true;
}

function submitApplication() {
  const why   = document.getElementById('appWhy').value.trim();
  const agree = document.getElementById('agreeRules').checked;

  if (why.length < 30) { showToast('⚠ Jelaskan motivasimu minimal 30 karakter!'); return; }
  if (!agree)           { showToast('⚠ Kamu harus menyetujui peraturan staff!'); return; }

  const app = {
    id:        Date.now(),
    roblox:    document.getElementById('appRoblox').value.trim(),
    discord:   document.getElementById('appDiscord').value.trim(),
    role:      document.getElementById('appRole').value,
    knowledge: document.getElementById('appKnowledge').value.trim(),
    why,
    agreeRules: true,
    status: 'pending',
    date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
  };

  const apps = getApplications();
  apps.unshift(app);
  saveApplications(apps);

  // Show success
  document.getElementById(`form-step-${currentStep}`).style.display = 'none';
  document.getElementById('applySuccess').style.display = 'block';
  document.querySelectorAll('.step').forEach(s => { s.classList.remove('active'); s.classList.add('done'); });
}

function resetApplication() {
  document.getElementById('applySuccess').style.display = 'none';
  document.getElementById('appRoblox').value    = '';
  document.getElementById('appDiscord').value   = '';
  document.getElementById('appRole').value      = '';
  document.getElementById('appKnowledge').value = '';
  document.getElementById('appWhy').value       = '';
  document.getElementById('agreeRules').checked = false;
  document.getElementById('roleInfoCard').style.display = 'none';

  currentStep = 1;
  document.querySelectorAll('.form-step').forEach(s => s.style.display = 'none');
  document.getElementById('form-step-1').style.display = 'block';
  document.querySelectorAll('.step').forEach((s, i) => {
    s.classList.remove('active', 'done');
    if (i === 0) s.classList.add('active');
  });
  document.querySelectorAll('.step-line').forEach(l => l.classList.remove('done'));
}

// ---- HELPER ----
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}