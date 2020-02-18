import React from 'react';
import { css } from 'pretty-lights';

const Nav = () => (
  <ul>
    <li><a href="/">Empty</a></li>
    <li><a href="/styled"><code>styled</code></a></li>
    <li><a href="/cssvars"><code>css</code> w/vars</a></li>
    <li><a href="/themedcss"><code>themedCss</code></a></li>
    <li><a href="/plaincss">Plain CSS</a></li>
  </ul>
);

export const THEMES = {
  LIGHT: { accent: '#e7f0f6', bg: '#fff', color: '#000' },
  DARK: { accent: '#0b4a7a', bg: '#000', color: '#fff' },
};

export const ThemeContext = React.createContext('LIGHT');

export const ThemeSelector = ({ children }) => {
  const [themeName, setThemeName] = React.useState('LIGHT');

  function handleSelect(e) {
    const newThemeName = e.currentTarget.value;
    setThemeName(newThemeName);
  }

  return (
    <main style={{ display: 'grid', gridTemplateColumns: '16rem 1fr' }}>
      <aside>
        <h3>Current Theme</h3>
        <select id="select-theme" value={themeName} onChange={handleSelect}>
          <option value="LIGHT">Light</option>
          <option value="DARK">Dark</option>
        </select>
        <h3>Implementations:</h3>
        <Nav />
      </aside>
      <section>
        <ThemeContext.Provider value={themeName}>
          {children}
        </ThemeContext.Provider>
      </section>
    </main>
  );
};

const RANGE = Array(1000).fill(true);

export const Bench = ({ component, title }) => (
  <div>
    <h3>Profiling <code>{title}</code></h3>
    {RANGE.map((_, idx) => (
      React.createElement(component, { key: idx }, `${title} ${idx}`)
    ))}
  </div>
);

export const baseButtonStyles = css`
  border: none;
  appearance: none;
  cursor: pointer;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1;
  padding: 0.25rem 0.5rem;
  font-weight: 700;
  box-sizing: border-box;
  border: 2px solid;
  display: inline-block;
  margin: 0 4px 4px 0;
`;
