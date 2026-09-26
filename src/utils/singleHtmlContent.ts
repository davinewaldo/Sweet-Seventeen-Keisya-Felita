// Self-contained single-file HTML generator for offline or single-file deployment
export const standaloneSingleHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Happy Sweet 17th Birthday Keisya Felita! 💖🎂</title>
  
  <!-- Google Fonts: Poppins (Teks Utama) & Dancing Script (Judul Elegan) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Canvas Confetti Library -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
  
  <style>
    :root {
      --pink-soft: #FFF5F7;
      --pink-pastel: #FCE7F3;
      --pink-card: #FDF2F4;
      --pink-primary: #EC4899;
      --pink-deep: #DB2777;
      --pink-fanta: #BE185D;
      --gold-accent: #F59E0B;
      --gold-light: #FEF3C7;
      --text-main: #374151;
      --text-muted: #6B7280;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Poppins', sans-serif;
      background-color: var(--pink-soft);
      color: var(--text-main);
      overflow-x: hidden;
      line-height: 1.6;
    }

    .font-script {
      font-family: 'Dancing Script', cursive;
    }

    /* Container */
    .container {
      max-width: 1140px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Preloader */
    #preloader {
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, #FCE7F3 0%, #FFF1F2 50%, #FBCFE8 100%);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.6s ease, visibility 0.6s ease;
    }

    #preloader.hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    .preloader-card {
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(10px);
      padding: 40px 30px;
      border-radius: 28px;
      border: 2px solid #FBCFE8;
      box-shadow: 0 20px 40px rgba(236, 72, 153, 0.15);
      text-align: center;
      max-width: 440px;
      width: 90%;
      animation: floatPulse 3s ease-in-out infinite;
    }

    @keyframes floatPulse {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    .btn-open {
      background: linear-gradient(135deg, #EC4899 0%, #F43F5E 100%);
      color: #fff;
      font-weight: 600;
      font-size: 16px;
      padding: 14px 28px;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      box-shadow: 0 8px 20px rgba(236, 72, 153, 0.4);
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-top: 20px;
      width: 100%;
      justify-content: center;
    }

    .btn-open:hover {
      transform: scale(1.03);
      box-shadow: 0 12px 25px rgba(236, 72, 153, 0.5);
    }

    /* Top Nav */
    header {
      padding: 18px 0;
      border-bottom: 1px solid rgba(236, 72, 153, 0.15);
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(8px);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .nav-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand-logo {
      font-family: 'Dancing Script', cursive;
      font-size: 30px;
      font-weight: 700;
      color: var(--pink-primary);
      text-decoration: none;
    }

    nav a {
      color: var(--text-main);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      margin-left: 22px;
      transition: color 0.2s;
    }

    nav a:hover {
      color: var(--pink-primary);
    }

    /* Hero */
    .hero {
      text-align: center;
      padding: 55px 0 25px;
    }

    .badge {
      display: inline-block;
      padding: 6px 16px;
      background: #FCE7F3;
      color: var(--pink-deep);
      border-radius: 50px;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 15px;
      border: 1px solid #FBCFE8;
    }

    .hero h1 {
      font-family: 'Dancing Script', cursive;
      font-size: clamp(38px, 6vw, 68px);
      color: var(--pink-deep);
      margin-bottom: 12px;
      line-height: 1.15;
    }

    .hero-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 14px;
      max-width: 600px;
      margin: 25px auto 0;
    }

    .stat-card {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(4px);
      padding: 14px;
      border-radius: 18px;
      border: 1px solid #FBCFE8;
      text-align: left;
    }

    .stat-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--pink-primary);
      margin-bottom: 4px;
    }

    .stat-val {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-main);
    }

    /* Cake Section */
    .cake-section {
      text-align: center;
      padding: 40px 0;
    }

    .cake-card {
      background: #ffffff;
      border: 2px solid #FBCFE8;
      border-radius: 28px;
      max-width: 420px;
      margin: 0 auto;
      padding: 35px 25px;
      box-shadow: 0 15px 35px rgba(236, 72, 153, 0.12);
      cursor: pointer;
      position: relative;
      transition: transform 0.25s, box-shadow 0.25s;
    }

    .cake-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(236, 72, 153, 0.2);
    }

    .candles {
      display: flex;
      justify-content: center;
      gap: 30px;
      height: 90px;
      align-items: flex-end;
      margin-bottom: -5px;
    }

    .candle {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .flame {
      width: 16px;
      height: 26px;
      background: linear-gradient(to top, #F97316, #FBBF24, #FEF08A);
      border-radius: 50% 50% 20% 20%;
      filter: drop-shadow(0 0 10px #F59E0B);
      animation: flicker 0.6s infinite alternate ease-in-out;
      transform-origin: bottom center;
    }

    @keyframes flicker {
      0% { transform: scale(1) rotate(-2deg); }
      100% { transform: scale(1.1) rotate(2deg); filter: drop-shadow(0 0 14px #FBBF24); }
    }

    .flame.blown {
      display: none;
    }

    .smoke {
      display: none;
      font-size: 20px;
      animation: puff 1s ease-out;
    }

    .flame.blown + .smoke {
      display: block;
    }

    @keyframes puff {
      0% { opacity: 0; transform: translateY(5px); }
      50% { opacity: 1; }
      100% { opacity: 0; transform: translateY(-15px); }
    }

    .candle-stick {
      width: 32px;
      height: 55px;
      background: linear-gradient(to right, #F472B6, #FDA4AF, #F472B6);
      border-radius: 6px 6px 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: #9D174D;
      font-size: 18px;
      border: 1px solid #FB7185;
    }

    .cake-top {
      width: 170px;
      height: 50px;
      background: linear-gradient(to right, #FBCFE8, #FCE7F3, #FBCFE8);
      border: 2px solid #F472B6;
      border-radius: 16px 16px 0 0;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Dancing Script', cursive;
      font-size: 22px;
      font-weight: 700;
      color: #BE185D;
    }

    .cake-bottom {
      width: 250px;
      height: 65px;
      background: linear-gradient(to right, #F472B6, #FDA4AF, #F472B6);
      border: 2px solid #EC4899;
      border-radius: 16px 16px 0 0;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 600;
      color: #831843;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .cake-plate {
      width: 280px;
      height: 12px;
      background: linear-gradient(to right, #FDE68A, #FEF08A, #FDE68A);
      border-radius: 12px;
      margin: 0 auto;
      border: 1px solid #F59E0B;
    }

    /* Polaroid Scrapbook Gallery */
    .gallery-section {
      padding: 60px 0;
    }

    .upload-box {
      max-width: 600px;
      margin: 0 auto 35px;
      background: #ffffff;
      padding: 16px 20px;
      border-radius: 18px;
      border: 2px solid #FBCFE8;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      box-shadow: 0 4px 15px rgba(236, 72, 153, 0.08);
      text-align: left;
    }

    .btn-upload {
      background: linear-gradient(135deg, #EC4899 0%, #F43F5E 100%);
      color: #fff;
      font-weight: 600;
      font-size: 13px;
      padding: 10px 18px;
      border: none;
      border-radius: 14px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 32px;
      margin-top: 25px;
    }

    .polaroid {
      background: #ffffff;
      padding: 14px 14px 22px;
      border-radius: 8px;
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      cursor: pointer;
    }

    .polaroid:nth-child(1) { transform: rotate(-3deg); }
    .polaroid:nth-child(2) { transform: rotate(2deg); }
    .polaroid:nth-child(3) { transform: rotate(-2deg); }
    .polaroid:nth-child(4) { transform: rotate(3deg); }
    .polaroid:nth-child(5) { transform: rotate(-3deg); }
    .polaroid:nth-child(6) { transform: rotate(2deg); }
    .polaroid:nth-child(7) { transform: rotate(-1deg); }

    .polaroid:hover {
      transform: scale(1.06) rotate(0deg) !important;
      box-shadow: 0 20px 35px rgba(236, 72, 153, 0.25);
      z-index: 10;
    }

    .tape {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%) rotate(-1deg);
      width: 85px;
      height: 22px;
      background: rgba(254, 205, 211, 0.85);
      border-left: 2px dashed rgba(244, 114, 182, 0.5);
      border-right: 2px dashed rgba(244, 114, 182, 0.5);
      z-index: 5;
    }

    .polaroid-img-box {
      width: 100%;
      aspect-ratio: 4/5;
      background: #FDF2F4;
      overflow: hidden;
      border: 1px solid #E5E7EB;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .polaroid-img-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .polaroid-caption {
      font-family: 'Dancing Script', cursive;
      font-size: 22px;
      font-weight: 700;
      color: #1F2937;
      text-align: center;
      margin-top: 12px;
    }

    .polaroid-file {
      font-family: monospace;
      font-size: 11px;
      color: #9CA3AF;
      text-align: center;
    }

    /* Final Reveal */
    .reveal-section {
      text-align: center;
      padding: 70px 0 100px;
    }

    .reveal-box {
      background: linear-gradient(135deg, #FFF1F2 0%, #FCE7F3 100%);
      border: 2px solid #F472B6;
      border-radius: 30px;
      padding: 50px 30px;
      max-width: 720px;
      margin: 0 auto;
      box-shadow: 0 25px 50px rgba(236, 72, 153, 0.2);
    }

    .btn-reveal {
      background: linear-gradient(135deg, #EC4899 0%, #E11D48 100%);
      color: #fff;
      font-weight: 700;
      font-size: 18px;
      padding: 16px 36px;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      box-shadow: 0 10px 25px rgba(236, 72, 153, 0.45);
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 12px;
    }

    .btn-reveal:hover {
      transform: scale(1.05);
      box-shadow: 0 15px 35px rgba(236, 72, 153, 0.6);
    }

    .secret-letter {
      display: none;
      background: #ffffff;
      padding: 35px 25px;
      border-radius: 20px;
      border: 2px solid #FBCFE8;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
      text-align: left;
      margin-top: 30px;
      animation: fadeIn 0.5s ease forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .letter-body {
      font-size: 15px;
      line-height: 1.8;
      color: #1F2937;
      white-space: pre-line;
      background: #FFF5F7;
      padding: 24px;
      border-radius: 16px;
      border: 1px solid #FCE7F3;
      margin-bottom: 20px;
      font-weight: 500;
    }

    .ui-banner {
      background: linear-gradient(to right, #FEF3C7, #FDE68A);
      padding: 16px;
      border-radius: 14px;
      border: 1px solid #F59E0B;
      color: #78350F;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 14px;
    }

    /* Floating Music Player */
    .floating-player {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border: 2px solid #F472B6;
      border-radius: 20px;
      padding: 12px 16px;
      box-shadow: 0 12px 30px rgba(236, 72, 153, 0.25);
      display: flex;
      align-items: center;
      gap: 14px;
      z-index: 999;
    }

    .disc {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #111827;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #F472B6;
      font-size: 20px;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }

    .disc.spinning {
      animation: spin 3s linear infinite;
    }

    @keyframes spin {
      100% { transform: rotate(360deg); }
    }

    .player-btn {
      background: #EC4899;
      color: #fff;
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      box-shadow: 0 4px 10px rgba(236, 72, 153, 0.3);
    }
  </style>
</head>
<body>

  <!-- INPUT FILE TERSEMBUNYI UNTUK UNGGAH FOTO -->
  <input type="file" id="batchInput" accept="image/*" multiple style="display:none;" onchange="handleBatchUpload(event)">
  <input type="file" id="singleInput" accept="image/*" style="display:none;" onchange="handleSingleUpload(event)">

  <!-- PRELOADER -->
  <div id="preloader">
    <div class="preloader-card">
      <div style="font-size: 12px; font-weight: 700; color: #EC4899; text-transform: uppercase; letter-spacing: 2px;">
        ✨ Special Delivery ✨
      </div>
      <h1 class="font-script" style="font-size: 44px; color: #DB2777; margin: 10px 0;">
        Keisya Felita
      </h1>
      <p style="font-size: 14px; color: #6B7280;">
        A Sweet Seventeen Birthday Surprise is Waiting For You!
      </p>
      <div style="margin: 15px 0; font-size: 13px; color: #9D174D; font-weight: 600;">
        27 September 2009 • Sweet 17th Birthday 🎂
      </div>
      <button class="btn-open" onclick="unlockSurprise()">
        Buka Kejutan! 💌
      </button>
    </div>
  </div>

  <!-- FLOATING MUSIC PLAYER -->
  <div class="floating-player">
    <div class="disc" id="musicDisc" onclick="toggleMusic()">
      🎵
    </div>
    <div>
      <div style="font-size: 10px; font-weight: 700; color: #EC4899; text-transform: uppercase;">
        Musik Latar
      </div>
      <div style="font-size: 12px; font-weight: 700; color: #1F2937;">
        OMI – Cheerleader
      </div>
      <div style="font-size: 11px; color: #6B7280;">
        Felix Jaehn Remix 🎧
      </div>
    </div>
    <button class="player-btn" id="playBtn" onclick="toggleMusic()">
      ▶
    </button>
  </div>

  <!-- HIDDEN YOUTUBE IFRAME -->
  <iframe id="ytPlayer" style="display:none;" width="200" height="200" src="https://www.youtube.com/embed/jGflCSOWAM8?enablejsapi=1&version=3&loop=1&playlist=jGflCSOWAM8" allow="autoplay; encrypted-media"></iframe>

  <!-- NAVIGATION -->
  <header>
    <div class="container nav-wrapper">
      <a href="#" class="brand-logo">Keisya's 17th 🌸</a>
      <nav>
        <a href="#kue">Kue Ultah</a>
        <a href="#galeri">Galeri Kenangan</a>
        <a href="#pesan">Pesan Spesial</a>
      </nav>
    </div>
  </header>

  <!-- HERO SECTION -->
  <section class="hero container">
    <div class="badge">🌸 Sweet Seventeen Celebration · 27 September 2009</div>
    <h1>Happy Sweet Seventeen, Keisya Felita! 🎉</h1>
    <p style="font-size: 16px; color: #4B5563; max-width: 600px; margin: 0 auto;">
      Selamat memasuki usia 17 tahun yang manis, penuh warna, dan kebahagiaan tak terhingga!
    </p>

    <!-- 3 HIGHLIGHTS CARDS -->
    <div class="hero-stats">
      <div class="stat-card">
        <div class="stat-label">📅 Tanggal Lahir</div>
        <div class="stat-val">27 September 2009</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">🎂 Usia Baru</div>
        <div class="stat-val">17 Tahun (KTP!)</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">🎓 Target Impian</div>
        <div class="stat-val">Universitas Indonesia</div>
      </div>
    </div>
  </section>

  <!-- VIRTUAL CAKE SECTION -->
  <section id="kue" class="cake-section container">
    <div class="badge">🎂 Tiup Lilin Ulang Tahun</div>
    <h2 class="font-script" style="font-size: 42px; color: #EC4899; margin-bottom: 12px;">
      Make a 17th Birthday Wish!
    </h2>

    <!-- Mic Control Bar -->
    <div style="max-width:380px; margin:0 auto 20px; background:#fff; padding:12px 18px; border-radius:18px; border:2px solid #FBCFE8; box-shadow:0 4px 15px rgba(236,72,153,0.08); display:flex; flex-direction:column; gap:8px;">
      <div style="display:flex; align-items:center; justify-content:space-between; width:100%;">
        <div style="text-align:left;">
          <div style="font-size:12px; font-weight:700; color:#1F2937;">🎤 Mode Tiup Mikrofon</div>
          <div style="font-size:11px; color:#6B7280;" id="micStatusText">Aktifkan agar bisa ditiup langsung via nafas</div>
        </div>
        <button id="btnToggleMic" onclick="toggleMicBlow()" style="background:linear-gradient(135deg, #EC4899 0%, #F43F5E 100%); color:#fff; border:none; padding:8px 14px; border-radius:12px; font-size:12px; font-weight:700; cursor:pointer;">
          Aktifkan Mic 🎤
        </button>
      </div>
      <!-- Meter -->
      <div id="micMeterBox" style="display:none; width:100%;">
        <div style="display:flex; justify-content:space-between; font-size:10px; color:#6B7280; margin-bottom:3px;">
          <span>Sensor Hembusan Nafas 💨</span>
          <span id="micVolVal" style="font-weight:700; color:#EC4899;">0%</span>
        </div>
        <div style="width:100%; height:6px; background:#FCE7F3; border-radius:6px; overflow:hidden;">
          <div id="micVolBar" style="width:0%; height:100%; background:#EC4899; transition:width 0.08s;"></div>
        </div>
      </div>
    </div>

    <div class="cake-card" id="cakeCard" onclick="blowCandles()">
      <div id="cakeBadge" style="display: inline-block; background: #EC4899; color: #fff; font-size: 12px; font-weight: 700; padding: 4px 14px; border-radius: 20px; margin-bottom: 15px;">
        👉 Klik Kuenya atau Tiup Lilin! 💨
      </div>

      <div class="candles">
        <div class="candle">
          <div class="flame" id="flame1"></div>
          <div class="smoke">💨</div>
          <div class="candle-stick">1</div>
        </div>
        <div class="candle">
          <div class="flame" id="flame2"></div>
          <div class="smoke">💨</div>
          <div class="candle-stick">7</div>
        </div>
      </div>

      <div class="cake-top">Keisya 17th</div>
      <div class="cake-bottom">Sweet &amp; Loved</div>
      <div class="cake-plate"></div>

      <div id="cakeStatus" style="margin-top: 20px; font-size: 14px; color: #4B5563;">
        Pejamkan mata, buat harapan indah, lalu klik kuenya! ✨
      </div>
    </div>
  </section>

  <!-- SCRAPBOOK POLAROID GALLERY -->
  <section id="galeri" class="gallery-section container">
    <div style="text-align: center;">
      <div class="badge">📸 Scrapbook Polaroid Memories</div>
      <h2 class="font-script" style="font-size: 44px; color: #EC4899;">
        Galeri Kenangan Manis Kei
      </h2>
      <p style="color: #6B7280; font-size: 15px;">
        Tujuh momen berharga menuju usia Sweet Seventeen 💖
      </p>
    </div>

    <!-- Upload Box Bar -->
    <div class="upload-box">
      <div>
        <strong style="color:#9D174D; font-size:14px;">📸 Pasang Foto Asli dari HP/Laptop:</strong>
        <p style="color:#6B7280; font-size:12px; margin-top:2px;">Klik tombol di kanan untuk memilih 1 s/d 7 foto, atau klik kartu foto mana saja untuk menggantinya!</p>
      </div>
      <button class="btn-upload" onclick="document.getElementById('batchInput').click()">
        📁 Pilih Foto dari HP/Laptop
      </button>
    </div>

    <div class="gallery-grid">
      <!-- 1 -->
      <div class="polaroid" onclick="selectSinglePhoto('img_1')">
        <div class="tape"></div>
        <div class="polaroid-img-box">
          <img id="img_1" src="IMG_0129.jpg" alt="#1 First Date" onerror="fallbackImg(this, 'IMG_0129.jpg', 'First Date')">
        </div>
        <div class="polaroid-caption">#1 First Date</div>
        <div style="font-size:12px; color:#4B5563; font-style:italic; text-align:center; margin-top:4px;">
          "Momen petualangan yang tak terlupakan bareng keii, seru dan asik poll!"
        </div>
        <div class="polaroid-file" style="margin-top:6px;">IMG_0129.jpg (Klik utk ganti)</div>
      </div>

      <!-- 2 -->
      <div class="polaroid" onclick="selectSinglePhoto('img_2')">
        <div class="tape"></div>
        <div class="polaroid-img-box">
          <img id="img_2" src="IMG_0257.JPG.jpg" alt="#2 Second Date" onerror="fallbackImg(this, 'IMG_0257.JPG.jpg', 'Second Date')">
        </div>
        <div class="polaroid-caption">#2 Second Date</div>
        <div style="font-size:12px; color:#4B5563; font-style:italic; text-align:center; margin-top:4px;">
          "Keliling santai, nyoree, nonton dan ngomong&quot; random yang bikin kangen."
        </div>
        <div class="polaroid-file" style="margin-top:6px;">IMG_0257.JPG.jpg (Klik utk ganti)</div>
      </div>

      <!-- 3 -->
      <div class="polaroid" onclick="selectSinglePhoto('img_3')">
        <div class="tape"></div>
        <div class="polaroid-img-box">
          <img id="img_3" src="IMG_0258.JPG.jpg" alt="#3 On The Road" onerror="fallbackImg(this, 'IMG_0258.JPG.jpg', 'On The Road')">
        </div>
        <div class="polaroid-caption">#3 On The Road</div>
        <div style="font-size:12px; color:#4B5563; font-style:italic; text-align:center; margin-top:4px;">
          "ada 2 pacar ku di frame ini ehh sorry blunderrr."
        </div>
        <div class="polaroid-file" style="margin-top:6px;">IMG_0258.JPG.jpg (Klik utk ganti)</div>
      </div>

      <!-- 4 -->
      <div class="polaroid" onclick="selectSinglePhoto('img_4')">
        <div class="tape"></div>
        <div class="polaroid-img-box">
          <img id="img_4" src="IMG_0352.jpg" alt="#4 Sweet Smile" onerror="fallbackImg(this, 'IMG_0352.jpg', 'Sweet Smile')">
        </div>
        <div class="polaroid-caption">#4 Sweet Smile</div>
        <div style="font-size:12px; color:#4B5563; font-style:italic; text-align:center; margin-top:4px;">
          "papi kepo sapa si keisya inii lo pii."
        </div>
        <div class="polaroid-file" style="margin-top:6px;">IMG_0352.jpg (Klik utk ganti)</div>
      </div>

      <!-- 5 -->
      <div class="polaroid" onclick="selectSinglePhoto('img_5')">
        <div class="tape"></div>
        <div class="polaroid-img-box">
          <img id="img_5" src="IMG_0640 (1).jpg" alt="#5 Gemesin Banget!" onerror="fallbackImg(this, 'IMG_0640 (1).jpg', 'Gemesin Banget!')">
        </div>
        <div class="polaroid-caption">#5 Gemesin Banget!</div>
        <div style="font-size:12px; color:#4B5563; font-style:italic; text-align:center; margin-top:4px;">
          "Si paling ekspresif dan selalu sukses bikin ketawa dengan tingkah gemasnya."
        </div>
        <div class="polaroid-file" style="margin-top:6px;">IMG_0640 (1).jpg (Klik utk ganti)</div>
      </div>

      <!-- 6 -->
      <div class="polaroid" onclick="selectSinglePhoto('img_6')">
        <div class="tape"></div>
        <div class="polaroid-img-box">
          <img id="img_6" src="IMG_0647.jpg" alt="#6 Mirror Selfie" onerror="fallbackImg(this, 'IMG_0647.jpg', 'Mirror Selfie')">
        </div>
        <div class="polaroid-caption">#6 Mirror Selfie</div>
        <div style="font-size:12px; color:#4B5563; font-style:italic; text-align:center; margin-top:4px;">
          "Mirror selfie check! ANJAYY."
        </div>
        <div class="polaroid-file" style="margin-top:6px;">IMG_0647.jpg (Klik utk ganti)</div>
      </div>

      <!-- 7 -->
      <div class="polaroid" onclick="selectSinglePhoto('img_7')">
        <div class="tape"></div>
        <div class="polaroid-img-box">
          <img id="img_7" src="IMG_0671.jpg" alt="#7 Si Paling Rajin!" onerror="fallbackImg(this, 'IMG_0671.jpg', 'Si Paling Rajin!')">
        </div>
        <div class="polaroid-caption">#7 Si Paling Rajin!</div>
        <div style="font-size:12px; color:#4B5563; font-style:italic; text-align:center; margin-top:4px;">
          "Rajin terus sampai masuk UI keii"
        </div>
        <div class="polaroid-file" style="margin-top:6px;">IMG_0671.jpg (Klik utk ganti)</div>
      </div>
    </div>
  </section>

  <!-- FINAL REVEAL SECTION -->
  <section id="pesan" class="reveal-section container">
    <div class="reveal-box">
      <div class="badge">🎁 The Grand Finale</div>
      <h2 class="font-script" style="font-size: 52px; color: #EC4899; margin: 10px 0;">
        The Final Sweet Reveal
      </h2>
      <p style="color: #4B5563; font-size: 16px; margin-bottom: 30px;">
        Ada satu pesan rahasia penuh makna yang disimpan khusus untuk momen Sweet Seventeen ini...
      </p>

      <button class="btn-reveal" id="btnReveal" onclick="openFinalReveal()">
        Buka Pesan Spesial Terakhir 💌✨
      </button>

      <div class="secret-letter" id="secretLetter">
        <div style="font-size: 13px; font-weight: 700; color: #DB2777; margin-bottom: 12px; border-bottom: 1px solid #FCE7F3; padding-bottom: 8px;">
          💌 SURAT SPESIAL UNTUK KEISYA FELITA
        </div>

        <div class="letter-body">
Happy Sweet Seventeen Keisya Felita! 🎉
Akhirnya udah punya KTP, nggak sixteen lagi! 🥳 Semoga kamu tambah dewasa, panjang umur, wish u all the best, Kei! 
Dan yang paling penting: KAMU HARUS KETERIMA DI UI, KEI! 🎓🔥 Harus semangat terus sekolah sama les-nya ya hehehehe. 
Once again, happy birthday ya! I'm so happy u were born this day 17 years ago!! 💖✨🎂
        </div>

        <div class="ui-banner">
          <div style="background: #FBBF24; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 18px; color: #78350F; flex-shrink: 0;">
            UI
          </div>
          <div>
            <strong>Misi Emas: Road to Universitas Indonesia! 🎓🔥</strong><br>
            <span style="font-size: 12px; font-weight: 400;">Semangat terus les dan belajarnya Kei, doa kami selalu menyertai langkahmu!</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- JAVASCRIPT LOGIC -->
  <script>
    // Music Controls
    let isPlaying = false;
    const ytPlayer = document.getElementById('ytPlayer');
    const musicDisc = document.getElementById('musicDisc');
    const playBtn = document.getElementById('playBtn');

    function sendYtCommand(func) {
      if (ytPlayer && ytPlayer.contentWindow) {
        ytPlayer.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: func,
          args: []
        }), '*');
      }
    }

    function toggleMusic() {
      if (isPlaying) {
        sendYtCommand('pauseVideo');
        musicDisc.classList.remove('spinning');
        playBtn.innerText = '▶';
        isPlaying = false;
      } else {
        sendYtCommand('playVideo');
        musicDisc.classList.add('spinning');
        playBtn.innerText = '⏸';
        isPlaying = true;
      }
    }

    // Unlock Preloader
    function unlockSurprise() {
      const preloader = document.getElementById('preloader');
      preloader.classList.add('hidden');
      toggleMusic();
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // Candle Blowing
    let isBlown = false;
    let micStream = null;
    let micAudioCtx = null;
    let micAnimFrame = null;

    function toggleMicBlow() {
      const btn = document.getElementById('btnToggleMic');
      const box = document.getElementById('micMeterBox');
      const text = document.getElementById('micStatusText');

      if (micStream) {
        // Turn off
        if (micAnimFrame) cancelAnimationFrame(micAnimFrame);
        micStream.getTracks().forEach(t => t.stop());
        micStream = null;
        if (micAudioCtx) micAudioCtx.close();
        btn.innerText = 'Aktifkan Mic 🎤';
        btn.style.background = 'linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)';
        text.innerText = 'Aktifkan agar bisa ditiup langsung via nafas';
        box.style.display = 'none';
      } else {
        // Turn on
        navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false } })
          .then(stream => {
            micStream = stream;
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            micAudioCtx = new AudioContext();
            const analyser = micAudioCtx.createAnalyser();
            analyser.fftSize = 512;
            const src = micAudioCtx.createMediaStreamSource(stream);
            src.connect(analyser);

            btn.innerText = 'Matikan Mic';
            btn.style.background = '#F43F5E';
            text.innerText = 'Tiup langsung ke lubang mikrofon HP/laptop! 💨';
            box.style.display = 'block';

            const data = new Uint8Array(analyser.frequencyBinCount);
            function listenBlow() {
              analyser.getByteTimeDomainData(data);
              let sum = 0;
              for (let i = 0; i < data.length; i++) {
                const v = (data[i] - 128) / 128;
                sum += v * v;
              }
              const rms = Math.sqrt(sum / data.length);
              const pct = Math.min(100, Math.round(rms * 250));
              document.getElementById('micVolBar').style.width = pct + '%';
              document.getElementById('micVolVal').innerText = pct + '%';

              if (rms > 0.22 && !isBlown) {
                blowCandles();
              }
              micAnimFrame = requestAnimationFrame(listenBlow);
            }
            listenBlow();
          })
          .catch(err => {
            alert('Akses mikrofon ditolak atau tidak didukung di browser ini. Anda tetap bisa meniup dengan klik kuenya!');
          });
      }
    }

    function blowCandles() {
      const f1 = document.getElementById('flame1');
      const f2 = document.getElementById('flame2');
      const status = document.getElementById('cakeStatus');
      const badge = document.getElementById('cakeBadge');

      if (!isBlown) {
        f1.classList.add('blown');
        f2.classList.add('blown');
        status.innerHTML = '<strong>Yaaay! Lilin berhasil ditiup! 🥳✨</strong><br>Semoga semua impian & cita-cita Keisya tercapai, terutama tembus Universitas Indonesia! 💖🎓';
        badge.innerText = '🎉 Lilin Berhasil Ditiup!';
        badge.style.background = '#10B981';
        isBlown = true;

        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#EC4899', '#F43F5E', '#FBBF24', '#FFFFFF']
        });
      } else {
        confetti({
          particleCount: 60,
          spread: 100,
          origin: { y: 0.6 }
        });
      }
    }

    // Photo Fallback SVG Generator
    function fallbackImg(imgEl, filename, label) {
      imgEl.onerror = null;
      imgEl.src = "data:image/svg+xml;utf8," + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="100%" height="100%">' +
        '<rect width="400" height="500" fill="#FCE7F3"/>' +
        '<circle cx="200" cy="200" r="70" fill="#FBCFE8"/>' +
        '<text x="200" y="215" font-size="48" text-anchor="middle">🌸</text>' +
        '<text x="200" y="320" font-family="sans-serif" font-weight="bold" font-size="16" fill="#9D174D" text-anchor="middle">' + label + '</text>' +
        '<text x="200" y="350" font-family="sans-serif" font-size="12" fill="#6B7280" text-anchor="middle">Klik untuk pasang foto</text>' +
        '<text x="200" y="375" font-family="monospace" font-size="11" fill="#9CA3AF" text-anchor="middle">' + filename + '</text>' +
        '</svg>'
      );
    }

    // IndexedDB for Standalone HTML Persistent Storage
    const IDB_NAME = 'KeisyaPhotosSingleDB';
    function getPhotoDB(callback) {
      const req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = function(e) {
        e.target.result.createObjectStore('photos');
      };
      req.onsuccess = function(e) {
        callback(e.target.result);
      };
    }

    function savePhotoToDB(key, dataUrl) {
      getPhotoDB(function(db) {
        const tx = db.transaction('photos', 'readwrite');
        tx.objectStore('photos').put(dataUrl, key);
      });
    }

    function loadPhotosFromDB() {
      getPhotoDB(function(db) {
        const tx = db.transaction('photos', 'readonly');
        const req = tx.objectStore('photos').openCursor();
        req.onsuccess = function(e) {
          const cursor = e.target.result;
          if (cursor) {
            const el = document.getElementById(cursor.key);
            if (el) el.src = cursor.value;
            cursor.continue();
          }
        };
      });
    }

    window.addEventListener('DOMContentLoaded', loadPhotosFromDB);

    // Compress Image via Canvas
    function compressImgFile(file, callback) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement('canvas');
          let w = img.width, h = img.height;
          const maxW = 1200;
          if (w > maxW) {
            h = Math.round((h * maxW) / w);
            w = maxW;
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          callback(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    // Upload Single Photo
    let currentTargetImgId = null;
    function selectSinglePhoto(imgId) {
      currentTargetImgId = imgId;
      document.getElementById('singleInput').click();
    }

    function handleSingleUpload(event) {
      const file = event.target.files[0];
      if (file && currentTargetImgId) {
        compressImgFile(file, function(dataUrl) {
          document.getElementById(currentTargetImgId).src = dataUrl;
          savePhotoToDB(currentTargetImgId, dataUrl);
          confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
        });
      }
      event.target.value = '';
    }

    // Batch Upload Multiple Photos
    function handleBatchUpload(event) {
      const files = event.target.files;
      if (!files || files.length === 0) return;
      
      const fileArr = Array.from(files);
      const imgElements = ['img_1', 'img_2', 'img_3', 'img_4', 'img_5', 'img_6', 'img_7'];

      fileArr.forEach((file, idx) => {
        if (idx < imgElements.length) {
          const targetId = imgElements[idx];
          compressImgFile(file, function(dataUrl) {
            document.getElementById(targetId).src = dataUrl;
            savePhotoToDB(targetId, dataUrl);
          });
        }
      });

      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      event.target.value = '';
    }

    // Final Reveal Confetti & Letter
    function openFinalReveal() {
      const letter = document.getElementById('secretLetter');
      const btn = document.getElementById('btnReveal');
      letter.style.display = 'block';
      btn.innerText = 'Tembak Confetti Lagi! 🎊';

      const count = 200;
      const defaults = { origin: { y: 0.7 } };

      function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio)
        }));
      }

      fire(0.25, { spread: 26, startVelocity: 55, colors: ['#EC4899', '#FBBF24'] });
      fire(0.2, { spread: 60, colors: ['#F43F5E', '#FFFFFF'] });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }
  </script>
</body>
</html>`;
