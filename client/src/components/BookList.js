import React from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

const BookList = props => {
  const displayBooks = () => {
    const { data } = props;
    if (data.loading) {
      return <div>Loading books...</div>;
    }
    return data.books.map(book => <li key={book.id}>{book.name}</li>);
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
    </div>
  );
};

const graphqlConnectedComponent = graphql(getBooksQuery);

export default graphqlConnectedComponent(BookList);