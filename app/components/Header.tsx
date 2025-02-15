import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div>
        <div className=''>
            <Image width={100} height={100} src={"/logo.png"} alt='Refeed'/>
        </div>
    </div>
  )
}

export default Header