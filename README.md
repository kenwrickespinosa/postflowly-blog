# Postflowly a personal blog platform

A web platform with frontend and backend, demonstrating full-stack development.

## 📌 Description

This project is a full-stack web application designed to create, read, and manage blog posts in user friendly environment.

## 🚀 Features

- User registration and login

- Create, edit, and delete blog posts

- View and read other users' blog posts

- Apply search filter

- Responsive design for desktop and mobile

- Implement token-based authentication

## 🛠️ Tech Stack

**Frontend:** React, Tailwind CSS, Shadcn, TipTap

**Backend:** Laravel + Sanctum

**Database:** MySQL

**Tools & Platforms:** VS Code, Git, GitHub

## ⚙️ Installation & Setup

### 1. Prerequisites

Before you start, make sure you have installed:

- Node.js

- npm or yarn

- PHP 8+

- Composer

- MySQL

- Git (Optional)

### 2. Clone the repository

```bash
git clone https://github.com/your-username/blog-platform.git
cd blog-platform
```

### 3. Backend setup

Navigate to Laravel folder:

```bash
cd server-api
```

Install dependencies & copy environment file:

```bash
composer install
cp .env.example .env
```

> Update `.env` with your database credentials

Generate publication key:

```bash
php artisan key:generate
```

Run database migration:

```bash
php artisan migrate
```

Start server:

```bash
php artisan serve
```

### 4. Frontend setup

Navigate to React:

```bash
cd ../client
```

Install dependencies:

```bash
npm install
```

Start development server

```bash
npm run dev
```

## ☀️ Usage

- Open browser at `http://localhost:5173`

- Register new account or login

- Create, edit, or delete blog posts

- Read posts from other users

## 📷 Screenshots

![Screenshot of landing page](/assets/landingpage.png)

![Screenshot of home page](/assets/home.png)

![Screenshot of opening a story](/assets/view_story.png)

## 📍 Project Status

⚠️ This project is under development. Not all functionality is finished, and many improvements are planned for future updates.

## 👤 Author

**Kenwrick Espinosa**

GitHub: [https://github.com/kenwrickespinosa](https://github.com/kenwrickespinosa)

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

[MIT](https://choosealicense.com/licenses/mit/)