import Content from '@/components/content/Content'
import Sidebar from '@/components/sidebar/Sidebar'
import Topbar from '@/components/topbar/Topbar'


import Image from 'next/image'

export default function Home() {
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
