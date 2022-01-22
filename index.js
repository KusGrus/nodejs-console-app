const chalk = require('chalk')
const express = require('express')
const path = require('path')
const {remove, add, getNotes, edit} = require('./controller')

const PORT = 3000
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', async (req, res) => {
    res.render('index', {
        title: 'Express app',
        notes: await getNotes(),
        created: false
    })
})

app.post('/', async (req, res) => {
    await add(req.body.title)
    res.render('index', {
        title: 'Express app',
        notes: await getNotes(),
        created: true
    })
})

app.delete('/:id', async (req, res) => {
    await remove(req.params.id)
    res.render('index', {
        title: 'Express app',
        notes: await getNotes(),
        created: false
    })
})

app.put('/:id', async (req, res) => {
    await edit(req.params.id, req.body)
    res.render('index', {
        title: 'Express app',
        notes: await getNotes(),
        created: false
    })
})


app.listen(PORT, () => {
    console.log(chalk.green(`Server run on ${PORT} port`))
})
