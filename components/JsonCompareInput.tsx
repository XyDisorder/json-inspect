"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { JsonValue } from "@/lib/treeBuilder";
import type { JsonDiff } from "@/lib/jsonCompare";
import JsonDiffView from "@/components/JsonDiffView";

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

  // Synchroniser avec les props initiales si elles changent
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

  // Sauvegarder dans localStorage quand le texte change
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
  const [leftError, setLeftError] = useState<string | null>(null);
  const [rightError, setRightError] = useState<string | null>(null);
  const [leftCopied, setLeftCopied] = useState(false);
  const [rightCopied, setRightCopied] = useState(false);
  const [showDiffView, setShowDiffView] = useState(false);
  const leftHighlightRef = useRef<HTMLPreElement>(null);
  const rightHighlightRef = useRef<HTMLPreElement>(null);
  const leftTextareaRef = useRef<HTMLTextAreaElement>(null);
  const rightTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Approche simplifiée : surligner les lignes contenant les clés
  const getLinesToHighlight = (text: string, paths: string[]): Set<number> => {
    const lines = new Set<number>();
    if (!text) return lines;

    const textLines = text.split("\n");
    paths.forEach((path) => {
      const keys = path.split(".").filter((k) => k !== "root" && !/^\d+$/.test(k));
      keys.forEach((key) => {
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`"${escapedKey}"\\s*:`, "i");
        textLines.forEach((line, index) => {
          if (regex.test(line)) {
            lines.add(index);
          }
        });
      });
    });

    return lines;
  };

  const leftHighlightLines = useMemo(() => {
    if (!leftValue || !diffs.length) return new Set<number>();
    const paths = diffs
      .filter((d) => d.type === "removed" || d.type === "modified" || d.type === "unchanged")
      .map((d) => d.path);
    return getLinesToHighlight(leftValue, paths);
  }, [leftValue, diffs]);

  const rightHighlightLines = useMemo(() => {
    if (!rightValue || !diffs.length) return new Set<number>();
    const paths = diffs
      .filter((d) => d.type === "added" || d.type === "modified" || d.type === "unchanged")
      .map((d) => d.path);
    return getLinesToHighlight(rightValue, paths);
  }, [rightValue, diffs]);

  const getHighlightColor = (type: JsonDiff["type"]) => {
    switch (type) {
      case "added":
        return "bg-emerald-500/40 border-l-2 border-emerald-500/60";
      case "removed":
        return "bg-rose-500/40 border-l-2 border-rose-500/60";
      case "modified":
        return "bg-amber-500/40 border-l-2 border-amber-500/60";
      default:
        return "bg-slate-700/30 border-l-2 border-slate-500/40";
    }
  };

  // Obtenir le type de diff pour une ligne donnée
  const getLineDiffType = (lineIndex: number, text: string, diffs: JsonDiff[], isLeft: boolean): JsonDiff["type"] | null => {
    const lines = text.split("\n");
    if (lineIndex >= lines.length) return null;

    const line = lines[lineIndex];
    for (const diff of diffs) {
      const keys = diff.path.split(".").filter((k) => k !== "root" && !/^\d+$/.test(k));
      for (const key of keys) {
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`"${escapedKey}"\\s*:`, "i");
        if (regex.test(line)) {
          if (isLeft && (diff.type === "removed" || diff.type === "modified" || diff.type === "unchanged")) {
            return diff.type;
          }
          if (!isLeft && (diff.type === "added" || diff.type === "modified" || diff.type === "unchanged")) {
            return diff.type;
          }
        }
      }
    }
    return null;
  };

  const createLineSegments = (text: string, highlightLines: Set<number>, diffs: JsonDiff[], isLeft: boolean) => {
    if (!text) return [];
    const lines = text.split("\n");
    return lines.map((line, index) => {
      const shouldHighlight = highlightLines.has(index);
      const diffType = shouldHighlight ? getLineDiffType(index, text, diffs, isLeft) : null;
      return {
        text: line,
        highlight: shouldHighlight,
        type: diffType,
        isLastLine: index === lines.length - 1,
      };
    });
  };

  const leftSegments = useMemo(
    () => createLineSegments(leftValue, leftHighlightLines, diffs, true),
    [leftValue, leftHighlightLines, diffs],
  );
  const rightSegments = useMemo(
    () => createLineSegments(rightValue, rightHighlightLines, diffs, false),
    [rightValue, rightHighlightLines, diffs],
  );

  const handleLeftChange = (value: string) => {
    setLeftValue(value);
    try {
      const parsed = JSON.parse(value) as JsonValue;
      setLeftError(null);
      onLeftChange(parsed);
    } catch (err) {
      setLeftError(err instanceof Error ? err.message : "Invalid JSON");
      onLeftChange(null);
    }
  };

  const handleRightChange = (value: string) => {
    setRightValue(value);
    try {
      const parsed = JSON.parse(value) as JsonValue;
      setRightError(null);
      onRightChange(parsed);
    } catch (err) {
      setRightError(err instanceof Error ? err.message : "Invalid JSON");
      onRightChange(null);
    }
  };

  const formatJson = (value: string, setter: (v: string) => void, errorSetter: (e: string | null) => void) => {
    try {
      const parsed = JSON.parse(value) as JsonValue;
      setter(JSON.stringify(parsed, null, 2));
      errorSetter(null);
    } catch (err) {
      errorSetter(err instanceof Error ? err.message : "Invalid JSON");
    }
  };

  const canShowDiff = !leftError && !rightError && leftValue && rightValue;

  return (
    <div className="space-y-4">
      {canShowDiff && (
        <div className="flex items-center justify-end gap-2">
          <span className="text-xs text-slate-400">View mode:</span>
          <div className="flex rounded-full border border-white/10 bg-black/30 p-1 text-white">
            <button
              type="button"
              onClick={() => setShowDiffView(false)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                !showDiffView ? "bg-emerald-400/20 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => setShowDiffView(true)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                showDiffView ? "bg-amber-400/20 text-amber-300" : "text-slate-400 hover:text-amber-200"
              }`}
            >
              Diff
            </button>
          </div>
        </div>
      )}

      {showDiffView && canShowDiff ? (
        <JsonDiffView leftJson={leftValue} rightJson={rightValue} diffs={diffs} />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">JSON LEFT</p>
            <p className="text-xs text-slate-400">First JSON to compare</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => formatJson(leftValue, setLeftValue, setLeftError)}
              className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white transition hover:border-emerald-300 hover:text-emerald-200"
            >
              Format
            </button>
            <button
              type="button"
              onClick={() => {
                setLeftValue("");
                setLeftError(null);
                onLeftChange(null);
              }}
              className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-400 transition hover:border-rose-300 hover:text-rose-200"
            >
              Clear
            </button>
          </div>
        </div>
        <div className="relative">
          <button
            type="button"
            title="Copy JSON"
            aria-label="Copy JSON"
            onClick={async () => {
              if (typeof navigator === "undefined" || !navigator.clipboard) return;
              try {
                await navigator.clipboard.writeText(leftValue);
                setLeftCopied(true);
                setTimeout(() => setLeftCopied(false), 1400);
              } catch (err) {
                console.error(err);
              }
            }}
            className="absolute right-4 top-4 z-20 rounded-full border border-white/15 bg-black/40 px-2 py-1 text-xs text-slate-200 backdrop-blur transition hover:border-emerald-300 hover:text-white"
          >
            {leftCopied ? "✓" : "⧉"}
          </button>
          {leftHighlightLines.size > 0 && (
            <pre
              ref={leftHighlightRef}
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 max-h-[520px] overflow-auto rounded-2xl bg-slate-900/80 p-4 text-sm leading-6 text-transparent shadow-inner whitespace-pre-wrap break-words"
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              }}
            >
              {leftSegments.map((segment, index) =>
                segment.highlight && segment.type ? (
                  <mark
                    key={`left-${index}`}
                    className={`block ${getHighlightColor(segment.type)} text-transparent`}
                  >
                    {segment.text}
                    {!segment.isLastLine && "\n"}
                  </mark>
                ) : (
                  <span key={`left-${index}`} className="text-transparent">
                    {segment.text}
                    {!segment.isLastLine && "\n"}
                  </span>
                ),
              )}
            </pre>
          )}
          <textarea
            ref={leftTextareaRef}
            value={leftValue}
            onChange={(event) => handleLeftChange(event.target.value)}
            onScroll={(event) => {
              if (leftHighlightRef.current) {
                leftHighlightRef.current.scrollTop = event.currentTarget.scrollTop;
                leftHighlightRef.current.scrollLeft = event.currentTarget.scrollLeft;
              }
            }}
            className={`relative z-10 h-[520px] w-full resize-none rounded-2xl border bg-slate-900/80 p-4 text-sm leading-6 text-slate-100 shadow-inner outline-none transition focus:ring-2 focus:ring-emerald-400/60 ${
              leftError ? "border-rose-400/70" : "border-white/10"
            }`}
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              backgroundColor: "rgba(15,23,42,0.8)",
            }}
            spellCheck={false}
            placeholder='{"key": "value"}'
          />
        </div>
        {leftError ? (
          <p className="text-sm text-rose-300">Error: {leftError}</p>
        ) : leftValue ? (
          <p className="text-xs text-slate-500">Valid JSON ✓</p>
        ) : null}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-amber-300">JSON RIGHT</p>
            <p className="text-xs text-slate-400">Second JSON to compare</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => formatJson(rightValue, setRightValue, setRightError)}
              className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white transition hover:border-amber-300 hover:text-amber-200"
            >
              Format
            </button>
            <button
              type="button"
              onClick={() => {
                setRightValue("");
                setRightError(null);
                onRightChange(null);
              }}
              className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-400 transition hover:border-rose-300 hover:text-rose-200"
            >
              Clear
            </button>
          </div>
        </div>
        <div className="relative">
          <button
            type="button"
            title="Copy JSON"
            aria-label="Copy JSON"
            onClick={async () => {
              if (typeof navigator === "undefined" || !navigator.clipboard) return;
              try {
                await navigator.clipboard.writeText(rightValue);
                setRightCopied(true);
                setTimeout(() => setRightCopied(false), 1400);
              } catch (err) {
                console.error(err);
              }
            }}
            className="absolute right-4 top-4 z-20 rounded-full border border-white/15 bg-black/40 px-2 py-1 text-xs text-slate-200 backdrop-blur transition hover:border-amber-300 hover:text-white"
          >
            {rightCopied ? "✓" : "⧉"}
          </button>
          {rightHighlightLines.size > 0 && (
            <pre
              ref={rightHighlightRef}
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 max-h-[520px] overflow-auto rounded-2xl bg-slate-900/80 p-4 text-sm leading-6 text-transparent shadow-inner whitespace-pre-wrap break-words"
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              }}
            >
              {rightSegments.map((segment, index) =>
                segment.highlight && segment.type ? (
                  <mark
                    key={`right-${index}`}
                    className={`block ${getHighlightColor(segment.type)} text-transparent`}
                  >
                    {segment.text}
                    {!segment.isLastLine && "\n"}
                  </mark>
                ) : (
                  <span key={`right-${index}`} className="text-transparent">
                    {segment.text}
                    {!segment.isLastLine && "\n"}
                  </span>
                ),
              )}
            </pre>
          )}
          <textarea
            ref={rightTextareaRef}
            value={rightValue}
            onChange={(event) => handleRightChange(event.target.value)}
            onScroll={(event) => {
              if (rightHighlightRef.current) {
                rightHighlightRef.current.scrollTop = event.currentTarget.scrollTop;
                rightHighlightRef.current.scrollLeft = event.currentTarget.scrollLeft;
              }
            }}
            className={`relative z-10 h-[520px] w-full resize-none rounded-2xl border bg-slate-900/80 p-4 text-sm leading-6 text-slate-100 shadow-inner outline-none transition focus:ring-2 focus:ring-amber-400/60 ${
              rightError ? "border-rose-400/70" : "border-white/10"
            }`}
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              backgroundColor: "rgba(15,23,42,0.8)",
            }}
            spellCheck={false}
            placeholder='{"key": "value"}'
          />
        </div>
        {rightError ? (
          <p className="text-sm text-rose-300">Error: {rightError}</p>
        ) : rightValue ? (
          <p className="text-xs text-slate-500">Valid JSON ✓</p>
        ) : null}
      </div>
        </div>
      )}
    </div>
  );
};

export default JsonCompareInput;

