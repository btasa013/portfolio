"use client";

import dedent from "dedent";
import { useRef, useEffect } from "react";
import "highlight.js/styles/atom-one-dark.css";
import hljs from 'highlight.js/lib/core';
import csharp from 'highlight.js/lib/languages/csharp';

import { reindent } from "@/scripts/reindent";

hljs.registerLanguage('csharp', csharp);

interface CodeBlockProps {
  children: string;
}

export default function CodeBlock({ children }: CodeBlockProps) {

  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, []);

  const code = reindent(dedent(children));

  return (
    <pre className="theme-atom-one-dark w-fit lg:text-xs text-[1vw]">
        <code ref={codeRef} className="language-csharp whitespace-pre rounded-xl">
            {code}
        </code>
    </pre>
  );
}