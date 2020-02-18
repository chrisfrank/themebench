import React from 'react';
import ReactDOM from 'react-dom';
import { Bench, ThemeContext, ThemeSelector } from './components';


const themeClasses = {
  "LIGHT": "",
  "DARK": "darkmode",
}

const PlainCSSTheme = ({ name, children }) => (
  <div className={themeClasses[name]}>
    <div className="box">{children}</div>
  </div>
)

const CSSButton = ({ children }) => (
  <button className="btn">{children}</button>
);

const CSSBench = () => {
  const theme = React.useContext(ThemeContext);
  return (
    <PlainCSSTheme name={theme}>
      <Bench title="Plain CSS" component={CSSButton} />
    </CSSTheme>
  );
};

const App = () => (
  <ThemeSelector>
    <CSSBench />
  </ThemeSelector>
);

ReactDOM.render(<App />, document.getElementById('root'));
