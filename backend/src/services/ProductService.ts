import { Repository } from "typeorm";
import { Product } from "../entity/Product";
import { Category } from "../entity/Category";
import { BadRequestError, ConflictError, NotFoundError } from "../utils/errors";

export class ProductService {
  constructor(
    private productRepo: Repository<Product>,
    private categoryRepo: Repository<Category>
  ) { };

  async createProduct(name: string, price: number, categoryId: number) {
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId }
    });

    if (!category) {
      throw new NotFoundError(`Category with id ${categoryId} not found`);
    }

    const existing = await this.productRepo.findOne({
      where: { name, category }
    });

    if (existing) {
      throw new ConflictError(
        "Product with the same name already exists inside this category"
      );
    }

    const product = new Product();
    product.name = name;
    product.price = price;
    product.category = category;

    return this.productRepo.save(product);
  };

  async getProducts() {
    const products = await this.productRepo.find({
      loadRelationIds: true
    });

    return products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      categoryId: product.category
    }));
  };

  async getProductById(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }

    return product;
  };

  async updateProduct(
    id: number,
    data: Partial<{ name: string, price: number, categoryId: number }>
  ) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category']
    });

    if (!product) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }

    if (data.name !== undefined) {
      if (!data.name.trim().length) {
        throw new BadRequestError("Product name can not be empty");
      }
      product.name = data.name.trim();
    }

    if (data.price !== undefined) {
      if (typeof data.price !== "number" || data.price < 0) {
        throw new BadRequestError("Price must be a non-negative number");
      }
      product.price = data.price;
    }

    if (data.categoryId !== undefined) {
      const category = await this.categoryRepo.findOne({
        where: { id: data.categoryId }
      });

      if (!category) {
        throw new NotFoundError(`Category with id ${data.categoryId} not found`);
      }

      product.category = category;
    }

    const existing = await this.productRepo.findOne({
      where: { name: product.name, category: product.category }
    });

    if (existing && existing.id !== Number(id)) {
      throw new ConflictError(
        "Product with the same name already exists inside this category"
      );
    }

    return this.productRepo.save(product);
  };
};
