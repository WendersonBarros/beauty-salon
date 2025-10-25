import { FastifyInstance } from "fastify";
import { CategoryController } from "../controllers/CategoryController";
import { authMiddleware } from "../middlewares/authMiddleware";

export default async function CategoryRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: authMiddleware }, CategoryController.create);
  fastify.get("/", CategoryController.getAll);
  fastify.get("/:id", CategoryController.getOne);
  fastify.patch("/:id", { preHandler: authMiddleware }, CategoryController.update);
  fastify.delete("/:id", { preHandler: authMiddleware }, CategoryController.delete);
};
