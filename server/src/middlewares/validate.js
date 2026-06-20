const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    // const errors = result.error.errors;
     console.log("Validation errors:", result.error.errors);
      const issues = result.error?.issues || result.error?.errors || [];
    const firstError = issues?.[0]?.message || "Validation failed";
    return res.status(400).json({ message: firstError });
  }

  req.body = result.data;
  next();
};

export default validate;