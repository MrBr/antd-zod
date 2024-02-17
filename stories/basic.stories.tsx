import React from "react";
import { Form, Input, Button, InputNumber, Select, Col, Card } from "antd";
import z from "zod";
import { createSchemaFieldRule } from "../src";
import { ValidatorRule } from "rc-field-form/lib/interface";
import { CloseOutlined } from "@ant-design/icons";

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
        {(childrenFields, { add, remove }, { errors }) => {
          return (
            <div>
              {childrenFields.map((child) => (
                <Card
                  size="small"
                  title={`Item ${child.name + 1}`}
                  key={child.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(child.name);
                      }}
                    />
                  }
                >
                  <Form.Item
                    label="Child"
                    initialValue={""}
                    name={[child.name, "name"]}
                    rules={[rule]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <Form.List name={[child.name, "toys"]}>
                      {(
                        toyFields,
                        { add: addNested, remove: removeNested },
                      ) => {
                        return (
                          <>
                            {toyFields.map((toy) => (
                              <Col offset={1} key={toy.key}>
                                <Form.Item
                                  label="Toy"
                                  initialValue={""}
                                  name={[toy.name, "name"]}
                                  rules={[rule]}
                                >
                                  <Input
                                    suffix={
                                      <CloseOutlined
                                        onClick={() => {
                                          removeNested(toy.name);
                                        }}
                                      />
                                    }
                                  />
                                </Form.Item>
                              </Col>
                            ))}
                            <Button onClick={() => addNested()}>Add Toy</Button>
                          </>
                        );
                      }}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}
              <div style={{ padding: "10px 0 20px" }}>
                <Button onClick={() => add()}>Add Child</Button>
              </div>
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
