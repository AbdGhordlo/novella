<p align="center">
  <img src="assets/images/Novella-Logo-with-Text-No-BG.png" alt="Novella Logo" width="350" />
</p>

<h1 align="center">Novella</h1>

<p align="center">
  A modern React Native mobile app for discovering and purchasing books and novels.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-18181B?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=appwrite&logoColor=white" />
</p>
---

# 📖 About Novella

Novella is a mobile bookstore application built with React Native and Expo.  
It allows users to browse books and novels, search for titles, manage their cart, and explore a clean and modern reading-focused interface.

The application uses Appwrite as the backend/database solution and Zustand for lightweight global state management.

---

# ✨ Features

- 🔐 User Authentication
  - Sign In
  - Sign Up

- 🏠 Home Screen
  - Browse featured books and novels
  - Explore categories and recommendations

- 🔎 Search System
  - Search books dynamically
  - Filter and discover titles quickly

- 🛒 Cart Management
  - Add/remove items
  - Quantity management
  - Persistent cart state using Zustand

- 👤 User Profile
  - User information
  - Account-related features

---

# 📱 Screens

## Authentication

<p align="center">
  <img src="assets/images/screens/sign-in.png" width="250" />
  <img src="assets/images/screens/sign-up.png" width="250" />
</p>

---

## Home Screen

<p align="center">
  <img src="assets/images/screens/home-1.png" width="220" />
  &nbsp;&nbsp;&nbsp;
  <img src="assets/images/screens/home-2.png" width="220" />
  &nbsp;&nbsp;&nbsp;
  <img src="assets/images/screens/home-3.png" width="220" />
</p>

---

## Search Screen

<p align="center">
  <img src="assets/images/screens/search-1.png" width="250" />
  &nbsp;&nbsp;&nbsp;
  <img src="assets/images/screens/search-2.png" width="250" />
</p>

---

## Cart Screen

<p align="center">
  <img src="assets/images/screens/cart.png" width="250" />
</p>

---

## Book Screen

<p align="center">
  <img src="assets/images/screens/book.png" width="250" />
</p>

---

## Profile Screen

<p align="center">
  <img src="assets/images/screens/profile-1.png" width="250" />
  &nbsp;&nbsp;&nbsp;
  <img src="assets/images/screens/profile-2.png" width="250" />
</p>

---

# 🛠️ Tech Stack

- React Native
- Expo
- Expo Router
- TypeScript
- Zustand
- Appwrite
- NativeWind / Stylesheets

---

# 📂 Project Structure

```bash
app/                # Expo Router screens
components/         # Reusable UI components
constants/          # Static data/constants
lib/                # Appwrite config, hooks, utilities
store/              # Zustand stores
assets/             # Images, fonts, icons
types/              # TypeScript types/interfaces
```

---

# 🚀 Getting Started

## 1. Install dependencies

```bash
npm install
```

## 2. Start the application

```bash
npx expo start
```

In the output, you'll find options to open the app in:

- Android Emulator
- iOS Simulator
- Expo Go
- Development Build

---

# 🔧 Environment Variables

Create a `.env` file in the root directory and configure your Appwrite credentials.

Example:

```env
EXPO_PUBLIC_APPWRITE_PROJECT_ID=
EXPO_PUBLIC_APPWRITE_DATABASE_ID=
EXPO_PUBLIC_APPWRITE_BUCKET_ID=
EXPO_PUBLIC_APPWRITE_ENDPOINT=
```

---

# 🗄️ Backend

Novella uses Appwrite for:

- Authentication
- Database management
- File storage
- API services

---

# 📦 State Management

Global state management is handled using Zustand.

Examples:

- Cart state
- Quantity management
- Shared app state

---

# 🧭 Routing

The project uses Expo Router with file-based routing.

Example:

```bash
app/
 ├── index.tsx
 ├── search.tsx
 ├── cart.tsx
 ├── profile.tsx
```
