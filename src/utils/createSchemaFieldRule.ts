import { ZodRawShape } from "zod";
import { RuleRender } from "rc-field-form/lib/interface";
import { AntdFormZodSchema } from "../types";
import validateFields from "./validateFields";
import prepareValues from "./prepareValues";

interface CreateSchemaFieldRuleOptions {
  ignorePrefix?: boolean;
}

const createSchemaFieldRule =
  <T extends ZodRawShape>(schema: AntdFormZodSchema<T>, options: CreateSchemaFieldRuleOptions = {}): RuleRender =>
    ({ getFieldsValue }) => ({
      validator: (rule) =>
        new Promise(async (resolve, reject) => {
          // AsyncValidator adds field - rc-field-form type isn't correct
          // https://github.com/search?q=repo%3Ayiminghe%2Fasync-validator%20fullField&type=code
          let { field } = rule as { field: string };
          if (options.ignorePrefix) {
            const indexOf = field.indexOf(".");
            if (indexOf !== -1) {
              field = field.slice(indexOf + 1);
            }
          }
          const values = getFieldsValue();
          const errors = await validateFields<T>(
            schema,
            prepareValues(schema, values),
          );

          if (!!errors && errors[field]) {
            reject(errors[field]);
            return;
          }

          resolve(undefined);
        }),
    });

export default createSchemaFieldRule;
