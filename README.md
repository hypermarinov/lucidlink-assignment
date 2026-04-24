## Prerequisites

- Nvm for node version management
- Docker (required for integration tests via test containers)
- Playwright browsers

1. Install dependencies
   `npm install`
2. Install Playwright browsers
   `npx playwright install chromium`

### Available scripts

- Run all tests
  `npm run test`
- Run integration tests
  `npm run test:integration`
- Run unit tests
  `npm run test:unit`
- Build
  `npm run build`
- Run the package locally (most likely not needed)
  `npm run dev`
- Lint
  `npm run lint`
- Format the code
  `npm run format`
- Check for code formatting
  `npm run format:check`
- Setup git hooks - automatically ran with `npm install`
  `npm run prepare`
- Lint the produced package 
  ```npm run publint```

### Examples

- Synchronous execution:

```
import { countGroupsSync } from 'lucidlink-assignment';

const grid = [
  [1, undefined, 2],
  [1, undefined, 2],
  [undefined, undefined, 2],
];

countGroupsSync(grid); // 2
```

- Asynchronous with require

```
const { countGroups } = require('lucidlink-assignment/promises');

const grid = [
  [1, undefined, 2],
  [1, undefined, 2],
  [undefined, undefined, 2],
];

countGroups(grid).then(count => {
  console.log(count); // 2
});
```

- Asynchronous with callbacks

```
import { countGroups } from 'lucidlink-assignment';

const grid = [
  [1, undefined, 2],
  [1, undefined, 2],
  [undefined, undefined, 2],
];

countGroups(grid, (err, result) => {
  if(err) {
    console.log(err);
  }

  console.log(result); //2
});
```
