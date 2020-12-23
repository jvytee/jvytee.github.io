const fs = require('fs/promises')
const marked = require('marked')
const mustache = require('mustache')
const path = require('path')
const sanitizeHtml = require('sanitize-html')


/**
 * Recursively lists all file paths under the given directory
 */
async function listFiles(dir) {
  const files = await fs.readdir(dir).catch(console.log)
  let paths = files.map(file => path.join(dir, file))

  for(filePath of paths) {
    const fileStat = await fs.stat(filePath)

    if(fileStat.isDirectory()) {
      const newPaths = await listFiles(filePath)
      paths = paths.concat(newPaths)
    }
  }

  return paths
}


/**
 * Finds and loads the correct HTML template for a given markdown file
 */
async function getTemplate(filePath) {
  const templatePath = path.join(path.dirname(filePath), '_template.html')
  const templateSource = await fs.readFile(templatePath, 'utf8')

  return templateSource
}


/**
 * Renders a given markdown file, using the correct HTML template
 */
async function renderFile(filePath) {
  const data = await fs.readFile(filePath, 'utf8')
  const template = await getTemplate(filePath)
  const dirty = marked(data)
  const html = sanitizeHtml(dirty)

  const title = path.parse(filePath).name
  return mustache.render(template, {title: title, content: html})
}


/**
 * Estimates the target path for a given source file
 */
function getTargetPath(sourcePath, sourceDir, targetDir) {
  let filePath = path.parse(sourcePath)
  filePath.dir = filePath.dir.replace(`${sourceDir}`, targetDir)

  if(filePath.ext == '.md') {
    filePath.ext = '.html'
    filePath.base = filePath.name + filePath.ext
  }

  return path.format(filePath)
}


module.exports = {
  listFiles: listFiles,
  getTemplate: getTemplate,
  renderFile: renderFile,
  getTargetPath: getTargetPath
}
