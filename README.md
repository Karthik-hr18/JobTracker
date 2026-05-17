# 💼 JobTracker

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Coming%20Soon-lightgrey?style=for-the-badge&logo=vercel&logoColor=white)]()

> **A full-featured, production-grade Job Application Tracking System** built with the MERN stack. Manage your entire job hunt from first application to final offer — all in one place.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT_7d-F7B93E?logo=jsonwebtokens&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Features

### 🔐 Authentication & Security
- **Register & Login** — Full email + password authentication with bcrypt hashing (10 salt rounds)
- **JWT Sessions** — Stateless auth tokens with **7-day expiry**, signed with a secret key
- **Protected Routes** — All job/profile endpoints are guarded by middleware; unauthenticated requests are rejected with `401`
- **Per-User Data Isolation** — Every job, profile, and stat is scoped exclusively to the logged-in user via `userId`
- **Helmet.js** — HTTP security headers automatically applied on every response
- **Joi Validation** — Server-side schema validation on all request bodies (register, login, create/update job, update profile)
- **Rate Limiting Ready** — `express-rate-limit` is installed and pre-configured (toggleable)
- **Global Error Handler** — Centralized Express error middleware for clean, consistent error responses

### 📋 Job Application Management
- **Add Application** — Track jobs with: Title, Company, Location, Status, Salary, Job Posting URL, and Personal Notes
- **View All Applications** — Paginated list view (10 per page) with full sort & filter controls
- **Edit Application** — Update any field of an existing job record in-place
- **Delete Application** — Remove job entries with a confirmation prompt
- **Status Pipeline** — 4-stage workflow: `Applied → Interview → Offer → Rejected`

### 🔍 Search, Filter & Sort
- **Full-text Search** — Searches across `title`, `company`, `role`, `location`, `jobLink`, and `notes` simultaneously using regex
- **Status Filter** — Filter the list to a single pipeline stage (Applied / Interview / Offer / Rejected)
- **Location Filter** — Partial match location search (e.g., "Remote", "New York")
- **Multi-column Sort** — Sort by `Latest`, `Oldest`, `Salary Low → High`, `Salary High → Low`
- **Server-side Pagination** — Dynamic `page` + `limit` query params with total page count in response

### 📊 Dashboard & Stats
- **KPI Cards** — Live counts for Total Applications, Active Interviews, Offers Received, and Rejections
- **Animated Stat Cards** — Staggered entrance animations using Framer Motion
- **Status-aware Accent Colors** — Each stat card and job card uses a distinct color gradient per status
- **Real-time Aggregation** — `jobStats` endpoint uses MongoDB aggregation pipeline (`$match` + `$group`) to calculate per-status counts server-side

### 🗂️ Kanban Board (Pipeline View)
- **4-Column Board** — Visualize your entire job pipeline: `Applied | Interview | Offer | Rejected`
- **Drag & Drop (Desktop)** — Move job cards between columns using `@dnd-kit/core` with `MouseSensor`
- **Touch DnD Support** — `TouchSensor` with a 250ms activation delay for mobile-friendly drag
- **Optimistic UI Updates** — Column moves update the UI instantly; API is called in the background and reverts on failure
- **Mobile Tabbed View** — On small screens, columns collapse into a horizontal scrollable tab bar showing one column at a time
- **Swipe Gestures** — Swipe left/right on mobile to navigate between columns (50px threshold)
- **Arrow Navigation** — Left/Right chevron buttons as a swipe fallback for all users
- **"Move to" Dropdown** — Mobile card-level select dropdown for moving jobs without drag
- **Colored Status Dots** — Each column header has a color-coded dot + ring badge (violet/amber/emerald/red)
- **Drop Zone Highlighting** — Active drop target column changes border and background on drag-over

