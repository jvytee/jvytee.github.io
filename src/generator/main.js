const fs = require('fs/promises')
const path = require('path')
const generator = require('./index.js')


const config = {
  sourceDir: 'src',
  targetDir: 'dist',
}


async function main() {
  console.log('⛧  Generating static site:')

  if(config.sourceDir == null) {
    console.log('⛧  Source directory undefined')
    return 0
  }

  if(config.targetDir == null) {
    console.log('⛧  Target directory undefined')
    return 0
  }

  const contentDir = path.join(config.sourceDir, 'content')
  const contentFiles = await generator.listFiles(contentDir)

  for(const file of contentFiles) {
    const targetPath = generator.getTargetPath(file, contentDir, config.targetDir)
    const targetDir = path.dirname(targetPath)

    if(path.extname(file) == '.md') {
      console.log(`⛧  Rendering ${targetPath}`)
      await fs.mkdir(targetDir, {recursive: true})

      const html = await generator.renderFile(file)
      await fs.writeFile(targetPath, html)
    }

      if(path.extname(file) == '.html' && path.basename(file)[0] != '_') {
      console.log(`⛧  Copying ${targetPath}`)
      await fs.mkdir(targetDir, {recursive: true})
      await fs.copyFile(file, targetPath)
    }
  }

  const assetsDir = path.join(config.sourceDir, 'assets')
  const assetsFiles = await generator.listFiles(assetsDir)

  for(const file of assetsFiles) {
    const fileStat = await fs.stat(file)
    const targetPath = generator.getTargetPath(file, config.sourceDir, config.targetDir)
    const targetDir = path.dirname(targetPath)

    if(!fileStat.isDirectory()) {
      console.log(`⛧  Copying ${targetPath}`)
      await fs.mkdir(targetDir, {recursive: true})
      await fs.copyFile(file, targetPath)
    }
  }
}

main()
  .then(() => console.log('⛧  Done.'))
  .catch(err => console.log(`⛧  Error: ${err}`))
