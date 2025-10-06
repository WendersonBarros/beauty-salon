import "reflect-metadata";
import { ProductService } from "../../src/services/ProductService";
import { ConflictError, NotFoundError, BadRequestError } from "../../src/utils/errors";

describe("Product.createProduct", () => {
  let mockProductRepo: any;
  let mockCategoryRepo: any;
  let productService: ProductService;

  beforeEach(() => {
    mockProductRepo = {
      findOne: jest.fn(),
      save: jest.fn(),
    };
    mockCategoryRepo = {
      findOne: jest.fn(),
    };
    productService = new ProductService(mockProductRepo, mockCategoryRepo);
    jest.clearAllMocks();
  });

  test(
    "It should create a new product if category exists and product is unique",
    async () => {
      const category = { id: 1, name: "Category" };
      const product = { id: 1, name: "Product 1", price: 100, category };

      mockCategoryRepo.findOne.mockResolvedValue(category);
      mockProductRepo.findOne.mockResolvedValue(null);
      mockProductRepo.save.mockResolvedValue(product);

      const result = await productService.createProduct(
        product.name,
        product.price,
        category.id
      );

      expect(mockCategoryRepo.findOne).toHaveBeenCalledWith({
        where: { id: category.id }
      });
      expect(mockProductRepo.findOne).toHaveBeenCalledWith({
        where: { name: product.name, category }
      });
      expect(mockProductRepo.save).toHaveBeenCalled();
      expect(result).toStrictEqual(product);
    }
  );

  test(
    "It should throw NotFoundError if category does not exist",
    async () => {
      mockCategoryRepo.findOne.mockResolvedValue(null);

      await expect(productService.createProduct("Test", 100, 1))
        .rejects.toThrow(NotFoundError);
      expect(mockCategoryRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    }
  );

  test(
    "It should throw ConflictError if product already exists in category",
    async () => {
      const category = { id: 1, name: "Category" };
      const existingProduct = { id: 1, name: "Product 1", price: 100, category };

      mockCategoryRepo.findOne.mockResolvedValue(category);
      mockProductRepo.findOne.mockResolvedValue(existingProduct);

      await expect(productService.createProduct("Product 1", 100, category.id))
        .rejects.toThrow(ConflictError);

      expect(mockCategoryRepo.findOne).toHaveBeenCalledWith({
        where: { id: category.id }
      });
      expect(mockProductRepo.findOne).toHaveBeenCalledWith({
        where: { name: "Product 1", category }
      });
    }
  );
});
