document.addEventListener('DOMContentLoaded', () => {
  const noteTitle = document.getElementById('note-title');
  const noteTextarea = document.getElementById('note-textarea');
  const notePreview = document.getElementById('note-preview');
  const saveNoteBtn = document.getElementById('save-note');
  const newNoteBtn = document.getElementById('new-note');
  const noteList = document.getElementById('note-list');
  const searchBar = document.getElementById('search-bar');
  const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');
  const themeSwitcherBtn = document.getElementById('theme-switcher');

  let activeNote = {};
  let autoSaveTimeout;
  const themes = ['theme-dark', 'theme-light', 'theme-blue'];
  let currentThemeIndex = 0;

  const getNotes = async () => {
    const response = await fetch('/api/notes');
    const notes = await response.json();
    return notes;
  };

  const saveNote = async (note) => {
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    const savedNote = await response.json();
    return savedNote;
  };

  const deleteNote = async (id) => {
    const response = await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  };

  const renderActiveNote = () => {
    if (activeNote.id) {
      noteTitle.value = activeNote.title;
      noteTextarea.value = activeNote.text;
      notePreview.innerHTML = marked(activeNote.text);
      saveNoteBtn.style.display = 'none';
    } else {
      noteTitle.value = '';
      noteTextarea.value = '';
      notePreview.innerHTML = '';
      saveNoteBtn.style.display = 'inline';
    }
  };

  const handleNoteSave = async () => {
    const newNote = {
      id: activeNote.id || uuidv4(),
      title: noteTitle.value,
      text: noteTextarea.value,
      pinned: activeNote.pinned || false,
      date: activeNote.date || new Date().toISOString()
    };
    await saveNote(newNote);
    getAndRenderNotes();
    renderActiveNote();
  };

  const handleNoteDelete = async (e) => {
    e.stopPropagation();
    const noteItem = e.target.closest('.list-group-item');
    noteItem.classList.add('removing');
    setTimeout(async () => {
      const noteId = noteItem.dataset.id;
      if (activeNote.id === noteId) {
        activeNote = {};
      }
      await deleteNote(noteId);
      getAndRenderNotes();
      renderActiveNote();
    }, 500); // Match the duration of the fadeOut animation
  };

  const handleNoteView = (e) => {
    e.preventDefault();
    activeNote = JSON.parse(e.target.closest('.list-group-item').dataset.note);
    renderActiveNote();
  };

  const handleNewNoteView = () => {
    activeNote = {};
    renderActiveNote();
  };

  const handleNotePin = async (e) => {
    e.stopPropagation();
    const noteId = e.target.closest('.list-group-item').dataset.id;
    const notes = await getNotes();
    const note = notes.find(note => note.id === noteId);
    note.pinned = !note.pinned;
    await saveNote(note);
    getAndRenderNotes();
  };

  const handleMarkdownInput = (e) => {
    const markdownText = e.target.value;
    notePreview.innerHTML = marked(markdownText);
  };

  const handleAutoSave = () => {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(async () => {
      const newNote = {
        id: activeNote.id || uuidv4(),
        title: noteTitle.value,
        text: noteTextarea.value,
        pinned: activeNote.pinned || false,
        date: activeNote.date || new Date().toISOString()
      };
      await saveNote(newNote);
      getAndRenderNotes();
      renderActiveNote();
    }, 1000); // Auto-save after 1 second of inactivity
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const notes = document.querySelectorAll('.list-group-item');
    notes.forEach((note) => {
      const title = note.querySelector('span').textContent.toLowerCase();
      if (title.includes(searchTerm)) {
        note.style.display = '';
      } else {
        note.style.display = 'none';
      }
    });
  };

  const switchTheme = () => {
    document.body.classList.remove(themes[currentThemeIndex]);
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    document.body.classList.add(themes[currentThemeIndex]);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', e.target.dataset.id);
    e.target.classList.add('dragging');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector('.dragging');
    const afterElement = getDragAfterElement(noteList, e.clientY);
    if (afterElement == null) {
      noteList.appendChild(draggingItem);
    } else {
      noteList.insertBefore(draggingItem, afterElement);
    }
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
  };

  const getDragAfterElement = (container, y) => {
    const draggableElements = [...container.querySelectorAll('.list-group-item:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  };

  const renderNoteList = async (notes) => {
    noteList.innerHTML = '';
    notes.forEach((note) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.dataset.id = note.id;
      li.dataset.note = JSON.stringify(note);
      li.draggable = true;
      li.innerHTML = `
        <span id="note-item-title">${note.title}</span>
        <div id="note-item-buttons" class="note-buttons">
          <button id="note-item-view" class="view-note btn">View</button>
          <button id="note-item-edit" class="edit-note btn">Edit</button>
          <button id="note-item-pin" class="pin-note btn">${note.pinned ? 'Unpin' : 'Pin'}</button>
          <button id="note-item-delete" class="delete-note btn">Delete</button>
        </div>
      `;
      noteList.appendChild(li);
    });
  };

  const getAndRenderNotes = async () => {
    const notes = await getNotes();
    renderNoteList(notes);
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-note')) {
      handleNoteDelete(e);
    } else if (e.target.classList.contains('pin-note')) {
      handleNotePin(e);
    } else if (e.target.classList.contains('view-note')) {
      handleNoteView(e);
    } else if (e.target.classList.contains('edit-note')) {
      handleNoteView(e);
    }
  });
  noteList.addEventListener('dragstart', handleDragStart);
  noteList.addEventListener('dragover', handleDragOver);
  noteList.addEventListener('dragend', handleDragEnd);
  noteTitle.addEventListener('input', handleAutoSave);
  noteTextarea.addEventListener('input', handleAutoSave);
  noteTextarea.addEventListener('input', handleMarkdownInput);
  searchBar.addEventListener('input', handleSearch);
  toggleDarkModeBtn.addEventListener('click', toggleDarkMode);
  themeSwitcherBtn.addEventListener('click', switchTheme);

  getAndRenderNotes();
});