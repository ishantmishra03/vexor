# 📰 MERN Stack Blog Application ( Vexor )

A full-featured, scalable, and production-ready **MERN (MongoDB, Express.js, React, Node.js)** based blog platform with:

- ✍️ **Admin-controlled blog creation & publication**
- 💬 **User commenting system with moderation**
- 🤖 **AI-powered blog generation using Gemini**
- 🖼️ **Image upload & optimization via ImageKit**
- 🔐 **Secure and structured architecture**
- ⚙️ **Modern frontend using Vite with environment-based config**

---

## 📸 Features

### 👤 User Features
- View all published blogs
- Read individual blog posts
- Post comments on blogs

### 🛠️ Admin Features
- Create new blog posts (optionally using **Gemini AI**)
- Upload & optimize images using **ImageKit SDK**
- Publish / Unpublish blog posts
- Approve or delete user comments

---

## 🗂️ Folder Structure

```
/vexor
├── /frontend        # React + Vite (User Interface)
│   ├── /src
│   └── .env         # VITE_BASE_URL=""
│
└── /backend         # Node.js + Express + MongoDB (API)
    ├── /controllers
    ├── /routes
    ├── /models
    └── .env         # PORT=3000
```

---

## 🚀 Technologies Used

| Layer       | Tech Stack                          |
|-------------|--------------------------------------|
| Frontend    | React, Vite, Axios, Tailwind  |
| Backend     | Node.js, Express.js, MongoDB, Mongoose |
| Image Upload| ImageKit.io SDK                     |
| AI Content  | Gemini API (Google AI)              |
| Auth (optional) | JWT, bcrypt                     |

---

## ⚙️ Environment Setup

### 🔧 Frontend `.env` file
```env
VITE_BASE_URL="http://localhost:3000"
```

### 🔧 Backend `.env` file
```env
PORT=3000

MONGODB_URI=" "

IMAGEKIT_PUBLIC_KEY=" "
IMAGEKIT_PRIVATE_KEY=" "
IMAGEKIT_URL_ENDPOINT=" "

GEMINI_API_KEY=" "
JWT_SECRET=" "

ADMIN_EMAIL=" "
ADMIN_PASSWORD=" "
```

---

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/ishantmishra03/vexor.git
cd vexor
```

### 2. Install dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Start development servers

#### Backend
```bash
cd ../backend
npm run dev
```

#### Frontend
```bash
cd ../frontend
npm run dev
```

---

## 🔐 Authentication & Authorization

- Only authenticated admins can access routes for:
  - Creating blog posts
  - Publishing/unpublishing posts
  - Moderating comments
- JWT-based token auth system can be added for secure route protection.

---

## 🤖 AI-Powered Blog Creation

Using **Gemini API**, admins can auto-generate blog drafts by providing a title or keywords. These drafts can be reviewed, edited, and published directly from the admin panel.

---



## 📦 Deployment

- **Frontend**: Deploy via [Vercel](https://vercel.com), Netlify, or any static host.
- **Backend**: Deploy to Render, Heroku, or DigitalOcean.
- **MongoDB**: Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

---

## 📄 License

This project is licensed under the MIT License.

---




## 👨‍💻 Author

Developed with precision and care by **[Ishant Mishra]**  
Feel free to  explore my [GitHub](https://github.com/ishantmishra03).

