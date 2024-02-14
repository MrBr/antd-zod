import z, { ZodRawShape } from "zod";
import { AntdFormZodSchema } from "../types";

export const isZodEffect = (schema: unknown): schema is z.ZodEffects<any> =>
  typeof schema === "object" &&
  !!schema &&
  !("shape" in schema) &&
  "_def" in schema &&
  typeof schema._def === "object" &&
  !!schema._def &&
  "schema" in schema._def;

export const isZodOptional = (schema: unknown): schema is z.ZodOptional<any> =>
  typeof schema === "object" && !!schema && "unwrap" in schema;

export const isZodObject = (schema: unknown): schema is z.ZodObject<any> =>
  typeof schema === "object" && !!schema && "shape" in schema;

export const isZodArray = (schema: unknown): schema is z.ZodArray<any> =>
  schema instanceof z.ZodArray;

export const getZodSchemaShape = <T extends ZodRawShape>(
  schema: AntdFormZodSchema<T>
) => (isZodEffect(schema) ? schema._def.schema.shape : schema.shape);
