import React, { useState } from 'react';
import Autocomplete from './components/Autocomplete';
import Card from './components/Card';

const App = () => {
  const [selectedBooks, setSelectedBooks] = useState([]);

  const handleSelectBook = (bookId) => {
    if (!selectedBooks.includes(bookId)) {
      setSelectedBooks(prevBooks => [...prevBooks, bookId]);
    }
  };

  const handleRemoveBook = (bookId) => {
    setSelectedBooks(prevBooks => prevBooks.filter(id => id !== bookId));
  };

  return (
    <div className="container mx-auto p-4">
      <Autocomplete onSelect={handleSelectBook} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {selectedBooks.map(bookId => (
          <Card key={bookId} bookId={bookId} onClose={handleRemoveBook} />
        ))}
      </div>
    </div>
  );
};

export default App;
