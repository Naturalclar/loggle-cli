#!/usr/bin/env bun
import { help } from "./help";
import { Loggle } from "./loggle";
import minimist from "minimist";

export async function main() {
  const argv = process.argv.slice(2);

  const args = minimist(argv);

  type Options = "auth" | "ls" | "help" | "info" | "start" | "stop";

  const option: Options = args._[0];

  if (!option || option === "help") {
    help();
    process.exit(0);
  }

  const loggle = new Loggle();

  await loggle.init();

  if (option === "auth") {
    await loggle.login();
    await loggle.close();
    process.exit(0);
  }

  if (option === "ls") {
    await loggle.listProjects();
    await loggle.close();
    process.exit(0);
  }

  if (option === "info") {
    const projectId = args._[1];
    await loggle.showProjectInfo(projectId);
    await loggle.close();
    process.exit(0);
  }

  if (option === "start") {
    const projectId = args._[1];
    await loggle.startProject(projectId);
    await loggle.close();
    process.exit(0);
  }

  if (option === "stop") {
    const projectId = args._[1];
    await loggle.stopProject(projectId);
    await loggle.close();
    process.exit(0);
  }

  console.log(`unknown option: ${option}`);
  help();
  process.exit(0);
}
