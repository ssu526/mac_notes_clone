import React, { useContext, useEffect, useState } from 'react'
import { NoteContext } from '../context/NoteContext';

function NoteDetail() {
  const {password, selectedNote, selectedNoteEl, notes, setNotes} = useContext(NoteContext);
  const [noteDetail, setNoteDetail] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  useEffect(()=>{
    if(selectedNote===undefined || Object.keys(selectedNote).length===0){
      setNoteDetail("No note selected.");
    }else{
      setNoteDetail(selectedNote.body);
    }
    
  }, [selectedNote])

  const handleNoteChange = (e) => {
    if(selectedNoteEl!==null){
      let title=""
      let preview="";
  
      if(e.target.value.trim()===""){
        setNoteDetail("");
        title = ""
        preview = "";
  
      }else{
        let input = e.target.value;
        setNoteDetail(input);
        const firstLineBreakIndex = input.indexOf("\n");
        title = input.substring(0, firstLineBreakIndex);
        title =firstLineBreakIndex === -1 ? input.substring(0, 15) : input.substring(0, firstLineBreakIndex);
        preview = firstLineBreakIndex === -1 ? "": input.substring(firstLineBreakIndex)
      }
  
      selectedNoteEl.querySelector(".note-title").innerHTML = title.length>15 ? title.substring(0,15)+"..." : title;
      selectedNoteEl.querySelector(".note-preview").innerHTML = preview.length>15 ? preview.substring(0,15)+"..." : preview;
    }
  }

  const saveNote = () => {
    let noteId = selectedNote.id;

    let newNotesList = notes.map(note => note.id===noteId ? 
                                  {
                                    id:note.id,
                                    body:noteDetail.trim().length===0 ? "New Note" : noteDetail,
                                    folderId: note.folderId,
                                    passwordProtected: note.passwordProtected,
                                    locked:note.locked
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

  const unlock = (e)=>{
    if(e.key === "Enter"){
      setPasswordInput("");
      if(passwordInput===password){
        selectedNote.locked=false;
        saveNote();
      }
    }
  }

  return (
    <div className='note-detail'>
      {
        Object.keys(selectedNote).length!==0 && selectedNote.locked!==false ?
        <div>
          <i className="fa-solid fa-lock"></i>
          <p className='lock-message'>This note is locked.</p>
          <p> Enter the notes password to view.</p>
          <input placeholder='Enter password' onKeyDown={e=>unlock(e)} value={passwordInput} onChange={e=>setPasswordInput(e.target.value)}/>
        </div>
        :
        <textarea value={noteDetail} onChange={e => handleNoteChange(e)} onBlur={saveNote}/>
      }
    </div>
  )
}

export default NoteDetail


