const chalk = require('chalk')
const yargs = require('yargs') 
const notes = require('./notes.js')  // path should be relative to app.js file


// create add command
yargs.command({
    command: "add",
    describe: "adds a new note",
    builder:{  //it gives hints about the options that your command accepts
        title:{
            describe: "Note Title",
            demandOption: true,
            type: "string"
        },
        body:{
            describe: "Note Body",
            demandOption: true,
            type: "string"
        },
    },
    handler(argv){
        notes.addNote(argv.title,argv.body)
    } 
})

// create remove command
yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder:{
        title:{
            describe: "Note Title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    } 
})


//create list command
yargs.command({
    command: "list",
    describe: "list all notes",
    handler(){
        notes.listNotes()
    } 
})


// create read command
yargs.command({
    command: "read",
    describe: "Read a note",
    builder:{
        title:{
            describe:"Note Title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    } 
})

yargs.parse()
