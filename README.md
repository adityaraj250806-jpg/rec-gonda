<div align="center">

# 🎓 InsideREC — v2.0
### The Honest, Data-Driven Student Guide to REC Gonda

[![Live Website](https://img.shields.io/badge/Live%20Website-rec--gonda.vercel.app-00e5ff?style=for-the-badge&logo=vercel&logoColor=white)](https://rec-gonda.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/adityaraj250806-jpg/rec-gonda)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Aditya%20Raj-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aditya-raj-022889366/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber?style=for-the-badge)](LICENSE)

<br/>

**InsideREC** is an open-source, student-written web guide and decision toolkit for **Maa Pateshwari Devi Rajkiya Engineering College (MPDREC), Gonda** (affiliated with Dr. A.P.J. Abdul Kalam Technical University — AKTU, Lucknow).

*Ranked 7th in UP under SIRF 2024 · 1st among newly established RECs*

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started & Local Testing](#-getting-started--local-testing)
- [Fork & Use for Your College](#-fork--use-for-your-college)
- [Contributing](#-contributing)
- [Creator & Contact](#-creator--contact)
- [Disclaimer](#-disclaimer)

---

## 💡 Overview

When choosing engineering colleges through UPTAC / JEE Main counseling, official brochures often lack ground realities — living expenses, mess food, travel connectivity, internal marks culture, and realistic placement routes.

**InsideREC** solves this information gap. Designed and built by **Aditya Raj** (CSE, 3rd Year), the platform brings complete transparency with real cutoff data, dynamic cost calculators, and practical student survival guides. 

Everything is driven by a single structured JSON database, making it fully portable and adaptable for any other engineering college.

---

## ✨ Key Features

### 🎯 1. Rank-to-Seat Predictor
- Predicts admission chances using official **UPTAC 2025 Opening & Closing Rank (OR-CR)** round-wise data.
- Supports all reservation categories (**General, OBC, SC, ST, EWS**) across CSE, Electrical, Mechanical, and Civil Engineering.
- Displays full round-by-round historical cutoff breakdowns.

### 💰 2. Fee & UP Scholarship Calculator
- Itemized breakdown of college fees, user charges, caution money, and AKTU exam charges.
- Computes effective net cost after deducting **UP State Post-Matric Government Scholarships** categorized by caste and gender.
- Highlights hostel accommodation fees and realistic private rental rates in nearby localities (Bhabhani Gaon, Indira Nagar, Avas Vikas).

### 📊 3. Monthly Budget & 4-Year ROI Comparison
- Realistic estimates for rent, mess food, commute autos, 5G internet plans, and stationery.
- Visual comparative cost model illustrating total 4-year expenditure (~₹4L–₹6L at REC Gonda) versus private metro colleges (~₹14.4L+ in NCR).

### 📘 4. AKTU Academic System Decoded
- Transparent breakdown of theory exam splits (**30 Internal + 70 External**).
- **75% minimum attendance rule** and sessional exam debarment warnings.
- Carry-over paper rules, semester timelines, and SGPA / CGPA credit-weighted calculation formulas.

### 🧰 5. Freshers Survival Kit & Document Checklist
- Interactive counseling checklist for mandatory and category-specific certificates (domicile, caste, income, affidavits).
- Day-1 campus onboarding tips and first-week packing checklist.

### 📍 6. How to Reach & Nearby Essentials
- Transit instructions from Gonda Junction (Station Code: `GD`) and Gonda Bus Stand with shared auto fare guides.
- Embedded interactive Google Map and directory of nearby ATMs, pharmacies, and district hospital.

### 🎥 7. Campus Video Tours & Honest Branch Reviews
- Student-filmed campus tours, department walkthroughs, and lab reviews.
- Branch-by-branch evaluations of lab status, faculty scope, and competitive exam roadmaps (GATE, PSUs, SSC JE, Tech placements).

### 🌗 8. Dark & Light Theme
- Native dark mode with persistent user preference stored in `localStorage`.

---

## 🛠 Tech Stack

- **Frontend**: Vanilla HTML5, Modern ES6+ JavaScript (Zero external framework overhead for instant load speeds).
- **Styling**: Pure CSS3 with Custom Properties (Design Tokens), Glassmorphism, CSS Grid, and Flexbox.
- **Typography**: Google Fonts (*Outfit*, *Bricolage Grotesque*, *JetBrains Mono*).
- **Data Engine**: JSON-driven single source of truth (`data/rec-gonda.json`) with offline JavaScript data fallback (`data/rec-gonda.data.js`).
- **SEO & Schema**: Comprehensive metadata, OpenGraph, Twitter Cards, `robots.txt`, `sitemap.xml`, and schema.org `EducationalOrganization` JSON-LD.
- **Hosting**: Deployed on [Vercel](https://vercel.com).

---

## 📂 Project Structure

```text
rec-gonda/
├── css/
│   └── style.css              # Custom design system, CSS variables & responsive layout
├── data/
│   ├── banner.png             # Social preview and banner graphic
│   ├── logo.png               # College / InsideREC seal
│   ├── rec-gonda.json         # Primary JSON database (cutoffs, fees, campus data)
│   └── rec-gonda.data.js      # Offline / local browser data fallback
├── js/
│   └── app.js                 # Application logic, calculators, predictor & DOM renderers
├── get_transcript.js          # Node.js YouTube transcript extraction utility
├── index.html                 # Main single-page application
├── package.json               # Development dependency manifest
├── robots.txt                 # Web crawler rules & sitemap reference
└── sitemap.xml                # SEO sitemap
```

---

## 🚀 Getting Started & Local Testing

You can run and test this project on your local machine using any of the following methods:

### Method 1: Direct Double-Click (Zero Setup)
Simply open the folder and **double-click `index.html`** in your browser.  
*(Offline data fallback ensures all interactive calculators work immediately without CORS blocking).*

### Method 2: Live Server (VS Code / Antigravity IDE)
1. Open the project folder in your IDE.
2. Right-click **`index.html`** and select **"Open with Live Server"** (or click **"Go Live"** on the status bar).
3. Browse to `http://127.0.0.1:5500`.

### Method 3: Python HTTP Server
```bash
python -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

### Method 4: Node.js `npx serve`
```bash
npx serve
```
Open `http://localhost:3000` in your web browser.

---

## 🔄 Fork & Use for Your College

InsideREC was intentionally architected as a reusable, open-source framework:

1. **Fork or Clone** the repository:
   ```bash
   git clone https://github.com/adityaraj250806-jpg/rec-gonda.git
   ```
2. **Update College Information**:
   - Modify [`data/rec-gonda.json`](data/rec-gonda.json) with your college's branches, cutoffs, fee breakdown, and campus life details.
   - Replace [`data/logo.png`](data/logo.png) with your college logo.
3. **Deploy in 1 Click**:
   - Push your changes to your own GitHub repository.
   - Import the repository on [Vercel](https://vercel.com) or [Netlify](https://netlify.com) for instant deployment with continuous delivery.

---

## 👨‍💻 Creator & Contact

Built with ❤️ by **Aditya Raj**  
*Computer Science & Engineering (3rd Year)*  
*Maa Pateshwari Devi Rajkiya Engineering College, Gonda*

- 🌐 **LinkedIn**: [linkedin.com/in/aditya-raj-022889366](https://www.linkedin.com/in/aditya-raj-022889366/)
- 💻 **GitHub**: [@adityaraj250806-jpg](https://github.com/adityaraj250806-jpg)
- 🏫 **College**: [Rajkiya Engineering College, Gonda](https://recgonda.ac.in)

---

## ⚖️ Disclaimer

*Data presented on InsideREC is compiled from official UPTAC counseling notices, university circulars, and verified student experiences. Information regarding fees, scholarships, and academic guidelines is subject to updates by government authorities and AKTU. Prospective candidates are always advised to verify critical deadlines and admission circulars via official portals.*
