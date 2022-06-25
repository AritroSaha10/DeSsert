import React from 'react'

const about = () => {
    const url = "https://randomuser.me/api/portraits/thumb/men/8.jpg"
  return (
    <div>
        <h1 className="text-2xl font-bold text-orange-900 text-left ml-10 mt-10">About Us</h1>    
        <div className="flex flex-wrap ml-10">
            <div className="p-10 bg-orange-400 ml-10 mt-5 w-60 h-80">
                <h3 className="text-2xl font-bold text-orange-900 mb-3">Aritro Saha</h3>
                <img src={url} className="w-28 h-32"></img>
                <h4 className="mt-2 text-orange-900">Thill</h4>
            </div>
            <div className="p-10 bg-orange-400 ml-10 mt-5 w-60 h-80">
                <h3 className="text-2xl font-bold text-orange-900 mb-3">Musa Khan</h3>
                <img src={url} className="w-28 h-32"></img>
                <h4 className="mt-2 text-orange-900">Thill</h4>
            </div>
            <div className="p-10 bg-orange-400 ml-10 mt-5 w-60 h-80">
                <h3 className="text-2xl font-bold text-orange-900 mb-3">Aditiya Ajay</h3>
                <img src={url} className="w-28 h-32"></img>
                <h4 className="mt-2 text-orange-900">Thill</h4>
            </div>
            <div className="p-10 bg-orange-400 ml-10 mt-5 w-60 h-80">
                <h3 className="text-2xl font-bold text-orange-900 mb-3">Stephen Ni</h3>
                <img src={url} className="w-28 h-32"></img>
                <h4 className="mt-2 text-orange-900">Thill</h4>
            </div>
        </div>
    </div>
  )
}

export default about