import "reflect-metadata"
import { CategoryService } from "../../src/services/CategoryService";
import { ConflictError, NotFoundError } from "../../src/utils/errors";

describe("Category.createCategory", () => {
  let mockRepo: {
    findOne: jest.Mock;
    save: jest.Mock;
  };

  let categoryService: CategoryService;

  beforeEach(() => {
    mockRepo = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    categoryService = new CategoryService(mockRepo as any);
    jest.clearAllMocks();
  });

  test(
    "It should create a new category if it does not exist",
    async () => {
      const category = { id: 1, name: "Category test 1" };
      mockRepo.findOne.mockResolvedValue(null);
      mockRepo.save.mockResolvedValue(category);

      const result = await categoryService.createCategory(category.name);

      expect(mockRepo.findOne)
        .toHaveBeenCalledWith({ where: { name: category.name } });
      expect(mockRepo.save).toHaveBeenCalled();
      expect(result).toStrictEqual(category);
    }
  );

  test(
    "It should not be possible to create a category with a repeated name",
    async () => {
      const repeatedCategory = { id: 1, name: "Category with a repeated name" };
      mockRepo.findOne.mockResolvedValue(null);
      mockRepo.save.mockResolvedValue(repeatedCategory);

      const category1 = await categoryService.createCategory(
        repeatedCategory.name
      );

      expect(mockRepo.findOne).toHaveBeenCalledWith({
        where: { name: repeatedCategory.name }
      });
      expect(mockRepo.save).toHaveBeenCalled();
      expect(category1).toStrictEqual(repeatedCategory);

      mockRepo.findOne.mockResolvedValue(repeatedCategory);

      await expect(
        categoryService.createCategory(repeatedCategory.name)
      ).rejects.toThrow(ConflictError);
      expect(mockRepo.save).toHaveBeenCalledTimes(1); // Category1
    }
  );
});

describe("Category.getCategories", () => {
  let mockRepo: {
    find: jest.Mock;
  };

  let categoryService: CategoryService;

  beforeEach(() => {
    mockRepo = {
      find: jest.fn()
    };

    categoryService = new CategoryService(mockRepo as any);
    jest.clearAllMocks();
  });

  test(
    "It should return an empty array when there are no categories",
    async () => {
      mockRepo.find.mockResolvedValue([]);

      const result = await categoryService.getCategories();

      expect(mockRepo.find).toHaveBeenCalledWith({ relations: ['products'] });
      expect(result).toStrictEqual([]);
    }
  );

  test(
    "It should return all categories as an array",
    async () => {
      const categories = [
        {
          id: 1, name: "category 1", products: [
            {
              id: 1,
              name: "Product a",
              price: 120
            },
            {
              id: 2,
              name: "Product b",
              price: 150
            }
          ]
        },
        { id: 2, name: "category 2", products: [] },
        { id: 3, name: "category 3", products: [] },
        { id: 4, name: "category 4", products: [] }
      ];

      mockRepo.find.mockResolvedValue(categories);

      const result = await categoryService.getCategories();

      expect(mockRepo.find).toHaveBeenCalledWith({ relations: ['products'] });
      expect(result).toStrictEqual(categories);
    }
  );
});

describe("Category.getCategoryById", () => {
  let mockRepo: {
    findOne: jest.Mock;
  };

  let categoryService: CategoryService;

  beforeEach(() => {
    mockRepo = {
      findOne: jest.fn()
    };

    categoryService = new CategoryService(mockRepo as any);
    jest.clearAllMocks();
  });

  test(
    "It should return an error when the id is not found",
    async () => {
      mockRepo.findOne.mockResolvedValue(null);

      await expect(categoryService.getCategoryById(1))
        .rejects.toThrow(NotFoundError);
      expect(mockRepo.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['products']
      });
    }
  );

  test(
    "It should return the the category with the given ID",
    async () => {
      const category = {
        id: 1,
        name: "Category 1",
        products: [
          {
            id: 1,
            name: "Product a",
            price: 120
          },
          {
            id: 2,
            name: "Product b",
            price: 150
          }
        ]
      };
      mockRepo.findOne.mockResolvedValue(category);

      const result = await categoryService.getCategoryById(1);

      expect(mockRepo.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['products']
      });
      expect(result).toStrictEqual(category);
    }
  );
});

