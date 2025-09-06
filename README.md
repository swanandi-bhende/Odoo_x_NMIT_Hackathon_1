🌿 EcoFinds

A full-stack e-commerce platform for buying and selling secondhand goods to promote sustainable consumption.

📌 Overview
EcoFinds is designed to make sustainable shopping easy and interactive. Users can explore, buy, and sell secondhand products through a multi-page web interface, track their sustainability impact, and conveniently set their delivery location using a map that detects their current location.

Users can:

Securely sign up and log in.

Browse products using advanced search and filters.

Add, update, or delete their product listings.

Automatically fill their delivery address during checkout via a Leaflet map that detects their current location.

Manage their shopping cart and orders.

Track their sustainability impact by viewing eco-friendly shopping statistics.

Enjoy a responsive, multi-page interface for seamless browsing.

🚀 Features

🛒 User Authentication & Profiles – Secure signup/login and personalized dashboards.

📦 Product Listings – CRUD operations for adding and managing secondhand items.

🔍 Helpful Search Bar – Quickly find items with keyword-based search and advanced filters.

🗺️ Leaflet Map Integration – Detects the user’s current location and auto-fills the delivery address during checkout.

🛍️ Shopping Cart & Order Management – Track purchases and orders.

🖥️ Interactive Multi-Page UI – Smooth navigation between home, listings, product details, cart, and profile pages.

📱 Responsive Design – Works on desktop, tablet, and mobile.

🌱 Sustainability Impact Tracking – See how your buying and selling choices help the environment.

🛠️ Tech Stack

Frontend: HTML, CSS, React, TypeScript, Tailwind CSS, Vite

Backend: Node.js, Express

Database: MySQL


⚙️ Installation & Setup
Clone the repository:
```
git clone <repository-url>
cd ecofinds
```

Install dependencies:
```
npm install
```

Start development servers:
```
npm run dev
```

The frontend and backend will now run locally, allowing you to access the app in your browser.

🐞 Challenges Faced

Leaflet Map Integration: Detecting the user’s current location and integrating it with checkout initially caused state management issues. Resolved by creating a dedicated location component and passing coordinates to the checkout form.

Search & Filtering: Ensuring fast, accurate results across multiple product categories required optimizing backend queries and frontend filtering logic.

Multi-Page Routing: Handling smooth navigation and consistent state across pages in React needed careful use of React Router and context APIs.

Database Syncing: Keeping MySQL tables consistent with frontend operations (CRUD) required careful API design and error handling.

💡 Future Improvements

Push notifications for order updates and delivery reminders.

Integration with payment gateways for secure transactions.

Enhanced sustainability analytics and visualizations.

Option for users to save favorite delivery addresses.

📜 License
This project is licensed under the Apache License.

🔗 GitHub Repository: <your-repository-link>
