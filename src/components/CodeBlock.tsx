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
    <div className="overflow-auto w-[250px] sm:w-[370px] md:w-[470px] lg:w-[700px]">
      <pre className="theme-atom-one-dark w-fit text-xs">
        <code ref={codeRef} className="language-csharp whitespace-pre rounded-xl">
            {code}
        </code>
    </pre>
    </div>
  );
}