import { execAsync, getErrorCode, getTestJsonFilePath } from "../utils";
import { HoppErrorCode } from "../../types";

describe("Test 'hopp-cli run <file>' command:", () => {
  test.concurrent("No collection file path provided.", async () => {
    const { stdout } = await execAsync(`pnpx hopp-cli run`);
    const out = getErrorCode(stdout);
    const code: HoppErrorCode = "NO_FILE_PATH";
    expect(out).toBe(code);
  });

  test.concurrent("Collection file not found.", async () => {
    const { stdout } = await execAsync(`pnpx hopp-cli run test.json`);
    const out = getErrorCode(stdout);
    const code: HoppErrorCode = "FILE_NOT_FOUND";
    expect(out).toBe(code);
  });

  test.concurrent("Malformed collection file.", async () => {
    const cmd = `pnpx hopp-cli run ${getTestJsonFilePath("invalid.json")}`;
    const { stdout } = await execAsync(cmd);
    const out = getErrorCode(stdout);
    const code: HoppErrorCode = "MALFORMED_COLLECTION";
    expect(out).toBe(code);
  });

  test.concurrent("Collection file not JSON type.", async () => {
    const cmd = `pnpx hopp-cli run ${getTestJsonFilePath("notjson.txt")}`;
    const { stdout } = await execAsync(cmd);
    const out = getErrorCode(stdout);
    const code: HoppErrorCode = "FILE_NOT_JSON";
    expect(out).toBe(code);
  });

  test.concurrent("Invalid pre-script.", async () => {
    const cmd = `pnpx hopp-cli run ${getTestJsonFilePath(
      "prescripterror.json"
    )}`;
    const { stdout } = await execAsync(cmd);
    const out = getErrorCode(stdout);
    const code: HoppErrorCode = "PRE_REQUEST_SCRIPT_ERROR";
    expect(out).toBe(code);
  });

  test.concurrent("Invalid test-script.", async () => {
    const cmd = `pnpx hopp-cli run ${getTestJsonFilePath(
      "testscripterror.json"
    )}`;
    const { stdout } = await execAsync(cmd);
    const code: HoppErrorCode = "TEST_SCRIPT_ERROR";
    expect(stdout).toContain(code);
  });

  test.concurrent("Some test-cases failing.", async () => {
    const cmd = `pnpx hopp-cli run ${getTestJsonFilePath("fails.json")}`;
    const { error } = await execAsync(cmd);

    if (error) {
      expect(error.code).toBe(1);
    } else {
      expect(error).not.toBeNull();
    }
  });

  test.concurrent("All test-cases passing.", async () => {
    const cmd = `pnpx hopp-cli run ${getTestJsonFilePath("passes.json")}`;
    const { error } = await execAsync(cmd);

    if (error) {
      expect(error.code).toBe(0);
    } else {
      expect(error).toBeNull();
    }
  });

  test.concurrent("No tests-script in collection.", async () => {
    const cmd = `pnpx hopp-cli run ${getTestJsonFilePath("notests.json")}`;
    const { error } = await execAsync(cmd);

    if (error) {
      expect(error.code).not.toBe(0);
    } else {
      expect(error).toBeNull();
    }
  });

  test.concurrent("Invalid JSON syntax in collection.", async () => {
    const cmd = `pnpx hopp-cli run ${getTestJsonFilePath("corrupt.json")}`;
    const { stdout } = await execAsync(cmd);
    const out = getErrorCode(stdout);
    const code: HoppErrorCode = "SYNTAX_ERROR";
    expect(out).toBe(code);
  });

  test.concurrent("Unable to parse collection.", async () => {
    const cmd = `pnpx hopp-cli run ${getTestJsonFilePath("parseerror.json")}`;
    const { stdout } = await execAsync(cmd);
    const out = getErrorCode(stdout);
    const code: HoppErrorCode = "PARSING_ERROR";
    expect(out).toBe(code);
  });
});
