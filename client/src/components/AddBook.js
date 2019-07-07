import React from "react";
import { graphql } from "react-apollo";
import { getAuthorsQuery } from "../queries/queries";

const AddBook = props => {
  const displayAuthors = () => {
    const { data } = props;
    if (data.loading) {
      return <option disabled>Loading Authors...</option>;
    }
    return data.authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  };
  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>

      <div className="field">
        <label>Author:</label>
        <select>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

const graphqlConnectedComponent = graphql(getAuthorsQuery);

export default graphqlConnectedComponent(AddBook);
