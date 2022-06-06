import { useState, createContext } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage.js';

export const NoteContext = createContext();

function NoteContextProvider(props){
    const [selectedNote, setSelectedNote] = useState({});
    const [selectedNoteEl, setSelectedNoteEl] = useState(null);
    const [selectedFolderEl, setSelectedFolderEl] = useState(null)
    const [notes, setNotes] = useLocalStorage("notes", []);
    const [folders, setFolders] = useLocalStorage("folders", []);

    return(
        <NoteContext.Provider value={{selectedNote, 
                                      setSelectedNote, 
                                      selectedNoteEl, 
                                      setSelectedNoteEl, 
                                      selectedFolderEl, 
                                      setSelectedFolderEl, 
                                      notes, 
                                      setNotes,
                                      folders,
                                      setFolders}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteContextProvider;