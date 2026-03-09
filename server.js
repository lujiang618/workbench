const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8202;

app.use(express.json());
app.use(express.static('public'));

// 默认配置
const defaultConfig = {
  dataPath: path.join(__dirname, 'data'),
  backgroundColor: '#f5f5f5'
};

// 配置文件路径
const configPath = path.join(__dirname, 'config.json');

// 读取配置
function getConfig() {
  try {
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
  } catch (err) {
    console.error('读取配置失败:', err);
  }
  return defaultConfig;
}

// 保存配置
function saveConfig(config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

// 获取数据文件路径
function getDataFilePath() {
  const config = getConfig();
  if (!fs.existsSync(config.dataPath)) {
    fs.mkdirSync(config.dataPath, { recursive: true });
  }
  return path.join(config.dataPath, 'links.json');
}

// 读取链接数据
function getData() {
  const dataFile = getDataFilePath();
  try {
    if (fs.existsSync(dataFile)) {
      return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    }
  } catch (err) {
    console.error('读取数据失败:', err);
  }
  return { categories: [] };
}

// 保存链接数据
function saveData(data) {
  const dataFile = getDataFilePath();
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// API 路由
app.get('/api/config', (req, res) => {
  res.json(getConfig());
});

app.post('/api/config', (req, res) => {
  saveConfig(req.body);
  res.json({ success: true });
});

app.get('/api/data', (req, res) => {
  res.json(getData());
});

app.post('/api/data', (req, res) => {
  saveData(req.body);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`工作台服务运行在 http://localhost:${PORT}`);
});
