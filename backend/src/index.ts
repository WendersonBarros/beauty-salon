import { AppDataSource } from "./data-source"
import Fastify from "fastify"
import CategoryRoutes from "./routes/CategoryRoutes";

AppDataSource.initialize().then(async () => {
  const app = Fastify({ logger: true });

  app.register(CategoryRoutes, { prefix: "/categories" });

  app.listen({ port: 3000 }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }

    console.log(`Server is listening on ${address}`);
  });
}).catch(error => console.log(error))
