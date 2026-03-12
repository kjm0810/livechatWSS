const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

/* Node 18에서도 기본 http 서버 생성 */
const server = http.createServer(app);

/* socket.io 서버 */
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

function getTime() {
  return new Date().toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* 테스트 라우트 */
app.get("/", (req, res) => {
  res.send("socket server running");
});

/* socket 연결 */
io.on("connection", (socket) => {
  console.log("user connected:", socket.id);
  io.emit("chat", {
    user_index: -1,
    id: socket.handshake.auth.id,
    message: `${socket.handshake.auth.id}님이 입장하였습니다.`,
  });

  socket.on("chat", (msg) => {
    console.log("message:", msg);

    /* 모든 사용자에게 전달 */
    io.emit("chat", 
      {
        ...msg,
        time: getTime(),
      }
    );
  });

  socket.on("chat-special", (msg) => {
    console.log("스페셜", msg);

    /* 모든 사용자에게 전달 */
    io.emit("chat-special", {
      ...msg,
      time: getTime()
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
});

/* 서버 실행 */
const PORT = 80;

server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});