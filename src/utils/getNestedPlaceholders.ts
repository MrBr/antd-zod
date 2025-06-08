import { $ZodShape } from "zod/v4/core";
import { AntdFormZodSchema } from "../types";
import { getZodSchemaShape, isZodObject, isZodOptional } from "./schema";
import getSchemaBaseSchema from "./getSchemaBaseSchema";

const getNestedPlaceholders = <T extends $ZodShape>(
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
    if (isZodObject(fieldSchema)) {
      return {
        ...res,
        [key]: getNestedPlaceholders(fieldSchema, values[key]),
      };
    }

    return res;
  }, {});
};

export default getNestedPlaceholders;
