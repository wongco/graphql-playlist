import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = props => {
  const [currentBookId, setCurrentBookId] = useState(null);

  const handleClick = event => setCurrentBookId(event.target.id);

  const displayBooks = () => {
    const { data } = props;
    if (data.loading) {
      return <div>Loading books...</div>;
    }
    return data.books.map(book => (
      <li key={book.id} id={book.id} onClick={handleClick}>
        {book.name}
      </li>
    ));
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails bookId={currentBookId} />
    </div>
  );
};

const graphqlConnectedComponent = graphql(getBooksQuery);

export default graphqlConnectedComponent(BookList);
