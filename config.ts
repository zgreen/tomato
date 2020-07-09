const notes = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];
export const keyboardKeys = [
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  ",",
  ".",
  "/",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  ";",
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
];
const stackedKeyboardKeys = keyboardKeys.reduce((acc, cur, idx) => {
  if (idx % 10 === 0) {
    acc = [...acc, [cur]];
  } else {
    let last = acc.length - 1;
    acc[last] = acc[last] ? acc[last].concat(cur) : [cur];
  }
  return acc;
}, []);

const mapRowToNotes = (
  row,
  octave,
  noteOrder = notes,
  nextOctaveIterator: Function = () => 0
) => {
  return row.reduce(
    (acc, key, idx) => ({
      ...acc,
      [key]: noteOrder[idx].toUpperCase() + (octave + nextOctaveIterator(idx)),
    }),
    {}
  );
};

export const chromaticKeyMap = (initialOctave) => {
  const noteOrder = keyboardKeys.map((key, idx) => notes[idx % 12]);
  const iterator = (idx) => Math.floor(idx / 12);
  return mapRowToNotes(keyboardKeys, initialOctave, noteOrder, iterator);
};

export const stackedKeyMap = (initialOctave) =>
  stackedKeyboardKeys.reduce((acc, row, idx) => {
    if (idx < 2) {
      acc = {
        ...acc,
        ...mapRowToNotes(row, idx === 0 ? initialOctave : initialOctave + 1),
      };
    } else {
      acc = {
        ...acc,
        ...mapRowToNotes(
          row,
          idx === 2 ? initialOctave : initialOctave + 1,
          notes.slice(-2).concat(notes.slice(0, 9))
        ),
      };
    }
    return acc;
  }, {});

export const literalKeyMap = (initialOctave) =>
  ["c", "d", "e", "f", "g", "a", "b"].reduce(
    (acc, cur) => ({ ...acc, [cur]: cur + initialOctave }),
    {}
  );
