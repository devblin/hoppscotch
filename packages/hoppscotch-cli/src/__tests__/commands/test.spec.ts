import { HoppErrorCode } from "../../types/errors";
import { execAsync, getErrorCode, getTestJsonFilePath } from "../utils";

describe("Test 'hopp test <file>' command:", () => {
  test("No collection file path provided.", async () => {
    const cmd = `pnpx hopp test`;
    const { stdout } = await execAsync(cmd);
    const out = getErrorCode(stdout);

    expect(out).toBe<HoppErrorCode>("NO_FILE_PATH");
  });

  test("Collection file not found.", async () => {
    const cmd = `pnpx hopp test notfound.json`;
    const { stdout } = await execAsync(cmd);
    const out = getErrorCode(stdout);

    expect(out).toBe<HoppErrorCode>("FILE_NOT_FOUND");
  });

  test("Malformed collection file.", async () => {
    const cmd = `pnpx hopp test ${getTestJsonFilePath(
      "malformed-collection.json"
    )}`;
    const { stdout } = await execAsync(cmd);
    const out = getErrorCode(stdout);

    expect(out).toBe<HoppErrorCode>("MALFORMED_COLLECTION");
  });

  test("Invalid arguement.", async () => {
    const cmd = `pnpx hopp invalid-arg`;
    const { stdout } = await execAsync(cmd);
    const out = getErrorCode(stdout);

    expect(out).toBe<HoppErrorCode>("INVALID_ARGUMENT");
  });

  test("Collection file not JSON type.", async () => {
    const cmd = `pnpx hopp test ${getTestJsonFilePath("notjson.txt")}`;
    const { stdout } = await execAsync(cmd);
    const out = getErrorCode(stdout);

    expect(out).toBe<HoppErrorCode>("FILE_NOT_JSON");
  });

  test("Some errors occured (exit code 1).", async () => {
    const cmd = `pnpx hopp test ${getTestJsonFilePath("fails.json")}`;
    const { error } = await execAsync(cmd);

    expect(error).not.toBeNull();
    if (error) {
      expect(error.code).toBe(1);
    }
  });

  test("No errors occured (exit code 0).", async () => {
    const cmd = `pnpx hopp test ${getTestJsonFilePath("passes.json")}`;
    const { error } = await execAsync(cmd);

    expect(error).toBeNull();
    if (error) {
      expect(error.code).toBe(0);
    }
  }, 10000);
});
