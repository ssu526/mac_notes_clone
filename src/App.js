import './App.css';
import FoldersList from './components/FoldersList';
import Menu from './components/Menu';
import NoteDetail from './components/NoteDetail';
import NotesList from './components/NotesList';
import NoteContextProvider from './context/NoteContext';

function App() {
  return (
    <div className="App">
      <NoteContextProvider>
      <Menu/>
      <div className='notes-container'>
        <FoldersList/>
        <NotesList/>
        <NoteDetail/>
      </div>
      </NoteContextProvider>
    </div>
  );
}

export default App;
