import React, { useState } from 'react';

const DEFAULT_CODE = `// Try JavaScript here
const greet = (name) => \`Hello, \${name}!\`;
console.log(greet('eBodhi learner'));
`;

export default function CodeSandbox() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState('Run code to see output…');

  const run = () => {
    const logs = [];
    const fakeConsole = {
      log: (...args) => logs.push(args.map(String).join(' ')),
      error: (...args) => logs.push('Error: ' + args.map(String).join(' ')),
      warn: (...args) => logs.push('Warn: ' + args.map(String).join(' '))
    };
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function('console', code);
      fn(fakeConsole);
      setOutput(logs.join('\n') || '(no output)');
    } catch (err) {
      setOutput(String(err.message || err));
    }
  };

  return (
    <div className="sandbox-wrap" id="compiler">
      <div className="sandbox-toolbar">
        <strong>JS Playground</strong>
        <button type="button" className="btn btn-accent btn-sm" onClick={run}>Run</button>
      </div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} />
      <div className="sandbox-out">{output}</div>
    </div>
  );
}
