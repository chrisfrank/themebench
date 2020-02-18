import React from 'react';
import ReactDOM from 'react-dom';
import { css } from 'pretty-lights';
import {
  Bench,
  baseButtonStyles,
  ThemeContext,
  ThemeSelector,
  THEMES,
} from './components';

const { accent, bg, color } = THEMES.LIGHT;

const buttonStyles = css`
  ${baseButtonStyles}
  color: var(--ink-color, ${color});
  background: var(--ink-accent, ${accent});
`;

const themeTokens = {
  LIGHT: css`
    --ink-color: ${THEMES.LIGHT.color};
    --ink-bg: ${THEMES.LIGHT.bg};
    --ink-accent: ${THEMES.LIGHT.accent};
  `,
  DARK: css`
    --ink-color: ${THEMES.DARK.color};
    --ink-bg: ${THEMES.DARK.bg};
    --ink-accent: ${THEMES.DARK.accent};
  `
};

const boxStyles = css`
  color: var(--ink-color);
  background: var(--ink-bg);
`

const CSSTheme = ({ name, children }) => (
  <div className={themeTokens[name]}>
    <div className={boxStyles}>{children}</div>
  </div>
)

const CSSButton = ({ children }) => (
  <button className={buttonStyles}>{children}</button>
);

const CSSBench = () => {
  const theme = React.useContext(ThemeContext);
  return (
    <CSSTheme name={theme}>
      <Bench title="CSS vars" component={CSSButton} />
    </CSSTheme>
  );
};

const App = () => (
  <ThemeSelector>
    <CSSBench />
  </ThemeSelector>
);

ReactDOM.render(<App />, document.getElementById('root'));
