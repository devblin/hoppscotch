import { testAsync } from "../utils";

describe("Checks 'hopp-cli test' command:", () => {
  describe("Succesful executions:", () => {
    test.concurrent("2000ms test.", async () => {
      const time = 2000;
      const res = await testAsync(time);
      expect(res).toBe(`Done in ${time}`);
    });
    test.concurrent("2000ms test.", async () => {
      const time = 2000;
      const res = await testAsync(time);
      expect(res).toBe(`Done in ${time}`);
    });
    test.concurrent("2000ms test.", async () => {
      const time = 2000;
      const res = await testAsync(time);
      expect(res).toBe(`Done in ${time}`);
    });
  });
});
