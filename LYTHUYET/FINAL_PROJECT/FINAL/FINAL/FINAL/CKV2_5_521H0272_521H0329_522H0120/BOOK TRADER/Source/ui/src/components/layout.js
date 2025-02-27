import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar.seller'
import Header from '../components/header.seller'

export default function layout() {
  return (
    <div>
        <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
            <Sidebar />
            <div className='flex-1'>
                <Header />
                <div className='p-4'>{<Outlet/>}</div>
            </div>

        </div>
        
    </div>
  )
}
