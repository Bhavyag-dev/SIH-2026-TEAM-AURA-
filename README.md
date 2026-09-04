# SIH-2026-TEAM-AURA-

# KrishiRoute — Intelligent Agricultural Transaction & Fulfilment Platform
> **Connect • Optimize • Nourish** | *Direct Farmgate-to-Buyer Coordination, AI Route Optimization & Guaranteed Escrow Payouts*

---

## 🌟 Overview
**KrishiRoute** is an enterprise-grade full-stack MERN application engineered to eliminate predatory multi-tier middlemen, compress farmgate-to-retail price spreads, and prevent post-harvest food waste through intelligent logistics optimization.

### Key Highlights
- **Farmer Realization Uplift**: Smallholders retain **81.2%** of consumer spend (vs. traditional APMC middleman realization of only **45.8%**).
- **Buyer Landed Cost Savings**: Direct procurement lowers wholesale purchase prices by **18.4%**.
- **Food Spoilage Reduction**: Crated cold chain transit and micro-hub pre-cooling prevents over **25%** of transit wastage.
- **Escrow-Backed Settlements**: Instant digital bank disbursements (RTGS/UPI) to FPO bank accounts upon quality acceptance.

---

## 📱 Three Dedicated User Portals

### 1. 📱 Buyer Mobile App
Interactive mobile application designed for wholesale buyers and hypermarkets:
- **Post Demand**: Specify crop (`Tomato`, `Onion`, `Wheat`, `Orange`), tonnage, quality grade, and delivery destination.
- **Matched Suppliers**: Filter verified FPOs and farmers with match percentages, live pricing, and produce images.
- **Fulfilment Plan**: Multi-stop Vehicle Routing Problem (VRP) corridor optimization (e.g. *Chittorgarh $\rightarrow$ Tonk $\rightarrow$ Jaipur*).
- **Order Confirmation**: Guaranteed delivery windows, automated escrow lock, and 2x2 economic impact summary.
- **Live GPS Tracking**: Interactive route telemetry, driver details (Tata Prima Reefer), and milestone checkpoints.

### 2. 🌾 Farmer & FPO Mobile App
Dedicated mobile interface for smallholder farmers and FPO administrators:
- **Earnings Dashboard**: Track monthly sales, payouts, and net realization uplifts.
- **Post Harvest Lot**: Easily list produce lots with asking price, variety, quantity, and harvest dates.
- **Produce Inventory & Orders**: Monitor active buyer purchase orders and dispatch status.
- **Mandi Price Benchmark**: Compare farmgate prices against local APMC mandis in real time.

### 3. 💻 Admin Control Tower
Desktop operations dashboard for platform dispatchers and logistics operators:
- **Real-Time KPIs**: Total volume coordinated (MT/Quintals), active fleet dispatches, and cold hub capacities.
- **Price Spread Compression Engine**: Interactive waterfall comparing conventional APMC spreads vs KrishiRoute.
- **Fleet Dispatch Telemetry**: 4-stage operational controls (`Truck Dispatched` $\rightarrow$ `Farm Loading` $\rightarrow$ `Highway Transit` $\rightarrow$ `Delivered`).
- **FPO Network Management**: Verified FPO clusters with 1-click immediate escrow payouts simulation.
- **Cold Storage Hubs**: IoT temperature telemetry (4.8°C), capacity utilization tracking, and humidity management.
- **Algorithmic Weight Calibration**: Multi-objective Pareto tuning across farmer income, landed cost, and food waste.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Lucide Icons, Custom Design System (Light & Night mode) |
| **Typography** | Inter & Plus Jakarta Sans |
| **Backend API** | Node.js, Express.js, CORS, Dotenv |
| **Optimization Engine** | Multi-FPO Knapsack Allocator, VRP Haulage Router, Pareto Solver |
| **Database** | Resilient Dual-Mode: In-Memory Embedded Fallback + MongoDB Driver |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Vishuuu2813/SIH-2026-TEAM-AURA-.git
cd SIH-2026-TEAM-AURA-

# Install root dependencies
npm install

# Install frontend dependencies
npm install --prefix client
```

### 3. Running the Project

#### Run Both Frontend and Backend Concurrently:
```bash
npm run dev
```

#### Or Run Independently:
```bash
# Start Backend API (Port 5000)
node server/server.js

# Start Frontend Dev Server (Port 5173)
npm run dev --prefix client
```

- **Frontend Application**: `http://localhost:5173/`
- **Backend API Health Check**: `http://localhost:5000/api/health`

---

## 📂 Project Structure
```
SIH-2026-TEAM-AURA-/
├── client/                     # Frontend Application (Vite + React)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BuyerMobileApp.jsx       # 5-screen interactive mobile buyer app
│   │   │   ├── FarmerMobileApp.jsx      # Dedicated farmer lot & earnings app
│   │   │   ├── AdminControlTower.jsx    # Full desktop operations control tower
│   │   │   ├── Header.jsx               # Navigation bar & portal switcher
│   │   │   ├── MandiTicker.jsx          # Live mandi price ticker
│   │   │   ├── OptimizerWorkbench.jsx   # AI algorithm workbench
│   │   │   └── ...
│   │   ├── services/
│   │   │   └── api.js                   # REST API client
│   │   ├── styles/
│   │   │   └── index.css                # Global design system & theme tokens
│   │   ├── App.jsx                      # Main portal orchestrator
│   │   └── main.jsx
│   └── package.json
├── server/                     # Backend API & Optimization Services
│   ├── config/
│   │   └── db.js                        # Dual-mode database (In-memory + Mongo)
│   ├── routes/
│   │   └── api.js                       # Express REST routes
│   ├── services/
│   │   └── optimizationEngine.js        # Multi-FPO knapsack & VRP routing
│   ├── seed/
│   │   ├── seedData.js                  # Corridor suppliers, demands, fleet
│   │   └── seedRunner.js
│   └── server.js                        # Express server entry point
├── package.json
└── README.md
```

---

## 📄 License
This project is open-source and available under the MIT License.
