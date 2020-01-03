export default ({ state }) => {
  if (process.env.NODE_ENV !== "production") {
    console.log("state", state);
  }
  return null;
};
