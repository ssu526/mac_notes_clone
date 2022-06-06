import { useState, createContext } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage.js';

export const NoteContext = createContext();

function NoteContextProvider(props){
    const [selectedNote, setSelectedNote] = useState({});
    const [selectedNoteEl, setSelectedNoteEl] = useState(null);
    const [selectedFolderEl, setSelectedFolderEl] = useState(null)
    const [notes, setNotes] = useLocalStorage("notes", []);
    const [hideFolderSidebar, setHideFolderSidebar] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [folders, setFolders] = useLocalStorage("folders", []);
    const [password, setPassword] = useLocalStorage("notes-password", "1111");

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
                                      setFolders,
                                      hideFolderSidebar,
                                      setHideFolderSidebar,
                                      searchResult,
                                      setSearchResult,
                                      searchText,
                                      setSearchText,
                                      password,
                                      setPassword}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteContextProvider;