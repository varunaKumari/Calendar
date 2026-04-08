<div align="center">

# 🗓️ Interactive Wall Calendar

### A beautifully crafted, feature-rich calendar component inspired by physical wall calendars

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0050?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br />

[🌐 Live Demo](https://calendar-gray-beta.vercel.app/) · [🎬 Video Walkthrough](https://youtu.be/Hu2_m8wFVz4) · [📝 Report Bug](https://github.com/varunaKumari/Calendar/issues)

<br />

<img src="https://img.shields.io/badge/Status-Complete-brightgreen?style=flat-square" />
<img src="https://img.shields.io/badge/Responsive-Yes-blue?style=flat-square" />
<img src="https://img.shields.io/badge/Dark_Mode-Supported-purple?style=flat-square" />
<img src="https://img.shields.io/badge/Storage-localStorage-orange?style=flat-square" />

</div>

---

## 📸 Preview

| Light Mode | Dark Mode |
|:---:|:---:|
| ![Light Mode](https://via.placeholder.com/500x300/F1F5F9/111827?text=Light+Mode+Preview) | ![Dark Mode](https://via.placeholder.com/500x300/0F172A/F9FAFB?text=Dark+Mode+Preview) |

> 💡 *Replace the placeholder images above with actual screenshots of your deployed app*

---

## ✨ Features at a Glance

<table>
<tr>
<td width="50%">

### 🎨 Core Features
- 📅 **Wall Calendar Aesthetic** — Spiral binding, hero images, physical calendar feel
- 🖱️ **Date Selection** — Click to select, click again to deselect
- 📝 **Smart Notes System** — General month notes + date-specific notes
- 📱 **Fully Responsive** — Desktop side-by-side, mobile stacked layout
- 💾 **Persistent Storage** — All data saved to localStorage

</td>
<td width="50%">

### 🚀 Bonus Features
- 🌙 **Dark Mode** — Full dark theme with smooth transitions
- 🎉 **Holiday Markers** — 36 holidays across all 12 months shown on dates
- 🌤️ **Weather Widget** — Month-specific weather data on hero image
- 🔍 **Mini Calendar Preview** — Hover arrows to peek at next/prev month
- 📅 **Go to Date** — Jump to any date between 1900–2100

</td>
</tr>
</table>

---

## 🎯 Assessment Requirements — All Covered

| Requirement | Status | Implementation |
|:---|:---:|:---|
| **Wall Calendar Aesthetic** | ✅ | Hero image with spiral binding, month-specific Unsplash images, year/month overlay |
| **Day Range Selector** | ✅ | Click-to-select dates with clear visual states, theme-colored highlights |
| **Integrated Notes Section** | ✅ | General + date-specific notes, full CRUD, persistent localStorage |
| **Fully Responsive Design** | ✅ | Desktop: side-by-side layout. Mobile: stacked vertical. Touch-friendly |
| **Creative Liberty** | ✅ | Dark mode, holidays, weather widget, mini calendar, go-to-date, animations |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|:---|:---|
| **Next.js 16** (App Router) | React framework with server components |
| **TypeScript 5** | Type safety across the entire codebase |
| **Tailwind CSS 4** | Utility-first styling with custom theme colors |
| **Framer Motion** | Smooth animations, transitions, hover effects |
| **date-fns** | Lightweight date manipulation library |
| **Lucide React** | Beautiful, consistent icon set |
| **localStorage** | Client-side data persistence (no backend needed) |
| **uuid** | Unique ID generation for notes and events |

---

## 📁 Project Architecture

```
src/
├── app/
│   ├── globals.css              # Global styles, scrollbar, transitions
│   ├── layout.tsx               # Root layout with metadata
│   └── page.tsx                 # Home page → renders Calendar
│
├── components/
│   ├── Calendar.tsx             # 🏠 Main orchestrator component
│   ├── CalendarGrid.tsx         # 📊 7-column date grid with holidays
│   ├── DayCell.tsx              # 📅 Individual day — selection, holidays, tooltips
│   ├── MonthNavigator.tsx       # ⬅️➡️ Month navigation with mini preview
│   ├── MiniCalendar.tsx         # 🔍 Tiny calendar shown on arrow hover
│   ├── HeroImage.tsx            # 🖼️ Month image + quote + weather overlay
│   ├── WeatherWidget.tsx        # 🌤️ Expandable weather display
│   ├── NotesSection.tsx         # 📝 Notes panel with theme colors
│   ├── DarkModeToggle.tsx       # 🌙 Sun/Moon toggle button
│   ├── AddEventModal.tsx        # ➕ Event creation form
│   ├── EventBadge.tsx           # 🏷️ Small event dot indicator
│   └── ConfirmDeleteModal.tsx   # 🗑️ Delete confirmation dialog
│
├── hooks/
│   ├── useCalendar.ts           # 📅 Month navigation, date selection, limits
│   ├── useEvents.ts             # 📋 Notes & events CRUD with localStorage
│   ├── useLocalStorage.ts       # 💾 SSR-safe localStorage hook
│   └── useDarkMode.ts           # 🌙 Dark mode state management
│
├── types/
│   └── index.ts                 # 📐 TypeScript interfaces
│
└── utils/
    ├── calendarHelpers.ts       # 📊 Date grid generation, formatting
    ├── monthImages.ts           # 🖼️ Images, quotes, theme colors per month
    ├── holidays.ts              # 🎉 36 holidays across 12 months
    └── weatherData.ts           # 🌤️ Mock weather data per month
```

---

## 🎨 Design Decisions

### Why This Layout?
The design mirrors a **real physical wall calendar** — image on top, dates below, notes on the side. This creates a familiar, intuitive experience that users instantly understand.

### Dynamic Theme Colors
Each month has its own **unique color palette** that flows through the entire UI:
- Notes section header, buttons, badges
- Date selection highlights
- Today button and Go to Date button
- Everything adapts to the month's mood

| Month | Theme | Mood |
|:---|:---|:---|
| January | ❄️ Icy Blue | Cold, fresh start |
| February | 💗 Soft Pink | Love, warmth |
| March | 🌿 Fresh Green | Growth, renewal |
| April | 🌼 Floral Orange | Blooming, energy |
| July | 🌅 Sunset Orange | Heat, adventure |
| October | 🍂 Rustic Brown | Autumn, cozy |
| December | 🧊 Cool Blue | Winter, festive |

### Monthly Inspirational Quotes
Each month features a handpicked quote overlaid on the hero image — adding a personal, thoughtful touch that makes the calendar feel alive.

### Smart Notes System
Notes are categorized as:
- **General** — Attached to the month (always visible)
- **Date-specific** — Attached to a selected date (always visible, shows full date)

All notes persist via **localStorage** and display the creation timestamp.

---

## 📱 Responsive Design

| Screen | Layout | Behavior |
|:---|:---|:---|
| **Desktop (1024px+)** | Calendar (2/3) + Notes (1/3) side by side | Full features, mini calendar on hover |
| **Tablet (768px)** | Same as desktop, slightly compressed | Touch-friendly date cells |
| **Mobile (<768px)** | Stacked: Image → Calendar → Notes | All features remain accessible |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** installed
- **npm** or **yarn** package manager
- **Git** installed

### Installation

```bash
# Clone the repository
git clone https://github.com/varunaKumari/Calendar.git

# Navigate to project
cd Calendar

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create optimized build
npm run build

# Start production server
npm start
```

### Deploy to Vercel

```bash
# One-command deploy
vercel --prod
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deployments.

---

## 🔧 Key Implementation Details

### State Management

```
useCalendar()     → Month navigation, date selection, year limits (1900-2100)
useEvents()       → Notes & events CRUD, localStorage persistence
useDarkMode()     → Theme toggle with localStorage memory
useLocalStorage() → SSR-safe generic localStorage hook
```

### Data Persistence

All user data is stored in the browser's localStorage:

- `calendar-events` — Saved events (JSON array)
- `calendar-notes` — Saved notes with dates and timestamps (JSON array)
- `calendar-dark-mode` — Theme preference (boolean)

No backend, no database, no API calls. Everything is client-side.

### Performance

- **Static generation** — Page is pre-rendered at build time
- **Memoized computations** — Calendar days, events, notes use `useMemo`
- **Callback optimization** — All handlers use `useCallback`
- **Lazy image loading** — Hero images load with fade-in animation
- **Fallback images** — If primary Unsplash image fails, a backup loads

---

## 🌟 Feature Deep Dive

### 🌙 Dark Mode
- Toggle via sun/moon button (top-right corner)
- Saves preference to localStorage
- Smooth 300ms CSS transitions on all elements
- Every component adapts: calendar, notes, tooltips, buttons, modals

### 🎉 Holiday Markers
- 36 holidays across all 12 months (international + regional)
- Holiday name displayed directly inside the date cell
- Full name shown on hover tooltip
- Colors adapt to selection state and dark mode

### 🌤️ Weather Widget
- Displays on the hero image (top-right)
- Shows temperature, condition, high/low for each month
- Click to expand: humidity, wind speed, description
- Mock data — no API needed

### 🔍 Mini Calendar Preview
- Hover over ← or → arrows
- Tiny calendar of prev/next month appears
- Shows today highlighted
- Works in both light and dark mode

### 📅 Go to Date
- Opens a date picker dropdown
- Year limited to 1900–2100
- Validates input with error messages
- Press Enter or click Go to navigate
- Calendar jumps to that month and selects that date

---

## 🧪 Browser Support

| Browser | Status |
|:---|:---:|
| Chrome 90+ | ✅ |
| Firefox 90+ | ✅ |
| Safari 15+ | ✅ |
| Edge 90+ | ✅ |
| Mobile Chrome | ✅ |
| Mobile Safari | ✅ |

---

## 📊 Lighthouse Score Goals

| Metric | Target |
|:---|:---:|
| Performance | 90+ |
| Accessibility | 90+ |
| Best Practices | 90+ |
| SEO | 90+ |

---

## 🤝 What I Learned

Building this project strengthened my skills in:

- **Component Architecture** — Breaking a complex UI into reusable, focused components
- **State Management** — Custom hooks for clean separation of concerns
- **CSS/Styling** — Dynamic theme colors, dark mode, responsive layouts
- **Animation** — Framer Motion for smooth, meaningful interactions
- **Data Persistence** — localStorage with SSR-safe patterns in Next.js
- **TypeScript** — Strict typing across props, state, and utility functions
- **UX Design** — Tooltips, confirmations, visual feedback, accessibility

---

<div align="center">

Built with ❤️ using Next.js, TypeScript, Tailwind CSS & Framer Motion

⭐ **Star this repo if you found it impressive!** ⭐

</div>