import { date, z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be minimum 2 characters")
    .max(50, "Name must be maximum of 50 characters"),

  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
  phone: z
    .string()
    .regex(/^(98|97)\d{8}$/, "Phone must be valid nepali number")
    .optional(),
  role: z.enum(["user", "owner", "admin"]).optional(),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email address"),

  password: z
    .string({ required_error: "Password cant be empty" })
    .min(1, "Password is required"),
});

export const listingSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(5, "Title must be atleast 5 characters")
    .max(100, "Title must be under 100 characters"),

  description: z
    .string({ required_error: "Description is required" })
    .min(20, "Description must be at least 20 characters "),

  category: z
    .enum(["room", "vehicle", "service"], {
      errorMap: () => ({
        message: "Category must be room, vehicle or service",
      }),
    })
    .optional(),

  price: z
    .number({
      required_error: "Price must be included",
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be greater than 0"),

  price_unit: z.enum(["per_hour", "per_day", "per_month", "per_year"], {
    errorMap: () => ({
      message: "Price unit must be per_hour, per_day, per_month, per_year",
    }),
  }),
  city: z
    .string({ required_error: "City is required" })
    .min(2, "Enter a valid city"),
  area: z.string().optional(),
});

export const createBookingSchema = z
  .object({
    listing_id: z
      .string({ required_error: "Listing id is required" })
      .length(24, "Invalid listing id"),

    start_date: z
      .string({ required_error: "Start date is required" })
      .refine((val) => !isNaN(new Date(val).getTime()), "Invalid start date"),
    end_date: z
      .string({ required_error: "End date is required" })
      .refine((val) => !isNaN(new Date(val).getTime()), "Invalid start date"),

    message: z
      .string()
      .max(500, "Message cannot exceed 500 characters")
      .optional(),
  })
  .refine((date) => new Date(data.start_date) > new Date(data.end_date), {
    message: "End date must be after end date",
    path: ["end-date"],
  })
  .refine(
    (date) => new Date(data.start_date) >= new Date().setHours(0, 0, 0, 0),
    {
      message: "Start date cannot be in past",
      path: ["start-date"],
    },
  );

export const verificationSchema = z.object({
  full_name: z
    .string({ required_error: "Full name is required" })
    .min(2, "Please enter your fullname"),
  phone: z
    .string({ required_error: "Full name is required" })
    .regex(/^(98|97)\d{8}$/, "Phone must be a valid Nepal number (98XXXXXXXX)"),
  address: z
    .string({ required_error: "Address is required" })
    .min(5, "Please enter your full address"),

  citizenship_img: z
    .string({ required_error: "Citizenship image is required" })
    .url("Citizenship image must be a balid URL"),
});

export const createReviewSchema = z.object({
  rental_id: z
    .string({ required_error: "Rental id is required" })
    .length(24, "Invalid rental id"),

  rating: z
    .number({
      required_error: "Rating is required",
      invalid_type_error: "Rating must be a number",
    })
    .int("Rating must be a whole number")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be more than 5"),

  comment: z
    .string({ required_error: "Comment is required" })
    .min(10, "Comment must be at least 10 characters")
    .max(500, "Comment cannot exceed 500 characters"),
});

export const updateReviewSchema = z.object({
  rating: z
    .number({ invalid_type_error: "Rating must be a number" })
    .int("Rating must be a whole number")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be more than 5")
    .optional(),

  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(500, "Comment cannot exceed 500 characters")
    .optional(),
});
