# 🎈 Xquiz-it - Digital Quiz Platform

**Xquiz-it** is an interactive digital quiz platform that allows users to take quizzes with multiple question types, get instant feedback on answers, and track their progress throughout. Built as part of a **GitHub Student Club** assigned project, Xquiz-it aims to provide an engaging and educational experience for quiz takers.

## ⛓️‍💥Features

- **Interactive Quiz Interface**: Take quizzes with ease using a user-friendly interface.
- **Multiple Question Types**: Includes MCQs and True/False questions.
- **Real-time Feedback**: Get instant feedback after answering questions.
- **Progress Tracking**: Track your progress and see how well you’re doing as you go.
- **Secure Authentication**: User authentication using **JWT** for secure access to quiz data.

## ⚙️Tech Stack

- **Frontend**:
  - React
  - Redux
  - React Router
  - Axios
  - Tailwind CSS
- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
- **Authentication**:
  - JWT (JSON Web Tokens)
  - bcrypt.js (Password hashing)
- **Development Tools**:
  - Nodemon (For auto-restarting the server)
  - Dotenv (For managing environment variables)

## 🚀Installation

### 1. Clone the repository

```bash
git clone https://github.com/ayyush08/Xquiz-it.git
cd Xquiz-it
```
### 2. Install dependencies

#### Frontend(Client) dependencies:

```bash
cd client
npm install
```
#### Backend(Server) dependencies:

```bash
cd server
npm install
```

### 3. Set up environment variables

Create a `.env` file in the `server` directory and add the following environment variables:

```bash
PORT=Y0UR_PORT
MONGO_URI=YOUR_MONGODB_URI
ACCESS_TOKEN_SECRET=YOUR_ACCESS_TOKEN_SECRET
ACCESS_TOKEN_EXPIRY=YOUR_ACCESS_TOKEN_EXPIRY_TIME
REFRESH_TOKEN_SECRET=YOUR_REFRESH_TOKEN_SECRET
REFRESH_TOKEN_EXPIRY=YOUR_REFRESH_TOKEN_EXPIRY_TIME
CORS_ORIGIN=YOUR_CORS_ORIGIN - frontend URL
```

Add the following environment variables in the `client` directory:

```bash
VITE_QUIZ_API_KEY=YOUR_API_KEY from (quizapi.io)
VITE_SERVER_URL=YOUR_SERVER_URL
```

### 4. Run the application

#### Frontend(Client):

```bash
cd client
npm run dev
```

#### Backend(Server):

```bash
cd server
npm run dev
```

Go to `http://localhost:5173` in your browser to view the application.


## 👀Feedback

Any feedback or suggestions are welcome! Feel free to open an issue or reach out to me on [Twitter](https://twitter.com/Ayush29081).