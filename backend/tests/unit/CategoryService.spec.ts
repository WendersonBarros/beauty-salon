import "reflect-metadata"
import { CategoryService } from "../../src/services/CategoryService";
import { ConflictError } from "../../src/utils/errors";

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
  });

  test(
    "It should create a new category if it does not exist",
    async () => {
      mockRepo.findOne.mockResolvedValue(null);
      mockRepo.save.mockResolvedValue({ id: 1, name: "Category test 1" });

      const result = await categoryService.createCategory("Category test 1");

      expect(mockRepo.findOne)
        .toHaveBeenCalledWith({ where: { name: "Category test 1" } });
      expect(mockRepo.save).toHaveBeenCalled();
      expect(result).toEqual({ id: 1, name: "Category test 1" });
    }
  );

  test(
    "It should not be possible to create a category with a repeated name",
    async () => {
      mockRepo.findOne.mockResolvedValue(null);
      mockRepo.save.mockResolvedValue({
        id: 2,
        name: "Category with a repeated name"
      });

      const category1 = await categoryService.createCategory(
        "Category with a repeated name"
      );

      expect(mockRepo.findOne).toHaveBeenCalledWith({
        where: { name: "Category with a repeated name" }
      });
      expect(mockRepo.save).toHaveBeenCalled();
      expect(category1).toEqual({
        id: 2,
        name: "Category with a repeated name"
      });

      mockRepo.findOne.mockResolvedValue({
        id: 2,
        name: "Category with a repeated name"
      });

      await expect(
        categoryService.createCategory("Category with a repeated name")
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
});