### 👤 User Profile System
- **Rich Profile** — Username, Email, Profile Photo, Professional Role, Bio (max 300 chars), Phone, Location
- **Skills Tagging** — Comma-separated skills stored as a MongoDB array, displayed as pill chips
- **Experience Level** — Enum field: `Fresher`, `Junior`, `Mid-Level`, `Senior`
- **Social Links** — LinkedIn, GitHub, Portfolio Website — all clickable with external navigation
- **Resume Link** — Store and access a PDF resume link (Google Drive / Dropbox)
- **Photo Upload** — Upload a profile photo from device (max 2MB, stored as base64) or paste a URL
- **Profile Completion Meter** — Live percentage progress bar based on how many of 13 profile fields are filled
- **Edit Profile Page** — Dedicated multi-section form with server-side Joi validation

### 🎨 UI & UX
- **Premium SaaS Design** — Off-white (`#F4F5F9`) background with layered card shadows and violet accent palette
- **Collapsible Sidebar** — Animated sidebar with icon-only collapsed mode (72px) and full mode (240px)
- **Mobile Hamburger Menu** — Full-screen overlay sidebar with backdrop blur on mobile
- **Pill Navigation** — Active route highlighted with violet pill styling; no underlined links
- **Framer Motion Animations** — Smooth fade-up entrance and stagger animations throughout
- **react-hot-toast** — Non-intrusive toast notifications for all user actions
- **Responsive Grid** — 2-column on tablet → 3-column on desktop for job cards; 2-column → 4-column for stats
- **Hover Micro-interactions** — Cards lift on hover (`translateY(-4px)`) with glow shadow; buttons scale on press

---

## 🛠️ Tech Stack

<table>
<thead>
  <tr>
    <th>Layer</th>
    <th colspan="2">Frontend</th>
    <th colspan="2">Backend</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><strong>Framework</strong></td>
    <td>React 19</td>
    <td>Vite (build tool)</td>
    <td>Node.js</td>
    <td>Express 5</td>
  </tr>
  <tr>
    <td><strong>Routing</strong></td>
    <td colspan="2">React Router DOM 7</td>
    <td colspan="2">Express Router</td>
  </tr>
  <tr>
    <td><strong>Styling</strong></td>
    <td colspan="2">Tailwind CSS v4 (<code>@theme</code> tokens)</td>
    <td colspan="2">—</td>
  </tr>
  <tr>
    <td><strong>Animation</strong></td>
    <td colspan="2">Framer Motion</td>
    <td colspan="2">—</td>
  </tr>
  <tr>
    <td><strong>Drag & Drop</strong></td>
    <td colspan="2">@dnd-kit/core (mouse + touch)</td>
    <td colspan="2">—</td>
  </tr>
  <tr>
    <td><strong>Icons</strong></td>
    <td colspan="2">Lucide React</td>
    <td colspan="2">—</td>
  </tr>
  <tr>
    <td><strong>HTTP Client</strong></td>
    <td colspan="2">Axios (JWT interceptor)</td>
    <td colspan="2">—</td>
  </tr>
  <tr>
    <td><strong>Notifications</strong></td>
    <td colspan="2">react-hot-toast</td>
    <td colspan="2">—</td>
  </tr>
  <tr>
    <td><strong>Database</strong></td>
    <td colspan="2">—</td>
    <td colspan="2">MongoDB + Mongoose</td>
  </tr>
  <tr>
    <td><strong>Auth</strong></td>
    <td colspan="2">—</td>
    <td colspan="2">bcrypt + JWT</td>
  </tr>
  <tr>
    <td><strong>Validation</strong></td>
    <td colspan="2">—</td>
    <td colspan="2">Joi</td>
  </tr>
  <tr>
    <td><strong>Security</strong></td>
    <td colspan="2">—</td>
    <td colspan="2">Helmet.js + express-rate-limit</td>
  </tr>
</tbody>
</table>

---

## 📁 Project Structure

