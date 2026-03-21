# 🎮 DOOMINIKS PARADISE - Website

Website komunitas gaming **Doominiks Paradise** — siap hosting di GitHub Pages.

## 📁 Struktur File

```
doominiks-paradise/
├── index.html          ← Halaman utama
├── css/
│   └── style.css       ← Semua styling + efek glow merah
├── js/
│   └── main.js         ← Navigasi, komentar, lamaran
│   └── admin.js        ← Panel admin (terima/tolak)
└── README.md
```

## 🚀 Cara Deploy ke GitHub Pages

1. **Buat repository baru** di GitHub (contoh: `doominiks-paradise`)
2. **Upload semua file** ini ke repository (pertahankan struktur folder)
3. Buka **Settings** → **Pages**
4. Pilih **Branch: main** → **/ (root)** → Klik **Save**
5. Website aktif di: `https://username.github.io/doominiks-paradise`

## ✏️ Cara Edit Konten

### Ganti Link Media Sosial
Buka `index.html`, cari dan ganti teks berikut:
```
YOUR_ROBLOX_MAP_LINK   → Link map Roblox kamu
YOUR_DISCORD_INVITE_LINK → Link invite Discord
YOUR_INSTAGRAM_LINK    → Link Instagram
YOUR_YOUTUBE_LINK      → Link YouTube
YOUR_TIKTOK_LINK       → Link TikTok
YOUR_TWITTER_LINK      → Link Twitter/X
```

### Ganti Password Admin
Buka `js/admin.js`, baris pertama:
```js
const ADMIN_PASSWORD = 'doominiks2025'; // ← Ganti di sini
```

### Ganti Statistik Hero
Buka `index.html`, cari bagian `stats-grid` dan ubah angkanya.

## ⚙️ Fitur

| Fitur | Keterangan |
|-------|-----------|
| 🔴 Efek Glow Merah | Di semua sisi layar, animasi pulse |
| 🧭 Navbar | Responsive, mobile-friendly dengan hamburger menu |
| 🔗 Panel Links | Roblox, Discord, Instagram, YouTube, TikTok, Twitter |
| 💬 Komentar | Form komentar + list komentar (disimpan di localStorage) |
| 📝 Staff Apply | Form lamaran lengkap dengan validasi |
| ⚙️ Admin Panel | Login password, Terima/Tolak/Hapus lamaran & komentar |

## ⚠️ Catatan

- Data komentar & lamaran tersimpan di **localStorage browser** — cocok untuk demo
- Untuk data permanen di server, perlu backend (Firebase, Supabase, dll)
- Ganti semua link `YOUR_*_LINK` sebelum publish

---
© 2025 DOOMINIKS PARADISE · ALL RIGHTS RESERVED