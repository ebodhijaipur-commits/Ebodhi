/**
 * Generates richer Full Stack LMS curriculum with Try It demos.
 * Run: node backend/scripts/generateRichLms.js
 */
const fs = require('fs');
const path = require('path');

const q = (prompt, options, answerIndex, explanation) =>
  JSON.stringify({ prompt, options, answerIndex, explanation });

const out = [];
const push = (s) => out.push(s);

push(`const LMS_CONTENT_VERSION = 3;

const q = (prompt, options, answerIndex, explanation) => ({
  prompt, options, answerIndex, explanation
});

const tryIt = (id, title, description, { html = '', css = '', js = '' } = {}) => ({
  id, title, description, html, css, js
});

const chapter = ({
  id, title, order, track, summary, content, keyPoints, tryIt: tryIts,
  localBuild, example, questions, passScore = 70
}) => ({
  id, title, order, track, summary, content,
  keyPoints: keyPoints || [],
  tryIt: tryIts || [],
  localBuild: localBuild || { goal: '', commands: [], expectedUrl: '', checklist: [] },
  example: example || { title: '', code: '', explanation: '' },
  quiz: { passScore, questions }
});

const FULLSTACK_LMS_CHAPTERS = [
`);

// Helper to emit a chapter as JS source
function emitChapter(ch) {
  const esc = (s) => String(s || '').replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  const tryIts = (ch.tryIts || []).map((t) => `tryIt(${JSON.stringify(t.id)}, ${JSON.stringify(t.title)}, ${JSON.stringify(t.description)}, {
      html: \`${esc(t.html)}\`,
      css: \`${esc(t.css)}\`,
      js: \`${esc(t.js)}\`
    })`).join(',\n    ');

  const questions = (ch.questions || []).map((x) =>
    `q(${JSON.stringify(x.prompt)}, ${JSON.stringify(x.options)}, ${x.answerIndex}, ${JSON.stringify(x.explanation)})`
  ).join(',\n      ');

  const lb = ch.localBuild || {};
  const ex = ch.example || {};

  push(`  chapter({
    id: ${JSON.stringify(ch.id)},
    title: ${JSON.stringify(ch.title)},
    order: ${ch.order},
    track: ${JSON.stringify(ch.track)},
    summary: ${JSON.stringify(ch.summary)},
    content: \`
${esc(ch.content).trim()}
\`,
    keyPoints: ${JSON.stringify(ch.keyPoints || [], null, 2).replace(/\n/g, '\n    ')},
    tryIt: [
    ${tryIts}
    ],
    localBuild: {
      goal: ${JSON.stringify(lb.goal || '')},
      commands: ${JSON.stringify(lb.commands || [])},
      expectedUrl: ${JSON.stringify(lb.expectedUrl || '')},
      checklist: ${JSON.stringify(lb.checklist || [])}
    },
    example: {
      title: ${JSON.stringify(ex.title || '')},
      code: \`${esc(ex.code)}\`,
      explanation: ${JSON.stringify(ex.explanation || '')}
    },
    questions: [
      ${questions}
    ]
  }),
`);
}

