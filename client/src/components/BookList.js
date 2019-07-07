import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

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
