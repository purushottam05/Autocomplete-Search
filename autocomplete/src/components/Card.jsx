import React from 'react';
import { getTitles, getSummaries, getAuthors } from '../data';

const Card = ({ bookId, onClose }) => {
  const title = getTitles()[bookId];
  const summary = getSummaries().find(summary => summary.id === bookId).summary;
  const author = getAuthors().find(author => author.book_id === bookId).author;

  return (
    <div className="relative w-full md:w-72 p-4 m-2 border shadow-md transition-transform transform hover:scale-105 overflow-hidden bg-white">
      <button
        onClick={() => onClose(bookId)}
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
      >
        &times;
      </button>
      <h2 className="font-bold text-lg">{title}</h2>
      <p className="italic">by {author}</p>
      <div className="overflow-y-auto mt-2" style={{ maxHeight: '10rem' }}>
        <p className="text-sm">{summary}</p>
      </div>
    </div>
  );
};

export default Card;
