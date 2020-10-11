const fs = require('fs')
const chalk = require('chalk')
const addNote =(title,body)=>{
    const notes = loadNotes()
    //const duplicateNotes = notes.filter((note)=>note.title === title)
    // find stops searching when it finds the first matching element in array thus reducing the time consumed
    const duplicateNote = notes.find((note) => note.title === title)
    //console.log(duplicateNote)
    if (!duplicateNote){
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New Note Added'))

    }else {
        console.log(chalk.bgRed('Note Title Taken!'))
    }
}
const saveNotes =(notes)=>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}
const loadNotes =()=>{
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}
const removeNote = (title)=>{
    const notes = loadNotes()
    const NotesToKeep = notes.filter((note)=>note.title !== title)
    if (NotesToKeep.length === notes.length){
        console.log(chalk.bgRed('No note removed'))
    }
    else{
        console.log(chalk.bgGreen('Note Removed'))
        saveNotes(NotesToKeep)
    }
}
const listNotes=()=>{
    console.log(chalk.inverse('Your Notes...'))
    const notes = loadNotes()
    notes.forEach(element => {
        console.log( element.title)
    })
}
const readNote=(title)=>{
    const notes = loadNotes()
    const note = notes.find(element=>element.title === title)
    if(note){
        console.log(chalk.bold(note.title))
        console.log(note.body)
    }else{
        console.log(chalk.bgRed('No Note Found'))
    }
}
const exportHtml =()=>{
    try {
        const dataBuffer = fs.readFileSync('export.html')
        const dataHTML = dataBuffer.toString()
        const lines = dataHTML.split('\n')
        let notes = ''
        loadNotes().forEach(note => {
            notes += '<tr>' +
                '<td>' + note.title + '</td>' +
                '<td>' + note.body + '</td>' +
                '</tr>'
        })
        lines[25] = notes
        const result = lines.join('\n')
        fs.writeFileSync('notes.html', result)
        return 'Exported to notes.html'
    }catch(e){
        return 'Failed to export'
    }
}
module.exports = {
    addNote :addNote,
    removeNote :removeNote,
    listNotes :listNotes,
    readNote :readNote,
    exportHtml: exportHtml
}
