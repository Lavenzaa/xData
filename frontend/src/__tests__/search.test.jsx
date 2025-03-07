import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Search from "../features/search/search";
import "@testing-library/jest-dom";

// Mock the transcribeApis module
vi.mock("../services/transcribeApi", () => ({
  transcribeApis: {
    searchTranscriptions: vi.fn(),
  },
}));

import { transcribeApis } from "../services/transcribeApi";

// simulates the user typing a query and pressing Enter, and then verifies that the error snackbar displays the expected message.
describe("Search Component", () => {
  it("displays error snackbar when no results are returned", async () => {
    // Mock the API call to return an empty array
    transcribeApis.searchTranscriptions.mockResolvedValue([]);
    const setTableData = vi.fn();

    render(<Search setTableData={setTableData} />);

    // Find the TextField and simulate user typing "test" and pressing Enter
    const input = screen.getByLabelText(/Search Filename/i);
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    // Wait for the snackbar error message to appear
    await waitFor(() =>
      expect(
        screen.getByText(
          "No transcripts with this filename exist in this database"
        )
      ).toBeInTheDocument()
    );
  });
});
