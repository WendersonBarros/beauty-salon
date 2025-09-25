import "reflect-metadata"
import { CategoryService } from "../../src/services/CategoryService";
import { ConflictError } from "../../src/utils/errors";

describe("Category Service", () => {
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
});
