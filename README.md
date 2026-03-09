# Second Brain (Workbench) 服务

## 端口配置

当前端口：**8203**

修改端口请编辑 `server.js` 中的 `PORT` 常量。

## 安装开机自启动服务

运行以下命令：

```bash
bash /home/dx/data/web/workbench/install-service.sh
```

或手动执行：

```bash
sudo cp /home/dx/data/web/workbench/workbench.service /etc/systemd/system/second-brain.service
sudo systemctl daemon-reload
sudo systemctl enable second-brain
sudo systemctl start second-brain
```

## 服务管理

```bash
# 查看状态
sudo systemctl status second-brain

# 重启
sudo systemctl restart second-brain

# 停止
sudo systemctl stop second-brain

# 查看日志
sudo journalctl -u second-brain -f
```

## 访问地址

http://localhost:8203
