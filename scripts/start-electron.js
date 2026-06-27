import { spawn } from 'child_process';
import net from 'net';

function checkVitePort() {
  const client = new net.Socket();
  client.connect(5173, '127.0.0.1', () => {
    client.end();
    console.log('Vite server detected, launching Electron window...');
    const electronProcess = spawn('npx', ['electron', 'electron/main.cjs'], {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, ELECTRON_DEV: 'true' }
    });
    electronProcess.on('close', () => process.exit(0));
  });
  
  client.on('error', () => {
    setTimeout(checkVitePort, 500);
  });
}

console.log('Starting Vite development server...');
const viteProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

viteProcess.on('error', (err) => {
  console.error('Failed to start Vite dev server:', err);
});

checkVitePort();
