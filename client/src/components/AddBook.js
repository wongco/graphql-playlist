import React, { useState } from "react";
import { graphql, compose } from "react-apollo";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

const AddBook = props => {
  const [inputFields, setInputFields] = useState({
    name: "",
    genre: "",
    authorId: ""
  });

  const displayAuthors = () => {
    const data = props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading Authors...</option>;
    }
    return data.authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  };

  const handleChange = event => {
    setInputFields({
      ...inputFields,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { name, genre, authorId } = inputFields;
    props.addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    // todo: clear useState inputs
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" name="name" onChange={handleChange} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" name="genre" onChange={handleChange} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={handleChange} name="authorId">
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

const graphqlComposedComponent = compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
);

export default graphqlComposedComponent(AddBook);
