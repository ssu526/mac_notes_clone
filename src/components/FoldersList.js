import React, { useContext, useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { Folder } from './Folder';
import { NoteContext } from '../context/NoteContext'

function FoldersList() {
  const[folders, setFolders] = useLocalStorage("folders", []);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [targetFolder, setTargetFolder] = useState(null);
  const [originalFolderName, setOriginalFolderName] = useState("");
  const [targetPoint, setTargetPoint] = useState({x:0, y:0});
  const {selectedFolderEl, setSelectedFolderEl, setSelectedNote, setSelectedNoteEl, notes, setNotes} = useContext(NoteContext);

  // Select the first folder if there's one
  useEffect(()=>{
    if(folders.length!==0){
      const firstFolderItem = document.querySelector(".folder");
      firstFolderItem.classList.add("selected");
      selectFolder(firstFolderItem);
    }
  }, [])

  /******************* Generate a Unique Id for a Folder **********************/
  const uid = () =>
    String(
      Date.now().toString(32) +
        Math.random().toString(16)
    ).replace(/\./g, '')

  /***************************** Select Folder ********************************/
  const selectFolder = (target) => {
    if(selectedFolderEl!==null) selectedFolderEl.classList.remove("selected");
    target.classList.add("selected");
    setSelectedFolderEl(target);
  }

  /********************************** Create Folder ***************************/
  const addNewFolder = () =>{
    const newFolder = {id:uid(), name:"New Folder", noteCount:0};
    let newFoldersList = [...folders, newFolder];
    setFolders(newFoldersList);
  }

  /***************************** Delete Folder ********************************/
  const deleteFolder = () => {
    let folderId = targetFolder.getAttribute("data-id");

    setSelectedFolderEl(null);
    setSelectedNote({});
    setSelectedNoteEl(null);

    const newFoldersList = folders.filter(folder => folder.id!==folderId);
    const newNotesList = notes.filter(note => note.folderId!==folderId);
    setFolders(newFoldersList);
    setNotes(newNotesList);
  }

/***************************** Context Menu *********************************/
  useEffect(()=>{
    const handleClick = () => {setShowContextMenu(false)};
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [])

  const handleContextMenu = (e) => {
    e.preventDefault();
    const x = e.target.getBoundingClientRect().left;
    const y = e.target.getBoundingClientRect().top;
    setShowContextMenu(true);
    setTargetPoint({x,y});
    setTargetFolder(e.target);
  }
  
  const ContextMenu = ({point}) => {
    const x = point.x + 60;
    const y = point.y - 35;
      return (
        <div className='context-menu' style={{top:y, left:x}}>
          <p onClick={makeFolderNameEditable}>Rename Folder</p>
          <p onClick={deleteFolder}>Delete Folder</p>
        </div>
      )
    }

  /******************************** Rename Folder ***************************/
  const makeFolderNameEditable = () => {
    targetFolder.contentEditable = true;
    targetFolder.focus();
    targetFolder.addEventListener("keydown", e=>preventEnterDefault(e))
    setOriginalFolderName(targetFolder.innerHTML);
  }

  const preventEnterDefault = (e)=>{
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  const editFolderName = () => {
      if(targetFolder.innerHTML.trim().length===0){
        targetFolder.innerHTML=originalFolderName;
      }

    // update local storage
    const folderId = targetFolder.getAttribute("data-id");

    const newFoldersList = folders.map(folder => folder.id===folderId ? 
                                                  {id: folder.id, name: targetFolder.innerHTML.trim()} 
                                                  : {id:folder.id, name: folder.name});
    setFolders(newFoldersList);


    // reset
    targetFolder.contentEditable = false;
    setOriginalFolderName("");
    targetFolder.removeEventListener('keydown', preventEnterDefault);
    setTargetFolder(null);
  }
  

/***************************************************************************/
  return (
    <div className='folderList'>
      <div className="folders">
        {folders && folders.map(folder => (

          <div key={folder.id} onClick={e=>selectFolder(e.target)} onContextMenu={e => handleContextMenu(e)} onBlur={editFolderName} data-id={folder.id}>
            <Folder folder={folder}/>
          </div>
        ))}

      </div>

      {showContextMenu && <ContextMenu point={targetPoint}/>}

      <button className='addNewFolder' onClick={addNewFolder}><i class="fa-solid fa-circle-plus"></i> New Folder</button>
    </div>
  )
}

export default FoldersList