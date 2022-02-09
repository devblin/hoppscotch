import { exec } from "child_process";
import { ExecResponse } from "./interface";

export const execAsync = (command: string): Promise<ExecResponse> =>
  new Promise((resolve) =>
    exec(command, (error, stdout, stderr) => resolve({ error, stdout, stderr }))
  );

export const testAsync = (time: number): Promise<string> =>
  new Promise((resolve) => setTimeout(() => resolve(`Done in ${time}`), time));
