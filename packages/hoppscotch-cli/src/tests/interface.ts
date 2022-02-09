import { ExecException } from "child_process";

export interface ExecResponse {
  error: ExecException | null;
  stdout: string;
  stderr: string;
}
