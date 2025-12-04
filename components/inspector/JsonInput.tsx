"use client";

import { useEffect, useRef, useState } from "react";
import type { JsonValue } from "@/lib/treeBuilder";
import { useJsonSearch } from "@/lib/useJsonSearch";
import JsonSearchBar from "@/components/ui/JsonSearchBar";
import JsonHighlightOverlay from "@/components/ui/JsonHighlightOverlay";

type JsonInputProps = {
  initialValue: string;
  onJsonChange: (value: JsonValue) => void;
  onTextChange?: (text: string) => void;
};

const JsonInput = ({ initialValue, onJsonChange, onTextChange }: JsonInputProps) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);
  const fullscreenTextareaRef = useRef<HTMLTextAreaElement>(null);
  const fullscreenHighlightRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const search = useJsonSearch(value, textareaRef, highlightRef);
  const fullscreenSearch = useJsonSearch(value, fullscreenTextareaRef, fullscreenHighlightRef);

  useEffect(() => {
    if (isFullscreen && fullscreenTextareaRef.current) {
      fullscreenTextareaRef.current.focus();
    }
  }, [isFullscreen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      window.addEventListener("keydown", handleEscape);
      return () => {
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isFullscreen]);

  const handleValueChange = (nextValue: string) => {
    setValue(nextValue);
    onTextChange?.(nextValue);
    try {
      const parsed = JSON.parse(nextValue) as JsonValue;
      setError(null);
      onJsonChange(parsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
    }
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(value) as JsonValue;
      const formatted = JSON.stringify(parsed, null, 2);
      setValue(formatted);
      search.setMatchIndex(0);
      fullscreenSearch.setMatchIndex(0);
      setError(null);
      onJsonChange(parsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
    }
  };

  const renderTextarea = (
    textareaRefToUse: React.RefObject<HTMLTextAreaElement>,
    highlightRefToUse: React.RefObject<HTMLPreElement>,
    searchToUse: ReturnType<typeof useJsonSearch>,
    isFullscreenMode = false,
  ) => (
    <div className={`relative ${isFullscreenMode ? "h-full min-h-0" : ""}`}>
      <button
        type="button"
        title="Copy JSON"
        aria-label="Copy JSON"
        onClick={async () => {
          if (typeof navigator === "undefined" || !navigator.clipboard) return;
          try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
          } catch (err) {
            console.error(err);
          }
        }}
        className="absolute right-4 top-4 z-20 rounded-full border border-gray-200 dark:border-white/15 bg-white dark:bg-black/40 px-2 py-1 text-xs text-gray-700 dark:text-slate-200 backdrop-blur transition hover:border-emerald-500 hover:bg-emerald-50 dark:hover:border-emerald-300 dark:hover:bg-emerald-500/20 hover:text-emerald-600 dark:hover:text-white shadow-sm dark:shadow-none"
      >
        {copied ? "✓" : "⧉"}
      </button>
      {searchToUse.searchTerm.trim() && (
        <JsonHighlightOverlay
          segments={searchToUse.highlightSegments}
          highlightRef={highlightRefToUse}
          matchRefs={searchToUse.matchRefs}
          isFullscreen={isFullscreenMode}
        />
      )}
      <textarea
        ref={textareaRefToUse}
        value={value}
        onChange={(event) => handleValueChange(event.target.value)}
        onScroll={(event) => {
          if (highlightRefToUse.current) {
            highlightRefToUse.current.scrollTop = event.currentTarget.scrollTop;
            highlightRefToUse.current.scrollLeft = event.currentTarget.scrollLeft;
          }
        }}
        className={`relative z-10 ${isFullscreenMode ? "absolute inset-0 h-full" : "h-[520px]"} w-full resize-none ${isFullscreenMode ? "rounded-lg" : "rounded-2xl"} border bg-white dark:bg-slate-900/80 p-4 text-sm leading-6 text-gray-900 dark:text-slate-100 ${isFullscreenMode ? "" : "shadow-inner"} outline-none transition focus:ring-2 focus:ring-emerald-400/60 ${
          error ? "border-rose-400/70" : "border-gray-200 dark:border-white/10"
        }`}
        spellCheck={false}
        style={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      />
    </div>
  );

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-500 dark:text-emerald-300">JSON INPUT</p>
            <p className="text-sm text-gray-600 dark:text-slate-400">Paste JSON - updates propagate instantly.</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-full border border-gray-200 dark:border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-white transition hover:border-emerald-500 hover:bg-emerald-50 dark:hover:border-emerald-300 dark:hover:bg-emerald-500/20 hover:text-emerald-600 dark:hover:text-emerald-200 shadow-sm dark:shadow-none"
              onClick={handleFormat}
            >
              Format JSON
            </button>
            <button
              type="button"
              title="Fullscreen"
              aria-label="Fullscreen"
              className="rounded-full border border-gray-200 dark:border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-white transition hover:border-emerald-500 hover:bg-emerald-50 dark:hover:border-emerald-300 dark:hover:bg-emerald-500/20 hover:text-emerald-600 dark:hover:text-emerald-200 shadow-sm dark:shadow-none"
              onClick={() => setIsFullscreen(true)}
            >
              ⛶ Fullscreen
            </button>
          </div>
        </div>
        <JsonSearchBar
          searchTerm={search.searchTerm}
          onSearchChange={search.setSearchTerm}
          matchCount={search.matchCount}
          matchIndex={search.safeMatchIndex}
          onPrev={() => search.goToMatch(-1)}
          onNext={() => search.goToMatch(1)}
        />
        {renderTextarea(textareaRef, highlightRef, search, false)}
        {error ? (
          <p className="text-sm text-rose-500 dark:text-rose-300">Syntax error: {error}</p>
        ) : (
          <p className="text-xs text-gray-500 dark:text-slate-500">Valid JSON ready</p>
        )}
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4">
            <JsonSearchBar
              searchTerm={fullscreenSearch.searchTerm}
              onSearchChange={fullscreenSearch.setSearchTerm}
              matchCount={fullscreenSearch.matchCount}
              matchIndex={fullscreenSearch.safeMatchIndex}
              onPrev={() => fullscreenSearch.goToMatch(-1)}
              onNext={() => fullscreenSearch.goToMatch(1)}
            />
            <div className="ml-4 flex gap-2">
              <button
                type="button"
                title="Format JSON"
                aria-label="Format JSON"
                onClick={handleFormat}
                className="rounded-full border border-gray-200 dark:border-white/20 bg-white dark:bg-black/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-slate-200 transition hover:border-emerald-500 hover:bg-emerald-50 dark:hover:border-emerald-300 dark:hover:bg-emerald-500/20 hover:text-emerald-600 dark:hover:text-white shadow-sm dark:shadow-none whitespace-nowrap"
              >
                Format JSON
              </button>
              <button
                type="button"
                title="Exit Fullscreen (Esc)"
                aria-label="Exit Fullscreen"
                onClick={() => setIsFullscreen(false)}
                className="rounded-full border border-gray-200 dark:border-white/20 bg-white dark:bg-black/40 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-200 transition hover:border-emerald-500 hover:bg-emerald-50 dark:hover:border-emerald-300 dark:hover:bg-emerald-500/20 hover:text-emerald-600 dark:hover:text-white shadow-sm dark:shadow-none whitespace-nowrap"
              >
                ✕ Exit
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-0 overflow-hidden p-4">
            {renderTextarea(fullscreenTextareaRef, fullscreenHighlightRef, fullscreenSearch, true)}
          </div>
        </div>
      )}
    </>
  );
};

export default JsonInput;
