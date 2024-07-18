const fs = require("node:fs");
const path = require("node:path");
const { spawn, exec } = require('node:child_process');


function createVirtualEnv(callback) {
    const venvPath = path.join(process.cwd(), 'python-scripts/venv');

    if (!fs.existsSync(venvPath)) {
        console.log('Creating virtual environment...');
        exec(`python3 -m venv ${venvPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error creating virtual environment: ${error}`);
                return;
            }

            if (stderr) {
                console.error(`stderr: ${stderr}`);
            }

            console.log(`stdout: ${stdout}`);
            callback();
        });
    } else {
        console.log('Virtual environment already exists.');

        callback();
    }
}

function pythonDependenciesInstaller(callback) {
    const venvPath = path.join(process.cwd(), 'python-scripts/venv/bin/pip');

    console.log('Installing dependencies...');
    exec(`${venvPath} install -r python-scripts/requirements.txt`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error installing dependencies: ${error}`);
            return;
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }

        console.log(`stdout: ${stdout}`);

        callback();
    });
}

function executePythonScript(args) {

    const venvPythonPath = path.join(process.cwd(), 'python-scripts/venv/bin/python');
    const pythonScriptPath = path.join(process.cwd(), 'python-scripts/main.py');

    console.log('Executing Python script...');
    const pythonExecuter = spawn(venvPythonPath, [pythonScriptPath, ...args]);

    pythonExecuter.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    pythonExecuter.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonExecuter.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

// Create virtual environment, install dependencies, and then execute the Python script
createVirtualEnv(() => {
    pythonDependenciesInstaller( () => {
        const args = ['-sk=secret', '-oc=old_collection', '-nc=new_collection']
        executePythonScript(args)
    });
});
