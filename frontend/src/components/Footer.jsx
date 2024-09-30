import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div >
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm  ' >
           <div>
            <img src={assets.logo} className='w-32 mb-5' />
            <p className='w-full md:w-2/3 text-gray-600' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat est, ducimus commodi dolor nihil sunt omnis placeat voluptate illum voluptatem magnam non qua.</p>
           </div>

           <div>
              <p className='text-xl font-medium mb-5' >COMPANY</p>
              <ul className='flex flex-col gap-1 text-gray-600' >
                  <li>Home</li>
                  <li>About Us</li>
                  <li>Delivery</li>
                  <li>Privacy Policy</li>
              </ul>
           </div>

           <div>
              <p className='text-xl font-medium mb-5' >GET IN TOUCH</p>
              <ul className='flex flex-col gap-1 text-gray-600' >
                  <li>9058970413</li>
                  <li>sabiransari01981@gmail.com</li>
              </ul>
           </div>
     </div>
        
         <div>
            <hr />
            <p className='text-center text-sm py-5 ' >Copyright 2024@ fover.com - All Right Reserved. </p>
         </div>

    </div>
  )
}

export default Footer
