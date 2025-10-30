/// <reference path="./types/fastify.d.ts" />
import { AppDataSource } from "./data-source"
import Fastify from "fastify"
import AdminRoutes from "./routes/AdminRoutes";
import CategoryRoutes from "./routes/CategoryRoutes";
import ProductRoutes from "./routes/ProductRoutes";
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from "./utils/errors";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";

AppDataSource.initialize().then(async () => {
  const app = Fastify({ logger: true });
  await app.register(cors, {
    origin: "http://localhost:5173",
  })
  app.register(fastifyCookie);

  app.register(AdminRoutes, { prefix: "/admin" });
  app.register(CategoryRoutes, { prefix: "/categories" });
  app.register(ProductRoutes, { prefix: "/products" });

  app.setErrorHandler((error, request, reply) => {
    if (error instanceof BadRequestError) {
      return reply.status(400).send({ error: error.message });
    }

    if (error instanceof UnauthorizedError) {
      return reply.status(401).send({ error: error.message });
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
