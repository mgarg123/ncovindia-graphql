const express = require('express')
const expressGraphQL = require('express-graphql')
import schema from '../../schema/schema'

const app = express()

app.use('/', expressGraphQL({
    schema: schema,
    graphiql: true
}));

export default app