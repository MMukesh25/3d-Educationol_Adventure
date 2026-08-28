# 🌟 3D Animated Educational Adventure Platform for Children

A full-stack gamified educational learning platform for children built with **Java Spring Boot 3**, **MySQL**, **React**, and **Three.js / React Three Fiber**.

![Platform Preview](https://img.shields.io/badge/Stack-Java%20Spring%20Boot%20%2B%20React%20%2B%20Three.js-blueviolet?style=for-the-badge)
![Status-Production-Ready](https://img.shields.io/badge/Status-Production--Ready-brightgreen?style=for-the-badge)

---

## 🚀 Key Features

* **🏰 Central 3D Adventure World**: Interactive 3D floating island hub with friendly character navigation, animated portals, floating clouds, and dynamic day/night ambient lighting.
* **🧮 6 Immersive Learning Worlds**:
  * **🧮 Math Island**: Visual counting, fruit scales, addition/subtraction, pattern completions.
  * **🔍 Mystery House**: Detective treasure hunts, magnifying glass clue searches, key unlocking.
  * **💻 Coding Lab**: Visual block-based programming (Sequence, Loops, Conditionals) controlling a 3D animated Robot traversing grid mazes.
  * **🧠 Brain Forest**: Animated memory card matching, difference finders, and sequence recall.
  * **🧩 Puzzle Castle**: Tangram shape fitting, spatial puzzles, and classification games.
  * **🎨 Creativity Zone**: 3D room decoration, block building, and avatar styling.
* **🪙 Real Server-Controlled Economy**: Backend validates activity attempts, securely calculates and awards coins & stars, records audit transactions in MySQL.
* **🛍️ Reward Shop & Character Customizer**: Spend earned coins on hats, clothes, pets, and room accessories.
* **👨‍👩‍👧 Parent Dashboard**: Analytics tracking learning progress, subject mastery %, study time, and daily streaks.
* **🛠️ Admin Management Panel**: Live content management for questions, activities, achievements, and user moderation.
* **🔒 Enterprise Security**: JWT authentication with role-based access control (`CHILD`, `PARENT`, `ADMIN`).
* **🎵 Native Web Audio Synthesizer**: Joyful sound effects (coins, fanfare, correct chimes, button clicks) without heavy media downloads.

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

### 1. Backend Setup (Java 17+ / Maven / MySQL)
```bash
cd backend
mvn spring-boot:run
```
* Backend runs at: `http://localhost:8080`
* Default Admin: `admin` / `admin123`
* Default Demo Child: `leo_explorer` / `child123`
* Default Demo Parent: `parent_sarah` / `parent123`

### 2. Frontend Setup (Node.js 18+)
```bash
cd frontend
npm install
npm run dev
```
* Frontend runs at: `http://localhost:5173`
