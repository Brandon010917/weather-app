const Error = ({ status, statusText, citySearch }) => {
  return (
    <div className="mt-6 text-2xl text-center text-gray-dark">
      <p className=" mb-4">
        Error <span className="font-bold">{status}</span>: {statusText}
      </p>
      {citySearch && (
        <p>
          <span className="font-bold">{citySearch}</span> is not a city or
          country
        </p>
      )}
    </div>
  );
};

export default Error;
