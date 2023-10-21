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
      name: "Required",
    });
  });
  it("should return errors for nested schemas", async () => {
    expect(await validateFields(NestedRefinedSchema, {})).toEqual({
      "user.name": "Required",
    });
  });
  it("should return errors for primitive array field", async () => {
    expect(await validateFields(ArrayNumberFieldSchema, {})).toEqual({
      numbers: "Required",
    });
  });
  it("should return errors for object array field", async () => {
    expect(await validateFields(ArrayUserFieldSchema, { users: [1] })).toEqual({
      users: "Expected object, received number",
    });
  });
});
