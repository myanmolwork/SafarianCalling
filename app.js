const express = require("express");
const http = require("http");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

let connectedPeers = [];
let connectedPeersStrangers = [];

io.on("connection", (socket) => {
  connectedPeers.push(socket.id);

  socket.on("pre-offer", (data) => {
    console.log("pre-offer-came");
    const { calleePersonalCode, callType } = data;
    console.log(calleePersonalCode);
    console.log(connectedPeers);
    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === calleePersonalCode
    );

    console.log(connectedPeer);

    if (connectedPeer) {
      const data = {
        callerSocketId: socket.id,
        callType,
      };
      io.to(calleePersonalCode).emit("pre-offer", data);
    } else {
      const data = {
        preOfferAnswer: "CALLEE_NOT_FOUND",
      };
      io.to(socket.id).emit("pre-offer-answer", data);
    }
  });

  socket.on("pre-offer-answer", (data) => {
    const { callerSocketId } = data;

    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === callerSocketId
    );

    if (connectedPeer) {
      io.to(data.callerSocketId).emit("pre-offer-answer", data);
    }
  });

  socket.on("webRTC-signaling", (data) => {
    const { connectedUserSocketId } = data;

    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === connectedUserSocketId
    );

    if (connectedPeer) {
      io.to(connectedUserSocketId).emit("webRTC-signaling", data);
    }
  });

  socket.on('user_hanged_up', (data)=>
  {
    const { connectedUserSocketId } = data;
    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === connectedUserSocketId
    );
    if(connectedPeer)
    {
      io.to(connectedUserSocketId).emit("user-hanged-up");
    }

  })
  
socket.on("stranger-connection-status", (data) => {
  const { status } = data;

  if (status) {
    // Prevent duplicates
    if (!connectedPeersStrangers.includes(socket.id)) {
      connectedPeersStrangers.push(socket.id);
    }
  } else {
    // Remove from the pool
    connectedPeersStrangers = connectedPeersStrangers.filter(
      (peerSocketId) => peerSocketId !== socket.id
    );
  }

  console.log("Updated Stranger Pool:", connectedPeersStrangers);
});

socket.on('get-stranger-socket-id', () => {
  let randomStrangerSocketId = null;

  const filteredConnectedPeersStrangers = connectedPeersStrangers.filter(
    (peerSocketId) => peerSocketId !== socket.id
  );

  if (filteredConnectedPeersStrangers.length > 0) {
    randomStrangerSocketId =
      filteredConnectedPeersStrangers[
        Math.floor(Math.random() * filteredConnectedPeersStrangers.length)
      ];
  }

  // ✅ Send object with proper key
  io.to(socket.id).emit('stranger-socket-id', {
    randomStrangerSocketId,
  });
});


  socket.on("disconnect", () => {
    console.log("user disconnected");

    const newConnectedPeers = connectedPeers.filter(
      (peerSocketId) => peerSocketId !== socket.id
    );

    connectedPeers = newConnectedPeers;
    console.log(connectedPeers);
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
