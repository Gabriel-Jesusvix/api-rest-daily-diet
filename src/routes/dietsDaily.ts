import { FastifyInstance } from "fastify";
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { knex } from "../database";
import { checkSessionIdExistis } from "../middlewares/check-session-id-existis";
import { calcularMelhorSequenciaDeRefeicoes } from "./utils/sequence-meals-on-diet";




export async function dailyDietsRoutes(app: FastifyInstance) {

  app.get('/list', {
    preHandler: [checkSessionIdExistis]
  }, async (request, reply) => {
    const { sessionId } = request.cookies
    const diet = await knex('CreateDailyDiets').where('session_id', sessionId).select()


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

  app.get('/list/:id', {
    preHandler: [checkSessionIdExistis]
  }, async (request, reply) => {
    const { sessionId } = request.cookies

    const getDietParamsSchema = z.object({
      id: z.string().uuid()
    })
    const { id } = getDietParamsSchema.parse(request.params)

    const diet = await knex('CreateDailyDiets').where({
      session_id: sessionId,
      id,
    }).first()

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

    const { name, description, isOnTheDiet } = createDailyDietBodySchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 34 * 7, // 7 days
      })
    }
    await knex('CreateDailyDiets').insert({
      id: randomUUID(),
      name,
      description,
      isOnTheDiet,
      session_id: sessionId
    })

    return reply.status(201).send()
  })

  app.put('/update/:id', {
    preHandler: [checkSessionIdExistis]
  }, async (request, reply) => {
    const getDietParamsSchema = z.object({
      id: z.string().uuid()
    })
    const { sessionId } = request.cookies
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
    }).where({
      session_id: sessionId,
      id,
    })

    return reply.status(204).send()
  })
  app.delete('/delete/:id', {
    preHandler: [checkSessionIdExistis]
  }, async (request, reply) => {
    const getDietParamsSchema = z.object({
      id: z.string().uuid()
    })
    const { id } = getDietParamsSchema.parse(request.params)
    const { sessionId } = request.cookies

    await knex('CreateDailyDiets').delete().where({
      session_id: sessionId,
      id,
    })
    return reply.status(204).send()
  })
}