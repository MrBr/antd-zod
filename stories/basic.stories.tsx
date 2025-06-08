import React from "react";
import { Form, Input, Button, InputNumber, Select, Col, Card } from "antd";
import * as z from "zod/v4-mini";
import { createSchemaFieldRule } from "../src";
import { CloseOutlined } from "@ant-design/icons";

const Genders = z.enum(["Male", "Female"]);

const Cities = z.enum(["New York", "Peking", "Paris", "London"]);

const Child = z.object({
  name: z
    .string({
      error: ({ input }) => {
        if (typeof input !== "string") {
          return "must be string";
        }
        if (input === undefined) {
          return "required";
        }
      },
    })
    .check(z.minLength(1)),
  toys: z
    .array(
      z.object({
        name: z
          .string({
            error: ({ input }) => {
              if (typeof input !== "string") {
                return "must be string";
              }
              if (input === undefined) {
                return "required";
              }
            },
          })
          .check(z.minLength(2, "Min 2 characters")),
      }),
    )
    .check(z.minLength(2)),
});

const BasicSchema = z.object({
  email: z
    .string()
    .check(z.email(), z.minLength(5), z.maxLength(15), z.includes(".com")),
  name: z.string().check(
    z.refine((value) => value.length > 2, {
      message: "Must have more than 2 chars",
    }),
  ),
  height: z.number(),
  gender: z.optional(Genders),
  address: z.object({
    city: Cities,
  }),
  children: z.array(Child).check(z.minLength(2)),
});

const rule = createSchemaFieldRule(BasicSchema);

const BasicForm = () => {
  return (
    <Form>
      <Form.Item label="Enter email" name="email" rules={[rule]}>
        <Input />
      </Form.Item>
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

      <Form.Item name="children" rules={[rule]}>
        <Form.List name="children">
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
                              <Button onClick={() => addNested()}>
                                Add Toy
                              </Button>
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
