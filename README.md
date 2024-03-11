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
Show status of given project

`./bin/loggle start [projectId]`
Start the given project

`./bin/loggle stop [projectId]`
Stop the given project
