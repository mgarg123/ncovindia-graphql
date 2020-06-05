const express = require('express')
const expressGraphQL = require('express-graphql')
import schema from '../../schema/schema'
const cors = require('cors')
const app = express()

app.use(cors())
app.use('/', expressGraphQL({
    schema: schema,
    graphiql: true
}));

export default app