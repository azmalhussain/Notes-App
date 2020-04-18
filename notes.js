const fs = require('fs')
const chalk = require('chalk')

const addNote = (title,body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note successfully saved!'))
    }
    else{
        console.log(chalk.red.inverse('Note Title Taken'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()

    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notesToKeep.length == notes.length){
        console.log(chalk.red.inverse('No Note Found!'))
    }
    else{
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Note successfully REMOVED!'))
    }
    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)    
    }
    catch(e){  // if notes.json file is empty
        return []
    }
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.blue.inverse("Your Notes"))
    notes.forEach(note => console.log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes()

    const note = notes.find((note)=> title === note.title)

    if(note){
        console.log(chalk.blue.inverse("" + title))
        console.log(note)
    }
    else{
        console.log(chalk.red.inverse("No Note Found"))
    }
}

module.exports = {
    addNote : addNote,
    removeNote: removeNote,
    listNotes:  listNotes,
    readNote: readNote,
}