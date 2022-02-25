import { execAsync, getErrorCode, getTestJsonFilePath } from "../utils";
import { HoppErrorCode } from "../../src/types";

describe("Test 'hopp-cli run <file>' command:", () => {
  test.concurrent("No file path provided.", async () => {
    const { stdout } = await execAsync(`pnpx hopp-cli run`);
    const out = getErrorCode(stdout);
    const code: HoppErrorCode = "NO_FILE_PATH";
    expect(out).toBe(code);
  });

  test.concurrent("File not found.", async () => {
    const { stdout } = await execAsync(`pnpx hopp-cli run test.json`);
    const out = getErrorCode(stdout);
    const code: HoppErrorCode = "FILE_NOT_FOUND";
    expect(out).toBe(code);
  });

  test.concurrent("Malformed collection.json file.", async () => {
    const { stdout } = await execAsync(
      `pnpx hopp-cli run ${getTestJsonFilePath("invalid.json")}`
    );
    const out = getErrorCode(stdout);
    const code: HoppErrorCode = "MALFORMED_COLLECTION";
    expect(out).toBe(code);
  });

  test.concurrent("File not json type.", async () => {
    const { stdout } = await execAsync(
      `pnpx hopp-cli run ${getTestJsonFilePath("notjson.txt")}`
    );
    const out = getErrorCode(stdout);
    const code: HoppErrorCode = "FILE_NOT_JSON";
    expect(out).toBe(code);
  });

  test.concurrent("Invalid pre-script.", async () => {
    const { stdout } = await execAsync(
      `pnpx hopp-cli run ${getTestJsonFilePath("prescripterror.json")}`
    );
    const out = getErrorCode(stdout);
    const code: HoppErrorCode = "PRE_REQUEST_SCRIPT_ERROR";
    expect(out).toBe(code);
  });

  test.concurrent("Invalid test-script.", async () => {
    const { stdout } = await execAsync(
      `pnpx hopp-cli run ${getTestJsonFilePath("testscripterror.json")}`
    );
    const code: HoppErrorCode = "TEST_SCRIPT_ERROR";
    expect(stdout).toContain(code);
  });

  test.concurrent(
    "Some tests failing.",
    async () => {
      const { error } = await execAsync(
        `pnpx hopp-cli run ${getTestJsonFilePath("fails.json")}`
      );
      if (error) {
        expect(error.code).toBe(1);
      } else {
        expect(error).not.toBeNull();
      }
    },
    10000
  );

  test.concurrent(
    "All tests passing.",
    async () => {
      const { error, stdout, stderr } = await execAsync(
        `pnpx hopp-cli run ${getTestJsonFilePath("passes.json")}`
      );
      if (error) {
        expect(error.code).toBe(0);
      } else {
        expect(error).toBeNull();
      }
    },
    10000
  );

  test.concurrent(
    "No tests-script.",
    async () => {
      const { error } = await execAsync(
        `pnpx hopp-cli run ${getTestJsonFilePath("notests.json")}`
      );
      if (error) {
        expect(error.code).not.toBe(0);
      } else {
        expect(error).toBeNull();
      }
    },
    10000
  );
});
