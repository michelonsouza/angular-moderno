import fs from 'node:fs';

import 'dotenv/config';
import { execSync } from 'node:child_process';

function getProjectEnvs() {
  const projectEnvs = Object.entries(process.env).filter(([key]) => key.startsWith('NG_APP_'));
  return Object.fromEntries(projectEnvs);
}

const environmentsExists = fs.existsSync('src/environments');

if (!environmentsExists) {
  fs.mkdirSync('src/environments');
}

const projectEnvs = getProjectEnvs();
const productionData = { production: true, ...projectEnvs };
const developmentData = { production: false, ...projectEnvs };

fs.writeFileSync('src/environments/environment.ts', `export const environment = ${JSON.stringify(productionData, null, 2)};`, {
  encoding: 'utf-8',
});

fs.writeFileSync('src/environments/environment.development.ts', `export const environment = ${JSON.stringify(developmentData, null, 2)};`, {
  encoding: 'utf-8',
});

execSync('yarn lint:fix');
