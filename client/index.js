const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  const indexClient = getRandomInt(0, niceList.length - 1);
  const leaf = niceList[indexClient];
  const mt = new MerkleTree(niceList);
  const proof = mt.getProof(indexClient);

  console.log(`Checking gift for: ${niceList[indexClient]}`);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    leaf,
  });

  console.log(gift);
}

main();
