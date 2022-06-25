import React from 'react'
import { FaUserFriends } from 'react-icons/fa';
import { FaInstagram } from "react-icons/fa";

const friends = () => {
    const url = "https://randomuser.me/api/portraits/thumb/men/8.jpg"
  return (
    <div>
        <div className='text-5xl font-bold text-orange-900 text-left mt-10 ml-10 flex flex-nowrap'>
            <FaUserFriends/>
            <h1>Friends</h1>
        </div>
        <div className='flex flex-wrap flex-row items-center mt-10'>
            <div className='m-10 p-10 bg-orange-400'>
                <img src={url} class='rounded-3xl'></img>
                <h3 className="text-orange-900">Friend 1</h3>
            </div>
            <div className='m-10 p-10 bg-orange-400'>
                <img src={url} class='rounded-3xl'></img>
                <h3 className="text-orange-900">Friend 2</h3>
            </div>
            <div className='m-10 p-10 bg-orange-400'>
                <img src={url} class='rounded-3xl'></img>
                <h3 className="text-orange-900">Friend 3</h3>
            </div>
            <div className='m-10 p-10 bg-orange-400'>
                <img src={url} class='rounded-3xl'></img>
                <h3 className="text-orange-900">Friend 4</h3>
            </div>
            <div className='m-10 p-10 bg-orange-400'>
                <img src={url} class='rounded-3xl'></img>
                <h3 className="text-orange-900">Friend 5</h3>
            </div>
        </div>
    </div>
 
    
      
     
  )
}

export default friends