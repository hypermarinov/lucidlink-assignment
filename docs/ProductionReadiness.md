## Production readiness

The important things in my opinion for an npm package to be production ready are the following:

- It must be versioned
  Versioning is achieved with semantic-release, see SemanticVersioning.md. As a nice addition from semantic-release we also get a changelog
- It must be tested
  Used a combination of vitest, testcontainers and playwright to perform extensive testing.
- It must be documented
  The important thing here is to document any errors that the package throws.
- It must have a CI/CD pipeline in place
  GitHub actions do a good enough job at this.
- Code quality must be enforced
  The assumption here is that this project will be either open sourced or closed sourced inside a company so there will not be only one contributor. To make collaboration easier we introduce code quality standards.
  Tools like eslint, prettier, husky and lint-staged are used for this
- Outputs must support both TypeScript and Javascript with both CommonJS and ES modules
  We use the tsdown bundler and configure it to output both cjs and mjs files. This gives the user the freedom to chose wether they want to use the package with import or require.
  Another thing we use it for is to provide \*.d.ts type declaration files for enabling IntelliSense, autocomplete, type checking and hover hints.
- Input validation
  We should provide input validation and properly communicate when the input is not valid to the users. The most common way to do this is to either throw an error when something is invalid or return the error wrapped in a Result object. The choice made here is to throw errors since the Result pattern would force an opinion on how code should be written on the users and a simple package like this one doesn't need to do so.
- This one is optional - give the freedom of choice to the user
  I looked at the streams package in node and what stood out to me is that for each function there are 3 ways to use it - async with callbacks, async with promises and a synchronous version. That's why I've provided those 3 options as well.
