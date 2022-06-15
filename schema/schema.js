//graphql schema

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = require('graphql');


const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            hello: {
                type: GraphQLString,
                resolve: () => 'Hello world!'
            },
            users: {
                type: new GraphQLList(new GraphQLObjectType({
                    name: 'User',
                    fields: {
                        id: { type: GraphQLInt },
                        name: { type: GraphQLString },
                        email: { type: GraphQLString }
                    }
                })),
                resolve: () => [
                    { id: 1, name: 'John Doe', email: 'sandberg'},
                    { id: 2, name: 'Jane Doe', email: 'sandberg2'}
                ]
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createUser: {
                type: new GraphQLObjectType({
                    name: 'CreateUserPayload',
                    fields: {
                        user: { type: new GraphQLNonNull(new GraphQLObjectType({
                            name: 'NewUser',
                            fields: {
                                id: { type: GraphQLInt },
                                name: { type: GraphQLString },
                                email: { type: GraphQLString }
                            }
                        })) }
                    }
                }),
                args: {
                    name: { type: new GraphQLNonNull(GraphQLString) },
                    email: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args) => {
                    return {
                        user: {
                            id: 3,
                            name: args.name,
                            email: args.email
                        }
                    }
                }
            }
        }
    })
});

module.exports =  schema;