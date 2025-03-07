import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import Upload from "../features/upload/upload";
import "@testing-library/jest-dom";

// checks that the Upload component renders an upload button.
describe("Upload Component", () => {
  it("renders upload button", () => {
    render(<Upload />);
    const button = screen.getByRole("button", {
      name: /transcribe audio files/i,
    });

    expect(button).toBeInTheDocument();
  });
});
