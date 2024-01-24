'use client';
import Image from "next/image";
import { Web3 } from 'web3';
import { useState } from 'react';

const mainPrivateKey = '0x32516db1176b442753b3a514bb5dd2510d6b231139dec472f448cb6665bcf91b';

export default function Home() {

  console.log(Web3);

  //const web3 = new Web3(`https://opbnb-mainnet-rpc.bnbchain.org`);

  // const account = web3.eth.accounts.create(); // 创建一个账户
  // console.log(`account:`,account);


  // const mainACcount = web3.eth.accounts.privateKeyToAccount(mainPrivateKey);
  // console.log(`mainACcount:`,mainACcount);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      MONK



    </main>
  );
}
