import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLatterBox from '../components/NewsLatterBox'

function Contact() {

  return (
    <div>
          <div className='text-2xl text-center pt-10 border-t '>
            <Title text1={'Contact'} text2={'Us'} />
          </div>

                <div className='flex flex-col md:flex-row justify-center gap-10 mb-28 my-10'>
                    <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
                    <div className='flex flex-col justify-center items-start gap-6'>
                      <p className='font-semi-bold text-xl text-gray-600'>Our Store</p>
                      <p className='text-gray-500'>Okhla New Delhi ,India</p>
                      <p className='text-gray-500'>Tel: 9058970413 <br /> Email:sabiransari01981@gmail.com</p>
                      <p className='text-xl  font-semibold text-gray-600'>Careers At Forever</p>
                      <p className='text-gray-500'>Learn About Our Terms And Job Openings.</p>
                      <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
                    </div>
                </div>
        <NewsLatterBox/>
    </div>
  )
}

export default Contact
