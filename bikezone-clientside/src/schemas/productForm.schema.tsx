import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  brand: z.string().min(2, "Brand must be at least 2 characters"),
  image: z.string().min(2, "Please paste image url"),
  price: z.number().min(0, "Price must be positive"),
  category: z.enum(["Mountain", "Road", "Hybrid", "Electric"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  quantity: z.number().min(0, "Quantity must be positive"),
  inStock: z.boolean(),
});
