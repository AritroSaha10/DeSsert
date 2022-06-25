import Head from 'next/head'
import Image from 'next/image'
// import Food from '../public/images/food.jpg'
import Watermelon from "../public/images/even-more-popsicles.jpg"


export default function Home() {
  return (
    <div className="bg-[#f8a5c3]">
      <div className='flex flex-col md:flex-row md:justify-around items-center p-10 lg:px-20 h-[80vh]'>
        <div className='md:w-1/2 space-y-4'>
          <h1 className='text-5xl font-bold text-orange-900 text-left'>
            Summer recipes, by everyone, for everyone.
          </h1>

          <h3 className='text-lg'>
            This summer, prepare to use the only decentralized food network 
            to make the best snacks and food. 
          </h3>
        
          <div className='flex items-center mt-2 space-x-4'>
            <button className='rounded-lg p-4 text-white bg-zinc-800 font-bold'>View Recipes</button>
            <button className='rounded-lg p-4 text-white bg-zinc-800 font-bold'>Add your Own</button> 
          </div>
        </div>

        <div>
          <Image src={Watermelon} width={6762 * 1/16} height={7214 * 1/16} className='rounded-lg'/>
        </div>
      </div>
    </div>
  )
}

