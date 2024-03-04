const fs = require('fs-extra');
// Async/Await:
async function copyFiles(source, target) {
  try {
    await fs.copy(source, target);
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}
async function main() {
  try {
    fs.removeSync('./dist');
    await copyFiles('./packages/base/dist', './dist');
    await copyFiles('./packages/web/dist', './dist/packages/web');
    await copyFiles('./packages/mobile/dist', './dist/packages/mobile');
  } catch (e) {
    console.error(e);
  }
}

main();
