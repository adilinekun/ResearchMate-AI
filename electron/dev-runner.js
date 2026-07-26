const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

const root = path.resolve(__dirname, '..');

function checkPort(port) {
  return new Promise((resolve) => {
    const req = http.get({ host: '127.0.0.1', port, path: '/' }, () => {
      req.destroy();
      resolve(true);
    });

    req.on('error', () => resolve(false));
  });
}

async function start() {
  const serverRunning = await checkPort(3000);

  if (!serverRunning) {
    const devServer = spawn('npx.cmd', ['next', 'dev', '-p', '3000'], {
      cwd: root,
      shell: true,
      stdio: 'inherit',
    });

    devServer.on('exit', (code) => {
      if (code !== 0) {
        console.error('Next.js dev server exited unexpectedly.');
        process.exit(code || 1);
      }
    });
  }

  setTimeout(() => {
    const electronApp = spawn('npx.cmd', ['electron', '.'], {
      cwd: root,
      shell: true,
      stdio: 'inherit',
    });

    electronApp.on('exit', (code) => {
      process.exit(code || 0);
    });
  }, 1500);
}

start();
