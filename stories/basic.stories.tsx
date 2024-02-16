import React from "react";
import { Form, Input, Button, InputNumber, Select } from "antd";
import z from "zod";
import { createSchemaFieldRule } from "../src";
import { ValidatorRule } from "rc-field-form/lib/interface";

const VALUES = ["Male", "Female"] as const;
const Genders = z.enum(VALUES);

const Cities = z.enum(["New York", "Peking", "Paris", "London"]);

const Child = z.object({
  name: z
    .string({
      invalid_type_error: "must be string",
      required_error: "required",
    })
    .min(1),
  toys: z
    .object({
      name: z
        .string({
          invalid_type_error: "must be string",
          required_error: "required",
        })
        .min(2),
    })
    .array()
    .min(2),
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
  children: Child.array().min(2),
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
      <Form.List name="children" rules={[rule as unknown as ValidatorRule]}>
        {(childrenFields, { add }, { errors }) => {
          return (
            <div>
              {childrenFields.map((field) => (
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
                    <Form.List name={[field.name, "toys"]}>
                      {(toyFields, { add: addNested }) => {
                        return (
                          <div>
                            {toyFields.map((toy) => (
                              <Form.Item
                                label="Name2"
                                initialValue={""}
                                name={[toy.name, "name"]}
                                rules={[rule]}
                              >
                                <Input />
                              </Form.Item>
                            ))}
                            <Button onClick={() => addNested()}>Add Toy</Button>
                          </div>
                        );
                      }}
                    </Form.List>
                  </Form.Item>
                </>
              ))}
              <Button onClick={() => add()}>add</Button>
              <Form.ErrorList errors={errors} />
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
