const fs = require('fs')
const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');

const port = 8225;

const app = express();
app.use(express.json());

const names = JSON.parse(fs.readFileSync('../utils/niceList.json').toString());
const tree = new MerkleTree(names);


const MERKLE_ROOT = 'ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa';

app.post('/gift', (req, res) => {
  const { name } = req.body;
  const nameIndex = names.indexOf(name);
  
  if (nameIndex < 0) {
    return res.send("You are not on the list :(");
  }
  
  const proof = tree.getProof(nameIndex);

  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});