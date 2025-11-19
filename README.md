# Resort Booking Web App

A full-stack resort booking application built with Next.js, TypeScript, Express, and MongoDB.

## Features

- **Home Page**: Hero section, services showcase, and gallery
- **Booking Form**: Client-side validation and API integration
- **Admin Dashboard**: View all bookings with pagination and lazy loading
- **Admin Authentication**: JWT-based authentication for admin endpoints
- **Clean Architecture**: MVC pattern with service layer separation
- **Type Safety**: Full TypeScript implementation
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Query
- Axios
- Lucide React Icons

### Backend
- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- Zod (Validation)
- JWT (Authentication)
- Bcrypt (Password Hashing)

## Project Structure

```
mcTest/
├── frontend/          # Next.js application
│   ├── app/          # App router pages
│   ├── components/   # React components
│   ├── lib/          # Utilities and API client
│   └── types/        # TypeScript types
│
└── backend/          # Express API
    ├── src/
    │   ├── controllers/  # Request handlers
    │   ├── services/     # Business logic
    │   ├── models/       # Mongoose models
    │   ├── routes/       # API routes
    │   ├── middleware/   # Express middleware
    │   └── config/       # Configuration files
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
MONGODB_URI=mongodb://localhost:27017/resort-booking
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@gmail.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=24h
```

5. Start the development server:
```bash
npm run dev
```

The backend API will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Public Endpoints

#### POST /api/bookings
Create a new booking

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "checkIn": "2024-01-15",
  "checkOut": "2024-01-20",
  "guests": 2,
  "roomType": "Room"
}
```

#### POST /api/auth/login
Admin login

**Request Body:**
```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```
or
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt-token-here",
    "admin": {
      "email": "admin@gmail.com",
      "username": "admin"
    }
  }
}
```

### Protected Endpoints

#### GET /api/bookings
Get all bookings with pagination (requires JWT token)

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": {
    "data": [...],
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

## Room Types

- Room
- Suite
- Villa

## Development

### Backend Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run type-check` - Type check without building

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

### Backend
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS
- `ADMIN_EMAIL` - Admin email for authentication
- `ADMIN_USERNAME` - Admin username for authentication
- `ADMIN_PASSWORD` - Admin password (will be hashed)
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRES_IN` - Token expiration time (default: 24h)

### Frontend
- `NEXT_PUBLIC_API_URL` - Backend API URL

## Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Input sanitization
- Zod validation
- JWT authentication
- Bcrypt password hashing
- Error handling middleware

## License

ISC






