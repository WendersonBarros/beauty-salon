import { FastifyInstance } from "fastify";
import { AdminController } from "../controllers/AdminController";

export default async function AdminRoutes(fastify: FastifyInstance) {
  fastify.post("/", AdminController.login);
};
