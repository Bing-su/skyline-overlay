/**
 * generate `index.ts` for icons
 */

import fs from 'fs';
import path from 'path';
import url from 'url';
import glob from 'glob';
import chalk from 'chalk';
import prettier from 'prettier';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../.prettierrc'), {
    encoding: 'utf-8',
  })
);

console.log(chalk.blue('generating `index.ts` for icons...'));

/**
 * @param {string[]} filePaths full paths of icons
 * @param {(filename: string) => string} transformer transform filename to icon name
 * @returns {Promise<void>}
 */
function genCodeLines(filePaths, transformer) {
  const lines = [];

  return new Promise((resolve, reject) => {
    try {
      for (const filePath of filePaths) {
        const fullPath = path.resolve(__dirname, '../', filePath);
        const basename = path.basename(fullPath);
        const realname = basename.replace(/\.svg$/, '');
        const exportname = transformer(realname);
        lines.push(
          `export { ReactComponent as ${exportname} } from './${basename}';`
        );
        const code = prettier.format(lines.join('\n') + '\n', {
          parser: 'typescript',
          ...prettierOptions,
        });
        const idxPath = path.join(path.dirname(fullPath), 'index.ts');
        fs.writeFileSync(idxPath, code, { encoding: 'utf-8' });
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

const workers = [];
const icons = glob.sync('src/assets/icons/*.svg');
workers.push(
  genCodeLines(icons, (filename) =>
    filename
      .split('-')
      .map((s) => s[0].toUpperCase() + s.slice(1))
      .join('')
  )
);
const jobs = glob.sync('src/assets/jobs/*.svg');
workers.push(genCodeLines(jobs, (filename) => filename.toUpperCase()));

Promise.all(workers)
  .then(() => {
    console.log(
      chalk.green(
        `generated \`index.ts\` for ${icons.length} icons and ${jobs.length} jobs`
      )
    );
  })
  .catch((e) => {
    console.log(chalk.red('failed to generate some of indexes'));
    console.error(e);
    process.exitCode = 1;
  });
