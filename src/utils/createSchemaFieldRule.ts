import { ZodRawShape } from "zod";
import { RuleRender } from "rc-field-form/lib/interface";
import { AntdFormZodSchema, CreateSchemaFieldRuleOptions } from "../types";
import validateFields from "./validateFields";
import prepareValues from "./prepareValues";

const createSchemaFieldRule =
  <T extends ZodRawShape>(
    schema: AntdFormZodSchema<T>,
    options: CreateSchemaFieldRuleOptions,
  ): RuleRender =>
  ({ getFieldsValue }) => ({
    validator: (rule) =>
      new Promise(async (resolve, reject) => {
        // AsyncValidator adds field - rc-field-form type isn't correct
        // https://github.com/search?q=repo%3Ayiminghe%2Fasync-validator%20fullField&type=code
        const { field } = rule as { field: string };
        const values = getFieldsValue();
        const errors = await validateFields<T>(
          schema,
          prepareValues(schema, values),
          options,
        );

        if (!!errors && errors[field]) {
          reject(errors[field]);
          return;
        }

        resolve(undefined);
      }),
  });

export default createSchemaFieldRule;
