import { AntdFormZodSchema, ValidateFieldsOptions } from "../types";
import { ZodRawShape } from "zod";
import prepareValues from "./prepareValues";
import formatErrors from "./formatErrors";

const validateFields = async <T extends ZodRawShape>(
  schema: AntdFormZodSchema<T>,
  values: {},
  options: ValidateFieldsOptions,
): Promise<{ [key: string]: string }> => {
  const valuesWithPlaceholders = prepareValues(schema, values);

  const res = await schema.safeParseAsync(valuesWithPlaceholders);

  if (res.success) {
    return {} as Record<keyof T, string>;
  }

  return formatErrors(schema, res.error, options);
};

export default validateFields;
