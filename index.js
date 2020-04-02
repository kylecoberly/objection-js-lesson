const express = require("express")
const app = express()

const cors = require("cors")
app.use(cors())

const databaseConfig = require("./knexfile")[process.env.NODE_ENV || "development"]
const knex = require("knex")
const database = knex(databaseConfig)

app.get("/", async (request, response) => {
  response.json({ message: "Hi!" })
})

app.listen(process.env.PORT || 4000)
