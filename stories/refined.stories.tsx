import React from "react";
import { Form, Input, Button } from "antd";
import * as z from "@zod/mini";
import { createSchemaFieldRule } from "../src";

const PasswordSchema = z
  .object({
    password: z.string(),
    passwordCopy: z.string(),
  })
  .check(
    z.refine(({ password, passwordCopy }) => password === passwordCopy, {
      error: "Passwords must match",
      // NOTE THE PATH!
      path: ["passwordCopy"],
    }),
    z.refine(({ password }) => password.length >= 3, {
      error: "Password must have at least 3 characters",
      // NOTE THE PATH!
      path: ["password"],
    }),
  );

const rule = createSchemaFieldRule(PasswordSchema);

const RefinedForm = () => {
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
  component: RefinedForm,
  title: "Antd Zod Validation",
};

export const Refined = {
  args: {},
};
