import merge from "lodash.merge";
import getNestedPlaceholders from "./getNestedPlaceholders";
import { ZodRawShape } from "zod";
import { AntdFormZodSchema } from "../types";

// Antd expects single field validation and Zod invalidates missing object fields (as whole).
// Placeholders help get individual field validation on required object fields.
const prepareValues = <T extends ZodRawShape>(
  schema: AntdFormZodSchema<T>,
  values: {},
) => merge({}, getNestedPlaceholders(schema, values), values);

export default prepareValues;
