import { PublicKey } from "@solana/web3.js";
import { connection } from "./constants";
import { writeObj } from "./utils";

export const getSignatures = async (
  outputName: string,
  address: string,
  limit: number,
  iterations: number,
  before?: string
): Promise<string[]> => {
  let beforeSig = before;
  console.log("fetch batch", 1);
  let totalSigs = await _getSignatures(address, limit, beforeSig);
  beforeSig = totalSigs[totalSigs.length - 1];
  for (let iter of [...Array(iterations - 1).keys()]) {
    console.log("fetch batch", iter + 2);
    const sigs: string[] = await _getSignatures(address, limit, beforeSig);
    totalSigs = totalSigs.concat(sigs);
    beforeSig = sigs[sigs.length - 1];
  }
  console.log(totalSigs, totalSigs.length);
  await writeObj({ totalSigs }, outputName);
  return totalSigs;
};

export const _getSignatures = async (
  address: string,
  limit: number,
  before?: string
): Promise<string[]> => {
  return (
    await connection.getConfirmedSignaturesForAddress2(new PublicKey(address), {
      limit,
      before: before ? before : undefined,
    })
  ).map((sig) => sig.signature);
};
