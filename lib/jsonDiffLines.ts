import type { JsonDiff } from "@/lib/jsonCompare";
import type { JsonValue } from "@/lib/treeBuilder";
import { findLinesForPath } from "@/lib/jsonPathToLine";

export type LineDiff = {
  leftLine: string | null;
  rightLine: string | null;
  leftLineNumber: number | null;
  rightLineNumber: number | null;
  type: "added" | "removed" | "modified" | "unchanged" | "context";
  diff?: JsonDiff;
};

const formatJsonLines = (json: string): string[] => {
  return json.split("\n");
};

export const computeLineDiffs = (
  leftJson: string,
  rightJson: string,
  diffs: JsonDiff[],
  leftJsonValue: JsonValue | null,
  rightJsonValue: JsonValue | null,
): LineDiff[] => {
  if (!leftJson && !rightJson) return [];
  if (!leftJson) {
    return formatJsonLines(rightJson).map((line, index) => ({
      leftLine: null,
      rightLine: line,
      leftLineNumber: null,
      rightLineNumber: index + 1,
      type: "added" as const,
    }));
  }
  if (!rightJson) {
    return formatJsonLines(leftJson).map((line, index) => ({
      leftLine: line,
      rightLine: null,
      leftLineNumber: index + 1,
      rightLineNumber: null,
      type: "removed" as const,
    }));
  }

  const leftLines = formatJsonLines(leftJson);
  const rightLines = formatJsonLines(rightJson);
  
  // Build maps of path -> line numbers for both sides
  const leftPathToLines = new Map<string, number[]>();
  const rightPathToLines = new Map<string, number[]>();
  
  diffs.forEach((diff) => {
    const leftLinesForPath = findLinesForPath(leftJson, diff.path, leftJsonValue);
    const rightLinesForPath = findLinesForPath(rightJson, diff.path, rightJsonValue);
    
    if (leftLinesForPath.length > 0) {
      leftPathToLines.set(diff.path, leftLinesForPath);
    }
    if (rightLinesForPath.length > 0) {
      rightPathToLines.set(diff.path, rightLinesForPath);
    }
  });
  
  // Create a set of all line numbers that have diffs
  const leftDiffLines = new Set<number>();
  const rightDiffLines = new Set<number>();
  
  diffs.forEach((diff) => {
    if (diff.type === "removed" || diff.type === "modified") {
      const lines = leftPathToLines.get(diff.path) || [];
      lines.forEach((lineNum) => leftDiffLines.add(lineNum));
    }
    if (diff.type === "added" || diff.type === "modified") {
      const lines = rightPathToLines.get(diff.path) || [];
      lines.forEach((lineNum) => rightDiffLines.add(lineNum));
    }
  });
  
  // Build result by aligning lines based on content similarity
  // For now, use a simple approach: compare line by line but use path-based diffs
  const result: LineDiff[] = [];
  const maxLines = Math.max(leftLines.length, rightLines.length);
  
  for (let i = 0; i < maxLines; i++) {
    const leftLine = leftLines[i];
    const rightLine = rightLines[i];
    const leftHasDiff = leftDiffLines.has(i);
    const rightHasDiff = rightDiffLines.has(i);
    
    // Find the diff(s) for this line
    let leftDiff: JsonDiff | undefined = undefined;
    let rightDiff: JsonDiff | undefined = undefined;
    
    if (leftHasDiff) {
      for (const [path, lines] of leftPathToLines.entries()) {
        if (lines.includes(i)) {
          const diff = diffs.find((d) => d.path === path && (d.type === "removed" || d.type === "modified"));
          if (diff) {
            leftDiff = diff;
            break;
          }
        }
      }
    }
    
    if (rightHasDiff) {
      for (const [path, lines] of rightPathToLines.entries()) {
        if (lines.includes(i)) {
          const diff = diffs.find((d) => d.path === path && (d.type === "added" || d.type === "modified"));
          if (diff) {
            rightDiff = diff;
            break;
          }
        }
      }
    }
    
    if (leftLine === undefined && rightLine !== undefined) {
      result.push({
        leftLine: null,
        rightLine,
        leftLineNumber: null,
        rightLineNumber: i + 1,
        type: rightDiff?.type === "added" ? "added" : "added",
        diff: rightDiff,
      });
    } else if (leftLine !== undefined && rightLine === undefined) {
      result.push({
        leftLine,
        rightLine: null,
        leftLineNumber: i + 1,
        rightLineNumber: null,
        type: leftDiff?.type === "removed" ? "removed" : "removed",
        diff: leftDiff,
      });
    } else if (leftLine === rightLine) {
      const diff = leftDiff || rightDiff;
      result.push({
        leftLine,
        rightLine,
        leftLineNumber: i + 1,
        rightLineNumber: i + 1,
        type: diff?.type === "unchanged" ? "unchanged" : "context",
        diff,
      });
    } else {
      // Different lines - use the actual diff type
      let type: LineDiff["type"] = "modified";
      let diff: JsonDiff | undefined = undefined;
      
      if (rightDiff && rightDiff.type === "added") {
        type = "added";
        diff = rightDiff;
      } else if (leftDiff && leftDiff.type === "removed") {
        type = "removed";
        diff = leftDiff;
      } else if (leftDiff && leftDiff.type === "modified") {
        type = "modified";
        diff = leftDiff;
      } else if (rightDiff && rightDiff.type === "modified") {
        type = "modified";
        diff = rightDiff;
      } else {
        type = "modified";
        diff = leftDiff || rightDiff;
      }
      
      result.push({
        leftLine,
        rightLine,
        leftLineNumber: i + 1,
        rightLineNumber: i + 1,
        type,
        diff,
      });
    }
  }

  return result;
};

