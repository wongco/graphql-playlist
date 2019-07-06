// this file describes the schema for the graph data
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList // allows for an array/list of a specific type
} = graphql;

// example data
const books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
  { name: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "2" },
  { name: "The Colour of Magic", genre: "Fantasy", id: "5", authorId: "3" },
  { name: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: "3" }
];

const authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" },
  { name: "Brandon Sanderson", age: 42, id: "2" },
  { name: "Terry Pratchett", age: 66, id: "3" }
];

// graph ql types and resolvers
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return authors.find(author => author.id === parent.id);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType), // list allows you to type out a list an existing graphQL type
      resolve(parent, args) {
        return books.filter(book => book.authorId === parent.id);
      }
    }
  })
});

// root queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      // book root query, info below on how to deal request
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // base graphql data to return - code to get data from db / other source
        return books.find(book => book.id === args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // base graphql data to return - code to get data from db / other source
        return authors.find(author => author.id === args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
