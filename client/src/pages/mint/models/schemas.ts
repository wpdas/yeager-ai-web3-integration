import { z } from "zod";

// Set limitations to the inputs to maintain good practices
export const mintNftSchema = z.object({
  name: z
    .string({ message: "This is required!" })
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be less than 100 characters"),
  description: z
    .string({ message: "This is required!" })
    .min(3, "Description must contain at least 3 character(s)")
    .max(500, "Description must contain at most 500 character(s)"),
  imageURLPreview: z
    .string()
    .min(3, "Image URL must contain at least 3 character(s)")
    .max(200, "Image URL must contain at most 200 character(s)"),
});
