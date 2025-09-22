export type Product = {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt?: string;
  user?: {
    name: string;
  };
};

export interface ProductProp {
  data: Product
  productId: string
}
