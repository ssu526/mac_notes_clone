import React, { useContext, useEffect, useState } from 'react'
import { Note } from './Note';
import {NoteContext} from '../context/NoteContext'

function NotesList() {
  const {selectedFolderEl, notes, setNotes, selectedNote, setSelectedNote, selectedNoteEl, setSelectedNoteEl} = useContext(NoteContext);
  const [filterNotes, setFilterNotes] = useState([]);

  useEffect(()=>{
    if(selectedFolderEl!==null){
      let selectedFolderId = selectedFolderEl.getAttribute("data-id"); 
      setFilterNotes(notes.filter(note => note.folderId===selectedFolderId));
    }
  }, [selectedFolderEl, notes])

  // set the first note as the selected note whenever there's a folder change/note change
  useEffect(()=>{
    if(selectedFolderEl!==null){
      let selectedFolderId = selectedFolderEl.getAttribute("data-id"); 

      if(filterNotes.length!==0){
        if(selectedNote.folderId!==selectedFolderId){
          let firstNote = filterNotes[0];
          let firstNoteItemEl = document.querySelector(".note-item");
          setSelectedNote(firstNote);
          setSelectedNoteEl(firstNoteItemEl);
          if(selectedNoteEl!==null) selectedNoteEl.classList.remove("selected-note");
          firstNoteItemEl.classList.add("selected-note");
        }
      }
    }
  }, [filterNotes])


  // highlighted selected note and show the its content
  const handleSelectNote = (note, e)=>{
    if(selectedNoteEl!=null){
      selectedNoteEl.classList.remove("selected-note");
    }

    e.target.classList.add("selected-note");
    setSelectedNoteEl(e.target);
    setSelectedNote(note);
  }
 
  // TEMPLATE
  return (
    <div className='notes-list'>
        {
            filterNotes && filterNotes.map(note => (
              <div key={note.id} onClick={(e)=>handleSelectNote(note, e)} className="note-item">
                <Note note={note}/>
              </div>
            ))
        }
    </div>
  )
}

export default NotesList