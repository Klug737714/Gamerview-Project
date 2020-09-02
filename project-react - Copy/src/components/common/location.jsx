import { useLocation } from "react-router-dom";

const Location = () => {
  const location = useLocation();
  console.log(location.pathname);
  return location.pathname;
};

export default Location;
