exports.seed = async function(knex) {
  await knex('dog_owner').del()
  await knex('dog').del()
  await knex('owner').del()

  const bixbyId = await knex("dog").insert({
    name: "Bixby"
  }).returning("id")
  const mesaId = await knex("dog").insert({
    name: "Mesa"
  }).returning("id")


  const kyleId = await knex("owner").insert({
    name: "Kyle"
  }).returning("id")
  const elyseId = await knex("owner").insert({
    name: "Elyse"
  }).returning("id")

  await knex("dog_owner").insert({
    dog_id: +bixbyId,
    owner_id: +kyleId,
  }).returning("id")
  await knex("dog_owner").insert({
    dog_id: +mesaId,
    owner_id: +elyseId,
  }).returning("id")
  await knex("dog_owner").insert({
    dog_id: +bixbyId,
    owner_id: +elyseId,
  }).returning("id")
};
