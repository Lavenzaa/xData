import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import App from "../App";
import "@testing-library/jest-dom";

//  verifies that the App component renders the header correctly.
describe("App Component", () => {
  it("renders header text", () => {
    render(<App />);
    const header = screen.getByText(/xData Technical Test/i);
    expect(header).toBeInTheDocument();
  });
});
