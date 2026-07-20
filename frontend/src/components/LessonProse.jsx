import React from 'react';

/** Lightweight lesson renderer: ## headings, lists, `code`, and fenced ``` blocks */
export default function LessonProse({ text }) {
  if (!text) return null;

  const blocks = [];
  const lines = String(text).replace(/\r\n/g, '\n').split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i += 1;
      continue;
    }

    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3).trim();
      const codeLines = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i += 1;
      }
      i += 1;
      blocks.push({ type: 'code', lang, code: codeLines.join('\n') });
      continue;
    }

    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3).trim() });
      i += 1;
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.slice(4).trim() });
      i += 1;
      continue;
    }

    if (/^[-*] /.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*] /.test(lines[i])) {
        items.push(lines[i].replace(/^[-*] /, ''));
        i += 1;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    if (/^\d+\. /.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ''));
        i += 1;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    const para = [];
    while (
      i < lines.length
      && lines[i].trim()
      && !lines[i].startsWith('## ')
      && !lines[i].startsWith('### ')
      && !lines[i].trim().startsWith('```')
      && !/^[-*] /.test(lines[i])
      && !/^\d+\. /.test(lines[i])
    ) {
      para.push(lines[i]);
      i += 1;
    }
    blocks.push({ type: 'p', text: para.join(' ') });
  }

  return (
    <div className="lms-prose">
      {blocks.map((b, idx) => {
        if (b.type === 'h2') return <h3 key={idx} className="lms-prose-h">{b.text}</h3>;
        if (b.type === 'h3') return <h4 key={idx} className="lms-prose-h3">{b.text}</h4>;
        if (b.type === 'code') {
          return (
            <pre key={idx} className="lms-inline-code"><code>{b.code}</code></pre>
          );
        }
        if (b.type === 'ul') {
          return (
            <ul key={idx} className="lms-prose-list">
              {b.items.map((item, j) => <li key={j}>{formatInline(item)}</li>)}
            </ul>
          );
        }
        if (b.type === 'ol') {
          return (
            <ol key={idx} className="lms-prose-list">
              {b.items.map((item, j) => <li key={j}>{formatInline(item)}</li>)}
            </ol>
          );
        }
        return <p key={idx} className="lms-prose-block">{formatInline(b.text)}</p>;
      })}
    </div>
  );
}

function formatInline(text) {
  const parts = String(text).split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="lms-inline">{part.slice(1, -1)}</code>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}
