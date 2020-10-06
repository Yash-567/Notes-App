const chalk = require('chalk')
const validator = require('validator')
const yargs = require('yargs')
const notes = require('./notes.js')
yargs.command({
  command: 'add',
  desc: 'add a command',
  builder: {
    title: {
      desc: 'Note Title',
      demandOption: true,
      type: 'string',
    },
    body: {
      desc: 'Note Body',
      demandOption: true,
      type: 'string',
    },
  },
  handler() {
    notes.addNote(yargs.argv.title, yargs.argv.body)
  },
})
yargs.command({
  command: 'remove',
  describe: 'remove a command',
  builder: {
    title: {
      desc: ' Remove a Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler() {
    notes.removeNote(yargs.argv.title)
  },
})
yargs.command({
  command: 'list',
  describe: 'list a command',
  handler() {
    notes.listNotes()
  },
})
yargs.command({
  command: 'read',
  describe: 'read a command',
  builder: {
    title: {
      desc: 'note title',
      type: 'string',
      demandOption: true,
    },
  },
  handler() {
    notes.readNote(yargs.argv.title)
  },
})

yargs.command({
  command: 'update',
  describe: 'update a note by title',
  builder: {
    title: {
      desc: 'note title',
      type: 'string',
      demandOption: true,
    },
    newTitle: {
      desc: 'new title',
      type: 'string',
      demandOption: true,
    },
  },
  handler() {
    notes.updateNote(yargs.argv.title, yargs.argv.newTitle)
  },
})
yargs.parse()
