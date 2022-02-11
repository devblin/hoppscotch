import { collectionRunner } from "../../handlers";
import { CLIContext, CLIError } from "../../interfaces";
import { errors } from "../../utils";
import { getTestJsonFilePath } from "../utils";

describe("Testing collection runner handler for 'hopp-cli run <file>' command:", () => {
  test.concurrent("Invalid collection file path.", async () => {
    try {
      const ctx: CLIContext = { interactive: false };
      await collectionRunner(ctx, false);
    } catch (error) {
      const newError = <CLIError>error;
      expect(newError.code).toBe(errors.HOPP005.code);
    }
  });

  test.concurrent("File path not found.", async () => {
    try {
      const ctx: CLIContext = { interactive: false, path: "fake.json" };
      await collectionRunner(ctx, false);
    } catch (error) {
      const newError = <CLIError>error;
      expect(newError.code).toBe(errors.HOPP001.code);
    }
  });

  test.concurrent("Malformed collection json file.", async () => {
    try {
      const ctx: CLIContext = {
        interactive: false,
        path: getTestJsonFilePath("invalid.json"),
      };
      await collectionRunner(ctx, false);
    } catch (error) {
      const newError = <CLIError>error;
      expect(newError.code).toBe(errors.HOPP001.code);
    }
  });

  test.concurrent("File not json type.", async () => {
    try {
      const ctx: CLIContext = {
        interactive: false,
        path: getTestJsonFilePath("passes.json"),
      };
      await collectionRunner(ctx, false);
    } catch (error) {
      const newError = <CLIError>error;
      expect(newError.code).toBe(errors.HOPP004.code);
    }
  });
});
