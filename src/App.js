import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";

import {
  StyledTheme,
  SmartTokenTheme,
  CSSTheme,
  CXTheme,
  Unthemed,
  getStoredThemeName
} from "./themes";

function App() {
  const [theme, setTheme] = React.useState(getStoredThemeName());
  function handleSelect(e) {
    const newTheme = e.currentTarget.value;
    setTheme(newTheme);
  }
  return (
    <Router>
      <label htmlFor="select-theme">Theme:</label>
      <select id="select-theme" value={theme} onChange={handleSelect}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <h2>Theme Implementations</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Empty</NavLink>
          </li>
          <li>
            <NavLink to="/styled">styled('button')</NavLink>
          </li>
          <li>
            <NavLink to="/tokens">Smart Tokens</NavLink>
          </li>
          <li>
            <NavLink to="/cssprops">CSS Properties</NavLink>
          </li>
          <li>
            <NavLink to="/cxprops">CSS Props via <code>cx</code></NavLink>
          </li>
          <li>
            <NavLink to="/unthemed">Unthemed</NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/styled">
          <StyledTheme theme={theme} />
        </Route>
        <Route path="/tokens">
          <SmartTokenTheme theme={theme} />
        </Route>
        <Route path="/cssprops">
          <CSSTheme theme={theme} />
        </Route>
        <Route path="/cxprops">
          <CXTheme theme={theme} />
        </Route>
        <Route path="/unthemed">
          <Unthemed />
        </Route>
        <Route path="/"><h3>Baseline: empty</h3></Route>
      </Switch>
    </Router>
  );
}

export default App;
