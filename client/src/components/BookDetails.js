import React from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

const BookDetails = props => {
  const displayBookDetails = () => {
    const { book } = props.data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map(book => (
              <li key={book.id}>{book.name}</li>
            ))}
          </ul>
        </div>
      );
    }
    return <div>No book selected...</div>;
  };
  return <div id="book-details">{displayBookDetails()}</div>;
};

const graphqlConnectedComponent = graphql(getBookQuery, {
  options: props => ({
    variables: {
      id: props.bookId
    }
  })
});

export default graphqlConnectedComponent(BookDetails);
