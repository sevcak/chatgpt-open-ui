import React, { useEffect, useState } from 'react';
import Prism from "../prism/prism.js";
import '../prism/prism.css';
import typewriter from '../textEffects/typewriter.js';

export default function Codeblock(props) {
  const [renderedCode, setRenderedCode] = useState("");
  const [copied, setCopied] = useState(false);
  
  // prop-dependent typewriter effect on render
  useEffect(() => {
    if (props.typewriter) {
      // this return makes it possible to call typewriter
      // only once in development builds
      return () => typewriter(props.children, setRenderedCode);
    } else {
      // if typewriter not used, just render right away
      setRenderedCode(props.children);
    }
  }, [props.children]);
  
  // highlights code on render and during typewriter effect 
  useEffect(() => {
    Prism.highlightAll();
  }, [renderedCode]);

  const handleClick = () => {
    setCopied(true);
  
    navigator.clipboard.writeText(props.children);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  return (
    <pre>
        <div className='flex justify-between text-sm py-1 px-4 -m-4 mb-4 bg-gray-700 text-gray-300 rounded-sm'>
          <div>{props.language}</div>
          <button onClick={handleClick}>{copied ? 'Copied' : 'Copy'}</button>
        </div>
        <code className={`language-${props.language}`}>
            {renderedCode}
        </code>
    </pre>
  );
}