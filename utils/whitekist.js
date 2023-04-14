import whitelistAddresses from './whitelist.json';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';


const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
const rootHash = '0x' + merkleTree.getRoot().toString('hex');


export function getProofForAddress(address )
  {
    return merkleTree.getHexProof(keccak256(address));
  }

export function getRawProofForAddress(address )
  {
    return getProofForAddress(address).toString().replaceAll('\'', '').replaceAll(' ', '');
  }

export function contains(address)
  {
    return merkleTree.getLeafIndex(Buffer.from(keccak256(address))) >= 0;
  }