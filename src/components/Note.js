import React, { useContext } from 'react'
import { SelectedNoteContext } from '../context/SelectedNoteContext';

export const Note = ({note}) => {
    const {setSelected} = useContext(SelectedNoteContext);

    const handleSelectNote = ()=>{
        setSelected(note);
    }

  return (
    <div className='note-snippet' onClick={()=>handleSelectNote(note)}>
        <p className='note-title'>{note.title}</p>
        <p className='note-preview'>{note.body.substring(0, 15)}</p>
    </div>
  )
}
