import path from "path";
import { GenericContainer, Wait } from "testcontainers";
import { describe, it } from "vitest";

describe("server integration test", () => {
    it("should load and run without errors", async () => {
        const packageRoot = path.resolve(".");

        const container = await new GenericContainer("node:20-slim")
            .withCopyDirectoriesToContainer([{
                source: packageRoot,
                target: "/pkg"
            }])
            .withWorkingDir("/test-app")
            .withCommand(["sh", "-c", `
                mkdir -p /test-app &&
                cd /test-app &&
                npm init -y &&
                npm link /pkg &&
                node -e "
                    const pkg = require('lucidlink-assignment');
                    console.log('Package loaded:', typeof pkg);
                "
            `])
            .withWaitStrategy(Wait.forLogMessage("Package loaded:"))
            .start();

        const logs = (await container.logs());
        logs
            .on("data", (line: string) => console.log(line))
            .on("err", (line: string) => console.error(line));

        await container.stop();
    }, 60_000);
});