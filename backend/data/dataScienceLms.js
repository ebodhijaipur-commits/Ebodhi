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

const DATA_SCIENCE_LMS_CHAPTERS = [
  chapter({
    id: "ds-1",
    title: "Data Science mindset & workflow",
    order: 1,
    track: "shared",
    summary: "Learn how data projects move from question → data → insight → decision.",
    content: `
## What is Data Science?

Data Science turns raw data into **decisions**. A typical loop:

1. Ask a business question
2. Collect / access data
3. Clean and explore
4. Model or analyze
5. Communicate insight
6. Measure impact

### Roles you will hear
- Data Analyst — dashboards, SQL, storytelling
- Data Scientist — modeling + experimentation
- ML Engineer — production systems

## Why process matters
Jumping to fancy models without a clear question wastes time. Start with: **Who decides what, using which metric?**
`,
    keyPoints: ["Start from a decision/question","Data quality beats fancy models","Communicate for non-technical stakeholders","Iterate: explore → model → explain","Ethics and privacy are part of the job"],
    tryIt: [
    tryIt("ds1", "Try it: Project brief builder", "Fill a mini brief — good projects start here.", {
      html: `<label>Business question<br/><input id="q" style="width:95%" value="Which leads are most likely to enroll?"/></label>
<label>Decision owner<br/><input id="o" style="width:95%" value="Admissions counselor"/></label>
<label>Success metric<br/><input id="m" style="width:95%" value="Enrollment conversion rate"/></label>
<button id="go">Build brief</button>
<pre id="out"></pre>`,
      css: `body{font-family:Arial,sans-serif}label{display:block;margin:8px 0}button{padding:8px 12px;background:#0b2a8f;color:#fff;border:0;cursor:pointer}pre{background:#f1f5f9;padding:10px}`,
      js: `document.getElementById('go').onclick=()=>{
  const brief={question:q.value,owner:o.value,metric:m.value,nextStep:'Collect labeled historical leads'};
  out.textContent=JSON.stringify(brief,null,2);
};`
    })
    ],
    localBuild: {
      goal: "Practice Data Science mindset & workflow on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Data Science mindset & workflow snapshot",
      code: `// Example notes for: Data Science mindset & workflow
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Data Science mindset & workflow\"?", ["Learn how data projects move from question → data → insight …","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ds-2",
    title: "Python foundations for data",
    order: 2,
    track: "shared",
    summary: "Variables, lists, dicts, and notebooks — the language of data work.",
    content: `
## Python for data

You will use Python for notebooks, scripts, and ML libraries.

Core ideas:
- \`list\` / \`dict\` for collections
- functions for reusable steps
- virtual environments for dependencies

### Local workflow
\`\`\`bash
python -m venv .venv
# Windows: .venv\\Scripts\\activate
pip install numpy pandas matplotlib
\`\`\`

Practice writing tiny scripts before jumping into huge notebooks.
`,
    keyPoints: ["Use a virtual environment","Lists vs dicts","Readable function names","Notebooks are for exploration; scripts for reuse","pip install project dependencies"],
    tryIt: [
    tryIt("ds2", "Try it: Mean of a list (JS stand-in)", "Same idea as Python statistics on a list.", {
      html: `<p>Scores: <code id="arr">[70, 85, 90, 60, 88]</code></p>
<button id="go">Compute mean</button>
<p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `const scores=[70,85,90,60,88];
document.getElementById('go').onclick=()=>{
  const mean=scores.reduce((a,b)=>a+b,0)/scores.length;
  out.textContent='Mean = '+mean.toFixed(2);
};`
    })
    ],
    localBuild: {
      goal: "Create a venv and print hello from Python.",
      commands: ["python -m venv .venv",".venv\\Scripts\\activate","python -c \"print('hello data')\""],
      expectedUrl: "terminal output",
      checklist: ["venv created","activated","hello printed"]
    },
    example: {
      title: "Python foundations for data snapshot",
      code: `// Example notes for: Python foundations for data
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Python foundations for data\"?", ["Variables, lists, dicts, and notebooks — the language of dat…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ds-3",
    title: "NumPy arrays & vector thinking",
    order: 3,
    track: "shared",
    summary: "Fast numeric arrays and why vectorized code beats slow loops.",
    content: `
## NumPy mindset

NumPy arrays store numbers efficiently and support vectorized operations:

\`\`\`python
import numpy as np
x = np.array([1, 2, 3])
print(x * 2)  # [2 4 6]
\`\`\`

Prefer array ops over Python for-loops for speed and clarity.
`,
    keyPoints: ["Arrays are typed and fast","Broadcasting applies ops across shapes","Axes matter in 2D data","Vectorize when possible","Know shape and dtype"],
    tryIt: [
    tryIt("ds3", "Try it: Vector scale", "Multiply every value — like a NumPy vector op.", {
      html: `<input id="n" type="number" value="3" />
<button id="go">Scale [2,4,6,8]</button>
<pre id="out"></pre>`,
      css: `body{font-family:Arial,sans-serif}button{margin-left:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{
  const k=Number(n.value)||1;
  const scaled=[2,4,6,8].map(v=>v*k);
  out.textContent=JSON.stringify(scaled);
};`
    })
    ],
    localBuild: {
      goal: "Practice NumPy arrays & vector thinking on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "NumPy arrays & vector thinking snapshot",
      code: `// Example notes for: NumPy arrays & vector thinking
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"NumPy arrays & vector thinking\"?", ["Fast numeric arrays and why vectorized code beats slow loops…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ds-4",
    title: "Tabular data with Pandas ideas",
    order: 4,
    track: "shared",
    summary: "Rows, columns, filters, and group-bys on tables.",
    content: `
## Tabular data with Pandas ideas

Rows, columns, filters, and group-bys on tables.

### Learn by doing
1. Read the idea
2. Use Try it
3. Reproduce locally in Python/notebooks
4. Write 5 lines of notes
5. Take the quiz

### Common mistakes
- Skipping data cleaning
- Overfitting without validation
- Charts without a message
- Using GenAI output without checking
`,
    keyPoints: ["Understand the question first","Validate assumptions with plots/tables","Keep a reproducible notebook","Explain results in plain language","Version your data + code"],
    tryIt: [
    tryIt("ds4", "Try it: Tabular data with Pandas ideas", "Interactive concept check.", {
      html: `<h3>Tabular data with Pandas ideas</h3><p>Mark what you will practice:</p>
<label><input type="checkbox"/> Read docs/examples</label><br/>
<label><input type="checkbox"/> Run a tiny demo</label><br/>
<label><input type="checkbox"/> Write notes</label>
<button id="go">Save plan</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:10px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{out.textContent='Plan saved. Now practice Tabular data with Pandas ideas locally.';};`
    })
    ],
    localBuild: {
      goal: "Practice Tabular data with Pandas ideas on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Tabular data with Pandas ideas snapshot",
      code: `// Example notes for: Tabular data with Pandas ideas
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Tabular data with Pandas ideas\"?", ["Rows, columns, filters, and group-bys on tables.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ds-5",
    title: "Exploratory data analysis (EDA)",
    order: 5,
    track: "shared",
    summary: "Profiles, missing values, distributions, and first charts.",
    content: `
## EDA checklist

Before modeling:
- How many rows/columns?
- Missing values?
- Outliers?
- Target balance (classification)?
- Leakage risk?

### Charts with a purpose
Every chart should answer a question — not decorate a slide.
`,
    keyPoints: ["Profile before modeling","Missingness is a signal","Plot distributions","Watch for leakage","Document findings"],
    tryIt: [
    tryIt("ds5", "Try it: Missing value %", "Compute missing percentage for a tiny table.", {
      html: `<pre>age: 10 values, 2 missing
city: 10 values, 0 missing</pre>
<button id="go">Compute</button><pre id="out"></pre>`,
      css: `body{font-family:Arial,sans-serif}button{padding:8px 12px;background:#0b2a8f;color:#fff;border:0}pre{background:#f8fafc;padding:10px}`,
      js: `document.getElementById('go').onclick=()=>{
  out.textContent=JSON.stringify({age:(2/10*100)+'%',city:(0/10*100)+'%'},null,2);
};`
    })
    ],
    localBuild: {
      goal: "Practice Exploratory data analysis (EDA) on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Exploratory data analysis (EDA) snapshot",
      code: `// Example notes for: Exploratory data analysis (EDA)
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Exploratory data analysis (EDA)\"?", ["Profiles, missing values, distributions, and first charts.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ds-6",
    title: "Statistics that analysts use daily",
    order: 6,
    track: "shared",
    summary: "Mean, median, variance, correlation — interpreted simply.",
    content: `
## Statistics that analysts use daily

Mean, median, variance, correlation — interpreted simply.

### Learn by doing
1. Read the idea
2. Use Try it
3. Reproduce locally in Python/notebooks
4. Write 5 lines of notes
5. Take the quiz

### Common mistakes
- Skipping data cleaning
- Overfitting without validation
- Charts without a message
- Using GenAI output without checking
`,
    keyPoints: ["Understand the question first","Validate assumptions with plots/tables","Keep a reproducible notebook","Explain results in plain language","Version your data + code"],
    tryIt: [
    tryIt("ds6", "Try it: Statistics that analysts use daily", "Interactive concept check.", {
      html: `<h3>Statistics that analysts use daily</h3><p>Mark what you will practice:</p>
<label><input type="checkbox"/> Read docs/examples</label><br/>
<label><input type="checkbox"/> Run a tiny demo</label><br/>
<label><input type="checkbox"/> Write notes</label>
<button id="go">Save plan</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:10px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{out.textContent='Plan saved. Now practice Statistics that analysts use daily locally.';};`
    })
    ],
    localBuild: {
      goal: "Practice Statistics that analysts use daily on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Statistics that analysts use daily snapshot",
      code: `// Example notes for: Statistics that analysts use daily
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Statistics that analysts use daily\"?", ["Mean, median, variance, correlation — interpreted simply.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ds-7",
    title: "Supervised learning intro",
    order: 7,
    track: "shared",
    summary: "Predict targets with labeled examples: regression vs classification.",
    content: `
## Supervised learning

You have **features (X)** and a **label (y)**.

- Regression → numeric target (price, score)
- Classification → category target (spam/ham, enroll/not)

Start with simple baselines before complex models.
`,
    keyPoints: ["Labeled data required","Baseline first","Features must be available at prediction time","Split train/test","Metrics depend on task"],
    tryIt: [
    tryIt("ds7", "Try it: Classify threshold", "Score >= 0.5 → Yes", {
      html: `<input id="s" type="number" step="0.1" value="0.72" />
<button id="go">Predict</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-left:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{
  const v=Number(s.value); out.textContent = v>=0.5 ? 'Class: YES' : 'Class: NO';
};`
    })
    ],
    localBuild: {
      goal: "Practice Supervised learning intro on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Supervised learning intro snapshot",
      code: `// Example notes for: Supervised learning intro
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Supervised learning intro\"?", ["Predict targets with labeled examples: regression vs classif…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ds-8",
    title: "Train/test split & model metrics",
    order: 8,
    track: "shared",
    summary: "Avoid leakage; measure accuracy, precision, recall, RMSE.",
    content: `
## Train/test split & model metrics

Avoid leakage; measure accuracy, precision, recall, RMSE.

### Learn by doing
1. Read the idea
2. Use Try it
3. Reproduce locally in Python/notebooks
4. Write 5 lines of notes
5. Take the quiz

### Common mistakes
- Skipping data cleaning
- Overfitting without validation
- Charts without a message
- Using GenAI output without checking
`,
    keyPoints: ["Understand the question first","Validate assumptions with plots/tables","Keep a reproducible notebook","Explain results in plain language","Version your data + code"],
    tryIt: [
    tryIt("ds8", "Try it: Train/test split & model metrics", "Interactive concept check.", {
      html: `<h3>Train/test split & model metrics</h3><p>Mark what you will practice:</p>
<label><input type="checkbox"/> Read docs/examples</label><br/>
<label><input type="checkbox"/> Run a tiny demo</label><br/>
<label><input type="checkbox"/> Write notes</label>
<button id="go">Save plan</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:10px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{out.textContent='Plan saved. Now practice Train/test split & model metrics locally.';};`
    })
    ],
    localBuild: {
      goal: "Practice Train/test split & model metrics on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Train/test split & model metrics snapshot",
      code: `// Example notes for: Train/test split & model metrics
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Train/test split & model metrics\"?", ["Avoid leakage; measure accuracy, precision, recall, RMSE.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ds-9",
    title: "Trees, forests & practical ML",
    order: 9,
    track: "shared",
    summary: "Interpretable models teams ship in real products.",
    content: `
## Trees, forests & practical ML

Interpretable models teams ship in real products.

### Learn by doing
1. Read the idea
2. Use Try it
3. Reproduce locally in Python/notebooks
4. Write 5 lines of notes
5. Take the quiz

### Common mistakes
- Skipping data cleaning
- Overfitting without validation
- Charts without a message
- Using GenAI output without checking
`,
    keyPoints: ["Understand the question first","Validate assumptions with plots/tables","Keep a reproducible notebook","Explain results in plain language","Version your data + code"],
    tryIt: [
    tryIt("ds9", "Try it: Trees, forests & practical ML", "Interactive concept check.", {
      html: `<h3>Trees, forests & practical ML</h3><p>Mark what you will practice:</p>
<label><input type="checkbox"/> Read docs/examples</label><br/>
<label><input type="checkbox"/> Run a tiny demo</label><br/>
<label><input type="checkbox"/> Write notes</label>
<button id="go">Save plan</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:10px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{out.textContent='Plan saved. Now practice Trees, forests & practical ML locally.';};`
    })
    ],
    localBuild: {
      goal: "Practice Trees, forests & practical ML on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Trees, forests & practical ML snapshot",
      code: `// Example notes for: Trees, forests & practical ML
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Trees, forests & practical ML\"?", ["Interpretable models teams ship in real products.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ds-10",
    title: "Clustering & unsupervised patterns",
    order: 10,
    track: "shared",
    summary: "Find groups when labels are missing.",
    content: `
## Clustering & unsupervised patterns

Find groups when labels are missing.

### Learn by doing
1. Read the idea
2. Use Try it
3. Reproduce locally in Python/notebooks
4. Write 5 lines of notes
5. Take the quiz

### Common mistakes
- Skipping data cleaning
- Overfitting without validation
- Charts without a message
- Using GenAI output without checking
`,
    keyPoints: ["Understand the question first","Validate assumptions with plots/tables","Keep a reproducible notebook","Explain results in plain language","Version your data + code"],
    tryIt: [
    tryIt("ds10", "Try it: Clustering & unsupervised patterns", "Interactive concept check.", {
      html: `<h3>Clustering & unsupervised patterns</h3><p>Mark what you will practice:</p>
<label><input type="checkbox"/> Read docs/examples</label><br/>
<label><input type="checkbox"/> Run a tiny demo</label><br/>
<label><input type="checkbox"/> Write notes</label>
<button id="go">Save plan</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:10px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{out.textContent='Plan saved. Now practice Clustering & unsupervised patterns locally.';};`
    })
    ],
    localBuild: {
      goal: "Practice Clustering & unsupervised patterns on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Clustering & unsupervised patterns snapshot",
      code: `// Example notes for: Clustering & unsupervised patterns
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Clustering & unsupervised patterns\"?", ["Find groups when labels are missing.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ds-11",
    title: "Intro GenAI for analytics",
    order: 11,
    track: "shared",
    summary: "Use LLMs safely for summarization and coding help — with verification.",
    content: `
## Intro GenAI for analytics

Use LLMs safely for summarization and coding help — with verification.

### Learn by doing
1. Read the idea
2. Use Try it
3. Reproduce locally in Python/notebooks
4. Write 5 lines of notes
5. Take the quiz

### Common mistakes
- Skipping data cleaning
- Overfitting without validation
- Charts without a message
- Using GenAI output without checking
`,
    keyPoints: ["Understand the question first","Validate assumptions with plots/tables","Keep a reproducible notebook","Explain results in plain language","Version your data + code"],
    tryIt: [
    tryIt("ds11", "Try it: Intro GenAI for analytics", "Interactive concept check.", {
      html: `<h3>Intro GenAI for analytics</h3><p>Mark what you will practice:</p>
<label><input type="checkbox"/> Read docs/examples</label><br/>
<label><input type="checkbox"/> Run a tiny demo</label><br/>
<label><input type="checkbox"/> Write notes</label>
<button id="go">Save plan</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:10px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{out.textContent='Plan saved. Now practice Intro GenAI for analytics locally.';};`
    })
    ],
    localBuild: {
      goal: "Practice Intro GenAI for analytics on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Intro GenAI for analytics snapshot",
      code: `// Example notes for: Intro GenAI for analytics
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Intro GenAI for analytics\"?", ["Use LLMs safely for summarization and coding help — with ver…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ds-12",
    title: "Capstone: insight story & portfolio",
    order: 12,
    track: "shared",
    summary: "Ship a mini case study with charts, metrics, and a clear recommendation.",
    content: `
## Capstone story

Your portfolio piece should include:
1. Question & audience
2. Data source + cleaning notes
3. 2–4 insightful charts
4. Model or analysis result
5. Decision recommendation
6. Limitations

Ship a GitHub README that another person can run.
`,
    keyPoints: ["Story > complexity","Reproducible steps","Clear recommendation","Honest limitations","Demo-ready notebook"],
    tryIt: [
    tryIt("ds12", "Try it: Capstone outline", "Generate a portfolio outline.", {
      html: `<button id="go">Generate outline</button><pre id="out"></pre>`,
      css: `body{font-family:Arial,sans-serif}button{padding:8px 12px;background:#f59e0b;border:0;font-weight:bold}pre{background:#0f172a;color:#e2e8f0;padding:12px}`,
      js: `document.getElementById('go').onclick=()=>{out.textContent=['1. Question','2. Data','3. EDA','4. Model/Analysis','5. Recommendation','6. Limits'].join('\\n');};`
    })
    ],
    localBuild: {
      goal: "Practice Capstone: insight story & portfolio on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Capstone: insight story & portfolio snapshot",
      code: `// Example notes for: Capstone: insight story & portfolio
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Capstone: insight story & portfolio\"?", ["Ship a mini case study with charts, metrics, and a clear rec…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
];

module.exports = { DATA_SCIENCE_LMS_CHAPTERS, LMS_CONTENT_VERSION };
