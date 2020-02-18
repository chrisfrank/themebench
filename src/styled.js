import React from 'react';
import ReactDOM from 'react-dom';
import { styled, ThemeProvider } from 'pretty-lights';
import {
  Bench,
  baseButtonStyles,
  ThemeContext,
  ThemeSelector,
  THEMES,
} from './components';

const StyledButton = styled('button')`
  ${baseButtonStyles}
  color: ${props => props.theme.color};
  background: ${props => props.theme.accent};
`;

const StyledWrapper = styled('div')`
  background: ${props => props.theme.bg};
  color: ${props => props.theme.color};
`

const StyledBench = () => {
  const theme = React.useContext(ThemeContext);
  return (
    <ThemeProvider theme={THEMES[theme]}>
      <StyledWrapper>
        <Bench title="styled" component={StyledButton} />
      </StyledWrapper>
    </ThemeProvider>
  );
};

const App = () => (
  <ThemeSelector>
    <StyledBench />
  </ThemeSelector>
);

ReactDOM.render(<App />, document.getElementById('root'));
