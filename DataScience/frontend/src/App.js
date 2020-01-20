import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [response, setResponse] = useState({
    data: {
      score: '',
      mse: ''
    }
  })
  const [input, setInput] = useState('')

  const fetchData = () => {
    fetch('http://localhost:5000/predict', {
      method: 'post',
      body: JSON.stringify({

      })
    }).then(data => {
      return data.json()
    }).then(setResponse);
  }

  const { mse, score } = response.data

  return (
    <div className="App">
      <h1>Model score</h1>
      <p>MSE: <code>{mse}</code></p>
      <p>Score: <code>{score}</code></p>

      <input onChange={setInput}/>
      <button onClick={fetchData}>Predict</button>

    </div>
  );
}

export default App;
