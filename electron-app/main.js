const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");
const treeKill = require("tree-kill");

let mainWindow;
let expressProcess;
let reactProcess;

function startDetached(command, args, cwd) {
  const proc = spawn(command, args, {
    cwd,
    shell: true,
    detached: true,
    stdio: "inherit",
    windowsHide: true,
  });
  proc.unref();
  return proc;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL("http://localhost:3000");

  mainWindow.on("close", () => {
    console.log("Electron window is closing...");

    if (reactProcess?.pid) {
      console.log("Killing React...");
      treeKill(reactProcess.pid, "SIGKILL");
    }

    if (expressProcess?.pid) {
      console.log("Killing Express...");
      treeKill(expressProcess.pid, "SIGKILL");
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  expressProcess = startDetached(
    "npm",
    ["start"],
    path.join(__dirname, "../server")
  );
  reactProcess = startDetached(
    "npm",
    ["start"],
    path.join(__dirname, "../client")
  );

  setTimeout(createWindow, 7000);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
