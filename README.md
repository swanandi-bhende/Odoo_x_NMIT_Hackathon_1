# **EcoFinds**

**A full-stack e-commerce platform for buying and selling secondhand goods to promote sustainable consumption.**

---

##  **Features**

*  **User Authentication & Profiles** – Secure signup/login and personalized dashboards
*  **Product Listings** – CRUD operations for adding and managing secondhand items
*  **Helpful Search Bar** – Quickly find items with keyword-based search and advanced filters
*  **Leaflet Map Integration** – Detects the user’s **current location** and auto-fills delivery address during checkout
*  **Shopping Cart & Order Management** – Track purchases and orders
*  **Interactive Multi-Page UI** – Smooth navigation between home, listings, product details, cart, and profile pages
*  **Responsive Design** – Works on desktop, tablet, and mobile
*  **Sustainability Impact Tracking** – See how your buying and selling choices help the environment

---

##  **Tech Stack**

* **Frontend:** HTML, CSS, React, JavaScript, Tailwind CSS, Vite
* **Backend:** Node.js, Express
* **Database:** MySQL

---

##  **Project Structure**

```
client/                         
├── public/          
├── src/                     
│   ├── components/           
│   │   ├── Browsing/            
│   │   ├── Cart/               
│   │   ├── Dashboard/          
│   │   ├── Layout/              
│   │   ├── Profile/             
│   │   ├── Settings/            
│   │   └── common/             
│   │
│   ├── contexts/               
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── SettingsContext.jsx
│   │   └── SidebarContext.jsx
│   │
│   ├── data/                   
│   │   └── mockDB.js
│   │
│   ├── pages/                  
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
│   ├── utils/                  
│   │   └── dataService.jsx
│   │
│   ├── App.jsx                  
│   ├── main.jsx                
│   └── index.css                
│
├── package.json
├── vite.config.js              
├── tailwind.config.js           
├── postcss.config.js            
├── .eslintrc.cjs               
├── .gitignore
└── README_FIXES.md              

```

---

##  **Installation & Setup**

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

## 🔗 **GitHub Repository:**

`<(https://github.com/swanandi-bhende/Odoo_x_NMIT_Hackathon_1)>`
