import { AntdFormZodSchema } from "../types";
import { $ZodShape } from "zod/v4/core";
import prepareValues from "./prepareValues";
import formatErrors from "./formatErrors";

const validateFields = async <T extends $ZodShape>(
  schema: AntdFormZodSchema<T>,
  values: {},
): Promise<{ [key: string]: string[] }> => {
  const valuesWithPlaceholders = prepareValues(schema, values);

  // @ts-ignore
  const res = await schema.safeParseAsync(valuesWithPlaceholders);

  if (res.success) {
    return {} as Record<keyof T, string[]>;
  }

  return formatErrors(schema, res.error);
};

export default validateFields;
