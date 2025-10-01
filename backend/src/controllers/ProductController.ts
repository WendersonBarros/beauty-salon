import { FastifyReply, FastifyRequest } from "fastify";
import { AppDataSource } from "../data-source";
import { BadRequestError, ConflictError, NotFoundError } from "../utils/errors";
import { Product } from "../entity/Product";
import { ProductService } from "../services/ProductService";
import { Category } from "../entity/Category";

const productRepo = AppDataSource.getRepository(Product);
const categoryRepo = AppDataSource.getRepository(Category);
const productService = new ProductService(productRepo, categoryRepo);

export class ProductController {
  static async create(
    request: FastifyRequest<{
      Body: { name: string, price: number, categoryId: number }
    }>,
    reply: FastifyReply
  ) {
    const { name, price, categoryId } = request.body;

    if (!name?.trim().length) {
      throw new BadRequestError("Product name is required.");
    }

    if (typeof price !== "number" || price < 0) {
      throw new BadRequestError("Product price is required.");
    }

    if (!categoryId) {
      throw new BadRequestError("Product categoryId is required.");
    }

    const product = await productService.createProduct(name, price, categoryId);
    return reply.status(201).send(product);
  };
};