```
JobTracker/
├── Backend/                          # Node.js + Express REST API
│   ├── controllers/
│   │   └── controllers.js            # Auth, Job CRUD, Stats, Profile handlers
│   ├── middleware/
│   │   ├── authMiddleware.js         # JWT verification & req.user injection
│   │   ├── validate.js               # Joi validation middleware wrapper
│   │   └── errorHandler.js           # Centralized error response middleware
│   ├── models/
│   │   ├── userModel.js              # User schema (auth + full profile fields)
│   │   └── jobModel.js               # Job schema (userId, title, company, status…)
│   ├── routes/
│   │   ├── userRoutes.js             # /api/user — register, login, profile
│   │   └── jobRoutes.js              # /api/jobs — CRUD + stats
│   ├── validations/
│   │   └── jobValidator.js           # Joi schemas for all request types
│   ├── utils/
│   │   └── helperFunction.js         # successResponse / errorResponse helpers
│   ├── config/                       # DB connection config
│   ├── seed.js                       # Database seeding script
│   ├── app.js                        # Express setup, CORS, Helmet, routes
│   └── package.json
│
└── frontend/                         # React 19 + Vite client
    └── src/
        ├── components/
        │   ├── auth/
        │   │   ├── login.jsx          # Login form (email + password)
        │   │   └── reg.jsx            # Register form (username, email, password, confirm)
        │   ├── jobs/
        │   │   ├── showJobs.jsx       # Dashboard — job list, KPI cards, search/filter/sort
        │   │   ├── createJob.jsx      # Add new job application form
        │   │   ├── updateJob.jsx      # Edit existing job form
        │   │   └── kanban.jsx         # Drag-and-drop pipeline board (desktop + mobile)
        │   └── layout/
        │       ├── root.jsx           # Public landing/home page
        │       ├── sideBar.jsx        # Collapsible sidebar navigation
        │       ├── Navbar.jsx         # Top navigation bar
        │       ├── profileSection.jsx # Profile view with completion meter & social links
        │       └── updateProfile.jsx  # Edit profile form (photo, bio, links, skills…)
        ├── api/
        │   └── api.jsx                # Axios instance with JWT Authorization header
        ├── App.jsx                    # Router config, auth state, Layout wrapper
        └── index.css                  # Tailwind v4 @theme tokens + global component styles
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** running locally or a MongoDB Atlas cluster
- **npm** or **yarn**

### 1. Clone the Repository

```bash
git clone https://github.com/Karthik-hr18/JobTracker.git
cd JobTracker
```

### 2. Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:

```env
PORT=7000
MONGO_URL="mongodb://localhost:27017/jobtracker"
JWT_SECRET="your_super_secret_key_here"
```

Start the backend server:

```bash
node app.js
# or with auto-reload:
npx nodemon app.js
```

> API will be available at `http://localhost:7000`

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

> App will open at `http://localhost:5173` (Vite default)

---

## 🔑 API Endpoints

### User Auth — Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/user/userReg` | Register a new user |
| `POST` | `/api/user/userLogin` | Login and receive JWT token |

### User Profile — Protected (JWT Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/user/profile/:id` | Fetch full user profile (excludes password) |
| `PUT` | `/api/user/update/profile/:id` | Update any profile fields (partial update) |

### Job Applications — Protected (JWT Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/jobs/create` | Add a new job application |
| `GET` | `/api/jobs/getAll` | Get all jobs — supports search, filter, sort & pagination |
| `GET` | `/api/jobs/:id` | Get a single job by ID |
| `PUT` | `/api/jobs/update/:id` | Update job fields (at least 1 field required) |
| `DELETE` | `/api/jobs/delete/:id` | Delete a job entry |
| `GET` | `/api/jobs/getTotalJobs` | Count of all user's jobs |
| `GET` | `/api/jobs/jobStats` | Per-status counts via MongoDB aggregation |

### Query Parameters — `GET /api/jobs/getAll`

| Param | Type | Description | Example |
|-------|------|-------------|---------|
| `search` | string | Regex search across title, company, location, notes | `search=google` |
| `status` | string | Exact filter by status | `status=Interview` |
| `location` | string | Partial match on location | `location=remote` |
| `sort` | string | Sort order | `latest` `oldest` `salary` `salary-desc` |
| `page` | number | Page number (default: 1) | `page=2` |
| `limit` | number | Results per page (default: 10) | `limit=20` |

