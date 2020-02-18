import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeSelector } from './components';

const App = () => (
  <ThemeSelector>
    <h1>Empty (baseline)</h1>
  </ThemeSelector>
);

ReactDOM.render(<App />, document.getElementById('root'));
