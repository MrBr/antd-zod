import merge from "lodash.merge";
import getNestedPlaceholders from "./getNestedPlaceholders";
import { $ZodShape } from "zod/v4/core";
import { AntdFormZodSchema } from "../types";

// Antd expects single field validation and Zod invalidates missing object fields (as whole).
// Placeholders help get individual field validation on required object fields.
const prepareValues = <T extends $ZodShape>(
  schema: AntdFormZodSchema<T>,
  values: {},
) => merge({}, getNestedPlaceholders(schema, values), values);

export default prepareValues;
