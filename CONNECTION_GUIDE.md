# ITBEES Global - Full Stack Application

## Project Structure
- **Backend**: `C:\Users\Jagadeesh osuru\Desktop\abc-be`
- **Frontend**: `C:\Users\Jagadeesh osuru\Desktop\abc`

## Setup Instructions

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd "C:\Users\Jagadeesh osuru\Desktop\abc-be"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Initialize database (if needed):
   ```bash
   npm run init-db
   npm run seed
   ```

4. Start backend server:
   ```bash
   npm run dev
   ```
   Backend will run on: http://localhost:5000

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd "C:\Users\Jagadeesh osuru\Desktop\abc"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start frontend development server:
   ```bash
   npm run dev
   ```
   Frontend will run on: http://localhost:5173

## Environment Variables

### Backend (.env)
- Already configured in `abc-be/.env`
- PORT: 5000
- DATABASE_URL: PostgreSQL connection
- JWT secrets for authentication
- Razorpay keys for payments
- SMTP settings for email

### Frontend (.env)
- Created at `abc/.env`
- VITE_API_URL: http://localhost:5000/api

## API Connection
- Frontend proxy is configured in `vite.config.js`
- All API calls from frontend will proxy to backend at `http://localhost:5000`
- The backend CORS is configured to accept requests from `http://localhost:5173`

## Fixed Issues
1. ✅ Removed non-existent `inqsApi` import in Home.jsx
2. ✅ Changed to use `publicApi.submitInquiry()` instead
3. ✅ Removed unused `addLog` prop from Home component
4. ✅ Added proxy configuration in vite.config.js
5. ✅ Created .env file for frontend with VITE_API_URL
6. ✅ Fixed inquiry submission to match backend schema (using subject instead of company)

## Available Routes

### Public Routes
- GET  /api/public/courses
- GET  /api/public/jobs
- POST /api/public/inquiries
- POST /api/public/jobs/apply
- POST /api/public/purchase/otp
- POST /api/public/purchase/initiate
- POST /api/public/purchase/verify
- GET  /api/public/assessments
- POST /api/public/assessments/submit

### Admin Routes
- POST /api/admin/login
- POST /api/admin/logout
- CRUD operations for courses, jobs, inquiries, etc.

## Notes
- Make sure PostgreSQL database is running
- Backend must be running before testing frontend API calls
- Default admin credentials should be created via seed script
