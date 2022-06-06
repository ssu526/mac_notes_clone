import React, { useContext} from 'react'
import {NoteContext} from '../context/NoteContext'

function Menu() {
  const {folders, setFolders, selectedFolderEl, notes, setNotes, selectedNote} = useContext(NoteContext);

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

      let newFoldersList = folders.map(folder => folder.id===selectedFolderId ? 
                                                {id:folder.id, name:folder.name, noteCount:folder.noteCount+1}
                                                :{id:folder.id, name:folder.name, noteCount:folder.noteCount})
      
      setFolders(newFoldersList);

    }
  }


  const deleteNote = () => {
    let selectedFolderId = selectedFolderEl.getAttribute("data-id");

    const newNotesList = notes.filter(n => n.id!==selectedNote.id);
    setNotes(newNotesList);

    let newFoldersList = folders.map(folder => folder.id===selectedFolderId ? 
                                                          {id:folder.id, name:folder.name, noteCount:folder.noteCount-1}
                                                          :{id:folder.id, name:folder.name, noteCount:folder.noteCount})

      setFolders(newFoldersList);
  }


  /******************* Generate a Unique Id for a note **********************/
  const uid = () =>
  String(
    Date.now().toString(32) +
      Math.random().toString(16)
  ).replace(/\./g, '')


  return (
    <div className='menuBar'>
      <button className="menuButton"><i className="fa-solid fa-table-list"></i></button>
      <button className="menuButton" onClick={addNewNote}><i className="fa-solid fa-note-sticky"></i></button>
      <button className="menuButton" onClick={deleteNote}><i className="fa-solid fa-trash-can"></i></button>
      <button className="menuButton"><i className="fa-solid fa-lock"></i></button>
    </div>
  )
}

export default Menu

//<i className="fa-solid fa-lock-open"></i>
//<i className="fa-light fa-magnifying-glass"></i>