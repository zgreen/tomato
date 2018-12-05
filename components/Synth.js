import { memo, Fragment, useEffect, useState } from "react";
import Tone from "tone";
import { chromaticKeyMap } from "../config";
const synth = new Tone.PolySynth(6, Tone.Synth).toMaster();

export default memo(() => {
  const [attackNote, setAttackNote] = useState();
  const [releaseNote, setReleaseNote] = useState();
  const [activeNotes, setActiveNotes] = useState([]);
  useEffect(
    () => {
      synth.triggerAttack(attackNote);
    },
    [attackNote]
  );
  useEffect(
    () => {
      synth.triggerRelease(releaseNote);
    },
    [releaseNote]
  );
  const onKeyDown = ({ key }) => {
    if (chromaticKeyMap(2)[key] === attackNote) {
      return;
    }
    setAttackNote(chromaticKeyMap(2)[key]);
    setActiveNotes(notes => {
      return notes.concat(chromaticKeyMap(2)[key]);
    });
  };
  const onKeyUp = ({ key }) => {
    setReleaseNote(chromaticKeyMap(2)[key]);
    setActiveNotes(notes => {
      return notes.filter(note => note !== chromaticKeyMap(2)[key]);
    });
  };
  console.log("activeNotes", activeNotes);
  return (
    <div className="container" onKeyDown={onKeyDown} onKeyUp={onKeyUp}>
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
      <style jsx>{`
        button {
          appearance: none;
          background-color: transparent;
          border: 0;
        }
        span {
          display: flex;
          height: 100px;
          width: 100px;
        }
        .container {
          height: 100vh;
          top: 0;
          position: absolute;
          width: 100vw;
        }
      `}</style>
      <input type="range" />
      <div>
        {Object.entries(chromaticKeyMap(2)).map(([key, val]) => (
          <button key={key}>
            <span
              style={{
                backgroundColor: activeNotes.includes(val)
                  ? "tomato"
                  : "transparent"
              }}
            >
              {key}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
});
