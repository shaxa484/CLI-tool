# 🚀 Project-Init CLI

A beautiful, interactive Command-Line Interface (CLI) tool designed to instantly bootstrap new development projects. 

Instead of manually creating folders, writing boilerplate code, and setting up Git repositories from scratch every time, **Project-Init** automates the entire process through a sleek, interactive terminal UI.

## ✨ Features
* **Interactive Prompts:** Asks for project name, type, and GitHub URL using `@inquirer/prompts`.
* **Beautiful Terminal UI:** Features colorized outputs (`chalk`), animated loading spinners (`ora`), and a custom generation progress bar (`cli-progress`).
* **Automated Git Setup:** Automatically initializes a Git repository, links it to a remote GitHub URL, renames the branch to `main`, and creates your initial commit.
* **Smart Defaults:** Defaults to your current directory name and handles graceful cancellations.

## 📦 Available Templates
The CLI currently supports generating three optimized starter templates:
1. **Frontend (React + Vite):** A modern, lightning-fast React setup using Vite.
2. **Backend (Node.js + Express):** A clean, ready-to-use Express.js REST API server template.
3. **Vanilla JS (HTML + CSS + JS):** A simple, static website layout with linked assets for quick prototyping.

## 🛠️ Installation & Usage

*(Assuming you have Node.js installed)*

1. **Install dependencies:**
   ```bash
   npm install -g project-cli-bootstrap
   ```

2. **Start a new project:**
   Navigate to the folder where you want to create your project and run:
   ```bash
   project-init
   ```

## 💻 Tech Stack
* **Language:** JavaScript (Node.js / ES Modules)
* **CLI Interactivity:** `@inquirer/prompts`
* **Styling & UI:** `chalk`, `cli-progress`, `ora`
* **System Execution:** `child_process` (for automated Git commands), `fs` (File System)

## 📸 Preview
![Demo](./test/render1784377175080.gif)
```
