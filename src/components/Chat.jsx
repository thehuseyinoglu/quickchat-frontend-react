import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import "../assets/styleGlass.css"

const Chat = ({ socket, userName, room }) => {

  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([])

  //sayfa yuklendiginde socket parametresine bagli olarak
  useEffect(() => {
    socket.on('messageReturn', (data) => {
      setMessageList((prev) => [...prev, data])
    })
  }, [socket])

  const sendMessage = async () => {
    const messageContent = {
      userName: userName,
      message: message,
      room: room,
      date: (new Date(Date.now)).getHours() + ':' + (new Date(Date.now)).getMinutes()
    }
    await socket.emit('message', messageContent)
    setMessageList((prev) => [...prev, messageContent])
    setMessage('')

    console.log('messageList', messageList);
  }
  return (
    <div className=' flex items-center justify-center h-full'>
      <div className='w-1/3 h-[600px] relative glass'>
        <div className='w-full h-16 bg-red-500 flex justify-center items-center p-3'>
          <span className='text-4xl font-bold  text-red-700  '>QuickChat</span>
        </div>
        <div className='w-full h-[400px] overflow-y-auto'>
          {
            messageList && messageList.map((msg, i) => (
              <div className={`${userName === msg.userName ? 'flex justify-end' : ''} `}>
                <div className={`${userName === msg.userName ? 'bg-green-600' : 'bg-blue-600'} w-2/3 h-12 p-2  text-white m-2 rounded-xl rounded-br-none`}>
                  <div>{msg.message}</div>
                  <div className='w-full flex justify-end text-xs'>{msg.userName}</div>
                </div>
              </div>
            ))
          }
        </div>
        <div className='absolute bottom-0 left-0 w-full '>
          <input value={message} onChange={e => setMessage(e.target.value)} className='w-3/4 h-12 border p-3 outline-none' type="text" placeholder='message send' />
          <button onClick={sendMessage} className='w-1/4 bg-indigo-600 text-white h-12 hover:opacity-70'>Send</button>
        </div>
      </div>

    </div>
  )
}

export default Chat