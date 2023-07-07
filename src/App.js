import logo from './logo.svg';
import './App.css';
import Api from './Api';
import { useEffect, useState } from 'react'; 

function App() {
  const [test, setTest] = useState(null);

  const testCall = () => {
    Api().get('/').then((response) => setTest(response.data));
  };

  useEffect(testCall, []);

  return (
    <div className="App">
      <header className="App-header">
        { JSON.stringify(test) }
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
