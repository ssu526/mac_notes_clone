import React, { useContext, useEffect, useState } from 'react'
import { Note } from './Note';
import {NoteContext} from '../context/NoteContext'

function NotesList() {
  const {searchText, searchResult, selectedFolderEl, notes, selectedNote, setSelectedNote, selectedNoteEl, setSelectedNoteEl} = useContext(NoteContext);
  const [filterNotes, setFilterNotes] = useState([]);

  useEffect(()=>{
    /*
      If a folder is selected, then the notes list will be filtered with the folder id.
      If no folder is selected, then the notes list will be empty.
    */
    if(selectedFolderEl!==null){
      let selectedFolderId = selectedFolderEl.getAttribute("data-id"); 
      setFilterNotes(notes.filter(note => note.folderId===selectedFolderId));
    }else{
      setFilterNotes([])
    }
  }, [selectedFolderEl, notes])


  useEffect(()=>{
      if(filterNotes.length===0){
        // If filert notes list is empty, then there's not notes to select from.
        setSelectedNote({});
        setSelectedNoteEl(null);
      }else{
        let selectedFolderId = selectedFolderEl.getAttribute("data-id"); 

        // Make the first note as the selected note if user switch to another folder
        if(selectedNote.folderId!==selectedFolderId){
          if(selectedNoteEl!==null) selectedNoteEl.classList.remove("selected-note");
          let firstNote = filterNotes[0];
          let firstNoteItemEl = document.querySelector(".note-item");
          setSelectedNote(firstNote);
          setSelectedNoteEl(firstNoteItemEl);
          if(selectedNoteEl!==null) selectedNoteEl.classList.remove("selected-note");
          firstNoteItemEl.classList.add("selected-note");
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
          searchText.trim().length>0 ? 
          searchResult.map(note => (
            <div key={note.id} onClick={(e)=>handleSelectNote(note, e)} className="note-item">
              <Note note={note}/>
            </div>
          ))
          :
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