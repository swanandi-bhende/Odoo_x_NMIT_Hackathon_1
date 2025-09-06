# 🌿 **EcoFinds**

**A full-stack e-commerce platform for buying and selling secondhand goods to promote sustainable consumption.**

---

## 📌 **Overview**

**EcoFinds** is designed to make sustainable shopping easy and interactive. Users can explore, buy, and sell secondhand products through a **multi-page web interface**, track their sustainability impact, and conveniently set their **delivery location** using a map that detects their **current location**.

**Users can:**

* 🔐 **Securely sign up and log in**
* 🔎 **Browse products using advanced search and filters**
* 📝 **Add, update, or delete their product listings**
* 🗺️ **Automatically fill delivery address during checkout via a Leaflet map detecting their current location**
* 🛒 **Manage their shopping cart and orders**
* 🌱 **Track their sustainability impact**
* 📱 **Enjoy a responsive, multi-page interface**

---

## 🚀 **Features**

* 🛒 **User Authentication & Profiles** – Secure signup/login and personalized dashboards
* 📦 **Product Listings** – CRUD operations for adding and managing secondhand items
* 🔍 **Helpful Search Bar** – Quickly find items with keyword-based search and advanced filters
* 🗺️ **Leaflet Map Integration** – Detects the user’s **current location** and auto-fills delivery address during checkout
* 🛍️ **Shopping Cart & Order Management** – Track purchases and orders
* 🖥️ **Interactive Multi-Page UI** – Smooth navigation between home, listings, product details, cart, and profile pages
* 📱 **Responsive Design** – Works on desktop, tablet, and mobile
* 🌱 **Sustainability Impact Tracking** – See how your buying and selling choices help the environment

---

## 🛠️ **Tech Stack**

* **Frontend:** HTML, CSS, React, JavaScript, Tailwind CSS, Vite
* **Backend:** Node.js, Express
* **Database:** MySQL

---

## 📂 **Project Structure**

```
client/                          # React frontend (Vite)
├── public/                      # Static assets (if any)
├── src/                         # Source code
│   ├── components/              # Reusable UI components
│   │   ├── Browsing/            # Product browsing components
│   │   ├── Cart/                # Cart-related components
│   │   ├── Dashboard/           # Dashboard layout components
│   │   ├── Layout/              # Global layout (header, sidebar, etc.)
│   │   ├── Profile/             # User profile form + map
│   │   ├── Settings/            # Settings panel
│   │   └── common/              # Shared UI (loader, badge, etc.)
│   │
│   ├── contexts/                # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── SettingsContext.jsx
│   │   └── SidebarContext.jsx
│   │
│   ├── data/                    # Mock database / sample data
│   │   └── mockDB.js
│   │
│   ├── pages/                   # Route-based pages
│   │   ├── Browsing.jsx
│   │   ├── Cart.jsx
│   │   ├── CouponsPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── MyListingsPage.jsx
│   │   ├── OrdersPage.jsx
│   │   ├── Profile.jsx
│   │   ├── RecentBuyingsPage.jsx
│   │   ├── Signup.jsx
│   │   ├── SupportPage.jsx
│   │   └── WishlistPage.jsx
│   │
│   ├── utils/                   # Utility functions/services
│   │   └── dataService.jsx
│   │
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global CSS / Tailwind styles
│
├── package.json
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS config
├── .eslintrc.cjs                # ESLint rules
├── .gitignore
└── README_FIXES.md              # Fixes/notes (added by me)

```

---

## ⚙️ **Installation & Setup**

**Clone the Repository:**

```bash
git clone (https://github.com/swanandi-bhende/Odoo_x_NMIT_Hackathon_1)
cd ecofinds
```

**Install Dependencies:**

```bash
npm install
```

**Start Development Servers:**

```bash
npm run dev
```

*Access the app in your browser at the local development URL.*

---

## 🐞 **Challenges Faced**

* **Leaflet Map Integration:** Detecting the user’s current location and integrating it with checkout initially caused state management issues. Resolved by creating a dedicated location component and passing coordinates to the checkout form.
* **Search & Filtering:** Ensuring fast, accurate results across multiple product categories required optimizing backend queries and frontend filtering logic.
* **Multi-Page Routing:** Handling smooth navigation and consistent state across pages in React needed careful use of React Router and context APIs.
* **Database Syncing:** Keeping MySQL tables consistent with frontend operations (CRUD) required careful API design and error handling.

---

## 💡 **Future Improvements**

* Push notifications for order updates and delivery reminders
* Integration with payment gateways for secure transactions
* Enhanced sustainability analytics and visualizations
* Option for users to save favorite delivery addresses

---

## 📜 **License**

**This project is licensed under the Apache License.**

---

## 🔗 **GitHub Repository:**

`<(https://github.com/swanandi-bhende/Odoo_x_NMIT_Hackathon_1)>`
