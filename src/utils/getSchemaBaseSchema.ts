import { ZodTypeAny } from "zod";
import { isZodOptional, isZodEffect } from "./schema";

const getSchemaBaseSchema = <T extends ZodTypeAny>(schema: ZodTypeAny): T => {
  if (isZodEffect(schema)) {
    return getSchemaBaseSchema(schema._def.schema);
  } else if (isZodOptional(schema)) {
    return getSchemaBaseSchema(schema._def.innerType);
  }

  return schema as T;
};

export default getSchemaBaseSchema;
