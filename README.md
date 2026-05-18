# HirePilot Server

This repository contains the backend server for the HirePilot application. It provides authentication, user management, interviews, payments, and integrations such as Razorpay.

> Note: This repo appears to contain the backend only. If you have a separate frontend project, run it alongside this server to support the full end-to-end application.

## Prerequisites

- Node.js 18.x or newer
- npm 10.x or newer
- MongoDB instance running locally or remotely
- Razorpay account and API keys (if payment features are used)
- Optional: a frontend project folder if the UI is separate from this backend

## Backend Installation

1. Open a terminal in the project root:
   ```bash
   cd c:\Users\royj2\Desktop\HirePilot-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with your environment variables. Example variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/hirepilot
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. Confirm your MongoDB server is running and reachable from the configured `MONGODB_URI`.

## Backend Run

Start the backend server using the development script:

```bash
npm run dev
```

This runs `nodemon index.js`, so the server automatically restarts when files change.

## Backend API Endpoints

The backend routes are defined in the `routes/` directory and connected in `index.js`.

- `routes/auth.route.js` — authentication endpoints
- `routes/user.route.js` — user management
- `routes/interview.route.js` — interview-related APIs
- `routes/payment.route.js` — payment endpoints

## Frontend (End-to-End) Setup

If you have a separate frontend application for HirePilot, follow these general steps to run it alongside the backend.

1. Open a second terminal and navigate to your frontend project folder.
2. Install frontend dependencies (example for React/Vite):
   ```bash
   npm install
   ```
3. Add/update the API base URL in your frontend configuration to point to the backend server, for example:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

Once both servers are running, open the frontend URL in the browser and use the UI. The frontend should communicate with this backend for authentication, interviews, and payments.

## Notes

- If frontend code is not present in this repository, the backend can still be tested with tools such as Postman or curl.
- Update `.env` values with secure production credentials before deploying.
- If you add a frontend folder inside this repo later, you can include its install and run steps here.
