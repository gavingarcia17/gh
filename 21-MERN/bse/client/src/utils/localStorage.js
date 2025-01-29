// Function to get saved book IDs from local storage
export const getSavedBookIds = () => {
  if (typeof localStorage === 'undefined') return [];

  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];

  return savedBookIds;
};

// Function to save book IDs to local storage
export const saveBookIds = (bookIdArr) => {
  if (typeof localStorage === 'undefined') return;

  if (bookIdArr.length) {
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('saved_books');
  }
};

// Function to remove a book ID from local storage
export const removeBookId = (bookId) => {
  if (typeof localStorage === 'undefined') return false;

  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  if (!savedBookIds) {
    return false;
  }

  const updatedSavedBookIds = savedBookIds.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  return true;
};