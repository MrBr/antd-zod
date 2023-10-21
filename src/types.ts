import z, { ZodRawShape } from "zod";
import { ZodFormattedError } from "zod/lib/ZodError";

export type AntdFormZodSchema<T extends ZodRawShape> =
  | z.ZodObject<T>
  | z.ZodEffects<z.ZodObject<T>>;

export interface FormInstance {
  getFieldsValue: () => any;
}

export type ValidationErrors<T extends ZodRawShape> = Record<
  string,
  ZodFormattedError<T>
>;

export interface FormField {
  name: string;
  rules: [
    {
      validator: (
        formInstance: FormInstance,
      ) => (...args: any[]) => Promise<void>;
    },
  ];
}

export interface FormFieldStatus {
  name: string | number;
  errors: string[];
}
