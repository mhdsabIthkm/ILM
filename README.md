# MDIA ILM — Integrated Learning & Mentorship Program
### Malik Deenar Islamic Academy · Thalangara, Kasaragod

An official speech, communication, and leadership mentorship platform tailored for the students of Malik Deenar Islamic Academy (affiliated with Jamia Nooriyya Arabiyya). Inspired by Toastmasters International, MDIA ILM structures weekly meetings, speech evaluations, role assignments, and award recognitions.

---

## 🌟 Key Features

### 🎓 Student Portal
- **Dashboard**: Real-time overview of current meetings, assigned speaking/leadership roles, evaluations, and awards.
- **My Profile**: Official academy identity card, enrollment details, and Malik Deenar campus banner.
- **My Class & Student Directory**: Clean directory of classmates across all 10 academy classes with high-resolution photos and admission search.
- **ILM Meetings**: Filter and review class meetings by status (`Drafted`, `Submitted to Admin`, `Approved`).
- **Meeting Reports & Workflow**: Interactive reporting interface tailored for speakers, evaluators, and report reviewers.
- **My Roles & Evaluations**: Speech performance metrics with qualitative observation badges.

### 🛡️ Admin & Staff Portal
- **Meetings Management**: Schedule, monitor, and finalize weekly ILM meetings across all active classes.
- **Classes Management**: Class-by-class student rosters and photo verification across 10 official classes (`SA'DA`, `SIDRA`, `SUFFA`, `VAHDA`, `HUDA`, `ALFA`, `SAFWA`, `THUFA`, `NAJWA`, `WIDAD`).
- **Students Directory**: Filter students by ILM active status, admission number, and class name.
- **Academic Administration**: Manage academic years, class names, user roles, timing rules, and permissions.

### 👨‍👩‍👦 Parent Portal
- Track child's attendance, weekly meeting speeches, evaluator feedback, and earned awards.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS design tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context (`UserContext`)
- **Backend / Data Layer**: Supabase integration with local TypeScript mock fallback

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
ILM/
├── app/                  # Next.js App Router (pages & layouts)
│   ├── (app)/            # Authenticated portal layouts (student, admin, parent)
│   ├── login/            # Campus hero login interface with role selection
│   └── globals.css       # Design tokens & typography
├── components/           # Reusable UI & layout components
│   ├── layout/           # Sidebar, TopHeader, UserProfileMenu
│   └── ui/               # Badges, avatars, photo modals
├── context/              # UserContext authentication & session state
├── lib/                  # Utilities, mock data, and Supabase client
└── public/               # Static assets, campus photos, and student avatars
```

---

## 📜 License
Private and confidential. Developed exclusively for Malik Deenar Islamic Academy.