const chapters = [
  {
    id: 'fs-s1', title: 'Web & HTML foundations', order: 1, track: 'shared',
    summary: 'Understand how the web works and build your first HTML page — then try it live in the editor.',
    content: `## What is the World Wide Web?

The web is a giant network of documents and apps. Your **browser** (Chrome, Edge, Firefox) is the client. It asks a **server** for a page, then shows HTML structure, CSS styles, and JavaScript behavior.

While learning, you do not need a real server. You can open an \`.html\` file directly on your computer — just like W3Schools examples run in a browser.

## What is HTML?

HTML means **HyperText Markup Language**. It describes the *structure* of a page:
- Headings and paragraphs
- Links and images
- Lists, tables, and forms

HTML uses **tags**. Most tags come in pairs: an opening tag and a closing tag.

\`\`\`html
<h1>This is a heading</h1>
<p>This is a paragraph.</p>
\`\`\`

## Anatomy of an HTML document

Every modern page should include:

1. \`<!DOCTYPE html>\` — tells the browser this is HTML5
2. \`<html>\` — the root element
3. \`<head>\` — metadata (title, charset) — not shown as page content
4. \`<body>\` — everything the user sees

### Common beginner mistakes
- Forgetting to close tags
- Putting visible text only in \`<head>\`
- Skipping \`charset="UTF-8"\` (strange characters can appear)

## Practice mindset

Read an example → change one thing → Run → observe. That loop is how you learn HTML fast.`,
    keyPoints: [
      'HTML describes structure, not styling or server logic',
      '<!DOCTYPE html> enables modern HTML5 mode',
      'Visible content belongs in <body>',
      '<title> appears in the browser tab',
      'You can open .html files locally without a server'
    ],
    tryIts: [
      {
        id: 's1-hello',
        title: 'Try it: Your first HTML page',
        description: 'Change the heading text, add another paragraph, then click Run.',
        html: `<h1>Hello eBodhi</h1>
<p>I am learning HTML — just like on W3Schools.</p>
<p>Edit this text and click <strong>Run</strong>.</p>
<a href="https://www.w3schools.com/html/" target="_blank">HTML tutorial reference</a>`,
        css: `body { font-family: Arial, sans-serif; padding: 8px; }
h1 { color: #0b2a8f; }
a { color: #1d4ed8; }`,
        js: ''
      },
      {
        id: 's1-lists',
        title: 'Try it: Headings & lists',
        description: 'Experiment with h1–h3 and ordered/unordered lists.',
        html: `<h1>My Learning Plan</h1>
<h2>Today</h2>
<ul>
  <li>HTML structure</li>
  <li>Open files locally</li>
</ul>
<h2>This week</h2>
<ol>
  <li>CSS layout</li>
  <li>JavaScript basics</li>
</ol>`,
        css: `body { font-family: Georgia, serif; line-height: 1.5; }
h1 { border-bottom: 3px solid #f59e0b; padding-bottom: 6px; }
li { margin: 4px 0; }`,
        js: ''
      }
    ],
    localBuild: {
      goal: 'Create index.html on your computer and open it in a browser.',
      commands: ['mkdir fullstack-lab && cd fullstack-lab', 'code index.html'],
      expectedUrl: 'file:///…/fullstack-lab/index.html or Live Server http://127.0.0.1:5500',
      checklist: ['Folder exists', 'index.html opens in browser', 'Heading and paragraph visible']
    },
    example: {
      title: 'Minimal HTML document',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My First Page</title>
</head>
<body>
  <h1>Hello eBodhi</h1>
  <p>I am learning full stack locally.</p>
</body>
</html>`,
      explanation: 'Save as index.html and open it. The tab title comes from <title>; the heading comes from <body>.'
    },
    questions: [
      { prompt: 'What does HTML primarily describe?', options: ['Database schemas', 'Page structure', 'Server CPU usage', 'DNS records'], answerIndex: 1, explanation: 'HTML is markup for document structure.' },
      { prompt: 'Which tag wraps visible page content?', options: ['<head>', '<meta>', '<body>', '<title>'], answerIndex: 2, explanation: 'Visible content lives in <body>.' },
      { prompt: 'Why include <!DOCTYPE html>?', options: ['It styles the page', 'It tells the browser to use HTML5 standards mode', 'It connects MongoDB', 'It starts Node'], answerIndex: 1, explanation: 'DOCTYPE enables modern HTML5 mode.' },
      { prompt: 'Can you learn HTML without a server?', options: ['No', 'Yes — open local .html files', 'Only with React', 'Only with Next.js'], answerIndex: 1, explanation: 'Browsers can open local HTML files.' },
      { prompt: 'Where does the page title show?', options: ['In <body>', 'In the tab via <title>', 'In CSS only', 'In JWT'], answerIndex: 1, explanation: '<title> lives in <head> and appears in the tab.' }
    ]
  },
  {
    id: 'fs-s2', title: 'Semantic HTML & forms', order: 2, track: 'shared',
    summary: 'Use meaningful tags and build accessible forms that collect user input correctly.',
    content: `## Why semantic HTML?

Semantic tags describe **meaning**:
- \`<header>\`, \`<nav>\`, \`<main>\`, \`<section>\`, \`<article>\`, \`<footer>\`

Screen readers and search engines understand these landmarks better than a sea of \`<div>\` tags.

## Forms — how data is collected

A form needs:
- \`<form>\` wrapper
- \`<label>\` linked to inputs with \`for\` / \`id\`
- Inputs with a \`name\` (this is the key when data is sent)
- A submit button

### Useful input types
- \`text\`, \`email\`, \`password\`, \`number\`
- \`checkbox\`, \`radio\`
- \`textarea\` for longer messages

### Accessibility tip
Always click the label — the matching input should focus. If it does not, your \`for\`/\`id\` pairing is wrong.`,
    keyPoints: [
      '<main> marks primary page content',
      'Labels must connect to inputs via for/id',
      'name attributes identify submitted fields',
      'type="email" + required help basic validation',
      'Prefer semantic tags over empty divs when meaning exists'
    ],
    tryIts: [
      {
        id: 's2-form',
        title: 'Try it: Contact form',
        description: 'Click labels, change required fields, then submit (page may reload — that is normal for method=get).',
        html: `<form action="#" method="get">
  <h2>Contact us</h2>
  <label for="name">Name</label>
  <input id="name" name="name" type="text" required />

  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="msg">Message</label>
  <textarea id="msg" name="message" rows="4"></textarea>

  <button type="submit">Send</button>
</form>`,
        css: `body { font-family: Arial, sans-serif; }
form { display: grid; gap: 8px; max-width: 360px; }
input, textarea, button { padding: 8px; font: inherit; }
button { background: #0b2a8f; color: #fff; border: 0; cursor: pointer; }`,
        js: ''
      }
    ],
    localBuild: {
      goal: 'Build contact.html with a labeled form.',
      commands: ['code contact.html'],
      expectedUrl: 'file:///…/contact.html',
      checklist: ['Name, email, message fields', 'Labels are clickable', 'Submit button exists']
    },
    example: {
      title: 'Labeled contact form',
      code: `<form action="#" method="get">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />
  <button type="submit">Send</button>
</form>`,
      explanation: 'for/id pairing makes forms accessible. required blocks empty email in modern browsers.'
    },
    questions: [
      { prompt: 'Best element for primary page content?', options: ['<div id="main">', '<main>', '<span>', '<script>'], answerIndex: 1, explanation: '<main> is the semantic landmark.' },
      { prompt: 'Why use label for="email" with input id="email"?', options: ['Faster CSS', 'Clicking the label focuses the input', 'Encrypts data', 'Creates a route'], answerIndex: 1, explanation: 'Label association improves accessibility.' },
      { prompt: 'Which attribute names the submitted field?', options: ['class', 'name', 'style', 'href'], answerIndex: 1, explanation: 'name is the key in form data.' },
      { prompt: 'Which input type suits email?', options: ['type="text" only', 'type="email"', 'type="file"', 'type="range"'], answerIndex: 1, explanation: 'email type enables mobile keyboards and basic checks.' },
      { prompt: 'Semantic tags help mainly with…', options: ['GPU speed', 'Meaning, a11y, and SEO', 'Mongo indexes', 'JWT expiry'], answerIndex: 1, explanation: 'Semantics communicate structure and meaning.' }
    ]
  },
  {
    id: 'fs-s3', title: 'CSS box model & layout', order: 3, track: 'shared',
    summary: 'Master content, padding, border, and margin — the foundation of every layout.',
    content: `## What is CSS?

CSS (Cascading Style Sheets) controls **look and layout**: colors, spacing, fonts, and positioning.

## The box model

Every element is a box:

1. **Content** — text/image size
2. **Padding** — space inside the border
3. **Border** — the edge
4. **Margin** — space outside the border

### box-sizing: border-box

With \`box-sizing: border-box\`, width includes padding and border. This makes layouts predictable — most modern projects set it globally.

## Display basics
- \`block\` — starts on a new line (div, p, h1)
- \`inline\` — flows with text (span, a)
- \`inline-block\` — inline flow but accepts width/height`,
    keyPoints: [
      'Box model = content + padding + border + margin',
      'margin is outside; padding is inside',
      'border-box makes width calculations easier',
      'block vs inline changes layout flow',
      'Use classes for reusable styles'
    ],
    tryIts: [
      {
        id: 's3-box',
        title: 'Try it: Box model visual',
        description: 'Change padding, border, and margin values and watch the box grow.',
        html: `<div class="box">I am a CSS box</div>
<p>Edit padding / margin in the CSS tab, then Run.</p>`,
        css: `body { font-family: Arial, sans-serif; }
.box {
  width: 220px;
  padding: 20px;
  border: 6px solid #0b2a8f;
  margin: 24px;
  background: #fef3c7;
  box-sizing: border-box;
}`,
        js: ''
      }
    ],
    localBuild: {
      goal: 'Create styles.css and link it from index.html.',
      commands: ['code styles.css', '<!-- in HTML: <link rel="stylesheet" href="styles.css" /> -->'],
      expectedUrl: 'file:///…/index.html',
      checklist: ['CSS file linked', 'Padding/margin visible', 'box-sizing experimented']
    },
    example: {
      title: 'Global border-box',
      code: `*, *::before, *::after { box-sizing: border-box; }
.card { width: 300px; padding: 16px; border: 2px solid #ccc; }`,
      explanation: 'With border-box, the card stays 300px wide including padding and border.'
    },
    questions: [
      { prompt: 'Padding is…', options: ['Outside the border', 'Inside the border', 'Only for flex', 'A Node package'], answerIndex: 1, explanation: 'Padding sits between content and border.' },
      { prompt: 'Margin is…', options: ['Inside content', 'Outside the border', 'A JS method', 'HTML attribute'], answerIndex: 1, explanation: 'Margin is outside the border.' },
      { prompt: 'border-box means width includes…', options: ['Only content', 'Content + padding + border', 'Only margin', 'Fonts only'], answerIndex: 1, explanation: 'border-box includes padding and border in width.' },
      { prompt: 'Which is typically block-level?', options: ['<span>', '<a>', '<div>', '<img> always'], answerIndex: 2, explanation: 'div is block by default.' },
      { prompt: 'Best way to reuse styles?', options: ['Inline only', 'CSS classes', 'Duplicate IDs', 'JWT'], answerIndex: 1, explanation: 'Classes are reusable selectors.' }
    ]
  },
  {
    id: 'fs-s4', title: 'Flexbox & responsive CSS', order: 4, track: 'shared',
    summary: 'Align items in rows/columns and make layouts adapt to phone and desktop.',
    content: `## Flexbox in one sentence

Flexbox lets a container distribute space among children along a row or column.

### Key properties
- \`display: flex\` on the parent
- \`justify-content\` — main axis alignment
- \`align-items\` — cross axis alignment
- \`gap\` — spacing between items
- \`flex-wrap: wrap\` — allow wrapping on small screens

## Responsive CSS

Use **media queries** to change styles at breakpoints:

\`\`\`css
@media (max-width: 700px) {
  .row { flex-direction: column; }
}
\`\`\`

Mobile-first tip: design simple single-column layouts first, then enhance for larger screens.`,
    keyPoints: [
      'Flex applies to the parent container',
      'justify-content vs align-items are different axes',
      'gap replaces many margin hacks',
      'flex-wrap helps small screens',
      'Media queries adapt layouts by viewport width'
    ],
    tryIts: [
      {
        id: 's4-flex',
        title: 'Try it: Flex row',
        description: 'Change justify-content to center, space-between, or space-around.',
        html: `<div class="row">
  <div class="item">A</div>
  <div class="item">B</div>
  <div class="item">C</div>
</div>`,
        css: `.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #e2e8f0;
}
.item {
  background: #0b2a8f;
  color: #fff;
  padding: 16px 22px;
  border-radius: 8px;
  font-weight: bold;
}`,
        js: ''
      }
    ],
    localBuild: {
      goal: 'Build a responsive nav with flex and a media query.',
      commands: ['code styles.css'],
      expectedUrl: 'http://127.0.0.1:5500',
      checklist: ['Flex row on desktop', 'Stacks on narrow width', 'Gap used instead of only margins']
    },
    example: {
      title: 'Responsive flex',
      code: `.row { display: flex; gap: 12px; }
@media (max-width: 600px) {
  .row { flex-direction: column; }
}`,
      explanation: 'On narrow screens the row becomes a column.'
    },
    questions: [
      { prompt: 'display:flex is set on…', options: ['Only children', 'The parent container', 'html only', 'Node'], answerIndex: 1, explanation: 'Flex formatting context starts on the parent.' },
      { prompt: 'justify-content controls…', options: ['Font size', 'Main-axis alignment', 'Database joins', 'JWT'], answerIndex: 1, explanation: 'Main axis distribution.' },
      { prompt: 'flex-wrap: wrap allows…', options: ['Hiding CSS', 'Items to wrap to next line', 'Mongo backups', 'CORS'], answerIndex: 1, explanation: 'Wrapping prevents overflow.' },
      { prompt: 'Media queries help with…', options: ['Responsive layouts', 'Creating databases', 'SSH keys', 'npm publish'], answerIndex: 0, explanation: 'They adapt CSS by conditions like width.' },
      { prompt: 'gap in flexboxes adds…', options: ['Borders only', 'Space between items', 'Server ports', 'HTML semantics'], answerIndex: 1, explanation: 'gap spaces flex/grid children.' }
    ]
  },
  {
    id: 'fs-s5', title: 'JavaScript basics', order: 5, track: 'shared',
    summary: 'Variables, types, operators, and functions — the language of browser interactivity.',
    content: `## What can JavaScript do?

JavaScript makes pages interactive: buttons respond, data updates, content changes without a full reload.

## Variables
- \`const\` — value should not be reassigned
- \`let\` — value can change
- Avoid \`var\` in modern code

## Types you will use daily
- Number, String, Boolean
- Array, Object
- null / undefined

## Functions

Functions package reusable logic:

\`\`\`js
function greet(name) {
  return 'Hello ' + name;
}
\`\`\`

Prefer clear names. Start small: one function, one job.`,
    keyPoints: [
      'const vs let: reassignment rules',
      'JS runs in the browser console and in <script>',
      'Functions take inputs (parameters) and can return values',
      'Arrays store lists; objects store keyed data',
      'Practice in the Try it editor before local files'
    ],
    tryIts: [
      {
        id: 's5-js',
        title: 'Try it: Variables & functions',
        description: 'Change the name and age, then Run to update the output.',
        html: `<h2>JS Basics</h2>
<p id="out">Loading…</p>
<button id="btn">Greet again</button>`,
        css: `body { font-family: Arial, sans-serif; }
button { padding: 8px 12px; background: #0b2a8f; color: #fff; border: 0; cursor: pointer; }`,
        js: `const name = 'Learner';
let age = 20;

function greet(person) {
  return 'Hello, ' + person + '! Age: ' + age;
}

const out = document.getElementById('out');
out.textContent = greet(name);

document.getElementById('btn').onclick = function () {
  age = age + 1;
  out.textContent = greet(name) + ' (age increased)';
};`
      }
    ],
    localBuild: {
      goal: 'Create app.js and link it with <script src="app.js"></script>.',
      commands: ['code app.js'],
      expectedUrl: 'file:///…/index.html',
      checklist: ['Script linked at end of body', 'Console.log works', 'Function returns a value']
    },
    example: {
      title: 'const / let',
      code: `const course = 'Full Stack';
let progress = 0;
progress = 10;
console.log(course, progress);`,
      explanation: 'course cannot be reassigned; progress can.'
    },
    questions: [
      { prompt: 'Which keyword prevents reassignment?', options: ['let', 'const', 'var only', 'function'], answerIndex: 1, explanation: 'const cannot be reassigned.' },
      { prompt: 'JavaScript in pages is mainly for…', options: ['Styling only', 'Interactivity and logic', 'DNS', 'Photoshop'], answerIndex: 1, explanation: 'JS adds behavior.' },
      { prompt: 'An array is best for…', options: ['Ordered lists of values', 'CSS colors only', 'HTML doctype', 'SSL'], answerIndex: 0, explanation: 'Arrays store ordered collections.' },
      { prompt: 'A function can…', options: ['Only style pages', 'Accept parameters and return values', 'Replace MongoDB', 'Issue SSL certs'], answerIndex: 1, explanation: 'Functions encapsulate logic.' },
      { prompt: 'Where should you often place <script src>?', options: ['Before <html>', 'End of <body>', 'Inside CSS', 'In JWT'], answerIndex: 1, explanation: 'End of body ensures DOM is ready.' }
    ]
  },
  {
    id: 'fs-s6', title: 'DOM & events', order: 6, track: 'shared',
    summary: 'Select elements, listen for clicks/input, and update the page dynamically.',
    content: `## What is the DOM?

The DOM (Document Object Model) is the browser’s live tree of your HTML. JavaScript can:
- Find elements (\`querySelector\`, \`getElementById\`)
- Change text and styles
- Create/remove elements
- React to events (click, input, submit)

## Events

\`\`\`js
button.addEventListener('click', () => {
  // runs when clicked
});
\`\`\`

### Common events
- click, input, change, submit, keydown

## Golden rule
Select the element → add a listener → update the DOM in the handler.`,
    keyPoints: [
      'DOM is the live HTML tree in memory',
      'querySelector finds elements with CSS selectors',
      'addEventListener is preferred over inline onclick in apps',
      'event.preventDefault() stops form reload when needed',
      'Always check that an element exists before using it'
    ],
    tryIts: [
      {
        id: 's6-dom',
        title: 'Try it: Click counter',
        description: 'Click the button, then extend the code to add a Reset button.',
        html: `<h2>DOM Events</h2>
<p>Clicks: <strong id="count">0</strong></p>
<button id="inc">Click me</button>`,
        css: `body { font-family: Arial, sans-serif; }
button { padding: 10px 14px; background: #f59e0b; border: 0; font-weight: bold; cursor: pointer; }`,
        js: `let n = 0;
const count = document.getElementById('count');
document.getElementById('inc').addEventListener('click', () => {
  n += 1;
  count.textContent = n;
});`
      }
    ],
    localBuild: {
      goal: 'Build a tiny interactive page with a button that updates text.',
      commands: ['code index.html app.js'],
      expectedUrl: 'http://127.0.0.1:5500',
      checklist: ['Click updates the DOM', 'No page reload', 'Listener uses addEventListener']
    },
    example: {
      title: 'Input event',
      code: `const input = document.querySelector('#name');
const out = document.querySelector('#out');
input.addEventListener('input', () => {
  out.textContent = 'Hello, ' + input.value;
});`,
      explanation: 'Each keystroke updates the preview text.'
    },
    questions: [
      { prompt: 'DOM stands for…', options: ['Data Object Module', 'Document Object Model', 'Disk Output Map', 'Deploy Only Mode'], answerIndex: 1, explanation: 'Document Object Model.' },
      { prompt: 'querySelector uses…', options: ['SQL', 'CSS selectors', 'SSH', 'Regex only'], answerIndex: 1, explanation: 'It accepts CSS selector strings.' },
      { prompt: 'addEventListener attaches…', options: ['CSS files', 'Event handlers', 'Mongo schemas', 'Docker'], answerIndex: 1, explanation: 'It registers event callbacks.' },
      { prompt: 'preventDefault on submit is used to…', options: ['Style buttons', 'Stop default form navigation/reload', 'Create indexes', 'Hash passwords'], answerIndex: 1, explanation: 'Stops the browser default action.' },
      { prompt: 'textContent updates…', options: ['Server RAM', 'The element’s text in the DOM', 'DNS cache', 'npm'], answerIndex: 1, explanation: 'It changes visible text nodes.' }
    ]
  },
  {
    id: 'fs-s7', title: 'ES6+ & async JS', order: 7, track: 'shared',
    summary: 'Arrow functions, destructuring, modules mindset, promises, and async/await.',
    content: `## Modern JavaScript (ES6+)

Features you will see in React/Node codebases:
- Arrow functions: \`const add = (a, b) => a + b\`
- Template literals: \`Hello \${name}\`
- Destructuring: \`const { title } = course\`
- Spread: \`[...items]\`
- \`import\` / \`export\` in modules

## Async JavaScript

Some work takes time (fetching APIs). Promises represent a future value.

\`\`\`js
async function load() {
  const res = await fetch('/api/courses');
  const data = await res.json();
  return data;
}
\`\`\`

### Remember
\`await\` pauses inside an \`async\` function until the Promise settles. Always handle errors with try/catch.`,
    keyPoints: [
      'Arrow functions are concise function syntax',
      'Template literals embed expressions in strings',
      'Promises model async success/failure',
      'async/await makes async code readable',
      'Always handle fetch errors'
    ],
    tryIts: [
      {
        id: 's7-async',
        title: 'Try it: Fake async delay',
        description: 'Click Load to simulate waiting for data with async/await.',
        html: `<button id="load">Load data</button>
<pre id="out">Waiting…</pre>`,
        css: `body { font-family: Arial, sans-serif; }
button { padding: 8px 12px; background: #0b2a8f; color: #fff; border: 0; cursor: pointer; }
pre { background: #f1f5f9; padding: 12px; }`,
        js: `function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadData() {
  const out = document.getElementById('out');
  out.textContent = 'Loading…';
  await wait(800);
  const courses = ['Full Stack', 'Data Science', 'Digital Marketing'];
  out.textContent = JSON.stringify(courses, null, 2);
}

document.getElementById('load').onclick = () => {
  loadData().catch((err) => {
    document.getElementById('out').textContent = err.message;
  });
};`
      }
    ],
    localBuild: {
      goal: 'Write an async function that awaits a Promise and logs the result.',
      commands: ['node', '# then paste a small async demo in the Node REPL'],
      expectedUrl: 'terminal / browser console',
      checklist: ['Used async function', 'Used await', 'Handled errors with try/catch or .catch']
    },
    example: {
      title: 'async/await',
      code: `async function main() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
main();`,
      explanation: 'await pauses until the fetch Promise resolves.'
    },
    questions: [
      { prompt: 'await can be used inside…', options: ['Any function', 'async functions', 'CSS only', 'HTML comments'], answerIndex: 1, explanation: 'await requires async context.' },
      { prompt: 'A Promise represents…', options: ['A CSS rule', 'A future completion value', 'A Mongo index', 'A port number'], answerIndex: 1, explanation: 'Promises wrap async results.' },
      { prompt: 'Template literal example…', options: ['"Hi " + name', '`Hi ${name}`', 'html.hi', 'flex: 1'], answerIndex: 1, explanation: 'Backticks enable interpolation.' },
      { prompt: 'Destructuring helps you…', options: ['Extract values from objects/arrays', 'Deploy Docker', 'Buy domains', 'Style SVG'], answerIndex: 0, explanation: 'It unpacks properties/items.' },
      { prompt: 'Why try/catch with await?', options: ['Faster CPU', 'Handle rejected promises/errors', 'Create HTML', 'Skip npm'], answerIndex: 1, explanation: 'Failed async work throws/rejects.' }
    ]
  },
  {
    id: 'fs-s8', title: 'Git, npm & local project workflow', order: 8, track: 'shared',
    summary: 'Use Git for history and npm scripts to run projects on localhost.',
    content: `## Why Git?

Git tracks changes so you can experiment safely and collaborate.

Essential commands:
- \`git init\` / \`git clone\`
- \`git status\`
- \`git add .\`
- \`git commit -m "message"\`

## Why npm?

npm installs packages and runs scripts defined in \`package.json\`:

\`\`\`json
{
  "scripts": {
    "dev": "vite",
    "start": "node server.js"
  }
}
\`\`\`

Then: \`npm run dev\` → often opens \`http://localhost:5173\` or similar.

## Localhost mindset

Full stack work means **many terminals**:
- Frontend dev server
- Backend API server
- Maybe database (Atlas cloud or local Mongo)

This chapter prepares you to choose React or Next.js next.`,
    keyPoints: [
      'Git records snapshots (commits)',
      'package.json lists dependencies and scripts',
      'npm install downloads packages',
      'npm run dev starts local servers',
      'localhost URLs are your daily workspace'
    ],
    tryIts: [
      {
        id: 's8-scripts',
        title: 'Try it: Visualize package scripts',
        description: 'A tiny UI explaining npm scripts — edit the script names and Run.',
        html: `<h2>package.json scripts</h2>
<ul id="list"></ul>
<p>In real projects these run in your terminal with <code>npm run …</code></p>`,
        css: `body { font-family: Arial, sans-serif; }
code { background: #e2e8f0; padding: 2px 6px; }
li { margin: 6px 0; }`,
        js: `const scripts = {
  dev: 'vite --port 5173',
  start: 'node server.js',
  seed: 'node seed.js'
};
const list = document.getElementById('list');
list.innerHTML = Object.entries(scripts)
  .map(([name, cmd]) => '<li><strong>' + name + '</strong> → <code>' + cmd + '</code></li>')
  .join('');`
      }
    ],
    localBuild: {
      goal: 'Create a folder, npm init, and add a sample script.',
      commands: ['mkdir demo && cd demo', 'npm init -y', 'npm pkg set scripts.hello="node -e \\"console.log(\'hi\')\\""', 'npm run hello'],
      expectedUrl: 'terminal output: hi',
      checklist: ['package.json exists', 'npm run hello works', 'git init optional practice']
    },
    example: {
      title: 'Minimal package.json scripts',
      code: `{
  "name": "demo",
  "scripts": {
    "hello": "node -e \\"console.log('hi')\\""
  }
}`,
      explanation: 'npm run hello executes the script string.'
    },
    questions: [
      { prompt: 'git commit saves…', options: ['npm cache', 'A snapshot of staged changes', 'CSS only', 'Atlas billing'], answerIndex: 1, explanation: 'Commits record project snapshots.' },
      { prompt: 'npm install reads…', options: ['Dockerfile only', 'package.json dependencies', 'HTML titles', 'JWT secret'], answerIndex: 1, explanation: 'Dependencies are declared in package.json.' },
      { prompt: 'npm run dev typically…', options: ['Deletes Git', 'Starts a local development server', 'Buys a domain', 'Formats Mongo'], answerIndex: 1, explanation: 'dev scripts start local servers.' },
      { prompt: 'localhost means…', options: ['A remote CDN', 'Your own computer as the server', 'Only production', 'Email host'], answerIndex: 1, explanation: 'localhost is the local machine.' },
      { prompt: 'Why use Git as a beginner?', options: ['It styles pages', 'Undo/experiment safely and track history', 'It replaces HTML', 'It is a database'], answerIndex: 1, explanation: 'Version control enables safe iteration.' }
    ]
  }
];

// Track chapters - richer but slightly shorter tryIts
const reactNextBackend = [
  {
    id: 'fs-r1', title: 'Vite + React setup locally', order: 9, track: 'react',
    summary: 'Scaffold a React app with Vite and run it on localhost.',
    content: `## Why Vite + React?

Vite starts fast and gives a modern React workspace. You develop on \`http://localhost:5173\` with instant Hot Module Replacement.

## Create the app

\`\`\`bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
\`\`\`

### What you get
- \`src/App.jsx\` — main component
- \`src/main.jsx\` — ReactDOM entry
- \`index.html\` — Vite HTML shell

Edit \`App.jsx\`, save, and the browser updates.`,
    keyPoints: [
      'Vite is the build tool / dev server',
      'npm run dev serves localhost',
      'Components are functions returning JSX',
      'Save files to see hot reload',
      'Keep projects outside OneDrive sync folders if installs fail'
    ],
    tryIts: [
      {
        id: 'r1-jsx-idea',
        title: 'Try it: JSX-like rendering idea',
        description: 'React JSX compiles to calls that build UI. This demo updates the DOM from a component-like function.',
        html: `<div id="root"></div>`,
        css: `#root { font-family: Arial, sans-serif; padding: 8px; }
.card { border: 2px solid #0b2a8f; padding: 12px; border-radius: 10px; }`,
        js: `function App() {
  const title = 'My Vite + React App';
  return '<div class="card"><h1>' + title + '</h1><p>Components return UI.</p></div>';
}
document.getElementById('root').innerHTML = App();`
      }
    ],
    localBuild: {
      goal: 'Create and run a Vite React app locally.',
      commands: ['npm create vite@latest my-react-app -- --template react', 'cd my-react-app', 'npm install', 'npm run dev'],
      expectedUrl: 'http://localhost:5173',
      checklist: ['Dev server running', 'Default Vite page loads', 'Changed App.jsx and saw update']
    },
    example: {
      title: 'App.jsx starter',
      code: `export default function App() {
  return <h1>Hello React</h1>;
}`,
      explanation: 'A component is a function returning JSX.'
    },
    questions: [
      { prompt: 'Vite’s npm run dev usually serves…', options: ['Port 25', 'localhost (often 5173)', 'Only production CDN', 'MongoDB'], answerIndex: 1, explanation: 'Vite defaults to a localhost port like 5173.' },
      { prompt: 'React components typically…', options: ['Return JSX', 'Replace CSS entirely', 'Are SQL tables', 'Are SSL certs'], answerIndex: 0, explanation: 'Components return JSX UI.' },
      { prompt: 'Hot Module Replacement means…', options: ['DB failover', 'Updates UI on save without full refresh', 'Git rebase', 'DNS change'], answerIndex: 1, explanation: 'HMR refreshes modules live.' },
      { prompt: 'main.jsx is usually…', options: ['The CSS reset', 'The ReactDOM entry that mounts <App />', 'The Express server', 'A Dockerfile'], answerIndex: 1, explanation: 'It mounts the React tree.' },
      { prompt: 'npm create vite scaffolds…', options: ['A phone', 'A project template', 'Atlas users', 'Only Python'], answerIndex: 1, explanation: 'It creates a starter project.' }
    ]
  },
  {
    id: 'fs-r2', title: 'Components, JSX & props', order: 10, track: 'react',
    summary: 'Split UI into components and pass data downward with props.',
    content: `## Components

A component is a reusable UI piece — button, card, navbar.

## JSX

JSX looks like HTML inside JavaScript. Use \`className\` instead of \`class\`, and \`{}\` for expressions.

## Props

Props are inputs to a component:

\`\`\`jsx
function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}
<Welcome name="Asha" />
\`\`\`

Props are read-only. To change data over time, you will use state next.`,
    keyPoints: [
      'One component = one reusable UI unit',
      'Props pass data parent → child',
      'className replaces class in JSX',
      'Wrap multiple elements in a parent or fragment',
      'Keep components small and focused'
    ],
    tryIts: [
      {
        id: 'r2-props',
        title: 'Try it: Props-like cards',
        description: 'Edit the people array to pass different “props” into a card renderer.',
        html: `<div id="root"></div>`,
        css: `.card { border: 1px solid #cbd5e1; padding: 12px; margin: 8px 0; border-radius: 8px; }
h3 { margin: 0 0 6px; color: #0b2a8f; }`,
        js: `function Card(props) {
  return '<article class="card"><h3>' + props.title + '</h3><p>' + props.body + '</p></article>';
}
const people = [
  { title: 'Asha', body: 'Learning React props' },
  { title: 'Ravi', body: 'Building components' }
];
document.getElementById('root').innerHTML = people.map(Card).join('');`
      }
    ],
    localBuild: {
      goal: 'Create a Welcome component and use it in App.jsx with a name prop.',
      commands: ['code src/Welcome.jsx', 'code src/App.jsx'],
      expectedUrl: 'http://localhost:5173',
      checklist: ['Component file created', 'Prop displayed', 'Reused component twice']
    },
    example: {
      title: 'Props',
      code: `function Badge({ label }) {
  return <span className="badge">{label}</span>;
}`,
      explanation: 'label is a prop.'
    },
    questions: [
      { prompt: 'Props are…', options: ['Parent-to-child inputs', 'CSS files', 'Mongo collections', 'Linux users'], answerIndex: 0, explanation: 'Props configure child components.' },
      { prompt: 'In JSX, CSS class becomes…', options: ['class', 'className', 'klass', 'styleName'], answerIndex: 1, explanation: 'className maps to class.' },
      { prompt: 'Should a child mutate props?', options: ['Yes always', 'No — treat props as read-only', 'Only on Sundays', 'Only in CSS'], answerIndex: 1, explanation: 'Data updates use state/lifting.' },
      { prompt: 'JSX expressions use…', options: ['[]', '{}', '<> only', 'SQL'], answerIndex: 1, explanation: 'Curly braces embed JS.' },
      { prompt: 'Components help you…', options: ['Reuse UI pieces', 'Avoid HTML forever', 'Skip Git', 'Replace databases'], answerIndex: 0, explanation: 'Reuse and organization.' }
    ]
  },
  {
    id: 'fs-r3', title: 'State, lists & forms', order: 11, track: 'react',
    summary: 'useState for interactive UI, render lists, and control form inputs.',
    content: `## useState

State is data that changes over time:

\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`

Calling \`setCount\` re-renders the component.

## Lists

Use \`map\` and provide a stable \`key\`:

\`\`\`jsx
{items.map((item) => <li key={item.id}>{item.text}</li>)}
\`\`\`

## Controlled inputs

Input value comes from state; \`onChange\` updates state. This is the React form pattern.`,
    keyPoints: [
      'useState returns [value, setter]',
      'Updating state re-renders the component',
      'List keys should be stable ids',
      'Controlled inputs store value in state',
      'Never call hooks inside loops/conditions'
    ],
    tryIts: [
      {
        id: 'r3-state',
        title: 'Try it: Mini state (useState idea)',
        description: 'This mirrors React state: data changes → UI re-renders.',
        html: `<h2>Counter</h2>
<p id="n">0</p>
<button id="up">+1</button>
<button id="down">-1</button>`,
        css: `button { margin-right: 8px; padding: 8px 12px; cursor: pointer; }
#n { font-size: 2rem; color: #0b2a8f; }`,
        js: `let count = 0;
const n = document.getElementById('n');
function render() { n.textContent = count; }
document.getElementById('up').onclick = () => { count += 1; render(); };
document.getElementById('down').onclick = () => { count -= 1; render(); };`
      }
    ],
    localBuild: {
      goal: 'Build a counter and a controlled text input in React.',
      commands: ['code src/App.jsx'],
      expectedUrl: 'http://localhost:5173',
      checklist: ['Counter works', 'Input shows typed text', 'List renders with keys']
    },
    example: {
      title: 'Controlled input',
      code: `const [text, setText] = useState('');
<input value={text} onChange={(e) => setText(e.target.value)} />`,
      explanation: 'React state is the single source of truth for the input.'
    },
    questions: [
      { prompt: 'useState is used for…', options: ['Routing only', 'Interactive component data', 'Mongo schemas', 'DNS'], answerIndex: 1, explanation: 'State holds changing UI data.' },
      { prompt: 'List keys should be…', options: ['Random every render', 'Stable unique ids', 'Always array index forever', 'CSS classes'], answerIndex: 1, explanation: 'Stable keys help reconciliation.' },
      { prompt: 'A controlled input gets value from…', options: ['Only CSS', 'React state', 'Docker', 'JWT header only'], answerIndex: 1, explanation: 'Value is bound to state.' },
      { prompt: 'setState/setCount triggers…', options: ['A DB drop', 'A re-render', 'Git commit', 'SSL renewal'], answerIndex: 1, explanation: 'State updates re-render.' },
      { prompt: 'Hooks like useState must be called…', options: ['Inside loops freely', 'At the top level of the component', 'In CSS files', 'In Mongo'], answerIndex: 1, explanation: 'Rules of Hooks.' }
    ]
  },
  {
    id: 'fs-r4', title: 'React Router', order: 12, track: 'react',
    summary: 'Add multi-page navigation in a SPA with React Router.',
    content: `## SPAs and routing

Single Page Apps change views without full server page reloads. React Router maps URLs to components.

\`\`\`jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>
\`\`\`

Use \`<Link to="/about">\` instead of raw \`<a>\` for client-side navigation.`,
    keyPoints: [
      'Routes map paths to components',
      'Link enables client-side navigation',
      'useParams reads URL params',
      'Wrap the app in BrowserRouter',
      'Nested routes share layouts'
    ],
    tryIts: [
      {
        id: 'r4-nav',
        title: 'Try it: Fake client router',
        description: 'Click links to switch “pages” without a real reload.',
        html: `<nav>
  <a href="#/" data-link>Home</a> |
  <a href="#/about" data-link>About</a>
</nav>
<div id="page"></div>`,
        css: `a { color: #0b2a8f; font-weight: bold; margin: 0 6px; }
#page { margin-top: 12px; padding: 12px; background: #f8fafc; border-radius: 8px; }`,
        js: `const pages = {
  '/': '<h1>Home</h1><p>React Router maps URLs to views.</p>',
  '/about': '<h1>About</h1><p>This is another route.</p>'
};
function render() {
  const path = location.hash.replace('#', '') || '/';
  document.getElementById('page').innerHTML = pages[path] || '<h1>404</h1>';
}
window.addEventListener('hashchange', render);
render();`
      }
    ],
    localBuild: {
      goal: 'Install react-router-dom and add Home/About routes.',
      commands: ['npm install react-router-dom', 'code src/App.jsx'],
      expectedUrl: 'http://localhost:5173/about',
      checklist: ['Router installed', 'Two routes work', 'Link navigation does not full-reload']
    },
    example: {
      title: 'Link + Route',
      code: `import { Link, Route, Routes } from 'react-router-dom';
<Link to="/about">About</Link>
<Routes>
  <Route path="/about" element={<About />} />
</Routes>`,
      explanation: 'URL changes update the matched route element.'
    },
    questions: [
      { prompt: 'React Router is for…', options: ['DB migrations', 'Client-side route mapping', 'Image compression', 'SMTP'], answerIndex: 1, explanation: 'It maps URLs to components.' },
      { prompt: 'Prefer Link over <a> because…', options: ['It is blue', 'It navigates without full page reload', 'It sets cookies', 'It compiles CSS'], answerIndex: 1, explanation: 'SPA navigation.' },
      { prompt: 'useParams reads…', options: ['CSS variables', 'Dynamic URL segments', 'Mongo passwords', 'Vite ports only'], answerIndex: 1, explanation: 'Route params.' },
      { prompt: 'BrowserRouter uses…', options: ['The browser URL', 'Only localStorage', 'FTP', 'Kafka'], answerIndex: 0, explanation: 'It syncs with the address bar.' },
      { prompt: 'A Route path="/" usually…', options: ['Deletes files', 'Renders the home view', 'Starts Mongo', 'Issues JWT'], answerIndex: 1, explanation: 'Root path component.' }
    ]
  },
  {
    id: 'fs-r5', title: 'Calling APIs from React', order: 13, track: 'react',
    summary: 'Fetch JSON from APIs with useEffect and render loading/error/success states.',
    content: `## fetch in React

Use \`useEffect\` to load data after mount:

\`\`\`jsx
useEffect(() => {
  fetch('/api/courses')
    .then((r) => r.json())
    .then(setCourses)
    .catch(setError);
}, []);
\`\`\`

### UI states to always handle
- Loading
- Error
- Empty
- Success

Later you will point this at your Express API on \`http://localhost:5000\`.`,
    keyPoints: [
      'useEffect runs side effects like fetching',
      'Handle loading and error UI',
      'JSON APIs return data for setState',
      'Dependency array [] means run once on mount',
      'CORS matters when frontend/backend ports differ'
    ],
    tryIts: [
      {
        id: 'r5-fetch',
        title: 'Try it: Loading states',
        description: 'Simulate an API call with loading → success.',
        html: `<button id="go">Fetch courses</button>
<p id="status"></p>
<ul id="list"></ul>`,
        css: `button { padding: 8px 12px; background: #0b2a8f; color: #fff; border: 0; cursor: pointer; }`,
        js: `const status = document.getElementById('status');
const list = document.getElementById('list');
document.getElementById('go').onclick = async () => {
  status.textContent = 'Loading…';
  list.innerHTML = '';
  await new Promise((r) => setTimeout(r, 700));
  const courses = ['Full Stack', 'Data Science', 'App Development'];
  status.textContent = 'Loaded ' + courses.length + ' courses';
  list.innerHTML = courses.map((c) => '<li>' + c + '</li>').join('');
};`
      }
    ],
    localBuild: {
      goal: 'Fetch a public JSON API and render titles in React.',
      commands: ['code src/App.jsx'],
      expectedUrl: 'http://localhost:5173',
      checklist: ['Loading text shows', 'Data renders', 'Error path tested (optional offline)']
    },
    example: {
      title: 'useEffect fetch',
      code: `useEffect(() => {
  let cancelled = false;
  fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    .then((r) => r.json())
    .then((data) => { if (!cancelled) setPosts(data); });
  return () => { cancelled = true; };
}, []);`,
      explanation: 'Cleanup prevents setting state after unmount.'
    },
    questions: [
      { prompt: 'useEffect is a good place to…', options: ['Define CSS', 'Fetch data on mount', 'Create SSL keys', 'Format disks'], answerIndex: 1, explanation: 'Side effects belong in effects.' },
      { prompt: 'res.json() returns…', options: ['A Promise of parsed JSON', 'A CSSOM', 'A binary OS image', 'A Git tree'], answerIndex: 0, explanation: 'It parses JSON asynchronously.' },
      { prompt: 'Empty dependency array [] means…', options: ['Run every keystroke', 'Run once after mount', 'Never run', 'Run only in production'], answerIndex: 1, explanation: 'Mount-only effect.' },
      { prompt: 'CORS errors appear when…', options: ['Browsers block cross-origin requests', 'HTML is invalid', 'Flexbox wraps', 'Git is dirty'], answerIndex: 0, explanation: 'Cross-origin policy.' },
      { prompt: 'You should show users…', options: ['Only success', 'Loading and error states too', 'Stack traces only', 'Nothing'], answerIndex: 1, explanation: 'Good UX covers all states.' }
    ]
  }
];

chapters.push(...reactNextBackend);

// Next.js track
chapters.push(
  {
    id: 'fs-n1', title: 'Next.js App Router setup locally', order: 9, track: 'next',
    summary: 'Create a Next.js app and run the App Router on localhost.',
    content: `## Why Next.js?

Next.js adds routing, rendering strategies, and production tooling on top of React.

\`\`\`bash
npx create-next-app@latest my-next-app
cd my-next-app
npm run dev
\`\`\`

Open \`http://localhost:3000\`. The App Router uses the \`app/\` directory.`,
    keyPoints: [
      'create-next-app scaffolds the project',
      'npm run dev serves localhost:3000',
      'app/ directory is App Router',
      'page.js defines a route UI',
      'File-system routing reduces react-router setup'
    ],
    tryIts: [
      {
        id: 'n1-routes',
        title: 'Try it: File-based routes concept',
        description: 'See how folders map to URLs in App Router thinking.',
        html: `<pre id="out"></pre>`,
        css: `pre { background: #0f172a; color: #e2e8f0; padding: 12px; border-radius: 8px; }`,
        js: `const files = [
  'app/page.js → /',
  'app/about/page.js → /about',
  'app/blog/[slug]/page.js → /blog/:slug'
];
document.getElementById('out').textContent = files.join('\\n');`
      }
    ],
    localBuild: {
      goal: 'Scaffold and run Next.js locally.',
      commands: ['npx create-next-app@latest my-next-app', 'cd my-next-app', 'npm run dev'],
      expectedUrl: 'http://localhost:3000',
      checklist: ['App starts', 'Home page loads', 'Saw app/ folder']
    },
    example: {
      title: 'app/page.js',
      code: `export default function Home() {
  return <h1>Hello Next.js</h1>;
}`,
      explanation: 'page.js is the UI for that route segment.'
    },
    questions: [
      { prompt: 'Next.js App Router mainly uses…', options: ['pages/ only forever', 'app/ directory', 'Only Vite', 'Only Express'], answerIndex: 1, explanation: 'App Router is app/.' },
      { prompt: 'npm run dev in Next typically opens…', options: ['localhost:3000', 'Only port 22', 'Mongo UI', 'Photoshop'], answerIndex: 0, explanation: 'Default Next port is 3000.' },
      { prompt: 'page.js defines…', options: ['A Docker volume', 'The UI for a route', 'An SSL cert', 'A JWT secret'], answerIndex: 1, explanation: 'Route UI file.' },
      { prompt: 'create-next-app…', options: ['Deletes node', 'Scaffolds a Next project', 'Creates Atlas clusters', 'Formats CSS only'], answerIndex: 1, explanation: 'Project generator.' },
      { prompt: 'File-system routing means…', options: ['Folders/files map to URLs', 'Only hash routes', 'No HTML', 'SQL triggers'], answerIndex: 0, explanation: 'Paths follow files.' }
    ]
  },
  {
    id: 'fs-n2', title: 'Pages, layouts & routing', order: 10, track: 'next',
    summary: 'Share chrome with layout.js and nest routes with folders.',
    content: `## layout.js

Layouts wrap pages and persist across navigations (navbars, footers).

\`\`\`js
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header>eBodhi</header>
        {children}
      </body>
    </html>
  );
}
\`\`\`

Nested folders create nested URLs and nested layouts.`,
    keyPoints: [
      'layout.js wraps child pages',
      'children is the nested page content',
      'Folders create URL segments',
      'linking uses next/link',
      'Special files: page, layout, loading, error'
    ],
    tryIts: [
      {
        id: 'n2-layout',
        title: 'Try it: Layout wraps pages',
        description: 'A layout stays while the page body swaps.',
        html: `<div id="app"></div>`,
        css: `header { background: #0b2a8f; color: #fff; padding: 10px; }
main { padding: 12px; }
button { margin-right: 8px; }`,
        js: `function Layout(children) {
  return '<header>eBodhi Layout</header><main>' + children + '</main>';
}
const pages = {
  home: '<h1>Home page</h1>',
  about: '<h1>About page</h1>'
};
function show(name) {
  document.getElementById('app').innerHTML =
    '<button onclick="show(\\'home\\')">Home</button>' +
    '<button onclick="show(\\'about\\')">About</button>' +
    Layout(pages[name]);
}
window.show = show;
show('home');`
      }
    ],
    localBuild: {
      goal: 'Add an about/page.js and link it from the home page.',
      commands: ['mkdir app/about', 'code app/about/page.js'],
      expectedUrl: 'http://localhost:3000/about',
      checklist: ['About route works', 'Layout still visible', 'Used next/link']
    },
    example: {
      title: 'next/link',
      code: `import Link from 'next/link';
<Link href="/about">About</Link>`,
      explanation: 'Client navigation between routes.'
    },
    questions: [
      { prompt: 'layout.js is for…', options: ['Shared UI wrappers', 'Mongo indexes', 'Only images', 'SSH'], answerIndex: 0, explanation: 'Shared chrome.' },
      { prompt: 'children in a layout is…', options: ['CSS', 'The nested page content', 'A database', 'A port'], answerIndex: 1, explanation: 'Nested segment UI.' },
      { prompt: 'app/blog/page.js maps to…', options: ['/blog', '/app/blog/page', '/api', '/_next only'], answerIndex: 0, explanation: 'Folder path → URL.' },
      { prompt: 'next/link provides…', options: ['Client-side navigation', 'SMTP', 'GPU drivers', 'JWT signing'], answerIndex: 0, explanation: 'Prefetch/nav helpers.' },
      { prompt: 'Nested layouts allow…', options: ['Shared section chrome', 'Deleting React', 'Skipping HTML', 'Avoiding CSS'], answerIndex: 0, explanation: 'Composable shells.' }
    ]
  },
  {
    id: 'fs-n3', title: 'Server vs client components', order: 11, track: 'next',
    summary: 'Know when code runs on the server vs in the browser.',
    content: `## Default: Server Components

In App Router, components are Server Components by default — great for data fetching and smaller client bundles.

## Client Components

Add \`'use client'\` at the top when you need:
- useState / useEffect
- Browser events
- Browser-only APIs

### Rule of thumb
Keep leaf interactive widgets as client components; keep pages/layouts as server when possible.`,
    keyPoints: [
      'Server Components are default in app/',
      "'use client' opts into client JS",
      'Hooks need client components',
      'Fetch on server when you can',
      'Do not make everything client'
    ],
    tryIts: [
      {
        id: 'n3-boundary',
        title: 'Try it: Server vs client responsibilities',
        description: 'Categorize tasks — edit the lists and think where each belongs.',
        html: `<h3>Server-friendly</h3><ul id="server"></ul>
<h3>Needs client</h3><ul id="client"></ul>`,
        css: `h3 { color: #0b2a8f; } li { margin: 4px 0; }`,
        js: `const server = ['Fetch DB data', 'Render blog HTML', 'Read secrets on server'];
const client = ['useState counters', 'onClick handlers', 'window.localStorage'];
document.getElementById('server').innerHTML = server.map((x) => '<li>' + x + '</li>').join('');
document.getElementById('client').innerHTML = client.map((x) => '<li>' + x + '</li>').join('');`
      }
    ],
    localBuild: {
      goal: 'Create a client Counter component with useState and import it into a server page.',
      commands: ['code app/components/Counter.jsx', 'code app/page.js'],
      expectedUrl: 'http://localhost:3000',
      checklist: ["'use client' present", 'Counter interacts', 'Page still server component']
    },
    example: {
      title: 'Client component',
      code: `'use client';
import { useState } from 'react';
export function Counter() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}`,
      explanation: 'Hooks require the client directive.'
    },
    questions: [
      { prompt: 'App Router components default to…', options: ['Client', 'Server', 'Python', 'Docker'], answerIndex: 1, explanation: 'Server by default.' },
      { prompt: "'use client' is needed for…", options: ['Pure static text only', 'Hooks and browser events', 'package.json', 'Git ignore'], answerIndex: 1, explanation: 'Client interactivity.' },
      { prompt: 'Fetching CMS data often fits…', options: ['Server components', 'Only Photoshop', 'Only FTP', 'Only CSS'], answerIndex: 0, explanation: 'Server can fetch securely.' },
      { prompt: 'Making everything client…', options: ['Is always best', 'Increases JS sent to browser', 'Removes HTML', 'Disables npm'], answerIndex: 1, explanation: 'Larger bundles.' },
      { prompt: 'useEffect runs…', options: ['In client components', 'In raw CSS', 'In Mongo shell only', 'In DNS'], answerIndex: 0, explanation: 'Browser effect hook.' }
    ]
  },
  {
    id: 'fs-n4', title: 'Data fetching & forms', order: 12, track: 'next',
    summary: 'Fetch on the server and handle forms with actions or client handlers.',
    content: `## Fetching in Server Components

You can \`await fetch\` directly in an async server page.

## Forms

Options include:
- Client-side controlled forms
- Server Actions (progressive enhancement)

Validate inputs. Show pending and error states.`,
    keyPoints: [
      'Async server pages can await data',
      'Never expose secrets to the client',
      'Forms need validation UX',
      'Cache/revalidate concepts appear in Next fetch',
      'Start simple, then add Server Actions'
    ],
    tryIts: [
      {
        id: 'n4-form',
        title: 'Try it: Form validation preview',
        description: 'Submit to see basic validation messages.',
        html: `<form id="f">
  <label>Email <input name="email" /></label>
  <button>Continue</button>
</form>
<p id="msg"></p>`,
        css: `form { display: grid; gap: 8px; max-width: 280px; }
input, button { padding: 8px; }`,
        js: `document.getElementById('f').onsubmit = (e) => {
  e.preventDefault();
  const email = new FormData(e.target).get('email');
  const msg = document.getElementById('msg');
  if (!email || !String(email).includes('@')) {
    msg.textContent = 'Enter a valid email';
    msg.style.color = '#b91c1c';
  } else {
    msg.textContent = 'Looks good — in Next you would send this to a server action/API';
    msg.style.color = '#15803d';
  }
};`
      }
    ],
    localBuild: {
      goal: 'Fetch sample data in a server page and render a list.',
      commands: ['code app/page.js'],
      expectedUrl: 'http://localhost:3000',
      checklist: ['Async page works', 'List renders', 'Loading.jsx optional']
    },
    example: {
      title: 'Async server page',
      code: `export default async function Page() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
  const posts = await res.json();
  return <ul>{posts.map((p) => <li key={p.id}>{p.title}</li>)}</ul>;
}`,
      explanation: 'Await in a Server Component.'
    },
    questions: [
      { prompt: 'Server pages can be…', options: ['async and await fetch', 'Only CSS', 'Only JSON files', 'Only Python'], answerIndex: 0, explanation: 'Async RSC pages.' },
      { prompt: 'Secrets should…', options: ['Go in client bundles', 'Stay on server/env', 'Be in HTML comments', 'Be CSS variables'], answerIndex: 1, explanation: 'Never ship secrets to browsers.' },
      { prompt: 'Form validation improves…', options: ['UX and data quality', 'GPU clock', 'Git blame', 'DNS TTL'], answerIndex: 0, explanation: 'Better inputs.' },
      { prompt: 'preventDefault in client forms…', options: ['Stops full reload while handling JS', 'Formats disks', 'Creates indexes', 'Stops Node'], answerIndex: 0, explanation: 'Controls submit behavior.' },
      { prompt: 'fetch on server is useful to…', options: ['Hide tokens and reduce client work', 'Replace HTML', 'Avoid components', 'Skip deployment'], answerIndex: 0, explanation: 'Secure efficient data loading.' }
    ]
  },
  {
    id: 'fs-n5', title: 'API routes intro (Next) vs separate Express', order: 13, track: 'next',
    summary: 'When to use Next route handlers versus a dedicated Express API.',
    content: `## Next Route Handlers

\`app/api/hello/route.js\` can export \`GET\`, \`POST\`, etc.

## Separate Express API

Use Express when you want:
- A standalone backend shared by multiple clients
- Heavier business logic / websockets
- Clear separation for large teams

### Practical eBodhi pattern
Many courses use Vite/Next on 3000/5173 and Express on 5000.`,
    keyPoints: [
      'Next can host simple APIs',
      'Express shines as a dedicated API server',
      'Choose based on complexity and team needs',
      'Both can talk to MongoDB',
      'Locally you will run one or two servers'
    ],
    tryIts: [
      {
        id: 'n5-choice',
        title: 'Try it: Choose API style',
        description: 'Toggle scenarios to see a recommended approach.',
        html: `<select id="s">
  <option value="small">Small form endpoint in one Next app</option>
  <option value="multi">Mobile + web sharing one backend</option>
  <option value="realtime">Websockets / complex jobs</option>
</select>
<p id="out"></p>`,
        css: `select, p { font: inherit; margin-top: 10px; }`,
        js: `const advice = {
  small: 'Next route handler can be enough.',
  multi: 'Prefer a separate Express (or similar) API.',
  realtime: 'Separate backend is usually clearer.'
};
const out = document.getElementById('out');
const s = document.getElementById('s');
const render = () => { out.textContent = advice[s.value]; };
s.onchange = render;
render();`
      }
    ],
    localBuild: {
      goal: 'Add a Next GET route handler that returns JSON.',
      commands: ['mkdir app/api/hello', 'code app/api/hello/route.js'],
      expectedUrl: 'http://localhost:3000/api/hello',
      checklist: ['JSON response', 'Understood Express alternative', 'Noted port strategy']
    },
    example: {
      title: 'route.js GET',
      code: `export async function GET() {
  return Response.json({ ok: true, message: 'Hello from Next' });
}`,
      explanation: 'App Router route handler.'
    },
    questions: [
      { prompt: 'app/api/hello/route.js can export…', options: ['GET/POST handlers', 'Only CSS', 'Only Mongo GUI', 'Only Dockerfiles'], answerIndex: 0, explanation: 'HTTP method exports.' },
      { prompt: 'Separate Express is helpful when…', options: ['Multiple clients share an API', 'You hate JSON', 'HTML is forbidden', 'Git is offline only'], answerIndex: 0, explanation: 'Shared backends.' },
      { prompt: 'Local full stack often runs…', options: ['Zero processes', 'Frontend + API processes', 'Only Photoshop', 'Only DNS'], answerIndex: 1, explanation: 'Two servers common.' },
      { prompt: 'JSON APIs usually respond with…', options: [' stego images', 'application/json data', 'SMTP banners', 'WAV files only'], answerIndex: 1, explanation: 'JSON payloads.' },
      { prompt: 'Pick Next API vs Express based on…', options: ['Complexity & boundaries', 'Font size', 'Chair color', 'Mouse DPI'], answerIndex: 0, explanation: 'Architecture fit.' }
    ]
  }
);

// Backend chapters
chapters.push(
  {
    id: 'fs-b1', title: 'Node.js & Express REST API', order: 14, track: 'backend',
    summary: 'Build a local Express server with REST routes on port 5000.',
    content: `## Express basics

Express is a minimal Node framework for HTTP APIs.

\`\`\`js
const express = require('express');
const app = express();
app.use(express.json());
app.get('/api/health', (req, res) => res.json({ ok: true }));
app.listen(5000);
\`\`\`

## REST ideas
- GET — read
- POST — create
- PUT/PATCH — update
- DELETE — remove

Keep routes organized in routers as the app grows.`,
    keyPoints: [
      'Node runs JavaScript on the server',
      'express.json parses JSON bodies',
      'Routes map method + path to handlers',
      'res.json sends JSON responses',
      'Listen on a port (e.g. 5000)'
    ],
    tryIts: [
      {
        id: 'b1-rest',
        title: 'Try it: REST method meanings',
        description: 'Pick an HTTP method to see its typical use.',
        html: `<select id="m">
  <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
</select>
<p id="out"></p>`,
        css: `p { margin-top: 12px; font-weight: bold; color: #0b2a8f; }`,
        js: `const map = {
  GET: 'Read data (list/detail)',
  POST: 'Create a new resource',
  PUT: 'Replace/update a resource',
  DELETE: 'Remove a resource'
};
const out = document.getElementById('out');
const m = document.getElementById('m');
m.onchange = () => { out.textContent = map[m.value]; };
out.textContent = map.GET;`
      }
    ],
    localBuild: {
      goal: 'Create a tiny Express server with GET /api/health.',
      commands: ['npm init -y', 'npm i express', 'node server.js'],
      expectedUrl: 'http://localhost:5000/api/health',
      checklist: ['Server starts', 'JSON health response', 'Used express.json()']
    },
    example: {
      title: 'Hello Express',
      code: `const express = require('express');
const app = express();
app.get('/api/health', (req, res) => res.json({ ok: true }));
app.listen(5000, () => console.log('API on 5000'));`,
      explanation: 'Visit the URL to verify the API is alive.'
    },
    questions: [
      { prompt: 'Express runs on…', options: ['Only browsers', 'Node.js server', 'Only CSS', 'Only Mongo Atlas UI'], answerIndex: 1, explanation: 'Server-side Node.' },
      { prompt: 'express.json() helps…', options: ['Parse JSON request bodies', 'Style HTML', 'Compile JSX', 'Issue SSL'], answerIndex: 0, explanation: 'Body parser middleware.' },
      { prompt: 'GET is typically for…', options: ['Deleting DBs', 'Reading resources', 'Hashing passwords only', 'Buying domains'], answerIndex: 1, explanation: 'Safe read semantics.' },
      { prompt: 'res.json sends…', options: ['JSON responses', 'Only PNG', 'SSH keys', 'WAV'], answerIndex: 0, explanation: 'JSON helper.' },
      { prompt: 'app.listen(5000)…', options: ['Starts HTTP server on port 5000', 'Starts Vite always', 'Formats disks', 'Creates React components'], answerIndex: 0, explanation: 'Binds a port.' }
    ]
  },
  {
    id: 'fs-b2', title: 'MongoDB & Mongoose locally / Atlas', order: 15, track: 'backend',
    summary: 'Connect Mongoose to Atlas (or local Mongo) and define schemas.',
    content: `## MongoDB

MongoDB stores JSON-like documents in collections.

## Mongoose

Mongoose defines schemas/models in Node:

\`\`\`js
const courseSchema = new mongoose.Schema({
  title: String,
  slug: String
});
const Course = mongoose.model('Course', courseSchema);
\`\`\`

### Atlas tip
Whitelist your IP and keep the connection string in \`.env\` (never commit secrets).`,
    keyPoints: [
      'Documents ≈ JSON objects',
      'Schemas define shape',
      'Models run queries',
      'Connection strings belong in env vars',
      'IP allowlisting matters on Atlas'
    ],
    tryIts: [
      {
        id: 'b2-doc',
        title: 'Try it: Document shape',
        description: 'Edit fields to mimic a Mongo document.',
        html: `<pre id="doc"></pre>`,
        css: `pre { background: #0f172a; color: #e2e8f0; padding: 12px; border-radius: 8px; }`,
        js: `const course = {
  title: 'Full Stack Development',
  slug: 'full-stack-development',
  price: 20000,
  chapters: 18
};
document.getElementById('doc').textContent = JSON.stringify(course, null, 2);`
      }
    ],
    localBuild: {
      goal: 'Connect Mongoose using MONGO_URI from .env and log success.',
      commands: ['npm i mongoose dotenv', 'code .env', 'code db.js'],
      expectedUrl: 'terminal: MongoDB Connected',
      checklist: ['.env set', 'Connection works', 'Simple model defined']
    },
    example: {
      title: 'Connect',
      code: `require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('connected'));`,
      explanation: 'Use Atlas URI or local mongodb://127.0.0.1:27017/dbname'
    },
    questions: [
      { prompt: 'MongoDB stores…', options: ['Only CSV', 'Document data', 'Only PNG', 'Only emails'], answerIndex: 1, explanation: 'Document database.' },
      { prompt: 'Mongoose schemas…', options: ['Define document shape', 'Replace HTML', 'Compile CSS', 'Buy domains'], answerIndex: 0, explanation: 'Structure + validation.' },
      { prompt: 'Connection strings should live in…', options: ['Public Git Hub README', '.env / secrets', 'CSS files', 'Image alt text'], answerIndex: 1, explanation: 'Keep secrets private.' },
      { prompt: 'Atlas IP whitelist failures look like…', options: ['Cannot connect', 'Flexbox bugs', 'Only 404 HTML', 'Broken JPEG'], answerIndex: 0, explanation: 'Network access blocked.' },
      { prompt: 'A Model is used to…', options: ['Query a collection', 'Style SVG', 'Run Vite', 'Sign SSL'], answerIndex: 0, explanation: 'ODM queries.' }
    ]
  },
  {
    id: 'fs-b3', title: 'JWT auth end-to-end', order: 16, track: 'backend',
    summary: 'Register/login users and protect routes with JSON Web Tokens.',
    content: `## JWT idea

After login, the server returns a signed token. The client sends it as \`Authorization: Bearer <token>\`.

Middleware verifies the token before protected routes run.

### Security basics
- Hash passwords (bcrypt)
- Store JWT secret in env
- Expire tokens
- Never log tokens in public places`,
    keyPoints: [
      'JWT is a signed identity token',
      'Bearer header carries the token',
      'Middleware guards routes',
      'Hash passwords at rest',
      'Secrets stay in environment variables'
    ],
    tryIts: [
      {
        id: 'b3-jwt',
        title: 'Try it: Bearer header shape',
        description: 'See how clients attach tokens (demo only — not a real signature).',
        html: `<input id="token" value="ey.demo.token" />
<pre id="out"></pre>`,
        css: `input { width: 90%; padding: 8px; }
pre { background: #f1f5f9; padding: 10px; }`,
        js: `const input = document.getElementById('token');
const out = document.getElementById('out');
function render() {
  out.textContent = JSON.stringify({
    Authorization: 'Bearer ' + input.value
  }, null, 2);
}
input.oninput = render;
render();`
      }
    ],
    localBuild: {
      goal: 'Add login route that returns a JWT and a protected /api/me route.',
      commands: ['npm i jsonwebtoken bcryptjs', 'code routes/auth.js'],
      expectedUrl: 'http://localhost:5000/api/auth/login',
      checklist: ['Login returns token', 'Protected route rejects missing token', 'Password hashed']
    },
    example: {
      title: 'Verify middleware sketch',
      code: `const jwt = require('jsonwebtoken');
function protect(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'No token' });
  req.user = jwt.verify(token, process.env.JWT_SECRET);
  next();
}`,
      explanation: 'Protected handlers run only after next().'
    },
    questions: [
      { prompt: 'JWTs are commonly sent via…', options: ['Authorization Bearer header', 'CSS files', 'Favicon', 'Sitemap'], answerIndex: 0, explanation: 'Bearer tokens.' },
      { prompt: 'Passwords should be…', options: ['Stored plain', 'Hashed', 'Put in HTML', 'Emailed weekly'], answerIndex: 1, explanation: 'Hashing protects dumps.' },
      { prompt: '401 usually means…', options: ['Unauthorized', 'OK', 'Redirect', 'Teapot only'], answerIndex: 0, explanation: 'Auth required/failed.' },
      { prompt: 'JWT secret belongs in…', options: ['Public repo', 'Environment config', 'Client CSS', 'Image EXIF'], answerIndex: 1, explanation: 'Server secret.' },
      { prompt: 'Auth middleware calls next() when…', options: ['Token verifies', 'CSS loads', 'Flex wraps', 'Git commits'], answerIndex: 0, explanation: 'Continue pipeline.' }
    ]
  },
  {
    id: 'fs-b4', title: 'Connect frontend track app to Express API locally', order: 17, track: 'backend',
    summary: 'Wire React or Next to your local Express API with CORS and env URLs.',
    content: `## Two origins

Frontend: \`localhost:5173\` or \`3000\`
Backend: \`localhost:5000\`

Browsers enforce CORS. Enable \`cors()\` on Express for local dev.

## Calling the API
- Vite proxy \`/api\` → \`5000\`
- Or absolute \`VITE_API_URL\`

Keep tokens in memory/localStorage carefully; attach Bearer headers on protected calls.`,
    keyPoints: [
      'Different ports = different origins',
      'CORS must allow the frontend origin',
      'Proxies simplify local /api paths',
      'Send JSON Content-Type',
      'Attach Authorization on protected routes'
    ],
    tryIts: [
      {
        id: 'b4-cors',
        title: 'Try it: Origin checklist',
        description: 'Confirm you understand local ports.',
        html: `<ul id="list"></ul>`,
        css: `li { margin: 8px 0; }`,
        js: `const items = [
  'React Vite often :5173',
  'Next often :3000',
  'Express API often :5000',
  'Enable cors() during local development'
];
document.getElementById('list').innerHTML = items.map((x) => '<li>' + x + '</li>').join('');`
      }
    ],
    localBuild: {
      goal: 'From your frontend, fetch http://localhost:5000/api/health and show OK.',
      commands: ['# terminal 1: API npm start', '# terminal 2: frontend npm run dev'],
      expectedUrl: 'frontend UI shows health ok',
      checklist: ['Both servers running', 'CORS ok', 'UI displays API data']
    },
    example: {
      title: 'Frontend fetch',
      code: `const res = await fetch('http://localhost:5000/api/health');
const data = await res.json();
console.log(data);`,
      explanation: 'Replace with your real courses/enrollments endpoints next.'
    },
    questions: [
      { prompt: 'CORS errors happen across…', options: ['Origins/ports', 'Only flexbox', 'Only Git branches', 'Only fonts'], answerIndex: 0, explanation: 'Cross-origin rules.' },
      { prompt: 'A Vite proxy helps by…', options: ['Forwarding /api to the backend', 'Replacing Mongo', 'Signing JWTs in CSS', 'Removing HTML'], answerIndex: 0, explanation: 'Dev proxy.' },
      { prompt: 'Protected API calls should include…', options: ['Bearer token header', 'Only margin', 'Only alt text', 'Only favicon'], answerIndex: 0, explanation: 'Authorization.' },
      { prompt: 'Local full stack needs…', options: ['Usually API + frontend running', 'Only DNS', 'Only Figma', 'Only Photoshop'], answerIndex: 0, explanation: 'Two processes.' },
      { prompt: 'express cors middleware…', options: ['Allows cross-origin browser requests', 'Compiles React', 'Formats Prettier', 'Buys domains'], answerIndex: 0, explanation: 'CORS enablement.' }
    ]
  },
  {
    id: 'fs-b5', title: 'Capstone: build & run full stack locally', order: 18, track: 'backend',
    summary: 'Ship a small full stack feature locally, then follow a deploy checklist for your certificate.',
    content: `## Capstone goal

Combine your track frontend + Express + Mongo into one working flow:
1. User can open the UI on localhost
2. UI reads/writes API data
3. Auth works for at least one protected action
4. README explains how to run it

## Deploy checklist (high level)
- Env vars set on host
- Frontend API URL points to production API
- Atlas Network Access allows host IPs
- Test login + one core flow

When you pass this chapter’s quiz and finish required chapters, your certificate unlocks.`,
    keyPoints: [
      'Run frontend and API together',
      'Document setup in README',
      'Env vars differ per environment',
      'Test the happy path end-to-end',
      'Certificate unlocks when the path is complete'
    ],
    tryIts: [
      {
        id: 'b5-checklist',
        title: 'Try it: Capstone checklist',
        description: 'Tick items mentally — edit the list for your project.',
        html: `<div id="box"></div>`,
        css: `label { display: block; margin: 8px 0; font-family: Arial, sans-serif; }`,
        js: `const items = [
  'Frontend runs on localhost',
  'API health endpoint works',
  'At least one CRUD or auth flow works',
  'README has run instructions',
  'Ready for deploy checklist'
];
document.getElementById('box').innerHTML = items.map((t, i) =>
  '<label><input type="checkbox" /> ' + t + '</label>'
).join('');`
      }
    ],
    localBuild: {
      goal: 'Demo your full stack flow to a friend or mentor from localhost.',
      commands: ['npm run dev  # frontend', 'npm start    # api'],
      expectedUrl: 'UI + API both healthy',
      checklist: ['Demo script ready', 'No hardcoded secrets', 'Quiz attempted']
    },
    example: {
      title: 'README snippet',
      code: `## Run locally
1. Start API: cd backend && npm start
2. Start UI: cd frontend && npm run dev
3. Open the printed localhost URL`,
      explanation: 'Clear run steps help future you — and graders.'
    },
    questions: [
      { prompt: 'A full stack local demo needs…', options: ['UI and API running', 'Only CSS', 'Only DNS', 'Only Figma'], answerIndex: 0, explanation: 'Both tiers.' },
      { prompt: 'README should include…', options: ['How to run the project', 'Only jokes', 'Only secrets', 'Only node_modules'], answerIndex: 0, explanation: 'Onboarding docs.' },
      { prompt: 'Production needs…', options: ['Configured env vars', 'Dev-only hardcoded secrets', 'Disabled HTTPS always', 'No database'], answerIndex: 0, explanation: 'Environment config.' },
      { prompt: 'Before claiming done, test…', options: ['An end-to-end user flow', 'Only folder names', 'Only favicon', 'Only comments'], answerIndex: 0, explanation: 'E2E verification.' },
      { prompt: 'Certificate unlocks when…', options: ['Required LMS path is complete', 'You open VS Code', 'You install npm once', 'You change CSS color'], answerIndex: 0, explanation: 'Path completion rule.' }
    ]
  }
);

chapters.forEach(emitChapter);

push(`];

module.exports = { FULLSTACK_LMS_CHAPTERS, LMS_CONTENT_VERSION };
`);

const target = path.join(__dirname, '..', 'data', 'fullstackLms.js');
fs.writeFileSync(target, out.join('\n'), 'utf8');
console.log('Wrote', target, 'chapters:', chapters.length);
