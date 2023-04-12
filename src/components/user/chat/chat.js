import React from 'react'
import { useEffect } from 'react'
import './chat.css'

// const ws = new WebSocket("ws://localhost:3000/cable")

function Chat() {
  const ws = new WebSocket('ws://localhost:3000/cable')

  const [messages, setMessages] = React.useState([])
  const [guid, setGuid] = React.useState('')
  const messagesContainer = document.getElementById('messages')

  ws.onopen = () => {
    console.log('Connected to websocket server')
    const guid = Math.random().toString(36).substring(2, 15)

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)
      if (data.type === 'ping') return
      if (data.type === 'welcome') return
      if (data.type === 'confirm_subscription') return

      const message = data.message
      setMessagesAndScrollDown([...messages, message])
    }

    ws.send(
      JSON.stringify({
        command: 'subscribe',
        identifier: JSON.stringify({
          id: guid,
          channel: 'MessagesChannel',
        }),
      })
    )
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  useEffect(() => {
    resetScroll()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = e.target.message.value
    e.target.message.value = ''

    await fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body }),
    })
  }

  const fetchMessages = async () => {
    const res = await fetch('http://localhost:3000/messages')

    const data = await res.json()
    setMessagesAndScrollDown(data)
  }

  const setMessagesAndScrollDown = (data) => {
    setMessages(data)
    resetScroll()
  }

  const resetScroll = () => {
    if (!messagesContainer) return
    messagesContainer.srcrollTop = messagesContainer.scrollHeight
  }

  return (
    <div className='chat'>
      <div className='chat_apt'>
        <div className='messageHeader'>
          <h2>Messages</h2>
          <span> Guid: {guid}</span>
        </div>

        <div className='messages' id='messages'>
          {messages.map((message) => (
            <div className='message' key={message.id}>
              <p>{message.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='messageForm'>
        <form onSubmit={handleSubmit}>
          <input className='messageInput' type='text' name='message' />

          <button className='messageButton' type='submit'>
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
export default Chat
