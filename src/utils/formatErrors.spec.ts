import formatErrors from "./formatErrors";
import prepareValues from "./prepareValues";
import { z } from "zod/v4";

describe("formatErrors", () => {
  it("should return empty errors", async () => {
    const schema = z.object({
      prop: z.optional(z.string()),
    });

    const res = await schema.safeParseAsync({});
    if (res.success) {
      return;
    }
    const formattedErrors = formatErrors<{}>(schema, res.error);

    expect(formattedErrors).toEqual({});
  });
  it("should format prop error", async () => {
    const schema = z.object({
      prop: z.string(),
    });

    const res = await schema.safeParseAsync({});
    if (res.success) {
      return;
    }
    const formattedErrors = formatErrors<{}>(schema, res.error);

    expect(formattedErrors).toEqual({
      prop: ["Invalid input: expected string, received undefined"],
    });
  });
  it("should format nested prop.child error", async () => {
    const schema = z.object({
      prop: z.object({
        child: z.string(),
      }),
    });

    const res = await schema.safeParseAsync(prepareValues(schema, {}));
    if (res.success) {
      return;
    }
    const formattedErrors = formatErrors<{}>(schema, res.error);

    expect(formattedErrors).toEqual({
      "prop.child": ["Invalid input: expected string, received undefined"],
    });
  });
  it("should return multiple errors", async () => {
    const multipleErrorSchema = z.object({
      email: z
        .string()
        .check(
          z.email("Invalid email"),
          z.minLength(5, "String must contain at least 5 character(s)"),
          z.maxLength(15),
          z.includes(".com", 'Invalid input: must include ".com"'),
        ),
    });

    const res = await multipleErrorSchema.safeParseAsync(
      prepareValues(multipleErrorSchema, { email: "t" }),
    );
    if (res.success) {
      return;
    }
    const formattedErrors = formatErrors<{}>(multipleErrorSchema, res.error);
    expect(formattedErrors).toEqual({
      email: [
        "Invalid email",
        "String must contain at least 5 character(s)",
        'Invalid input: must include ".com"',
      ],
    });
  });
});
