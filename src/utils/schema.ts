import {
  $ZodShape,
  $ZodArray,
  $ZodOptional,
  $ZodObject,
  $ZodNullable,
} from "@zod/core";
import { AntdFormZodSchema } from "../types";
import { $ZodType } from "@zod/core";

export const isZodOptional = (schema: $ZodType): schema is $ZodOptional =>
  schema._zod.def.type === "optional";

export const isZodNullable = (schema: $ZodType): schema is $ZodNullable =>
  schema._zod.def.type === "nullable";

export const isZodObject = (schema: $ZodType): schema is $ZodObject =>
  schema._zod.def.type === "object";

export const isZodArray = (schema: $ZodType): schema is $ZodArray =>
  schema._zod.def.type === "array";

export const getZodSchemaShape = <T extends $ZodShape>(
  schema: AntdFormZodSchema<T>,
): T => schema._zod.def.shape;
