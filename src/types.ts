import z, { ZodRawShape } from "zod";

export type AntdFormZodSchema<T extends ZodRawShape> =
  | z.ZodObject<T>
  | z.ZodEffects<z.ZodObject<T>>
  | z.ZodEffects<z.ZodEffects<z.ZodObject<T>>>
  | z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodObject<T>>>>;

export type CreateSchemaFieldRuleOptions = {aggregateErrorMessages: (prev: string, next: string) => string};
export type FormatErrorsOptions = {aggregateErrorMessages: (prev: string, next: string) => string};
export type ValidateFieldsOptions = {aggregateErrorMessages: (prev: string, next: string) => string};

