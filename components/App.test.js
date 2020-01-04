import React from "react";
import { render, fireEvent, prettyDOM } from "@testing-library/react";
import App from "./Synth";

describe("app", () => {
  it("has correct focus", () => {
    const { container } = render(<App />);
    expect(container.querySelector("div")).toHaveFocus();
  });
  xit("attacks", () => {
    const { container } = render(<App shouldFocus />);
    // console.log(prettyDOM(container));
    container.focus();
    fireEvent.keyDown(container, { key: "a", code: 65 });
    fireEvent.keyDown(container, { key: "a", code: 65 });
    fireEvent.keyDown(container, { key: "a", code: 65 });
    expect(window.audio).toEqual({ attack: "A#2" });
  });
});
