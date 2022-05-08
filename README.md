## 功能描述

1. 输入QQ号即时查询QQ基本信息（只能输入合法QQ号）
2. 查询正确显示QQ头像、QQ昵称和QQ号
3. 查询错误显示错误提示
4. 需要有请求状态提示


## 技术选型

1. 使用Create React App创建项目
2. 项目使用TypeScript


## 项目结构简介

1. public 公共资源目录
2. src 代码根目录
    - assets 静态资源目录
    - components 组件目录
    - request 请求工具封装目录
    - pages 页面功能目录
    - typings ts定义目录


## 组件划分

1. App组件
2. QQInfo qq信息卡组件
3. Input组件

## 项目初始化 下载依赖包

### `npm install`

## 项目启动命令

### `npm start`

## 项目打包命令

### `npm run build`

## 项目测试命令

### `npm run test`


### 版本更新 v2.0

1. Input组件改为受控组件
2. debounce位置修改
3. 优化数据显示结构