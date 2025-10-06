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

describe("Product.getProducts", () => {
  let mockProductRepo: any;
  let mockCategoryRepo: any;
  let productService: ProductService;

  beforeEach(() => {
    mockProductRepo = { find: jest.fn() };
    mockCategoryRepo = {};
    productService = new ProductService(mockProductRepo, mockCategoryRepo);
    jest.clearAllMocks();
  });

  test(
    "It should return an empty array when no products exist",
    async () => {
      mockProductRepo.find.mockResolvedValue([]);

      const result = await productService.getProducts();

      expect(mockProductRepo.find).toHaveBeenCalledWith({ loadRelationIds: true });
      expect(result).toStrictEqual([]);
    }
  );

  test(
    "It should return all products with categoryId mapped",
    async () => {
      const products = [
        { id: 1, name: "P1", price: 100, category: 1 },
        { id: 2, name: "P2", price: 200, category: 2 },
      ];
      mockProductRepo.find.mockResolvedValue(products);

      const result = await productService.getProducts();

      expect(result).toStrictEqual([
        { id: 1, name: "P1", price: 100, categoryId: 1 },
        { id: 2, name: "P2", price: 200, categoryId: 2 },
      ]);
    }
  );
});

describe("Product.getProductById", () => {
  let mockProductRepo: any;
  let mockCategoryRepo: any;
  let productService: ProductService;

  beforeEach(() => {
    mockProductRepo = { findOne: jest.fn() };
    mockCategoryRepo = {};
    productService = new ProductService(mockProductRepo, mockCategoryRepo);
    jest.clearAllMocks();
  });

  test(
    "It should throw NotFoundError if product not found",
    async () => {
      mockProductRepo.findOne.mockResolvedValue(null);

      await expect(productService.getProductById(1)).rejects.toThrow(NotFoundError);
      expect(mockProductRepo.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ["category"],
      });
    }
  );

  test(
    "It should return the product if found",
    async () => {
      const product = { id: 1, name: "P1", price: 100, category: { id: 1 } };
      mockProductRepo.findOne.mockResolvedValue(product);

      const result = await productService.getProductById(1);
      expect(result).toStrictEqual(product);
    }
  );
});

describe("Product.updateProduct", () => {
  let mockProductRepo: any;
  let mockCategoryRepo: any;
  let productService: ProductService;

  beforeEach(() => {
    mockProductRepo = {
      findOne: jest.fn(),
      save: jest.fn(),
    };
    mockCategoryRepo = { findOne: jest.fn() };
    productService = new ProductService(mockProductRepo, mockCategoryRepo);
    jest.clearAllMocks();
  });

  test(
    "It should throw NotFoundError if product not found",
    async () => {
      mockProductRepo.findOne.mockResolvedValue(null);

      await expect(productService.updateProduct(1, { name: "New" }))
        .rejects.toThrow(NotFoundError);

      expect(mockProductRepo.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['category']
      });
    }
  );

  test(
    "It should throw BadRequestError if new name is empty",
    async () => {
      const product = { id: 1, name: "Old", price: 100, category: { id: 1 } };
      mockProductRepo.findOne.mockResolvedValue(product);

      await expect(productService.updateProduct(1, { name: "   " }))
        .rejects.toThrow(BadRequestError);

      expect(mockProductRepo.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['category']
      });
    }
  );

  test(
    "It should throw BadRequestError if price is invalid",
    async () => {
      const product = { id: 1, name: "Old", price: 100, category: { id: 1 } };
      mockProductRepo.findOne.mockResolvedValue(product);

      await expect(productService.updateProduct(1, { price: -10 }))
        .rejects.toThrow(BadRequestError);

      expect(mockProductRepo.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['category']
      });
    }


  );

  test(
    "It should throw NotFoundError if new categoryId does not exist",
    async () => {
      const product = { id: 1, name: "Old", price: 100, category: { id: 1 } };
      mockProductRepo.findOne.mockResolvedValue(product);
      mockCategoryRepo.findOne.mockResolvedValue(null);

      await expect(productService.updateProduct(1, { categoryId: 99 }))
        .rejects.toThrow(NotFoundError);

      expect(mockProductRepo.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['category']
      });
      expect(mockCategoryRepo.findOne).toHaveBeenCalledWith({ where: { id: 99 } });
    }
  );

  test(
    "It should throw ConflictError if another product with same name in category exists",
    async () => {
      const product = { id: 1, name: "Old", price: 100, category: { id: 1 } };
      const otherProduct = { id: 2, name: "New", price: 200, category: { id: 1 } };

      mockProductRepo.findOne
        .mockResolvedValueOnce(product)
        .mockResolvedValueOnce(otherProduct);

      await expect(productService.updateProduct(1, { name: "New" }))
        .rejects.toThrow(ConflictError);

      expect(mockProductRepo.findOne).toHaveBeenNthCalledWith(1,
        { where: { id: 1 }, relations: ['category'] }
      );
      expect(mockProductRepo.findOne).toHaveBeenNthCalledWith(2,
        { where: { name: "New", category: product.category } }
      );
    }
  );

  test(
    "It should update product when valid data is provided",
    async () => {
      const product = { id: 1, name: "Old", price: 100, category: { id: 1 } };
      const updated = { ...product, name: "Updated", price: 150 };

      mockProductRepo.findOne
        .mockResolvedValueOnce(product)
        .mockResolvedValueOnce(null);
      mockProductRepo.save.mockResolvedValue(updated);

      const result = await productService.updateProduct(1, {
        name: "Updated",
        price: 150,
      });

      expect(mockProductRepo.findOne).toHaveBeenNthCalledWith(1,
        { where: { id: 1 }, relations: ['category'] }
      );
      expect(mockProductRepo.findOne).toHaveBeenNthCalledWith(2,
        { where: { name: "Updated", category: product.category } }
      );
      expect(mockProductRepo.save).toHaveBeenCalledWith(expect.objectContaining({
        name: "Updated",
        price: 150,
      }));
      expect(result).toStrictEqual(updated);
    }
  );
});

describe("Product.deleteProduct", () => {
  let mockProductRepo: any;
  let mockCategoryRepo: any;
  let productService: ProductService;

  beforeEach(() => {
    mockProductRepo = {
      findOne: jest.fn(),
      remove: jest.fn(),
    };
    mockCategoryRepo = {};
    productService = new ProductService(mockProductRepo, mockCategoryRepo);
    jest.clearAllMocks();
  });

  test(
    "It should throw NotFoundError if product not found",
    async () => {
      mockProductRepo.findOne.mockResolvedValue(null);

      await expect(productService.deleteProduct(1))
        .rejects.toThrow(NotFoundError);
      expect(mockProductRepo.findOne).toHaveBeenCalledWith({
        where: { id: 1 }
      });
    }
  );

  test(
    "It should delete the product if it exists",
    async () => {
      const product = { id: 1, name: "DeleteMe", price: 100 };
      const deleted = { id: undefined, name: "DeleteMe", price: 100 };

      mockProductRepo.findOne.mockResolvedValue(product);
      mockProductRepo.remove.mockResolvedValue(deleted);

      const result = await productService.deleteProduct(1);

      expect(mockProductRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockProductRepo.remove).toHaveBeenCalledWith(product);
      expect(result).toStrictEqual(deleted);
    }
  );
});
