# Antd Zod validation

The aim of this library is to enable seamless integration of Zod validation with Antd form fields.

## Installation

```
npm install antd-zod
```

## Usage

```jsx
import z from "zod";
import { createSchemaFieldRule } from "antd-zod";

// Create zod schema - base schema MUST be an object
const CustomFormValidationSchema = z.object({
  fieldName: z.string(),
});

// Create universal rule for Form.Item rules prop for EVERY schema field
const rule = createSchemaFieldRule(CustomFormValidationSchema);

// Set rule to Form.Item
const SimpleForm = () => {
    return (
        <Form>
            <Form.Item label="Field label" name="fieldName" rules={[rule]}>
                <Input/>
            </Form.Item>
        </Form>
    );
};
```

## Examples
All examples are in Storybook stories

- Basic examples - https://github.com/MrBr/antd-zod/blob/main/stories/basic.stories.tsx
- Refined examples - https://github.com/MrBr/antd-zod/blob/main/stories/refined.stories.tsx

To start storybook locally, install depenedencies and run `npm run storybook`.

## Specifications
Antd Form.Item (rc-field-form) has a certain validation lifecycle which works the best with Form.Item rules. In order to respect that behaviour, `antd-zod` provides a way to create a generic rule that will validate all schema properties and refinements on a field level.

- Base schema for Form data must be an object
- Object may have refinements on a root level
- Object may have nested object children
- Object children may have their own refinements
