import createSchemaFieldRule from "./createSchemaFieldRule";
import { NameSchema, NestedRefinedSchema } from "../fixtures";
import { FormInstance } from "../types";

const mockFormInstance = (values: {}): FormInstance => ({
  getFieldsValue: () => values,
});

const mockFormFieldRule = (field: string) => ({ field });

describe("createSchemaFieldValidator", () => {
  it("should validate successfully NameSchema values", async () => {
    const rule = createSchemaFieldRule(NameSchema);
    const formInstance = mockFormInstance({ name: "Test" });
    const fieldRule = mockFormFieldRule("name");

    await expect(rule(formInstance).validator(fieldRule)).resolves.toEqual(
      undefined,
    );
  });
  it("should reject invalid NameSchema values", async () => {
    const rule = createSchemaFieldRule(NameSchema);
    const formInstance = mockFormInstance({});
    const fieldRule = mockFormFieldRule("name");

    await expect(rule(formInstance).validator(fieldRule)).rejects.toEqual(
      "Required",
    );
  });
  it("should validate successfully NestedRefinedSchema values", async () => {
    const rule = createSchemaFieldRule(NestedRefinedSchema);
    const formInstance = mockFormInstance({ user: { name: "Luka" } });
    const fieldRule = mockFormFieldRule("name");

    await expect(rule(formInstance).validator(fieldRule)).resolves.toEqual(
      undefined,
    );
  });
  it("should reject undefined NestedRefinedSchema values", async () => {
    const rule = createSchemaFieldRule(NestedRefinedSchema);
    const formInstance = mockFormInstance({});
    const fieldRule = mockFormFieldRule("user.name");

    await expect(rule(formInstance).validator(fieldRule)).rejects.toEqual(
      "Required",
    );
  });
  it("should reject invalid NestedRefinedSchema values", async () => {
    const rule = createSchemaFieldRule(NestedRefinedSchema);
    const formInstance = mockFormInstance({ user: { name: "test" } });
    const fieldRule = mockFormFieldRule("user.name");

    await expect(rule(formInstance).validator(fieldRule)).rejects.toEqual(
      "Must be Luka",
    );
  });
});
