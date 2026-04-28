# BriteShop - 可持续时尚电商网站 / Sustainable Fashion E-Commerce Website

- 一个完整的可持续时尚电商网站，包含响应式布局、动态产品展示、数据库图片管理和丰富的交互动效。  
- A complete sustainable fashion e‑commerce website featuring responsive layout, dynamic product display, database‑driven image management, and rich interactive effects.

## 在线预览 / Live Demo

- 将项目部署到任意 PHP 服务器（如 XAMPP、WAMP、阿里云ECS）即可访问。  
- Deploy the project to any PHP server (e.g., XAMPP, WAMP, Alibaba Cloud ECS) to view.

## 功能特点 / Features

| 类别 | 功能 |
|------|------|
| **响应式设计** | 完美适配桌面端、平板和移动设备 |
| **动态内容加载** | 产品、系列、评价通过 JavaScript 动态渲染 |
| **数据库图片管理** | 所有图片从 MySQL 数据库读取，方便后台维护 |
| **平滑滚动导航** | 点击导航栏平滑滚动至目标章节 |
| **移动端汉堡菜单** | 移动设备自适应交互 |
| **滚动高亮** | 滚动时自动高亮当前章节对应的导航链接 |
| **星级评价系统** | 客户评价五星展示 |
| **丰富交互动效** | 鼠标轨迹、磁吸按钮、涟漪点击、视差滚动、渐入动画 |

---

| Category | Feature |
|----------|---------|
| **Responsive Design** | Perfectly adapts to desktop, tablet, and mobile devices |
| **Dynamic Content Loading** | Products, collections, and reviews are dynamically rendered via JavaScript |
| **Database‑Driven Images** | All images are loaded from a MySQL database for easy backend maintenance |
| **Smooth Scroll Navigation** | Clicking nav links smoothly scrolls to the target section |
| **Mobile Hamburger Menu** | Adaptive interaction on mobile devices |
| **Scroll Highlighting** | Automatically highlights the current section's nav link while scrolling |
| **Star Rating System** | Displays customer reviews with 5‑star ratings |
| **Rich Interactive Effects** | Mouse trail, magnetic buttons, ripple clicks, parallax scrolling, fade‑in animations |

## 技术栈 / Tech Stack

| 技术 | 用途 |
|------|------|
| HTML5 | 页面结构 |
| TailwindCSS | 实用优先的 CSS 框架 |
| JavaScript (ES6+) | 动态逻辑、DOM 操作、交互动效 |
| PHP 7.4+ | 数据库连接与图片 API |
| MySQL | 图片数据存储 |

---

| Tech | Purpose |
|------|---------|
| HTML5 | Page structure |
| TailwindCSS | Utility‑first CSS framework |
| JavaScript (ES6+) | Dynamic logic, DOM manipulation, interactive effects |
| PHP 7.4+ | Database connection and image API |
| MySQL | Image data storage |

## 文件结构 / File Structure
```
shopping-website/
├── index.html # 主页面（包含 TailwindCDN 与自定义样式）
├── script.js # 动态渲染、动画效果、交互逻辑
├── styles.css # 自定义动画、鼠标轨迹、涟漪等效果
├── get_images.php # PHP 后端：读取数据库返回图片 JSON
└── README.md # 项目说明（中英双语）
```

> 无需 npm 安装，直接部署到 PHP 环境即可运行。  
> No npm installation required – just deploy to a PHP environment.

## 运行方式 / How to Run

### 环境要求 / Prerequisites

- PHP 7.4 或更高版本
- MySQL 数据库
- Web 服务器（Apache/Nginx）或本地开发环境（XAMPP/WAMP/MAMP）

---

- PHP 7.4 or higher
- MySQL database
- Web server (Apache/Nginx) or local development environment (XAMPP/WAMP/MAMP)

### 安装步骤 / Installation Steps

#### 1. 下载项目文件

将所有文件放置到 Web 服务器的文档根目录下：
- XAMPP: `htdocs/shopping-website/`
- WAMP: `www/shopping-website/`

#### 2. 创建数据库并导入数据表

登录 MySQL 并执行以下 SQL：

```sql
CREATE DATABASE testdb;
USE testdb;

CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_name VARCHAR(255) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO product_images (image_name, image_url) VALUES
('hero-fashion', 'https://your-image-host.com/hero-fashion.jpg'),
('eco-tshirt', 'https://your-image-host.com/eco-tshirt.jpg'),
('organic-denim', 'https://your-image-host.com/organic-denim.jpg'),
('recycled-hoodie', 'https://your-image-host.com/recycled-hoodie.jpg'),
('sustainable-dress', 'https://your-image-host.com/sustainable-dress.jpg'),
('cotton-skirt', 'https://your-image-host.com/cotton-skirt.jpg'),
('eco-jacket', 'https://your-image-host.com/eco-jacket.jpg'),
('summer-collection', 'https://your-image-host.com/summer-collection.jpg'),
('winter-collection', 'https://your-image-host.com/winter-collection.jpg'),
('workwear-collection', 'https://your-image-host.com/workwear-collection.jpg');
```

