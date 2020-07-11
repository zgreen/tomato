import { memo, useRef, useContext, useEffect } from "react";
import css from "styled-jsx/css";
import { SynthContext } from "./Synth";

const { className: basicClassName, styles: basicStyles } = css.resolve`
  button {
    appearance: none;
    background-color: tomato;
    border: 0;
    color: var(--brown);
    font-size: 16px;
    margin-bottom: 10px;
    padding: 5px 10px;
  }
`;

export const BasicButton = ({ children, type }) => (
  <>
    {basicStyles}
    <button {...{ className: basicClassName, type }}>{children}</button>
  </>
);

const { className: innerClassName, styles: innerStyles } = css.resolve`
  span {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    pointer-events: none;
  }
`;

export const InnerButton = memo((props) => (
  <>
    {innerStyles}
    <span {...{ ...props, className: innerClassName }} />
  </>
));

const { className, styles } = css.resolve`
  button {
    appearance: none;
    background-color: transparent;
    border: 1px solid tomato;
    flex: 0 0 10%;
    margin: 0;
    padding: 0;
  }
  button,
  button * {
    touch-action: none;
    -webkit-touch-callout: none;
    -webkit-user-callout: none;
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-modify: none;
    -webkit-highlight: none;
  }
  button * {
    pointer-events: none;
  }
`;

const SynthButton = ({ totalButtons, idx, keyboardKey, ...props }) => {
  const {
    state: { activeNotes, notes },
  } = useContext(SynthContext);
  const ref = useRef(null);
  const handleKeyDown = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (activeNotes[activeNotes.length - 1] === notes[keyboardKey]) {
      ref.current.focus();
    }
  }, [activeNotes, notes, keyboardKey]);

  return (
    <>
      {styles}
      <button
        style={{
          backgroundColor: activeNotes.includes(notes[keyboardKey])
            ? "tomato"
            : "transparent",
          color: activeNotes.includes(notes[keyboardKey])
            ? "var(--brown)"
            : "tomato",
          order: totalButtons - (10 * Math.ceil((idx + 1) / 10) - (idx % 10)),
        }}
        onKeyDown={handleKeyDown}
        {...{ ...props, className, ref }}
      >
        <InnerButton>
          {keyboardKey}
          <h2>{notes[keyboardKey]}</h2>
        </InnerButton>
      </button>
    </>
  );
};

export default SynthButton;
