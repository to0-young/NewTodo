import React, { useEffect } from 'react'
import '../chat/chat.css'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'

const Messages = () => {
  const [messages, setMessages] = React.useState([])
  const [msg, setMsg] = React.useState('')
  const bottomRef = React.useRef(null)
  const session = useSelector((state) => state.session.details)

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
      ws.current.send(
        JSON.stringify({
          command: 'subscribe',
          identifier: JSON.stringify({
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

      if (data.message) {
        setMessages((messages) => [...messages, data.message])
      }
    }

    return () => {
      ws.current.send(
        JSON.stringify({
          command: 'unsubscribe',
          identifier: JSON.stringify({
            channel: 'MessagesChannel',
          }),
        })
      )
    }
  }, [])

  const handleMessageChange = (event) => {
    setMsg(event.target.value)
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = e.target.message.value
    e.target.message.value = ''

    const res = await fetch('http://localhost:3000/messages', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body: msg,
      }),
    })
    setMsg('')
  }

  return (
    <div className='chat'>
      <div className='chat__apt'>
        <div className='messageHeader'>
          <h1>Messages</h1>
        </div>

        <div className='messages' id='messages'>
          {messages.map((message, index) => (
            <div className={message.user_id === session.user.id ? 'myMessage' : 'message'} key={`message-${index}`}>
              <p>{message.body}</p>

              <div className='avatar'>
                <img className='Ava' src={message.user.avatar.url} alt='avatar' />
              </div>

              <div ref={bottomRef}></div>
            </div>
          ))}
        </div>
      </div>

      <div className='messageForm'>
        <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%' }}>
          <input
            className='messageInput'
            type='text'
            name='message'
            onChange={handleMessageChange}
            placeholder='Write a message...'
          />

          <Button className='messageButton' type='submit' variant='contained' disabled={msg === ''} color='info'>
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Messages
