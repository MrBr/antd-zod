import React from "react";
import { Form, Input, Button, InputNumber } from "antd";
import z from "zod";
import { createSchemaFieldRule } from "../src";

const AggregateErrorsSchema = z.object({
  email: z.string().email().min(5).max(15).includes('.com'),
  age: z.number().lte(10).int().negative()
});

const rule = createSchemaFieldRule(AggregateErrorsSchema, {
  aggregateErrorMessages: (prev, next) => `${prev} | ${next}`
});

const AggregateErrorsForm = () => {
  return (
    <Form>
      <Form.Item label="Enter email" name="email" rules={[rule]}>
        <Input />
      </Form.Item>
      <Form.Item label="Enter age" name="age" rules={[rule]}>
        <InputNumber />
      </Form.Item>
     
      <Button htmlType="submit">Submit</Button>
    </Form>
  );
};

export default {
  component: AggregateErrorsForm,
  title: "Antd Zod Validation",
};

export const AggregateErrors = {
  args: {},
};
