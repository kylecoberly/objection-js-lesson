exports.up = function(knex) {
  return knex.schema.createTable("owner", table => {
    table.increments()
    table.string("name")
  })  
};

exports.down = function(knex) {
  return knex.schema.deleteTableIfExists("owner") 
};
