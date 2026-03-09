let data = { categories: [] };
let config = {};
let currentCategoryIndex = null;
let currentLinkIndex = null;

// 初始化
async function init() {
  await loadConfig();
  await loadData();
  applyConfig();
  render();
}

// 加载配置
async function loadConfig() {
  const response = await fetch('/api/config');
  config = await response.json();
}

// 加载数据
async function loadData() {
  const response = await fetch('/api/data');
  data = await response.json();
}

// 保存数据
async function saveData() {
  await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

// 应用配置
function applyConfig() {
  document.body.style.backgroundColor = config.backgroundColor || '#f5f5f5';
}

// 渲染页面
function render() {
  const container = document.getElementById('categories');

  if (data.categories.length === 0) {
    container.innerHTML = '<div class="empty-state">暂无分类，点击"添加分类"开始使用</div>';
    return;
  }

  container.innerHTML = data.categories.map((category, catIndex) => `
    <div class="category">
      <div class="category-header">
        <div class="category-title">${category.name}</div>
        <div class="category-actions">
          <button class="btn-small" onclick="addLink(${catIndex})" title="添加链接">➕</button>
          <button class="btn-small" onclick="editCategory(${catIndex})" title="编辑">✏️</button>
          <button class="btn-small" onclick="deleteCategory(${catIndex})" title="删除">🗑️</button>
        </div>
      </div>
      <div class="links">
        ${category.links && category.links.length > 0 ? category.links.map((link, linkIndex) => `
          <div class="link-item">
            <div class="link-content">
              <a href="${link.url}" target="_blank" class="link-name" title="${link.url}">${link.name}</a>
            </div>
            <div class="link-actions">
              <button class="btn-small" onclick="editLink(${catIndex}, ${linkIndex})" title="编辑">✏️</button>
              <button class="btn-small" onclick="deleteLink(${catIndex}, ${linkIndex})" title="删除">🗑️</button>
            </div>
          </div>
        `).join('') : '<div class="empty-state">暂无链接</div>'}
      </div>
    </div>
  `).join('');
}

// 设置相关
function openSettings() {
  document.getElementById('dataPath').value = config.dataPath || '';
  document.getElementById('backgroundColor').value = config.backgroundColor || '#f5f5f5';
  document.getElementById('settingsModal').classList.add('active');
}

function closeSettings() {
  document.getElementById('settingsModal').classList.remove('active');
}

async function saveSettings() {
  config.dataPath = document.getElementById('dataPath').value;
  config.backgroundColor = document.getElementById('backgroundColor').value;

  await fetch('/api/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config)
  });

  applyConfig();
  closeSettings();
}

// 分类相关
function addCategory() {
  currentCategoryIndex = null;
  document.getElementById('categoryModalTitle').textContent = '添加分类';
  document.getElementById('categoryName').value = '';
  document.getElementById('categoryModal').classList.add('active');
}

function editCategory(index) {
  currentCategoryIndex = index;
  document.getElementById('categoryModalTitle').textContent = '编辑分类';
  document.getElementById('categoryName').value = data.categories[index].name;
  document.getElementById('categoryModal').classList.add('active');
}

function closeCategoryModal() {
  document.getElementById('categoryModal').classList.remove('active');
}

async function saveCategory() {
  const name = document.getElementById('categoryName').value.trim();
  if (!name) {
    alert('请输入分类名称');
    return;
  }

  if (currentCategoryIndex === null) {
    data.categories.push({ name, links: [] });
  } else {
    data.categories[currentCategoryIndex].name = name;
  }

  await saveData();
  render();
  closeCategoryModal();
}

async function deleteCategory(index) {
  if (confirm('确定要删除这个分类吗？')) {
    data.categories.splice(index, 1);
    await saveData();
    render();
  }
}

// 链接相关
function addLink(catIndex) {
  currentCategoryIndex = catIndex;
  currentLinkIndex = null;
  document.getElementById('linkModalTitle').textContent = '添加链接';
  document.getElementById('linkName').value = '';
  document.getElementById('linkUrl').value = '';
  document.getElementById('linkModal').classList.add('active');
}

function editLink(catIndex, linkIndex) {
  currentCategoryIndex = catIndex;
  currentLinkIndex = linkIndex;
  const link = data.categories[catIndex].links[linkIndex];
  document.getElementById('linkModalTitle').textContent = '编辑链接';
  document.getElementById('linkName').value = link.name;
  document.getElementById('linkUrl').value = link.url;
  document.getElementById('linkModal').classList.add('active');
}

function closeLinkModal() {
  document.getElementById('linkModal').classList.remove('active');
}

async function saveLink() {
  const name = document.getElementById('linkName').value.trim();
  const url = document.getElementById('linkUrl').value.trim();

  if (!name || !url) {
    alert('请输入链接名称和地址');
    return;
  }

  if (!data.categories[currentCategoryIndex].links) {
    data.categories[currentCategoryIndex].links = [];
  }

  if (currentLinkIndex === null) {
    data.categories[currentCategoryIndex].links.push({ name, url });
  } else {
    data.categories[currentCategoryIndex].links[currentLinkIndex] = { name, url };
  }

  await saveData();
  render();
  closeLinkModal();
}

async function deleteLink(catIndex, linkIndex) {
  if (confirm('确定要删除这个链接吗？')) {
    data.categories[catIndex].links.splice(linkIndex, 1);
    await saveData();
    render();
  }
}

// 启动应用
init();
