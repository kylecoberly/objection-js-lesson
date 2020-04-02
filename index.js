const express = require("express")
const app = express()

const cors = require("cors")
app.use(cors())

const databaseConfig = require("./knexfile")[process.env.NODE_ENV || "development"]
const knex = require("knex")
const database = knex(databaseConfig)

const { Model } = require("objection")
Model.knex(database)

class Owner extends Model {
  static get tableName() {
    return "owner"
  }

  static get relationMappings(){
    return {
      dogs: {
        relation: Model.ManyToManyRelation,
        modelClass: Dog,
        join: {
          from: "owner.id",
          through: {
            from: "dog_owner.owner_id",
            to: "dog_owner.dog_id",
          },
          to: "dog.id",
        }
      }
    }
  }
}

class Dog extends Model {
  static get tableName() {
    return "dog"
  }

  static get relationMappings(){
    return {
      owners: {
        relation: Model.ManyToManyRelation,
        modelClass: Owner,
        join: {
          from: "dog.id",
          through: {
            from: "dog_owner.dog_id",
            to: "dog_owner.owner_id",
          },
          to: "owner.id",
        }
      }
    }
  }
}

class DogOwner extends Model {
  static get tableName() {
    return "dog_owner"
  }
}

app.get("/", async (request, response) => {
  const dogs = await Dog.query().withGraphFetched("owners")
  response.json({ dogs })
})

app.listen(process.env.PORT || 4000)
