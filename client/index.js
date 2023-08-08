const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:8225';

async function main() {

  const names = ["Mae Hyatt", "Beth Stracke", "Ms. Angel Morissette","Jorden Peterson"]; 

  names.forEach(async name => {
    const { data: gift } = await axios.post(`${serverUrl}/gift`, { name });

    console.log({ name, gift });
  })
}

main();