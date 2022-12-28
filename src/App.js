import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";


const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: 'this is my first note',
      date: '28/12/2022'

    },
    {
      id: nanoid(),
      text: 'this is my second note',
      date: '28/12/2022'

    },
    {
      id: nanoid(),
      text: 'this is my third note',
      date: '28/12/2022'

    }
  ]);
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);


  const addNote = (text) => {
    const date = new Date()
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString
    }

    const newNotes = [...notes, newNote];
    setNotes(newNotes)

  }
  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList notes={notes.filter((note) =>
          note.text.toLowerCase().includes(searchText)
        )}
          handleAddNote={addNote} handleDeleteNote={deleteNote} />
      </div>
    </div>


  )

};

export default App;