import React from "react";
import { Form, Input, Button } from "antd";
import z from "zod";
import { createSchemaFieldRule } from "../src";

const PasswordSchema = z
  .object({
    password: z.string(),
    passwordCopy: z.string(),
  })
  .refine(({ password, passwordCopy }) => password === passwordCopy, {
    message: "Passwords must match",
    // NOTE THE PATH!
    path: ["passwordCopy"],
  })
  .refine(({ password }) => password.length > 3, {
    message: "Password must have at least 3 characters",
    // NOTE THE PATH!
    path: ["password"],
  });

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
