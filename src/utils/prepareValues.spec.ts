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
});
