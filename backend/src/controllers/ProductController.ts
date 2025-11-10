import { FastifyReply, FastifyRequest } from "fastify";
import { AppDataSource } from "../data-source";
import { BadRequestError, UnauthorizedError } from "../utils/errors";
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

    if (!request.user) {
      throw new UnauthorizedError("You are not logged in");
    }

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

  static async getAll(_request: FastifyRequest, reply: FastifyReply) {
    const products = await productService.getProducts();
    return reply.status(200).send(products);
  }

  static async getOne(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) {
    const id = request.params.id;

    if (!Number.isInteger(Number(id))) {
      throw new BadRequestError("Invalid id, must be a number");
    }

    const product = await productService.getProductById(id);
    return reply.status(200).send(product);
  }

  static async update(
    request: FastifyRequest<{
      Params: { id: number },
      Body: Partial<{ name: string, price: number, categoryId: number }>
    }>,
    reply: FastifyReply
  ) {
    const id = request.params.id;
    const data = request.body;

    if (!request.user) {
      throw new UnauthorizedError("You are not logged in");
    }

    if (!Number.isInteger(Number(id))) {
      throw new BadRequestError("Invalid id, must be a number");
    }

    if (!data.name && !data.price && !data.categoryId) {
      throw new BadRequestError("The request body can not be empty");
    }

    const product = await productService.updateProduct(id, data);
    return reply.status(200).send(product);
  };

  static async delete(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) {
    const id = request.params.id;

    if (!request.user) {
      throw new UnauthorizedError("You are not logged in");
    }

    if (!Number.isInteger(Number(id))) {
      throw new BadRequestError("Invalid id, must be a number");
    }

    const deletedProduct = await productService.deleteProduct(id);
    return reply.status(200).send({
      message: `Product '${deletedProduct.name}' deleted successfully`
    });
  };
};
