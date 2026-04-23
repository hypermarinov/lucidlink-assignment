## Git hooks

We use [husky](https://typicode.github.io/husky/) for git hooks. Currently there's only one git hook which is triggered on pre-commit and uses [lint-staged](https://github.com/lint-staged/lint-staged). What it allows us to do is before each commit we run linting and formatting checks on the staged files only and if those checks fail the commit will fail and it will show us the error with which it failed either in the terminal or the git GUI we use.

##### Important note on Husky

The pre-commit step uses the default node version provided by [nvm](https://www.nvmnode.com/) so make sure you have nvm installed.
