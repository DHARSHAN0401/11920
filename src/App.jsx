import React from 'react';
import Shortener from './Shortener';

function App() {
  return (
    <main style={{ fontFamily: 'Verdana, Geneva, sans-serif', background: '#f5f5f5', minHeight: '100vh', padding: 20 }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Simple URL Shortener</h1>
      <Shortener />
    </main>
  );
}

export default App;
