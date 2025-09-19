import { FastifyRequest, FastifyReply } from "fastify";
import { CategoryService } from "../services/CategoryService";
import { BadRequestError, ConflictError, NotFoundError } from "../utils/errors";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";

const categoryRepo = AppDataSource.getRepository(Category);
const categoryService = new CategoryService(categoryRepo);

export class CategoryController {
  static async create(request: FastifyRequest<{ Body: { name: string } }>, reply: FastifyReply) {
    try {
      const { name } = request.body;

      if (!name?.trim().length) {
        throw new BadRequestError("Category name is required");
      }

      const category = await categoryService.createCategory(name);
      return reply.status(201).send(category);
    } catch (err: any) {
      if (err instanceof BadRequestError) {
        return reply.status(400).send({
          error: err.message
        });
      }

      if (err instanceof ConflictError) {
        return reply.status(409).send({
          error: err.message
        });
      }

      return reply.status(500).send({
        error: "Internal server error"
      })
    }
  }

  static async getAll(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const categories = await categoryService.getCategories();
      return reply.status(200).send(categories);
    } catch (err: any) {
      return reply.status(500).send({
        error: "Internal server error"
      });
    }
  }

  static async getOne(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    try {
      const id = request.params.id;

      if (!Number.isInteger(Number(id))) {
        throw new BadRequestError("Invalid id, must be a number");
      }

      const category = await categoryService.getCategoryById(id);
      return reply.status(200).send(category);
    } catch (err: any) {
      if (err instanceof NotFoundError) {
        return reply.status(404).send({
          error: err.message
        });
      }

      if (err instanceof BadRequestError) {
        return reply.status(400).send({
          error: err.message
        });
      }

      return reply.status(500).send({
        error: "Internal server error"
      })
    }
  }

  static async update(
    request: FastifyRequest<{ Params: { id: number }, Body: { name: string } }>,
    reply: FastifyReply
  ) {
    try {
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
    } catch (err: any) {
      if (err instanceof BadRequestError) {
        return reply.status(400).send({
          error: err.message
        });
      }

      if (err instanceof NotFoundError) {
        return reply.status(404).send({
          error: err.message
        });
      }

      if (err instanceof ConflictError) {
        return reply.status(409).send({
          error: err.message
        });
      }

      return reply.status(500).send({
        error: "Internal server error"
      });
    }
  }

  static async delete(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    try {
      const id = request.params.id;

      if (!Number.isInteger(Number(id))) {
        throw new BadRequestError("Invalid id, must be a number");
      }

      const deletedCategory = await categoryService.deleteCategory(id);
      return reply.status(200).send({
        message: `Category '${deletedCategory.name}' deleted successfully`
      });
    } catch (err: any) {
      if (err instanceof BadRequestError) {
        return reply.status(400).send({
          error: err.message
        });
      }

      if (err instanceof NotFoundError) {
        return reply.status(404).send({
          error: err.message
        });
      }

      return reply.status(500).send({
        error: "Internal server error"
      });
    }
  }
};
