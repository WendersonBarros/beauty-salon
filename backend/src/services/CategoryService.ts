import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";

export class CategoryService {
  private categoryRepo = AppDataSource.getRepository(Category);

  async createCategory(name: string) {
    const existing = await this.categoryRepo.findOne({
      where: { name },
    });

    if (existing) {
      throw new Error("Category with the same name already exists");
    }

    const category = new Category();
    category.name = name;

    return await this.categoryRepo.save(category);
  }
};
