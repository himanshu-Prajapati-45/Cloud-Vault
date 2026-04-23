# ☁️ CloudVault — Scalable File Storage System

> A secure, cloud-based document storage system that allows users to upload, manage, and access their files from anywhere.

![Tech Stack](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![AWS S3](https://img.shields.io/badge/Amazon_S3-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📌 About The Project

CloudVault is an OJT (On-Job Training) project built as a full-stack web application for secure file storage and management. Users can register, log in, upload files to AWS S3, and share them via secure time-limited links — all through a clean, responsive dashboard.

### 🎯 Problem It Solves
Many users struggle to securely store and organize important digital documents like bills, reports, and personal files. Files get scattered across devices or lost over time. CloudVault provides a centralized, secure, and easy-to-use cloud storage solution.

## 🚀 Features

- 🔐 **Secure Authentication** — JWT-based login and registration with bcrypt password hashing
- 📤 **File Upload** — Drag-and-drop upload with progress bar (PDF, PNG, JPG, DOCX, TXT)
- 📁 **File Dashboard** — View, download, and delete your uploaded files
- 🔗 **Secure Sharing** — Generate time-limited shareable links (no login required for recipients)
- 🔍 **Search & Filter** — Search files by name, filter by type, sort by date or name
- 📊 **Storage Tracker** — Live storage usage bar per user (max 500 MB)
- 🌙 **Dark Mode** — Toggle between light and dark themes
- 📱 **Responsive Design** — Works on mobile, tablet, and desktop

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React.js | UI framework |
| Tailwind CSS | Styling |
| Axios | HTTP requests to backend |
| React Router DOM | Page navigation |
| React Dropzone | Drag-and-drop file upload |
| React Hot Toast | Notifications |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| FastAPI (Python) | REST API framework |
| Uvicorn | ASGI server |
| Motor | Async MongoDB driver |
| bcrypt | Password hashing |
| python-jose | JWT token generation and verification |
| boto3 | AWS S3 SDK |
| Pydantic | Data validation and settings |

### Infrastructure
| Service | Purpose |
|---------|---------|
| MongoDB Atlas | Database (users + file metadata) |
| AWS S3 | File storage |
| Render.com | Backend deployment |
| Vercel | Frontend deployment |

## 📂 Project Structure

```
cloudvault/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileCard.jsx
│   │   │   ├── FileGrid.jsx
│   │   │   ├── UploadDropzone.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   └── ShareModal.jsx
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── DashboardPage.jsx
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── services/
│   │   │   └── api.js
│   │   └── utils/
│   │       └── helpers.js
│   └── tailwind.config.js
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth.py
│   │   │   ├── files.py
│   │   │   ├── share.py
│   │   │   └── deps.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   ├── database.py
│   │   │   └── s3.py
│   │   └── schemas/
│   │       ├── user.py
│   │       └── file.py
│   ├── main.py
│   └── requirements.txt
├── .env
└── README.md
```

## ⚙️ Local Setup & Installation

### Prerequisites
Make sure you have these installed:
- Node.js v18+
- Python 3.11+
- Git

### 1 — Clone the repository
```bash
git clone https://github.com/yourusername/cloudvault.git
cd cloudvault
```

### 2 — Create your .env file
```bash
cp .env.example .env
```
Fill in your values:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/cloudvault
SECRET_KEY=your-random-secret-key-min-32-chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
AWS_ACCESS_KEY_ID=your-key-id
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=ap-south-1
S3_BUCKET_NAME=your-bucket-name
MAX_FILE_SIZE_MB=10
ALLOWED_ORIGINS=http://localhost:3000
```

### 3 — Setup Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
Backend runs at: `http://localhost:8000`  
API docs at: `http://localhost:8000/docs`

### 4 — Setup Frontend
```bash
cd frontend
npm install
npm start
```
Frontend runs at: `http://localhost:3000`


## 🌐 Deployment

This project uses fully managed cloud services — no Docker or server configuration needed.

| Part | Platform | How |
|------|----------|-----|
| Frontend | Vercel | Auto-deploys from GitHub on every push |
| Backend | Render.com | Reads `requirements.txt`, auto-builds |
| Database | MongoDB Atlas | Managed cloud cluster (M0 free tier) |
| File Storage | AWS S3 | Private bucket with pre-signed URL access |

### Deploy Backend to Render.com
1. Push code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo → set Root Directory to `backend`
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add all `.env` variables in the Environment section
7. Deploy — copy the live URL

### Deploy Frontend to Vercel
1. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
2. Set Root Directory to `frontend`
3. Add environment variable: `REACT_APP_API_URL=https://your-render-url/api`
4. Deploy — Vercel builds and hosts automatically



## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login, get JWT token |
| GET | `/api/files/` | Yes | List all user files |
| POST | `/api/files/upload` | Yes | Upload a file |
| GET | `/api/files/{id}/download` | Yes | Get download URL |
| DELETE | `/api/files/{id}` | Yes | Delete a file |
| POST | `/api/files/{id}/share` | Yes | Generate share link |
| DELETE | `/api/files/{id}/share` | Yes | Revoke share link |
| GET | `/share/{token}` | No | Access shared file |
| GET | `/api/health` | No | Health check |



## 🔒 Security

- Passwords hashed with **bcrypt** — never stored as plain text
- **JWT tokens** expire after 30 minutes
- Files stored in **private S3 bucket** — no public access
- Downloads served via **pre-signed URLs** that expire in 5 minutes
- Share links expire after a user-defined time (1 hour / 24 hours / 7 days)
- Every file operation checks **ownership** — users can only access their own files
- `.env` file never committed to version control



## 📸 Screenshots

> _Add screenshots of your dashboard, upload modal, and share link here after completing the UI_



## 🗓️ Development Timeline

| Week | Deliverable |
|------|-------------|
| Week 1 | Project setup, folder structure, UI/UX design |
| Week 2 | MongoDB schema, FastAPI backend initialization |
| Week 3 | JWT authentication and bcrypt security |
| Week 4 | AWS S3 configuration and cloud storage integration |
| Week 5 | File upload logic and metadata storage |
| Week 6 | Dashboard UI and file management |
| Week 7 | Secure sharing, search and filtering |
| Week 8 | Testing, UI polish, and deployment |



## 📄 License

This project was built for educational purposes as part of an OJT program.



## 🙏 Acknowledgements

- **Mentor:** Divyashant Kumar — for guidance and feedback throughout the project
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [Tailwind CSS](https://tailwindcss.com/)
