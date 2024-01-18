import React from "react";
import { Form, Input, Button, InputNumber, Select } from "antd";
import z from "zod";
import { createSchemaFieldRule } from "../src";

const VALUES = ["Male", "Female"] as const;
const Genders = z.enum(VALUES);

const Cities = z.enum(["New York", "Peking", "Paris", "London"]);

const BasicSchema = z.object({
  name: z.string().refine((value) => value.length > 2, {
    message: "Must have more than 2 chars",
  }),
  height: z.number(),
  gender: Genders.optional(),
  address: z.object({
    city: Cities,
  }),
});

const rule = createSchemaFieldRule(BasicSchema);

const BasicForm = () => {
  return (
    <Form>
      <Form.Item label="Enter name" name="name" rules={[rule]}>
        <Input />
      </Form.Item>
      <Form.Item label="Enter height" name="height" rules={[rule]}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="Select gender" name="gender" rules={[rule]}>
        <Select
          options={[
            { value: "Male" },
            { value: "Female" },
            { value: "Invalid option" },
          ]}
        />
      </Form.Item>
      <Form.Item label="Select city" name={["address", "city"]} rules={[rule]}>
        <Select
          options={[
            { value: "New York" },
            { value: "Peking" },
            { value: "Paris" },
            { value: "London" },
            { value: "Invalid city" },
          ]}
        />
      </Form.Item>
      <Button htmlType="submit">Submit</Button>
    </Form>
  );
};

export default {
  component: BasicForm,
  title: "Antd Zod Validation",
};

export const Basic = {
  args: {},
};
