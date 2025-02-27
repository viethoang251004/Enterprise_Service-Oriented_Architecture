import React from 'react'
import { FaBook } from "react-icons/fa6";
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../lib/constants';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { HiOutlineLogout } from 'react-icons/hi';

const linkClasses = 'flex items-center font-light gap-2 px-3 py-3 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'
function SidebarLink({item}) {
    const { pathname } = useLocation()
    return (
        <Link to={item.path} className={classNames(pathname === item.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClasses)}>
            <span className='text-xl'>{item.icon}</span>
            {item.label}
        </Link>
    )
}

export default function sidebar() {
  return (
    <div className='bg-neutral-600 w-60 p-3 flex flex-col text-white'>
        <div className='flex justify-center items-center gap-2 px-1 py-3'>
            <FaBook fontSize={24}/>
            <span className='font-semibold text-yellow-500'>Booker</span>
        </div>

        <div className='flex-1 py-8 flex-col gap-0.5'>
            {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                <SidebarLink key={item.key} item={item} /> 
                    
            ))}
        </div>

        <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
            {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} /> 
                        
            ))}
            <div className={classNames('text-red-400', linkClasses)}>
                <span className='text-xl'><HiOutlineLogout/></span>
                Logout
            </div>
        </div>
    </div>
  )
}

