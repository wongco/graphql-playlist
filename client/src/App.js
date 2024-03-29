import React from "react";
import BookList from "./components/BookList";
import ApolloClient from "apollo-boost"; // contains apollo client
import { ApolloProvider } from "react-apollo";
import AddBook from "./components/AddBook";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>WongCo's Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
};

export default App;
