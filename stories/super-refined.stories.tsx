import React from "react";
import { Form, Input, Button } from "antd";
import * as z from "zod/v4-mini";
import { createSchemaFieldRule } from "../src";

const PasswordSchema = z
  .object({
    password: z.string(),
    passwordCopy: z.string(),
  })
  .check((ctx) => {
    if (ctx.value.password.length < 2) {
      ctx.issues.push({
        input: ctx.value,
        path: ["password"],
        maximum: 3,
        type: "array",
        inclusive: true,
        message: "Too many items 😡",
        code: "custom",
      });
    }
  });

const rule = createSchemaFieldRule(PasswordSchema);

const SuperRefinedForm = () => {
  return (
    <Form>
      <Form.Item label="Password" name="password" rules={[rule]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Repeat password"
        name="passwordCopy"
        dependencies={["password"]}
        rules={[rule]}
      >
        <Input />
      </Form.Item>
      <Button htmlType="submit">Submit</Button>
    </Form>
  );
};

export default {
  component: SuperRefinedForm,
  title: "Antd Zod Validation",
};

export const SuperRefined = {
  args: {},
};
