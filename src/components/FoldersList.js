import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { Folder } from './Folder';

function FoldersList() {
  const[folders, setFolders] = useLocalStorage("folders", []);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [targetFolder, setTargetFolder] = useState(null);
  const [originalFolderName, setOriginalFolderName] = useState("");
  const [targetPoint, setTargetPoint] = useState({x:0, y:0});

  /******************* Generate a Unique Id for a Folder **********************/
  const uid = () =>
    String(
      Date.now().toString(32) +
        Math.random().toString(16)
    ).replace(/\./g, '')


  /********************************** Create Folder ***************************/
  const addNewFolder = () =>{
    const newFolder = {id:uid(), name:"New Folder"};
    let newFoldersList = [...folders, newFolder];
    setFolders(newFoldersList);
  }

  /***************************** Delete Folder ********************************/
  const deleteFolder = () => {
    const newFoldersList = folders.filter(folder => folder.id!==targetFolder.getAttribute("data-id"));
    setFolders(newFoldersList);
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
/***************************************************************************/

  return (
    <div className='folderList'>
      <div className="folders">
        {folders && folders.map(folder => (
          <div key={folder.id} onContextMenu={e => handleContextMenu(e)} onBlur={editFolderName}>
            <Folder folder={folder}/>
          </div>
        ))}

      </div>

      {showContextMenu && <ContextMenu point={targetPoint}/>}

      <button className='addNewFolder' onClick={addNewFolder}>+ New Folder</button>
    </div>
  )
}

export default FoldersList