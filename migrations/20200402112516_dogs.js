exports.up = function(knex) {
  return knex.schema.createTable("dog", table => {
    table.increments()
    table.string("name")
  })  
};

exports.down = function(knex) {
  return knex.schema.deleteTableIfExists("dog") 
};
