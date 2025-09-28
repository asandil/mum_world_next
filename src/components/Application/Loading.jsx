import React from 'react'
import loading from "@/assets/images/loading.svg"
import Image from 'next/image'

const Loading = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-start mt-12' >
      <Image alt='loader' src={loading.src} height={80} width={80} />
    </div>
  )
}

export default Loading