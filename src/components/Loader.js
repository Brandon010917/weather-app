import { Grid } from "react-loader-spinner";

const Loader = ({ loader }) => {
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 z-10 bg-blue-dark text-white flex justify-center items-center loader ${
        loader ? "loader-active" : ""
      }`}
    >
      <Grid color="#3C47E9" height={100} width={100} timeout={3000} />
    </div>
  );
};

export default Loader;
