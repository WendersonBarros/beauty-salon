import { AppDataSource } from "./data-source"
import Fastify from "fastify"
import CategoryRoutes from "./routes/CategoryRoutes";
import ProductRoutes from "./routes/ProductRoutes";
import { BadRequestError, ConflictError, NotFoundError } from "./utils/errors";

AppDataSource.initialize().then(async () => {
  const app = Fastify({ logger: true });

  app.register(CategoryRoutes, { prefix: "/categories" });
  app.register(ProductRoutes, { prefix: "/products" });

  app.setErrorHandler((error, request, reply) => {
    if (error instanceof BadRequestError) {
      return reply.status(400).send({ error: error.message });
    }

    if (error instanceof NotFoundError) {
      return reply.status(404).send({ error: error.message });
    }

    if (error instanceof ConflictError) {
      return reply.status(409).send({ error: error.message });
    }

    request.log.error(error);
    return reply.status(500).send({ error: "Internal server error" });
  });

  app.listen({ port: 3000 }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }

    console.log(`Server is listening on ${address}`);
  });
}).catch(error => console.log(error))
