import "fastify";
import { Admin } from "../entity/Admin";

declare module "fastify" {
  interface FastifyRequest {
    user?: Partial<Admin>;
  }
}
