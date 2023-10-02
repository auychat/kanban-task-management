'use client'

import React, { useContext, useState } from "react";
import Content from '@/components/content/Content'
import Sidebar from '@/components/sidebar/Sidebar'
import Topbar from '@/components/topbar/Topbar'

export default function Home() {

  return (
    <main className='w-full h-full flex flex-row'>
      <Sidebar />
      <div className='flex flex-col'>
      <Topbar />
      <Content />

      </div>
    </main>
  )
}
