import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

describe("app", () => {
  it("attacks, releases", async () => {
    const { container } = render(<App />);
    await waitFor(() =>
      expect(container.querySelector("#playable-container")).toBeInTheDocument()
    );
    const playable = container.querySelector("#playable-container");
    fireEvent.keyDown(playable, {
      key: "a",
      code: 65,
      charCode: 65,
    });
    expect(window.audio).toEqual({ activeNotes: ["A#2"] });
    fireEvent.keyDown(playable, {
      key: "d",
      code: 68,
      charCode: 68,
    });
    expect(window.audio).toEqual({ activeNotes: ["A#2", "C3"] });
    fireEvent.keyDown(playable, {
      key: "g",
      code: 71,
      charCode: 71,
    });
    expect(window.audio).toEqual({ activeNotes: ["A#2", "C3", "D3"] });
    fireEvent.keyDown(playable, {
      key: "e",
      code: 69,
      charCode: 69,
    });
    expect(window.audio).toEqual({ activeNotes: ["A#2", "C3", "D3", "A#3"] });
    fireEvent.keyUp(playable, {
      key: "a",
      code: 65,
      charCode: 65,
    });
    expect(window.audio).toEqual({ activeNotes: ["C3", "D3", "A#3"] });
    fireEvent.keyUp(playable, {
      key: "d",
      code: 68,
      charCode: 68,
    });
    expect(window.audio).toEqual({ activeNotes: ["D3", "A#3"] });
    fireEvent.keyUp(playable, {
      key: "g",
      code: 71,
      charCode: 71,
    });
    expect(window.audio).toEqual({ activeNotes: ["A#3"] });
    fireEvent.keyUp(playable, {
      key: "e",
      code: 69,
      charCode: 69,
    });
    expect(window.audio).toEqual({ activeNotes: [] });
  });
});
