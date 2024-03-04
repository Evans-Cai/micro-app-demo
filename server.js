// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5000;
const basePath = '/gzcommunitytv';

// 使用 body-parser 中间件解析 JSON 数据
app.use(bodyParser.json());

// 设置 base 路径
app.use(basePath, express.static(path.join(__dirname, 'dist')));

// 处理 POST 请求
app.post(`${basePath}/api`, (req, res) => {
  console.log('POST data:', req.body);
  res.json({ message: 'POST request received' });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}${basePath}`);
});
