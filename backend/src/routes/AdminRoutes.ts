import { FastifyInstance } from "fastify";
import { AdminController } from "../controllers/AdminController";
import { authMiddleware } from "../middlewares/authMiddleware";

export default async function AdminRoutes(fastify: FastifyInstance) {
  fastify.post("/login", AdminController.login);
  fastify.post("/refreshtoken", AdminController.refreshAcessToken);
  fastify.get("/verify", { preHandler: authMiddleware }, (req, reply) => {
    reply.status(200).send({
      user: req.user.login
    });
  });
};
