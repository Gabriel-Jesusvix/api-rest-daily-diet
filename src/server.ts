import { app } from "./app";
import { env } from "./env";
import { dailyDietsRoutes } from "./routes/dietsDaily";


app.register(dailyDietsRoutes, {
  prefix: 'dailydiet'
})


app.listen({
  port: env.PORT
}).then(() => {
  console.log('HTTP Server running!')
})