import React, { useEffect } from 'react'
import '../chat/chat.css'
import Button from '@mui/material/Button'

const Messages = () => {
  const [messages, setMessages] = React.useState([])
  const [guid, setGuid] = React.useState('')
  const ws = React.useRef(null)

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch('http://localhost:3000/messages', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })

      if (res.ok) {
        const data = await res.json()
        setMessages(data)
      }
    }

    fetchMessages()

    ws.current = new WebSocket('ws://localhost:3000/cable')
    ws.current.onopen = () => {
      const guid = Math.random().toString(36).substring(2, 15)
      // setGuid(guid)

      ws.current.send(
        JSON.stringify({
          command: 'subscribe',
          identifier: JSON.stringify({
            id: guid,
            channel: 'MessagesChannel',
          }),
        })
      )
    }

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data)

      if (data.type === 'ping' || data.type === 'welcome' || data.type === 'confirm_subscription') {
        return
      }

      if (data.message && data.message.guid === guid) {
        setMessages((messages) => [...messages, data.message])
      }
    }

    return () => {
      ws.current.send(
        JSON.stringify({
          command: 'unsubscribe',
          identifier: JSON.stringify({
            id: guid,
            channel: 'MessagesChannel',
          }),
        })
      )
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = e.target.message.value
    e.target.message.value = ''

    const res = await fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body, guid }),
    })

    if (res.ok) {
      const newMessage = await res.json()
      setMessages((messages) => [...messages, newMessage])
    }
  }

  return (
    <div className='chat'>
      <div className='chat_apt'>
        <div className='messageHeader'>
          <h1>Messages</h1>
          <span> {guid}</span>
        </div>

        <div className='messages' id='messages'>
          {messages.map((message, index) => (
            <div className='message' key={`message-${index}`}>
              <p>{message.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='messageForm'>
        <form onSubmit={handleSubmit}>
          <input className='messageInput' type='text' name='message' />

          <Button className='messageButton' type='submit'>
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Messages
