import * as z from "@zod/mini";

const UserSchema = z.object({
  name: z
    .string({
      error: ({ input }) =>
        typeof input === "number"
          ? "Expected string, received number"
          : "Invalid input",
    })
    .check(
      z.refine((val) => val === "Luka", {
        message: "Must be Luka",
      }),
    ),
});

export const NameSchema = z.required(
  z.object({
    name: z.string("Required field name"),
  }),
);

export const REFINED_NAME_SCHEMA_VALUE = "refined name";
export const REFINED_NAME_SCHEMA_ERROR = `String must equal ${REFINED_NAME_SCHEMA_VALUE}`;
export const NameRefinedSchema = z.required(
  z.object({
    name: z.string().check(
      z.refine((val) => val === REFINED_NAME_SCHEMA_VALUE, {
        message: REFINED_NAME_SCHEMA_ERROR,
      }),
    ),
  }),
);

export const NestedRefinedSchema = z.object({
  user: UserSchema,
});

export const ArrayNumberFieldSchema = z.object({
  numbers: z.array(z.number()),
});

export const ArrayUserFieldSchema = z.object({
  users: z.array(UserSchema, {
    error: ({ input }) =>
      typeof input === "string"
        ? "Expected array, received string"
        : "Invalid input",
  }),
});

export const RefinedUserFieldSchema = z.required(
  z
    .object({
      users: z.array(UserSchema),
    })
    .check(z.refine(() => true)),
);
