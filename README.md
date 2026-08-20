# Mern_Connect 🚀

A real-time video conferencing and chat application built with the MERN stack.

## Badges 🛡️

| Badge | Status |
|---|---||
| Build Status | [![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/Prakhar-Singh-17/Mern_Connect/actions) |
| Version | [![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/Prakhar-Singh-17/Mern_Connect) |
| License | [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) |
| Stars | [![GitHub Stars](https://img.shields.io/github/stars/Prakhar-Singh-17/Mern_Connect?style=social)](https://github.com/Prakhar-Singh-17/Mern_Connect/stargazers) |
| Forks | [![GitHub Forks](https://img.shields.io/github/forks/Prakhar-Singh-17/Mern_Connect?style=social)](https://github.com/Prakhar-Singh-17/Mern_Connect/forks) |

## Description 📝

Mern_Connect is a full-stack JavaScript application that facilitates real-time video calls and chat functionalities. It leverages the MERN (MongoDB, Express.js, React, Node.js) stack, along with Socket.IO for real-time communication and Tailwind CSS for styling.

Users can create or join video calls using a unique meeting code. The application supports authentication, allowing users to sign up and log in to access their call history. The video call interface provides essential controls like muting/unmuting audio and video, screen sharing, and an in-call chat feature.

## Table of Contents 📖

- [Project Title & Badges](#mern_connect-🚀)
- [Description](#description-📝)
- [Table of Contents](#table-of-contents-📖)
- [Features](#features-🌟)
- [Tech Stack](#tech-stack-🛠️)
- [Installation](#installation-⚙️)
- [Usage](#usage-💡)
- [Project Structure](#project-structure-📁)
- [Contributing](#contributing-🤝)
- [License](#license-⚖️)
- [Important Links](#important-links-🔗)
- [Footer](#footer-❤️)

## Features 🌟

- **Real-time Video Conferencing:** Connect with multiple users in real-time video calls.
- **In-call Chat:** Communicate with participants through a built-in chat feature.
- **User Authentication:** Secure signup and login system to manage user accounts.
- **Call History:** Track past video calls for logged-in users.
- **Meeting Code Generation:** Easily create or join calls using unique meeting codes.
- **Screen Sharing:** Share your screen with other participants.
- **Mute/Unmute Controls:** Manage your microphone and camera during calls.
- **Responsive Design:** User-friendly interface accessible on various devices.

## Tech Stack 🛠️

- **Frontend:** React, Vite, Tailwind CSS, Material-UI, React Router DOM, Socket.IO Client, Axios, React Toastify
- **Backend:** Node.js, Express.js, Mongoose, Socket.IO, Bcrypt, Dotenv, CORS
- **Database:** MongoDB
- **Languages:** JavaScript, HTML, CSS, JSON

## Installation ⚙️

### Prerequisites

- Node.js installed (`v18.x` or higher recommended)
- npm or yarn package manager
- MongoDB installed and running

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Prakhar-Singh-17/Mern_Connect.git
   cd Mern_Connect
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install backend dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Create a `.env` file in the `backend` directory and add your MongoDB connection string and frontend URL:
   ```env
   MONGO_URL=your_mongodb_connection_string
   FRONTEND_URL=http://localhost:5173
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the `frontend` directory and configure your backend API URLs:
   ```env
   VITE_BACKEND_API_URL_LOCAL=http://localhost:8080
   VITE_BACKEND_API_URL_PROD=your_production_backend_url
   VITE_BACKEND_URL_LOCAL=http://localhost:8080
   VITE_BACKEND_URL_PROD=your_production_backend_url
   ```

## Usage 💡

### Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   node index.js
   ```

2. **Start the frontend development server:**
   ```bash
   cd frontend
   npm run dev
   # or
   yarn dev
   ```

### Using Mern_Connect

1. **Landing Page:** Access the application via your browser (usually `http://localhost:5173`).
2. **Authentication:**
   - Click on "Login / Signup" to create a new account or log in to an existing one.
   - Use "Join as a Guest" to enter a video call without an account.
3. **Home Page:** After logging in, you will be redirected to the home page where you can:
   - Enter a meeting code to join or create a new call.
   - View your call history.
4. **Video Call Interface:**
   - Upon joining a call, you will enter the video call interface.
   - Use the controls at the bottom to manage your video, audio, screen sharing, and access the chat.
   - Share your screen by clicking the "Screen Share" icon.
   - Send messages in the chat window by clicking the "Message" icon.
   - Disconnect from the call using the "Call End" button.

### Creating a Meeting

1. On the Home page, enter a desired meeting code in the input field.
2. Click the "Join / Create" button.
3. If the meeting code is new, a new call will be created.
4. If the meeting code already exists, you will join the ongoing call.

### Joining a Meeting

1. You can join an existing meeting by:
   - Entering the known meeting code on the Home page and clicking "Join / Create".
   - Clicking a shared meeting link (if available).

## Project Structure 📁

```
Mern_Connect/
├── backend/
│   ├── controller/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── axiosConfig.js
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   └── vite.config.js
└── README.md
```

## Contributing 🤝

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.

Please ensure your code adheres to the project's coding style and includes relevant tests.

## License ⚖️

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Important Links 🔗

- **Live Demo:** [Link to Live Demo if available]
- **Author Profile:** [Prakhar Singh](https://github.com/Prakhar-Singh-17)

## Footer ❤️

**Mern_Connect** is a project by [Prakhar Singh](https://github.com/Prakhar-Singh-17).

- **Repository:** [Mern_Connect](https://github.com/Prakhar-Singh-17/Mern_Connect)
- **Contact:** prakharsingh1703@gmail.com

Feel free to **fork**, **like**, and **star** the repository!

If you encounter any issues or have suggestions, please open an issue.


---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**
