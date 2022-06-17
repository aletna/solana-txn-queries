import { fs, fs_readFile, fs_writeFile } from "./constants";

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const writeObj = async (dataObj: any, fileName: string) => {
  return fs_writeFile(`output/${fileName}.json`, JSON.stringify(dataObj));
};

export const getFile = async (fileName: string) => {
  return fs_readFile(`output/${fileName}.json`, "utf8");
};

