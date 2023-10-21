/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Form, Input } from "antd";

describe("missing antd 5 form contract", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it("should provide field value in rule validator function", async () => {
    const validator = jest.fn().mockImplementation(() => Promise.resolve());
    render(
      <Form>
        <Form.Item name="fieldName" rules={[{ validator }]}>
          <Input placeholder="Test input" />
        </Form.Item>
      </Form>,
    );
    await userEvent.type(screen.getByPlaceholderText("Test input"), "T");
    expect(validator).toHaveBeenCalledWith(
      expect.objectContaining({
        field: "fieldName",
      }),
      "T",
      expect.any(Function),
    );
  });
});
