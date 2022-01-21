const chalk = require('chalk')
const fs = require('fs/promises')
const path = require('path')

const notesPath = path.join(__dirname, 'db.json')

async function add(title) {
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function remove(id) {
    const notes = await getNotes()
    const filterNotes = notes.filter(n => n.id !== id)
    await fs.writeFile(notesPath, JSON.stringify(filterNotes))
}

async function print() {
    const notes = await getNotes()
    console.log(chalk.yellow('Here is the list of notes:'))
    notes.forEach(n => console.log(`\t ${chalk.blue(n.id)}\t\t${chalk.green(n.title)}`))

}


async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf8'})
    const parsedNotes = JSON.parse(notes)
    return Array.isArray(parsedNotes) ? parsedNotes : []
}

module.exports = {
    add, remove, print
}
