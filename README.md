# Invoice Creator

A full invoice management app built with React, TypeScript, Material-UI, Express, and MongoDB.

## Features

- Manage clients
- Create and view invoices
- Cloud storage with MongoDB Atlas
- Deployed on Vercel (frontend) and Render (backend)

## Development

### Prerequisites

- Node.js
- MongoDB Atlas account

### Setup

1. Clone the repo
2. Install dependencies: `npm install`
3. Set up environment variables (see .env files)
4. Run locally: `npm run dev`

## Deployment

### Backend (Render)

1. Go to [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repo
4. Set build command: `npm run build:backend`
5. Set start command: `npm run start:backend`
6. Add environment variable: `MONGODB_URI` with your MongoDB connection string
7. Deploy

### Frontend (Vercel)

1. Go to [Vercel](https://vercel.com)
2. Create a new project
3. Connect your GitHub repo
4. Set environment variable: `VITE_API_BASE_URL` to your Render backend URL
5. Deploy

## Usage

- Add clients using the client form
- Create invoices linked to clients
- View lists of clients and invoices
