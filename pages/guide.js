import React from 'react'
import styles from "../styles/Home.module.css";
import Head from 'next/head'

import Link from 'next/link'



function guide() {
  return (
    <div className={styles.container}>
    <Head>
      <title>HitmonBox Mint</title>
    </Head>
    <div className="flex justify-end mt-10"></div>

    
    <main className={styles.main}>

       
      <h1 className={styles.title}>
      HitmonBox Mint Guide
      
      
    
      
      </h1>
     

    

     <div className={styles.card}>
        <p className='flex items-center align-middle justify-center text-center pb-10'>To mint x number of NFTs through Smart Contract you need to first approve USDC and then Mint NFTs</p>

        <h3 className='font-bold uppercase pb-2'>Step#1: Approve USDC</h3>

        <li className='pt-1'>Go to USDC contract <a href='https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#writeProxyContract' target={'_blank'}>USDC Contract Address</a></li>

        <li  className='pt-1'>On Approve Function in <span className='bg-blue-500 px-1 rounded'>spender</span> field enter Hitmonbox Contract address </li> <span className=' bg-red-500 rounded-full px-2'>0x407d2a779F0281DB7AE363970D4dd27916090987</span>

        <li  className='pt-1'>On Approve Function in <span className='bg-blue-500 px-1 rounded'>value</span> field enter total USDC for number of nfts you want to mint. i.e </li><span className=' bg-red-500 rounded-full px-2'>600 x (number of NFTS) x 1000000</span>



        <h3 className='font-bold uppercase pt-10 pb-2'>Step#2: Mint NFTs</h3>
        <li>Go to HitmonBox Release 2 contract <a href='https://etherscan.io/address/0x407d2a779f0281db7ae363970d4dd27916090987#writeContract' target={'_blank'}>Hitmon Box Contract Address</a></li>
        <li>On Mint Function in <span className='bg-blue-500 px-1 rounded'>_mintAmount</span> field enter number of Hitmonbox NFTs you want to mint </li> <span className=' bg-red-500 rounded-full px-2 '>(number of NFTs) i.e 2</span>


        <div className='pt-10 text-sm'><span className="bg-blue-700 rounded-l px-2 ">NOTE:</span> Make sure you approve right amount of USDC for the no. of NFTs youre minting</div>

<div className="flex justify-center gap-2 text-black font-bold">
  <div className="bg-red-500 rounded-3xl px-3 py-2 my-3">  <Link className="text-black" href="https://hitmonbox.com/investors" target="_blank">Investors</Link></div>
  <div className="bg-red-500 rounded-3xl px-3 py-2 my-3"> <Link className="text-black" href="https://hitmonbox.com" target="_blank">HitmonBox</Link></div>
</div>

     </div>

     


    </main>
  </div>
  )
}

export default guide