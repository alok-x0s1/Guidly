# Guidly

Welcome to the backend repository for **Guidly**, a mentorship matching platform. This application is built with **Express**, **TypeScript**, and **Prisma**, and implements robust features like user authentication, profile management, and mentorship matchmaking.

## Features

-   **User Authentication**: Secure login and registration using JWT and bcrypt.
-   **Profile Management**: User profiles with roles (mentor or mentee), skills, and interests.
-   **Mentorship Matching**: Suggests matches based on shared skills and interests.
-   **Notifications**: Users are notified about mentorship requests and updates.
-   **File Uploads**: Users can upload profile pictures with Multer.
-   **Input Validation**: Ensures data integrity using Zod.

---

## Tech Stack

-   **Express**: Backend framework.
-   **TypeScript**: Strongly typed JavaScript.
-   **Prisma**: ORM for interacting with a PostgreSQL database.
-   **JWT**: Secure authentication mechanism.
-   **Bcrypt**: Password hashing for secure storage.
-   **Multer**: File uploads for profile avatars.
-   **Zod**: Schema validation for input data.

---

## Installation

### Prerequisites

-   **Node.js**: Ensure Node.js (v16 or higher) is installed.
-   **PostgreSQL**: Set up a PostgreSQL database.

### Steps

1. **Clone the repository**:

    ```bash
    git clone https://github.com/alok-x0s1/Guidly.git
    cd Guidly/server
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and add the following:

    ```env
    DATABASE_URL=your_database_url
    CLIENT_URL=your_frontend_url
    NODE_ENV=development
    JWT_TOKEN_SECRET=your_jwt_secret
    jwt_token_expiry=your_jwt_token_expiry
    ```

4. **Generate Prisma client**:

    ```bash
    npx prisma generate
    ```

5. **Run database migrations**:

    ```bash
    npx prisma migrate dev
    ```

6. **Start the development server**:

    ```bash
    npm run dev
    ```

---

## API Endpoints

### Authentication

-   **POST** `/api/auth/register`: Register a new user.
-   **POST** `/api/auth/login`: Authenticate a user and return a JWT.
-   **POST** `/api/auth/logout`: Log out a user.

### Profile Management

-   **POST** `/api/profile`: Create a new profile.
-   **GET** `/api/profile`: Fetch authenticated user's profile.
-   **GET** `/api/profile/:id`: Fetch a specific profile.
-   **PATCH** `/api/profile/:id`: Update profile information.
-   **DELETE** `/api/profile/:id`: Delete a profile.
-   **POST** `/api/profile/:id/skills`: Add skills to a profile.
-   **POST** `/api/profile/:id/interests`: Add interests to a profile.

### Mentorship

-   **GET** `/api/mentorship`: Get all mentors.
-   **GET** `/api/mentorship/:id`: Get a specific mentor.
-   **GET** `/api/mentorship/matches`: Get mentorship matches.
-   **POST** `/api/mentorship/request`: Send a mentorship request.
-   **GET** `/api/mentorship/requests`: View all mentorship requests.
-   **GET** `/api/mentorship/requests/sent`: View sent mentorship requests.
-   **GET** `/api/mentorship/requests/received`: View received mentorship requests.
-   **GET** `/api/mentorship/active`: View active mentorship connections.
-   **POST** `/api/mentorship/accept/:requestId`: Accept a mentorship request.
-   **POST** `/api/mentorship/decline/:requestId`: Decline a mentorship request.

### Notifications

-   **GET** `/api/notifications`: Retrieve user notifications.
-   **GET** `/api/notifications/:id`: Retrieve a specific notification.
-   **PUT** `/api/notifications/:id/seen`: Mark a notification as seen.

Endpoints are defined in the `routes` directory, and controllers handle the business logic.

---

## Scripts

-   **`npm run dev`**: Start the development server.
-   **`npm run build`**: Build the application.
-   **`npm start`**: Start the production server.
-   **`npx prisma studio`**: Open Prisma Studio for database management.

---

## Security

-   Passwords are hashed using bcrypt before storing in the database.
-   JWT is used for secure user authentication and session management.
-   Input validation with Zod ensures all inputs meet required criteria.

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## Acknowledgements

-   [Express](https://expressjs.com/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Prisma](https://www.prisma.io/)
-   [JWT](https://jwt.io/)
-   [Zod](https://zod.dev/)
