# Knowable

**Knowable** is a mobile learning application inspired by Duolingo, designed to provide an interactive and fun way to learn a specific topic or skill. This application is currently under development and leverages the following technologies:

## Tech Stack

### Frontend:

- **React Native**: Enables cross-platform compatibility for Android and iOS devices.

### Backend:

- **NestJS**: A robust Node.js framework for scalable backend API development.
- **GraphQL**: Ensures efficient and flexible communication between the frontend and backend.
- **TypeORM**: Manages database interactions with an ORM approach.
- **PostgreSQL**: A relational database for efficient data storage and retrieval.

---

## Project Architecture

The application follows a clean and modular architecture:

1. **Frontend (React Native)**:

   - Serves as the user-facing interface for Android and iOS devices.
   - Communicates with the backend via GraphQL APIs.

2. **Backend (NestJS)**:

   - Handles business logic and API routing.
   - Ensures secure and scalable operations.
   - Integrates with TypeORM for structured database interactions.

3. **Database (PostgreSQL)**:
   - Stores user data, progress, and application content.

---

## Features

- User authentication and profile management.
- Cross-platform compatibility (iOS and Android).
- Interactive and engaging learning modules.
- Real-time updates and data synchronization.
- Scalable backend with efficient data handling.

---

## Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (latest version)

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/knowable.git
   ```

## generating modules

nest g resource <name>
