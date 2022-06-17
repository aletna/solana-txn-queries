import { getSignatures } from "./src/getSignatures";
import { getTxs, getTx } from "./src/getTransactionData";

const main = () => {
  // example queries
  getTx(
    "2ycdYc37wUtHdtgQ3AfqZDfJ5B2zv5AjPH66stvUd2ukTLRwTnewAtHGazaCVyxEJ3gqdUjccEG6uTJsUSVW5ysb",
    "testfilename"
  );

  getTxs(
    "DdZR6zRFiUt4S5mg7AV1uKB2z1f1WzcNYCaTEEWPAuby",
    100,
    "testfilename",
    200
  );

  getSignatures(
    "testfilename",
    "DdZR6zRFiUt4S5mg7AV1uKB2z1f1WzcNYCaTEEWPAuby",
    1000,
    100
  );
};

// main();

module.exports.getTx = (signature: string, outputName: string) => {
  if (!signature || !outputName) return "pls enter signature & outputName";
  getTx(signature, outputName);
};

module.exports.getSignatures = (
  outputName: string,
  address: string,
  limit: number,
  iterations: number,
  before?: string | undefined
) => {
  if (!address || !outputName || !limit || !iterations)
    return "pls enter outputName, address, limit and iterations. if you want also add before sig.";
  getSignatures(outputName, address, limit, iterations, before);
};

module.exports.getTxs = (
  address: string,
  iterations: number,
  outputName: string,
  batchSize?: number
) => {
  if (!address || !iterations || !outputName)
    return "pls enter address, iterations and outputName. if you want, also enter batchSize";
  getTxs(address, iterations, outputName, batchSize);
};

require("make-runnable/custom")({
  printOutputFrame: false,
});
