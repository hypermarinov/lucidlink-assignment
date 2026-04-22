import path from "path";
import { GenericContainer, Wait } from "testcontainers";
import { chromium, type Browser, type Page } from "playwright";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

describe("browser smoke test", () => {
    let browser: Browser;
    let page: Page;
    let container: Awaited<ReturnType<GenericContainer["start"]>>;

    beforeAll(async () => {
        const packageRoot = path.resolve(".");

        // 1. Serve a static HTML page that imports your package via ESM
        container = await new GenericContainer("node:20-slim")
            .withCopyDirectoriesToContainer([{
                source: packageRoot,
                target: "/pkg"
            }])
            .withExposedPorts(3000)
            .withCommand(["sh", "-c", `
    cd /tmp && mkdir app && cd app &&
    npm init -y &&
    npm link /pkg &&
    mkdir -p public/pkg &&
    cp -r node_modules/lucidlink-assignment/dist public/pkg/dist &&
    cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html>
  <body>
    <div id="result">loading...</div>
    <script type="importmap">
  { "imports": { "lucidlink-assignment": "/pkg/dist/index.js" } }
</script>
<script type="module">
  import { countGroupsSync } from 'lucidlink-assignment';
  const result = document.getElementById('result');
  try {
    const grid = [[1, 2], [1, 2]];
    const count = countGroupsSync(grid);
    result.textContent = 'Package loaded, countGroupsSync result: ' + count;
  } catch (e) {
    result.textContent = 'Error: ' + e.message;
  }
</script>
  </body>
</html>
EOF
    npx --yes serve public -l 3000
`])
            .withWaitStrategy(Wait.forLogMessage("Accepting connections"))
            .start();

        const host = container.getHost();
        const port = container.getMappedPort(3000);

        // 2. Launch browser and navigate to the page
        browser = await chromium.launch();
        page = await browser.newPage();

        await page.goto(`http://${host}:${port}`);

        const html = await page.content();
        console.log("[page html]", html);

        // Also check the current state of #result immediately
        const immediate = await page.textContent("#result");
        console.log("[result immediately]", immediate);
    }, 120_000);

    afterAll(async () => {
        await browser?.close();
        await container?.stop();
    });

    it("imports the package without errors", async () => {
        await page.waitForFunction(
            () => document.getElementById("result")?.textContent !== "loading...",
            null,
            { timeout: 120_000 }
        );

        const content = await page.textContent("#result");
        expect(content).not.toContain("Error:");
        expect(content).toContain("Package loaded, countGroupsSync result: 2");
    }, 120_000);
});