---

## 🗄️ Data Models

### User

| Field | Type | Details |
|-------|------|---------|
| `username` | String | Required, unique, min 3 chars |
| `email` | String | Required, unique, lowercase |
| `password` | String | bcrypt hashed (10 rounds) |
| `profilePhoto` | String | URL or base64 image |
| `role` | String | Professional title, e.g. "Frontend Developer" |
| `bio` | String | Max 300 characters |
| `phone` | String | Contact number |
| `location` | String | City / Country |
| `skills` | [String] | Array of skill strings |
| `linkedin` | String | LinkedIn profile URL |
| `github` | String | GitHub profile URL |
| `portfolio` | String | Personal website URL |
| `resume` | String | PDF link (Google Drive / Dropbox) |
| `experienceLevel` | Enum | `Fresher` `Junior` `Mid-Level` `Senior` |

### Job

| Field | Type | Details |
|-------|------|---------|
| `userId` | ObjectId | Ref → User (owner, required) |
| `title` | String | Job title |
| `company` | String | Company name |
| `status` | Enum | `Applied` `Interview` `Offer` `Rejected` |
| `location` | String | Work location / Remote |
| `salary` | Number | Expected or offered salary |
| `jobLink` | String | URL to the job posting |
| `notes` | String | Personal notes, next steps |
| `createdAt` | Date | Auto-generated (Mongoose timestamps) |
| `updatedAt` | Date | Auto-updated (Mongoose timestamps) |

---

## 🔒 Authentication Flow

```
1. User registers → password hashed with bcrypt (10 rounds) → saved to MongoDB
2. JWT issued on both register AND login → 7-day expiry
3. Token stored in localStorage → Axios interceptor attaches it as Bearer on every request
4. authMiddleware verifies JWT → injects req.user.id → all queries scoped to that user
5. Logout clears localStorage token → client redirects to /userLogin
6. Unauthenticated requests return 401 before reaching any controller
```

---

## 📱 Pages & Routes

| Page | Route | Auth | Description |
|------|-------|:----:|-------------|
| Landing | `/` | ❌ | Marketing home page with feature highlights & CTAs |
| Register | `/userRegister` | ❌ | Create account |
| Login | `/userLogin` | ❌ | Sign in with email & password |
| Dashboard | `/dashboard` | ✅ | Job list, KPI cards, search/filter/sort/pagination |
| Kanban | `/kanban` | ✅ | Drag-and-drop 4-column pipeline board |
| Add Job | `/createJob` | ✅ | Form to track a new job application |
| Edit Job | `/updateJob/:id` | ✅ | Update any existing job's fields |
| Profile | `/profile` | ✅ | View profile with completion meter & social links |
| Edit Profile | `/updateProfile/:id` | ✅ | Multi-section edit form |

---

## 🛡️ Security Highlights

| Feature | Implementation |
|---------|---------------|
| Password Hashing | bcrypt with 10 salt rounds |
| JWT Auth | 7-day tokens, HS256 algorithm |
| HTTP Headers | `helmet()` applied globally |
| Input Validation | Joi schemas on every mutating endpoint |
| Route Protection | `protectRoute` middleware verifies JWT before every protected handler |
| Data Isolation | All queries include `userId: req.user.id` — users can only access their own data |
| Rate Limiting | `express-rate-limit` pre-installed and configurable |
| Error Handling | Global `errorHandler` middleware — no stack traces leak to clients |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/Karthik-hr18">Karthik</a></p>
  <p>
    <a href="https://github.com/Karthik-hr18/JobTracker">⭐ Star this repo</a> ·
    <a href="https://github.com/Karthik-hr18/JobTracker/issues">🐛 Report Bug</a> ·
    <a href="https://github.com/Karthik-hr18/JobTracker/issues">💡 Request Feature</a>
  </p>
</div>
