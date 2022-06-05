import React from 'react'
import {sampleNotes} from './data';
import { Note } from './Note';

function NotesList() {
 
  return (
    <div className='notes-list'>
        {
            sampleNotes.map(note => <Note key={note.id} note={note}/>)
        }
    </div>
  )
}

export default NotesList