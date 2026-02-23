import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const __dirname = process.cwd();

const dbJsonPath = path.resolve(path.join(__dirname, 'db.json'));

const dbJsonExists = fs.existsSync(dbJsonPath);

if (!dbJsonExists) {
  fs.writeFileSync(dbJsonPath, `{
    "transactions": []
  }`, {
    encoding: 'utf-8',
  });

  execSync('prettier --write "./db.json"', { stdio: 'inherit' });
}

