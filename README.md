# OrganizeMe

OrganizeMe is a powerful MERN stack web app for managing tasks and notes efficiently. It features task management with stats visualization, a note-taking system, and user authentication.

## Features

-   📝 **Smart Notes & Tasks** - Create, edit, and manage notes. Add tasks with deadlines and priority levels.
-   ✅ **Task Management** - Create to-do lists, track progress, and visualize stats with a pie chart.
-   🔐 **User Authentication** - Secure signup and login system.

## Tech Stack

-   **Frontend:** React, Tailwind CSS
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB
-   **State Management:** Context API
-   **Authentication:** JWT (JSON Web Tokens)

## Installation

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/OrganizeMe.git
cd OrganizeMe
```

### 2. Setup Backend

```sh
cd server
npm install
```

Create a `.env` file in the `server` directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```sh
npm run dev
```

### 3. Setup Frontend

```sh
cd client
npm install
```

Create a `.env` file in the `client` directory and add:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```sh
npm run dev
```

## Running the App

The backend runs on **http://localhost:5000** and the frontend on **http://localhost:5173**.
