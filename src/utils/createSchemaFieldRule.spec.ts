import createSchemaFieldRule from "./createSchemaFieldRule";
import { FormInstance } from "antd";
import { RuleObject } from "rc-field-form/lib/interface";

import { NameSchema, NestedRefinedSchema } from "../fixtures";

const mockFormInstance = (values: {}) =>
  ({
    getFieldsValue: () => values,
  }) as FormInstance;

const mockFormFieldRule = (field: string) => ({ field }) as RuleObject;

describe("createSchemaFieldValidator", () => {
  it("should validate successfully NameSchema values", async () => {
    const rule = createSchemaFieldRule(NameSchema);
    const formInstance = mockFormInstance({ name: "Test" });
    const fieldRule = mockFormFieldRule("name");

    await expect(
      rule(formInstance).validator?.(fieldRule, {}, () => {}),
    ).resolves.toEqual(undefined);
  });
  it("should reject invalid NameSchema values", async () => {
    const rule = createSchemaFieldRule(NameSchema);
    const formInstance = mockFormInstance({});
    const fieldRule = mockFormFieldRule("name");

    await expect(
      rule(formInstance).validator?.(fieldRule, {}, () => {}),
    ).rejects.toEqual("Required");
  });
  it("should validate successfully NestedRefinedSchema values", async () => {
    const rule = createSchemaFieldRule(NestedRefinedSchema);
    const formInstance = mockFormInstance({ user: { name: "Luka" } });
    const fieldRule = mockFormFieldRule("name");

    await expect(
      rule(formInstance).validator?.(fieldRule, {}, () => {}),
    ).resolves.toEqual(undefined);
  });
  it("should reject undefined NestedRefinedSchema values", async () => {
    const rule = createSchemaFieldRule(NestedRefinedSchema);
    const formInstance = mockFormInstance({});
    const fieldRule = mockFormFieldRule("user.name");

    await expect(
      rule(formInstance).validator?.(fieldRule, {}, () => {}),
    ).rejects.toEqual("Required");
  });
  it("should reject invalid NestedRefinedSchema values", async () => {
    const rule = createSchemaFieldRule(NestedRefinedSchema);
    const formInstance = mockFormInstance({ user: { name: "test" } });
    const fieldRule = mockFormFieldRule("user.name");

    await expect(
      rule(formInstance).validator?.(fieldRule, {}, () => {}),
    ).rejects.toEqual("Must be Luka");
  });
});
