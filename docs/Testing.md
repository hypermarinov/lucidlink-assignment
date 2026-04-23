## Testing:

There are two types of tests covering the package

- Unit tests
  The unit tests cover the basic functionality of the library. We use [vitest](https://vitest.dev/) as a testing framework. To run the unit tests run `npm run test:unit`
- Integration tests
  The integration tests help make sure that the package can be used both on the server with require and on the browser with ESM.
  The tests use [Testcontainers](https://testcontainers.com/) to start an app that will either use the package or serve a page that uses the package. The browser test also uses playwright for assertions in the browser. If you haven't setup playwright locally you need a browser to point it to. The current way is to download a headless Chromium shell wtih `npx playwright install chromium`. On the CI pipeline since it's running in a container with no browser installed we also need to install the system dependencies for the browser with `npx playwright install-deps chromium`. To run the integration tests run `npm run test:intergration`
