import React from "react";
import { css, cx, styled, ThemeProvider } from "pretty-lights";

const RANGE = Array(5000).fill(true);

const white = "#FFFFFF";
const black = "#000000";
const THEMES = {
  light: { bg: white, color: black },
  dark: { bg: black, color: white }
};

const ExpensiveList = ({ component, title }) => (
  <div>
    <h3>{title}</h3>
    {RANGE.map((_, idx) =>
      React.createElement(component, { key: idx }, `${title} ${idx}`)
    )}
  </div>
);

const baseButtonStyles = css`
  border: 1px solid;
  appearance: none;
  cursor: pointer;
`;

//////////////////// STYLED THEME (via pretty-lights)
const StyledButton = styled.button`
  ${baseButtonStyles}
  color: ${props => props.theme.color};
  background: ${props => props.theme.bg};
`;

export const StyledTheme = ({ theme }) => (
  <ThemeProvider theme={THEMES[theme]}>
    <ExpensiveList component={StyledButton} title="styled" />
  </ThemeProvider>
);

//////////////////// SMART TOKENS
export function getStoredThemeName() {
  return localStorage.getItem("inkTheme") || "light";
}

const activeThemeName = getStoredThemeName();
const activeTheme = THEMES[activeThemeName];

export function setStoredThemeName(newTheme) {
  localStorage.setItem("inkTheme", newTheme);
  window.location.reload();
}

const smartTokens = {
  get bg() {
    return activeTheme.bg;
  },
  get color() {
    return activeTheme.color;
  }
};

const smartTokenButtonStyles = css`
  ${baseButtonStyles}
  color: ${smartTokens.color};
  background: ${smartTokens.bg};
`;

const SmartTokenButton = ({ children }) => (
  <button className={smartTokenButtonStyles}>
    {children}
  </button>
);

export const SmartTokenTheme = ({ theme }) => {
  React.useEffect(() => {
    if (theme !== activeThemeName) {
      setStoredThemeName(theme);
    }
  }, [theme]);
  return <ExpensiveList component={SmartTokenButton} title="Smart Tokens" />;
};

//////////////////// CSS CUSTOM PROPERTIES
const cssButtonStyles = css`
  ${baseButtonStyles}
  color: var(--ink-color, ${white});
  background: var(--ink-bg, ${black});
`;

const cssThemes = {
  light: css`
    --ink-color: ${black};
    --ink-bg: ${white};
  `,
  dark: css`
    --ink-color: ${white};
    --ink-bg: ${black};
  `
};

const CSSButton = ({ children }) => (
  <button className={cssButtonStyles}>{children}</button>
);

export const CSSTheme = ({ theme }) => (
  <div className={cssThemes[theme]}>
    <ExpensiveList component={CSSButton} title="CSS Properties" />
  </div>
);

//////////////////// CSS PROPS with `cx`
const cxButtonStyles = css`
  color: var(--ink-color, ${white});
  background: var(--ink-bg, ${black});
`;

const CXButton = ({ children }) => (
  <button className={cx(baseButtonStyles, cxButtonStyles)}>{children}</button>
);

export const CXTheme = ({ theme }) => (
  <div className={cssThemes[theme]}>
    <ExpensiveList component={CXButton} title="CX/CSS Properties" />
  </div>
);
//////////////////// UNTHEMEABLE
const UnthemedButton = ({ children }) => (
  <button className={baseButtonStyles}>{children}</button>
);

export const Unthemed = () => (
  <ExpensiveList component={UnthemedButton} title="Unthemed" />
);