#### 3. 配置数据库连接

编辑 `get_images.php` 文件，修改数据库连接参数：

```php
$servername = "数据库地址";
$username = "数据库用户名";
$password = "数据库密码";
$database = "testdb";
```

#### 4. 启动服务并访问

1. 启动 Apache/Nginx 与 MySQL 服务
2. 浏览器访问 `http://localhost/shopping-website/index.html`

## 图片键值对照表 / Image Key Reference

| image_name | 用途说明 | 使用位置 |
|------------|----------|----------|
| `hero-fashion` | 首页横幅主图 | 英雄区 Hero Section |
| `eco-tshirt` | 产品 - 环保T恤 | 产品网格 |
| `organic-denim` | 产品 - 有机牛仔 | 产品网格 |
| `recycled-hoodie` | 产品 - 回收材料卫衣 | 产品网格 |
| `sustainable-dress` | 产品 - 可持续连衣裙 | 产品网格 |
| `cotton-skirt` | 产品 - 棉质半身裙 | 产品网格 |
| `eco-jacket` | 产品 - 环保夹克 | 产品网格 |
| `summer-collection` | 系列 - 夏日必备 | 系列展示区 |
| `winter-collection` | 系列 - 冬日系列 | 系列展示区 |
| `workwear-collection` | 系列 - 职场穿搭 | 系列展示区 |

## JavaScript 函数说明 / JavaScript Functions

### 初始化函数

| 函数名 | 功能描述 |
|--------|----------|
| `initializeApp()` | 应用主初始化函数，加载图片、渲染内容、绑定事件 |

### 数据加载函数

| 函数名 | 功能描述 |
|--------|----------|
| `loadImagesFromDatabase()` | 从 PHP 后端获取图片 URL 数据 |
| `populateProducts()` | 动态渲染产品网格 |
| `populateCollections()` | 动态渲染系列收藏网格 |
| `populateReviews()` | 动态渲染客户评价 |
| `updateHeroImage()` | 更新首页主图 |

### 导航与交互函数

| 函数名 | 功能描述 |
|--------|----------|
| `scrollToSection(sectionId)` | 平滑滚动到指定章节 |
| `updateActiveSection(sectionId)` | 根据滚动位置更新当前激活的导航链接 |
| `toggleMobileMenu()` | 控制移动端菜单显示/隐藏 |
| `closeMobileMenu()` | 关闭移动端菜单 |

### 动效函数

| 函数名 | 功能描述 |
|--------|----------|
| `initializeMouseTrail()` | 初始化鼠标轨迹动画 |
| `initializeMagneticButtons()` | 初始化磁吸按钮效果 |
| `initializeParallaxEffects()` | 初始化视差滚动效果 |
| `initializeRippleEffects()` | 初始化按钮涟漪点击效果 |
| `addFadeInAnimations()` | 添加元素渐进淡入动画 |

## 自定义修改 / Customization

| 修改项 | 位置 | 说明 |
|--------|------|------|
| 产品数据 | `script.js` 中的 `products` 数组 | 添加/修改产品信息 |
| 系列数据 | `script.js` 中的 `collections` 数组 | 添加/修改系列信息 |
| 评价数据 | `script.js` 中的 `reviews` 数组 | 添加/修改客户评价 |
| 主色调 | `index.html` 中的 `green-*` 类名 | 全局替换为其他颜色 |
| 动画速度 | `styles.css` 中的 `animation-duration` | 调整动画持续时间 |
| 鼠标轨迹颜色 | `styles.css` 中的 `.mouse-trail` | 修改 `background` 属性 |

| What to Change | Where | Note |
|----------------|-------|------|
| Product data | `products` array in `script.js` | Add/modify product info |
| Collection data | `collections` array in `script.js` | Add/modify collection info |
| Review data | `reviews` array in `script.js` | Add/modify customer reviews |
| Primary color | `green-*` classes in `index.html` | Replace globally with another color |
| Animation speed | `animation-duration` in `styles.css` | Adjust duration values |
| Mouse trail color | `.mouse-trail` in `styles.css` | Modify `background` property |

## 常见问题 / Troubleshooting

### ❓ 图片无法加载 / Images not loading

**可能原因：**

- 数据库连接参数错误
- `product_images` 表不存在或无数据
- `image_name` 与代码中的键名不匹配
- 图片 URL 地址无效

**解决方法：**

- 检查 `get_images.php` 中的数据库配置
- 确认数据表已创建并有数据记录
- 按 F12 打开浏览器控制台查看错误信息
- 验证图片 URL 是否可以正常访问

### ❓ 数据库连接失败 / Database connection failed

**可能原因：**

- MySQL 服务未启动
- 数据库用户名/密码错误
- 网络问题（如连接 AWS RDS）

**解决方法：**

- 确认 MySQL 服务正在运行
- 检查数据库凭据是否正确
- 如使用外部数据库，检查网络连通性

