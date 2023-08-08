const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:8225';

const tree = new MerkleTree(niceList);

async function main() {

  const name =  "Ms. Angel Morissette"; 
  const index = niceList.findIndex(n => n === name)
  const proof = tree.getProof(index)

  const { data: gift } = await axios.post(`${serverUrl}/gift`, { proof, name });

  console.log({ name, gift });
}

main();