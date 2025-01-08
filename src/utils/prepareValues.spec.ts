import prepareValues from "./prepareValues";
import z from "zod";

const PrimitiveSchema = z.object({});
const NestedSchema = z.object({
  nestedObject: z.object({
    childObject: z.object({
      prop: z.string(),
    }),
  }),
});
const OptionalSchema = z.object({
  optionalObject: z.object({}).optional(),
});
const NestedRefinementSchema = z
  .object({
    optionalObject: z.object({}).optional(),
  })
  .refine(() => true)
  .refine(() => true);

describe("prepareValues", () => {
  it("should return empty values", async () => {
    const placeholders = prepareValues(PrimitiveSchema, {});
    expect(placeholders).toEqual({});
  });
  it("should return values", async () => {
    const values = { test: 1 };
    const placeholders = prepareValues(PrimitiveSchema, values);
    expect(placeholders).toEqual(values);
  });
  it("should return empty values with placeholders", async () => {
    const placeholders = prepareValues(NestedSchema, {});
    expect(placeholders).toEqual({
      nestedObject: {
        childObject: {},
      },
    });
  });
  it("should return values with placeholders", async () => {
    const placeholders = prepareValues(NestedSchema, {
      test: 1,
    });
    expect(placeholders).toEqual({
      test: 1,
      nestedObject: {
        childObject: {},
      },
    });
  });
  it("should return nested values with placeholders", async () => {
    const placeholders = prepareValues(NestedSchema, {
      test: 1,
      nestedObject: {
        childObject: {
          prop: "test",
        },
      },
    });
    expect(placeholders).toEqual({
      test: 1,
      nestedObject: {
        childObject: {
          prop: "test",
        },
      },
    });
  });
  it("should omit optional field", () => {
    const placeholders = prepareValues(OptionalSchema, {
      optionalObject: undefined,
    });
    expect(placeholders).toEqual({});
  });
  it("should include optional field", () => {
    const placeholders = prepareValues(OptionalSchema, {
      optionalObject: {},
    });
    expect(placeholders).toEqual({
      optionalObject: {},
    });
  });
  it("should include optional field in refined schema", () => {
    const placeholders = prepareValues(NestedRefinementSchema, {
      optionalObject: {},
    });
    expect(placeholders).toEqual({
      optionalObject: {},
    });
  });
});
