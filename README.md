<div align="center">
  <h1>Neo-Brutalist Portfolio</h1>
  
  <p>
    A high-performance personal portfolio featuring dynamic data integrations and a custom design system.
  </p>

  <p>
    <a href="https://anshunandi.vercel.app/"><strong>View Live Site »</strong></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js&logoColor=white&labelColor=black&color=black" alt="Next.js 15" />
    <img src="https://img.shields.io/badge/React-19-black?style=flat-square&logo=react&logoColor=61DAFB&labelColor=black&color=black" alt="React 19" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=flat-square&logo=typescript&logoColor=3178C6&labelColor=black&color=black" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-black?style=flat-square&logo=tailwind-css&logoColor=38B2AC&labelColor=black&color=black" alt="Tailwind CSS 4" />
    <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=flat-square&logo=vercel&logoColor=white&labelColor=black&color=black" alt="Vercel" />
  </p>
</div>

<br />

## 📖 Overview

This repository contains the source code for my personal portfolio. It is designed to be fully responsive, accessible, and highly performant, utilizing modern React Server Components (RSC) to minimize client-side JavaScript payloads.

## 🛠️ Tech Stack

### Core
- **Framework:** Next.js 15 (App Router)
- **Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4

### Integrations
- **Data Fetching:** GitHub GraphQL API
- **Email Delivery:** Resend API
- **Icons:** Lucide React
- **Theme:** `next-themes` (System-aware Dark Mode)

## 🏗️ Architecture & Features

### 1. Automated GitHub Statistics
The "Awards & Activity" section renders a live contribution graph (Snake Game). Instead of exposing an API key to the client or hitting strict rate limits, a GitHub Actions workflow (`.github/workflows/update-stats.yml`) automatically runs a Node.js script (`scripts/fetch-stats.mjs`). This script queries the GitHub GraphQL API for the latest commit history and languages, caching the results securely in a remote Gist.

### 2. Core Web Vitals
By leveraging strict server-side rendering and static asset optimization, the site achieves high scores across Lighthouse performance, accessibility, and SEO metrics.

## 📁 Directory Structure

```text
.
├── app/                  # Root layout, single page, and global styles
├── components/           # All section and UI components (Hero, About, Skills, Projects, Awards, Contact, Nav, Footer, etc.)
├── lib/                  # Static site data, GitHub API helpers, and utilities
├── scripts/              # Node.js script for GitHub Actions automation
├── public/               # Static assets and images
└── .github/workflows/    # Scheduled workflows for automated data fetching
```

## 📬 Contact

- **Email:** anshunandiofficial@gmail.com
- **LinkedIn:** [Anshu Nandi](https://linkedin.com/in/anshunandi)

---

<div align="center">
  <sub>Built with Next.js and Tailwind CSS. Hosted on Vercel.</sub>
</div>
