//graphql schema

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = require('graphql');
const { books } = require("../static/data");

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represents a book",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "The id of the book",
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The name of the book",
    },
    authorId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "The id of the author of the book",
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  description: "This is the root query",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: "List of books",
      resolve: () => books,
    },
    // book: {
    //   type: BookType,
    //   description: "A single book",
    //   args: {
    //     id: {
    //       type: GraphQLString,
    //     },
    //   },
    //   resolve(parent, args) {
    //     return books.find((book) => book.id == args.id);
    //   },
    // },
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
  // query: new GraphQLObjectType({
  //     name: 'Query',
  //     fields: {
  //         hello: {
  //             type: GraphQLString,
  //             resolve: () => 'Hello world!'
  //         },
  //         users: {
  //             type: new GraphQLList(new GraphQLObjectType({
  //                 name: 'User',
  //                 fields: {
  //                     id: { type: GraphQLInt },
  //                     name: { type: GraphQLString },
  //                     email: { type: GraphQLString }
  //                 }
  //             })),
  //             resolve: () => [
  //                 { id: 1, name: 'John Doe', email: 'sandberg'},
  //                 { id: 2, name: 'Jane Doe', email: 'sandberg2'}
  //             ]
  //         }
  //     }
  // }),
  // mutation: new GraphQLObjectType({
  //     name: 'Mutation',
  //     fields: {
  //         createUser: {
  //             type: new GraphQLObjectType({
  //                 name: 'CreateUserPayload',
  //                 fields: {
  //                     user: { type: new GraphQLNonNull(new GraphQLObjectType({
  //                         name: 'NewUser',
  //                         fields: {
  //                             id: { type: GraphQLInt },
  //                             name: { type: GraphQLString },
  //                             email: { type: GraphQLString }
  //                         }
  //                     })) }
  //                 }
  //             }),
  //             args: {
  //                 name: { type: new GraphQLNonNull(GraphQLString) },
  //                 email: { type: new GraphQLNonNull(GraphQLString) }
  //             },
  //             resolve: (root, args) => {
  //                 return {
  //                     user: {
  //                         id: 3,
  //                         name: args.name,
  //                         email: args.email
  //                     }
  //                 }
  //             }
  //         }
  //     }
  // })
});

module.exports =  schema;