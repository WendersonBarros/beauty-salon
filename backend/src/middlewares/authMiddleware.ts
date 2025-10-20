import { FastifyReply, FastifyRequest } from "fastify";
import { UnauthorizedError } from "../utils/errors";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { AppDataSource } from "../data-source";
import { Admin } from "../entity/Admin";
dotenv.config();

type JWTPayload = {
  id: number;
}

export const authMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new UnauthorizedError("You are not logged in");
  }

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

  const adminRepo = AppDataSource.getRepository(Admin);
  const user = await adminRepo.findOne({ where: { id } });

  if (!user) {
    throw new UnauthorizedError("You are not authorized");
  }
  
  const { password:_, ...loggedUser} = user;
  request.user = loggedUser;
}
