import { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/ProductController";

export default async function ProductRoutes(fastify: FastifyInstance) {
  fastify.post("/", ProductController.create);
  fastify.get("/", ProductController.getAll);
  fastify.get("/:id", ProductController.getOne);
  fastify.patch("/:id", ProductController.update);
  fastify.delete("/:id", ProductController.delete);
};
