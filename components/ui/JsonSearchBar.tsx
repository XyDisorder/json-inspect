"use client";

type JsonSearchBarProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  matchCount: number;
  matchIndex: number;
  onPrev: () => void;
  onNext: () => void;
};

const JsonSearchBar = ({ searchTerm, onSearchChange, matchCount, matchIndex, onPrev, onNext }: JsonSearchBarProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-black/20 p-3 text-sm text-gray-800 dark:text-slate-200 shadow-sm dark:shadow-none sm:flex-row sm:items-center sm:justify-between">
      <label className="flex flex-1 items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-emerald-500 dark:text-emerald-300 font-semibold">Search</span>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search for keys, values, or paths..."
          className="w-full rounded-full bg-white dark:bg-slate-900/60 px-4 py-1.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 border border-gray-200 dark:border-transparent"
        />
      </label>
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-gray-700 dark:text-slate-300 whitespace-nowrap">
          {matchCount
            ? `${matchIndex + 1} of ${matchCount} matches`
            : searchTerm.trim()
              ? "No matches found"
              : "Ready to search"}
        </span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={onPrev}
            disabled={!matchCount}
            title="Previous match"
            className="rounded-full border border-gray-200 dark:border-white/10 px-3 py-1 text-xs font-medium text-gray-700 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed bg-white dark:bg-transparent shadow-sm dark:shadow-none hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:border-emerald-300 transition"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!matchCount}
            title="Next match"
            className="rounded-full border border-gray-200 dark:border-white/10 px-3 py-1 text-xs font-medium text-gray-700 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed bg-white dark:bg-transparent shadow-sm dark:shadow-none hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:border-emerald-300 transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default JsonSearchBar;

