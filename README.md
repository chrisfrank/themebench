# Benchmarking react themes
Compare the speed of a few approaches for theming React components.

## Setup
0. Install the [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
1. git clone git@github.com:chrisfrank/themebench
2. `npm install`
3. `npm run start`

## Results
These results were recorded on a 13" Macbook Pro, 2.3 GHz i5, 4 Core.  The
"Render 1" column is the first render time reported by React profiler after
loading the page. Subsequent "render" columns are the render time reported
after using the `<select>` element to switch between Light and Dark themes.

| Implementation | Render 1 (ms) | Render 2 | Render 3 | Render 4 | Render 5 | AVG   |
|----------------|---------------|----------|----------|----------|----------|-------|
| Empty page     | 7.5           | 2.5      | 1.6      | 0.9      | 1        | 2.7   |
| styled         | 115.9         | 63.3     | 51.4     | 36.3     | 37.7     | 60.92 |
| Smart Tokens   | 76.6          | 70.1     | 67       | 68.7     | 69.5     | 70.38 |
| CSS Properties | 71.9          | 35.2     | 28.2     | 15.8     | 12.6     | 32.74 |
| CSS/CX         | 124.2         | 58.6     | 44.3     | 32.8     | 27.7     | 57.52 |
| Unthemed       | 74.7          | 37.4     | 30.7     | 16.6     | 12.4     | 34.36 |