describe("Category.updateCategory", () => {
  let mockRepo: {
    findOne: jest.Mock;
    save: jest.Mock;
  };

  let categoryService: CategoryService;

  beforeEach(() => {
    mockRepo = {
      findOne: jest.fn(),
      save: jest.fn()
    };

    categoryService = new CategoryService(mockRepo as any);
    jest.clearAllMocks();
  });

  test(
    "It should return an error when the id is not found",
    async () => {
      mockRepo.findOne.mockResolvedValue(null);

      await expect(categoryService.updateCategory(1, ""))
        .rejects.toThrow(NotFoundError);
      expect(mockRepo.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['products']
      });
    }
  );

  test(
    "It should return an error when trying to update a category with an existing name",
    async () => {
      const existingCategory = { id: 1, name: "Existing category", products: [] }
      mockRepo.findOne.mockResolvedValue(existingCategory);

      await expect(categoryService.updateCategory(2, existingCategory.name))
        .rejects.toThrow(ConflictError);
      expect(mockRepo.findOne).toHaveBeenNthCalledWith(1, {
        where: { id: 2 },
        relations: ['products']
      });
      expect(mockRepo.findOne).toHaveBeenNthCalledWith(2, {
        where: { name: existingCategory.name }
      });
    }
  );

  test(
    "It should update the category if no error was thrown",
    async () => {
      const id = 1;
      const categoryToUpdate = { id, name: "Category to update", products: [] };
      mockRepo.findOne
        .mockResolvedValueOnce(categoryToUpdate)
        .mockResolvedValueOnce(null);

      categoryToUpdate.name = "Updated category";

      mockRepo.save.mockResolvedValue(categoryToUpdate);

      const result = await categoryService.updateCategory(id, categoryToUpdate.name);

      expect(mockRepo.findOne).toHaveBeenNthCalledWith(1, {
        where: { id },
        relations: ['products']
      });
      expect(mockRepo.findOne).toHaveBeenNthCalledWith(2, {
        where: { name: categoryToUpdate.name }
      });
      expect(mockRepo.save).toHaveBeenCalledWith(categoryToUpdate);
      expect(result).toStrictEqual({
        id,
        name: "Updated category",
        products: []
      });
    }
  );
});

describe("Category.deleteCategory", () => {
  let mockRepo: {
    findOne: jest.Mock;
    remove: jest.Mock;
  };

  let categoryService: CategoryService;

  beforeAll(() => {
    mockRepo = {
      findOne: jest.fn(),
      remove: jest.fn()
    };

    categoryService = new CategoryService(mockRepo as any);
  });

  test(
    "It should return an error when the id is not found",
    async () => {
      mockRepo.findOne.mockResolvedValue(null);

      await expect(categoryService.deleteCategory(1))
        .rejects.toThrow(NotFoundError);
      expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    }
  );

  test(
    "It should delete the category if it exists",
    async () => {
      const categoryToDelete = { id: 1, name: "Category to delete" };
      const deletedCategoryRes = { id: undefined, name: categoryToDelete.name };
      mockRepo.findOne.mockResolvedValue(categoryToDelete);
      mockRepo.remove.mockResolvedValue(deletedCategoryRes);

      const result = await categoryService.deleteCategory(categoryToDelete.id);

      expect(mockRepo.findOne).toHaveBeenCalledWith({
        where: { id: categoryToDelete.id }
      });
      expect(mockRepo.remove).toHaveBeenCalledWith(categoryToDelete);
      expect(result).toStrictEqual(deletedCategoryRes);
    }
  );
});
