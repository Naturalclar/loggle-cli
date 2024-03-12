export function help() {
  console.info("Usage: loggle <command>");
  console.info("Commands:");
  console.info("  auth               Login to Loggle");
  console.info("  ls                 List all projects and status");
  console.info("  info  [projectId]  Show project details");
  console.info("  start [projectId]  Start tracking time for a project");
  console.info("  stop  [projectId]  Stop tracking time for a project");
  console.info("  whoami             Show your profile name");
  console.info("  help               Show this help message");
}
