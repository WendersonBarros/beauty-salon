import { FastifyInstance } from "fastify";
import { CategoryController } from "../controllers/CategoryController";

export default async function CategoryRoutes(fastify: FastifyInstance) {
  fastify.post("/", CategoryController.create);
};
