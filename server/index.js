require('dotenv').config()
const express = require('express')
const graphqlServer = require('./graphqlServer')

const PORT = process.env.SERVER_PORT || 6678
const app = express()

app.use(graphqlServer)

app.listen(PORT, () => {
  console.log(`GraphiQL en http://localhost:${PORT}${process.env.SERVER_PATH}`)
})
