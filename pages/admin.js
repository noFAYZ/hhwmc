import React, { useEffect } from 'react'
import { useState } from 'react'
import { isValidAddress } from 'ethereumjs-util';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import { getRawProofForAddress } from '../utils/whitekist';

function Admin() {

const [merkleArray,setmerkleArray] = useState([])
const [merkleProofArray,setmerkleProofArray] = useState()
const [merkleRootHash,setmerkleRootHash] = useState()
const [merkleRootProof,setmerkleRootProof] = useState([])

useEffect(()=>{
    const validAddresses= getValidAddresses(merkleArray);
    const leafNodes = validAddresses.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    const rootHash = '0x' + merkleTree.getRoot().toString('hex');

    setmerkleRootHash(rootHash)

},[merkleArray])

useEffect(()=>{

console.log(merkleProofArray)

    const merkleProof = getRawProofForAddress(merkleProofArray);

    console.log(merkleProof)

    setmerkleRootProof(merkleProof)

},[merkleProofArray])


function parseArray(str) {
    const items = str.split(',');     
    const newItems =  items.map((item) => item.trim());
    return newItems.map((item)=>item!=""? item : null)


}
function getValidAddresses(addresses) {
    // Filter out valid addresses and return the remaining invalid ones
    return addresses.filter((address) => isValidAddress(address));
  }

  return (
    <div className=' '>
          <div className='flex justify-center mt-20'>  <label className=' pr-2'>Merkle Root Hash: 
               
            </label>
            
            <span className="rounded px-2 bg-slate-700 "  >{merkleRootHash}</span>     </div>
        <div className='flex  flex-col flex-wrap justify-center mt-20 content-center'>

        
            <label>
                Enter Whitelisted Wallet Addresses:
                 <textarea className='flex flex-grow justify-center mt-2 rounded-md border px-3 py-2' placeholder='0xKH1GK31HG23,  0x23G42G4KH2' cols={50} autoFocus required rows={6} onChange={(e)=> setmerkleArray(parseArray(e.target.value))}/>
            </label>
       

  {/*       <input className='mt-2 border rounded-md py-2 hover:bg-slate-800 focus-active:bg-slate-700' type="submit" value="Submit" /> */}

        </div>


        <div className='flex justify-center mt-20'>  <label className=' pr-2'>Merkle Root Proof: 
               
               </label>
               
               <span className="rounded px-2 bg-slate-700 "  >{merkleRootProof}</span>     </div>
           <div className='flex  flex-col flex-wrap justify-center mt-20 content-center'>
   
           
               <label>
                   Enter Whitelisted Wallet Addresses:
                    <textarea className='flex flex-grow justify-center mt-2 rounded-md border px-3 py-2' placeholder='0xKH1GK31HG23,  0x23G42G4KH2' cols={50} autoFocus required rows={6} onChange={(e)=> setmerkleProofArray((e.target.value))}/>
               </label>
          
   
         {/*   <input className='mt-2 border rounded-md py-2 hover:bg-slate-800 focus-active:bg-slate-700' type="submit" value="Submit" /> */}
   
           </div>
     
 
         
        </div>
  )
}

export default Admin