function MovasaghLoading() {
  return (
    <div className="fixed w-full h-full bg-G9 flex flex-col justify-center items-center gap-y-4">
      <img src="/images/loading-bg.png" alt="loading bg" />
      <span className="text-xl">داده ها در حال همگام سازی هستند</span>
    </div>
  );
}

export { MovasaghLoading };
