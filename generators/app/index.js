"use strict";
const Generator = require("yeoman-generator");
const path = require("path");
// 创建文件夹
const mkdirp = require("mkdirp");

// 让console.log带颜色输出
const chalk = require("chalk");
// 控台打印信息
const yosay = require("yosay");
module.exports = class extends Generator {
  // 初始化
  initializing() {
    this.props = {};
  }
  // 接受用户输入
  prompting() {
    this.log(
      yosay(
        `Welcome to the  ${chalk.red("generator-simple-project")} generator!`
      )
    );
    const prompt = [
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname
      }
    ];
    return this.prompt(prompt).then(props => {
      this.props = props;
    });
  }
  // 创建项目目录
  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(`\nYour generator must be inside a folder named
        ${this.props.name}\n
        I will automatically create this folder.\n`);
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }
  // 复制脚手架文件并写入到目标项目
  writing() {
    // 把每一个文件都通过模板转换到目标路径
    const templates = [
      ".browserslistrc",
      ".editorconfig",
      ".env.development",
      ".env.production",
      ".eslintrc.js",
      ".gitignore",
      "babel.config.js",
      "package.json",
      "postcss.config.js",
      "README.md",
      "public/favicon.ico",
      "public/index.html",
      "src/App.vue",
      "src/main.js",
      "src/router.js",
      "src/assets/logo.png",
      "src/components/HelloWorld.vue",
      "src/store/actions.js",
      "src/store/getters.js",
      "src/store/index.js",
      "src/store/mutations.js",
      "src/store/state.js",
      "src/utils/request.js",
      "src/views/About.vue",
      "src/views/Home.vue"
    ];
    templates.forEach(item => {
      // item => 每个文件路径
      this.fs.copyTpl(
        // 模版目录
        this.templatePath(item),
        // 目标目录
        this.destinationPath(item),
        this.answers
      );
    });
  }
  // 安装依赖
  install() {
    this.installDependencies();
  }
};
