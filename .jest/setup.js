import "@testing-library/jest-dom/extend-expect";

beforeEach(() => {
  window.audio = {
    activeNotes: []
  };
});
