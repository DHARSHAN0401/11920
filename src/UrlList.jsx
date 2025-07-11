import React from 'react';

function UrlList({ urls, onShortUrlClick }) {
  if (urls.length === 0) {
    return <div style={{ color: '#888', textAlign: 'center' }}>No URLs shortened yet.</div>;
  }
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
      <thead>
        <tr style={{ background: '#eee' }}>
          <th style={{ padding: 8, border: '1px solid #ddd' }}>Original URL</th>
          <th style={{ padding: 8, border: '1px solid #ddd' }}>Short URL</th>
          <th style={{ padding: 8, border: '1px solid #ddd' }}>Click Count</th>
        </tr>
      </thead>
      <tbody>
        {urls.map(url => (
          <tr key={url.id}>
            <td style={{ padding: 8, border: '1px solid #ddd', wordBreak: 'break-all' }}>{url.longUrl}</td>
            <td style={{ padding: 8, border: '1px solid #ddd' }}>
              <a
                href="#"
                style={{ color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}
                onClick={e => {
                  e.preventDefault();
                  onShortUrlClick(url.shortCode);
                }}
              >
                {window.location.origin + '/s/' + url.shortCode}
              </a>
            </td>
            <td style={{ padding: 8, border: '1px solid #ddd', textAlign: 'center' }}>{url.clickCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UrlList;
