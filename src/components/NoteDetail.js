import React, { useContext, useEffect, useState } from 'react'
import { NoteContext } from '../context/NoteContext';

function NoteDetail() {
  const {selectedNote, setSelectedNote, selectedNoteEl, setSelectedNoteEl, notes, setNotes} = useContext(NoteContext);
  const [noteDetail, setNoteDetail] = useState("");

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

  const saveNote = (e) => {
    let noteId = selectedNote.id;

    let newNotesList = notes.map(note => note.id===noteId ? 
                                  {
                                    id:note.id,
                                    body:noteDetail.trim().length===0 ? "New Note":noteDetail,
                                    folderId: note.folderId
                                  }
                                  :{
                                    id:note.id,
                                    body:note.body,
                                    folderId: note.folderId
                                  });
    setNotes(newNotesList);
  }


  return (
    <div className='note-detail'>
      <textarea value={noteDetail} onChange={e => handleNoteChange(e)} onBlur={saveNote}/>
    </div>
  )
}

export default NoteDetail


