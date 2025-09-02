import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  quantity: z
    .number({
      invalid_type_error: "Quantity must be a number.",
    })
    .min(0, {
      message: "Quantity must be a non-negative number.",
    }),
  price: z
    .number({
      invalid_type_error: "Price must be a number.",
    })
    .min(0, {
      message: "Price must be a non-negative number.",
    })
    .optional(),
  image: z.string().optional(),
});
