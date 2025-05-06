# 🛒 Forever E-Commerce Project

Deployed Link: [https://forever-frontend-bay.vercel.app/](https://forever-frontend-bay.vercel.app/) </br>
Admin Link:   [https://forever-admin-sigma-khaki.vercel.app/](https://forever-admin-sigma-khaki.vercel.app/)
## 📌 Project Overview

This is a fully functional E-Commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to browse products, add them to a cart, and place orders. Admins can manage product listings, user roles, and view order summaries.

## 🔧 Technologies Used

* **Frontend:** React.js, Redux Toolkit, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Authentication:** JWT (JSON Web Token)
* **Deployment:**

  * Frontend: Vercel
  * Backend & DB: Render / MongoDB Atlas

## ✨ Features

* User Authentication (Register / Login / Logout)
* Admin Panel for managing products and users
* Product listing, details page, and image gallery
* Shopping cart and order summary
* Responsive UI with Tailwind CSS

## 🚀 How to Run Locally

### Clone the repo

```bash
git clone https://github.com/MohdSabir111/Forever-E-Commerce/
cd forever-e-commerce
```

### Install dependencies for backend

```bash
cd backend
npm install
```

### Install dependencies for frontend

```bash
cd ../frontend
npm install
```

### Set up environment variables

Create `.env` files in both `backend` and `frontend` with necessary API keys and configs like:

**backend/.env**

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Run the app

```bash
# Run backend
cd backend
npm run dev

# Run frontend
cd ../frontend
npm start
```

## 📁 Folder Structure

```
forever-e-commerce/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   └── App.js
├── admin/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   └── App.js
```

## 🙋‍♂️ Author

**Mohd Sabir**

📧 [mohdsabir.work@gmail.com](mailto:mohdsabir.work@gmail.com)

---


