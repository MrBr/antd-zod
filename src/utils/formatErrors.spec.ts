import z, { ZodError, ZodIssue } from "zod";
import formatErrors from "./formatErrors";
import prepareValues from "./prepareValues";

const schema = z.object({ field: z.string() });

describe("formatErrors", () => {
  it("should return empty errors", async () => {
    const schema = z.object({
      prop: z.string().optional(),
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

    expect(formattedErrors).toEqual({ prop: ["Required"] });
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

    expect(formattedErrors).toEqual({ "prop.child": ["Required"] });
  });
  it("should return multiple errors", async () => {
    const multipleErrorSchema = z.object({
      email: z.string().email().min(5).max(15).includes(".com"),
    });

    const res = await multipleErrorSchema.safeParseAsync(
      prepareValues(multipleErrorSchema, { email: "t" }),
    );
    if (res.success) {
      return;
    }
    const formattedErrors = formatErrors<{}>(schema, res.error);
    expect(formattedErrors).toEqual({
      email: [
        "Invalid email",
        "String must contain at least 5 character(s)",
        'Invalid input: must include ".com"',
      ],
    });
  });
});
