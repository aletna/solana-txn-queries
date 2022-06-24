import { fs, fs_readFile, fs_writeFile } from "./constants";

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

var outputDir = "./output";

export const writeObj = async (dataObj: any, fileName: string) => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  return fs_writeFile(`${outputDir}/${fileName}.json`, JSON.stringify(dataObj));
};

export const getFile = async (fileName: string) => {
  return fs_readFile(`${outputDir}/${fileName}.json`, "utf8");
};
