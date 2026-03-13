export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 z-50 transition-colors">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center relative overflow-hidden mb-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin relative z-10"></div>
      </div>
      <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse transition-colors">Loading...</p>
    </div>
  );
}
