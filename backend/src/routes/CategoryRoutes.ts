import { FastifyInstance } from "fastify";
import { CategoryController } from "../controllers/CategoryController";

export default async function CategoryRoutes(fastify: FastifyInstance) {
  fastify.post("/", CategoryController.create);
  fastify.get("/", CategoryController.getAll);
  fastify.get("/:id", CategoryController.getOne);
  fastify.patch("/:id", CategoryController.update);
};
