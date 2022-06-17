import { Connection } from "@solana/web3.js";

export const connection: Connection = new Connection(
  "https://ssc-dao.genesysgo.net/"
);

export const fs = require("fs");
export const util = require("util");
export const fs_writeFile = util.promisify(fs.writeFile);
export const fs_readFile = util.promisify(fs.readFile);

export const BATCH_SIZE = 200;
