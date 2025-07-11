import React, { useState } from 'react';
import UrlTable from './UrlTable';
import { logEvent } from './logger';

function createCode(existing) {
  let code;
  do {
    code = Math.random().toString(36).slice(2, 8);
  } while (existing.includes(code));
  return code;
}

function Shortener() {
  const [input, setInput] = useState('');
  const [links, setLinks] = useState([]);

  function handleAdd(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const codes = links.map(l => l.code);
    const code = createCode(codes);
    const entry = {
      key: Date.now(),
      url: input,
      code,
      hits: 0
    };
    setLinks([entry, ...links]);
    logEvent('SHORTENED', { url: input, code });
    setInput('');
  }

  function handleVisit(code) {
    setLinks(list => list.map(l => {
      if (l.code === code) {
        logEvent('VISITED', { code });
        logEvent('HIT_ADDED', { code, hits: l.hits + 1 });
        return { ...l, hits: l.hits + 1 };
      }
      return l;
    }));
  }

  return (
    <section style={{ background: '#fff', borderRadius: 6, boxShadow: '0 2px 8px #ddd', padding: 16, maxWidth: 500, margin: '0 auto' }}>
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        <input
          type="url"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Paste your long URL here"
          style={{ flex: 1, padding: 7, borderRadius: 4, border: '1px solid #bbb' }}
          required
        />
        <button type="submit" style={{ padding: '7px 16px', borderRadius: 4, border: 'none', background: '#28a745', color: '#fff', fontWeight: 'bold' }}>
          Make Short
        </button>
      </form>
      <UrlTable data={links} onVisit={handleVisit} />
    </section>
  );
}

export default Shortener;
