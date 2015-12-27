const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const dir = '.';
const nodeComand = 'npm run setup';
const packageFile = 'package.json';
const nodeVersion = process.versions.node.split('.');

if (nodeVersion[0] < 4) {
  console.error('Episodehunter require node v4 or higher, you have: v' + nodeVersion.join('.'));
  process.exit(1);
}

fs.readdirSync(dir)
  .forEach(component => {
    const componentPath = path.join(dir, component);
    const stats = fs.statSync(componentPath);
    if (stats && stats.isDirectory()) {
      const files = fs.readdirSync(componentPath);
      if (files.indexOf(packageFile) > -1) {
        console.log(`
          ========================================
               Installing ${component}
          ========================================
        `);
        const oldPath = process.cwd();
        process.chdir(componentPath);
        childProcess.execSync(nodeComand);
        process.chdir(oldPath);
      }
    }
});
