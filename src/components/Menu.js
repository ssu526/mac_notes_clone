import React, { useContext, useState} from 'react'
import {NoteContext} from '../context/NoteContext'

function Menu() {
  const {setSearchResult, folders, setFolders, selectedFolderEl, notes, setNotes, selectedNote, setSelectedNote, setSelectedNoteEl, setHideFolderSidebar} = useContext(NoteContext);
  const [searchText, setSearchText] = useState("");

  /*************************** ADD NEW NOTE ******************************/
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

 /*************************** DELETE NOTE ******************************/
  const deleteNote = () => {
    const newNotesList = notes.filter(n => n.id!==selectedNote.id);
    setNotes(newNotesList);

    setSelectedNote({})
    setSelectedNoteEl(null);
  }

  /*************************** SEARCH NOTES ******************************/
  const searchNotes = (text) =>{
    setSearchText(text);
    let result = notes.filter(note => note.body.includes(text));
    
    if(text.length>0){
      setSearchResult(result);
    }else{
      setSearchResult([]);
    }

  }

  /*************************** HIDE FOLDER SIDE BAR ******************************/
  const toggleFolderSidebar = () =>{
    setHideFolderSidebar(prev=>prev==="" ? "hideFolderSidebar":"");

  }


  /******************* Generate a Unique Id for a note **********************/
  const uid = () =>
  String(
    Date.now().toString(32) +
      Math.random().toString(16)
  ).replace(/\./g, '')


  return (
    <div className='menuBar'>
      <button className={`menuButton`} onClick={toggleFolderSidebar}><i className="fa-solid fa-table-list"></i></button>
      <button className="menuButton" onClick={addNewNote}><i className="fa-solid fa-note-sticky"></i></button>
      <button className="menuButton" onClick={deleteNote}><i className="fa-solid fa-trash-can"></i></button>
      {/* <button className="menuButton"><i className="fa-solid fa-lock"></i></button> */}
      <input className="search" type="text" placeholder='Search...' value={searchText} onChange={e=>searchNotes(e.target.value)}/>
    </div>
  )
}

export default Menu

//<i className="fa-solid fa-lock-open"></i>