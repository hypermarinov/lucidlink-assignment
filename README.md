# lucidlink-assignment

## Semantic versioning for this package:

This package uses semantic versioning. To bump the version you need to add +semver:<patch|minor|major> to commit name.
All PRs will be squashed so when prompted for a commit message add the semver to the commit message if not present. For example if the current version is 1.0.1 and you create a commit message "My perfect PR +semver:minor" it will bump the version to 1.1.0. If no +semver is provided the PR will be treated as a patch PR.

## Testing:

There are two types of tests covering the package

- Unit tests
  The unit tests cover the basic functionality of the library. We use [vitest](https://vitest.dev/) as a testing framework. To run the unit tests run `npm run test:unit`
- Integration tests
  The integration tests help make sure that the package can be used both on the server with require and on the browser with ESM.
  The tests use [Testcontainers](https://testcontainers.com/) to start an app that will either use the package or serve a page that uses the package. The browser test also uses playwright for assertions in the browser. If you haven't setup playwright locally you need a browser to point it to. The current way is to download a headless Chromium shell wtih `npx playwright install chromium`. On the CI pipeline since it's running in a container with no browser installed we also need to install the system dependencies for the browser with `npx playwright install-deps chromium`. To run the integration tests run `npm run test:intergration`

## Git hooks

We use [husky](https://typicode.github.io/husky/) for git hooks. Currently there's only one git hook which is triggered on pre-commit and uses [lint-staged](https://github.com/lint-staged/lint-staged). What it allows us to do is before each commit we run linting and formatting checks on the staged files only and if those checks fail the commit will fail and it will show us the error with which it failed either in the terminal or the git GUI we use.

##### Important note on Husky

The pre-commit step uses the default node version provided by [nvm](https://www.nvmnode.com/) so make sure you have nvm installed.
