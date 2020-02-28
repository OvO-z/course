import { app, BrowserWindow, ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
  // let toolsPath = "C:/Users/Administrator/AppData/Local/Google/Chrome/User Data/Default/Extensions/ljjemllljcmogpfapbkkighbhhppjdbg/5.0.0.6_0";
  // let toolName = BrowserWindow.addDevToolsExtension(toolsPath);
  // console.log("扩展名", toolName)
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    frame: false,
    autoHideMenuBar: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)
  // Open dev tools initially when in development mode
    if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.on("did-frame-finish-load", () => {
           mainWindow.webContents.once("devtools-opened", () => {
        mainWindow.focus();
      });
      mainWindow.webContents.openDevTools({ detach: true });
      });
      }
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('close',e=>{
  mainWindow.close()
})
ipcMain.on('minimize',e=>{
  mainWindow.minimize()
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
