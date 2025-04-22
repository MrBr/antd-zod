import { $ZodError } from "@zod/core";
import getSchemaBaseSchema from "./getSchemaBaseSchema";
import { $ZodShape, $ZodType } from "@zod/core";
import { isZodObject } from "./schema";
import getIssueAntdPath from "./getIssueAntdPath";

const formatErrors = <T extends $ZodShape>(
  schema: $ZodType,
  errors: $ZodError<T>,
): { [key: string]: string[] } => {
  if (errors.issues.length === 0) {
    return {};
  }
  const baseSchema = getSchemaBaseSchema(schema);

  if (!isZodObject(baseSchema)) {
    console.warn("Base form schema must be object!");
    return {};
  }

  return errors.issues.reduce(
    (formattedErrors, issue) => {
      try {
        const path = getIssueAntdPath(schema, issue);
        if (formattedErrors[path]) {
          formattedErrors[path].push(issue.message);
        } else {
          formattedErrors[path] = [issue.message];
        }
      } catch (e) {
        console.warn(e);
      }

      return formattedErrors;
    },
    {} as { [key: string]: string[] },
  );
};

export default formatErrors;
