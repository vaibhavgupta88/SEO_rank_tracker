# 🚀 SEO Rank Tracker & AI Website Analyzer

An AI-powered full-stack web application designed for comprehensive website SEO audits, automated keyword position tracking across Search Engine Result Pages (SERPs), and actionable performance analytics.

Powered by **React 19**, **Node.js/Express**, **MongoDB**, **Google Gemini AI**, and **Browserbase / Playwright**.

---

## 🚀 Features

- 🔍 **AI-Powered SEO Audits**: Deep-dive analysis of page speed, meta tags, heading hierarchy, content quality, and technical SEO structure powered by Google Gemini AI.
- 📊 **Keyword Rank Tracking**: Monitor search engine ranking positions for target keywords across domains over time.
- ⏱️ **Automated Background Cron Jobs**: Daily automated SERP tracking powered by `node-cron` and headless browser automation (`@browserbasehq/sdk` / Playwright).
- 📈 **Interactive Dashboards & Analytics**: Visualize rank progress, position movements (up/down/stable), score gauges, and historical audit logs.
- 📄 **Detailed Audit Reports**: Comprehensive reports featuring issue severity tags, actionable recommendations, and performance metrics.
- 🔐 **User Authentication**: Secure JWT-based registration, login, and user session management.

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **UI Elements & Notifications**: Lucide React, Simple Icons, React Hot Toast
- **AI SDK**: `@google/genai`

### Backend (`/server`)
- **Runtime**: Node.js + Express 5
- **Database**: MongoDB with Mongoose 9
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) & `bcrypt`
- **Headless Browser & Scraping**: Browserbase SDK (`@browserbasehq/sdk`) & `playwright-core`
- **AI Integration**: Google Gemini API (`@google/genai`)
- **Scheduling**: `node-cron`

---

## 📁 Repository Structure

```text
SEO_rank_tracker/
├── package.json               # Root scripts & concurrency manager
├── client/                    # React + Vite frontend workspace
│   ├── src/
│   │   ├── components/        # Reusable UI components & navigation
│   │   ├── context/           # App authentication & global context
│   │   ├── pages/             # App views (Dashboard, Analyze, RankTracker, History, etc.)
│   │   ├── App.tsx            # Routes setup
│   │   └── main.tsx           # Client entrypoint
│   ├── public/                # Static assets
│   ├── .env                   # Client environment configuration
│   └── package.json           # Frontend dependencies & scripts
└── server/                    # Node.js + Express backend workspace
    ├── config/                # Database connection & configurations
    ├── controllers/           # Auth, Analysis, & Rank tracking controllers
    ├── cron/                  # Automated daily rank tracking cron job
    ├── middleware/            # Auth & request handling middlewares
    ├── models/                # Mongoose database schemas
    ├── routes/                # Express API endpoints
    ├── services/              # Gemini AI, web scraper, & rank tracker services
    ├── .env                   # Backend environment secrets
    └── server.js              # Server entrypoint & route listener
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js**: v18 or higher recommended
- **npm** or **yarn**
- **MongoDB**: Local database instance or MongoDB Atlas cluster connection string
- **Google Gemini API Key**: For AI site audits & content analysis
- **Browserbase API Key**: For cloud-hosted SERP scraping & keyword rank lookups

---

### Environment Setup

#### 1. Backend Configuration (`server/.env`)
Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
BROWSERBASE_API_KEY=your_browserbase_api_key
```

#### 2. Frontend Configuration (`client/.env`)
Create a `.env` file inside the `client/` directory:

```env
VITE_BACKEND_URL=http://localhost:5000
```

---

### Installation & Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vaibhavgupta88/SEO_rank_tracker.git
   cd SEO_rank_tracker
   ```

2. **Install root dependencies**:
   ```bash
   npm install
   ```

3. **Install sub-project dependencies**:
   ```bash
   cd client && npm install
   cd ../server && npm install
   cd ..
   ```

4. **Run Frontend and Backend concurrently**:
   From the root directory:
   ```bash
   npm start
   ```
   - **Frontend**: http://localhost:5173
   - **Backend**: http://localhost:5000

---

## 📜 Available Scripts

From the root project directory:

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm start` | `concurrently "npm run backend" "npm run frontend"` | Starts backend server and Vite dev server simultaneously |
| `npm run backend` | `cd server && npm start` | Starts the Express server |
| `npm run frontend` | `cd client && npm run dev` | Launches the Vite frontend development server |

From the `client/` directory:
- `npm run dev`: Launch Vite dev server
- `npm run build`: Build production assets (`tsc -b && vite build`)
- `npm run preview`: Preview local production build

From the `server/` directory:
- `npm start`: Start server with `node server.js`
- `npm run server`: Start server in watch mode with `nodemon server.js`

---

## 🔗 Key API Routes

### Authentication (`/api/auth`)
- `POST /api/auth/register`: Register a new account
- `POST /api/auth/login`: Authenticate user and issue JWT

### SEO Site Analysis (`/api/analysis`)
- `POST /api/analysis/analyze`: Trigger site audit using scraper & Gemini AI
- `GET /api/analysis/history`: Fetch historical SEO reports for the authenticated user
- `GET /api/analysis/:id`: Retrieve detailed analysis report by ID

### Keyword Rank Tracking (`/api/rank`)
- `POST /api/rank/track`: Add keyword & domain for tracking
- `GET /api/rank/list`: Retrieve all tracked keywords & positions
- `GET /api/rank/:id`: Get detailed ranking history & position movements for a specific keyword

---

## 🌐 Deployment

Both `client/` and `server/` contain `vercel.json` configuration files ready for deployment on **Vercel**:
- **Client Deployment**: Deploy `client/` as a Single Page Application (SPA) with Vite.
- **Server Deployment**: Deploy `server/` as a Node.js Serverless API.

---

## 📄 License

This project is licensed under the MIT License.
