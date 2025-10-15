export type Product = {
  id: number;
  name: string;
  price: number;
  categoryId?: number;
};

export type Category = {
  id: number;
  name: string;
  products: Product[];
};
