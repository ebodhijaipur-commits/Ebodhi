const LMS_CONTENT_VERSION = 1;

const q = (prompt, options, answerIndex, explanation) => ({
  prompt, options, answerIndex, explanation
});

const tryIt = (id, title, description, { html = '', css = '', js = '' } = {}) => ({
  id, title, description, html, css, js
});

const chapter = ({
  id, title, order, track = 'shared', summary, content, keyPoints, tryIt: tryIts,
  localBuild, example, questions, passScore = 70
}) => ({
  id, title, order, track, summary, content,
  keyPoints: keyPoints || [],
  tryIt: tryIts || [],
  localBuild: localBuild || { goal: '', commands: [], expectedUrl: '', checklist: [] },
  example: example || { title: '', code: '', explanation: '' },
  quiz: { passScore, questions }
});

const DATA_ANALYTICS_LMS_CHAPTERS = [
  chapter({
    id: "da-1",
    title: "Analytics problem framing",
    order: 1,
    track: "shared",
    summary: "Turn vague asks into measurable questions and KPIs.",
    content: `
## Analytics problem framing

Turn vague asks into measurable questions and KPIs.

### Analyst habit
Always ask: **What decision changes if this number moves?**

### Deliverables
- Clean table or query
- Chart or KPI card
- One-sentence insight
- Recommended action
`,
    keyPoints: ["Define the KPI","Clean before charting","Show methodology briefly","Action > decoration","Double-check totals"],
    tryIt: [
    tryIt("da1", "Try it: Analytics problem framing", "Interactive practice.", {
      html: `<h3>Analytics problem framing</h3><p>Write one insight sentence:</p>
<input id="i" style="width:95%" placeholder="Insight: ..."/>
<button id="go">Check</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{
  out.textContent = i.value.trim().length<12 ? 'Make the insight more specific.' : 'Good — pair it with a chart and an action.';
};`
    })
    ],
    localBuild: {
      goal: "Practice Analytics problem framing on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Analytics problem framing snapshot",
      code: `// Example notes for: Analytics problem framing
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Analytics problem framing\"?", ["Turn vague asks into measurable questions and KPIs.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "da-2",
    title: "Spreadsheets like a pro",
    order: 2,
    track: "shared",
    summary: "Cleaning, lookups, and pivot-ready tables in Excel/Sheets.",
    content: `
## Spreadsheets like a pro

Cleaning, lookups, and pivot-ready tables in Excel/Sheets.

### Analyst habit
Always ask: **What decision changes if this number moves?**

### Deliverables
- Clean table or query
- Chart or KPI card
- One-sentence insight
- Recommended action
`,
    keyPoints: ["Define the KPI","Clean before charting","Show methodology briefly","Action > decoration","Double-check totals"],
    tryIt: [
    tryIt("da2", "Try it: Spreadsheets like a pro", "Interactive practice.", {
      html: `<h3>Spreadsheets like a pro</h3><p>Write one insight sentence:</p>
<input id="i" style="width:95%" placeholder="Insight: ..."/>
<button id="go">Check</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{
  out.textContent = i.value.trim().length<12 ? 'Make the insight more specific.' : 'Good — pair it with a chart and an action.';
};`
    })
    ],
    localBuild: {
      goal: "Practice Spreadsheets like a pro on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Spreadsheets like a pro snapshot",
      code: `// Example notes for: Spreadsheets like a pro
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Spreadsheets like a pro\"?", ["Cleaning, lookups, and pivot-ready tables in Excel/Sheets.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "da-3",
    title: "Data cleaning patterns",
    order: 3,
    track: "shared",
    summary: "Duplicates, types, nulls, and standardizing categories.",
    content: `
## Data cleaning patterns

Duplicates, types, nulls, and standardizing categories.

### Analyst habit
Always ask: **What decision changes if this number moves?**

### Deliverables
- Clean table or query
- Chart or KPI card
- One-sentence insight
- Recommended action
`,
    keyPoints: ["Define the KPI","Clean before charting","Show methodology briefly","Action > decoration","Double-check totals"],
    tryIt: [
    tryIt("da3", "Try it: Data cleaning patterns", "Interactive practice.", {
      html: `<h3>Data cleaning patterns</h3><p>Write one insight sentence:</p>
<input id="i" style="width:95%" placeholder="Insight: ..."/>
<button id="go">Check</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{
  out.textContent = i.value.trim().length<12 ? 'Make the insight more specific.' : 'Good — pair it with a chart and an action.';
};`
    })
    ],
    localBuild: {
      goal: "Practice Data cleaning patterns on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Data cleaning patterns snapshot",
      code: `// Example notes for: Data cleaning patterns
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Data cleaning patterns\"?", ["Duplicates, types, nulls, and standardizing categories.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "da-4",
    title: "SQL SELECT & filters",
    order: 4,
    track: "shared",
    summary: "Query tables with WHERE, ORDER BY, and LIMIT.",
    content: `
## SQL SELECT & filters

Query tables with WHERE, ORDER BY, and LIMIT.

### Analyst habit
Always ask: **What decision changes if this number moves?**

### Deliverables
- Clean table or query
- Chart or KPI card
- One-sentence insight
- Recommended action
`,
    keyPoints: ["Define the KPI","Clean before charting","Show methodology briefly","Action > decoration","Double-check totals"],
    tryIt: [
    tryIt("da4", "Try it: SQL SELECT & filters", "Interactive practice.", {
      html: `<pre>SELECT name, score FROM students WHERE score >= 80 ORDER BY score DESC;</pre>
<p>Rows: Asha 92, Ravi 88, Neha 76, Kabir 81</p>
<button id="go">Run filter</button><pre id="out"></pre>`,
      css: `body{font-family:Arial,sans-serif}pre{background:#0f172a;color:#e2e8f0;padding:10px}button{padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `const rows=[{name:'Asha',score:92},{name:'Ravi',score:88},{name:'Neha',score:76},{name:'Kabir',score:81}];
document.getElementById('go').onclick=()=>{
  const res=rows.filter(r=>r.score>=80).sort((a,b)=>b.score-a.score);
  out.textContent=res.map(r=>r.name+' '+r.score).join('\\n');
};`
    })
    ],
    localBuild: {
      goal: "Practice SQL SELECT & filters on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "SQL SELECT & filters snapshot",
      code: `// Example notes for: SQL SELECT & filters
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"SQL SELECT & filters\"?", ["Query tables with WHERE, ORDER BY, and LIMIT.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "da-5",
    title: "SQL joins that analysts use",
    order: 5,
    track: "shared",
    summary: "Combine tables without exploding row counts by accident.",
    content: `
## SQL joins that analysts use

Combine tables without exploding row counts by accident.

### Analyst habit
Always ask: **What decision changes if this number moves?**

### Deliverables
- Clean table or query
- Chart or KPI card
- One-sentence insight
- Recommended action
`,
    keyPoints: ["Define the KPI","Clean before charting","Show methodology briefly","Action > decoration","Double-check totals"],
    tryIt: [
    tryIt("da5", "Try it: SQL joins that analysts use", "Interactive practice.", {
      html: `<h3>SQL joins that analysts use</h3><p>Write one insight sentence:</p>
<input id="i" style="width:95%" placeholder="Insight: ..."/>
<button id="go">Check</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{
  out.textContent = i.value.trim().length<12 ? 'Make the insight more specific.' : 'Good — pair it with a chart and an action.';
};`
    })
    ],
    localBuild: {
      goal: "Practice SQL joins that analysts use on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "SQL joins that analysts use snapshot",
      code: `// Example notes for: SQL joins that analysts use
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"SQL joins that analysts use\"?", ["Combine tables without exploding row counts by accident.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "da-6",
    title: "Aggregations & windows intro",
    order: 6,
    track: "shared",
    summary: "GROUP BY metrics and ranking ideas.",
    content: `
## Aggregations & windows intro

GROUP BY metrics and ranking ideas.

### Analyst habit
Always ask: **What decision changes if this number moves?**

### Deliverables
- Clean table or query
- Chart or KPI card
- One-sentence insight
- Recommended action
`,
    keyPoints: ["Define the KPI","Clean before charting","Show methodology briefly","Action > decoration","Double-check totals"],
    tryIt: [
    tryIt("da6", "Try it: Aggregations & windows intro", "Interactive practice.", {
      html: `<h3>Aggregations & windows intro</h3><p>Write one insight sentence:</p>
<input id="i" style="width:95%" placeholder="Insight: ..."/>
<button id="go">Check</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{
  out.textContent = i.value.trim().length<12 ? 'Make the insight more specific.' : 'Good — pair it with a chart and an action.';
};`
    })
    ],
    localBuild: {
      goal: "Practice Aggregations & windows intro on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Aggregations & windows intro snapshot",
      code: `// Example notes for: Aggregations & windows intro
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Aggregations & windows intro\"?", ["GROUP BY metrics and ranking ideas.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "da-7",
    title: "BI tools & dashboard design",
    order: 7,
    track: "shared",
    summary: "Power BI / Tableau layout principles that executives skim.",
    content: `
## BI tools & dashboard design

Power BI / Tableau layout principles that executives skim.

### Analyst habit
Always ask: **What decision changes if this number moves?**

### Deliverables
- Clean table or query
- Chart or KPI card
- One-sentence insight
- Recommended action
`,
    keyPoints: ["Define the KPI","Clean before charting","Show methodology briefly","Action > decoration","Double-check totals"],
    tryIt: [
    tryIt("da7", "Try it: BI tools & dashboard design", "Interactive practice.", {
      html: `<h3>BI tools & dashboard design</h3><p>Write one insight sentence:</p>
<input id="i" style="width:95%" placeholder="Insight: ..."/>
<button id="go">Check</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{
  out.textContent = i.value.trim().length<12 ? 'Make the insight more specific.' : 'Good — pair it with a chart and an action.';
};`
    })
    ],
    localBuild: {
      goal: "Practice BI tools & dashboard design on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "BI tools & dashboard design snapshot",
      code: `// Example notes for: BI tools & dashboard design
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"BI tools & dashboard design\"?", ["Power BI / Tableau layout principles that executives skim.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "da-8",
    title: "KPI trees & definitions",
    order: 8,
    track: "shared",
    summary: "Define metrics so finance and marketing mean the same thing.",
    content: `
## KPI trees & definitions

Define metrics so finance and marketing mean the same thing.

### Analyst habit
Always ask: **What decision changes if this number moves?**

### Deliverables
- Clean table or query
- Chart or KPI card
- One-sentence insight
- Recommended action
`,
    keyPoints: ["Define the KPI","Clean before charting","Show methodology briefly","Action > decoration","Double-check totals"],
    tryIt: [
    tryIt("da8", "Try it: KPI trees & definitions", "Interactive practice.", {
      html: `<h3>KPI trees & definitions</h3><p>Write one insight sentence:</p>
<input id="i" style="width:95%" placeholder="Insight: ..."/>
<button id="go">Check</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{
  out.textContent = i.value.trim().length<12 ? 'Make the insight more specific.' : 'Good — pair it with a chart and an action.';
};`
    })
    ],
    localBuild: {
      goal: "Practice KPI trees & definitions on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "KPI trees & definitions snapshot",
      code: `// Example notes for: KPI trees & definitions
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"KPI trees & definitions\"?", ["Define metrics so finance and marketing mean the same thing.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "da-9",
    title: "Visualization that tells truth",
    order: 9,
    track: "shared",
    summary: "Choose chart types that match the question.",
    content: `
## Visualization that tells truth

Choose chart types that match the question.

### Analyst habit
Always ask: **What decision changes if this number moves?**

### Deliverables
- Clean table or query
- Chart or KPI card
- One-sentence insight
- Recommended action
`,
    keyPoints: ["Define the KPI","Clean before charting","Show methodology briefly","Action > decoration","Double-check totals"],
    tryIt: [
    tryIt("da9", "Try it: Visualization that tells truth", "Interactive practice.", {
      html: `<select id="q">
<option value="trend">Trend over months</option>
<option value="parts">Share of total</option>
<option value="compare">Compare categories</option>
</select>
<p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}`,
      js: `const map={trend:'Use a line chart',parts:'Use a pie/stacked bar carefully',compare:'Use a bar chart'};
const sync=()=>out.textContent=map[q.value];
q.onchange=sync; sync();`
    })
    ],
    localBuild: {
      goal: "Practice Visualization that tells truth on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Visualization that tells truth snapshot",
      code: `// Example notes for: Visualization that tells truth
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Visualization that tells truth\"?", ["Choose chart types that match the question.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "da-10",
    title: "Stakeholder storytelling",
    order: 10,
    track: "shared",
    summary: "Lead with insight, then show evidence.",
    content: `
## Stakeholder storytelling

Lead with insight, then show evidence.

### Analyst habit
Always ask: **What decision changes if this number moves?**

### Deliverables
- Clean table or query
- Chart or KPI card
- One-sentence insight
- Recommended action
`,
    keyPoints: ["Define the KPI","Clean before charting","Show methodology briefly","Action > decoration","Double-check totals"],
    tryIt: [
    tryIt("da10", "Try it: Stakeholder storytelling", "Interactive practice.", {
      html: `<h3>Stakeholder storytelling</h3><p>Write one insight sentence:</p>
<input id="i" style="width:95%" placeholder="Insight: ..."/>
<button id="go">Check</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{
  out.textContent = i.value.trim().length<12 ? 'Make the insight more specific.' : 'Good — pair it with a chart and an action.';
};`
    })
    ],
    localBuild: {
      goal: "Practice Stakeholder storytelling on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Stakeholder storytelling snapshot",
      code: `// Example notes for: Stakeholder storytelling
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Stakeholder storytelling\"?", ["Lead with insight, then show evidence.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "da-11",
    title: "Quality checks & handoff",
    order: 11,
    track: "shared",
    summary: "Validate numbers before the meeting.",
    content: `
## Quality checks & handoff

Validate numbers before the meeting.

### Analyst habit
Always ask: **What decision changes if this number moves?**

### Deliverables
- Clean table or query
- Chart or KPI card
- One-sentence insight
- Recommended action
`,
    keyPoints: ["Define the KPI","Clean before charting","Show methodology briefly","Action > decoration","Double-check totals"],
    tryIt: [
    tryIt("da11", "Try it: Quality checks & handoff", "Interactive practice.", {
      html: `<h3>Quality checks & handoff</h3><p>Write one insight sentence:</p>
<input id="i" style="width:95%" placeholder="Insight: ..."/>
<button id="go">Check</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{
  out.textContent = i.value.trim().length<12 ? 'Make the insight more specific.' : 'Good — pair it with a chart and an action.';
};`
    })
    ],
    localBuild: {
      goal: "Practice Quality checks & handoff on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Quality checks & handoff snapshot",
      code: `// Example notes for: Quality checks & handoff
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Quality checks & handoff\"?", ["Validate numbers before the meeting.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "da-12",
    title: "Capstone dashboard case",
    order: 12,
    track: "shared",
    summary: "Build a mini dashboard narrative with actions.",
    content: `
## Capstone dashboard case

Build a mini dashboard narrative with actions.

### Analyst habit
Always ask: **What decision changes if this number moves?**

### Deliverables
- Clean table or query
- Chart or KPI card
- One-sentence insight
- Recommended action
`,
    keyPoints: ["Define the KPI","Clean before charting","Show methodology briefly","Action > decoration","Double-check totals"],
    tryIt: [
    tryIt("da12", "Try it: Capstone dashboard case", "Interactive practice.", {
      html: `<h3>Capstone dashboard case</h3><p>Write one insight sentence:</p>
<input id="i" style="width:95%" placeholder="Insight: ..."/>
<button id="go">Check</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{
  out.textContent = i.value.trim().length<12 ? 'Make the insight more specific.' : 'Good — pair it with a chart and an action.';
};`
    })
    ],
    localBuild: {
      goal: "Practice Capstone dashboard case on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Capstone dashboard case snapshot",
      code: `// Example notes for: Capstone dashboard case
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Capstone dashboard case\"?", ["Build a mini dashboard narrative with actions.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
];

module.exports = { DATA_ANALYTICS_LMS_CHAPTERS, LMS_CONTENT_VERSION };
