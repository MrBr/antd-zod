import { $ZodObject, $ZodShape } from "@zod/core";

export type AntdFormZodSchema<T extends $ZodShape> = $ZodObject<T>;
