import { ZodIssue, ZodTypeAny } from "zod";
import { isZodObject, isZodArray } from "./schema";
import getSchemaBaseSchema from "./getSchemaBaseSchema";

const concatAntdPath = (antdPath: string[]) => antdPath.join(".");
const serializePath = (
  schema: ZodTypeAny,
  zodPath: string[],
  antdPath: string[] = []
): string => {
  const subPath = zodPath.pop();

  if (!subPath) {
    return concatAntdPath(antdPath);
  }

  const baseSchema = getSchemaBaseSchema(schema);
  if (isZodObject(baseSchema)) {
    antdPath.push(subPath);

    const replacedPath = subPath.replace(/\.\d+/, "");
    const subPathBaseSchema = getSchemaBaseSchema(
      baseSchema.shape[replacedPath]
    );

    if (isZodObject(subPathBaseSchema))
      return serializePath(subPathBaseSchema, zodPath, antdPath);
    if (isZodArray(subPathBaseSchema))
      return serializePath(subPathBaseSchema.element, zodPath, antdPath);

    return concatAntdPath(antdPath);
  }

  throw new Error("Unknown zod schema");
};

const getIssueAntdPath = (schema: ZodTypeAny, issue: ZodIssue) => {
  // issue.path = ["testArray", "0", "myField"] => modifiedPath = ["testArray.0", "myField"]
  const modifiedPath = issue.path.reduce<string[]>((prev: string[], curr) => {
    if (typeof curr === "number") {
      const base = [...prev].slice(0, -1);
      return [...base, `${prev.slice(-1)[0]}.${curr}`];
    }
    return [...prev, curr];
  }, []);

  const zodPath = modifiedPath.reverse() as string[];
  if (zodPath.length === 0) {
    throw new Error(
      "Unknown zod path. Usually sign of refined shape without 'path' property."
    );
  }
  return serializePath(schema, zodPath);
};

export default getIssueAntdPath;
