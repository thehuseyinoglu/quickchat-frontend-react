import React from 'react'
import "../assets/styleGlass.css"
const Room = ({ userName, room, setUserName, setRoom, setChatScreen, socket }) => {

  const sendRoom = () => {
    socket.emit('room', room)
    setChatScreen(true)
  }
//rromme
  return (
    <div className='flex items-center justify-center h-full'>
      <div className='w-1/3 h-[320px] rounded-lg flex flex-col space-y-4 p-3 glass' >
        <h1 className='text-red-700 text-center my-4 font-bold text-2xl'>WELCOME TO QUICKCHATT</h1>
        <input value={userName} onChange={e => setUserName(e.target.value)} className=' h-12 rounded-xl p-3 outline-none backdrop-blur-xl bg-white/30' type="text" placeholder='Username' />
        <input value={room} onChange={e => setRoom(e.target.value)} className='h-12 rounded-xl p-3 outline-none backdrop-blur-xl bg-white/30' type="text" placeholder='Room' />
        <div onClick={sendRoom} className='tracking-wider cursor-pointer hover:opacity-70 text-white bg-red-500 hover:bg-red-700 h-12 pt-2 text-xl text-center rounded-xl' >Chat!</div>
      </div>
    </div>
  )
}

export default Room