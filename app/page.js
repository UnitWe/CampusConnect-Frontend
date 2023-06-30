import Image from 'next/image'
import Header from '../components/header'
import SidebarLeft from '../components/home/sidebarLeft/sidebarLeft'

export default function Home() {
  return (
    <>
      <Header/>
      <div className='p-2 mt-14'>
        <SidebarLeft/>
      </div>
    </>
  )
}
