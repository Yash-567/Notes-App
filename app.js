const chalk = require('chalk');
const validator = require('validator');
const yargs = require('yargs');
const notes = require('./notes.js')
yargs.command({
    command: 'add',
    desc: 'add a command',
    builder:{
        title:{
            desc: 'Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            desc: 'Body',
            demandOption: true ,
            type: 'string'
        }
    },
    handler() {
        notes.addNote(yargs.argv.title,yargs.argv.body)
    }
})
yargs.command({
    command: 'remove',
    describe: 'remove a command',
    builder:{
        title:{
            desc: ' Remove a Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler() {
        notes.removeNote(yargs.argv.title)
    }
})
yargs.command({
    command: 'list',
    describe: 'list command',
    handler() {
        notes.listNotes()
    }
})
yargs.command({
    command: 'read',
    describe: 'read command',
    builder:{
        title:{
            desc:'Title',
            type:'string',
            demandOption:true
        }
    },
    handler() {
        notes.readNote(yargs.argv.title)
    }
})
yargs.parse()
