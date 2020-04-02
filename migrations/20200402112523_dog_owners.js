exports.up = function(knex) {
  return knex.schema.createTable("dog_owner", table => {
    table.increments()
    table.integer("dog_id").references("id").inTable("dog")
    table.integer("owner_id").references("id").inTable("owner")
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("dog_owner") 
};
