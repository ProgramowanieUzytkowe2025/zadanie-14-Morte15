import React from 'react';

const Loader = () => (
  <div style={{
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: 9999, fontSize: '24px'
  }}>
    Wczytywanie...
  </div>
);

export default Loader;