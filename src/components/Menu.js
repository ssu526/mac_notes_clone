import React, { useContext, useState } from 'react'
import {NoteContext} from '../context/NoteContext'
import ReactTooltip from 'react-tooltip'
import bcryptjs from 'bcryptjs';

function Menu() {
  const {password, setPassword, searchText, setSearchText, setSearchResult, selectedFolderEl, notes, setNotes, selectedNote, setSelectedNote, setSelectedNoteEl, setHideFolderSidebar} = useContext(NoteContext);
  const [showUpdatePassword, setShowUpdatePassword] = useState("hideChangePassword");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [tooltip, showTooltip] = useState(true);

  /*************************** ADD NEW NOTE ******************************/
  const addNewNote = () =>{
    if(selectedFolderEl!==null){
      let selectedFolderId = selectedFolderEl.getAttribute("data-id");

      let newNote = {
        id: uid(),
        body:"New Note",
        folderId: selectedFolderId,
        passwordProtected: false,
        locked:false
      }
  
      let newNotesList = [...notes, newNote];
      setNotes(newNotesList);
    }
  }

 /*************************** DELETE NOTE ******************************/
  const deleteNote = () => {
    if(selectedNote.locked){
      let passwordInput = prompt("This note is locked. Please enter the notes password to delete the note.");

      bcryptjs.compare(passwordInput, password, function(err, res){
        if(res===true){
          const newNotesList = notes.filter(n => n.id!==selectedNote.id);
          setNotes(newNotesList);
          setSelectedNote({})
          setSelectedNoteEl(null);
        }
      })
    }else{
      const newNotesList = notes.filter(n => n.id!==selectedNote.id);
      setNotes(newNotesList);
      setSelectedNote({})
      setSelectedNoteEl(null);
    }
  }

  /*************************** SEARCH NOTES ******************************/
  const searchNotes = (text) =>{
    setSearchText(text);
    let result = notes.filter(note => note.body.includes(text));
    setSearchResult(result);
    setSelectedNote({});
    setSelectedNoteEl(null);
  }

  /************************ HIDE FOLDER SIDE BAR *************************/
  const toggleFolderSidebar = () =>{
    setHideFolderSidebar(prev=>prev==="" ? "hideFolderSidebar":"");

  }

  /****************************** LOCK NOTE ******************************/
  const lockNote = () => {
    if(Object.keys(selectedNote).length!==0){
      if(selectedNote.passwordProtected===true){
        selectedNote.locked=true;
      }else{
        selectedNote.passwordProtected=true;
      }
      saveNote(selectedNote.locked, selectedNote.passwordProtected);
    }
  }

  /**************************** REMOVE LOCK ******************************/
  const removeLock = () =>{
    if(Object.keys(selectedNote).length!==0){
      if(selectedNote.locked){
        let passwordInput = prompt("This note is locked. Enter the notes password to remove the lock.");

        bcryptjs.compare(passwordInput, password, function(err, res){
          if(res===true){
            selectedNote.passwordProtected=false;
            selectedNote.locked=false;
            saveNote(selectedNote.locked, selectedNote.passwordProtected);
          }
        })
      }else{
        selectedNote.passwordProtected=false;
        selectedNote.locked=false;
        saveNote(selectedNote.locked, selectedNote.passwordProtected);
      }
    }
  }

  /**************************** CHANGE PASSWORD **************************/
  const showChangePassword = () =>{
    setShowUpdatePassword(prev=>prev==="" ? "hideChangePassword":"");
    setOldPassword("");
    setNewPassword("");
  }

  const updatePassword = () =>{
    if(password.length===""){
      bcryptjs.genSalt(10, function(err, salt) {
        bcryptjs.hash(newPassword, salt, function(err, hash) {
            setPassword(hash);
            setOldPassword("");
            setNewPassword("");
            setShowUpdatePassword("hideChangePassword");
        });
      });
    }else{
      bcryptjs.compare(oldPassword, password, function(err, res) {
        if(res===true){
          console.log(res)
          bcryptjs.genSalt(10, function(err, salt) {
            bcryptjs.hash(newPassword, salt, function(err, hash) {
                setPassword(hash);
                setOldPassword("");
                setNewPassword("");
                setShowUpdatePassword("hideChangePassword");
            });
          });
        }
      });
    }
  }

 /****************************** SAVE NOTE ******************************/
  const saveNote = (locked, passwordProtected) => {
    let noteId = selectedNote.id;

    let newNotesList = notes.map(note => note.id===noteId ? 
                                  {
                                    id:note.id,
                                    body:note.body,
                                    folderId: note.folderId,
                                    passwordProtected: passwordProtected,
                                    locked:locked
                                  }
                                  :
                                  {
                                    id:note.id,
                                    body:note.body,
                                    folderId: note.folderId,
                                    passwordProtected: note.passwordProtected,
                                    locked:note.locked
                                  });
    setNotes(newNotesList);
  }

  /******************* Generate a Unique Id for a note **********************/
  const uid = () =>
  String(
    Date.now().toString(32) +
      Math.random().toString(16)
  ).replace(/\./g, '')


  return (
    <div className='menuBar-container'>
      {tooltip && <ReactTooltip effect="solid" />}

        <div className='menuBar'>
  
          {/* Menu button: Hide/Show folder sidebar */}
          <button 
            className={`menuButton`} 
            onClick={toggleFolderSidebar}
            data-tip="Hide/Show folder sidebar"
            onMouseEnter={() => showTooltip(true)}
            onMouseLeave={() => {
              showTooltip(false);
              setTimeout(() => showTooltip(true), 50);}}
          >

            <i className="fa-solid fa-table-list"></i>
          </button>
      
          {/* Menu button: Add new note */}
          <button 
            className="menuButton" 
            onClick={addNewNote}
            data-tip="Add new note"
            onMouseEnter={() => showTooltip(true)}
            onMouseLeave={() => {
              showTooltip(false);
              setTimeout(() => showTooltip(true), 50);}}
          >
            +<i className="fa-solid fa-note-sticky"></i>
          </button>


          <button 
            className="menuButton" 
            onClick={deleteNote}
            data-tip="Delete note"
            onMouseEnter={() => showTooltip(true)}
            onMouseLeave={() => {
              showTooltip(false);
              setTimeout(() => showTooltip(true), 50);}}
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>



          <button 
            className="menuButton" 
            onClick={lockNote}
            data-tip={selectedNote.locked===true ? "Lock note":"Unlock note"}
            onMouseEnter={() => showTooltip(true)}
            onMouseLeave={() => {
              showTooltip(false);
              setTimeout(() => showTooltip(true), 50);}}
          >
            {
              selectedNote.locked===true ? <i className="fa-solid fa-lock"></i> : <i className="fa-solid fa-lock-open"></i>
            }
          </button>

          <button 
            className="menuButton" 
            onClick={removeLock}
            data-tip="Remove lock"
            onMouseEnter={() => showTooltip(true)}
            onMouseLeave={() => {
              showTooltip(false);
              setTimeout(() => showTooltip(true), 50);}}
          >
            <i  className="fa-solid fa-unlock-keyhole"></i>
          </button>



          <button 
            className="menuButton" 
            onClick={showChangePassword}
            data-tip="Change notes password"
            onMouseEnter={() => showTooltip(true)}
            onMouseLeave={() => {
              showTooltip(false);
              setTimeout(() => showTooltip(true), 50);}}
          >
            <i  className="fa fa-key"></i>
          </button>

          <input className="search" type="text" placeholder='Search...' value={searchText} onChange={e=>searchNotes(e.target.value)}/>
      </div>
      
      <div className={`change-password-container ${showUpdatePassword}`}>
        <label>Enter your old password(default: 1111):</label>
        <input type="text" placeholder="Old Password" value={oldPassword} onChange={e=>setOldPassword(e.target.value)}/>
        <label>Enter your new password</label>
        <input type="text" placeholder="New Password" value={newPassword} onChange={e=>setNewPassword(e.target.value)}/>
        <button className='savePasswordBtn' onClick={updatePassword}>Save</button>
      </div>
    </div>
  )
}

export default Menu
