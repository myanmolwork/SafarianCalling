# 📹 Safarian Calling – Video Chat App

A real-time **video calling web app** built using **WebRTC**, **Socket.io**, and **Node.js**.  
Users can make **1:1 video calls** via personal codes or connect randomly with strangers using a match feature.

> 🌐 **Live Demo**: [https://safariancalling.onrender.com](https://safariancalling.onrender.com)

---

## 🚀 Features

- 🔗 Connect using a **personal code**
- 🎲 Connect with a **random stranger**
- 📹 High-quality **video and audio calling**
- 📡 Real-time signaling with **Socket.io**
- 🧠 Built using **WebRTC** for peer-to-peer connection
- 📷 Support for camera, mic, and screen sharing
- 🎙️ Recording support (coming soon!)
- 🖥️ Fully frontend + backend in one deployment

---

## 🧑‍💻 Tech Stack

| Frontend              | Backend           | Real-Time       |
|-----------------------|-------------------|------------------|
| HTML, CSS, JavaScript | Node.js, Express  | Socket.io, WebRTC |

---

## 📁 Folder Structure
videochat/
├── app.js # Main server file
├── package.json
├── public/
│ ├── index.html
│ ├── js/
│ │ ├── ui.js
│ │ ├── wss.js
│ │ └── ... (other JS files)
│ └── utils/
│ └── images/
│ ├── chatButton.png
│ ├── recordingStart.png
│ ├── pause.png
│ └── ... (other assets)




---

## ⚙️ Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/videochat.git
   cd videochat

Install dependencies
npm install
Run the app
npm run dev

Open your browser and visit:
http://localhost:3000

🌐 Deployment
This app is hosted on Render using their free plan.
Both backend and frontend are served from a single Node.js Express app.

👨‍💻 Author
Anmol Nagar
🧑‍🎓 BSc Computer Science Student