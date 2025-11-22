// electron/main.ts
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const isDev = process.env.NODE_ENV !== 'production';
// compute __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1100,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // compiled output path
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false
        }
    });
    if (isDev) {
        mainWindow.loadURL('http://localhost:5173'); // Vite dev server
        // mainWindow.webContents.openDevTools(); // Uncomment to open DevTools
    }
    else {
        mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
    }
}
// optional example ipc handler
ipcMain.handle('ping', async (_evt, arg) => {
    return `pong: ${arg ?? ''}`;
});
app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});
