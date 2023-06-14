import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { Web3Button } from "@thirdweb-dev/react";
import { useSDK,useContractRead } from "@thirdweb-dev/react";
const ethers = require('ethers');
import { getRawProofForAddress } from '../utils/whitekist';
import contractABI from "../utils/ABI.json"
import usdcContractABI from "../utils/ABI_USDC.json"
import usdtContractABI from "../utils/ABI_USDT.json"
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { parseEther, parseUnits,formatUnits,formatEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { contains } from "../utils/whitekist";
import JSConfetti from 'js-confetti'
import Head from 'next/head'
import { BigNumber } from "ethers/lib";
import Image from 'next/image'
import Link from 'next/link'

import  {ReactComponent as UsdcIcon} from '../public/usdc.svg'
import {ReactComponent as UsdtIcon} from '../public/usdt.svg'


export default function Home() {

  const address = useAddress()

  const sdk = useSDK()
 



  const [mintAmount,setmintAmount]= useState(1)
  const [txHash,settxHash]= useState()
  const [nftCost,setnftCosth]= useState(BigNumber.from("1"))
  const [ismintPaused,setismintPaused]= useState()
  const [totalMintedNft,settotalMintedNft]= useState(0)
  const [toggle , setToggle ] = useState(false)

  const toggleClass = " transform translate-x-5";



  const COST = 600
  const NFTContract = "0x407d2a779F0281DB7AE363970D4dd27916090987";
  const USDCContract = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";


  const { contract } = useContract(NFTContract);
  const usdcContract = sdk?.getContractFromAbi(USDCContract,usdcContractABI)


  const { isTimerExpired, isLoading } = useContractRead(contract, "timerExpired")


  useEffect(()=>{

    const getCost = async () =>{
      try {
       
      const cost = await contract?.call("cost");
      setnftCosth(cost)

      const isPaused = await contract?.call("paused");
      setismintPaused(isPaused)

      const totalMinted = await contract?.call("totalSupply");
      settotalMintedNft(totalMinted)

      console.log(formatUnits(cost,6))
      console.log(isPaused)
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
        HitmonBox Mint is 
        
        {!ismintPaused ? <>   <a href="#" className="underline "> LIVE</a>!</> : <><a href="#"> Paused</a>!</>}
     
        
        
        
        </h1>
       

      

       <div className={styles.card}>
{address && !ismintPaused ? 

<> 

<div className="flex justify-center align-middle content-center font-semibold mb-4 bg-red-600 rounded-full">{parseInt(totalMintedNft) || 0}/210 Total Minted</div>

<div className="flex justify-center align-middle content-center mt-2"><Image

      src="/HitmonBox.png"
      alt="Picture of the author"
      width={200}
      height={250}
      className="rounded-lg"
    /></div>

 


<div className="flex justify-center align-middle content-center mt-10"> 

              <button className="bg-slate-500 px-3 pb-1 rounded-full text-xl align-middle mr-5" onClick={()=>mintAmount-1 >=1 ? setmintAmount(mintAmount-1): null}>-</button>

              <input value={mintAmount}  onChange={(e)=>setmintAmount(parseInt(e.target.value))} className="flex rounded-full items-center text-2xl text-center px-5 w-24 justify-center content-center"></input>




              <button className="bg-slate-500 px-2 pb-1 rounded-full text-xl align-middle ml-5" onClick={()=>setmintAmount(mintAmount+1)}>+</button>
    </div>

<div className="flex flex-wrap justify-center align-middle items-center pt-5 font-bold">

  <button className={` bg-black p-1 px-2 rounded-xl ${toggle ? 'bg-red-700' : ''}`} >
  <Image
      priority
      src="/usdc.svg"
      height={27}
      width={27}
    
    />
    </button>


  


</div>
  


    <div className="flex justify-center align-middle content-center mt-10 text-lg">{nftCost ? <span>Total: {(formatUnits(nftCost,6)*mintAmount)} {toggle ? 'USDC' : 'USDC' }</span> : null}</div>
  
  {!isTimerExpired && contains(address) ? <> <div className="flex mt-5 mb-5 justify-center">
         
         <Web3Button
       contractAddress={NFTContract}
       action={async (contract) => {
 
         try {

        
            const currentAllowance = await (await usdcContract).call("allowance",[address,NFTContract]);

            if (currentAllowance < parseUnits((mintAmount*COST).toString(),6)) {
                      // Show a prompt to the user to approve the USDT
                      const result = await (await usdcContract).call("approve",[NFTContract, parseUnits((mintAmount*COST).toString(),6)]);
                      
                      // The result contains information about the transaction, such as the transaction hash and gas used
                      console.log(result);
                    }

       
         

          

     
             const tx = await contract.call("whitelistMint", [mintAmount,[getRawProofForAddress(address)]])
 
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
  
  
  <div className="flex mt-5 mb-5 justify-center">
         


         <Web3Button
       contractAddress={NFTContract}
       action={async (contract) => {
 
         try {
         


            const currentAllowance = await (await usdcContract).call("allowance",[address,NFTContract]);

            if (currentAllowance < parseUnits((mintAmount*COST).toString(),6)) {
                      // Show a prompt to the user to approve the USDT
                      const result = await (await usdcContract).call("approve",[NFTContract, parseUnits((mintAmount*COST).toString(),6)]);
                      
                      // The result contains information about the transaction, such as the transaction hash and gas used
                      console.log(result);
                    }

       



        

   
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

  <div className="flex justify-center gap-2 text-black font-bold">
    <div className="bg-red-500 rounded-3xl px-3 py-2 my-3">  <Link className="text-black" href="https://hitmonbox.com/investors" target="_blank">Investors</Link></div>
    <div className="bg-red-500 rounded-3xl px-3 py-2 my-3"> <Link className="text-black" href="https://hitmonbox.com" target="_blank">HitmonBox</Link></div>
    <div className="bg-red-500 rounded-3xl px-3 py-2 my-3"> <Link className="text-black" href="/guide" >Mint Guide</Link></div>
  </div>

       </div>

       

        <div className="my-10">
          {txHash? <div > <span className="text-black font-bold">TX:</span>  <a className="bg-gray-800 px-2 rounded" href={`https://etherscan.io/tx/${txHash}`} target="_blank">etherscan.io/tx/{txHash}</a></div> : <></>}
     
        </div>
      </main>
    </div>
  );
}
