# 🍅 Tomato — Food Delivery Web App

A full-stack food delivery web application built with React, Node.js, and MongoDB. Users can browse a food menu, manage their cart, place orders, and make payments.

---

## 🚀 Features

- 🔐 User Authentication (Sign Up / Login popup)
- 🍽️ Browse food menu with categories
- 🛒 Add / Remove items from cart
- 💰 Dynamic cart total with delivery fee calculation
- 📦 Place orders with delivery information form
- 💳 Proceed to payment flow
- 🖼️ Food images served from backend
- 📱 Responsive design for mobile and desktop

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| React | UI framework |
| React Router DOM | Client-side routing |
| Context API | Global state management (cart, food list) |
| Axios | HTTP requests to backend |
| React Toastify | Toast notifications |
| CSS Modules | Component-level styling |

### Backend
| Tech | Purpose |
|------|---------|
| Node.js | Server runtime |
| Express.js | REST API framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |

---

## 📁 Project Structure
Tomato/
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/          # Images, icons
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   ├── LoginPopup/  # Auth modal
│   │   │   └── ...
│   │   ├── Context/
│   │   │   └── StoreContext.jsx  # Cart & food state
│   │   ├── pages/
│   │   │   ├── Cart/        # Cart page
│   │   │   ├── PlaceOrder/  # Checkout page
│   │   │   └── ...
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── package-lock.json
│
└── Backend/
├── models/
├── routes/
├── uploads/             # Food images
├── server.js
└── package.json
---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm

---

### 1. Clone the Repository

```bash
git clone https://github.com/DevSpectra31/tomato.git
cd tomato
```

---

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` folder:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm start
```

The backend runs on `http://localhost:4000`

---

### 3. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/register` | Register new user |
| POST | `/api/user/login` | Login user |
| GET | `/api/food/list` | Get all food items |
| POST | `/api/order/place` | Place an order |
| GET | `/images/:filename` | Serve food images |

---

## 📸 Screenshots

> *(Add screenshots of your app here)*

| Home | Cart | Checkout |
|------|------|----------|
| ![home]() | ![cart]() | ![checkout]() |

---

## 🐛 Known Issues / TODO

- [ ] Payment gateway integration
- [ ] Order history page
- [ ] Admin dashboard for managing food items
- [ ] Email confirmation on order placement

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---


---

## 👨‍💻 Author

**Your Name**
- GitHub: [@DevSpectra31](https://github.com/DevSpectra31)

---

> Built with ❤️ using React & Node.js