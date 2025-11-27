import { FastifyReply, FastifyRequest } from "fastify";
import { AppDataSource } from "../data-source";
import { Admin } from "../entity/Admin";
import { AdminService } from "../services/AdminService";
import { BadRequestError, UnauthorizedError } from "../utils/errors";

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

    const { token, refreshToken } = await adminService.adminLogin(
      login, password
    );

    return reply
      .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
      .header('Authorization', token)
      .status(200).send({
        message: "Login successful",
        acessToken: token
      });
  }

  static async refreshAcessToken(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const refreshTokenValue = request.cookies["refreshToken"];
    if (!refreshTokenValue) {
      throw new UnauthorizedError("Access Denied. No refresh token provided");
    }

    try {
      const newAcessToken = await adminService
        .generateAccessTokenFromRefreshToken(refreshTokenValue);

      reply
        .header("Authorization", newAcessToken)
        .status(200).send({
          accessToken: newAcessToken
        });
    } catch (error) {
      throw new UnauthorizedError("Invalid refresh token");
    }
  }
}
