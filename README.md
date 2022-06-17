install
`yarn install`

then run one of the following

to get a single transaction object:
`yarn get-tx {signature} {filename}`

to get multiple transaction objects:
`yarn get-txns {address} {iterations} {filename} {batchsize}`

to get signatures
`npx tsc --outDir dist && node dist/index.js getSignature {address} {iterations} {outputName} {batchSize}`
