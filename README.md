# Loggle CLI

CLI tool for running loggle from terminal.

## Build

Install dependencies

```
bun i
```

Since this project utilizes `playwright`, you will need to have playwright setup if you havan't done so in other projects.

```
npx playwright install-deps
```

```
npx playwright install
```

## Commands

`./bin/loggle auth`
Login to loggle

`./bin/loggle ls`
List all projects and status

`./bin/loggle info [projectId]`
Show project details

`./bin/loggle start [projectId]`
Start tracking time for a project

`./bin/loggle stop [projectId]`
Stop tracking time for a project

`./bin/loggle help`
Show help message
