import fs from "fs";
import readline from "readline";
import blessed from "blessed";
import { formatLogLines } from "./helperFunctions.js";
import { debugToFile } from "../helpers.js";

export function createIndexingLog(grid, indexingClientLabel) {
  const indexingLog = grid.set(5, 0, 2, 7, blessed.box, {
    label: `${indexingClientLabel}`,
    content: `Loading ${indexingClientLabel} logs`,
    border: {
      type: "line",
      fg: "cyan",
    },
    tags: true,
    shrink: true,
  });

  return indexingLog;
}

export function updateIndexingClientInfo(logFilePath, log, screen) {
  // console.log(logFilePath);
  // console.log(log);
  // console.log(screen);
}
