# E.E.D.A — Ecosistema Educativo Digital Adaptivo (2026)

Welcome to the official documentation and structural ecosystem for **E.E.D.A**, a project focused on digital education, cybersecurity, and cognitive development.

## 🏝️ Project Overview

**E.E.D.A** is a dual-platform educational ecosystem:

1.  **Mobile (Android Native)**: Built with Kotlin and Jetpack Compose.
2.  **Desktop/Multi (Python/Flet)**: Built with Python for advanced logic and cross-platform flexibility.

---

## 🏗️ Android Architecture (Kotlin/Compose)

Follows modern application standards with **MVVM + Clean Architecture** and 100% reactive state management.

### Directory Structure:
```
com.liebeblack.isla_digital/
 ├── IslaDigitalApp.kt      # Application y manual DI container
 ├── MainActivity.kt        # Entry point y Setup del Theme Compose
 ├── domain/                # Capa de Reglas de Negocio
 │    ├── model/ChildProfile.kt 
 │    └── repository/ChildProfileRepository.kt
 ├── data/                  # Capa de Acceso de Datos (Persistencia JSON)
 │    └── repository/ChildProfileRepositoryImpl.kt
 └── ui/                    # Capa de Interfaz y UI (Compose)
      ├── theme/            # Paleta E.E.D.A (Color.kt, Theme.kt)
      ├── components/       # BigButton.kt, GlassContainer.kt
      └── screens/home/     # HomeScreen.kt, HomeViewModel.kt
```

### Key Values:
- **Gamified Design**: Neomorphic & Glassmorphic visual components.
- **Haptic Feedback**: Real-time tactile response on child interactions.
- **Inmutable State**: StateFlow and sealed interfaces for UI stability (No-flicker).

---

## 🛡️ PC/Mobile Ecosystem (Python/Flet)

A pedagogical system translating complex cybersecurity concepts through the **CPA (Concrete-Pictorial-Abstract)** model.

### Core Modules:
- **ContentEngine**: Manages 8 thematic units under protocols (Alpha, Delta, Omega).
- **DatabaseManager**: SQLite3 for progress and challenge logs.
- **EventBus**: Decoupled module communication.
- **DesignTokens**: Unified Golden Ratio-based design system.

---

## 🚀 Getting Started

1.  **Repository**: `git clone https://github.com/LiebeBlack/E.E.D.A.git`
2.  **Web Preview**: Open `index.html` in this directory to see the premium presentation.

Designed with ❤️ for education.
**EEDA Team 2026**
