# 🌟 3D Animated Educational Adventure Platform for Children

A full-stack gamified educational learning platform for children built with **Java Spring Boot 3**, **MySQL/H2**, **React**, and **Three.js**.

![Platform Preview](https://img.shields.io/badge/Stack-Java%20Spring%20Boot%20%2B%20React%20%2B%20Three.js-blueviolet?style=for-the-badge)
![Status-Production-Ready](https://img.shields.io/badge/Status-Production--Ready-brightgreen?style=for-the-badge)

---

## 🚀 Key Features

* **🏰 Central 3D Adventure World**: Interactive 3D floating island hub with animated portals and clouds.
* **🧮 6 Immersive Learning Worlds**: Math Island, Mystery House, Coding Lab, Brain Forest, Puzzle Castle, Creativity Zone.
* **🪙 Server-Controlled Economy**: Backend validates attempts, awards coins & stars, records audit transactions.
* **🛍️ Reward Shop & Avatar Customizer**: Spend coins on hats, pets, and outfits.
* **👨‍👩‍👧 Parent Dashboard**: Analytics tracking learning progress, subject mastery, and daily streaks.
* **🛠️ Admin Panel**: Content management for questions, activities, achievements, and user moderation.
* **🔒 JWT Security**: Role-based access control (`CHILD`, `PARENT`, `ADMIN`).
* **🎵 Web Audio Synthesizer**: Sound effects without heavy media downloads.

---

## 🏗️ Project Architecture

```text
3D-Adventure/
├── backend/                  → Java Spring Boot REST API
│   ├── pom.xml
│   └── src/main/java/com/adventure/
│       ├── config/           → Security, CORS, Seed Data Initializer
│       ├── controller/       → REST Controllers (Auth, Game, Activity, Parent, Admin)
│       ├── dto/              → Request/Response Payloads
│       ├── entity/           → JPA Entities (User, ChildProfile, Activity, Question, etc.)
│       ├── repository/       → Spring Data JPA Repositories
│       ├── security/         → JWT Provider & Filter
│       └── service/          → Business Services
│
└── frontend/                 → React + Vite + Three.js
    ├── src/
    │   ├── components/3d/    → 3D Canvas, Island Hub, Robot Simulator
    │   ├── components/common/→ HUD, Modals, Mascot Guide, Sound Engine
    │   ├── context/          → AuthContext, GameContext
    │   ├── pages/            → Adventure Worlds & Dashboards
    │   └── services/         → REST API clients
```

---

## 🏃 Quick Start

### 1. Backend Setup (Java 17+ / Maven)
```bash
cd backend
mvn spring-boot:run
```
* Runs at: `http://localhost:8080`
* Uses H2 in-memory DB by default (zero-config startup)
* Pre-seeded accounts: `leo_explorer`/`child123`, `parent_sarah`/`parent123`, `admin`/`admin123`

### 2. Frontend Setup (Node.js 18+)
```bash
cd frontend
npm install
npm run dev
```
* Runs at: `http://localhost:5173`
* Proxy forwards `/api` calls to the backend on port 8080

### 3. Run Both at Once
From the project root:
```bash
npm install --prefix frontend
npm run dev
```

---

## 📄 License

MIT
