import {
  ArrayUserFieldSchema,
  NameSchema,
  NestedRefinedSchema,
} from "../fixtures";
import getIssueAntdPath from "./getIssueAntdPath";
import prepareValues from "./prepareValues";

describe("getIssueAntdPath", () => {
  it("should return name path", async () => {
    const res = await NameSchema.safeParseAsync({});

    if (res.success) {
      return;
    }

    const path = getIssueAntdPath(NameSchema, res.error.issues[0]);

    expect(path).toEqual("name");
  });
  it("should return user.name path", async () => {
    const res = await NestedRefinedSchema.safeParseAsync(
      prepareValues(NestedRefinedSchema, {}),
    );

    if (res.success) {
      return;
    }

    const path = getIssueAntdPath(NestedRefinedSchema, res.error.issues[0]);

    expect(path).toEqual("user.name");
  });
  it("should return users path when missing", async () => {
    const res = await ArrayUserFieldSchema.safeParseAsync(
      prepareValues(ArrayUserFieldSchema, {}),
    );

    if (res.success) {
      return;
    }

    const path = getIssueAntdPath(ArrayUserFieldSchema, res.error.issues[0]);

    expect(path).toEqual("users");
  });
  it("should return users path when containing an invalid value", async () => {
    const res = await ArrayUserFieldSchema.safeParseAsync(
      prepareValues(ArrayUserFieldSchema, { users: [1] }),
    );

    if (res.success) {
      return;
    }

    const path = getIssueAntdPath(ArrayUserFieldSchema, res.error.issues[0]);

    expect(path).toEqual("users");
  });
  it("should throw error when invalid issue", async () => {
    expect(() =>
      getIssueAntdPath(ArrayUserFieldSchema, undefined as any),
    ).toThrow();
    expect(() =>
      getIssueAntdPath(ArrayUserFieldSchema, { path: [] } as any),
    ).toThrow();
  });
});
