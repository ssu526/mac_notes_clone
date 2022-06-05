import React, { useContext} from 'react'
import {NoteContext} from '../context/NoteContext'

function Menu() {
  const {selectedFolderEl, notes, setNotes, selectedNote} = useContext(NoteContext);

  /*************************** Add New Note ******************************/
  const addNewNote = () =>{
    if(selectedFolderEl!==null){
      let selectedFolderId = selectedFolderEl.getAttribute("data-id");
      let newNote = {
        id: uid(),
        body:"New Note",
        folderId: selectedFolderId
      }
  
      let newNotesList = [...notes, newNote];
      setNotes(newNotesList);
    }
  }


  const deleteNote = () => {
    const newNotesList = notes.filter(n => n.id!==selectedNote.id);
    setNotes(newNotesList);
  }


  /******************* Generate a Unique Id for a note **********************/
  const uid = () =>
  String(
    Date.now().toString(32) +
      Math.random().toString(16)
  ).replace(/\./g, '')


  return (
    <div className='menuBar'>
      <button className="menuButton"><i class="fa-solid fa-table-list"></i></button>
      <button className="menuButton" onClick={addNewNote}><i class="fa-solid fa-note-sticky"></i></button>
      <button className="menuButton" onClick={deleteNote}><i class="fa-solid fa-trash-can"></i></button>
      <button className="menuButton"><i class="fa-solid fa-lock"></i></button>
    </div>
  )
}

export default Menu

//<i class="fa-solid fa-lock-open"></i>
//<i class="fa-light fa-magnifying-glass"></i>