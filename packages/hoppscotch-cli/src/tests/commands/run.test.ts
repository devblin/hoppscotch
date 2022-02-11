import { execAsync, getCmdOutMsg, getTestJsonFilePath } from "../utils";
import { errors } from "../../utils";

describe("Test 'hopp-cli run <file>' command:", () => {
  test.concurrent("No file path provided.", async () => {
    const res = await execAsync(`pnpx hopp-cli run`);
    const out = getCmdOutMsg(res.stdout);
    expect(out).toBe(
      `ERROR [${errors.HOPP005.code}]: ${errors.HOPP005.message}`
    );
  });

  test.concurrent("Invalid collection.json file path.", async () => {
    const res = await execAsync(`pnpx hopp-cli run test.json`);
    const out = getCmdOutMsg(res.stdout);
    expect(out).toBe(
      `ERROR [${errors.HOPP001.code}]: ${errors.HOPP001.message}`
    );
  });

  test.concurrent("Malformed collection.json file.", async () => {
    const res = await execAsync(
      `pnpx hopp-cli run ${getTestJsonFilePath("invalid.json")}`
    );
    const out = getCmdOutMsg(res.stdout);
    expect(out).toBe(
      `ERROR [${errors.HOPP003.code}]: ${errors.HOPP003.message}`
    );
  });

  test.concurrent("File not json type.", async () => {
    const res = await execAsync(
      `pnpx hopp-cli run ${getTestJsonFilePath("notjson.txt")}`
    );
    const out = getCmdOutMsg(res.stdout);
    expect(out).toBe(
      `ERROR [${errors.HOPP004.code}]: ${errors.HOPP004.message}`
    );
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
      const { error } = await execAsync(
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
    "No testScripts.",
    async () => {
      const res = await execAsync(
        `pnpx hopp-cli run ${getTestJsonFilePath("notests.json")}`
      );
      if (res.error) {
        expect(res.error.code).not.toBe(0);
      } else {
        expect(res.error).toBeNull();
      }
    },
    10000
  );
});
