const { Server } = require("socket.io");

const io = new Server({ cors: { origin: ["http://localhost:3000"] } });

let rooms = [
  // {
  //   owner: "",
  //   music: "File",
  //   isPlaying: false,
  //   currentTime: 0,
  //   members: ["", ""],
  // },
];

const addMember = (roomId, memberId, socket) => {
  rooms.forEach((room) => {
    if (room.owner === roomId) {
      if (!room.members.includes(memberId)) {
        room.members.push(memberId);
        socket.emit("connected-to-room", room.owner, memberId);
        console.log(memberId, "joined");
      }
    }
  });
};
const removeMember = (memberId, socket) => {
  rooms.forEach((room) => {
    if (room.members.includes(memberId)) {
      const newMembers = room.members.filter((member) => member !== memberId);
      socket.emit("left");
      room.members = newMembers;
    }
  });
  console.log(memberId, "left the room");
};
const createRoom = (roomId, socket) => {
  rooms.push({ owner: roomId, members: [] });
  socket.emit("created-room", roomId);
  console.log("new room created", roomId);
};
const removeRoom = (roomId, socket) => {
  const newRooms = rooms.filter((room) => room.owner !== roomId);
  rooms.forEach((room) => {
    if (room.owner === roomId) {
      room.members.forEach((member) => {
        const s = io.sockets.sockets.get(member);
        s.emit("left");
      });
    }
  });
  rooms = newRooms;
  socket.emit("left");
  console.log(roomId, "room was removed:");
};

io.on("connection", (socket) => {
  console.log("new connection!", socket.id);
  socket.on("join-room", (data) => {
    addMember(data.roomId, socket.id, socket);
  });
  socket.on("create-room", () => {
    createRoom(socket.id, socket);
  });
  socket.on("change-is-playing", (isPlaying) => {
    rooms.forEach((room) => {
      if (room.owner === socket.id) {
        room.members.forEach((member) => {
          const s = io.sockets.sockets.get(member);
          s.emit("change-is-playing", isPlaying);
          console.log("isPlaying send for", member);
        });
      }
    });
  });
  socket.on("select-music", (file) => {
    console.log("file sended", file);
    rooms.forEach((room) => {
      if (room.owner === socket.id) {
        room.members.forEach((member) => {
          const s = io.sockets.sockets.get(member);
          s.emit("select-music", file);
          console.log("file sended for", member);
        });
      }
    });
  });
  socket.on("change-current-time", (currentTime) => {
    rooms.forEach((room) => {
      if (room.owner === socket.id) {
        room.members.forEach((member) => {
          const s = io.sockets.sockets.get(member);
          s.emit("change-current-time", currentTime);
          console.log("current time send for", member);
        });
      }
    });
  });
  socket.on("leave", (data) => {
    if (data.type === "owner") {
      removeRoom(socket.id, socket);
    }
    if (data.type === "member") {
      removeMember(socket.id, socket);
    }
  });
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected!`);
    rooms.forEach((room) => {
      if (room.owner === socket.id) {
        removeRoom(socket.id, socket);
      } else if (room.members.includes(socket.id)) {
        removeMember(socket.id, socket);
      }
    });
  });
});

io.listen(2626);
