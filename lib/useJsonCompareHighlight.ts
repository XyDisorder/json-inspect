import { useMemo } from "react";
import type { JsonDiff } from "@/lib/jsonCompare";
import type { JsonValue } from "@/lib/treeBuilder";
import { findLinesForPath } from "@/lib/jsonPathToLine";

type LineSegment = {
  text: string;
  highlight: boolean;
  type: JsonDiff["type"] | null;
  isLastLine: boolean;
};

const getLinesToHighlight = (text: string, paths: string[], jsonValue: JsonValue | null): Set<number> => {
  const lines = new Set<number>();
  if (!text || !jsonValue) return lines;

  paths.forEach((path) => {
    const lineNumbers = findLinesForPath(text, path, jsonValue);
    lineNumbers.forEach((lineNum) => {
      // Convert to 0-based index
      lines.add(lineNum);
    });
  });

  return lines;
};

const getLineDiffType = (
  lineIndex: number,
  text: string,
  diffs: JsonDiff[],
  isLeft: boolean,
  jsonValue: JsonValue | null,
): JsonDiff["type"] | null => {
  if (!jsonValue) return null;
  
  // Find which diff(s) correspond to this line
  let bestMatch: JsonDiff | null = null;
  let bestMatchDepth = -1;
  
  // Filter diffs that are relevant for this side
  const relevantDiffs = diffs.filter((diff) => {
    if (isLeft) {
      return diff.type === "removed" || diff.type === "modified";
    } else {
      return diff.type === "added" || diff.type === "modified";
    }
  });
  
  for (const diff of relevantDiffs) {
    const lineNumbers = findLinesForPath(text, diff.path, jsonValue);
    if (lineNumbers.includes(lineIndex)) {
      // This diff corresponds to this line
      const pathDepth = diff.path.split(".").length;
      // Prefer more specific matches (deeper paths)
      // If same depth, prefer modified over added/removed
      const shouldUpdate = bestMatch === null || 
        pathDepth > bestMatchDepth || 
        (pathDepth === bestMatchDepth && 
         diff.type === "modified" && 
         bestMatch && bestMatch.type !== "modified");
      
      if (shouldUpdate) {
        bestMatch = diff;
        bestMatchDepth = pathDepth;
      }
    }
  }
  
  return bestMatch ? bestMatch.type : null;
};

const createLineSegments = (
  text: string,
  highlightLines: Set<number>,
  diffs: JsonDiff[],
  isLeft: boolean,
  jsonValue: JsonValue | null,
): LineSegment[] => {
  if (!text) return [];
  const lines = text.split("\n");
  return lines.map((line, index) => {
    const shouldHighlight = highlightLines.has(index);
    const diffType = shouldHighlight ? getLineDiffType(index, text, diffs, isLeft, jsonValue) : null;
    return {
      text: line,
      highlight: shouldHighlight,
      type: diffType,
      isLastLine: index === lines.length - 1,
    };
  });
};

export const useJsonCompareHighlight = (
  text: string,
  diffs: JsonDiff[],
  isLeft: boolean,
  jsonValue: JsonValue | null,
) => {
  const highlightLines = useMemo(() => {
    if (!text || !diffs.length || !jsonValue) return new Set<number>();
    // Only highlight lines with actual changes (not unchanged)
    const paths = diffs
      .filter((d) => (isLeft ? d.type === "removed" || d.type === "modified" : d.type === "added" || d.type === "modified"))
      .map((d) => d.path);
    return getLinesToHighlight(text, paths, jsonValue);
  }, [text, diffs, isLeft, jsonValue]);

  const segments = useMemo(
    () => createLineSegments(text, highlightLines, diffs, isLeft, jsonValue),
    [text, highlightLines, diffs, isLeft, jsonValue],
  );

  return { highlightLines, segments };
};

export type { LineSegment };

