const express = require('express');
const expressGraphQL = require('express-graphql');
const app = express();
const schema = require('./schema/schema');

app.use('/graphql', expressGraphQL.graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(5000, () => {
    console.log('Server is running on port 3000');
    }
);