📚 Script Squad - E-commerce Book Store
Script Squad is a full-stack e-commerce platform where users can browse, purchase, and manage books seamlessly. Built with MERN stack (MongoDB, Express.js, React, Node.js), it offers user authentication, book management, and a smooth checkout process using Razorpay for payments.

🚀 Live Demo
🔗 Frontend Live Link
🔗 Backend Live Link

🛠 Tech Stack
Frontend:
React.js (Vite)
Redux Toolkit
Tailwind CSS
Chakra UI
React Router
EmailJS
Backend:
Node.js
Express.js
MongoDB & Mongoose
JWT Authentication
Cloudinary (for book images)
Razorpay (for payments)
⚡ Features
🛒 User Features
✅ Login & Signup (Google & Email authentication)
✅ Browse Books - View books with details
✅ Search & Filter - Find books easily
✅ Add to Cart - Save books before purchase
✅ Secure Payment - Buy books using Razorpay
✅ Order History - Track purchased books

🔑 Admin Features
✅ Add/Edit/Delete Books
✅ Manage Users & Orders

🔧 Installation & Setup
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/your-username/script-squad.git
cd script-squad
2️⃣ Backend Setup
sh
Copy
Edit
cd backend
npm install
npm start
📌 Environment Variables (.env)

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
CLOUDINARY_URL=your_cloudinary_url
3️⃣ Frontend Setup
sh
Copy
Edit
cd frontend
npm install
npm run dev
📌 Environment Variables (.env)

ini
Copy
Edit
VITE_REACT_APP_BACKEND_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_key
📌 Folder Structure
csharp
Copy
Edit
script-squad/
│── backend/                # Express.js Backend
│   ├── controllers/        # API controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   ├── middleware/         # Auth & error handling
│   ├── config/             # DB & env setup
│   ├── server.js           # Entry point
│
│── frontend/               # React.js Frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # App pages
│   │   ├── store/          # Redux store
│   │   ├── utils/          # Helper functions
│   │   ├── App.js          # Main app file
│   │   ├── main.jsx        # Entry point
│
└── README.md               # Documentation
⚡ API Endpoints
🔑 Auth Routes
POST /api/auth/register - Create new user
POST /api/auth/login - Login user
📚 Books Routes
GET /api/books - Get all books
POST /api/books - Add a book (Admin)
PUT /api/books/:id - Edit a book (Admin)
DELETE /api/books/:id - Remove a book (Admin)
🛒 Order Routes
POST /api/orders - Place an order
GET /api/orders/:userId - Get user orders
📜 License
This project is open-source and free to use.


