import { FastifyInstance } from "fastify";
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { knex } from "../database";
import { calcularMelhorSequenciaDeRefeicoes } from "./utils/sequence-meals-on-diet";




export async function  dailyDietsRoutes(app: FastifyInstance) {
  app.get('/list', async () => {
    const diet = await knex('CreateDailyDiets').select()
    const totalFoodRegistration = diet.length
    const quantityFoodOnDietMeals = diet.filter(diet => Number(diet.isOnTheDiet) === 1).length
    const quantityOffDietMeals = diet.filter(diet => Number(diet.isOnTheDiet) === 0).length
    const totalMealsSequenceOnDiet = calcularMelhorSequenciaDeRefeicoes(diet)


    return { 
      quantityFoodOnDietMeals,
      quantityOffDietMeals,
      totalFoodRegistration,
      totalMealsSequenceOnDiet,
      diet
    }
  })

  app.get('/list/:id', async (request) => {
    const getDietParamsSchema = z.object({
      id: z.string().uuid()
    })
    const { id } = getDietParamsSchema.parse(request.params)

    const diet = await knex('CreateDailyDiets').where('id', id).first()

    return {
      diet
    }
  })


  app.post('/create', async (request, reply) => {
    const createDailyDietBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      isOnTheDiet: z.boolean(),
    })

    const {name,description, isOnTheDiet} = createDailyDietBodySchema.parse(request.body)

     await knex('CreateDailyDiets').insert({
      id: randomUUID(),
      name,
      description,
      isOnTheDiet
    })
  
    return reply.status(201).send()
  })

  app.put('/update/:id', async (request, reply) => {
    const getDietParamsSchema = z.object({
      id: z.string().uuid()
    })
    
    const { id } = getDietParamsSchema.parse(request.params)

    const updatedDailyDietBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      isOnTheDiet: z.boolean(),
    })

    const { name, description, isOnTheDiet } = updatedDailyDietBodySchema.parse(request.body)

     await knex('CreateDailyDiets').update({
      name,
      description,
      isOnTheDiet
    }).where('id', id)
  
    return reply.status(204).send()
  })
  app.delete('/delete/:id', async (request, reply) => {
    const getDietParamsSchema = z.object({
      id: z.string().uuid()
    })
    const { id } = getDietParamsSchema.parse(request.params)

     await knex('CreateDailyDiets').delete().where('id', id)

    return reply.status(204).send()
  })
}