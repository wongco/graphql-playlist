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
const Book = require("../models/book"); // mongoDB Schema
const Author = require("../models/author"); // mongoDB Schema

// graph ql types
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent) {
        // logic to pull data on author of book
        // based on data available on Book Schema
        return Author.findById(parent.authorId);
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
      type: new GraphQLList(BookType),
      resolve(parent) {
        // logic to pull all (list of) books written by author
        // based on data available on parent (Author) schema
        return Book.find({
          authorId: parent.id
        });
      }
    }
  })
});

// root queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // logic to pull specific book by mongoDB Id
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // logic to pull specific author by mongoDB Id
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        // logic to pull all books in mongoDB Book collection
        return Book.find({});
      }
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve() {
        // logic to pull all authors in mongoDB Author collection
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        // do the actual db work of saving data to mongo
        const { name, age } = args;
        let author = new Author({
          name,
          age
        });
        return author.save(); // returns the object that can be viewed as end result of function
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID }
      },
      resolve(parent, args) {
        // do the actual db work of saving data to mongo
        const { name, genre, authorId } = args;
        let book = new Book({
          name,
          genre,
          authorId
        });
        return book.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
