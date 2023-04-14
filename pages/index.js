import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { Web3Button } from "@thirdweb-dev/react";
import { useSDK,useContractRead } from "@thirdweb-dev/react";
const ethers = require('ethers');
import { getRawProofForAddress } from '../utils/whitekist';
import contractABI from "../utils/ABI.json"
import usdcContractABI from "../utils/ABI_USDC.json"
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { parseEther, parseUnits,formatUnits,formatEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { contains } from "../utils/whitekist";
import JSConfetti from 'js-confetti'
import Head from 'next/head'
import { BigNumber } from "ethers/lib";
import Image from 'next/image'


export default function Home() {

  const address = useAddress()

  const sdk = useSDK()
 



  const [mintAmount,setmintAmount]= useState(1)
  const [txHash,settxHash]= useState()
  const [nftCost,setnftCosth]= useState(BigNumber.from("1"))

  const COST = 1
  const NFTContract = "0xE9be83836AB7A2B6Ab25A05eefebc2d691759FBC";
  const USDCContract = "0xE097d6B3100777DC31B34dC2c58fB524C2e76921"

  const { contract } = useContract(NFTContract);
  const usdcContract = sdk?.getContractFromAbi(USDCContract,usdcContractABI)
 

  const { isTimerExpired, isLoading } = useContractRead(contract, "timerExpired")


  useEffect(()=>{

    const getCost = async () =>{
      try {
       
        const cost = await contract?.call("cost");
      setnftCosth(cost)

      console.log(formatUnits(cost,6))
      } catch (error) {
        
      }
      
    }
    getCost()


  },[contract])

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

<> 

<div className="flex justify-center align-middle content-center mt-2"><Image

      src="/HitmonBox.png"
      alt="Picture of the author"
      width={200}
      height={250}
      className="rounded-lg"
    /></div>

 


<div className="flex justify-center align-middle content-center mt-10"> 

              <button className="bg-slate-500 px-3 pb-1 rounded-full text-xl align-middle mr-5" onClick={()=>mintAmount-1 >=1 ? setmintAmount(mintAmount-1): null}>-</button>
              <span className="flex content-center justify-center rounded px-2 w-fit text-3xl" >{mintAmount}</span>
              <button className="bg-slate-500 px-2 pb-1 rounded-full text-xl align-middle ml-5" onClick={()=>setmintAmount(mintAmount+1)}>+</button>
    </div>

    <div className="flex justify-center align-middle content-center mt-10">{nftCost ? <span>{(formatUnits(nftCost,6)*mintAmount).toPrecision(2)} USDC</span> : null}</div>
  
  {!isTimerExpired && contains(address) ? <> <div className="flex mt-10 mb-5 justify-center">
         
         <Web3Button
       contractAddress={NFTContract}
       action={async (contract) => {
 
         try {
          const currentAllowance = await (await usdcContract).call("allowance",[address,NFTContract]);

          console.log(currentAllowance)

          if (currentAllowance < parseUnits((mintAmount*COST).toString(),6)) {
            // Show a prompt to the user to approve the USDT
            const result = await (await usdcContract).call("approve",[NFTContract, parseUnits((mintAmount*COST).toString(),6)]);
            
            // The result contains information about the transaction, such as the transaction hash and gas used
            console.log(result);
          }
          else{
             const tx = await contract.call("whitelistMint", [mintAmount,[getRawProofForAddress(address)]])
 
         if(tx.receipt.status){
          const jsConfetti = new JSConfetti()
          jsConfetti.addConfetti({
            emojis: ['💫', '⚡️', '💥', '✨', '💫', '🌸'],
         })
         }
         settxHash(tx.receipt.transactionHash)
         console.log("tx: ", tx.receipt.transactionHash)
          }


          
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
       contractAddress={NFTContract}
       action={async (contract) => {
 
         try {

          const currentAllowance = await (await usdcContract).call("allowance",[address,NFTContract]);

          console.log(currentAllowance)

          if (currentAllowance < parseUnits((mintAmount*COST).toString(),6)) {
            // Show a prompt to the user to approve the USDT
            const result = await (await usdcContract).call("approve",[NFTContract, parseUnits((mintAmount*1).toString(),6)]);
            
            // The result contains information about the transaction, such as the transaction hash and gas used
            console.log(result);
          }

          else{
            const tx = await contract.call("mint", [mintAmount])
 
         if(tx.receipt.status){
          const jsConfetti = new JSConfetti()
          jsConfetti.addConfetti({
            emojis: ['💫', '⚡️', '💥', '✨', '💫', '🌸'],
         })
         }
         settxHash(tx.receipt.transactionHash)
         console.log("tx: ", tx.receipt.transactionHash)
         console.log("tx: ", tx)
          }




           
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
          {txHash? <div > <span className="text-black font-bold">TX:</span>  <a className="bg-gray-800 px-2 rounded" href="" target={_blank}>etherscan.io/tx/{txHash}</a></div> : <></>}
     
        </div>
      </main>
    </div>
  );
}
