import { AntdFormZodSchema } from "../types";
import { $ZodError, $ZodShape, safeParseAsync } from "zod/v4/core";
import prepareValues from "./prepareValues";
import formatErrors from "./formatErrors";

const validateFields = async <T extends $ZodShape>(
  schema: AntdFormZodSchema<T>,
  values: {},
): Promise<{ [key: string]: string[] }> => {
  const valuesWithPlaceholders = prepareValues(schema, values);

  const res = await safeParseAsync(schema, valuesWithPlaceholders);

  if (res.success) {
    return {} as Record<keyof T, string[]>;
  }

  return formatErrors(schema, res.error as $ZodError<T>);
};

export default validateFields;
