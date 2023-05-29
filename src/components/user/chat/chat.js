import React, {useCallback, useEffect} from 'react'
import '../chat/chat.css'
import Button from '@mui/material/Button'
import { connect, useSelector } from 'react-redux'
import { apiUrl, apiUrlCable } from '../../../exp-const/constants'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import logo from '../../../images/log.jpeg'
import actionCreator from '../../../services/store/action-creator'

const Messages = () => {
  const [messages, setMessages] = React.useState([])
  const [msg, setMsg] = React.useState('')

  const bottomRef = React.useRef(null)
  const session = useSelector((state) => state.session.details)
  const user = useSelector((state) => state.session.details.user)

  const ws = React.useRef(null)

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`${apiUrl}/messages`, {
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

    ws.current = new WebSocket(`${apiUrlCable}/cable`)
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

      if (data.message.type === 'message_deleted') {
        setMessages((messages) => messages.filter((message) => message.id !== data.message.id))
        if (data.message.user_id === session.user.id) {
        }
      } else {
        setMessages((messages) => [...messages, data.message])
        if (data.message.user_id !== user.id) {
          clickNotify(data.message.body)
        }
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

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()

    const body = e.target.message.value
    e.target.message.value = ''

    const res = await fetch(`${apiUrl}/messages`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body: msg,
        first_name: session.user.first_name,
      }),
    })
    setMsg('')
  },[msg])

  const handleMessageDelete = async (message) => {
    const res = await fetch(`${apiUrl}/messages/${message}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const now = new Date()
  const formattedTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`

  useEffect(() => {
    const timer = setTimeout(() => {
      const endElement = bottomRef.current
      if (!endElement) return
      endElement.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }, 100)

    return () => clearTimeout(timer)
  }, [messages])

  const clickNotify = (msg) => {
    if (Notification.permission === 'granted') {
      new Notification('New Message', {
        body: msg,
        icon: logo,
        duration: 4000,
        onClick: () => (window.location = '/chat'),
      })
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('New Message', {
            body: msg,
            icon: logo,
            duration: 4000,
            onClick: () => (window.location = '/chat'),
          })
        }
      })
    }
  }

  return (
    <div className='chat'>
      <div className='chat__apt'>
        <div className='chat__apt-messageHeader'>
          <h1>Messages</h1>
        </div>

        <div className='chat__apt-messages'>
          {messages.map((message, index) => (
            <div className={message.user_id === session.user.id ? 'chat__apt-myMessage' : 'chat__apt-message'} key={`chat__apt-message-${index}`}>
              {message.user_id === session.user.id && (
                <DeleteIcon className='chat__apt-btn' onClick={() => handleMessageDelete(message.id)}>
                  Delete
                </DeleteIcon>
              )}

              <div className='chat__avatar'>
                <img className='chat__apt-userAva' src={message.user.avatar.url} alt='avatar' />
                <div className='chat__userName'>{message.user.first_name}</div>
              </div>

              <p>
                {message.body}
                <span className='chat__apt-time'>
                  {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </p>

              <div ref={bottomRef}></div>
            </div>
          ))}
        </div>
      </div>

      <div className='chat__messageForm'>
        <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%' }}>
          <input
            className='chat__messageInput'
            type='text'
            name='message'
            onChange={handleMessageChange}
            placeholder='Write a message...'
          />

          <Button
            className='chat__messageButton'
            type='submit'
            variant='contained'
            endIcon={<SendIcon />}
            disabled={!msg.trim()}
            color='info'
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}

const ConnectedMessages = connect(null, actionCreator)(Messages)
export default ConnectedMessages
