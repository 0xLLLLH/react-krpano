import glob from 'glob';
import fs from 'fs';
import p from 'path';

const docPath = './docs';

function syncMDFiles() {
    glob('./!(CHANGELOG|README)*.md', (err, files) => {
        files.forEach(path => {
            const target = p.join(docPath, path.replace('./', '/'));
            console.log(`Moving doc from ${path} to ${target}`);
            const fileAsString = fs.readFileSync(path, { encoding: 'utf8' }).replace(/\]\(\.\//g, '](/');
            fs.writeFileSync(target, fileAsString);
        });
    });
}

function main() {
    syncMDFiles();
}

main();
