# Workbench - 个人工作台

一个简洁的个人工作台程序，用于管理和展示常用链接。

## 功能特性

- 📁 **分类管理** - 创建、编辑、删除链接分类
- 🔗 **链接管理** - 在分类中添加、编辑、删除链接
- ⚙️ **自定义设置** - 配置数据存储路径和背景颜色
- 💾 **本地存储** - 数据以 JSON 格式存储在本地
- 🎨 **简洁界面** - 响应式设计，操作直观

## 技术栈

- **前端**: HTML + CSS + JavaScript (原生)
- **后端**: Node.js + Express
- **数据存储**: JSON 文件

## 安装

1. 克隆或下载项目到本地
2. 安装依赖：

```bash
npm install
```

## 运行

### 开发模式

```bash
npm start
```

服务将运行在 `http://localhost:8202`

### 生产环境（开机自启动）

1. 复制 systemd 服务文件：

```bash
sudo cp workbench.service /etc/systemd/system/
```

2. 重载 systemd 配置：

```bash
sudo systemctl daemon-reload
```

3. 启用开机自启动：

```bash
sudo systemctl enable workbench.service
```

4. 启动服务：

```bash
sudo systemctl start workbench.service
```

### 服务管理命令

```bash
# 查看服务状态
sudo systemctl status workbench.service

# 停止服务
sudo systemctl stop workbench.service

# 重启服务
sudo systemctl restart workbench.service

# 查看日志
sudo journalctl -u workbench.service -f

# 禁用开机自启动
sudo systemctl disable workbench.service
```

## 使用说明

### 添加分类

1. 点击页面顶部的"添加分类"按钮
2. 输入分类名称
3. 点击"保存"

### 添加链接

1. 在分类标题右侧点击 ➕ 按钮
2. 输入链接名称和地址
3. 点击"保存"

### 编辑和删除

- 点击 ✏️ 按钮编辑分类或链接
- 点击 🗑️ 按钮删除分类或链接

### 设置

点击右上角的 ⚙️ 按钮打开设置面板：

- **数据存储路径**: 设置 JSON 数据文件的存储位置（默认：项目目录下的 `data` 文件夹）
- **背景颜色**: 使用颜色选择器自定义页面背景色

## 数据文件

- `config.json` - 存储配置信息（存储路径、背景色等）
- `data/links.json` - 存储链接数据（分类和链接信息）

## 项目结构

```
workbench/
├── server.js              # 后端服务
├── package.json           # 项目配置
├── workbench.service      # systemd 服务文件
├── public/                # 前端文件
│   ├── index.html        # 主页面
│   ├── style.css         # 样式文件
│   └── app.js            # 前端逻辑
├── config.json           # 配置文件（自动生成）
└── data/                 # 数据目录（自动生成）
    └── links.json        # 链接数据
```

## 端口配置

默认端口：`8202`

如需修改端口，编辑 `server.js` 文件中的 `PORT` 常量。

## 许可证

MIT
