import React from "react";
import { css } from "emotion";
import styled from "@emotion/styled";
import { ThemeProvider } from "emotion-theming";

const RANGE = Array(2000).fill(true);

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

//////////////////// EMOTION
const StyledButton = styled.button`
  border: 1px solid;
  appearance: none;
  cursor: pointer;
  color: ${props => props.theme.color};
  background: ${props => props.theme.bg};
`;

export const EmotionTheme = ({ theme }) => (
  <ThemeProvider theme={THEMES[theme]}>
    <ExpensiveList component={StyledButton} title="Emotion" />
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
  border: 1px solid;
  appearance: none;
  cursor: pointer;
  color: ${smartTokens.color};
  background: ${smartTokens.bg};
`;

const SmartTokenButton = ({ children }) => (
  <button className={smartTokenButtonStyles}>{children}</button>
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
  border: 1px solid;
  appearance: none;
  cursor: pointer;
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

export const NoTheme = () => (
  <ExpensiveList component="button" title="Unstyled" />
);
