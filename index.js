// 必要なライブラリを読み込む
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// アプリとサーバーを作成
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ポート番号（Renderが自動で割り当てるので process.env.PORT を使う）
const PORT = process.env.PORT || 3000;

// WebSocketの処理
io.on('connection', (socket) => {
  console.log('1人接続しました:', socket.id);

  // 手番を送受信
  socket.on('move', (data) => {
    // 相手に送信
    socket.broadcast.emit('move', data);
  });

  // 切断時
  socket.on('disconnect', () => {
    console.log('切断されました:', socket.id);
  });
});

// ルートURLアクセス時の応答（確認用）
app.get('/', (req, res) => {
  res.send('Chess Server is running!');
});

// サーバーを起動
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
