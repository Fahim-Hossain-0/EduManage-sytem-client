// src/components/Loading.jsx

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <span className="loading loading-spinner loading-lg text-primary"></span>

        {/* Text */}
        <p className="text-lg font-semibold text-base-content">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;