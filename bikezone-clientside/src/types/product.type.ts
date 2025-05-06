export type TProduct = {
  _id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  __v?: number;
};

export type TProductsApiResponse = {
  success: boolean;
  message?: string;
  data: TProduct[];
};

export type TProductFormData = Omit<
  TProduct,
  "_id" | "createdAt" | "updatedAt" | "__v"
>;

export type TCartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};
