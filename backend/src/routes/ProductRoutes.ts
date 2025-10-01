import { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/ProductController";

export default async function ProductRoutes(fastify: FastifyInstance) {
  fastify.post("/", ProductController.create);
};
