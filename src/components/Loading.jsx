const Loading = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <span className="loading loading-spinner loading-md text-primary"></span>
        <p className="text-sm font-medium text-zinc-500">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
