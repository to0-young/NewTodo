import React from 'react'
import './chat.css'
import Button from '@mui/material/Button'

function Chat() {
  const [messages, setMessages] = React.useState([])
  const [guid, setGuid] = React.useState('')

  const ws = new WebSocket('ws://localhost:3000/cable')

  ws.onopen = () => {
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

  const setMessagesAndScrollDown = (data) => {
    setMessages(data)
  }

  return (
    <div className='chat'>
      <div className='chat_apt'>
        <div className='messageHeader'>
          <h1>Messages</h1>
          <span> {guid}</span>
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

          <Button className='messageButton' type='submit' variant='contained'>
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Chat
