import { FastifyInstance } from "fastify";
import { AdminController } from "../controllers/AdminController";

export default async function AdminRoutes(fastify: FastifyInstance) {
  fastify.post("/login", AdminController.login);
  fastify.post("/refreshtoken", AdminController.refreshAcessToken);
};
