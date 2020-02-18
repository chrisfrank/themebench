import React from 'react';
import ReactDOM from 'react-dom';
import { css, useTheme, ThemeProvider  } from 'pretty-lights';
import { baseButtonStyles, Bench, THEMES, ThemeContext, ThemeSelector } from './components';

const availableThemes = {
  DARK: 'DARK',
  LIGHT: 'LIGHT',
};

/**
 * @param {*} value
 * @returns {boolean}
 */
function isThemableInkToken(value) {
  return value.isThemableInkToken;
}

/**
 * @param {TemplateStringsArray} strings
 * @param  {...any} parts
 * @returns {function(string):string}
 */
export function themedCss(strings, ...parts) {
  if (parts.some(part => isThemableInkToken(part))) {
    const themed = Object.values(availableThemes).reduce(
      (acc, themeName) => ({
        ...acc,
        [themeName]: css(
          strings,
          ...parts.map(part =>
            isThemableInkToken(part) ? part(themeName) : part
          )
        ),
      }),
      {}
    );
    return theme => themed[theme] || themed[availableThemes.LIGHT];
  }
  return () => css(strings, ...parts);
}

/**
 *
 * @param {*} values
 */
function createThemableInkToken(values) {
  const interpolator = theme => {
    if (theme) {
      return values[theme];
    }
    console.error(
      'Themed ink tokens only work properly with `inkCss`' +
        " tagged templates, but you're using one in a raw" +
        ' `emotion.css` tagged template.'
    );
    return values.LIGHT;
  };
  // In a newer version of pretty-lights, functions passed to `css`
  // will be stringified
  interpolator.toString = () => {
    console.error(
      'Themed ink tokens only work properly with `inkCss`' +
        " tagged templates, but you're using one in a raw" +
        ' `emotion.css` tagged template.'
    );
    return values.LIGHT;
  };
  interpolator.isThemableInkToken = true;
  return interpolator;
}

const themableInkColor = createThemableInkToken({
  [availableThemes.LIGHT]: THEMES.LIGHT.color,
  [availableThemes.DARK]: THEMES.DARK.color,
});

const themableInkBg = createThemableInkToken({
  [availableThemes.LIGHT]: THEMES.LIGHT.bg,
  [availableThemes.DARK]: THEMES.DARK.bg,
});

const themableInkAccent = createThemableInkToken({
  [availableThemes.LIGHT]: THEMES.LIGHT.accent,
  [availableThemes.DARK]: THEMES.DARK.accent,
});

const themableButtonStyles = themedCss`
  ${baseButtonStyles}
  color: ${themableInkColor};
  background-color: ${themableInkAccent};
`;

const themableWrapperStyles = themedCss`
  color: ${themableInkColor};
  background: ${themableInkBg};
`

const ThemableTokenButton = ({ children }) => {
  const theme = useTheme();
  return (
    <button className={themableButtonStyles(theme.color)}>
      {children}
    </button>
  );
};

const Wrapper = ({ children }) => {
  const theme = useTheme();
  const cls = themableWrapperStyles(theme.color)
  return <div className={cls}>{children}</div>;
}

const ThemableTokenBench = () => {
  const themeName = React.useContext(ThemeContext);
  return (
    <ThemeProvider theme={{ color: themeName }}>
      <Wrapper>
        <Bench title="themedCss" component={ThemableTokenButton} />
      </Wrapper>
    </ThemeProvider>
  )
}

const App = () => (
  <ThemeSelector>
    <ThemableTokenBench />
  </ThemeSelector>
)

ReactDOM.render(<App />, document.getElementById('root'));
