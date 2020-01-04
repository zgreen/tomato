export default ({ state }) => {
  if (
    process.env.NODE_ENV !== "production" &&
    process.env.NODE_ENV !== "test"
  ) {
    console.log("state", state);
  }
  return null;
};
