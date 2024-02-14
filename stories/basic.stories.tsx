import React from "react";
import { Form, Input, Button, InputNumber, Select } from "antd";
import z from "zod";
import { createSchemaFieldRule } from "../src";

const VALUES = ["Male", "Female"] as const;
const Genders = z.enum(VALUES);

const Cities = z.enum(["New York", "Peking", "Paris", "London"]);

const ArraySchema = z.object({
  name: z
    .string({
      invalid_type_error: "error con el tipo",
      required_error: "error de requerido",
    })
    .min(1),
  testArrayNested: z
    .object({
      name: z
        .string({
          invalid_type_error: "error con el tipo",
          required_error: "error de requerido",
        })
        .min(2),
    })
    .array(),
});

const BasicSchema = z.object({
  name: z.string().refine((value) => value.length > 2, {
    message: "Must have more than 2 chars",
  }),
  height: z.number(),
  gender: Genders.optional(),
  address: z.object({
    city: Cities,
  }),
  testArray: ArraySchema.array(),
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
      <Form.List name="testArray">
        {(fields, { add }) => {
          return (
            <div>
              {fields.map((field) => (
                <>
                  <Form.Item
                    label="Name"
                    initialValue={""}
                    name={[field.name, "name"]}
                    rules={[rule]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <Form.List name={[field.name, "testArrayNested"]}>
                      {(fields, { add }) => {
                        return (
                          <div>
                            {fields.map((field2) => (
                              <Form.Item
                                label="Name2"
                                initialValue={""}
                                name={[field2.name, "name"]}
                                rules={[rule]}
                              >
                                <Input />
                              </Form.Item>
                            ))}
                            <button onClick={() => add()}>add2</button>
                          </div>
                        );
                      }}
                    </Form.List>
                  </Form.Item>
                </>
              ))}
              <button onClick={() => add()}>add</button>
            </div>
          );
        }}
      </Form.List>
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
