import { z } from "zod";

const productValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .max(50, "Name cannot be more than 50 characters"),
    brand: z.string({ required_error: "Brand is required" }),
    price: z
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      })
      .nonnegative("Price must be a positive number"),
    category: z.enum(["Mountain", "Road", "Hybrid", "Electric"], {
      required_error: "Category is required",
      invalid_type_error: "Category must be a valid enum",
    }),
    description: z.string({ required_error: "Description is required" }),
    quantity: z
      .number({
        required_error: "Quantity is required",
        invalid_type_error: "Quantity must be a number",
      })
      .nonnegative("Quantity must be 0 or more"),
    inStock: z.boolean({ required_error: "inStock is required" }),
  }),
});

export const ProductValidation = {
  productValidationSchema,
};
