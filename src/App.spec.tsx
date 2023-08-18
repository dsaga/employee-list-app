import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";



describe("Accordion", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("should show vite + react title", () => {
    expect(screen.getByText("Vite + React")).toBeDefined();
  });
});
