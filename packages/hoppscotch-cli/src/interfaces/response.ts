import { TestResponse } from "@hoppscotch/js-sandbox";
import { Method } from "axios";
import { ExpectResult } from "../types";

/**
 * Defines column headers for table stream used to write table
 * data on stdout.
 * @property {string} path Path of request within collection file.
 * @property {string} endpoint Endpoint from response config.url.
 * @property {Method} method Method from response headers.
 * @property {string} statusCode Template string concating status & statusText.
 */
export interface TableResponse {
  path: string;
  endpoint: string;
  method: Method;
  statusCode: string;
}

/**
 * Describes additional details of HTTP response returned from
 * requestRunner.
 * @property {string} path Path of request within collection file.
 * @property {string} endpoint Endpoint from response config.url.
 * @property {Method} method Method from HTTP response headers.
 * @property {string} statusText HTTP response status text.
 */
export interface RunnerResponseInfo extends TestResponse {
  path: string;
  endpoint: string;
  method: Method;
  statusText: string;
}

/**
 * Describes test script details.
 * @property {string} name Request name within collection.
 * @property {string} testScript Stringified hoppscotch testScript, used while
 * running testRunner.
 * @property {TestResponse} response Response structure for test script runner.
 */
export interface TestScriptData {
  name: string;
  testScript: string;
  response: TestResponse;
}

/**
 * Describe properties of test-report generated from test-runner.
 * @property {string} descriptor Test description.
 * @property {ExpectResult[]} expectResults Expected results for each
 * test-case.
 * @property {number} failing Total failing test-cases.
 * @property {number} passing Total passing test-cases;
 */
export interface TestReport {
  descriptor: string;
  expectResults: ExpectResult[];
  failing: number;
  passing: number;
}

/**
 * Describes error pair for failed HTTP requests.
 * @example { 501: "Request Not Supported" }
 */
export interface ResponseErrorPair {
  [key: number]: string;
}