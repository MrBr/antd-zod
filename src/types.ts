import z, { ZodRawShape } from "zod";

export type AntdFormZodSchema<T extends ZodRawShape> =
  | z.ZodObject<T>
  | z.ZodEffects<z.ZodObject<T>>;
