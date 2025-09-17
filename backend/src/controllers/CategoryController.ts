import { FastifyRequest, FastifyReply } from "fastify";
import { CategoryService } from "../services/CategoryService";

const categoryService = new CategoryService();

export class CategoryController {
  static async create(request: FastifyRequest<{ Body: { name: string } }>, reply: FastifyReply) {
    const { name } = request.body;

    if (!name?.trim().length) {
      return reply.status(400).send({
        error: "Category name is required"
      });
    }

    try {
      const category = await categoryService.createCategory(name);
      return reply.status(201).send(category);
    } catch (err: any) {
      return reply.status(409).send({
        error: err.message
      });
    }
  }

  static async getAll(_request: FastifyRequest, reply: FastifyReply) {
    const categories = await categoryService.getCategories();
    return reply.send(categories);
  }
};
