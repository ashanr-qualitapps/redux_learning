import React, { useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const CodeBlock = ({ code, language, live = false, noInline = false, scope = {} }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block">
      {live ? (
        <LiveProvider code={code} scope={scope} noInline={noInline}>
          <div className="live-editor-container">
            <button 
              className={`copy-button ${copied ? 'copied' : ''}`}
              onClick={copyToClipboard}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <LiveEditor className="live-editor" />
          </div>
          <LiveError className="live-error" />
          <LivePreview className="live-preview" />
        </LiveProvider>
      ) : (
        <div className="live-editor-container">
          <button 
            className={`copy-button ${copied ? 'copied' : ''}`}
            onClick={copyToClipboard}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <pre className={`language-${language}`}>
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
