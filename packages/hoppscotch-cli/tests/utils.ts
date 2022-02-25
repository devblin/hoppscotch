import { exec } from "child_process";
import { ExecResponse } from "./interface";

export const execAsync = (command: string): Promise<ExecResponse> =>
  new Promise((resolve) =>
    exec(command, (error, stdout, stderr) => resolve({ error, stdout, stderr }))
  );

export const testAsync = (time: number): Promise<string> =>
  new Promise((resolve) => setTimeout(() => resolve(`Done in ${time}`), time));

export const getErrorCode = (out: string) => {
  const ansiRegex =
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
  const ansiTrimmedStr = out.replace(ansiRegex, "");
  return ansiTrimmedStr.split(" ")[0];
};

export const getTestJsonFilePath = (file: string) => {
  const path = `${process.cwd()}/tests/samples/`;
  return `${path}${file}`;
};
