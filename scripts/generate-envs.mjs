import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

import 'dotenv/config';

function getProjectEnvs() {
  const projectEnvs = Object.entries(process.env).filter(([key]) => key.startsWith('NG_APP_'));
  return Object.fromEntries(projectEnvs);
}

const __dirname = process.cwd();

const environmentsFolderPath = path.resolve(path.join(__dirname, 'src', 'environments'));
const developEnvPath = path.resolve(path.join(environmentsFolderPath, 'environment.development.ts'));
const currentEnvPath = path.resolve(path.join(environmentsFolderPath, 'environment.ts'));
const productionEnvPath = path.resolve(path.join(environmentsFolderPath, 'environment.production.ts'));

const environmentsExists = fs.existsSync(environmentsFolderPath);

if (!environmentsExists) {
  fs.mkdirSync(environmentsFolderPath);
}

const projectEnvs = getProjectEnvs();
const productionData = { production: true, ...projectEnvs, NG_APP_NODE_ENV: 'production' };
const developmentData = { production: false, ...projectEnvs, NG_APP_API_URL: '/api' };
const currentData = { production: false, ...projectEnvs, NG_APP_API_URL: '/api' };

fs.writeFileSync(productionEnvPath, `export const environment = ${JSON.stringify(productionData, null, 2)};`, {
  encoding: 'utf-8',
});

fs.writeFileSync(developEnvPath, `export const environment = ${JSON.stringify(developmentData, null, 2)};`, {
  encoding: 'utf-8',
});

fs.writeFileSync(currentEnvPath, `export const environment = ${JSON.stringify(currentData, null, 2)};`, {
  encoding: 'utf-8',
});

execSync('prettier --write "./src/environments/*.ts"', { stdio: 'inherit' });
