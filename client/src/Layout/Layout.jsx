import AppSidebar from '@/components/AppSidebar'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <SidebarProvider>
    {/* //navbar
    //sidebar */}
      <Navbar/>
      <AppSidebar/>
      {/* Dynamic changes to webpage i.e. rest of compoennts will be same thorughout */}
      <main className='w-full'>
        <div className='w-full min-h-[calc(100vh-45px)] py-28  px-10'>
          <Outlet/>
        </div>  
        <Footer/>
      </main>
    </SidebarProvider>
  )
}

export default Layout