import {
  ArrayNumberFieldSchema,
  ArrayUserFieldSchema,
  NameSchema,
  NestedRefinedSchema,
} from "../fixtures";
import validateFields from "./validateFields";

const defaultOptions = {
  aggregateErrorMessages: (prev: string, next: string) => `${prev}, ${next}`,
};

describe("validateFields", () => {
  it("should return without errors", async () => {
    expect(await validateFields(NameSchema, { name: "Test" }, defaultOptions)).toEqual({});
  });
  it("should return errors", async () => {
    expect(await validateFields(NameSchema, {}, defaultOptions)).toEqual({
      name: "Required",
    });
  });
  it("should return errors for nested schemas", async () => {
    expect(await validateFields(NestedRefinedSchema, {}, defaultOptions)).toEqual({
      "user.name": "Required",
    });
  });
  it("should return errors for primitive array field", async () => {
    expect(await validateFields(ArrayNumberFieldSchema, {}, defaultOptions)).toEqual({
      numbers: "Required",
    });
  });
  it("should return errors for object array field", async () => {
    expect(
      await validateFields(ArrayUserFieldSchema, { users: "invalid value" }, defaultOptions),
    ).toEqual({
      users: "Expected array, received string",
    });
  });

  it("should return errors for object array field items", async () => {
    expect(await validateFields(ArrayUserFieldSchema, { users: [1] }, defaultOptions)).toEqual({
      "users.0": "Expected object, received number",
    });

    expect(
      await validateFields(ArrayUserFieldSchema, { users: [{ name: 10 }] }, defaultOptions),
    ).toEqual({
      "users.0.name": "Expected string, received number",
    });
  });
});
