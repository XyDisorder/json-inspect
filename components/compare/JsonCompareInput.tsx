"use client";

import { useEffect, useState } from "react";
import type { JsonValue } from "@/lib/treeBuilder";
import type { JsonDiff } from "@/lib/jsonCompare";
import JsonCompareTextarea from "@/components/compare/JsonCompareTextarea";

type JsonCompareInputProps = {
  onLeftChange: (value: JsonValue | null) => void;
  onRightChange: (value: JsonValue | null) => void;
  diffs?: JsonDiff[];
  initialLeftValue?: string;
  initialRightValue?: string;
  storageKeyLeft?: string;
  storageKeyRight?: string;
};

const JsonCompareInput = ({
  onLeftChange,
  onRightChange,
  diffs = [],
  initialLeftValue = "",
  initialRightValue = "",
  storageKeyLeft,
  storageKeyRight,
}: JsonCompareInputProps) => {
  const [leftValue, setLeftValue] = useState(initialLeftValue);
  const [rightValue, setRightValue] = useState(initialRightValue);
  const [leftError, setLeftError] = useState<string | null>(null);
  const [rightError, setRightError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (initialLeftValue !== undefined) {
      setLeftValue(initialLeftValue);
    }
  }, [initialLeftValue]);

  useEffect(() => {
    if (initialRightValue !== undefined) {
      setRightValue(initialRightValue);
    }
  }, [initialRightValue]);

  useEffect(() => {
    if (storageKeyLeft && typeof window !== "undefined") {
      if (leftValue) {
        localStorage.setItem(storageKeyLeft, leftValue);
      } else {
        localStorage.removeItem(storageKeyLeft);
      }
    }
  }, [leftValue, storageKeyLeft]);

  useEffect(() => {
    if (storageKeyRight && typeof window !== "undefined") {
      if (rightValue) {
        localStorage.setItem(storageKeyRight, rightValue);
      } else {
        localStorage.removeItem(storageKeyRight);
      }
    }
  }, [rightValue, storageKeyRight]);

  const formatJson = (value: string, setter: (v: string) => void, errorSetter: (e: string | null) => void) => {
    try {
      const parsed = JSON.parse(value) as JsonValue;
      setter(JSON.stringify(parsed, null, 2));
      errorSetter(null);
    } catch (err) {
      errorSetter(err instanceof Error ? err.message : "Invalid JSON");
    }
  };

  const handleLeftFormat = () => formatJson(leftValue, setLeftValue, setLeftError);
  const handleRightFormat = () => formatJson(rightValue, setRightValue, setRightError);

  const handleLeftClear = () => {
    setLeftValue("");
    setLeftError(null);
    onLeftChange(null);
  };

  const handleRightClear = () => {
    setRightValue("");
    setRightError(null);
    onRightChange(null);
  };

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

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-start gap-2">
          <button
            type="button"
            title="Fullscreen (Esc to exit)"
            aria-label="Fullscreen"
            onClick={() => setIsFullscreen(true)}
            className="rounded-full border-2 border-emerald-500 dark:border-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300 transition hover:border-emerald-600 hover:bg-emerald-500/20 dark:hover:border-emerald-300 dark:hover:bg-emerald-500/30 hover:text-emerald-800 dark:hover:text-emerald-200 shadow-sm dark:shadow-none"
          >
            ⛶ Fullscreen
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <JsonCompareTextarea
            value={leftValue}
            onChange={setLeftValue}
            onJsonChange={onLeftChange}
            diffs={diffs}
            isLeft={true}
            label="JSON LEFT"
            labelColor="text-emerald-300"
            placeholder='{"key": "value"}'
            onFormat={handleLeftFormat}
            onClear={handleLeftClear}
          />
          <JsonCompareTextarea
            value={rightValue}
            onChange={setRightValue}
            onJsonChange={onRightChange}
            diffs={diffs}
            isLeft={false}
            label="JSON RIGHT"
            labelColor="text-amber-300"
            placeholder='{"key": "value"}'
            onFormat={handleRightFormat}
            onClear={handleRightClear}
          />
        </div>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4">
            <span className="text-xs uppercase tracking-[0.2em] text-emerald-500 dark:text-emerald-300 font-semibold">Compare Mode</span>
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
          <div className="flex-1 min-h-0 overflow-hidden p-4">
            <div className="grid h-full gap-4 lg:grid-cols-2">
                <div className="h-full min-h-0">
                  <JsonCompareTextarea
                    value={leftValue}
                    onChange={setLeftValue}
                    onJsonChange={onLeftChange}
                    diffs={diffs}
                    isLeft={true}
                    label="JSON LEFT"
                    labelColor="text-emerald-300"
                    placeholder='{"key": "value"}'
                    onFormat={handleLeftFormat}
                    onClear={handleLeftClear}
                    isFullscreen={true}
                  />
                </div>
                <div className="h-full min-h-0">
                  <JsonCompareTextarea
                    value={rightValue}
                    onChange={setRightValue}
                    onJsonChange={onRightChange}
                    diffs={diffs}
                    isLeft={false}
                    label="JSON RIGHT"
                    labelColor="text-amber-300"
                    placeholder='{"key": "value"}'
                    onFormat={handleRightFormat}
                    onClear={handleRightClear}
                    isFullscreen={true}
                  />
                </div>
              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JsonCompareInput;
