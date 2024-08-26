import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  return (
    <div className="App">
      <h1>Fetched Text</h1>
      <p>{text}</p>
    </div>
  );
}

export default App;
