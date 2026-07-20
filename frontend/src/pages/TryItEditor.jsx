import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Play, RotateCcw, Maximize2, Minimize2, Palette } from 'lucide-react';

const SKINS = [
  { id: 'midnight', label: 'Midnight' },
  { id: 'light', label: 'Light' },
  { id: 'monokai', label: 'Monokai' },
  { id: 'ocean', label: 'Ocean' }
];

const SKIN_STORAGE_KEY = 'ebodhi-tryit-skin';

/**
 * W3Schools-style Try it editor: edit HTML/CSS/JS and Run in a sandboxed preview.
 */
export default function TryItEditor({
  title = 'Try it yourself',
  description = '',
  html: initialHtml = '',
  css: initialCss = '',
  js: initialJs = ''
}) {
  const [tab, setTab] = useState('html');
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  const [fullscreen, setFullscreen] = useState(false);
  const [skin, setSkin] = useState(() => {
    try {
      const saved = localStorage.getItem(SKIN_STORAGE_KEY);
      if (SKINS.some((s) => s.id === saved)) return saved;
    } catch { /* ignore */ }
    return 'light';
  });
  const iframeRef = useRef(null);
  const rootRef = useRef(null);

  const source = useMemo(() => {
    const safeJs = js || '';
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
html, body { margin: 0; padding: 12px; font-family: system-ui, Segoe UI, sans-serif; }
${css || ''}
</style>
</head>
<body>
${html || '<p>Add some HTML and click Run.</p>'}
<script>
try {
${safeJs}
} catch (err) {
  document.body.insertAdjacentHTML('beforeend', '<pre style="color:#b91c1c;margin-top:12px">Error: ' + err.message + '</pre>');
}
</script>
</body>
</html>`;
  }, [html, css, js]);

  const run = () => {
    const frame = iframeRef.current;
    if (!frame) return;
    frame.srcdoc = source;
  };

  const reset = () => {
    setHtml(initialHtml);
    setCss(initialCss);
    setJs(initialJs);
    setTab('html');
  };

  const changeSkin = (next) => {
    setSkin(next);
    try { localStorage.setItem(SKIN_STORAGE_KEY, next); } catch { /* ignore */ }
  };

  const toggleFullscreen = () => {
    setFullscreen((v) => !v);
  };

  useEffect(() => {
    setHtml(initialHtml);
    setCss(initialCss);
    setJs(initialJs);
  }, [initialHtml, initialCss, initialJs]);

  useEffect(() => {
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialHtml, initialCss, initialJs]);

  useEffect(() => {
    if (!fullscreen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setFullscreen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [fullscreen]);

  useEffect(() => {
    if (fullscreen) {
      // Re-run preview after layout expands
      const t = window.setTimeout(run, 50);
      return () => window.clearTimeout(t);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullscreen]);

  const activeValue = tab === 'html' ? html : tab === 'css' ? css : js;
  const setActive = (value) => {
    if (tab === 'html') setHtml(value);
    else if (tab === 'css') setCss(value);
    else setJs(value);
  };

  return (
    <section
      ref={rootRef}
      className={`tryit tryit-skin-${skin}${fullscreen ? ' is-fullscreen' : ''}`}
    >
      <div className="tryit-head">
        <div>
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>
        <div className="tryit-actions">
          <label className="tryit-skin-picker" title="Editor skin">
            <Palette size={14} />
            <select
              value={skin}
              onChange={(e) => changeSkin(e.target.value)}
              aria-label="Editor skin"
            >
              {SKINS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </label>
          <button type="button" className="btn btn-secondary btn-sm" onClick={reset}>
            <RotateCcw size={14} /> Reset
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={toggleFullscreen}
            aria-pressed={fullscreen}
            title={fullscreen ? 'Exit fullscreen (Esc)' : 'Fullscreen'}
          >
            {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            {fullscreen ? 'Exit' : 'Fullscreen'}
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={run}>
            <Play size={14} /> Run »
          </button>
        </div>
      </div>

      <div className="tryit-grid">
        <div className="tryit-editor-pane">
          <div className="tryit-tabs">
            <button type="button" className={tab === 'html' ? 'active' : ''} onClick={() => setTab('html')}>HTML</button>
            <button type="button" className={tab === 'css' ? 'active' : ''} onClick={() => setTab('css')}>CSS</button>
            <button type="button" className={tab === 'js' ? 'active' : ''} onClick={() => setTab('js')}>JS</button>
          </div>
          <textarea
            className="tryit-code"
            spellCheck={false}
            value={activeValue}
            onChange={(e) => setActive(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                run();
              }
            }}
            aria-label={`${tab} editor`}
          />
          <p className="tryit-hint">
            Tip: edit the code, then click Run (or Ctrl/Cmd+Enter).
            {fullscreen ? ' Press Esc to exit fullscreen.' : ''}
          </p>
        </div>
        <div className="tryit-preview-pane">
          <div className="tryit-preview-label">Result</div>
          <iframe
            ref={iframeRef}
            title={title}
            className="tryit-frame"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </section>
  );
}
