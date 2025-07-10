import React from 'react'
import logo from "@/assets/images/logo-white.png";
import { Button } from './ui/button';
import { Link } from 'react-router';
import { MdLogin } from "react-icons/md";
import SearchBox from './SearchBox';
import { RouteLogIn } from '@/helpers/RouteName';

const Navbar = () => {
  return (
    <div className='flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b'>
      <div>
        <img src={logo}/>
      </div>
      <div className='w-[500px]'>
        <SearchBox/>
      </div>
      <div>
        {/* asChild makes Button classes gets applied on Link also */}
        <Button asChild className='rounded-full'> 
          <Link to={RouteLogIn}>
            <MdLogin/>
            Log In
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Navbar