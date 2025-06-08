import * as z from "zod/v4-mini";
import getSchemaBaseSchema from "./getSchemaBaseSchema";

describe("getSchemaBaseSchema", () => {
  it("should get string schema", () => {
    const stringSchema = z.string();
    const baseSchema = getSchemaBaseSchema(stringSchema);

    expect(baseSchema).toBe(stringSchema);
  });
  it("should get number schema", () => {
    const numberSchema = z.number();
    const baseSchema = getSchemaBaseSchema(numberSchema);

    expect(baseSchema).toBe(numberSchema);
  });
  it("should get array schema", () => {
    const arraySchema = z.array(z.string());
    const baseSchema = getSchemaBaseSchema(arraySchema);

    expect(baseSchema).toBe(arraySchema);
  });
  it("should get object base schema", () => {
    const objectBaseSchema = z.object({});
    const baseSchema = getSchemaBaseSchema(objectBaseSchema);

    expect(baseSchema).toBe(objectBaseSchema);
  });
  it("should get optional object base schema", () => {
    const objectBaseSchema = z.object({});
    const objectSchema = z.optional(objectBaseSchema);
    const baseSchema =
      getSchemaBaseSchema<typeof objectBaseSchema>(objectSchema);

    expect(baseSchema).toBe(objectBaseSchema);
  });
  it("should get required object schema", () => {
    const objectBaseSchema = z.object({
      nestedObject: z.string(),
    });
    const objectSchema = z.required(objectBaseSchema);
    const baseSchema =
      getSchemaBaseSchema<typeof objectBaseSchema>(objectSchema);

    // Required doesn't create new schema
    expect(baseSchema).toBe(objectSchema);
  });
  it("should get nullish object base schema", () => {
    const objectBaseSchema = z.object({});
    const objectSchema = z.nullish(objectBaseSchema);
    const baseSchema =
      getSchemaBaseSchema<typeof objectBaseSchema>(objectSchema);

    expect(baseSchema).toBe(objectBaseSchema);
  });
  it("should get nullable object base schema", () => {
    const objectBaseSchema = z.object({});
    const objectSchema = z.nullable(objectBaseSchema);
    const baseSchema =
      getSchemaBaseSchema<typeof objectBaseSchema>(objectSchema);

    expect(baseSchema).toBe(objectBaseSchema);
  });
  it("should get merged object base schema", () => {
    const objectBaseSchema = z.merge(z.object({}), z.object({}));
    const baseSchema =
      getSchemaBaseSchema<typeof objectBaseSchema>(objectBaseSchema);

    expect(baseSchema).toBe(objectBaseSchema);
  });
});
