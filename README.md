# Antd Zod Validation

The aim of this library is to enable seamless integration of Zod validation with Antd form fields.

## Installation

```
npm install antd-zod
```
Link to npm package [antd-zod](https://npmjs.com/package/antd-zod).

### Older version
- For Antd@^4.0.0 use antd-zod@^4.0.0

## Usage

```jsx
import z from 'zod';
import { Form, Button, Input, InputNumber } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

// Create zod schema - base schema MUST be an object
const CustomFormValidationSchema = z.object({
  fieldString: z.string(),
  fieldNumber: z.number(),
});

// Create universal rule for Form.Item rules prop for EVERY schema field
const rule = createSchemaFieldRule(CustomFormValidationSchema);

// Set rule to Form.Item
const SimpleForm = () => {
    return (
        <Form>
            <Form.Item label="String field" name="fieldString" rules={[rule]}>
                <Input/>
            </Form.Item>
            <Form.Item label="Number field" name="fieldNumber" rules={[rule]}>
                <InputNumber/>
            </Form.Item>
            <Button htmlType="submit">Submit</Button>
        </Form>
    );
};
```

## Customizing Error Messages

You can customize how multiple error messages are handled using the `aggregateErrorMessages` option.

### Example: Show Only the First Error
```jsx
const rule = createSchemaFieldRule(CustomFormValidationSchema, {
  aggregateErrorMessages: (prev, next) => prev,
});
```

### Example: Concatenate Errors with a Comma
```jsx
const rule = createSchemaFieldRule(CustomFormValidationSchema, {
  aggregateErrorMessages: (prev, next) => `${prev}, ${next}`,
});
```

This allows greater flexibility in how error messages are displayed within your forms.

## Examples
All examples are in Storybook stories

- Basic examples - https://github.com/MrBr/antd-zod/blob/main/stories/basic.stories.tsx
- Refined examples - https://github.com/MrBr/antd-zod/blob/main/stories/refined.stories.tsx

To start Storybook locally, install dependencies and run `npm run storybook`.

## Specifications
Antd Form.Item (rc-field-form) has a certain validation lifecycle which works the best with Form.Item rules. In order to respect that behavior, `antd-zod` provides a way to create a generic rule that will validate all schema properties and refinements on a field level.

- Base schema for Form data must be an object
- Object may have refinements on a root level
- Object may have nested object children
- Object children may have their own refinements
