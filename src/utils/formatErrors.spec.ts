import z, { ZodError, ZodIssue } from "zod";
import formatErrors from "./formatErrors";
import prepareValues from "./prepareValues";

const fakeIssues: ZodIssue[] = [
  { code: "custom", message: "Error one", path: ["field"] },
  { code: "custom", message: "Error two", path: ["field"] },
];

const fakeZodError = new ZodError(fakeIssues);

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
  it("should return multiple errors", () => {
    const formattedErrors = formatErrors(schema, fakeZodError);
    console.log(formattedErrors)
    expect(formattedErrors).toEqual({ field: ["Error one", "Error two"] });
  });
});
