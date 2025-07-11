import React from 'react';

function UrlTable({ data, onVisit }) {
  if (data.length === 0) {
    return <div style={{ color: '#aaa', textAlign: 'center' }}>No links yet.</div>;
  }
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
      <thead>
        <tr style={{ background: '#f0f0f0' }}>
          <th style={{ padding: 7, border: '1px solid #ccc' }}>Long URL</th>
          <th style={{ padding: 7, border: '1px solid #ccc' }}>Short Link</th>
          <th style={{ padding: 7, border: '1px solid #ccc' }}>Hits</th>
        </tr>
      </thead>
      <tbody>
        {data.map(link => (
          <tr key={link.key}>
            <td style={{ padding: 7, border: '1px solid #ccc', wordBreak: 'break-all' }}>{link.url}</td>
            <td style={{ padding: 7, border: '1px solid #ccc' }}>
              <a
                href="#"
                style={{ color: '#28a745', textDecoration: 'underline', cursor: 'pointer' }}
                onClick={e => {
                  e.preventDefault();
                  onVisit(link.code);
                }}
              >
                {window.location.origin + '/go/' + link.code}
              </a>
            </td>
            <td style={{ padding: 7, border: '1px solid #ccc', textAlign: 'center' }}>{link.hits}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UrlTable;
