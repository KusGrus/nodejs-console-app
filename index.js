const yargs = require('yargs')
const pkg = require('./package.json')
const {add, remove, print} = require('./controller')

yargs.version(pkg.version)

yargs.command({
    command: 'add',
    describe: 'Add new note to list',
    handler({title}) {
        add(title)
    }
})

yargs.command({
    command: 'delete',
    describe: 'Remove note by id',
    handler({id}) {
        remove(id.toString())
    }
})

yargs.command({
    command: 'list',
    describe: 'Print all notes',
    async handler() {
        await print()
    }
})

yargs.parse()
