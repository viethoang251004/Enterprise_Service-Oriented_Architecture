import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import React from 'react'
import { HiOutlineBell, HiOutlineChat, HiOutlineSearch } from 'react-icons/hi'

export default function header() {
  return (
    <div className='bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200'>
        <div className='relative'>
            <HiOutlineSearch fontSize={20} className='text-gray-400 absolute top-1/2 -translate-y-1/2 left-3'/>
            <input
                type='text'
                placeholder='Search book...'
                className='text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-400 rounded-sm pl-11 pr-4'
            >
            </input>
        </div>
        <div className='flex items-center gap-4 mr-2'>
            <HiOutlineChat fontSize={24}/>
            <HiOutlineBell fontSize={24}/>
            
        </div>
    </div>
  )
}
