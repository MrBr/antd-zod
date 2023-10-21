import { NameSchema, NestedRefinedSchema } from "../fixtures";
import getNestedPlaceholders from "./getNestedPlaceholders";
import z from "zod";
import prepareValues from "./prepareValues";

const NestedOptionalSchema = z.object({
  nestedObject: z
    .object({
      childObject: z.object({
        prop: z.string(),
      }),
    })
    .optional(),
});

describe("getNestedPlaceholders", () => {
  it("should return empty placeholders", async () => {
    const placeholders = getNestedPlaceholders(NameSchema, {});
    expect(placeholders).toEqual({});
  });
  it("should return user placeholder", async () => {
    const placeholders = getNestedPlaceholders(NestedRefinedSchema, {});
    expect(placeholders).toEqual({
      user: {},
    });
  });

  it("should return nestedObject user placeholder", async () => {
    const NestedObjectSchema = z.object({
      nestedObject: NestedRefinedSchema,
    });
    const placeholders = getNestedPlaceholders(NestedObjectSchema, {});
    expect(placeholders).toEqual({
      nestedObject: {
        user: {},
      },
    });
  });
  it("should not add optional prop placeholder", async () => {
    const placeholders = getNestedPlaceholders(NestedOptionalSchema, {});
    expect(placeholders).toEqual({});
  });
  it("should add optional prop children placeholder when existing", async () => {
    const placeholders = getNestedPlaceholders(NestedOptionalSchema, {
      nestedObject: {},
    });
    expect(placeholders).toEqual({
      nestedObject: {
        childObject: {},
      },
    });
  });
});
