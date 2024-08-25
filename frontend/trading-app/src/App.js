import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/text')
      .then(response => {
        setText(response.data.text);
      })
      .catch(error => {
        console.error('There was an error fetching the text!', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Fetched Text</h1>
      <p>{text}</p>
    </div>
  );
}

export default App;
