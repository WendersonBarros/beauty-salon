import { Repository } from "typeorm";
import { Admin } from "../entity/Admin";
import { UnauthorizedError } from "../utils/errors";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export class AdminService {
  constructor(private adminRepo: Repository<Admin>) { }

  async adminLogin(login: string, password: string) {
    const admin = await this.adminRepo.findOne({
      where: { login }
    });

    if (!admin) {
      throw new UnauthorizedError("Invalid login or password");
    }

    const isCorrectPassword = await bcrypt.compare(password, admin.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedError("Invalid login or password");
    }

    const token = jwt.sign(
      { id: admin.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { id: admin.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return { token, refreshToken }
  }

  async generateAccessTokenFromRefreshToken(token: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number };
    const newToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return newToken;
  }
}
