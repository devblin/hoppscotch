import { exec } from "child_process";
import { ExecResponse } from "./interface";

export const execAsync = (command: string): Promise<ExecResponse> =>
  new Promise((resolve) =>
    exec(command, (error, stdout, stderr) => resolve({ error, stdout, stderr }))
  );

export const testAsync = (time: number): Promise<string> =>
  new Promise((resolve) => setTimeout(() => resolve(`Done in ${time}`), time));

export const getCmdOutMsg = (out: string) => {
  const ansiRegex =
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
  return out.split("\n")[0].replace(ansiRegex, "");
};

export const getTestJsonFilePath = (file: string) => {
  const path = `~/Desktop/oss/hoppscotch/packages/hoppscotch-cli/src/tests/samples/`;
  return `${path}${file}`;
};
