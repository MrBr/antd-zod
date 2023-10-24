import { ZodObject, ZodRawShape } from "zod";
import { AntdFormZodSchema } from "../types";
import { getZodSchemaShape, isZodOptional } from "./schema";
import getSchemaBaseSchema from "./getSchemaBaseSchema";

const getNestedPlaceholders = <T extends ZodRawShape>(
  schema: AntdFormZodSchema<T>,
  values: Record<string, any> = {},
): {} => {
  const baseSchema = getZodSchemaShape(schema);
  return Object.entries(baseSchema).reduce((res, [key, field]) => {
    if (isZodOptional(field) && values[key] === undefined) {
      // Ignore optional fields when empty regardless of the base type
      return res;
    }

    const fieldSchema = getSchemaBaseSchema(field);
    if (fieldSchema instanceof ZodObject) {
      return {
        ...res,
        [key]: getNestedPlaceholders(fieldSchema, values[key]),
      };
    }

    return res;
  }, {});
};

export default getNestedPlaceholders;
