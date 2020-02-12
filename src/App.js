import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";

import {
  EmotionTheme,
  SmartTokenTheme,
  CSSTheme,
  NoTheme,
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
            <NavLink to="/emotion">Emotion</NavLink>
          </li>
          <li>
            <NavLink to="/tokens">Smart Tokens</NavLink>
          </li>
          <li>
            <NavLink to="/cssprops">CSS Properties</NavLink>
          </li>
          <li>
            <NavLink to="/unstyled">Unstyled</NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/emotion">
          <EmotionTheme theme={theme} />
        </Route>
        <Route path="/tokens">
          <SmartTokenTheme theme={theme} />
        </Route>
        <Route path="/cssprops">
          <CSSTheme theme={theme} />
        </Route>
        <Route path="/unstyled">
          <NoTheme theme={theme} />
        </Route>
        <Route path="/">Empty</Route>
      </Switch>
    </Router>
  );
}

export default App;
