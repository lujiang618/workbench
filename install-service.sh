#!/bin/bash
# Second Brain (Workbench) 服务安装脚本

set -e

echo "🔧 安装 Second Brain 服务..."

# 复制服务文件
sudo cp /home/dx/data/web/workbench/workbench.service /etc/systemd/system/second-brain.service
echo "✅ 服务文件已复制"

# 重新加载 systemd
sudo systemctl daemon-reload
echo "✅ systemd 已重新加载"

# 启用开机自启动
sudo systemctl enable second-brain
echo "✅ 已启用开机自启动"

# 启动服务
sudo systemctl restart second-brain
echo "✅ 服务已启动"

# 显示状态
echo ""
echo "📊 服务状态:"
sudo systemctl status second-brain --no-pager

echo ""
echo "🌐 访问地址：http://localhost:8203"
