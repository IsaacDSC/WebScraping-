const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')

const home = require('./routes/routes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'main' }));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')))

app.use(home)


const PORT = 3000
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})