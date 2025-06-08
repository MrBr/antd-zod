import { $ZodObject, $ZodShape } from "zod/v4/core";

export type AntdFormZodSchema<T extends $ZodShape> = $ZodObject<T>;
