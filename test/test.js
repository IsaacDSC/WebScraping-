const fs = require('fs')
const readFile = () => {
    const content = fs.readFileSync('../src/data/data.json', 'utf-8')
    return JSON.parse(content)
}

const writeFile = (content) => {
    const upFile = JSON.stringify(content)
    fs.writeFileSync('../src/data/data.json', upFile, 'utf-8')
}


function enviar() {
    const currentContent = readFile()
    const id = Math.random().toString(32).substr(2, 9)
    console.log(id)
    currentContent.push({ id })
    writeFile(currentContent)
}
