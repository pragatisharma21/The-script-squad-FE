
# Bookstore Web Application

## About
This is a full-stack web application that allows users to browse and purchase books, manage their profiles, and become fleet admins to sell their own books. The project integrates Google OAuth for authentication and Razorpay for secure payments. Admin functionalities enable efficient tracking and approval processes for payments and requests.

---

## Folder Structure
```
- dist
- node_modules
- public
    - logo.png
    - vite.svg
- src
    - Api
    - assets
    - components
        - custom
        - ui
    - context
    - hooks
    - lib
    - pages
    - routes
    - App.css
    - App.jsx
    - index.css
    - main.jsx
- .env
- .gitignore
- books.json
- components.json
- eslint.config.js
- index.html
- jsconfig.json
- package-lock.json
- package.json
- postcss.config.js
```

---

## Project Type
**Full-Stack Web Application**

## Deployment Link
The project is live at: [Bookstore Application](https://the-script-squad-fe.vercel.app)

---

## Technology Used
- **Frontend**: React, Tailwind CSS, Shadcn
- **State Management**: Context API
- **Backend**: MongoDB
- **Authentication**: Google OAuth
- **Payments**: Razorpay

---

## Project Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Add your environment variables in the `.env` file (e.g., MongoDB URI, Razorpay keys, Google OAuth credentials).
4. Start the development server using `npm run dev`.

---

## Problem It Solves
- Simplifies online book shopping with easy browsing and payment options.
- Empowers users to sell their own books by becoming fleet admins.
- Provides admin controls to manage user requests and track payments.

---

## Team Credits
**Team Name**: The Script Squad  
**Members**:
- Pragati Sharma
- Hani Thakkar
- Sandeep
- Kenche Bala Dattu

---

## What We Learned From the Project
- Implementing **Google OAuth** for seamless user login.
- Setting up **Razorpay** for secure payment integration.
- Broad use of **Context API** for state management.
- Efficient **admin panel** functionality.

---

## Major Functionalities
1. **Google Login**:
   - Allows users to log in via Google OAuth.
   - Stores user details securely in MongoDB.

2. **User Dashboard**:
   - Displays all available books.
   - Add books to cart and make payments using Razorpay.

3. **Profile Management**:
   - Users can update their profile information.
   - Updated data is stored in MongoDB.

4. **Fleet Admin Request**:
   - Users can request to become fleet admins by paying a nominal fee (1 rupee).
   - Requests are reviewed and approved by the admin.

5. **Admin Panel**:
   - Tracks payments for book purchases and fleet admin requests.
   - Approves fleet admin requests.

---

## Screenshots
1. **Google Login**: ![image](https://github.com/user-attachments/assets/c1cbe546-d3cd-477d-bf32-7b5f5146cd8d)
---------------------------------------------------
2. **Book Purchase**: ![image](https://github.com/user-attachments/assets/ca3aad15-d805-4c9d-81c0-a62a00e35e82)
![image](https://github.com/user-attachments/assets/40fea042-cee6-4c57-b6b9-fd722f20f3a3)
---------------------------------------------------
3. **Admin Panel**:![image](https://github.com/user-attachments/assets/278412ba-4b36-4846-8b1a-79a966db21f3)
---------------------------------------------------

---

## Future Scope
- **Advanced Search and Filter**: Implementing a robust search system to enhance book discovery.
- **Recommendation System**: Suggest books based on user preferences and history.
- **Analytics Dashboard**: Provide detailed analytics for admins to track user activity and sales.
- **Mobile App**: Create a mobile-friendly version of the application for better accessibility.
- **Enhanced Security**: Implement additional layers of security for user data and transactions.

