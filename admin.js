// ===========================
// DOOMINIKS PARADISE - ADMIN JS
// ===========================

// !! GANTI PASSWORD DI BAWAH INI !!
const ADMIN_PASSWORD = 'doominiks2025';

let adminLoggedIn = false;

function adminLogin() {
  const pass = document.getElementById('adminPass').value;
  if (pass === ADMIN_PASSWORD) {
    adminLoggedIn = true;
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    renderAdminApplications();
    renderAdminComments();
    showToast('✓ Login berhasil! Selamat datang, Admin.', 'success');
  } else {
    showToast('⚠ Password salah!');
    document.getElementById('adminPass').value = '';
  }
}

// Allow enter key on password field
document.addEventListener('DOMContentLoaded', () => {
  const passField = document.getElementById('adminPass');
  if (passField) {
    passField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') adminLogin();
    });
  }
});

// ---- TAB SWITCHING ----
function switchTab(tab) {
  document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  document.getElementById(`tab-${tab}`).style.display = 'block';
  event.target.classList.add('active');

  if (tab === 'applications') renderAdminApplications();
  if (tab === 'commentsAdmin') renderAdminComments();
}

// ---- RENDER APPLICATIONS ----
function renderAdminApplications() {
  const list = document.getElementById('applicationsList');
  const apps = getApplications();

  if (apps.length === 0) {
    list.innerHTML = '<p class="empty-msg">Belum ada lamaran masuk.</p>';
    return;
  }

  list.innerHTML = apps.map(app => {
    const badgeClass = app.status === 'accepted' ? 'badge-accepted' :
                       app.status === 'rejected'  ? 'badge-rejected' : 'badge-pending';
    const badgeText  = app.status === 'accepted' ? '✓ DITERIMA' :
                       app.status === 'rejected'  ? '✗ DITOLAK' : '⏳ PENDING';

    return `
      <div class="app-card" id="app-${app.id}">
        <div class="app-card-header">
          <div>
            <div class="app-name">${escHtml(app.roblox)}</div>
            <div class="app-role">${escHtml(app.role)}</div>
          </div>
          <span class="app-badge ${badgeClass}">${badgeText}</span>
        </div>
        <div class="app-details">
          <span><strong>Roblox:</strong> ${escHtml(app.roblox)}</span>
          <span><strong>Discord:</strong> ${escHtml(app.discord)}</span>
          <span><strong>Tanggal:</strong> ${escHtml(app.date)}</span>
          <span><strong>Setuju Aturan:</strong> <span style="color:#00dc50">✓ Ya</span></span>
        </div>
        <div class="app-label">PENGETAHUAN TENTANG TUGAS</div>
        <div class="app-text-block">${escHtml(app.knowledge || app.exp || '—')}</div>
        <div class="app-label">ALASAN & MOTIVASI MELAMAR</div>
        <div class="app-text-block">${escHtml(app.why)}</div>
        <div class="app-actions">
          <button class="btn-accept" onclick="updateAppStatus(${app.id}, 'accepted')">✓ TERIMA</button>
          <button class="btn-reject" onclick="updateAppStatus(${app.id}, 'rejected')">✗ TOLAK</button>
          <button class="btn-delete" onclick="deleteApplication(${app.id})">🗑 HAPUS</button>
        </div>
      </div>
    `;
  }).join('');
}

function updateAppStatus(id, status) {
  const apps = getApplications();
  const idx = apps.findIndex(a => a.id === id);
  if (idx === -1) return;
  apps[idx].status = status;
  saveApplications(apps);
  renderAdminApplications();
  const msg = status === 'accepted' ? '✓ Lamaran DITERIMA!' : '✗ Lamaran DITOLAK.';
  showToast(msg, status === 'accepted' ? 'success' : '');
}

function deleteApplication(id) {
  if (!confirm('Hapus lamaran ini?')) return;
  const apps = getApplications().filter(a => a.id !== id);
  saveApplications(apps);
  renderAdminApplications();
  showToast('Lamaran dihapus.');
}

// ---- RENDER COMMENTS ADMIN ----
function renderAdminComments() {
  const list = document.getElementById('commentsAdminList');
  const comments = getComments();

  if (comments.length === 0) {
    list.innerHTML = '<p class="empty-msg">Belum ada komentar.</p>';
    return;
  }

  list.innerHTML = comments.map(c => `
    <div class="app-card" id="comment-${c.id}">
      <div class="app-card-header">
        <div>
          <div class="app-name">${escHtml(c.name)}</div>
          <div class="app-role">${escHtml(c.game)}</div>
        </div>
        <span style="font-size:0.75rem;color:var(--text-dim)">${c.date}</span>
      </div>
      <div class="app-text-block">${escHtml(c.text)}</div>
      <div class="app-actions">
        <button class="btn-delete" onclick="deleteComment(${c.id})">🗑 HAPUS KOMENTAR</button>
      </div>
    </div>
  `).join('');
}

function deleteComment(id) {
  if (!confirm('Hapus komentar ini?')) return;
  const comments = getComments().filter(c => c.id !== id);
  saveComments(comments);
  renderAdminComments();
  renderComments();
  showToast('Komentar dihapus.');
}