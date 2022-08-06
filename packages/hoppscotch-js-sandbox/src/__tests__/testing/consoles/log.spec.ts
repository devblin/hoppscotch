import * as TE from "fp-ts/TaskEither"
import { pipe } from "fp-ts/function"
import { execPreRequestScript } from "../../../preRequest"
import { Artifacts } from "../../../apis/artifact"
import { Envs } from "../../../apis/env"
import { HoppConsole } from "../../../apis/console"
import "@relmify/jest-fp-ts"

const DEFAULT_ENV = {
  global: [],
  selected: [],
}

const func = (script: string, envs: Envs, artifacts: Artifacts) =>
  pipe(
    execPreRequestScript(script, envs, artifacts),
    TE.map((x) => x.consoles)
  )

describe("pw.console.log", () => {
  test("provides console data correctly.", () => {
    return expect(
      func(
        `
        pw.env.set("ENV","ENV_VALUE")
        const data = pw.env.get("ENV")
        const obj = {
          a:1,
          b:2
        }

        pw.console.log("Obj:", obj)
        pw.console.log("Data:", data)

        pw.console.log()
        `,
        DEFAULT_ENV,
        {}
      )()
    ).resolves.toEqualRight(<Array<HoppConsole>>[
      {
        lineNumber: 9,
        data: ["Obj:", { a: 1, b: 2 }],
        type: "log",
      },
      {
        lineNumber: 10,
        data: ["Data:", "ENV_VALUE"],
        type: "log",
      },
      {
        lineNumber: 12,
        data: [],
        type: "log",
      },
    ])
  })
})
