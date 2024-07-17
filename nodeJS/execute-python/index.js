const { spawn } = require('node:child_process');

const pythonExecuter = spawn('python3', ['./main.py']);

pythonExecuter.stdout.on('data', (data) => {
    console.log(data.toString());
});
