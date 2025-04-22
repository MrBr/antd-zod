import {
  ArrayNumberFieldSchema,
  ArrayUserFieldSchema,
  NameSchema,
  NestedRefinedSchema,
} from "../fixtures";
import validateFields from "./validateFields";

describe("validateFields", () => {
  it("should returns without errors", async () => {
    expect(await validateFields(NameSchema, { name: "Test" })).toEqual({});
  });
  it("should return errors", async () => {
    expect(await validateFields(NameSchema, {})).toEqual({
      name: ["Required field name"],
    });
  });
  it("should return errors for nested schemas", async () => {
    expect(await validateFields(NestedRefinedSchema, {})).toEqual({
      "user.name": ["Invalid input"],
    });
  });
  it("should return errors for primitive array field", async () => {
    expect(await validateFields(ArrayNumberFieldSchema, {})).toEqual({
      numbers: ["Invalid input"],
    });
  });
  it("should return errors for object array field", async () => {
    expect(
      await validateFields(ArrayUserFieldSchema, { users: "invalid value" }),
    ).toEqual({
      users: ["Expected array, received string"],
    });
  });

  it("should return errors for object array field items", async () => {
    expect(await validateFields(ArrayUserFieldSchema, { users: [1] })).toEqual({
      "users.0": ["Invalid input"],
    });

    expect(
      await validateFields(ArrayUserFieldSchema, { users: [{ name: 10 }] }),
    ).toEqual({
      "users.0.name": ["Expected string, received number"],
    });
  });
});
