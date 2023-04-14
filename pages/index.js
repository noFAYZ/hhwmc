import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { Web3Button } from "@thirdweb-dev/react";
import { useSDK,useContractRead } from "@thirdweb-dev/react";
const ethers = require('ethers');
import { getRawProofForAddress } from '../utils/whitekist';
import contractABI from "../utils/ABI.json"
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { parseEther } from "ethers/lib/utils";
import { useState } from "react";
import { contains } from "../utils/whitekist";
import JSConfetti from 'js-confetti'
import Head from 'next/head'

export default function Home() {

  const address = useAddress()
 



  const [mintAmount,setmintAmount]= useState(1)
  const [txHash,settxHash]= useState()

  const { contract } = useContract("0x851431D95Df0456314FAA179491cC16eC4A063EC");

 

  const { isTimerExpired, isLoading } = useContractRead(contract, "timerExpired")


  return (
    <div className={styles.container}>
      <Head>
        <title>HitmonBox Mint</title>
      </Head>
      <div className="flex justify-end mt-10"><ConnectWallet  /></div>

      
      <main className={styles.main}>

         
        <h1 className={styles.title}>
        HitmonBox Mint is <a href="#">LIVE</a>!
        </h1>

       <div className={styles.card}>
{address ? 

<> <div className="flex justify-center align-middle content-center mt-5"> 

              <button className="bg-slate-500 px-3 pb-1 rounded-full text-xl align-middle mr-5" onClick={()=>mintAmount-1 >=1 ? setmintAmount(mintAmount-1): null}>-</button>
              <span className="flex content-center justify-center rounded px-2 w-fit text-3xl" >{mintAmount}</span>
              <button className="bg-slate-500 px-2 pb-1 rounded-full text-xl align-middle ml-5" onClick={()=>setmintAmount(mintAmount+1)}>+</button>
    </div>
  
  {!isTimerExpired && !contains(address) ? <> <div className="mt-10 mb-5">
         
         <Web3Button
       contractAddress="0x851431D95Df0456314FAA179491cC16eC4A063EC"
       action={async (contract) => {
 
         try {
           const tx = await contract.call("whitelistMint", [mintAmount,[getRawProofForAddress(address)]],{
           gasLimit: 100000, // The maximum amount of gas this transaction is permitted to use.
           value: parseEther((mintAmount*0.01).toString()), // send 0.1 ether with the contract call
    
         })
 
         if(tx.receipt.status){
          const jsConfetti = new JSConfetti()
          jsConfetti.addConfetti({
            emojis: ['💫', '⚡️', '💥', '✨', '💫', '🌸'],
         })
         }
         settxHash(tx.receipt.transactionHash)
         console.log("tx: ", tx.receipt.transactionHash)
         } catch (error) {
           console.log(error)
         }
         }}
      
     >
       Whitelist Mint
         </Web3Button>
        
   </div> </> : 
  
  <> 
  
  
  <div className="my-10">
         


         <Web3Button
       contractAddress="0x851431D95Df0456314FAA179491cC16eC4A063EC"
       action={async (contract) => {
 
         try {
           const tx = await contract.call("mint", [mintAmount],{
           gasLimit: 100000, // The maximum amount of gas this transaction is permitted to use.
           value: parseEther((mintAmount*0.01).toString()), // send 0.1 ether with the contract call
    
         })
 
         if(tx.receipt.status){
          const jsConfetti = new JSConfetti()
          jsConfetti.addConfetti({
            emojis: ['💫', '⚡️', '💥', '✨', '💫', '🌸'],
         })
         }
         settxHash(tx.receipt.transactionHash)
         console.log("tx: ", tx.receipt.transactionHash)
         console.log("tx: ", tx)
         } catch (error) {
           console.log(error)
         }
         }}
      
     >
       Mint
         </Web3Button>
        
   </div></> }
  
  </> : <>


  
  
  </>}

       </div>

       

        <div className="my-10">
          {txHash? <div > <span className="text-black font-bold">TX:</span>  <a className="bg-gray-800 px-2 rounded" href="" >etherscan.io/tx/{txHash}</a></div> : <></>}
     
        </div>
      </main>
    </div>
  );
}
