# ⚡ Liquid Reveal — Developer Portfolio & Admin CMS

<div align="center">

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black&style=for-the-badge)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge)](#)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase&logoColor=white&style=for-the-badge)](#)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Deployment-F38020?logo=cloudflare&logoColor=white&style=for-the-badge)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

An editorial, futuristic, single-page developer portfolio centered around an interactive **Liquid Reveal** shader-like visual identity, complete with a **password-protected Admin CMS Dashboard** and **Supabase database synchronization**.

[🌐 Live Demo](https://mohamedkhaled-5hl.pages.dev/) · [🔐 Admin Demo (`/#admin`)](https://mohamedkhaled-5hl.pages.dev/#admin) · [Report Bug](issues) · [Request Feature](issues)

</div>

---

## ✨ Features

### 💧 Signature Hero & Liquid Reveal Engine
- **Pixel-Aligned Layering**: Dual-layer portrait framing (`base.png` on top, `chrome.jpg` underneath).
- **Physics-Driven Easing**: `pointermove` tracking + `requestAnimationFrame` per-frame lerp interpolation for silky 60fps interaction across desktop, tablet, and touch screens.
- **Organic Liquid Tail & Momentum**: Trailing nodes with dynamic speed-based radius expansion and fluid ripples.
- **Chromatic Aberration Fringe**: Subtle $+1.5\text{px}$ red / $-1.5\text{px}$ cyan RGB channel offset along the liquid tear boundary.
- **Idle Drift & Accessibility**: Multi-harmonic Lissajous drifting path keeps the portrait dynamic when idle, with full `prefers-reduced-motion: reduce` compliance.
- **Valid CSS Masking**: Strictly follows valid radius length-based color stops with `-webkit-mask-image` and `mask-image`.

### 🔐 Password-Protected Admin CMS (`/#admin`)
- **Zero Plaintext Passwords**: Utilizes the native Web Crypto API for **SHA-256 cryptographic password hashing**.
- **Full In-Browser CRUD**:
  - 💼 **Experience & Career**: Add, edit, and reorder career timeline roles, companies, dates, badges, and tech tags.
  - 🚀 **Projects & Work**: Add/edit project cards with custom cover images, tags, categories, live demo links, and modal specs.
  - 👤 **Identity & Bio**: Customize your Name, Hero Eyebrow badge, Taglines, Bio, Contact Email, and Social channels.
  - ⚡ **Skills Matrix**: Group technologies into Frontend, Backend, AI, and DevOps with "Hot" badge toggles.
  - 🛠️ **Capabilities & Services**: Edit service cards and deliverable checklists.
  - 📊 **Highlight Statistics**: Modify the 4 prominent stat numbers and labels.
  - 📬 **Contact Inbox**: View all inbound message transmissions submitted through the public contact form.
  - 💾 **JSON Backup / Restore**: One-click export and import of your entire portfolio configuration.

### 🗄️ Supabase Cloud Database Integration
- **Direct Cloud Sync**: Connect your PostgreSQL database in seconds using your Project URL and Anon API key directly in the Admin UI or via `.env`.
- **Pre-Configured Schema**: Includes `supabase/schema.sql` with tables for projects, experience, skills, services, site settings, and contact messages with Row Level Security (RLS).
- **Offline Resilience**: Seamless fallback to browser local storage if Supabase is offline or not yet configured.

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/DSMohamed/Portofolio.git
cd Portofolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Accessing the Admin Portal

You can access the Admin CMS Dashboard using any of the following methods:
1. Navigate to `http://localhost:3000/#admin`
2. Click the small **Lock Icon** in the footer next to the Cairo local time display.
3. Press **`Ctrl + Shift + A`** (or `Cmd + Shift + A` on macOS) anywhere on the page.

> **Default Passcode**: `admin123`  
> *(You can update this passcode anytime in the **Supabase & Security** tab; the system will hash it with SHA-256).*

---

## 🗄️ Supabase Setup (Optional)

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Copy and run the SQL script located in [`supabase/schema.sql`](supabase/schema.sql).
4. Copy your **Project URL** and **anon public key** from `Project Settings > API`.
5. Connect them either:
   - In the **Admin Dashboard > Supabase & Security** tab (no code rebuild required), or
   - In a `.env` file:
     ```env
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key-here
     ```
6. Click **Push All to Supabase** in the Admin Overview tab to populate your database.

---

## 🎨 Customizing the Portrait Assets

To use your own portraits for the Liquid Reveal effect:
1. Prepare two pixel-aligned images with identical framing and dimensions:
   - `base.png`: Normal human portrait
   - `chrome.jpg`: Futuristic / augmented / helmeted portrait
2. Place both images into the `public/` directory:
   - `public/base.png`
   - `public/chrome.jpg`
3. Restart or refresh your dev server.

---

## 📦 Project Structure

```
├── public/
│   ├── base.png             # Normal portrait
│   ├── chrome.jpg           # Chrome / helmet portrait
│   └── vite.svg             # Favicon
├── src/
│   ├── components/
│   │   ├── Admin/           # Password-protected Admin CMS & Tabs
│   │   ├── Hero/            # 100svh Hero & Liquid Reveal Engine
│   │   ├── Navbar/          # Glassmorphism sticky navbar
│   │   ├── About/           # Bio, stats & holographic HUD
│   │   ├── Projects/        # Project cards & detail modal
│   │   ├── Featured/        # Editorial showcase
│   │   ├── Skills/          # Categorized interactive tech cards
│   │   ├── Experience/      # Milestone career timeline
│   │   ├── Services/        # Capabilities cards
│   │   ├── Contact/         # Transmission form
│   │   └── Footer/          # Footer & admin trigger
│   ├── context/
│   │   └── PortfolioContext.tsx # Global state, CRUD & sync layer
│   ├── data/
│   │   └── portfolioData.ts # Default fallback content
│   ├── hooks/               # Custom hooks (scroll spy, reduced motion)
│   ├── lib/
│   │   ├── crypto.ts        # SHA-256 Web Crypto API hashing
│   │   └── supabase.ts      # Supabase client helper
│   ├── types/               # TypeScript interfaces
│   ├── App.tsx              # Root single-page layout
│   └── main.tsx             # React entry point
├── supabase/
│   └── schema.sql           # Complete SQL database schema
├── .env.example             # Environment variable template
├── tailwind.config.js       # Tailwind theme & tokens
└── vite.config.ts           # Vite build configuration
```

---

## 🌐 Deployment

### Deploy to Cloudflare Pages
```bash
npm run build
npx wrangler pages deploy dist --project-name your-project-name
```

### Deploy to Vercel or Netlify
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

---
Live URL:https://mohamedkhaled-5hl.pages.dev/

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
