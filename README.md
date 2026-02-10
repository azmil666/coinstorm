# 🚀 CoinStorm — Crypto Analytics Dashboard

<div align="center">

**Live Demo:** [https://coinstorm.vercel.app](https://coinstorm.vercel.app)

A fast, modern cryptocurrency analytics dashboard built with Next.js, TypeScript, Tailwind, and CoinGecko API.

</div>

---

## 📌 Overview

CoinStorm is a production-ready crypto analytics platform that allows users to explore market trends, search tokens instantly, and analyze price movements using interactive charts.

The project focuses on:

* Clean UI/UX
* Real-world API integration
* Performance-first architecture
* Scalable component design

---

## ✨ Core Features

### 🏠 Home Dashboard

* Default Bitcoin overview
* Interactive candlestick chart
* Live price display
* Trending coins panel
* Market categories

### 🔍 Global Search System

* Search by coin name or symbol
* Instant suggestions
* Keyboard shortcut (⌘K / Ctrl+K)
* Direct navigation to token pages

### 📊 Coin Detail Page

* Current price
* 24h change
* Market rank
* TradingView-style OHLC chart
* Converter (Crypto ↔ INR / Fiat)
* External links (website, explorer)

### 📈 Market Explorer

* Paginated coin table
* Market cap rank
* Price tracking
* 24h performance

### ⚡ Performance Optimized

* Server Components for initial data
* SWR for caching & revalidation
* ISR-friendly API structure
* Fast page navigation

---

## 🧠 Project Architecture

### High-Level Flow

```
User
 │
 ▼
Next.js App Router
 │
 ├── Server Components
 │     ├── Fetch market data
 │     ├── Fetch coin details
 │     └── Pre-render pages
 │
 ├── Client Components
 │     ├── Search Modal (SWR)
 │     ├── Converter
 │     └── Interactive UI
 │
 ▼
API Layer (/lib/coingecko.actions.ts)
 │
 ▼
CoinGecko REST API
```

---

### Component Architecture

```
app/
 ├── layout.tsx
 ├── page.tsx (Home)
 └── coins/
      └── [id]/page.tsx

components/
 ├── Header
 ├── SearchModal
 ├── CandlestickChart
 ├── Converter
 ├── TrendingList
 └── MarketTable

lib/
 ├── coingecko.actions.ts
 └── utils.ts
```

---

### Data Flow Design

```
CoinGecko API
     │
     ▼
coingecko.actions.ts
     │
     ├── Server Fetch (SSR)
     │       │
     │       └── Pages load initial data
     │
     └── Client Fetch (SWR)
             │
             ├── Search results
             └── Trending updates
```

---

## 🛠 Tech Stack

* Next.js 16
* TypeScript
* Tailwind CSS
* shadcn/ui
* CoinGecko API (Free Tier)
* TradingView Lightweight Charts
* SWR
* Vercel Deployment
* CodeRabbit (AI code review)

---

## 🌐 Live Deployment

[https://coinstorm.vercel.app](https://coinstorm.vercel.app)

Hosted on Vercel with production build optimizations and analytics enabled.

---

## 🔧 Local Setup

Clone repository:

```
git clone https://github.com/azmil666/coinstorm.git
cd coinstorm
```

Install dependencies:

```
npm install
```

Create `.env.local`:

```
COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
COINGECKO_API_KEY=YOUR_KEY
NEXT_PUBLIC_COINGECKO_API_KEY=YOUR_KEY
```

Run development server:

```
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 📊 APIs Used

* `/coins/markets`
* `/coins/{id}`
* `/coins/{id}/ohlc`
* `/search`
* `/search/trending`
* `/coins/categories`

All powered by CoinGecko REST API.

---

## 🧩 Key Engineering Decisions

* Used server components for faster first load
* Used SWR for search responsiveness
* Avoided WebSockets (paid tier)
* Focused on free-tier stability
* Modular API layer for scalability

---

