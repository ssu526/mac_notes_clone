import './App.css';
import FoldersList from './components/FoldersList';
import Menu from './components/Menu';
import NoteDetail from './components/NoteDetail';
import NotesList from './components/NotesList';
import SelectedNoteContextProvider from './context/SelectedNoteContext';

function App() {
  return (
    <div className="App">
      <Menu/>
      <SelectedNoteContextProvider>
        <div className='notes-container'>
          <FoldersList/>
          <NotesList/>
          <NoteDetail/>
        </div>
      </SelectedNoteContextProvider>
    </div>
  );
}

export default App;
