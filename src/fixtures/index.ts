import z, { ZodEffects, ZodObject } from "zod";

const UserSchema = z.object({
  name: z.string().refine((val) => val === "Luka", {
    message: "Must be Luka",
  }),
});

export const NameSchema = z
  .object({
    name: z.string(),
  })
  .required();

export const REFINED_NAME_SCHEMA_VALUE = "refined name";
export const REFINED_NAME_SCHEMA_ERROR = `String must equal ${REFINED_NAME_SCHEMA_VALUE}`;
export const NameRefinedSchema = z
  .object({
    name: z.string().refine((val) => val === REFINED_NAME_SCHEMA_VALUE, {
      message: REFINED_NAME_SCHEMA_ERROR,
    }),
  })
  .required();

export const NestedRefinedSchema = z.object({
  user: UserSchema,
});

export const ArrayNumberFieldSchema = z.object({
  numbers: z.array(z.number()),
});

export const ArrayUserFieldSchema = z.object({
  users: z.array(UserSchema),
});

export const RefinedUserFieldSchema = z
  .object({
    users: z.array(UserSchema),
  })
  .required()
  // .optional()
  .refine(() => true);
