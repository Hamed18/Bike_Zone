// export type TErrorType = {
//   error: {
//     data: {
//       message: string;
//     };
//   };
// };
export type TUser = {
  userId: string;
  name?: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
  _id: string;
  isActive?: boolean;
};

export type TProduct = {
  _id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  category: "Road" | "Mountain" | "Sport" | "Commuter";
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export interface ApiError {
  data?: {
    message?: string;
  };
  status?: number;
}
