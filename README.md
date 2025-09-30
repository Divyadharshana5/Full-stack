# Full-Stack CRUD Application

A complete CRUD application with React frontend and Express.js backend connected to MongoDB Atlas.

## Features

- ✅ React frontend with Material-UI components
- ✅ Express.js backend with RESTful API
- ✅ MongoDB Atlas database integration
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Form validation and error handling
- ✅ Responsive design

## Project Structure

```
Full-stack/
├── Frontend/          # React application
├── Server/           # Express.js API server
├── package.json      # Root package.json for running both apps
└── README.md
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (already configured)

### Installation & Running

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

2. **Start both frontend and backend:**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:3001
   - Frontend application on http://localhost:3000

### Individual Commands

- **Start backend only:**
  ```bash
  npm run server
  ```

- **Start frontend only:**
  ```bash
  npm run client
  ```

## API Endpoints

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/test` - Test server connection

## Environment Variables

The server uses the following environment variables (already configured in `.env`):
- `PORT=3001`
- `MONGODB_URI` - MongoDB Atlas connection string

## Usage

1. Open http://localhost:3000 in your browser
2. Fill out the user form with required information
3. Click "Submit" to create a new user
4. View all users in the table below the form
5. Use Edit/Delete buttons to modify or remove users
6. The data is automatically saved to MongoDB Atlas

## Technologies Used

### Frontend
- React 18
- Material-UI (MUI)
- Axios for API calls
- Day.js for date handling

### Backend
- Express.js
- MongoDB with Mongoose
- CORS for cross-origin requests
- dotenv for environment variables

## Database Schema

User model includes:
- first_Name (required)
- last_Name (required)
- date_of_birth
- email (required)
- gender
- country, state, city
- address
- pincode
- timestamps (createdAt, updatedAt)