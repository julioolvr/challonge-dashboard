const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

var app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

module.exports = app
