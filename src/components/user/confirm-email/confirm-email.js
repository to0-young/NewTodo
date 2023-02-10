import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import actionCreator from '../../../services/store/action-creator'

function ConfirmEmail(props) {
  const history = useHistory()

  useEffect(() => {
    confirmEmail()
  }, [])

  const fetchSession = async () => {
    const getSessions = await fetch('http://localhost:3000/api/v1/sessions', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const json = await getSessions.json()
    if (getSessions.status === 401) return props.getSessionError()
    props.getSessionSuccess(json)
  }

  const confirmEmail = async () => {
    const searchParams = new URLSearchParams(history.location.search)
    const confirmToken = Object.fromEntries(searchParams).confirm_token
    const res = await fetch(`http://localhost:3000/api/v1/users`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Authorization: confirmToken },
      body: JSON.stringify({
        email_confirmed: true,
      }),
    })

    const json = await res.json()
    if (res.ok) {
      await fetchSession()
      // const confirmedEmailSession = { ...session, user: { ...session.user, email_confirmed: true } }
      // props.updateSessionSuccess(confirmedEmailSession)
      history.push('/login')
      alert('Your mail has been confirmed')
      return json
    }
  }

  return null
}

const ConnectedConfirmEmail = connect(null, actionCreator)(ConfirmEmail)
export default ConnectedConfirmEmail
