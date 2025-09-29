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

      expect(mockRepo.find).toHaveBeenCalled();
      expect(result).toStrictEqual([]);
    }
  );

  test(
    "It should return all categories as an array",
    async () => {
      const categories = [
        { id: 1, name: "category 1" },
        { id: 2, name: "category 2" },
        { id: 3, name: "category 3" },
        { id: 4, name: "category 4" }
      ];

      mockRepo.find.mockResolvedValue(categories);

      const result = await categoryService.getCategories();

      expect(mockRepo.find).toHaveBeenCalled();
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
      expect(mockRepo.findOne).toHaveBeenCalled();
    }
  );

  test(
    "It should return the the category with the given ID",
    async () => {
      const category = { id: 1, name: "Category 1" };
      mockRepo.findOne.mockResolvedValue(category);

      const result = await categoryService.getCategoryById(1);

      expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
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
      expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    }
  );

  test(
    "It should return an error when trying to update a category with an existing name",
    async () => {
      const existingCategory = { id: 1, name: "Existing category" }
      mockRepo.findOne.mockResolvedValue(existingCategory);

      await expect(categoryService.updateCategory(2, existingCategory.name))
        .rejects.toThrow(ConflictError);
      expect(mockRepo.findOne).toHaveBeenNthCalledWith(1, { where: { id: 2 } });
      expect(mockRepo.findOne).toHaveBeenNthCalledWith(2, {
        where: { name: existingCategory.name }
      });
    }
  );

  test(
    "It should update the category if no error was thrown",
    async () => {
      const id = 1;
      const categoryToUpdate = { id, name: "Category to update" };
      mockRepo.findOne
        .mockResolvedValueOnce(categoryToUpdate)
        .mockResolvedValueOnce(null);

      categoryToUpdate.name = "Updated category";

      mockRepo.save.mockResolvedValue(categoryToUpdate);

      const result = await categoryService.updateCategory(id, categoryToUpdate.name);

      expect(mockRepo.findOne).toHaveBeenNthCalledWith(1, {
        where: { id }
      });
      expect(mockRepo.findOne).toHaveBeenNthCalledWith(2, {
        where: { name: categoryToUpdate.name }
      });
      expect(mockRepo.save).toHaveBeenCalledWith(categoryToUpdate);
      expect(result).toStrictEqual({
        id,
        name: "Updated category"
      });
    }
  );
});
