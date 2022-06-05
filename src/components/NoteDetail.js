import React, { useContext, useEffect, useState } from 'react'
import { SelectedNoteContext } from '../context/SelectedNoteContext';

function NoteDetail() {
  const {selected} = useContext(SelectedNoteContext);

  useEffect(()=>{
    setNote(selected.body);
  }, [selected])

  const [note, setNote] = useState("");

  const handleNoteChange = (e) => {
    setNote(e.target.value);
    saveNote(note);
  }

  const saveNote = (note) => {

  }


  return (
    <div className='note-detail'>
      <textarea value={note} onChange={e => handleNoteChange(e)}/>
    </div>
  )
}

export default NoteDetail