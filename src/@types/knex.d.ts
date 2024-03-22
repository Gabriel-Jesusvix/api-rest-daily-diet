// eslint-disable-next-line
import 'knex'
// ou faça apenas:
// import 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    CreateDailyDiets: {
      id: string
      name: string
      description: string
      isOnTheDiet: boolean
      created_at: string
      session_id?: string
    }
  }
}