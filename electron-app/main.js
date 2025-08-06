const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");
const treeKill = require("tree-kill");

let mainWindow;
let expressProcess;
let reactProcess;
let pythonProcess;

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

    if (pythonProcess?.pid) {
      console.log("Killing Python FastAPI...");
      treeKill(pythonProcess.pid, "SIGKILL");
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  // Start Express
  expressProcess = startDetached(
    "npm",
    ["start"],
    path.join(__dirname, "../server")
  );

  // Start React
  reactProcess = startDetached(
    "npm",
    ["start"],
    path.join(__dirname, "../client")
  );

  // Start Python FastAPI
  const pythonScript = "venv\\Scripts\\python.exe";
  pythonProcess = startDetached(
    pythonScript,
    ["-m", "uvicorn", "api_main:app", "--host", "0.0.0.0", "--port", "8000"],
    path.join(__dirname, "../python/facial-analysis")
  );

  // Launch the Electron window after everything
  setTimeout(createWindow, 7000);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
