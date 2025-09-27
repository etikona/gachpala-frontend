# Gachpala 🌿

**AI-Powered Plant Health Diagnosis & E-Commerce Platform**

<div align="center">
  <br />
    <div>
    <a href="https://gachpala-frontend.vercel.app/" >
      <img src="https://i.postimg.cc/8zTfQbJC/landing-page.png" alt="Project Banner">
      </a>
      </div>
    
  <br />
  </div>

---

## Badges

[![Frontend](https://img.shields.io/badge/Frontend-Next.js-blue?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Backend](https://img.shields.io/badge/Backend-Node.js-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-blue?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![AI Model](https://img.shields.io/badge/AI-Plant%20Health%20Analysis-purple?style=flat-square)]()

---

## Live Link : [https://gachpala-frontend.vercel.app/]

## Project Description

Gachpala: AI-Powered Plant Health & E-Commerce Platform

Gachpala is an AI-driven web platform that helps plant owners diagnose plant health issues through image recognition while also providing a seamless e-commerce experience for plant care solutions.

Users can upload a photo of their plant, and Gachpala’s AI model analyzes it to identify diseases, health status, and care recommendations. The platform then suggests relevant fertilizers, pesticides, or treatment products, which can be directly purchased from registered sellers.

Gachpala features dedicated dashboards for Users, Sellers, and Admins — enabling real-time diagnosis, product management, and system monitoring in one unified ecosystem.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
  - [User Features](#user-features)
  - [Seller Features](#seller-features)
  - [Admin Features](#admin-features)
- [Architecture & Tech Stack](#architecture--tech-stack)
- [Installation & Setup](#installation--setup)
  - [Frontend](#frontend-setup)
  - [Backend](#backend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [AI Model Details](#ai-model-details)
- [Screenshots / GIFs](#screenshots--gifs)
- [Usage Instructions](#usage-instructions)
- [Roadmap / Future Enhancements](#roadmap--future-enhancements)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)
- [Contact / Support](#contact--support)

---

## 🎖️ Project Overview

**GachPala** is a full-stack web platform for plant enthusiasts and sellers:

- Upload plant images for **AI-powered health analysis**.
- Receive detailed reports: **health status, diseases, care instructions**, and **recommended products**.
- Browse and purchase plant care products from multiple sellers.
- Manage plant images, orders, and subscriptions through **user, seller, and admin dashboards**.

> “Bringing plants and technology together for healthier growth.” 🌱

---

## 🌟 Features

### User Features

- Upload plant images for instant AI analysis.
- Get detailed reports including:
  - Plant health status
  - Detected diseases
  - Care instructions
  - Recommended products
- Browse, purchase, and review products.
- Track order history and subscriptions.
- Update profile (name & image).

### Seller Features

- Register as a seller and list products.
- Manage inventory and stock levels.
- Update or remove products.
- View incoming orders and update shipping status.

### Admin Features

- Monitor all users and sellers.
- Approve/remove sellers and products.
- Oversee platform analytics and reports.
- Resolve system issues.

---

## 🛠️ Architecture & Tech Stack

```mermaid
graph TD;
    Frontend: Next.js, Redux, Tailwind CSS, ShadCN UI, NextAuth
    Backend: Node.js, Express.js, JWT, Multer
    Database: PostgreSQL (Supabase)
    AI Model: Plant Health Analysis
```

````

**Tech Stack Summary:**

| Layer    | Technology                                                           |
| -------- | -------------------------------------------------------------------- |
| Frontend | Next.js, Redux.js, Tailwind CSS, ShadCN UI, GSAP, NextAuth, date-fns, react-icons |
| Backend  | Node.js, Express.js, Multer, JWT                                     |
| Database | PostgreSQL (Supabase)                                                |
| Language | JavaScript (Full Stack)                                              |

---

## Installation & Setup

### Frontend Setup

```bash
# Clone the repo
git clone https://github.com/etikona/gachpala-frontend

# Install dependencies
npm install

# Run frontend
npm run dev
```

### Backend Setup

```bash
cd ../backend

# Install dependencies
npm install

# Run backend
npm run dev
```

---

## Environment Variables

Create `.env` files in **frontend** and **backend**:

---

---

## AI Model Details

- Processes uploaded plant images.
- Detects plant type, health status, and diseases.
- Provides a **confidence score** and recommended care/products.
- [Integration placeholder for AI model]

- Plant Analysis Report
- E-commerce Flow

---

## Usage Instructions

1. Register as a **user** or **seller**.
2. Upload plant images for AI health reports.
3. Browse and purchase recommended products.
4. Sellers manage inventory and orders via dashboard.
5. Admin monitors platform activity and analytics.

---

## Roadmap / Future Enhancements

- Multi-language support for plant care instructions.
- Mobile app version (iOS & Android).
- Advanced AI model with disease severity predictions.
- Social community features for plant enthusiasts.
- Real-time notifications for orders and plant health alerts.
- Enhanced analytics dashboard for sellers and admin.

---

## Contribution Guidelines

1. Fork the repository.
2. Create a branch: `git checkout -b feature-name`.
3. Commit changes: `git commit -m "Add feature"`.
4. Push to your branch: `git push origin feature-name`.
5. Open a pull request.

> Follow code style, add tests, and write clear commit messages.

---
---

## Contact / Support

- **Maintainer:** Eti Kona Paul - [etikonapal@gmail.com](mailto:your.email@example.com)
- **GitHub Repository:** [https://github.com/etikona/gachpala-frontend]
- **Support:** Open an issue on GitHub for bugs or feature requests.

---

_“GachPala: Grow healthy plants with AI-powered insights.” 🌱_
````
