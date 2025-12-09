"use client";

import type { HighlightSegment } from "@/lib/useJsonSearch";

type JsonHighlightOverlayProps = {
  segments: HighlightSegment[];
  highlightRef: React.RefObject<HTMLPreElement | null>;
  matchRefs: React.MutableRefObject<Array<HTMLElement | null>>;
  isFullscreen?: boolean;
};

const JsonHighlightOverlay = ({ segments, highlightRef, matchRefs, isFullscreen = false }: JsonHighlightOverlayProps) => {
  return (
    <pre
      ref={highlightRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 ${isFullscreen ? "" : "max-h-[520px]"} overflow-auto ${isFullscreen ? "rounded-lg" : "rounded-2xl"} bg-transparent p-4 text-sm leading-6 text-transparent whitespace-pre-wrap break-words [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
      style={{
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {segments.map((segment, index) =>
        segment.highlight ? (
          <mark
            key={`highlight-${segment.matchIndex}-${index}`}
            ref={(element) => {
              if (segment.matchIndex !== null && element) {
                matchRefs.current[segment.matchIndex] = element;
              }
            }}
            className="rounded bg-[#ffe600]/60 px-0.5 text-transparent"
          >
            {segment.text}
          </mark>
        ) : (
          <span key={`text-${index}`} className="text-transparent">
            {segment.text}
          </span>
        ),
      )}
    </pre>
  );
};

export default JsonHighlightOverlay;

