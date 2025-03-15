import z, { ZodError, ZodIssue } from "zod";
import formatErrors from "./formatErrors";
import prepareValues from "./prepareValues";

const defaultOptions = {
  aggregateErrorMessages: (prev: string, next: string) => `${prev}, ${next}`,
};

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
    const formattedErrors = formatErrors<{}>(schema, res.error, defaultOptions);

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
    const formattedErrors = formatErrors<{}>(schema, res.error, defaultOptions);

    expect(formattedErrors).toEqual({ prop: "Required" });
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
    const formattedErrors = formatErrors<{}>(schema, res.error, defaultOptions);

    expect(formattedErrors).toEqual({ "prop.child": "Required" });
  });
  it("should return only the first error when aggregator returns previous error", () => {
    const options = {
      aggregateErrorMessages: (prev: string, next: string) => prev, // return only the first error
    };
    const formattedErrors = formatErrors(schema, fakeZodError, options);
    expect(formattedErrors).toEqual({ field: "Error one" });
  });

  it("should join multiple errors with a comma when aggregator is used", () => {
    const options = {
      aggregateErrorMessages: (prev: string, next: string) => `${prev}, ${next}`, // join errors with a comma
    };
    const formattedErrors = formatErrors(schema, fakeZodError, options);
    expect(formattedErrors).toEqual({ field: "Error one, Error two" });
  });
});
