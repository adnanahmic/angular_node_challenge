import fs from "fs";
import path from "path";

type DirectoryItem = {
  dir: any;
};

const dirs = fs.readdirSync(__dirname);
const modules: { [key: string]: any } = {};

for (let index = 0; index < dirs.length; index++) {
  const dir = dirs[index];
  if (dir === "index.js") continue;
  const moduleName = path.basename(dir, ".js");
  modules[moduleName] = require(`./${dir}`);
}

export = modules as { [key: string]: DirectoryItem };
