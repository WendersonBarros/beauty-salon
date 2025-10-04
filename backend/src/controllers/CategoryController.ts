import { FastifyRequest, FastifyReply } from "fastify";
import { CategoryService } from "../services/CategoryService";
import { BadRequestError, ConflictError, NotFoundError } from "../utils/errors";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";

const categoryRepo = AppDataSource.getRepository(Category);
const categoryService = new CategoryService(categoryRepo);

export class CategoryController {
  static async create(request: FastifyRequest<{ Body: { name: string } }>, reply: FastifyReply) {
    const { name } = request.body;

    if (!name?.trim().length) {
      throw new BadRequestError("Category name is required");
    }

    const category = await categoryService.createCategory(name);
    return reply.status(201).send(category);
  }

  static async getAll(_request: FastifyRequest, reply: FastifyReply) {
    const categories = await categoryService.getCategories();
    return reply.status(200).send(categories);
  }

  static async getOne(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    const id = request.params.id;

    if (!Number.isInteger(Number(id))) {
      throw new BadRequestError("Invalid id, must be a number");
    }

    const category = await categoryService.getCategoryById(id);
    return reply.status(200).send(category);
  }

  static async update(
    request: FastifyRequest<{ Params: { id: number }, Body: { name: string } }>,
    reply: FastifyReply
  ) {
    const id = request.params.id;
    const name = request.body.name;

    if (!Number.isInteger(Number(id))) {
      throw new BadRequestError("Invalid id, must be a number");
    }

    if (!name?.trim().length) {
      throw new BadRequestError("Category name is required");
    }

    const category = await categoryService.updateCategory(id, name);
    return reply.status(200).send(category);
  }

  static async delete(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    const id = request.params.id;

    if (!Number.isInteger(Number(id))) {
      throw new BadRequestError("Invalid id, must be a number");
    }

    const deletedCategory = await categoryService.deleteCategory(id);
    return reply.status(200).send({
      message: `Category '${deletedCategory.name}' and it's products were deleted successfully`
    });
  }
};
