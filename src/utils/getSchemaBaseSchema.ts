import { isZodNullable, isZodOptional } from "./schema";
import { $ZodType } from "@zod/core";

const getSchemaBaseSchema = <T extends $ZodType>(schema: $ZodType): T => {
  if (isZodOptional(schema)) {
    return getSchemaBaseSchema(schema._zod.def.innerType);
  } else if (isZodNullable(schema)) {
    return getSchemaBaseSchema(schema._zod.def.innerType);
  }

  return schema as T;
};

export default getSchemaBaseSchema;
