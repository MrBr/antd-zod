import { ZodIssue, ZodTypeAny } from "zod";
import { isZodObject } from "./schema";
import getSchemaBaseSchema from "./getSchemaBaseSchema";

const concatAntdPath = (antdPath: string[]) => antdPath.join(".");
const serializePath = (
  schema: ZodTypeAny,
  zodPath: string[],
  antdPath: string[] = [],
): string => {
  const subPath = zodPath.pop();

  if (!subPath) {
    return concatAntdPath(antdPath);
  }

  const baseSchema = getSchemaBaseSchema(schema);
  if (isZodObject(baseSchema)) {
    antdPath.push(subPath);
    const subPathBaseSchema = getSchemaBaseSchema(baseSchema.shape[subPath]);

    return isZodObject(subPathBaseSchema)
      ? serializePath(subPathBaseSchema, zodPath, antdPath)
      : concatAntdPath(antdPath);
  }

  throw new Error("Unknown zod schema");
};

const getIssueAntdPath = (schema: ZodTypeAny, issue: ZodIssue) => {
  const zodPath = issue.path.reverse() as string[];
  if (zodPath.length === 0) {
    throw new Error(
      "Unknown zod path. Usually sign of refined shape without 'path' property.",
    );
  }
  return serializePath(schema, zodPath);
};

export default getIssueAntdPath;
