const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

//config para ler banco json
const readFile = () => {
        const content = fs.readFileSync('./data/data.json', 'utf-8')
        return JSON.parse(content)
    }
    //consfig para adionar algo ao banco json
const writeFile = (content) => {
    const upfile = JSON.stringify(content)
    fs.writeFileSync('./data/data.json', upfile, 'utf-8')
}

const dados = []

//configurando cheerio
const fechData = async(url) => {
    const result = await axios.get(url)
    return result.data
}
const main = async() => {
    const content = await fechData('http://www.adorocinema.com/filmes/todos-filmes/popular/')
    const $ = cheerio.load(content)


    //const title = $('h2').text()
    //console.log(title)
    /*     $('h2').each((index, element) => {
            const nome = (`\n O filme 0${index +1} - ${$(element).text()}`)
                //console.log(nome)
        }) */

    $('.data_box > .img_side_content > .content > ').each((index, element) => {
        const title = $(element).find('.titlebar_02 > h2').text()
        const desc = $('p').text()
        const leitores = $(element).find('.margin_10v > .stareval > .note').text()
        const trailer = $('a').text()
        const linkTrailer = $(element).find('a').attr('href')
        if (linkTrailer == undefined) {
            //recebe os undefined
        } else {
            //console.log(`\n 0${index} Link:http://www.adorocinema.com${linkTrailer}`)
            dados.push({
                linkTrailer: 'http://www.adorocinema.com' + linkTrailer
            })
            const currentContent = readFile()
            const id = Math.random().toString(32).substr(2, 9)
            currentContent.push({ id })
            writeFile(currentContent)
        }
        dados.push({
            title: title,
            desc: desc,
            leitores: leitores,
            trailer: trailer,
        })
    })

}

main()



exports.main = main