import { app } from "./app";
import { knex } from "./database";
const TABLE = 'CreateDailyDiets'


app.get('/', async () => {
  const diets = await knex(TABLE).select('*').where('name', 'new')
  // const diet = await knex(TABLE).insert({
  //   id: crypto.randomUUID(),
  //   name: 'new food',
  //   description: 'new fod with bread',
  //   isOnTheDiet: true
  // }).returning('*')

  return diets
})
app.listen({
  port: 3333
}).then(() => {
  console.log('HTTP Server running!')
})