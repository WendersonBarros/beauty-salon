import { FastifyReply, FastifyRequest } from "fastify";
import { AppDataSource } from "../data-source";
import { Admin } from "../entity/Admin";
import { AdminService } from "../services/AdminService";
import { BadRequestError } from "../utils/errors";

const adminRepo = AppDataSource.getRepository(Admin);
const adminService = new AdminService(adminRepo);

export class AdminController {
  static async login(
    request: FastifyRequest<{ Body: { login: string, password: string } }>,
    reply: FastifyReply
  ) {
    const { login, password } = request.body;

    if (!login?.trim().length) {
      throw new BadRequestError("Login is required");
    }

    if (!password?.trim().length) {
      throw new BadRequestError("Password is required");
    }

    const token = await adminService.adminLogin(login, password);
    return reply.status(200).send(token);
  }
}
