import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";
import { ConflictError, NotFoundError } from "../utils/errors";

export class CategoryService {
  private categoryRepo = AppDataSource.getRepository(Category);

  async createCategory(name: string) {
    const existing = await this.categoryRepo.findOne({
      where: { name },
    });

    if (existing) {
      throw new ConflictError("Category with the same name already exists");
    }

    const category = new Category();
    category.name = name;

    return await this.categoryRepo.save(category);
  }

  async getCategories() {
    return this.categoryRepo.find();
  }

  async getCategoryById(id: number) {
    const category = await this.categoryRepo.findOneById(id);

    if (!category) {
      throw new NotFoundError(`Category with id ${id} not found`);
    }

    return category;
  }
};
