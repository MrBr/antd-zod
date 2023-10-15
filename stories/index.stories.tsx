import React from "react";
import { useFormFields } from "../src";

const PreviewComponent = () => {
  const fields = useFormFields();
  return <div>Keys length: {Object.keys(fields).length}</div>;
};

export default {
  component: PreviewComponent,
  title: "Preview",
};

export const Default = {
  args: {},
};
