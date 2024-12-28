# Project Setup Guide

This project consists of a frontend React application and a backend Express server. Follow these steps to get started:

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   This will launch the React application with hot module reloading enabled.

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory with the following configuration:
   ```
   DATABASE_NAME=your database name
   DATABASE_USERNAME=your database username
   DATABASE_PASSWORD=your database password
   DATABASE_HOST=your database host
   PORT=3000
   ```
4. Run database migrations:
   ```bash
   npm run migrate
   ```
5. Start the server:
   ```bash
   npm start
   ```

The backend server will run on port 3000 by default. Make sure you have MySQL installed and running before starting the backend server.
