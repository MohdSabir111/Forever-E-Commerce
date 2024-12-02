import React from 'react'
import Title from './../components/Title';
import { assets } from '../assets/assets';
import NewsLatterBox from './../components/NewsLatterBox';

function About() {

  return (
    <div>
        <div className='text-2xl text-center border-t pt-10' >
          <Title text1={'About'} text2={'Us'}/>
        </div>

        <div className='flex flex-col md:flex-row gap-16 my-10'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center text-gray-800 gap-6 md:w-2/4' >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam voluptatibus quo libero at facilis fugiat, voluptatum veniam fuga voluptates facere veritatis, perspiciatis tenetur voluptatem laudantium dolorem officiis sapiente quod tempore.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aperiam aspernatur quasi vel aliquid architecto dolore vero, dolorum obcaecati totam ex a veritatis amet possimus corporis dicta nostrum eveniet placeat?</p>
            <b className='text-gray-800'>Our Mission </b>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, pariatur iste, unde rerum fuga quam harum repellat nulla voluptatum ex hic nam. Similique perferendis et culpa dignissimos natus dolorum earum.</p>
          </div>
        </div>
      <div className='text-xl py-4' >
        <Title text1={'Why'} text2={'Choose Us'} />
      </div>
       
       <div className='flex flex-col md:flex-row text-sm mb-20 '>
           <div className='border px-10 md:px16 py-8 sm:py-20 flex flex-col gap-5 '>
              <b>Quality Assurance:</b>
              <p className='text-gray-800'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum vel eos distinctio repellendus beatae itaque aut tempore? Sint culpa distinctio perspiciatis laborum neque sed reiciendis non, rerum veniam sunt atque?</p>
           </div>
           <div className='border px-10 md:px16 py-8 sm:py-20 flex flex-col gap-5 '>
              <b>Convenience:</b>
              <p className='text-gray-800'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum vel eos distinctio repellendus beatae itaque aut tempore? Sint culpa distinctio perspiciatis laborum neque sed reiciendis non, rerum veniam sunt atque?</p>
           </div>
           <div className='border px-10 md:px16 py-8 sm:py-20 flex flex-col gap-5 '>
              <b>Exceptional Customer Service:</b>
              <p className='text-gray-800'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum vel eos distinctio repellendus beatae itaque aut tempore? Sint culpa distinctio perspiciatis laborum neque sed reiciendis non, rerum veniam sunt atque?</p>
           </div>
       </div>

       <NewsLatterBox/>

    </div>
  )
}

export default About
