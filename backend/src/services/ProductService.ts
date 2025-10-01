import { Repository } from "typeorm";
import { Product } from "../entity/Product";
import { Category } from "../entity/Category";
import { ConflictError, NotFoundError } from "../utils/errors";

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
};
