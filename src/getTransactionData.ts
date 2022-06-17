import { PublicKey } from "@solana/web3.js";
import { StringMappingType } from "typescript";
import { BATCH_SIZE, connection, fs } from "./constants";
import { delay, getFile, writeObj } from "./utils";

export const getTx = async (signature: string, outputName: string) => {
  const data = await connection.getParsedTransaction(signature);
  //   const data = await connection.getParsedTransaction(
  //     "rrxi3ctn8aXZYnEknwiFvCHMXKJdeyPmC4D1WWgpH6v1gWDjofL3Nu825vPHcQ156bfPzmQSvALTqVA8bbp5rnV"
  //   );
  await writeObj({ data }, outputName);
};

export const getTxs = async (
  address: string,
  iterations: number,
  outputName: string,
  batchSize: number = BATCH_SIZE
) => {
  await runMultipleIterations(address, iterations, outputName, batchSize);
};

export const runMultipleIterations = async (
  address: string,
  iterations: number,
  outputName: string,
  batchSize: number = BATCH_SIZE
) => {
  console.log("Start");
  const arr = Array.from(Array(iterations).keys());
  let count = 0;
  for (const i of arr) {
    console.log("starting batch", count);
    await runBatch(address, batchSize, outputName);
    console.log("finished batch", count);
    count++;
    console.log("");
  }

  console.log("End");
};

const runBatch = async (
  address: string,
  batchSize: number = BATCH_SIZE,
  outputName: string
) => {
  const lengthPre = await getFileLength(outputName);
  console.log("FILE LENGTH PRE:", lengthPre);
  await delay(2000);
  try {
    if (!fs.existsSync(`output/${outputName}.json`))
      await writeObj({}, outputName);

    const data = await JSON.parse(await getFile(outputName));

    const currentTxnData = data.data ? data.data : [];

    let latestSig = await getLatestSignature(outputName);

    const newTxnData = await getTransactionData(address, batchSize, latestSig);

    const combinedTxnData = currentTxnData.concat(newTxnData);

    const updatedTxnData: any = {};
    updatedTxnData.data = combinedTxnData;
    await writeObj(updatedTxnData, outputName);

    const lengthPost = await getFileLength(outputName);
    console.log("FILE LENGTH POST:", lengthPost);
  } catch (e) {
    console.error(e);
  }
};

const _getSignatures = async (
  publicKey: PublicKey,
  limit: number,
  before?: string
): Promise<string[]> => {
  return (
    await connection.getConfirmedSignaturesForAddress2(publicKey, {
      limit,
      before: before ? before : undefined,
    })
  ).map((sig) => sig.signature);
};

const getTransactionData = async (
  address: string,
  limit = 200,
  before?: string
) => {
  const sigs = await _getSignatures(new PublicKey(address), limit, before);
  return getParsedTransactions(sigs);
};

const getParsedTransactions = async (sigs: string[]) => {
  const txns = await connection.getParsedTransactions(sigs);
  const res: any = [];
  txns
    .filter((_tx: any) => _tx !== null)
    .forEach((_tx) => {
      if (_tx?.blockTime) {
        res.push(_tx);
      }
    });
  return res;
};

const getLatestSignature = async (fileName: string) => {
  if (!fs.existsSync(`output/${fileName}.json`)) return;
  const data = await JSON.parse(await getFile(fileName));
  if (!data.data || data.data.length === 0) return;
  return data.data[data.data.length - 1].transaction.signatures[0];
};

export const getFileLength = async (fileName: string) => {
  if (!fs.existsSync(`output/${fileName}.json`)) return 0;
  const data = await JSON.parse(await getFile(fileName));
  if (!data.data) return 0;
  return data.data.length;
};
