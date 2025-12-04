import type { JsonValue } from "@/lib/treeBuilder";

type PathToLineMap = Map<string, number[]>;

/**
 * Maps JSON paths to line numbers in formatted JSON text.
 * This function analyzes the formatted text to find which lines correspond to which JSON paths.
 */
export const buildPathToLineMap = (jsonText: string, jsonValue: JsonValue | null): PathToLineMap => {
  const map: PathToLineMap = new Map();
  if (!jsonText || !jsonValue) return map;

  const lines = jsonText.split("\n");
  
  // Stack to track current path and indent level
  type StackItem = { path: string; indent: number; lineIndex: number };
  const stack: StackItem[] = [{ path: "root", indent: -1, lineIndex: -1 }];
  
  lines.forEach((line, lineIndex) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed === "{" || trimmed === "}" || trimmed === "[" || trimmed === "]") {
      return;
    }
    
    // Calculate indent level (number of spaces before content)
    const indent = line.match(/^(\s*)/)?.[1].length || 0;
    
    // Pop stack until we find matching indent level
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }
    
    const currentPath = stack[stack.length - 1].path;
    
    // Match key-value pairs: "key": value
    const keyMatch = trimmed.match(/^"([^"]+)"\s*:\s*(.+)$/);
    if (keyMatch) {
      const key = keyMatch[1];
      const value = keyMatch[2].trim();
      const newPath = currentPath === "root" ? key : `${currentPath}.${key}`;
      
      // Add this line to the map
      if (!map.has(newPath)) {
        map.set(newPath, []);
      }
      map.get(newPath)!.push(lineIndex);
      
      // If the value is an object or array, push to stack
      if (value === "{" || value === "[") {
        stack.push({ path: newPath, indent, lineIndex });
      }
      return;
    }
    
    // Match array values: "value" or value
    const arrayValueMatch = trimmed.match(/^"([^"]+)"\s*,?\s*$/);
    if (arrayValueMatch) {
      // This is an array element - we need to find the array path
      // The array path should be in the stack
      if (stack.length > 0) {
        const arrayPath = stack[stack.length - 1].path;
        // We need to determine the index of this element
        // Count how many array elements we've seen at this indent level
        let arrayIndex = 0;
        for (let i = stack[stack.length - 1].lineIndex + 1; i < lineIndex; i++) {
          const prevLine = lines[i].trim();
          if (prevLine && !prevLine.match(/^[{}[\]]/)) {
            // Check if it's at the same indent level
            const prevIndent = lines[i].match(/^(\s*)/)?.[1].length || 0;
            if (prevIndent === indent) {
              arrayIndex++;
            }
          }
        }
        
        const elementPath = `${arrayPath}.${arrayIndex}`;
        if (!map.has(elementPath)) {
          map.set(elementPath, []);
        }
        map.get(elementPath)!.push(lineIndex);
      }
      return;
    }
  });
  
  return map;
};

/**
 * Finds line numbers for a given JSON path in formatted text.
 */
export const findLinesForPath = (
  jsonText: string,
  path: string,
  jsonValue: JsonValue | null,
): number[] => {
  const map = buildPathToLineMap(jsonText, jsonValue);
  return map.get(path) || [];
};
