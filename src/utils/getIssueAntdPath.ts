import { $ZodIssue, $ZodType } from "zod/v4/core";
import { isZodObject, isZodArray } from "./schema";
import getSchemaBaseSchema from "./getSchemaBaseSchema";

const concatAntdPath = (antdPath: string[]) => antdPath.join(".");
const prepareZodPath = (antdPath: string) => antdPath.replace(/\.\d+/, "");
const serializePath = (
  schema: $ZodType,
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

    const replacedPath = prepareZodPath(subPath);
    const subPathBaseSchema = getSchemaBaseSchema(
      baseSchema._zod.def.shape[replacedPath],
    );

    if (isZodObject(subPathBaseSchema))
      return serializePath(subPathBaseSchema, zodPath, antdPath);
    if (isZodArray(subPathBaseSchema))
      return serializePath(
        subPathBaseSchema._zod.def.element,
        zodPath,
        antdPath,
      );

    return concatAntdPath(antdPath);
  }

  throw new Error("Unknown zod schema");
};

const prepareAntdPath = (path: (string | number | symbol)[]) => {
  return path.reduce<string[]>((prev: string[], curr) => {
    if (typeof curr === "number") {
      const base = [...prev].slice(0, -1);
      return [...base, `${prev.slice(-1)[0]}.${curr}`];
    } else if (typeof curr === "symbol") {
      return [...prev, curr.toString()];
    }
    return [...prev, curr];
  }, []);
};

const getIssueAntdPath = (schema: $ZodType, issue: $ZodIssue) => {
  const preparedPath = prepareAntdPath(issue.path);

  const zodPath = preparedPath.reverse() as string[];
  if (zodPath.length === 0) {
    throw new Error(
      "Unknown zod path. Usually sign of refined shape without 'path' property.",
    );
  }
  return serializePath(schema, zodPath);
};

export default getIssueAntdPath;
