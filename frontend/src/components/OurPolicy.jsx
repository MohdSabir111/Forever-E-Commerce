import React from 'react'
import { assets } from '../assets/assets'

function OurPolicy() {
  return (
   <div className='flex sm:flex-row sm:gap-2 text-center justify-around gap-12 py-20 text-xs flex-col sm:text-sm md:text-base text-gray-700 ' >
          <div>
            <img src={assets.exchange_icon} alt="" className='w-12 m-auto mb-5' />
            <p className='font-semibold' >Easy Exchange Policy  </p>
            <p className='text-gray-500' >We Offer Hassle Free Exchange Policy </p>
         </div>
         <div>
            <img src={assets.quality_icon} alt="" className='w-12 m-auto mb-5' />
            <p className='font-semibold' > 7 Days Return Policy  </p>
            <p className='text-gray-500' >We Provide 7 Days Free Return Policy </p>
         </div>
         <div>
            <img src={assets.support_img} alt="" className='w-12 m-auto mb-5' />
            <p className='font-semibold' >Best Customer Support  </p>
            <p className='text-gray-500' >We Provide 24/7 Customer Support </p>
        </div>
    </div>
  )
}

export default OurPolicy
