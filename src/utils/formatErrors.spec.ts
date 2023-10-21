import z from "zod";
import formatErrors from "./formatErrors";
import prepareValues from "./prepareValues";

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
    const formattedErrors = formatErrors<{}>(schema, res.error);

    expect(formattedErrors).toEqual({ "prop.child": "Required" });
  });
});
