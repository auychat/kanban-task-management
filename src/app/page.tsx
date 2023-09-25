'use client'

import React, { useContext, useState } from "react";
import Content from '@/components/content/Content'
import Sidebar from '@/components/sidebar/Sidebar'
import Topbar from '@/components/topbar/Topbar'
import { BoardContext } from "@/context/BoardContext";


export default function Home() {

  // const {selectedBoard } = useContext(BoardContext);
  // console.log("selected Board", selectedBoard)

  return (
    <main className='mx-auto max-w-[1440px] flex flex-row'>
      <Sidebar />
      <div className='flex flex-col'>
      <Topbar />
      <Content />

      </div>
    </main>
  )
}
