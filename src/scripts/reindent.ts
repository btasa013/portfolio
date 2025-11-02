/**
 * Formats the code string to use a different indentation size.
 * @param code The code to be reindented.
 * @param spaces Indentation size.
 * @returns 
 */
export function reindent(code: string, spaces = 2) {
  
  const indent = " ".repeat(spaces);
  
  let indentSize = 1;
  let indentResolved = false;

  return code
    .replace(/\t/g, indent)
    .trim()
    .split("\n")
    .map(line => {
      
      const trimmedLine = line.trimStart();
      const lineIndent = line.length - trimmedLine.length;
      
      if (!indentResolved && lineIndent != 0) {
        indentSize = lineIndent;
        indentResolved = true;
      }

      const indentCount = Math.floor(lineIndent / indentSize);
      return indent.repeat(indentCount) + trimmedLine;
    })
    .join("\n");
}