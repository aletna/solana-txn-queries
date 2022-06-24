install
`yarn install`

then run one of the following

to get a single transaction object:
`yarn get-tx {signature} {filename}`

to get multiple transaction objects (batchSize is optional):
`yarn get-txns {address} {iterations} {filename} {batchsize}`

to get signatures:
`yarn get-sigs {address} {iterations} {outputName} {batchSize}`
