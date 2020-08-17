import { useSelector } from "react-redux";

export default () => {
  const state = useSelector((state) => state);
  if (
    process.env.NODE_ENV !== "production" &&
    process.env.NODE_ENV !== "test"
  ) {
    console.log("state", state);
  }
  return null;
};
