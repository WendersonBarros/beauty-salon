import { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/ProductController";
import { authMiddleware } from "../middlewares/authMiddleware";

export default async function ProductRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: authMiddleware }, ProductController.create);
  fastify.get("/", ProductController.getAll);
  fastify.get("/:id", ProductController.getOne);
  fastify.patch("/:id", { preHandler: authMiddleware }, ProductController.update);
  fastify.delete("/:id", { preHandler: authMiddleware }, ProductController.delete);
};
