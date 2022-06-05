import { useState, createContext } from "react";

export const SelectedNoteContext = createContext();

function SelectedNoteContextProvider(props){
    const [selected, setSelected] = useState({});

    return(
        <SelectedNoteContext.Provider value={{selected, setSelected}}>
            {props.children}
        </SelectedNoteContext.Provider>
    )
}

export default SelectedNoteContextProvider;